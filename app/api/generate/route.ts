import { ollama } from "ollama-ai-provider";
import { generateText } from "ai";
import { defaultLocalPrompt } from "@/app/lib/prompts";

import {
  FlatMindMapSchema,
  FlatSubtopicSchema,
  Subtopic,
} from "@/app/lib/schemas";
import { validateMindMapData } from "@/lib/utils";
import { z } from "zod";

const LOCAL_MODEL = "llama3.2";

const getModel = () => ollama(LOCAL_MODEL);

const getPrompt = (topic: string, nodeId?: string) => {
  if (nodeId) {
    return `${defaultLocalPrompt}Expand the subtopic "${topic}" with node ID "${nodeId}".`;
  }
  return `${defaultLocalPrompt}${topic}`;
};

export async function POST(req: Request) {
  const { topic, nodeId } = await req.json();

  try {
    const model = getModel();
    const prompt = getPrompt(topic, nodeId);

    const generateMindMap = async (): Promise<z.infer<typeof FlatMindMapSchema>> => {
      const response = await generateText({ model, prompt });

      try {
        const cleanedResponse = response.text.trim();
        const lastBrace = cleanedResponse.lastIndexOf("}");
        const validJson = cleanedResponse.substring(0, lastBrace + 1);
        let parsedResponse = JSON.parse(validJson);

        if (nodeId) {
          const subtopics = parsedResponse.subtopics.map((st: any) => ({
            id: `${nodeId}-${st.name.replace(/\s+/g, "-")}`,
            parentId: nodeId,
            name: st.name,
            details: st.details,
            links: st.links || [],
          }));

          return {
            topic,
            subtopics,
          };
        }

        return parsedResponse;
      } catch (parseError) {
        console.error("Failed to parse model response:", parseError);
        return {
          topic,
          subtopics: [
            {
              id: nodeId || "error",
              parentId: null,
              name: "Error expanding topic",
              details: "Failed to expand this topic. Please try again.",
              links: [],
            },
          ],
        };
      }
    };

    const flatMindMapData = await generateMindMap();

    if (!flatMindMapData || !flatMindMapData.subtopics) {
      throw new Error("Invalid mind map data structure");
    }

    const nestedMindMapData = {
      topic: flatMindMapData.topic,
      subtopics: reconstructNestedStructure(flatMindMapData.subtopics),
    };

    const validatedMindMapData = await validateMindMapData(nestedMindMapData);

    return new Response(JSON.stringify(validatedMindMapData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API Error:", error);
    const errorResponse = {
      topic,
      subtopics: [
        {
          name: "Error",
          details: "Failed to expand this topic. Please try again.",
          links: [],
          subtopics: [],
        },
      ],
    };

    return new Response(JSON.stringify(errorResponse), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}

function reconstructNestedStructure(
  flatSubtopics: z.infer<typeof FlatSubtopicSchema>[]
): Subtopic[] {
  const subtopicMap = new Map<
    string,
    {
      name: string;
      details: string;
      links: any[];
      subtopics: any[];
      id: string;
      parentId: string | null;
    }
  >();

  flatSubtopics.forEach((subtopic) => {
    subtopicMap.set(subtopic.id, {
      name: subtopic.name,
      details: subtopic.details,
      links: subtopic.links,
      subtopics: [],
      id: subtopic.id,
      parentId: subtopic.parentId,
    });
  });

  const rootNodes: any[] = [];
  flatSubtopics.forEach((subtopic) => {
    const node = subtopicMap.get(subtopic.id);
    if (!node) return;

    if (!subtopic.parentId) {
      rootNodes.push(node);
      return;
    }

    const parent = subtopicMap.get(subtopic.parentId);
    if (!parent) {
      rootNodes.push(node);
      return;
    }

    parent.subtopics.push(node);
  });

  const cleanNode = (node: any): Subtopic => {
    const { id, parentId, ...cleanedNode } = node;
    return {
      ...cleanedNode,
      subtopics: node.subtopics.map(cleanNode),
    };
  };

  return rootNodes.map(cleanNode);
}

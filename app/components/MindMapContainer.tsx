"use client";

import { ReactFlowProvider } from "reactflow";
import MindMap from "./MindMap";
import { useMindMapData } from "../hooks/useMindMapData";
import LoadingMindMap from "./LoadingMindMap";
import CreateMindMap from "./CreateMindMap";
import { useRouter } from "next/navigation";

export default function MindMapContainer() {
  const { data, isLoading, error, fetchMindMap, expandMap } = useMindMapData();
  const router = useRouter();

  if (isLoading) return <LoadingMindMap />;

  if (error) {
    router.push("/?error=true");
    return <CreateMindMap fetchMindMap={fetchMindMap} />;
  }

  if (!data) return <CreateMindMap fetchMindMap={fetchMindMap} />;

  return (
    <div className="w-full h-full">
      <ReactFlowProvider>
        <MindMap data={data} onExpandMap={expandMap} />
      </ReactFlowProvider>
    </div>
  );
}

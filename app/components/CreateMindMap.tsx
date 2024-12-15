"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Hero from "./Hero";
import CreateMindMapForm from "./CreateMindMapForm";
import Credits from "./Credits";
import RetroGrid from "@/components/ui/retro-grid";
import { useEffect } from "react";

interface CreateMindMapProps {
  fetchMindMap: (topic: string) => void;
}

const CreateMindMap = ({ fetchMindMap }: CreateMindMapProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateMindMapContent fetchMindMap={fetchMindMap} />
    </Suspense>
  );
};

const CreateMindMapContent = ({ fetchMindMap }: CreateMindMapProps) => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") === "true";

  useEffect(() => {
    if (error) {
      toast.error(
        "There was an error generating your mind map, please try again."
      );
    }
  }, [error]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
        <RetroGrid className="fixed inset-0 z-0" />
        <Hero />
        <div className="mt-10 w-full max-w-3xl relative z-10">
          <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
          >
        <CreateMindMapForm onSubmit={fetchMindMap} />
          </motion.div>
        </div>
      </div>
      <Credits />
    </div>
  );
};

export default CreateMindMap;

"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"

interface CreateMindMapFormProps {
  onSubmit: (topic: string) => void;
}

export default function CreateMindMapForm({
  onSubmit,
}: CreateMindMapFormProps) {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic) {
      onSubmit(topic);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-3xl">
      <Input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        autoFocus
        placeholder="Enter a topic"
        className="px-4 py-2 border border-gray-300 rounded z-10"
      />
      <Button type="submit" className="px-5 z-10">
        Generate
      </Button>
    </form>
  );
}

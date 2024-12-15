"use client";

import RetroGrid from "@/components/ui/retro-grid";
import { useEffect, useState } from "react";

const LoadingMindMap = () => {
  const [dots, setDots] = useState(".");

  const [loadingMessage, setLoadingMessage] = useState("Cooking Mind Map🍽️");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);

    const messages = [
      "Initializing your mind map, please be patient",
      "Connecting neurons and synapses in digital space",
      "Starting to wonder if everything is okay",
      "I'm sure this is just a minor setback, right?",
      "The servers are thinking harder than usual",
      "Maybe we should have tried a different approach",
      "Getting slightly concerned about the response time",
      "Beginning to question all my life choices",
      "Contemplating the possibility of system failure here",
      "Seriously considering a career change right now",
      "Pretty sure this isn't supposed to take forever",
      "Desperately hoping this isn't a complete disaster",
      "If you're reading this, something went wrong, probably",
    ];
    let messageIndex = 0;

    const messageInterval = setInterval(() => {
      setLoadingMessage(messages[messageIndex]);
      messageIndex = (messageIndex + 1) % messages.length;
    }, 20000);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold">
        {loadingMessage}
        {dots}
      </h2>
      <RetroGrid />
    </div>
  );
};

export default LoadingMindMap;

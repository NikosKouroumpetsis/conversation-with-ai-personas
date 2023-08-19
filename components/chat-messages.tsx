"use client";
import { useEffect, useRef, useState, ElementRef } from "react";
import { Persona } from "@prisma/client";
import ChatMessage, { ChatMessageProps } from "./chat-message";

interface ChatMessagesProps {
  persona: Persona;
  messages: ChatMessageProps[];
  isLoading: boolean;
}

function ChatMessages({ persona, messages, isLoading }: ChatMessagesProps) {
  const scrollRef = useRef<ElementRef<"div">>(null);
  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        src={persona.src}
        role="system"
        content={`Hello i am ${persona.name}, ${persona.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          role={message.role}
          content={message.content}
          src={message.src}
        />
      ))}
      {isLoading && <ChatMessage role="system" src={persona.src} isLoading />}
      <div ref={scrollRef}></div>
    </div>
  );
}

export default ChatMessages;

'use client';

import { useState, useRef, useEffect } from 'react';
import ChatButton from './ChatButton';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import { Loader2, Sparkles, Brain, Terminal } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Intro message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content:
            "Hello, I'm your AI portfolio assistant. I can provide structured insights about projects, technologies, and experience details. How would you like to begin?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async (messageText: string) => {
    console.log('📤 Sending message:', messageText);

    const userMessage: Message = {
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      console.log('🔄 Calling /api/chat...');

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          conversationHistory: messages.slice(-10),
        }),
      });

      console.log('📥 Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('❌ API error:', response.status, errorData);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Response received:', data);

      if (!data.response) {
        throw new Error('No response from API');
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('❌ Chat error:', error);

      let errorMessage =
        "System notice: a network or server error occurred. Please retry or verify configuration.";

      if (error instanceof Error) {
        if (error.message.includes('500')) {
          errorMessage =
            "Server error: unable to connect to AI service. Verify that GEMINI_API_KEY is correctly configured.";
        } else if (error.message.includes('429')) {
          errorMessage =
            "Request limit reached. Please wait a moment before sending another query.";
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: errorMessage,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <ChatButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 rounded-2xl shadow-2xl z-40 flex flex-col border border-gray-700/60 overflow-hidden backdrop-blur-xl">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-700 via-cyan-600 to-sky-500 p-4 flex items-center gap-3 shadow-lg">
            <div className="relative w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
              <Brain className="w-6 h-6 text-white animate-pulse" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-cyan-400 opacity-40 blur-sm animate-spin-slow" />
            </div>

            <div className="relative">
              <h3 className="font-semibold text-white tracking-wide flex items-center gap-2">
                Vertex
                <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
              </h3>
              <p className="text-xs text-white/70 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                System Online
              </p>
            </div>

            <div className="ml-auto">
              <div className="px-2 py-1 bg-white/10 rounded-lg border border-white/20 flex items-center gap-1">
                <Terminal className="w-3 h-3 text-white" />
                <span className="text-[10px] text-white font-mono">v2.0</span>
              </div>
            </div>
          </div>

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto relative">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(56, 189, 248, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.3) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div className="relative">
              {messages.map((msg, index) => (
                <ChatMessage
                  key={index}
                  role={msg.role}
                  content={msg.content}
                  timestamp={msg.timestamp}
                />
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex gap-3 p-4 bg-gradient-to-r from-blue-900/30 to-transparent backdrop-blur-sm">
                  <div className="relative w-10 h-10">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-600 to-blue-500 animate-spin blur-sm" />
                    <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
                      <Loader2 className="w-5 h-5 text-white animate-spin" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-200 text-sm font-mono">
                    Processing request
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-100" />
                      <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Field */}
          <ChatInput
            onSend={sendMessage}
            disabled={isLoading}
            placeholder="Ask anything"
          />
        </div>
      )}

      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </>
  );
}

'use client';

import { Bot, User, Code, Cpu } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export default function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div
      className={`flex gap-3 p-4 ${
        isUser 
          ? 'bg-gradient-to-r from-purple-900/20 to-transparent' 
          : 'bg-gradient-to-r from-blue-900/20 to-transparent'
      } backdrop-blur-sm hover:bg-opacity-80 transition-all duration-300`}
      role="article"
    >
      {/* Avatar with animated border */}
      <div className="relative flex-shrink-0">
        {/* Animated rotating border */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${
          isUser 
            ? 'from-purple-500 via-pink-500 to-purple-500' 
            : 'from-blue-500 via-cyan-500 to-blue-500'
        } animate-spin-slow blur-sm`} />
        
        <div
          className={`relative w-10 h-10 rounded-full flex items-center justify-center ${
            isUser 
              ? 'bg-gradient-to-br from-purple-600 to-pink-600' 
              : 'bg-gradient-to-br from-blue-600 to-cyan-600'
          } shadow-lg`}
        >
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <div className="relative">
              <Cpu className="w-5 h-5 text-white animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping" />
            </div>
          )}
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {isUser ? 'You' : 'Vertex'}
          </span>
          {!isUser && (
            <span className="px-2 py-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-[10px] rounded-full flex items-center gap-1">
              <Code className="w-3 h-3" />
              GPT
            </span>
          )}
          {timestamp && (
            <span className="text-xs text-gray-500">
              {timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          )}
        </div>
        
        {/* Message bubble with gradient border */}
        <div className="relative group">
          <div className={`absolute -inset-0.5 rounded-lg bg-gradient-to-r ${
            isUser 
              ? 'from-purple-600 to-pink-600' 
              : 'from-blue-600 to-cyan-600'
          } opacity-30 group-hover:opacity-50 blur transition-opacity`} />
          
          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 text-gray-100 whitespace-pre-wrap break-words border border-gray-700/50">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

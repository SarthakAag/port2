'use client';

import { useState, KeyboardEvent } from 'react';
import { Send, Zap } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({ 
  onSend, 
  disabled = false,
  placeholder = "Ask me anything..." 
}: ChatInputProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative border-t border-gray-700/20 p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black backdrop-blur-xl">
      {/* Animated glow effect when focused */}
      {isFocused && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 animate-pulse pointer-events-none" />
      )}
      
      <div className="relative flex items-end gap-2">
        <div className="flex-1 relative">
          {/* Decorative corner accents */}
          <div className="absolute -top-1 -left-1 w-2 h-2 border-l-2 border-t-2 border-purple-500 rounded-tl" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r-2 border-b-2 border-cyan-500 rounded-br" />
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full resize-none bg-gray-800/50 border border-gray-600/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-800/30 disabled:cursor-not-allowed max-h-32 backdrop-blur-sm transition-all duration-300"
            aria-label="Chat message input"
            maxLength={1000}
          />
        </div>
        
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="relative p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 group overflow-hidden"
          aria-label="Send message"
        >
          {/* Shine effect on hover */}
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <Send className="w-5 h-5 relative z-10" />
        </button>
      </div>
      
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-gray-500">
          <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-[10px]">↵</kbd> Send
        </p>
      </div>
    </div>
  );
}

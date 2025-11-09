'use client';

import { Sparkles, X } from 'lucide-react';

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
  hasUnread?: boolean;
}

export default function ChatButton({ isOpen, onClick, hasUnread = false }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group scale-90 sm:scale-100"
      aria-label={isOpen ? "Close chat" : "Open chat"}
      aria-expanded={isOpen}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 animate-pulse blur-lg opacity-75 group-hover:opacity-100 transition-opacity" />

      {/* Main button */}
      <div className="relative p-3 sm:p-4 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 rounded-full shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 focus:outline-none focus:ring-4 focus:ring-purple-300">
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        ) : (
          <div className="relative">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-pulse" />
            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full animate-bounce border-2 border-white" />
            )}
          </div>
        )}
      </div>

      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-full bg-purple-400 opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500" />
    </button>
  );
}

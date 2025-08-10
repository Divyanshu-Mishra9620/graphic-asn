"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

interface SuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const SuggestionsModal = ({
  isOpen,
  onClose,
  content,
  isLoading,
  setIsLoading,
}: SuggestionsModalProps) => {
  const formattedContent = useMemo(() => {
    return content.split("\n").map((line, index) => {
      if (
        line.toUpperCase().startsWith("HEADLINES:") ||
        line.toUpperCase().startsWith("SUBHEADLINES:")
      ) {
        return (
          <strong
            key={index}
            className="mt-4 mb-2 block font-bold text-purple-600"
          >
            {line}
          </strong>
        );
      }
      if (line.trim() === "") return null;
      return (
        <p key={index} className="mb-2">
          {line}
        </p>
      );
    });
  }, [content]);

  const handleClick = () => {
    setIsLoading(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative m-4 w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ✨ AI-Powered Suggestions
            </h2>
            <div className="text-gray-700 leading-relaxed min-h-[100px]">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center space-y-6">
                  <LoadingSpinner size="lg" />
                  <p className="text-lg text-purple-600 font-medium">
                    Loading creative magic...
                  </p>
                </div>
              ) : (
                formattedContent
              )}
            </div>
            <button
              onClick={() => handleClick()}
              type="button"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuggestionsModal;

"use client";
import { useState } from "react";
import FloatingShapes from "./FloatingShapes";
import SuggestionsModal from "./SuggestionModel";
import LoadingSpinner from "./LoadingSpinner";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestions, setSuggestions] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const headingText = "The AI Design Studio for Graphic Designers";
  const subheadingText =
    "Crafted to make you faster and more creative. AI studio for graphic designers, entrepreneurs, and influencers.";

  const handleGenerateSuggestions = async () => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    setIsLoading(true);
    setSuggestions("");
    setIsModalOpen(true);

    if (!apiKey) {
      setSuggestions(
        "API Key is not configured. Please set up your .env.local file."
      );
      setIsLoading(false);
      return;
    }

    const prompt = `
      Based on the following marketing copy for an AI design tool, generate 3 alternative headlines and 3 alternative subheadings. The tone should be punchy, modern, and exciting.
      Current Headline: "${headingText}"
      Current Subheading: "${subheadingText}"
      Format the output clearly with "HEADLINES:" and "SUBHEADLINES:" sections, with each suggestion on a new line.
    `;

    try {
      const minLoadingTimePromise = new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );

      const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
      const payload = { contents: chatHistory };
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

      const fetchPromise = fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const [response] = await Promise.all([
        fetchPromise,
        minLoadingTimePromise,
      ]);

      if (!response.ok)
        throw new Error(`API request failed with status ${response.status}`);

      const result = await response.json();

      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        setSuggestions(result.candidates[0].content.parts[0].text);
      } else {
        setSuggestions("Couldn't generate suggestions. Please try again.");
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setSuggestions(
        "An error occurred while fetching suggestions. Please check the console for details."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-amber-50 px-4 py-20 font-sans sm:px-6 lg:px-8"
        aria-labelledby="hero-heading"
      >
        <FloatingShapes />

        <div className="relative z-10 max-w-5xl text-center">
          <h1
            id="hero-heading"
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            The AI Design Studio for{" "}
            <span className="bg-gradient-to-r from-purple-600 to-amber-500 bg-clip-text text-transparent">
              Graphic Designers
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
            Crafted to make you <span className="font-semibold">faster</span>{" "}
            and more <span className="font-semibold">creative</span>.
            <br />
            AI studio for graphic designers, entrepreneurs, and influencers.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              aria-label="Get started for free"
              className="
                transform rounded-lg bg-gradient-to-r from-purple-600 to-amber-500
                px-8 py-3 text-base font-semibold text-white shadow-lg shadow-purple-500/20
                transition-all duration-300 ease-in-out hover:-translate-y-1
                hover:shadow-xl hover:shadow-purple-500/30
                focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/50
                active:scale-95 sm:px-10 sm:py-4
              "
            >
              Start For Free →
            </button>

            <button
              onClick={handleGenerateSuggestions}
              disabled={isLoading}
              aria-label="Get AI suggestions for headlines"
              className="
                flex w-[180px] items-center justify-center gap-2.5 transform rounded-lg bg-white 
                px-8 py-3 text-base font-semibold text-purple-600 shadow-lg shadow-purple-500/20
                transition-all duration-300 ease-in-out hover:-translate-y-1 
                hover:shadow-xl hover:shadow-purple-500/30 focus-visible:outline-none 
                focus-visible:ring-4 focus-visible:ring-purple-500/50
                disabled:cursor-not-allowed disabled:opacity-70
              "
            >
              {isLoading ? (
                <LoadingSpinner size="sm" color="purple" />
              ) : (
                "✨ Suggest with AI"
              )}
            </button>
          </div>

          <div className="mt-3 flex items-center justify-center gap-1 text-sm text-gray-500">
            <svg
              className="h-4 w-4 text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>No Credit Card Required</span>
          </div>
        </div>
      </section>

      <SuggestionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={suggestions}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </>
  );
};

export default HeroSection;

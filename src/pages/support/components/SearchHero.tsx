import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";

export default function SearchHero({ onSearch }: { onSearch: (value: string) => void }) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value); 
    onSearch(value); 
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 w-full py-14 px-4 rounded-md">
      <div className="max-w-4xl mx-auto text-center">
        <h1>How can we help you?</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Find answers to common questions, learn how to use Open Library features, or get in touch with our support team.
        </p>
      </div>

      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for help topics, or questions..."
          className="pl-12 pr-4 py-4 text-lg border-0 shadow-lg bg-white rounded-xl focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}

import { useState } from "react";
import MainContentLayout from "@/components/MainContentLayout";
import { HelpCategories } from "./HelpCategories";
import SearchHero from "./SearchHero";
import { FAQAccordion } from "./FAQAccordion";
import { faqData } from "./faqData";
import { categories } from "./categories";

export default function HelpAndSupportPage() {
  const [search, setSearch] = useState("");

  const allQuestions = [
    ...faqData.map((f) => ({ q: f.question, a: f.answer, link: null })),
    ...categories.flatMap((cat) =>
      cat.topQuestions.map((q) =>
        typeof q === "string"
          ? { q, a: "", link: "#" } 
          : { q: q.question, a: "", link: q.link || "#" }
      )
    ),
  ];

  const filtered = allQuestions.filter(
    (item) =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
  );

  const isSearching = search.trim() !== "";

  return (
    <MainContentLayout className="font-inter">
      <SearchHero onSearch={setSearch} />

      {isSearching ? (
        <div className="max-w-3xl mx-auto py-10">
          <h2 className="text-xl mb-4 text-gray-900 dark:text-white">
            Search Results
          </h2>

          {filtered.length > 0 ? (
            <ul className="space-y-3">
              {filtered.map((item, i) => (
                <li
                  key={i}
                  className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800 transition-colors"
                >
                  {item.link ? (
                    <a
                      href={item.link}
                      className="font-medium text-purple-700 dark:text-purple-300 hover:underline"
                    >
                      {item.q}
                    </a>
                  ) : (
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.q}
                    </p>
                  )}
                  {item.a && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      {item.a}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No results found.
            </p>
          )}
        </div>
      ) : (
        <>
          <HelpCategories />
          <FAQAccordion />
        </>
      )}
    </MainContentLayout>
  );
}

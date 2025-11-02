import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { categories } from "./categories";

export function HelpCategories() {
  return (
    <div className="py-16 px-4  transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4 text-gray-900 dark:text-white">
            Browse Help Topics
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Find answers organized by category
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-dark-bg dark:to-gray-dark-bg"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-purple-50 dark:bg-purple-300 rounded-lg">
                      <IconComponent className="h-6 w-6 text-purple-primary dark:text-amber-primary" />
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      {category.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {category.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Top Questions:
                    </p>
                    {category.topQuestions.map((q, qIndex) => {
                      const text = typeof q === "string" ? q : q.question;
                      const link = typeof q === "string" ? "#" : q.link;

                      return (
                        <div key={qIndex}>
                          <a
                            href={link}
                            className="text-sm text-purple-800 dark:text-purple-300 hover:text-purple-950 dark:hover:text-purple-200 hover:underline block py-1"
                          >
                            {text}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { faqData } from "./faqData";

export function FAQAccordion() {
  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4 text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find quick answers to common questions
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg px-6 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <AccordionTrigger className="text-left py-6 hover:no-underline">
                <span className="pr-4">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-2 text-gray-700 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

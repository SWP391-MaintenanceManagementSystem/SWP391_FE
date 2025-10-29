import MainContentLayout from "@/components/MainContentLayout";
import { HelpCategories } from "./HelpCategories";
import SearchHero from "./SearchHero";
import { FAQAccordion } from "./FAQAccordion";

export default function HelpAndSupportPage() {
  return (
    <div className="font-inter">
      <MainContentLayout>
        <SearchHero />
        <HelpCategories />
        <FAQAccordion />
      </MainContentLayout>
    </div>
  );
}

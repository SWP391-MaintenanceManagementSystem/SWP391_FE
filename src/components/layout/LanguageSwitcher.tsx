import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[140px] h-8 border-none bg-transparent hover:bg-accent/50 transition-colors">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <SelectValue placeholder="Language" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          <span className="flex items-center gap-2">
            <span className="text-xs">🇺🇸</span> English
          </span>
        </SelectItem>
        <SelectItem value="vi">
          <span className="flex items-center gap-2">
            <span className="text-xs">🇻🇳</span> Tiếng Việt
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

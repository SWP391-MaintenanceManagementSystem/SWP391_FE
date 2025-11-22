import { useState } from "react";
import { useSearchServicesQuery } from "../queries";
import { useDebounce } from "@uidotdev/usehooks";
export default function useSearchServices() {
  const [keyword, setKeyword] = useState<string>("");
  const debouncedKeyword = useDebounce(keyword, 300);
  const { data, isLoading, error } = useSearchServicesQuery(debouncedKeyword);
  return {
    keyword,
    setKeyword,
    data,
    isLoading,
    error,
  };
}

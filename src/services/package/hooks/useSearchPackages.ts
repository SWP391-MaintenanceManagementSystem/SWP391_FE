import { useState } from "react";
import { useSearchPackagesQuery } from "../queries";
import { useDebounce } from "@uidotdev/usehooks";
export default function useSearchPackage() {
  const [keyword, setKeyword] = useState<string>("");
  const debouncedKeyword = useDebounce(keyword, 300);
  const { data, isLoading, error } = useSearchPackagesQuery(debouncedKeyword);
  return {
    keyword,
    setKeyword,
    data,
    isLoading,
    error,
  };
}

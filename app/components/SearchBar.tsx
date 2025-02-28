import React from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ISearchBar {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}
function SearchBar({ placeholder, value, setValue }: ISearchBar) {
  return (
    <div className="relative">
      <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        className="pl-8"
        placeholder={placeholder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
    </div>
  );
}

export default SearchBar;

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

interface TagManagerProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagManager = ({tags, setTags}: TagManagerProps) => {
  const [inputValue, setInputValue] = useState("");
  const [inputVisible, setInputVisible] = useState(false);

  // Remove a tag
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Add a new tag
  const addTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue)) {
      setTags([...tags, inputValue.trim()]);
    }
    setInputValue("");
    setInputVisible(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 border p-4 rounded-lg">
      {tags.map(tag => (
        <div key={tag} className="flex items-center bg-orange-100 text-primary px-3 py-1 rounded-md">
          {tag}
          {tag !== "All" && (
            <button onClick={() => removeTag(tag)} className="ml-2 text-gray-500 hover:text-gray-700">
              <X size={14} />
            </button>
          )}
        </div>
      ))}

      {inputVisible ? (
        <Input
          autoFocus
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onBlur={addTag}
          onKeyDown={e => e.key === "Enter" && addTag()}
          className="w-24 h-8 px-2 text-sm"
        />
      ) : (
        <Button variant="outline" size="sm" onClick={() => setInputVisible(true)} className="flex items-center gap-1">
          <Plus size={14} /> New Tag
        </Button>
      )}
    </div>
  );
};

export default TagManager;

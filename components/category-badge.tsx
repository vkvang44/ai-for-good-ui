import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const CategoryBadge = ({
  initialCategory,
  options,
  onChange, // Callback to handle category change
}: {
  initialCategory: string;
  options: string[];
  onChange: (category: string) => void; // Callback to handle category change
}) => {
  const [category, setCategory] = useState(initialCategory);

  // Determine color based on score percentage
  const getScoreColor = () => {
    switch (category) {
      case "Exceptional":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Experienced":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Proficient":
        return "bg-yellow-100 text-red-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Emerging":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "Beginning":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          variant="outline"
          className={cn("ml-2 cursor-pointer", getScoreColor())}
        >
          {category}
        </Badge>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => {
              setCategory(option);
              onChange(option);
            }}
            className="cursor-pointer"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

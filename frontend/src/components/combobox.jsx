import { useState } from "react";
import { cn } from "../lib/utils";
import { ChevronDown, Check } from "lucide-react";

export function Combobox({ options, value, onChange, placeholder, className, disabled = false }) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="relative w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => !disabled && setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        />
        <button
          type="button"
          onClick={() => !disabled && setOpen(!open)}
          className={cn(
            "absolute right-1 top-1/2 -translate-y-1/2 p-1",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          disabled={disabled}
        >
          <ChevronDown className="h-4 w-4 opacity-50" />
        </button>
      </div>
      {open && !disabled && (
        <div className="absolute top-full mt-1 w-full rounded-md border border-input bg-background shadow-md z-10 max-h-60 overflow-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "flex cursor-pointer items-center px-3 py-2 hover:bg-accent",
                  value === option.value && "bg-accent"
                )}
                onClick={() => {
                  onChange(option.value);
                  setSearchTerm(option.label);
                  setOpen(false);
                }}
              >
                <span className="flex-1">{option.label}</span>
                {value === option.value && <Check className="h-4 w-4" />}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-muted-foreground">No results found</div>
          )}
        </div>
      )}
    </div>
  );
} 
"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxProps {
  options: { label: string; value: string }[];
  value?: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  notFoundText?: string;
  triggerClassName?: string;
}

export function Combobox({
  options,
  value,
  onSelect,
  placeholder,
  searchPlaceholder,
  notFoundText,
  triggerClassName,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const displayValue =
    options.find((option) => option.value === value)?.value ||
    placeholder ||
    "Select option..."

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("flex items-center justify-center gap-1", triggerClassName)}
        >
          {displayValue}
          <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder || "Search..."} />
          <CommandEmpty>{notFoundText || "No option found."}</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={(currentValue) => {
                    // This onSelect is for keyboard navigation
                    const selectedOption = options.find(
                      (opt) => opt.label.toLowerCase() === currentValue.toLowerCase()
                    );
                    if (selectedOption) {
                      onSelect(selectedOption.value)
                    }
                    setOpen(false)
                  }}
                  onMouseDown={(e) => {
                    // This onMouseDown is for mouse/touch clicks
                    e.preventDefault();
                    onSelect(option.value);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

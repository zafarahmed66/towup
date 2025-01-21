import * as React from "react";
import {
  format,
  getMonth,
  getYear,
  setMonth,
  setYear,
  parseISO,
} from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface DatePickerProps {
  startYear?: number;
  endYear?: number;
  onSelect?: (date: Date) => void;
  date?: Date | number[] | string;
}

export function DatePicker({
  startYear = getYear(new Date()) - 100,
  endYear = getYear(new Date()) + 100,
  onSelect,
  date: providedDate,
}: DatePickerProps) {
  const parseDate = (date: Date | number[] | string | undefined): Date => {
    if (date instanceof Date) return date;
    if (Array.isArray(date)) return new Date(date[0], date[1] - 1, date[2]); 
    if (typeof date === "string") return parseISO(date); 
    return new Date(); 
  };

  const [date, setDate] = React.useState<Date>(parseDate(providedDate));

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  const handleMonthChange = (month: string) => {
    const monthIndex = months.indexOf(month);
    if (monthIndex === -1) return; // Validate month
    const newDate = setMonth(date, monthIndex);
    setDate(newDate);
    if (onSelect) onSelect(newDate);
  };

  const handleYearChange = (year: string) => {
    const yearNumber = parseInt(year);
    if (isNaN(yearNumber) || yearNumber < startYear || yearNumber > endYear)
      return; // Validate year
    const newDate = setYear(date, yearNumber);
    setDate(newDate);
    if (onSelect) onSelect(newDate);
  };

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      if (onSelect) onSelect(selectedDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="flex justify-between p-2">
          <Select
            onValueChange={handleMonthChange}
            value={months[getMonth(date)]}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            onValueChange={handleYearChange}
            value={getYear(date).toString()}
          >
            <SelectTrigger className="w-[110px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          month={date}
          onMonthChange={setDate}
        />
      </PopoverContent>
    </Popover>
  );
}

'use client';

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

export default function DatePicker({durationError, setDurationError, setDuration}) {
  const [date, setDate] = React.useState(null);
   // To store the error message

  // Function to handle the date selection
  const handleDateSelect = (selectedDate) => {
    const today = new Date();

    // Reset the error when a new date is selected
    setDurationError("");

    // Check if the selected date is less than today
    if (selectedDate && selectedDate <= today.setHours(0, 0, 0, 0)) {
        setDurationError("Date cannot be in the past!");
    } else {
      setDate(selectedDate);
      calculateTimeDifference(selectedDate)
    setDurationError("");

    }
  };



  const calculateTimeDifference = (selectedDate) => {
    const today = new Date();
    const timeDifferenceInMs = selectedDate.getTime() - today.getTime(); // Time difference in milliseconds
    const timeDifferenceInSeconds = Math.floor(timeDifferenceInMs / 1000); // Convert to seconds

    setDuration(timeDifferenceInSeconds); // Set the duration in seconds

    // For debugging purpose, log the duration
    console.log("Time difference in seconds:", timeDifferenceInSeconds);

    // You can pass the `timeDifferenceInSeconds` to the smart contract, for example, for a campaign duration
  };


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal mt-2 p-3 py-6 border-[0.1px] border-gray-600 rounded-md focus:outline-none focus:ring-gray-500 focus:ring-[0.6px]",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-orange-600" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
      {/* Error message display */}
      {durationError && <div className="text-red-500 text-sm mt-2">{durationError}</div>}
    </Popover>
  );
}

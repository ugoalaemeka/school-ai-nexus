
import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface DatePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  label?: string;
}

interface TimePickerProps {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
}

export const DatePicker = ({ date, onDateChange, label }: DatePickerProps) => {
  return (
    <FormItem className="flex flex-col">
      {label && <FormLabel>{label}</FormLabel>}
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={cn(
                "w-full pl-3 text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            initialFocus
            className="p-3 pointer-events-auto"
            disabled={(date) => {
              // Disable past dates and dates more than 3 months in the future
              const now = new Date();
              const maxDate = new Date();
              maxDate.setMonth(now.getMonth() + 3);
              return date < new Date() || date > maxDate;
            }}
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
};

export const TimePicker = ({ value, onValueChange, label }: TimePickerProps) => {
  // Generate time slots from 9AM to 4PM with 30 minute intervals
  const timeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 16; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        // Skip 4:30PM
        if (hour === 16 && minute === 30) continue;
        
        const formattedHour = hour % 12 || 12;
        const period = hour < 12 ? 'AM' : 'PM';
        const formattedMinute = minute === 0 ? '00' : minute;
        
        slots.push(`${formattedHour}:${formattedMinute} ${period}`);
      }
    }
    return slots;
  };

  return (
    <FormItem className="flex flex-col">
      {label && <FormLabel>{label}</FormLabel>}
      <Select value={value} onValueChange={onValueChange}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a time">
              {value ? (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{value}</span>
                </div>
              ) : (
                "Select a time"
              )}
            </SelectValue>
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {timeSlots().map((time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};

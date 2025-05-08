
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CountrySelectProps {
  onChange: (value: string) => void;
  value: string;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({ onChange, value }) => {
  return (
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger>
        <SelectValue placeholder="Select country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="US">United States</SelectItem>
        <SelectItem value="UK">United Kingdom</SelectItem>
        <SelectItem value="CA">Canada</SelectItem>
        <SelectItem value="AU">Australia</SelectItem>
        <SelectItem value="NG">Nigeria</SelectItem>
        <SelectItem value="GH">Ghana</SelectItem>
        <SelectItem value="KE">Kenya</SelectItem>
        <SelectItem value="ZA">South Africa</SelectItem>
        <SelectItem value="IN">India</SelectItem>
        <SelectItem value="CN">China</SelectItem>
        <SelectItem value="JP">Japan</SelectItem>
        <SelectItem value="DE">Germany</SelectItem>
        <SelectItem value="FR">France</SelectItem>
        <SelectItem value="BR">Brazil</SelectItem>
        <SelectItem value="MX">Mexico</SelectItem>
      </SelectContent>
    </Select>
  );
};

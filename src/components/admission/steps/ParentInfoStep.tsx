
import React from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ParentInfoStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export const ParentInfoStep: React.FC<ParentInfoStepProps> = ({ 
  formData, 
  updateFormData 
}) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl">Parent/Guardian Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="parentName">Full Name</Label>
          <Input
            id="parentName"
            placeholder="Enter parent/guardian's full name"
            value={formData.parentName}
            onChange={(e) => updateFormData({ parentName: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="relationship">Relationship to Student</Label>
          <Select
            value={formData.relationship}
            onValueChange={(value) => updateFormData({ relationship: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mother">Mother</SelectItem>
              <SelectItem value="father">Father</SelectItem>
              <SelectItem value="guardian">Legal Guardian</SelectItem>
              <SelectItem value="grandparent">Grandparent</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            Login credentials will be sent to this email address
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Residential Address</Label>
          <Textarea
            id="address"
            placeholder="Enter full residential address"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            rows={3}
          />
        </div>
      </CardContent>
    </>
  );
};


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const CheckInFormSettings = () => {
  const [formSettings, setFormSettings] = useState({
    requiredFields: ["name", "email", "host"],
    visitorAgreement: "By signing, I acknowledge that I have read and agree to abide by all company policies during my visit.",
    healthScreening: true,
    healthQuestions: "Do you have any COVID-19 symptoms?\nHave you been exposed to anyone with COVID-19 in the past 14 days?"
  });

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0">
      <CardHeader>
        <CardTitle>Check-In Form Settings</CardTitle>
        <CardDescription>
          Configure the fields and content for your visitor check-in form
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="required-fields">Required Check-In Fields</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {["name", "email", "phone", "company", "host", "purpose", "photo", "signature"].map((field) => (
              <div key={field} className="flex items-center space-x-2">
                <Checkbox 
                  id={`field-${field}`} 
                  checked={formSettings.requiredFields.includes(field)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormSettings({...formSettings, requiredFields: [...formSettings.requiredFields, field]});
                    } else {
                      setFormSettings({...formSettings, requiredFields: formSettings.requiredFields.filter(f => f !== field)});
                    }
                  }}
                />
                <label htmlFor={`field-${field}`} className="text-sm">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <Label htmlFor="visitor-agreement">Visitor Agreement Text</Label>
          <Textarea 
            id="visitor-agreement"
            value={formSettings.visitorAgreement}
            onChange={(e) => setFormSettings({...formSettings, visitorAgreement: e.target.value})}
            rows={3}
            className="mt-1"
          />
        </div>
        
        <div>
          <div className="flex items-center space-x-2">
            <Switch 
              id="health-screening"
              checked={formSettings.healthScreening}
              onCheckedChange={(checked) => setFormSettings({...formSettings, healthScreening: checked})}
            />
            <Label htmlFor="health-screening">Enable Health Screening Questions</Label>
          </div>
          
          {formSettings.healthScreening && (
            <div className="mt-4">
              <Label htmlFor="health-questions">Health Screening Questions</Label>
              <Textarea 
                id="health-questions"
                value={formSettings.healthQuestions}
                onChange={(e) => setFormSettings({...formSettings, healthQuestions: e.target.value})}
                rows={4}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter one question per line. Visitors must answer "No" to all questions to proceed.
              </p>
            </div>
          )}
        </div>
        
        <Button>Save Form Settings</Button>
      </CardContent>
    </Card>
  );
};

export default CheckInFormSettings;

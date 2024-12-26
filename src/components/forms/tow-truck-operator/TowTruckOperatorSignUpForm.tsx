import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Mail, Phone, Lock, Bell, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function TowTruckOperatorSignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    password: "",
    confirmPassword: "",
    operationalRegion: "",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      operationalRegion: value,
    }));
  };

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the signup data to your backend
    console.log("Signup data:", formData);
    navigate("/signup-confirmation");
  };

  return (
    <div className="min-h-screen bg-[#2B4380] flex items-center justify-center p-4 w-screen">
      <Card className="w-full max-w-2xl mx-4 sm:mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#2B4380]">
            Sign Up as Tow Truck Operator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-[#3b5998]" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#3b5998]" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#3b5998]" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="licenseNumber"
                    className="flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4 text-[#3b5998]" />
                    License Number
                  </Label>
                  <Input
                    id="licenseNumber"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="operationalRegion"
                    className="flex items-center gap-2"
                  >
                    <MapPin className="h-4 w-4 text-[#3b5998]" />
                    Operational Region
                  </Label>
                  <Select
                    onValueChange={handleSelectChange}
                    value={formData.operationalRegion}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your operational region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new-york">New York Region</SelectItem>
                      <SelectItem value="san-francisco">
                        San Francisco Region
                      </SelectItem>
                      <SelectItem value="los-angeles">
                        Los Angeles Region
                      </SelectItem>
                      <SelectItem value="chicago">Chicago Region</SelectItem>
                      <SelectItem value="miami">Miami Region</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-[#3b5998]" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4 text-[#3b5998]" />
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-[#3b5998] hover:bg-[#344e86] text-white"
                >
                  Next
                </Button>
              </>
            )}
            {step === 2 && (
              <>
                <h3 className="text-lg font-semibold text-[#2B4380] mb-4">
                  Configure Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-[#3b5998]" />
                      <Label
                        htmlFor="emailNotifications"
                        className="text-sm font-medium"
                      >
                        Email Notifications
                      </Label>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          email: checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-[#3b5998]" />
                      <Label
                        htmlFor="smsNotifications"
                        className="text-sm font-medium"
                      >
                        SMS Notifications
                      </Label>
                    </div>
                    <Switch
                      id="smsNotifications"
                      checked={notifications.sms}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, sms: checked }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="h-4 w-4 text-[#3b5998]" />
                      <Label
                        htmlFor="pushNotifications"
                        className="text-sm font-medium"
                      >
                        Push Notifications
                      </Label>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={notifications.push}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, push: checked }))
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mt-4">
                  <Button
                    type="button"
                    onClick={prevStep}
                    className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="w-1/2 bg-[#3b5998] hover:bg-[#344e86] text-white"
                  >
                    Complete Signup
                  </Button>
                </div>
              </>
            )}
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#3b5998] hover:underline">
                Log in
              </Link>
            </p>

            <p className="text-sm text-gray-600 mt-2">
              <a href="/signup?type=repo">Sign up as a Repo Company</a> or
              <a href="/signup?type=fleet"> Fleet Owner</a>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

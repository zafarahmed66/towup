import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Mail,
  Phone,
  Lock,
  Building2,
  MapPin,
  FileText,
  Calendar,
  Bell,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function RepoCompanySignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [documentHasExpiration, setDocumentHasExpiration] = useState<boolean[]>(
    [false]
  );
  const [useCompanyEmail, setUseCompanyEmail] = useState(false);
  const [useCompanyPhone, setUseCompanyPhone] = useState(false);
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/signup-confirmation");
  };

  return (
    <div className="min-h-screen bg-[#2B4380] flex items-center justify-center p-4 w-screen">
      <Card className="w-full max-w-2xl mx-4 sm:mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#2B4380]">
            Sign Up as Repossession Company
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 && (
              <>
                <h3 className="text-lg font-semibold text-[#2B4380] mb-4">
                  Company Information
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="company" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-[#3b5998]" />
                    Company Name
                  </Label>
                  <Input id="company" placeholder="Repo Company Inc" required />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="companyEmail"
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4 text-[#3b5998]" />
                    Company Email
                  </Label>
                  <Input
                    id="companyEmail"
                    type="email"
                    placeholder="contact@repocompany.com"
                    required
                    onChange={(e) => setCompanyEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="companyPhone"
                    className="flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4 text-[#3b5998]" />
                    Company Phone
                  </Label>
                  <Input
                    id="companyPhone"
                    type="tel"
                    placeholder="(555) 987-6543"
                    required
                    onChange={(e) => setCompanyPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#3b5998]" />
                    Company Address
                  </Label>
                  <Input
                    id="address"
                    placeholder="456 Repo Street, Anytown, USA 12345"
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
                  Account Information
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-[#3b5998]" />
                    Full Name
                  </Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[#3b5998]" />
                    Email
                  </Label>
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="useCompanyEmail"
                      checked={useCompanyEmail}
                      onCheckedChange={(checked) =>
                        setUseCompanyEmail(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="useCompanyEmail"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Use company email
                    </label>
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    disabled={useCompanyEmail}
                    value={useCompanyEmail ? companyEmail : undefined}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#3b5998]" />
                    Phone Number
                  </Label>
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="useCompanyPhone"
                      checked={useCompanyPhone}
                      onCheckedChange={(checked) =>
                        setUseCompanyPhone(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="useCompanyPhone"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Use company phone
                    </label>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    required
                    disabled={useCompanyPhone}
                    value={useCompanyPhone ? companyPhone : undefined}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-[#3b5998]" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                  <Button
                    type="button"
                    onClick={prevStep}
                    className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-1/2 bg-[#3b5998] hover:bg-[#344e86] text-white"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <h3 className="text-lg font-semibold text-[#2B4380] mb-4">
                  Official Documents
                </h3>
                {documentHasExpiration.map((hasExpiration, index) => (
                  <div key={index} className="space-y-4 mb-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor={`documentName${index}`}
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4 text-[#3b5998]" />
                        Document Name
                      </Label>
                      <Input
                        id={`documentName${index}`}
                        placeholder="Enter document name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`documentFile${index}`}
                        className="flex items-center gap-2"
                      >
                        <FileText className="h-4 w-4 text-[#3b5998]" />
                        Upload Document
                      </Label>
                      <Input id={`documentFile${index}`} type="file" />
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <Checkbox
                        id={`hasExpiration${index}`}
                        checked={hasExpiration}
                        onCheckedChange={(checked) => {
                          const newDocumentHasExpiration = [
                            ...documentHasExpiration,
                          ];
                          newDocumentHasExpiration[index] = checked as boolean;
                          setDocumentHasExpiration(newDocumentHasExpiration);
                        }}
                      />
                      <label
                        htmlFor={`hasExpiration${index}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Document has expiration date
                      </label>
                    </div>
                    {hasExpiration && (
                      <div className="space-y-2">
                        <Label
                          htmlFor={`expirationDate${index}`}
                          className="flex items-center gap-2"
                        >
                          <Calendar className="h-4 w-4 text-[#3b5998]" />
                          Expiration Date
                        </Label>
                        <Input id={`expirationDate${index}`} type="date" />
                      </div>
                    )}
                  </div>
                ))}
                {documentHasExpiration.length < 4 && (
                  <Button
                    type="button"
                    onClick={() =>
                      setDocumentHasExpiration([
                        ...documentHasExpiration,
                        false,
                      ])
                    }
                    className="w-full bg-[#3b5998] hover:bg-[#344e86] text-white"
                  >
                    Add Another Document
                  </Button>
                )}
                <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                  <Button
                    type="button"
                    onClick={prevStep}
                    className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800"
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-1/2 bg-[#3b5998] hover:bg-[#344e86] text-white"
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
            {step === 4 && (
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
                <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
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
              <a href="/signup?type=fleet">Sign up as a Fleet Owner</a> or
              <a href="/signup?type=operator"> Tow Truck Operator</a>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

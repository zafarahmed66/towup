import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Mail, MessageSquare, ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { profileType, UserData } from "./ProfilePage";
import api from "@/controller/axiosController";
import { useAuth } from "@/context/AuthContext";

export default function ConfigureNotifications() {
  const location = useLocation();
  const state = location.state as UserData;

  // Initialize state with values from location.state or default to false
  const [pushNotifications, setPushNotifications] = useState(
    state?.user.appNotificationSetting.appNotificationEnabled ?? false
  );
  const [emailNotifications, setEmailNotifications] = useState(
    state?.user.appNotificationSetting.emailNotificationEnabled ?? false
  );
  const [smsNotifications, setSmsNotifications] = useState(
    state?.user.appNotificationSetting.smsNotificationEnabled ?? false
  );

  const navigate = useNavigate();
  const { userType } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const updatedData = {
        appNotificationSetting: {
          emailNotificationEnabled: emailNotifications,
          smsNotificationEnabled: smsNotifications,
          appNotificationEnabled: pushNotifications,
        },
      };

      await api.post("/users/me/update", updatedData);
      toast.success("Notification preferences saved successfully!");
      if (userType) {
        navigate(`${profileType[userType]}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#2B4380] p-4 md:p-8 w-screen">
      <div className="max-w-2xl px-4 mx-auto sm:px-6 lg:px-8">
        <Link
          to={`${profileType[userType!]}`}
          className="flex items-center mb-4 text-white hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </Link>
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-[#2B4380] mb-6">
              Configure Notifications
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Push Notifications Switch */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-[#3b5998]" />
                    <Label
                      htmlFor="push-notifications"
                      className="text-sm font-medium"
                    >
                      Push Notifications
                    </Label>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={pushNotifications}
                    onCheckedChange={(value) => setPushNotifications(value)}
                  />
                </div>

                {/* Email Notifications Switch */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-[#3b5998]" />
                    <Label
                      htmlFor="email-notifications"
                      className="text-sm font-medium"
                    >
                      Email Notifications
                    </Label>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={(value) => setEmailNotifications(value)}
                  />
                </div>

                {/* SMS Notifications Switch */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-[#3b5998]" />
                    <Label
                      htmlFor="sms-notifications"
                      className="text-sm font-medium"
                    >
                      SMS Notifications
                    </Label>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={smsNotifications}
                    onCheckedChange={(value) => setSmsNotifications(value)}
                  />
                </div>
              </div>

              {/* Save Preferences Button */}
              <Button
                type="submit"
                className="w-full bg-[#3b5998] hover:bg-[#344e86] text-white"
              >
                Save Preferences
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

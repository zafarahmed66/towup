import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Settings, Lock, ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserData } from "./ProfilePage";
import useCookie from "@/hooks/useCookie";
import api from "@/controller/axiosController";
import { toast } from "react-toastify";

export default function EditTelematicsInfo() {
  const location = useLocation();
  const state = location.state as UserData;
  const [userType] = useCookie("userType", "");
  const [provider, setProvider] = useState(
    state?.telematicSettings?.telematicProvider ?? ""
  );
  const [apiKey, setApiKey] = useState(
    state?.telematicSettings?.telematicApiKey ?? ""
  );

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const updatedData = {
        telematicSettings: {
          telematicProvider: provider,
          telematicApiKey: apiKey,
        },
      };

      await api.post(
        `/api/${userType === "FLEET_OWNER" ? "fleetowners" : "repo-companies"}/me/update`,
        updatedData
      );
      toast.success("Account details updated successfully!");
      navigate("/profile")
    } catch (error) {
      console.log(error);
      toast.error("Failed to update account details.");
    }
  };

  return (
    <div className="min-h-screen bg-[#2B4380] p-4 md:p-8 w-screen">
      <div className="max-w-2xl px-4 mx-auto sm:px-6 lg:px-8">
        <Link
          to="/profile"
          className="flex items-center mb-4 text-white hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </Link>
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-[#2B4380] mb-6">
              Edit Telematics Information
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label
                  htmlFor="telematicsProvider"
                  className="flex items-center gap-2"
                >
                  <Settings className="h-4 w-4 text-[#3b5998]" />
                  Telematics Provider
                </Label>
                <Select value={provider} onValueChange={setProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select telematics provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TEST">TEST</SelectItem>
                    <SelectItem value="geotab">GeoTab</SelectItem>
                    <SelectItem value="samsara">Samsara</SelectItem>
                    <SelectItem value="test">Test</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="apiKey" className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-[#3b5998]" />
                  API Key
                </Label>
                <Input
                  id="apiKey"
                  type="text"
                  placeholder="Enter your API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#3b5998] hover:bg-[#344e86] text-white"
              >
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

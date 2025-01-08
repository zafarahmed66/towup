import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, ArrowLeft, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserData } from "./ProfilePage";
import useCookie from "@/hooks/useCookie";
import { toast } from "react-toastify";
import api from "@/controller/axiosController";

export default function EditOperationalRegions() {
  const location = useLocation();
  const state = location.state as UserData;
  const [selectedRegions, setSelectedRegions] = useState<string[]>(
    state.operationalRegions || []
  );
  const [userType] = useCookie("userType", "");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const updatedData = {
        operationalRegions: selectedRegions,
      };

      await api.post(
        `/api/${userType === "FLEET_OWNER" ? "fleetowners" : "repo-companies"}/me/update`,
        updatedData
      );
      toast.success("Account details updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update account details.");
    }
  };

  const handleRegionSelect = (value: string) => {
    if (!selectedRegions.includes(value)) {
      setSelectedRegions([...selectedRegions, value]);
    }
  };

  const removeRegion = (region: string) => {
    setSelectedRegions(selectedRegions.filter((r) => r !== region));
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
              Edit Operational Regions
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="region" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#3b5998]" />
                  Select Region
                </Label>
                <Select onValueChange={handleRegionSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEW_YORK_METRO">
                      New York Region
                    </SelectItem>
                    <SelectItem value="SAN_FRANCISCO_BAY">
                      San Francisco Region
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedRegions.map((region) => (
                  <div
                    key={region}
                    className="bg-[#3b5998] text-white px-3 py-1 rounded-full flex items-center"
                  >
                    <span>{region}</span>
                    <button
                      type="button"
                      onClick={() => removeRegion(region)}
                      className="ml-2 focus:outline-none"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
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

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import {
  Bell,
  MapPin,
  Phone,
  Mail,
  Building2,
  LogOut,
  Edit,
  User,
  Lock,
  Settings,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import api from "@/controller/axiosController";
import useCookie from "@/hooks/useCookie";
import { InviteUser } from "@/components/InviteUser";

export interface UserData {
  companyName: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  user: {
    fullname: string;
    email: string;
    phoneNumber: string;
    appNotificationSetting: {
      emailNotificationEnabled: boolean;
      smsNotificationEnabled: boolean;
      appNotificationEnabled: boolean;
    };
  };
  telematicSettings?: {
    telematicProvider: string;
    telematicApiKey: string;
  };
  operationalRegions?: string[];
}

export default function ProfilePage() {
  const [data, setData] = useState<UserData>();
  const [userId, _setUserId, removeUserId] = useCookie("userId", "");
  const [_token, _setToken, removeToken] = useCookie("token", "");
  const [_expiresIn, _setExpiresIn, removeExpiresIn] = useCookie(
    "expiresIn",
    ""
  );
  const [userType, _setUserType, removeUserType] = useCookie("userType", "");

  const navigate = useNavigate();

  const onLogOut = (event: any) => {
    event.preventDefault();
    removeToken();
    removeExpiresIn();
    removeUserType();
    removeUserId();
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserType = async () => {
      const response = await api.get(
        `/api/${userType === "FLEET_OWNER" ? "fleetowners" : "repo-companies"}/${userId}`
      );
      setData(response.data);
    };

    fetchUserType();
  }, []);

  return (
    <div className="min-h-screen bg-[#2B4380] w-screen">
      {/* Profile Content */}
      <div className="max-w-4xl p-4 mx-auto space-y-4 md:p-8">
        {/* Profile Card */}
        <Card className="overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-[#3b5998] to-[#2B4380] p-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              <div className="p-1 bg-white rounded-full shadow-md">
                <div className="h-24 w-24 rounded-full bg-[#4CAF50] text-white flex items-center justify-center text-3xl font-bold">
                  {userType === "FLEET_OWNER" ? "FO" : "RC"}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {data?.companyName}
                </h2>
              </div>
            </div>
          </div>
          <CardContent className="pt-6 space-y-8">
            {/* Account Details Section */}
            <div className="p-4 rounded-lg shadow-sm bg-gray-50 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-[#2B4380]">
                  Account Details
                </h3>
                <Link to="/profile/account/edit" state={data}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-[#3b5998] text-white hover:bg-[#344e86] hover:text-white"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </Link>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="h-5 w-5 text-[#3b5998]" />
                  <span>{data?.companyName}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-5 w-5 text-[#3b5998]" />
                  <span>{data?.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-5 w-5 text-[#3b5998]" />
                  <span>
                    {data?.address.street}, {data?.address.city},{" "}
                    {data?.address.state}, {data?.address.country},{" "}
                    {data?.address.postalCode}
                  </span>
                </div>
              </div>
            </div>

            {/* User Profile Section */}
            <div className="p-4 rounded-lg shadow-sm bg-gray-50 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-[#2B4380]">
                  User Profile
                </h3>
                <Link to="/profile/user/edit" state={data}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-[#3b5998] text-white hover:bg-[#344e86] hover:text-white"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </Link>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center gap-3 text-sm">
                  <User className="h-5 w-5 text-[#3b5998]" />
                  <span>{data?.user.fullname}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-5 w-5 text-[#3b5998]" />
                  <span>{data?.user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-5 w-5 text-[#3b5998]" />
                  <span>{data?.user.phoneNumber}</span>
                </div>
              </div>
            </div>

            {userType === "FLEET_OWNER" && (
              <>
                {/* Telematics Information Section */}
                <div className="p-4 rounded-lg shadow-sm bg-gray-50 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-[#2B4380]">
                      Telematics Information
                    </h3>
                    <Link to="/profile/telematics/edit" state={data}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-[#3b5998] text-white hover:bg-[#344e86] hover:text-white"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Settings className="h-5 w-5 text-[#3b5998]" />
                      <span>
                        Telematics Provider:{" "}
                        {data?.telematicSettings?.telematicProvider}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Lock className="h-5 w-5 text-[#3b5998]" />
                      <span>API Key: ••••••••••••••••</span>
                    </div>
                  </div>
                </div>

                {/* Operational Regions Section */}
                <div className="p-4 rounded-lg shadow-sm bg-gray-50 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-[#2B4380]">
                      Operational Regions
                    </h3>
                    <Link to="/profile/regions/edit" state={data}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-[#3b5998] text-white hover:bg-[#344e86] hover:text-white"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data?.operationalRegions
                      ? data.operationalRegions.map((region, index) => (
                          <span
                            className="bg-[#3b5998] text-white px-3 py-1 rounded-full "
                            key={index}
                          >
                            {region}
                          </span>
                        ))
                      : "No operational region found"}
                  </div>
                </div>
              </>
            )}

            {userType === "REPO_COMPANY" && (
              <>
                {/* Tow Truck Operators Section */}
                <div className="p-4 rounded-lg shadow-sm bg-gray-50 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-[#2B4380] ">
                      Tow Truck Operators
                    </h3>
                    <div className="space-x-2">
                      <InviteUser />
                      {/* <Button
                          variant="outline"
                          size="sm"
                          className="bg-[#3b5998] text-white hover:bg-[#344e86] hover:text-white"
                        >
                          View All
                        </Button> */}
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Truck className="h-5 w-5 text-[#3b5998]" />
                      <span>John Smith</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Truck className="h-5 w-5 text-[#3b5998]" />
                      <span>Jane Doe</span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Preferences Section */}
            <div className="p-4 rounded-lg shadow-sm bg-gray-50 sm:p-6">
              <h3 className="text-xl font-semibold text-[#2B4380] mb-4">
                Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-[#3b5998]" />
                    <div>
                      <span className="text-sm font-medium">Notifications</span>
                      <p className="text-xs text-gray-500">
                        Email, SMS, and in-app notifications
                      </p>
                    </div>
                  </div>
                  <Link to="/profile/notifications" state={data}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-[#3b5998] text-white hover:bg-[#344e86] hover:text-white"
                    >
                      Configure
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-[#3b5998] text-white hover:bg-[#344e86] hover:text-white"
                  >
                    Manage
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="destructive" size="sm" onClick={onLogOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

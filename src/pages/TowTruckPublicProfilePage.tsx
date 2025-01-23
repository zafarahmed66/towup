/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import {
  Bell,
  MapPin,
  Phone,
  Mail,
  Building2,
  User,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/controller/axiosController";
import { UserData } from "./ProfilePage";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function TowTruckPublicProfilePage() {
  const [data, setData] = useState<UserData>();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const response = await api.get(`/api/towtruckoperators/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error instanceof AxiosError) {
          if (error.status === 403) {
            navigate("/");
            toast.error("Unauthorized");
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserType();
  }, []);

  return (
    <div className="min-h-screen bg-[#2B4380] w-screen">
      <div className="max-w-4xl p-4 mx-auto space-y-4 md:p-8">
        <Card className="overflow-hidden shadow-lg">
          <div className="bg-gradient-to-r from-[#3b5998] to-[#2B4380] p-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              <div className="relative cursor-pointer group">
                <div className="p-1 bg-white rounded-full shadow-md">
                  {data?.profilePictureUrl ? (
                    <img
                      src={data.profilePictureUrl as string}
                      alt="Profile"
                      className="object-cover w-24 h-24 rounded-full"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-[#4CAF50] text-white flex items-center justify-center text-3xl font-bold">
                      TO
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  {data?.user.fullname}
                </h2>
                <p className="text-white text-lg">{data?.operatorName}</p>
              </div>
            </div>
          </div>
          {isLoading ? (
            <div className="p-4 space-y-4">
              <div className="bg-gray-300 rounded-lg h-36 animate-pulse"></div>
              <div className="h-48 bg-gray-300 rounded-lg animate-pulse"></div>
              <div className="bg-gray-300 rounded-lg h-36 animate-pulse"></div>
            </div>
          ) : (
            <CardContent className="pt-6 space-y-8">
              {/* Account Details  */}
              <div className="p-4 rounded-lg shadow-sm bg-gray-50 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2B4380]">
                    Account Details
                  </h3>
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Lock className="h-5 w-5 text-[#3b5998]" />
                    <span>License Number: {data?.licenseNumber}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-5 w-5 text-[#3b5998]" />
                    <span>Operational Region: {data?.operationalRegion}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Building2 className="h-5 w-5 text-[#3b5998]" />
                    <span>Operator Name: {data?.operatorName}</span>
                  </div>
                </div>
              </div>

              {/* User Details  */}
              <div className="p-4 rounded-lg shadow-sm bg-gray-50 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2B4380]">
                    User Profile
                  </h3>
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

              <div className="p-4 rounded-lg shadow-sm bg-gray-50 sm:p-6">
                <h3 className="text-xl font-semibold text-[#2B4380] mb-4">
                  Preferences
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-[#3b5998]" />
                      <div>
                        <span className="text-sm font-medium">
                          Notifications
                        </span>
                        <p className="text-xs text-gray-500">
                          Email, SMS, and in-app notifications
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}

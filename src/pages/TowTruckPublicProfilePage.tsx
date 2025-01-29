/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Building2, User, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/controller/axiosController";
import { UserData } from "./ProfilePage";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import ProfileHeader from "@/components/ProfileHeader";
import { useAuth } from "@/context/AuthContext";

export default function TowTruckPublicProfilePage() {
  const [data, setData] = useState<UserData>();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const { userId, userType } = useAuth();
  const id = params.id;

  useEffect(() => {
    if (Number(userId) === Number(id) && userType === "TOW_TRUCK") {
      navigate("/towtruckop/profile");
      return;
    }
    const fetchUserType = async () => {
      try {
        const response = await api.get(`/api/towtruckoperators/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error instanceof AxiosError) {
          if (error.status === 403) {
            navigate("/");
            toast.error("Unauthorized!!!!");
          } else if (error.status === 404) {
            navigate("/");
            toast.error("No user found");
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
          <ProfileHeader
            companyName={data?.user.fullname || ""}
            image={(data?.profilePictureUrl as string) || ""}
            name={data?.operatorName || ""}
          />
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
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from "react";
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
  Camera,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "@/controller/axiosController";
import { InviteUser } from "@/components/InviteUser";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { DocumentData } from "./ApproveDocumentsPage";
import { format } from "date-fns";
import { formatDateArray } from "@/lib/utils";

export interface UserData {
  repoCompanyId?: string;
  companyName: string;
  profilePictureUrl?: string | Blob;
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

export const profileType = {
  REPO_COMPANY: "/repocompany/profile",
  FLEET_OWNER: "/fleetowner/profile",
  TOW_TRUCK: "/towtruckop/profile",
  SYS_ADMIN: "/",
};

function getEndpointPath(type: string) {
  switch (type) {
    case "FLEET_OWNER":
      return "fleetowners";
    case "REPO_COMPANY":
      return "repo-companies";
    default:
      return "towtruckoperators";
  }
}

export default function ProfilePage() {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [data, setData] = useState<UserData>();
  const [isLoading, setIsLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { userType, userId, onLogOut } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userType && location.pathname !== profileType[userType]) {
      toast.error("Unauthorized");
      navigate("/");
    }
  }, [userType, location.pathname, navigate]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!userType) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const endpoint = data?.profilePictureUrl
        ? "/api/profile-pictures/update"
        : "/api/profile-pictures/upload";

      await api.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const response = await api.get(
        `/api/${getEndpointPath(userType)}/${userId}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const response = await api.get(
          `/api/${getEndpointPath(userType!)}/${userId}`
        );
        setData(response.data);
        if (userType === "REPO_COMPANY") {
          const documentsResponse = await api.get(
            `/api/repo-companies/documents/${userId}`
          );
          if (response) {
            setDocuments(documentsResponse.data || []);
          } else {
            setDocuments([]);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserType();
  }, [userType, userId]);

  return (
    <div className="min-h-screen bg-[#2B4380] w-screen">
      {/* Profile Content */}
      <div className="max-w-4xl p-4 mx-auto space-y-4 md:p-8">
        {/* Profile Card */}
        {(userType === "FLEET_OWNER" || userType === "REPO_COMPANY") && (
          <Card className="overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-[#3b5998] to-[#2B4380] p-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                <div
                  className="relative cursor-pointer group"
                  onClick={handleImageClick}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <div className="p-1 bg-white rounded-full shadow-md">
                    {data?.profilePictureUrl ? (
                      <img
                        src={data.profilePictureUrl as string}
                        alt="Profile"
                        className="object-cover w-24 h-24 rounded-full"
                      />
                    ) : (
                      <div className="h-24 w-24 rounded-full bg-[#4CAF50] text-white flex items-center justify-center text-3xl font-bold">
                        {userType === "REPO_COMPANY" ? "RO" : "FO"}
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                      <div className="w-6 h-6 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {data?.companyName}
                  </h2>
                </div>
              </div>
            </div>
            {isLoading ? ( // Skeleton Loader
              <div className="p-4 space-y-4">
                <div className="bg-gray-300 rounded-lg h-36 animate-pulse"></div>
                <div className="h-48 bg-gray-300 rounded-lg animate-pulse"></div>
                <div className="bg-gray-300 rounded-lg h-36 animate-pulse"></div>
              </div>
            ) : (
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

                {userType !== "REPO_COMPANY" && (
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
                            <span>API Key: { data?.telematicSettings?.telematicApiKey}</span>
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
                  <div className="p-4 rounded-lg shadow-sm bg-gray-50 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-[#2B4380]">
                        Official Documents
                      </h3>
                      <Link
                        to="/profile/documents/edit"
                        state={{
                          userData: data,
                          documents,
                        }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-[#3b5998] text-white hover:bg-[#344e86]"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                    </div>
                    <div className="grid gap-3">
                      {documents.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="">
                            <div className="flex items-center gap-3 text">
                              <FileText className="h-5 w-5 text-[#3b5998]" />
                              <span>{doc.documentType}</span>
                            </div>

                            {doc.expirationDate && (
                              <span className="text-sm text-gray-500">
                                Expires:{" "}
                                {format(
                                  formatDateArray(doc.expirationDate),
                                  "MM-dd-yyyy"
                                )}
                              </span>
                            )}
                          </div>

                          <p
                            className={`text-sm font-medium mt-2 ${
                              doc.status === "APPROVED"
                                ? "text-green-500"
                                : doc.status === "REJECTED"
                                  ? "text-red-500"
                                  : "text-yellow-500"
                            }`}
                          >
                            Status: {doc.status}
                          </p>
                          <a
                            href={doc.documentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 text-xs"
                          >
                            View Document
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
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
                          <span className="text-sm font-medium">
                            Notifications
                          </span>
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
                    {/* <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-[#3b5998] text-white hover:bg-[#344e86] hover:text-white"
                    >
                      Manage
                    </Button>
                  </div> */}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="destructive" size="sm" onClick={onLogOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        )}

        {userType === "TOW_TRUCK" && (
          <Card className="overflow-hidden shadow-lg">
            {isLoading ? (
              <div className="p-4 space-y-4">
                <div className="bg-gray-300 rounded-lg h-36 animate-pulse"></div>
                <div className="h-48 bg-gray-300 rounded-lg animate-pulse"></div>
                <div className="bg-gray-300 rounded-lg h-36 animate-pulse"></div>
              </div>
            ) : (
              <CardContent>
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
              </CardContent>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}

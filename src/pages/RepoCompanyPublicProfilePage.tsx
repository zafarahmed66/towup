/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  User,
  Truck,
  FileText,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/controller/axiosController";
import { UserData } from "./ProfilePage";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import ProfileHeader from "@/components/ProfileHeader";
import { DocumentData } from "./ApproveDocumentsPage";
import { format } from "date-fns";
import { formatDateArray } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export default function RepoCompanyPublicProfilePage() {
  const [data, setData] = useState<UserData>();
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();
  const { userId, userType } = useAuth();
  const id = params.id;

  useEffect(() => {
    if (Number(userId) === Number(id) && userType === "REPO_COMPANY") {
      navigate("/repocompany/profile");
      return;
    }
    const fetchUserType = async () => {
      try {
        const response = await api.get(`/api/repo-companies/${id}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error instanceof AxiosError) {
          if (error.status === 403) {
            navigate("/");
            toast.error("Unauthorized");
          } else if (error.status === 404) {
            navigate("/");
            toast.error("No user found");
          } else {
            navigate("/");
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    const fetchDocuments = async () => {
      const documentsResponse = await api.get(
        `/api/repo-companies/documents/${id}`
      );
      if (documentsResponse) {
        setDocuments(documentsResponse.data || []);
      } else {
        setDocuments([]);
      }
    };

    fetchUserType();
    if (userType === "FLEET_OWNER") {
      fetchDocuments();
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#2B4380] w-screen">
      <div className="max-w-4xl p-4 mx-auto space-y-4 md:p-8">
        <Card className="overflow-hidden shadow-lg">
          <ProfileHeader
            companyName={data?.companyName || ""}
            image={(data?.profilePictureUrl as string) || ""}
          />
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
                <div className="p-4 rounded-lg shadow-sm bg-gray-50 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-[#2B4380]">
                      Official Documents
                    </h3>
                  </div>
                  <div className="grid gap-3">
                    {documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3 text">
                          <FileText className="h-5 w-5 text-[#3b5998]" />
                          <span>
                            {doc.documentType} (
                            <a
                              href={doc.documentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500"
                            >
                              View
                            </a>
                            )
                          </span>
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
                    ))}
                    {documents.length === 0 && (
                      <span className="text-sm">No documents provided.</span>
                    )}
                  </div>
                </div>
              )}

              {/* Tow Truck Operators Section */}
              <div className="p-4 rounded-lg shadow-sm bg-gray-50 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-[#2B4380] ">
                    Tow Truck Operators
                  </h3>
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
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}

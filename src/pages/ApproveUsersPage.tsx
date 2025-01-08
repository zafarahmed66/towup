import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck, Trash } from "lucide-react";
import api from "@/controller/axiosController";
import { toast } from "react-toastify";

export interface UserData {
  id: string;
  companyName: string;
  companyEmail: string;
  signupStatus: "PENDING" | "APPROVED" | "REJECTED";
  userType: "FLEET_OWNER" | "REPO_COMPANY";
}

const SkeletonCard = () => (
  <Card className="overflow-hidden shadow-lg animate-pulse">
    <CardContent className="flex items-center justify-between p-6">
      <div className="space-y-2">
        <div className="w-32 h-5 bg-gray-300 rounded"></div>
        <div className="w-48 h-4 bg-gray-200 rounded"></div>
        <div className="w-24 h-4 bg-gray-200 rounded"></div>
        <div className="w-32 h-3 bg-gray-100 rounded"></div>
      </div>
      <div className="flex gap-2">
        <div className="w-20 h-8 bg-gray-300 rounded"></div>
        <div className="w-20 h-8 bg-gray-300 rounded"></div>
      </div>
    </CardContent>
  </Card>
);

export default function ApproveUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const [fleetOwnersResponse, repoCompaniesResponse] = await Promise.all([
          api.get("/api/fleetowners"),
          api.get("/api/repo-companies"),
        ]);

        const repoCompanies = repoCompaniesResponse.data.map((user: any) => ({
          ...user,
          id: user.repoCompanyId,
          userType: "REPO_COMPANY",
        }));

        const fleetOwners = fleetOwnersResponse.data.map((user: any) => ({
          ...user,
          id: user.fleetOwnerId,
          userType: "FLEET_OWNER",
        }));

        setUsers([...fleetOwners, ...repoCompanies]);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleApprove = async (userId: string, userType: string) => {
    try {
      const endpoint =
        userType === "FLEET_OWNER"
          ? `/api/fleetowners/${userId}/approve`
          : `/api/repo-companies/${userId}/approve`;

      await api.post(endpoint);
      toast.success("User approved");

      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, signupStatus: "APPROVED" } : user
        )
      );
    } catch (error) {
      toast.error("Failed to approve the user!");
      console.error("Failed to approve user:", error);
    }
  };

  const handleDelete = async (userId: string, userType: string) => {
    try {
      const endpoint =
        userType === "FLEET_OWNER"
          ? `/api/fleetowners/${userId}`
          : `/api/repo-companies/${userId}`;

      await api.delete(endpoint);
      toast.success("User deleted!");

      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      toast.error("Failed to delete the user!");
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#2B4380] w-screen">
      <div className="max-w-4xl p-4 mx-auto space-y-4 md:p-8">
        <h1 className="text-3xl font-bold text-white">User Approvals</h1>
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}
        {!loading && users.length === 0 && (
          <p className="text-white">No pending users to approve or delete.</p>
        )}
        {!loading && (
          <div className="space-y-4">
            {users.map((user) => (
              <Card key={user.id} className="overflow-hidden shadow-lg">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <h3 className="text-xl font-semibold text-[#2B4380]">
                      {user.companyName}
                    </h3>
                    <p className="text-sm text-gray-600">{user.companyEmail}</p>
                    <p
                      className={`text-sm font-medium mt-2 ${
                        user.signupStatus === "APPROVED"
                          ? "text-green-500"
                          : user.signupStatus === "REJECTED"
                            ? "text-red-500"
                            : "text-yellow-500"
                      }`}
                    >
                      Status: {user.signupStatus}
                    </p>
                    <p className="text-xs text-gray-400">
                      User Type: {user.userType}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {user.signupStatus === "PENDING" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-white bg-green-500 hover:bg-green-600"
                        onClick={() => handleApprove(user.id, user.userType)}
                      >
                        <UserCheck className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-white bg-red-500 hover:bg-red-600"
                      onClick={() => handleDelete(user.id, user.userType)}
                    >
                      <Trash className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

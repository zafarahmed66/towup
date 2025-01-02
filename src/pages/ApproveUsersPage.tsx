import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCheck } from "lucide-react";
import api from "@/controller/axiosController";

export interface UserData {
  repoCompanyId: string;
  companyName: string;
  companyEmail: string;
  signupStatus: "PENDING" | "APPROVED" | "REJECTED";
}

export default function ApproveUsersPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/repo-companies");
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
    

  const handleApprove = async (userId: string) => {
    try {
      await api.post(`/api/repo-companies/${userId}/approve`);
      setUsers((prev) =>
        prev.map((user) =>
          user.repoCompanyId === userId
            ? { ...user, signupStatus: "APPROVED" }
            : user
        )
      );
    } catch (error) {
      console.error("Failed to approve user:", error);
    }
  };

  

  return (
    <div className="min-h-screen bg-[#2B4380] w-screen">
      <div className="max-w-4xl p-4 mx-auto space-y-4 md:p-8">
        <h1 className="text-3xl font-bold text-white">User Approvals</h1>
        {loading && <p className="text-white">Loading users...</p>}
        {!loading && users.length === 0 && (
          <p className="text-white">No pending users to approve.</p>
        )}
        <div className="space-y-4">
          {users.map((user) => (
            <Card
              key={user.repoCompanyId}
              className="overflow-hidden shadow-lg"
            >
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
                </div>
                {user.signupStatus === "PENDING" && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-white bg-green-500 hover:bg-green-600"
                      onClick={() => handleApprove(user.repoCompanyId)}
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

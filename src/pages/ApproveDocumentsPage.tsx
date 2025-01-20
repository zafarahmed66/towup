import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trash } from "lucide-react";
import api from "@/controller/axiosController";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export interface DocumentData {
  documentId: number;
  documentType: string;
  documentUrl: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  expirationDate: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  companyId: number | null;
  companyName: string | null;
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

export default function ApproveDocumentsPage() {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(false);
  const { userType } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (userType !== "SYS_ADMIN") {
      toast.error("Unauthorized");
      navigate("/");
    }
  }, [userType, navigate]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/repo-companies/documents");
        setDocuments(response.data);
      } catch (error) {
        console.error("Failed to fetch documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleApprove = async (documentId: number) => {
    try {
      await api.post(`/api/repo-companies/documents/${documentId}/approve`);
      toast.success("Document approved!");

      setDocuments((prev) =>
        prev.map((doc) =>
          doc.documentId === documentId ? { ...doc, status: "APPROVED" } : doc
        )
      );
    } catch (error) {
      toast.error("Failed to approve the document!");
      console.error("Failed to approve document:", error);
    }
  };

  const handleDelete = async (documentId: number) => {
    try {
      await api.delete(`/api/repo-companies/documents/me/${documentId}`);
      toast.success("Document deleted!");

      setDocuments((prev) =>
        prev.filter((doc) => doc.documentId !== documentId)
      );
    } catch (error) {
      toast.error("Failed to delete the document!");
      console.error("Failed to delete document:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#2B4380] w-screen">
      <div className="max-w-4xl p-4 mx-auto space-y-4 md:p-8">
        <h1 className="text-3xl font-bold text-white">Document Approvals</h1>
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}
        {!loading && documents.length === 0 && (
          <p className="text-white">
            No pending documents to approve or delete.
          </p>
        )}
        {!loading && (
          <div className="space-y-4">
            {documents.map((doc) => (
              <Card key={doc.documentId} className="overflow-hidden shadow-lg">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <h3 className="text-xl font-semibold text-[#2B4380]">
                      {doc.companyName || "Unknown Company"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Document Type: {doc.documentType}
                    </p>
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
                  <div className="flex gap-2">
                    {doc.status === "PENDING" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-white bg-green-500 hover:bg-green-600"
                        onClick={() => handleApprove(doc.documentId)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-white bg-red-500 hover:bg-red-600"
                      onClick={() => handleDelete(doc.documentId)}
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

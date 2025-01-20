import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, FileText, Calendar, FileType } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "@/controller/axiosController";
import { toast } from "react-toastify";
import { profileType, UserData } from "./ProfilePage";
import { useAuth } from "@/context/AuthContext";
import { AxiosError } from "axios";
import { DocumentData } from "./ApproveDocumentsPage";
import { format } from "date-fns"; 

type Document = {
  id?: string;
  file: File | null;
  documentType: string;
  hasExpiration: boolean;
  expirationDate: string;
};

export default function EditDocumentPage() {
  const { userType } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const userData = location.state.userData as UserData;
  const documents = location.state.documents as DocumentData[];

  const navigate = useNavigate();

  const [document, setDocument] = useState<Document>({
    file: null,
    documentType: "",
    hasExpiration: false,
    expirationDate: "",
  });

  const handleDocumentChange = (field: keyof Document, value: any) => {
    setDocument({ ...document, [field]: value });
  };

  const handleFileChange = (file: File | null) => {
    handleDocumentChange("file", file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!document.file && !document.id) {
      toast.warn("Please upload a file before submitting.");
      return;
    }

    if (!document.documentType) {
      toast.warn("Please specify the document type before submitting.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      if (document.file) formData.append("file", document.file);
      formData.append("documentType", document.documentType);
      formData.append("expirationDate", document.expirationDate);
      formData.append("companyName", userData.companyName);
      formData.append("companyId", userData.repoCompanyId!);

      const endpoint = document.id
        ? `/api/repo-companies/documents/me/${document.id}/update`
        : `/api/repo-companies/documents/me/upload`;

      await api.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(
        document.id
          ? "Document updated successfully!"
          : "Document uploaded successfully!"
      );
      if (userType) {
        navigate(`${profileType[userType]}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during document handling:", error);
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          toast.error(error.response.data.message);
        } else {
          toast.error(
            "An error occurred while uploading or updating the document."
          );
        }
      } else {
        toast.error(
          "An error occurred while uploading or updating the document."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (doc: DocumentData) => {
    setDocument({
      id: doc.documentId.toString(),
      file: null,
      documentType: doc.documentType || "",
      hasExpiration: !!doc.expirationDate,
      expirationDate: doc.expirationDate || "",
    });
  };

  return (
    <div className="min-h-screen bg-[#2B4380] p-4 md:p-8 w-screen">
      <div className="max-w-2xl px-4 mx-auto sm:px-6 lg:px-8">
        <Link
          to={`${profileType[userType!]}`}
          className="flex items-center mb-4 text-white hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </Link>
        <Card className="overflow-hidden shadow-lg">
          <CardHeader className="bg-[#3b5998] text-white">
            <CardTitle className="text-2xl font-bold">
              {document.id ? "Update Document" : "Upload Document"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="documentFile"
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4 text-[#3b5998]" />
                    {document.id ? "Update File" : "Upload File"}
                  </Label>
                  <Input
                    id="documentFile"
                    type="file"
                    onChange={(e) =>
                      handleFileChange(e.target.files?.[0] || null)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="documentType"
                    className="flex items-center gap-2"
                  >
                    <FileType className="h-4 w-4 text-[#3b5998]" />
                    Document Type
                  </Label>
                  <Input
                    id="documentType"
                    type="text"
                    placeholder="Enter document type (e.g., INSURANCE)"
                    value={document.documentType}
                    onChange={(e) =>
                      handleDocumentChange("documentType", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasExpiration"
                    checked={document.hasExpiration}
                    onCheckedChange={(checked) =>
                      handleDocumentChange("hasExpiration", checked)
                    }
                  />
                  <label
                    htmlFor="hasExpiration"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Document has expiration date
                  </label>
                </div>
                {document.hasExpiration && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="expirationDate"
                      className="flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4 text-[#3b5998]" />
                      Expiration Date
                    </Label>
                    <Input
                      id="expirationDate"
                      type="date"
                      // value={document.expirationDate}
                      // onChange={(e) =>
                      //   handleDocumentChange("expirationDate", e.target.value)
                      // }
                      required
                    />
                  </div>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-[#3b5998] hover:bg-[#344e86] text-white"
                disabled={loading}
              >
                {document.id ? "Update Document" : "Upload Document"}
              </Button>
            </form>
            <div className="mt-6">
              <h3 className="text-lg font-bold text-[#3b5998]">
                Existing Documents
              </h3>
              <ul className="space-y-2">
                {documents.map((doc) => (
                  <li
                    key={doc.documentId}
                    className="flex justify-between items-center p-2 bg-gray-100 rounded"
                  >
                    <span>{doc.documentType}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(doc)}
                    >
                      Edit
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

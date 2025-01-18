import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, FileText, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import api from "@/controller/axiosController";
import { toast } from "react-toastify";
import { profileType } from "./ProfilePage";
import { useAuth } from "@/context/AuthContext";

type Document = {
  file: File | null;
  hasExpiration: boolean;
  expirationDate: string;
};

export default function EditDocumentPage() {

  const { userType } = useAuth();

  const [document, setDocument] = useState<Document>({
    file: null,
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

    if (!document.file) {
      alert("Please upload a file before submitting.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", document.file);
      formData.append("documentType", "INSURANCE");
      formData.append("expirationDate", document.expirationDate);

      await api.post(`/api/repo-companies/documents/me/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Document uploaded and updated successfully!");
    } catch (error) {
      console.error("Error during document handling:", error);
      toast.error(
        "An error occurred while uploading or updating the document."
      );
    }
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
              Edit Official Document
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
                    Upload Document
                  </Label>
                  <Input
                    id="documentFile"
                    type="file"
                    onChange={(e) =>
                      handleFileChange(e.target.files?.[0] || null)
                    }
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
                      value={document.expirationDate}
                      onChange={(e) =>
                        handleDocumentChange("expirationDate", e.target.value)
                      }
                      required
                    />
                  </div>
                )}
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

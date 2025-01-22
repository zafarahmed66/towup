import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, FileText, Calendar, Trash2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "@/controller/axiosController";
import { toast } from "react-toastify";
import { profileType } from "./ProfilePage";
import { useAuth } from "@/context/AuthContext";
import { AxiosError } from "axios";
import { DocumentData } from "./ApproveDocumentsPage";
import { DatePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { parseDate } from "@/lib/utils";

type Document = {
  id?: string;
  name: string;
  file: File | null;
  documentType: string;
  hasExpiration: boolean;
  expirationDate: Date | string | number[];
};

export default function EditDocumentPage() {
  const { userType } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<{
    index: number;
    id?: string;
  } | null>(null);

  const initialDocuments = (
    (location.state?.documents as DocumentData[]) || []
  ).map((doc) => ({
    id: doc.documentId.toString(),
    name: doc.documentType || "",
    file: null,
    documentType: doc.documentType || "",
    hasExpiration: !!doc.expirationDate,
    expirationDate: doc.expirationDate || "",
  }));

  const [documents, setDocuments] = useState<Document[]>(
    initialDocuments.length
      ? initialDocuments
      : [
          {
            name: "",
            file: null,
            documentType: "",
            hasExpiration: false,
            expirationDate: new Date(),
          },
        ]
  );

  const [modifiedDocs, setModifiedDocs] = useState<Set<number>>(new Set());

  const isDocumentModified = (currentDoc: Document, index: number): boolean => {
    if (!currentDoc.id) return true;

    const originalDoc = initialDocuments[index];
    if (!originalDoc) return true;

    return (
      currentDoc.file !== null ||
      currentDoc.documentType !== originalDoc.documentType ||
      currentDoc.hasExpiration !== originalDoc.hasExpiration ||
      (currentDoc.hasExpiration &&
        format(parseDate(currentDoc.expirationDate), "MM-dd-yyyy") !==
          format(parseDate(originalDoc.expirationDate), "MM-dd-yyyy"))
    );
  };

  const handleDocumentChange = (
    index: number,
    field: keyof Document,
    value: any
  ) => {
    const newDocuments = [...documents];
    newDocuments[index] = { ...newDocuments[index], [field]: value };
    setDocuments(newDocuments);

    if (isDocumentModified(newDocuments[index], index)) {
      setModifiedDocs((prev) => new Set(prev.add(index)));
    }
  };

  const handleFileChange = (index: number, file: File | null) => {
    handleDocumentChange(index, "file", file);
  };

  const handleDeleteConfirm = async () => {
    if (!documentToDelete) return;

    setLoading(true);
    try {
      if (documentToDelete.id) {
        await api.delete(
          `/api/repo-companies/documents/me/${documentToDelete.id}`
        );
        toast.success("Document deleted successfully!");
      }

      setDocuments(documents.filter((_, i) => i !== documentToDelete.index));
      setModifiedDocs(
        new Set(
          Array.from(modifiedDocs).filter((i) => i !== documentToDelete.index)
        )
      );
      if (userType) {
        navigate(`${profileType[userType]}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || "Failed to delete document"
        );
      } else {
        toast.error("Failed to delete document");
      }
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setDocumentToDelete(null);
    }
  };

  const handleDeleteClick = (index: number, id?: string) => {
    if (!id) {
      setDocuments((prev) => prev.filter((_, i) => i !== index));
      setModifiedDocs(
        new Set(Array.from(modifiedDocs).filter((i) => i !== index))
      );
      return;
    }
    setDocumentToDelete({ index, id });
    setDeleteDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const documentsToUpdate = documents.filter((_, index) =>
      modifiedDocs.has(index)
    );

    if (documentsToUpdate.length === 0) {
      toast.info("No changes detected");
      return;
    }

    const invalidDocuments = documentsToUpdate.filter(
      (doc) => (!doc.file && !doc.id) || !doc.documentType
    );

    if (invalidDocuments.length > 0) {
      toast.warn(
        "Please ensure all modified documents have files and document types specified."
      );
      return;
    }

    setLoading(true);

    try {
      for (const document of documentsToUpdate) {
        const formData = new FormData();
        if (document.file) formData.append("file", document.file);
        formData.append("documentType", document.documentType);
        if (document.hasExpiration) {
          formData.append(
            "expirationDate",
            format(parseDate(document.expirationDate), "MM-dd-yyyy")
          );
        }

        const endpoint = document.id
          ? `/api/repo-companies/documents/me/${document.id}/update`
          : `/api/repo-companies/documents/me/upload`;

        await api.post(endpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success(
          `${document.documentType} ${document.id ? "updated" : "added"} successfully!`
        );
      }

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
          toast.error("An error occurred while processing the documents.");
        }
      } else {
        toast.error("An error occurred while processing the documents.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2B4380] p-4 md:p-8 w-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Edit Official Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {documents.map((doc, index) => (
                <div
                  key={index}
                  className={`space-y-4 pb-4 border-b border-gray-200 last:border-b-0 ${
                    modifiedDocs.has(index) ? "bg-blue-50 p-3 rounded-sm" : ""
                  }`}
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor={`documentType${index}`}
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4 text-[#3b5998]" />
                      Document Type
                    </Label>
                    <Select
                      onValueChange={(value) => {
                        handleDocumentChange(index, "documentType", value);
                      }}
                      value={doc.documentType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INSURANCE">INSURANCE</SelectItem>
                        <SelectItem value="BUSINESS_LICENSE">
                          BUSINESS_LICENSE
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor={`documentFile${index}`}
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4 text-[#3b5998]" />
                      Upload Document
                    </Label>
                    <Input
                      id={`documentFile${index}`}
                      type="file"
                      onChange={(e) =>
                        handleFileChange(index, e.target.files?.[0] || null)
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`hasExpiration${index}`}
                      checked={doc.hasExpiration}
                      onCheckedChange={(checked) =>
                        handleDocumentChange(index, "hasExpiration", checked)
                      }
                    />
                    <label
                      htmlFor={`hasExpiration${index}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Document has expiration date
                    </label>
                  </div>
                  {doc.hasExpiration && (
                    <div className="space-y-2">
                      <Label
                        htmlFor={`expirationDate${index}`}
                        className="flex items-center gap-2"
                      >
                        <Calendar className="h-4 w-4 text-[#3b5998]" />
                        Expiration Date
                      </Label>
                      <DatePicker
                        date={doc.expirationDate || new Date()}
                        startYear={2026}
                        onSelect={(date) =>
                          handleDocumentChange(index, "expirationDate", date)
                        }
                      />
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteClick(index, doc.id)}
                    className="mt-2"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove Document
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() => {
                  setDocuments([
                    ...documents,
                    {
                      name: "",
                      file: null,
                      documentType: "",
                      hasExpiration: false,
                      expirationDate: new Date(),
                    },
                  ]);
                  setModifiedDocs(new Set([...modifiedDocs, documents.length]));
                }}
                className="w-full bg-[#3b5998] hover:bg-[#344e86] text-white"
              >
                Add Document
              </Button>
              <Button
                type="submit"
                className="w-full bg-[#3b5998] hover:bg-[#344e86] text-white"
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : `Save Changes ${modifiedDocs.size ? `(${modifiedDocs.size} modified)` : ""}`}
              </Button>
            </form>
          </CardContent>
        </Card>

        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                document.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700"
              >
                {loading ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/controller/axiosController";
import { AxiosError } from "axios";
import { CheckCircle, ArrowRight, AlertCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function EmailValidationPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const code = searchParams.get("code");

  const [status, setStatus] = useState("loading"); 
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function verifyEmail() {
      try {
        await api.post("/auth/verify-email", { email, code });
        setStatus("success");
        toast.success("Email verified.");
      } catch (error) {
        setStatus("error");
        if (error instanceof AxiosError) {
          if (error.response?.status === 404) {
            setErrorMessage("User not found.");
            toast.error("User not found.");
          } else if (error.response?.data?.message) {
            setErrorMessage(error.response.data.message);
            toast.error(error.response.data.message);
          } else {
            setErrorMessage("Something went wrong!");
            toast.error("Something went wrong!");
          }
        } else {
          setErrorMessage("Something went wrong!");
          toast.error("Something went wrong!");
        }
      }
    }

    if (email && code) {
      verifyEmail();
    } else {
      setStatus("error");
      setErrorMessage("Invalid or missing email verification parameters.");
    }
  }, [email, code]);

  return (
    <div className="min-h-screen bg-[#2B4380] flex items-center justify-center p-4 w-screen">
      <Card className="w-full max-w-md mx-4 sm:mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#2B4380]">
            {status === "loading"
              ? "Validating Email..."
              : status === "success"
                ? "Email Validated"
                : "Validation Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            {status === "success" && (
              <CheckCircle className="w-16 h-16 text-green-500" />
            )}
            {status === "error" && (
              <AlertCircle className="w-16 h-16 text-red-500" />
            )}
          </div>
          {status === "success" ? (
            <p className="text-center text-gray-600">
              Your email has been successfully validated. Thank you for
              confirming your account.
            </p>
          ) : status === "error" ? (
            <p className="text-center text-red-600">{errorMessage}</p>
          ) : (
            <p className="text-center text-gray-600">
              Please wait while we validate your email.
            </p>
          )}
          {status !== "loading" && (
            <div className="space-y-4">
              <Link to="/login">
                <Button className="w-full bg-[#3b5998] hover:bg-[#344e86] text-white">
                  {status === "success" ? "Proceed to Login" : "Back to Login"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

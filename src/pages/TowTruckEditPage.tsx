/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Phone, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import api from "@/controller/axiosController";
import { toast } from "react-toastify";
import { profileType, UserData } from "./ProfilePage";
import { useAuth } from "@/context/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const editAccountSchema = z.object({
  operatorName: z.string().min(1, "Company name is required"),
  operationalRegion: z.string().min(1, "Company name is required"),
  licenseNumber: z.string().min(1, "Company name is required"),
});

type EditAccountFormValues = z.infer<typeof editAccountSchema>;

export default function TowTruckEditPage() {
  const location = useLocation();
  const state = location.state as UserData;

  const { userType, userId } = useAuth();

  const { operationalRegion, operatorName, licenseNumber } = state;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<EditAccountFormValues>({
    resolver: zodResolver(editAccountSchema),
    defaultValues: {
      operationalRegion,
      operatorName,
      licenseNumber,
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: EditAccountFormValues) => {
    try {
      await api.post(`/api/towtruckoperators/${userId}/update`, data);
      toast.success("Account details updated successfully!");
      if (userType) {
        navigate(`${profileType[userType]}`);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update account details.");
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
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-[#2B4380] mb-6">
              Edit Account Details
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {/* Operator Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="operatorName"
                  className="flex items-center gap-2"
                >
                  <Building2 className="h-4 w-4 text-[#3b5998]" />
                  Operator Name
                </Label>
                <Input
                  id="operatorName"
                  placeholder="Fleet Operations Inc"
                  {...register("operatorName")}
                />
                {errors.operatorName && (
                  <p className="text-sm text-red-500">
                    {errors.operatorName.message}
                  </p>
                )}
              </div>

              {/* License Number */}
              <div className="space-y-2">
                <Label
                  htmlFor="licenseNumber"
                  className="flex items-center gap-2"
                >
                  <Phone className="h-4 w-4 text-[#3b5998]" />
                  License Number
                </Label>
                <Input
                  id="licenseNumber"
                  type="text"
                  placeholder="+1234567890"
                  {...register("licenseNumber")}
                />
                {errors.licenseNumber && (
                  <p className="text-sm text-red-500">
                    {errors.licenseNumber.message}
                  </p>
                )}
              </div>

              {/* Operational Region */}
              <div className="space-y-2">
                <Label
                  htmlFor="operationalRegion"
                  className="flex items-center gap-2"
                >
                  <Phone className="h-4 w-4 text-[#3b5998]" />
                  Operational Region
                </Label>
                <Select
                  onValueChange={(value) => {
                    setValue("operationalRegion", value);
                  }}
                  value={operationalRegion}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NEW_YORK_METRO">
                      New York Region
                    </SelectItem>
                    <SelectItem value="SAN_FRANCISCO_BAY">
                      San Francisco Region
                    </SelectItem>
                  </SelectContent>
                </Select>
   
                {errors.operationalRegion && (
                  <p className="text-sm text-red-500">
                    {errors.operationalRegion.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#3b5998] hover:bg-[#344e86] text-white disabled:bg-[#3b5998]/100"
                disabled={isSubmitting}
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

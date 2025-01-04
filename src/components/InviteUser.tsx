import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import api from "@/controller/axiosController";

export function InviteUser() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await api.post("/api/towtruckoperators/invite", {
        email,
        phoneNumber,
      });

      // Check if the response status indicates success
      if (response.status === 200) {
        toast.success("Invitation sent successfully");
      } else {
        toast.error("Failed to send invitation");
      }
    } catch (error) {
      // Handle any errors that occur during the API call
      console.log(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      // Close the modal after the API call
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-[#3b5998] text-white hover:bg-[#344e86] hover:text-white"
          onClick={() => setOpen(true)} // Open the modal when clicked
        >
          Add Operator
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Tow Truck User</DialogTitle>
          <DialogDescription>
            Enter the email and phone number of the tow truck user you want to
            invite.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              className="col-span-3"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="phoneNumber" className="text-right">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              placeholder="98123849123"
              className="col-span-3"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            className="bg-[#3b5998] text-white hover:bg-[#344e86] hover:text-white"
            onClick={handleSubmit}
          >
            Invite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

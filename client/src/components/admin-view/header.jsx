

import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleLogout() {
    dispatch(logoutUser()).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message || "Logged out successfully",
        });
      }
    });
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      {/* Toggle Button for Mobile View */}
      <Button onClick={() => setOpen(true)} className="lg:hidden block">
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      
      {/* Title or Logo can be added here */}
      <h1 className="text-lg font-bold hidden lg:block">Admin Dashboard</h1>

      {/* Logout Button */}
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          <span className="hidden md:inline">Logout</span> {/* Show text on medium screens and up */}
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;

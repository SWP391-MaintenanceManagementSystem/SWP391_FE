import type { SidebarItem } from "@/types/models/sidebar-item";
import {
  Home,
  Settings,
  Car,
  NotebookPen,
  BookOpen,
  CreditCard,
  CircleQuestionMark,
  Sparkles,
  IdCardLanyard,
  PackageOpen,
  UserStar,
  Users,
  UserRoundCog,
  CalendarClock,
  BookOpenCheckIcon,
  CalendarRange,
  MessageCircle,
  Bell,
} from "lucide-react";

export const adminItems: SidebarItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Customers & Vehicles", url: "/vehicles", icon: Car },
  {
    title: "Employee Management",
    icon: IdCardLanyard,
    children: [
      { title: "Staffs", url: "/employees/staffs", icon: Users },
      {
        title: "Technicians",
        url: "/employees/technicians",
        icon: UserRoundCog,
      },
    ],
  },
  {
    title: "Work Shifts Management",
    icon: CalendarClock,
    url: "/shifts",
  },
  { title: "Inventory", url: "/inventory", icon: PackageOpen },
  { title: "Memberships", url: "/membership", icon: UserStar },
  { title: "Notifications", url: "/notification", icon: Bell },
];

export const customerItems: SidebarItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "My Vehicles", url: "/vehicles", icon: Car },
  { title: "Memberships", url: "/membership", icon: UserStar },
  { title: "Service Booking", url: "/booking", icon: NotebookPen },
  { title: "Chat Box", url: "/chat", icon: MessageCircle },
  { title: "Notifications", url: "/notification", icon: Bell },
  { title: "Help & Support", url: "/support", icon: CircleQuestionMark },
];

export const staffItems: SidebarItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Work Schedule", url: "/viewSchedule", icon: CalendarRange },
  { title: "Booking Management", url: "/booking", icon: BookOpenCheckIcon },
  { title: "Customers & Vehicles", url: "/vehicles", icon: Users },
  { title: "Chat Box", url: "/chat", icon: MessageCircle },
  { title: "Notifications", url: "/notification", icon: Bell },
];
export const technicianItems: SidebarItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Work Schedule", url: "/viewSchedule", icon: CalendarRange },
  { title: "My Assigned Bookings", url: "/booking", icon: CalendarClock },
  { title: "Inventory", url: "/inventory", icon: PackageOpen },
  { title: "Notifications", url: "/notification", icon: Bell },
];

import type { SidebarItem } from "@/types/models/sidebar-item";
import {
  Home,
  Car,
  NotebookPen,
  CircleQuestionMark,
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
  { title: "sidebar.titles.dashboard", url: "/dashboard", icon: Home },
  { title: "sidebar.titles.vehicles", url: "/vehicles", icon: Car },
  {
    title: "sidebar.titles.employees",
    icon: IdCardLanyard,
    children: [
      { title: "sidebar.titles.staffs", url: "/employees/staffs", icon: Users },
      {
        title: "sidebar.titles.technicians",
        url: "/employees/technicians",
        icon: UserRoundCog,
      },
    ],
  },
  {
    title: "sidebar.titles.shifts",
    icon: CalendarClock,
    url: "/shifts",
  },
  { title: "sidebar.titles.inventory", url: "/inventory", icon: PackageOpen },
  { title: "sidebar.titles.memberships", url: "/membership", icon: UserStar },
  { title: "sidebar.titles.notifications", url: "/notification", icon: Bell },
];

export const customerItems: SidebarItem[] = [
  { title: "sidebar.titles.dashboard", url: "/dashboard", icon: Home },
  { title: "sidebar.titles.my_vehicles", url: "/vehicles", icon: Car },
  { title: "sidebar.titles.memberships", url: "/membership", icon: UserStar },
  { title: "sidebar.titles.booking", url: "/booking", icon: NotebookPen },
  { title: "sidebar.titles.chat", url: "/chat", icon: MessageCircle },
  { title: "sidebar.titles.notifications", url: "/notification", icon: Bell },
  { title: "sidebar.titles.support", url: "/support", icon: CircleQuestionMark },
];

export const staffItems: SidebarItem[] = [
  { title: "sidebar.titles.dashboard", url: "/dashboard", icon: Home },
  { title: "sidebar.titles.schedule", url: "/viewSchedule", icon: CalendarRange },
  { title: "sidebar.titles.booking_management", url: "/booking", icon: BookOpenCheckIcon },
  { title: "sidebar.titles.vehicles", url: "/vehicles", icon: Users },
  { title: "sidebar.titles.chat", url: "/chat", icon: MessageCircle },
  { title: "sidebar.titles.notifications", url: "/notification", icon: Bell },
];

export const technicianItems: SidebarItem[] = [
  { title: "sidebar.titles.dashboard", url: "/dashboard", icon: Home },
  { title: "sidebar.titles.schedule", url: "/viewSchedule", icon: CalendarRange },
  { title: "sidebar.titles.my_assigned_bookings", url: "/booking", icon: CalendarClock },
  { title: "sidebar.titles.inventory", url: "/inventory", icon: PackageOpen },
  { title: "sidebar.titles.notifications", url: "/notification", icon: Bell },
];

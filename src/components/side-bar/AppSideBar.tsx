import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  PanelLeftClose,
  CircleUserRound,
  Car,
  NotebookPen,
  BookOpen,
  CreditCard,
  CircleQuestionMark,
  Sparkles,
  IdCardLanyard,
  PackageOpen,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import logo from "/logo.svg";
import logoWithoutText from "/logo-without-text-light.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { AccountRole } from "@/types/enums/role";
import type { SidebarItem } from "@/types/models/sidebar-item";
import clsx from "clsx";
import { useAuth } from "@/contexts/AuthContext";
const customerItems: SidebarItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "My Vehicles",
    url: "/vehicles",
    icon: Car,
  },
  {
    title: "Service Booking",
    url: "/booking",
    icon: NotebookPen,
  },
  {
    title: "Maintenance History",
    url: "/history",
    icon: BookOpen,
  },
  {
    title: "Payments",
    url: "/payments",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Help & Support",
    url: "/support",
    icon: CircleQuestionMark,
  },
  {
    title: "Feedback",
    url: "/feedback",
    icon: Sparkles,
  },
];

const adminItems: SidebarItem[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Customers & Vehicles",
    url: "/vehicles",
    icon: Car,
  },
  {
    title: "Appointments",
    url: "/appointments",
    icon: NotebookPen,
  },

  {
    title: "Service Process",
    url: "/service-process",
    icon: Sparkles,
  },
  {
    title: "Inventory",
    url: "/inventory",
    icon: PackageOpen,
  },
  {
    title: "Staff Management",
    url: "/employees",
    icon: IdCardLanyard,
  },
  {
    title: "Finance & Reports",
    url: "/finance",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

// Define menu items here for different roles
const getMenuItems = (role: AccountRole) => {
  switch (role) {
    case AccountRole.ADMIN:
      return adminItems;
    case AccountRole.CUSTOMER:
      return customerItems;
    case AccountRole.STAFF:
      break;
    case AccountRole.TECHNICIAN:
      break;
    default:
      return [];
  }
};

export function AppSidebar() {
  const { auth } = useAuth();
  const role = auth.user?.role!;
  const [collapsed, setCollapsed] = useState(false);
  const items = getMenuItems(role) || [];
  return (
    <Sidebar
      className={`transition-all duration-300 h-[calc(100vh-32px)] my-4 ml-4 mr-0 rounded-xl overflow-hidden relative min-h-[500px]
          ${collapsed ? "w-16" : "w-64"}
        `}
    >
      <SidebarHeader className="!bg-slate-100 p-4 text-black">
        {!collapsed && (
          <div className="text-lg font-bold flex justify-between items-center">
            <img src={logo} />
            <PanelLeftClose
              className="h-6 w-6 cursor-pointer"
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
        )}
        {collapsed && (
          <div className="flex justify-center">
            <img
              src={logoWithoutText}
              onClick={() => setCollapsed(!collapsed)}
              className="cursor-pointer"
            />
          </div>
        )}
      </SidebarHeader>
      <SidebarContent className="!bg-slate-100">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink
                    to={item.url}
                    end
                    className={({ isActive }) =>
                      clsx(
                        "flex items-center gap-2 !text-gray-primary font-inter",
                        collapsed && "justify-between",
                        isActive &&
                        "bg-purple-primary rounded-md !text-slate-200 !outline-0",
                      )
                    }
                  >
                    <SidebarMenuButton className="!bg-transparent outline-0 flex ">
                      <item.icon className={clsx("h-5 w-5", collapsed && "mx-auto")} />
                      {!collapsed && <span>{item.title}</span>}
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 bg-slate-100">
        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            clsx(
              "flex items-center justify-between !text-gray-primary h-10 py-0.5 px-4 rounded-lg font-inter",
              collapsed && "justify-center",
              isActive && "bg-purple-primary rounded-md !text-white !outline-0",
            )
          }
        >
          {({ isActive }) => (
            <>
              <div className="flex items-center gap-2">
                <CircleUserRound />
                {!collapsed && <span className=" text-sm">{auth.user?.profile?.firstName + " " + auth.user?.profile?.lastName}</span>}
              </div>
              {!collapsed &&
                (isActive ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                ))}
            </>
          )}
        </NavLink>
      </SidebarFooter>
    </Sidebar>
  );
}

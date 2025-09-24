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
} from "@/components/ui/sidebar"
import { Calendar, Home, Inbox, Search, Settings, PanelLeftClose, CircleUserRound, Car, NotebookPen, BookOpen, CreditCard, CircleQuestionMark, Sparkles } from "lucide-react"
import logo from "/logo.svg"
import logoWithoutText from "/logo-without-text-light.svg"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import { AccountRole } from "@/types/enums/role"
import type { SidebarItem } from "@/types/models/sidebar-item"
import clsx from "clsx"
const customerItems: SidebarItem[] = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home
    },
    {
        title: "My Vehicles",
        url: "/vehicles",
        icon: Car
    },
    {
        title: "Service Booking",
        url: "/booking",
        icon: NotebookPen
    },
    {
        title: "Maintenance History",
        url: "/history",
        icon: BookOpen
    },
    {
        title: "Payments",
        url: "/payments",
        icon: CreditCard
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings
    },
    {
        title: "Help & Support",
        url: "/support",
        icon: CircleQuestionMark
    },
    {
        title: "Feedback",
        url: "/feedback",
        icon: Sparkles
    }
]


// Define menu items here for different roles
const getMenuItems = (role: AccountRole) => {
    switch (role) {
        case AccountRole.ADMIN:
            break;
        case AccountRole.CUSTOMER:
            return customerItems;
        case AccountRole.STAFF:
            break;
        case AccountRole.TECHNICAN:
            break;
        default:
            return [];
    }
};


export function AppSidebar() {
    const [collapsed, setCollapsed] = useState(false)
    const items = getMenuItems(AccountRole.CUSTOMER) || [];
    return (
        <Sidebar
            className={`transition-all duration-300 h-[calc(100vh-32px)] ml-4 mt-4 mb-4 mr-6 rounded-xl overflow-hidden relative
          ${collapsed ? "w-16" : "w-64"} 
        `}
        >
            <SidebarHeader className="!bg-slate-100 p-4 text-black">
                {!collapsed && (
                    <div className="text-lg font-bold flex justify-between items-center">
                        <img src={logo} />
                        <PanelLeftClose className="h-6 w-6 cursor-pointer" onClick={() => setCollapsed(!collapsed)} />
                    </div>
                )}
                {collapsed && (
                    <div className="flex justify-center">
                        <img src={logoWithoutText} onClick={() => setCollapsed(!collapsed)} className="cursor-pointer" />
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
                                                "flex items-center gap-2 !text-gray-primary",
                                                collapsed && "justify-center",
                                                isActive && "bg-purple-primary rounded-md !text-slate-200"
                                            )
                                        }
                                    >
                                        <SidebarMenuButton className="!bg-transparent  ">
                                            <item.icon className="h-5 w-5" />
                                            {!collapsed && <span>{item.title}</span>}
                                        </SidebarMenuButton>
                                    </NavLink>
                                </SidebarMenuItem>

                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 bg-slate-100">
                <div className="rounded-xl flex bg-purple-primary h-10 p-0.5 justify-center items-center gap-1 text-slate-300 cursor-pointer hover:opacity-80">
                    <CircleUserRound />
                    {!collapsed && <span className="text-sm">User Name</span>}
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
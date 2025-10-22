import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuSub,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { PanelLeftClose, CircleUserRound, ChevronRight } from "lucide-react";
import logoLight from "/logo.svg";
import logoWithoutTextLight from "/logo-without-text-light.svg";
import logoDark from "/logo-dark-mode.svg";
import logoWithoutTextDark from "/logo-without-text-dark.svg";
import { NavLink, useLocation } from "react-router-dom";
import { AccountRole } from "@/types/enums/role";
import clsx from "clsx";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useState } from "react";
import { TooltipWrapper } from "../TooltipWrapper";
import { adminItems, customerItems, staffItems } from "./sidebarItems";

const getMenuItems = (role: AccountRole) => {
  switch (role) {
    case AccountRole.ADMIN:
      return adminItems;
    case AccountRole.CUSTOMER:
      return customerItems;
    case AccountRole.STAFF:
      return staffItems;
    default:
      return [];
  }
};

// ----------------- SIDEBAR COMPONENT -----------------
export function AppSidebar() {
  const { auth } = useAuth();
  const role = auth.user?.role;
  const { resolvedTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const items = getMenuItems(role!) || [];
  const { isMobile } = useSidebar();
  const location = useLocation();
  const effectiveCollapsed = isMobile ? false : collapsed;

  return (
    <Sidebar
      className={clsx(
        "transition-all font-inter duration-300 h-[calc(100vh-32px)] my-4 ml-4 mr-0 rounded-xl overflow-hidden relative min-h-[500px]",
        effectiveCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* HEADER */}
      <SidebarHeader className="!bg-slate-100 p-4 text-black dark:text-white">
        {!effectiveCollapsed ? (
          <div className="text-lg font-bold flex justify-between items-center">
            <img src={resolvedTheme === "dark" ? logoDark : logoLight} />
            {!isMobile && (
              <PanelLeftClose
                className="h-5 w-5 cursor-pointer"
                onClick={() => {
                  if (!isMobile) setCollapsed(!collapsed);
                }}
              />
            )}
          </div>
        ) : (
          <div className="flex justify-center">
            <img
              src={
                resolvedTheme === "dark"
                  ? logoWithoutTextDark
                  : logoWithoutTextLight
              }
              onClick={() => setCollapsed(false)}
              className="cursor-pointer"
            />
          </div>
        )}
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="!bg-slate-100">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isChildActive = item.children?.some((child) =>
                  location.pathname.startsWith(child.url || "#"),
                );

                return (
                  <SidebarMenuItem key={item.title}>
                    {item.children ? (
                      <Collapsible
                        key={item.title}
                        className="group/collapsible"
                        defaultOpen={isChildActive}
                      >
                        <SidebarGroup className="p-0">
                          <CollapsibleTrigger
                            asChild
                            className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
                          >
                            <SidebarMenuButton
                              onClick={(e) => {
                                if (effectiveCollapsed) {
                                  e.preventDefault();
                                  setCollapsed(false);
                                }
                              }}
                              className={clsx(
                                "outline-0 flex text-gray-primary transition-colors",
                                isChildActive &&
                                  (effectiveCollapsed
                                    ? "bg-purple-primary text-white dark:text-amber-primary"
                                    : "text-sidebar-accent bg-purple-primary  dark:text-amber-primary hover:dark:text-white group-data-[state=open]/collapsible:text-foreground group-data-[state=open]/collapsible:bg-slate-100 group-data-[state=open]/collapsible:dark:text-primary-gray"),
                              )}
                            >
                              {effectiveCollapsed ? (
                                <TooltipWrapper
                                  side="right"
                                  content={item.title}
                                >
                                  <div className={clsx("mx-auto")}>
                                    <item.icon className="h-5 w-5" />
                                  </div>
                                </TooltipWrapper>
                              ) : (
                                <>
                                  <item.icon className="h-5 w-5" />
                                  <span>{item.title}</span>
                                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                </>
                              )}
                            </SidebarMenuButton>
                          </CollapsibleTrigger>

                          {!effectiveCollapsed && (
                            <CollapsibleContent>
                              <SidebarMenuSub>
                                {item.children.map((child) => (
                                  <NavLink
                                    key={child.title}
                                    to={child.url || "#"}
                                    end
                                    className={({ isActive }) =>
                                      clsx(
                                        "flex items-center gap-2 !text-gray-primary font-inter",
                                        isActive &&
                                          "bg-purple-primary rounded-md dark:!text-amber-primary !text-white !outline-0",
                                      )
                                    }
                                  >
                                    <SidebarMenuButton className="!bg-transparent outline-0 flex">
                                      <child.icon className="h-5 w-5" />
                                      <span>{child.title}</span>
                                    </SidebarMenuButton>
                                  </NavLink>
                                ))}
                              </SidebarMenuSub>
                            </CollapsibleContent>
                          )}
                        </SidebarGroup>
                      </Collapsible>
                    ) : (
                      <NavLink
                        to={item.url || "#"}
                        end
                        className={({ isActive }) =>
                          clsx(
                            "flex items-center gap-2 !text-gray-primary font-inter  transition-colors hover:bg-accent rounded-md",
                            effectiveCollapsed && "justify-between",
                            (isActive ||
                              location.pathname.startsWith(`${item.url}/`)) &&
                              "bg-purple-primary  dark:!text-amber-primary !text-white !outline-0",
                          )
                        }
                      >
                        <SidebarMenuButton className="!bg-transparent outline-0 flex">
                          {effectiveCollapsed ? (
                            <TooltipWrapper side="right" content={item.title}>
                              <div className="mx-auto">
                                <item.icon className="h-5 w-5" />
                              </div>
                            </TooltipWrapper>
                          ) : (
                            <>
                              <item.icon className="h-5 w-5" />
                              <span>{item.title}</span>
                            </>
                          )}
                        </SidebarMenuButton>
                      </NavLink>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className=" p-3 bg-slate-100">
        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            clsx(
              "flex items-center justify-between !text-gray-primary h-10 py-0.5 px-2 rounded-lg font-inter",
              effectiveCollapsed && "justify-center",
              isActive && "bg-purple-primary rounded-md !text-white !outline-0",
            )
          }
        >
          {({ isActive }) => (
            <div>
              {effectiveCollapsed ? (
                <TooltipWrapper content="View Profile" side="right">
                  <CircleUserRound
                    className={clsx(isActive && "dark:text-amber-primary")}
                  />
                </TooltipWrapper>
              ) : (
                <div className="flex items-center gap-2">
                  <CircleUserRound
                    className={clsx(isActive && "dark:text-amber-primary")}
                  />
                  <span
                    className={clsx(
                      `text-sm`,
                      isActive && "dark:text-amber-primary",
                    )}
                  >
                    {auth.user?.role === AccountRole.ADMIN && "Admin"}
                    {auth.user?.role !== AccountRole.ADMIN &&
                      auth.user?.profile?.firstName +
                        " " +
                        auth.user?.profile?.lastName}
                  </span>
                </div>
              )}
            </div>
          )}
        </NavLink>
      </SidebarFooter>
    </Sidebar>
  );
}

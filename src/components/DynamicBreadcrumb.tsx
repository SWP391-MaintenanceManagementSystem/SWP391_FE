import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useLocation } from "react-router-dom";

export default function DynamicBreadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;

          return (
            <div key={href} className="flex items-center">
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="capitalize font-medium text-2xl font-inter">
                    {path}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      to={href}
                      className="capitalize font-medium text-2xl font-inter"
                    >
                      {path}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

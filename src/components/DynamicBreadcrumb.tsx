import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useLocation } from "react-router-dom";

type Props = {
  pathTitles?: Record<string, string>;
  hasPage?: boolean;
};

function formatPath(path: string) {
  return path
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function DynamicBreadcrumbs({
  pathTitles,
  hasPage = true,
}: Props) {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/");
          const isLast = index === paths.length - 1;
          const title = pathTitles?.[path] ?? formatPath(path);

          return (
            <div key={href} className="flex items-center">
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isLast || !hasPage ? (
                  <BreadcrumbPage className="capitalize font-medium text-xs lg:text-2xl md:text-sm font-inter">
                    {title}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      to={href}
                      className="capitalize font-medium text-xs lg:text-2xl md:text-sm font-inter"
                    >
                      {title}
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

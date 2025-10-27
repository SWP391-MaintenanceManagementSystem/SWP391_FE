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
  ignorePaths?: string[];
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
  ignorePaths = [],
}: Props) {
  const location = useLocation();
  const paths = location.pathname
    .split("/")
    .filter(Boolean)
    .filter(
      (p) => !ignorePaths.map((x) => x.toLowerCase()).includes(p.toLowerCase()),
    );

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
                  <BreadcrumbPage className="capitalize font-medium ml-4 text-xs lg:text-2xl md:text-sm font-inter">
                    {title}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      to={href}
                      className="capitalize font-medium text-xs ml-4 lg:text-2xl md:text-sm font-inter"
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

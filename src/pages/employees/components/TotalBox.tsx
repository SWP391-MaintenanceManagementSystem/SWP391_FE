import { useTheme } from "@/components/theme/ThemeProvider";

type Props = {
  iconDark: string;
  iconLight: string;
  title: string;
  total: number;
};

export default function TotalBox({ iconDark, iconLight, title, total }: Props) {
  const { resolvedTheme } = useTheme();

  const iconSrc = resolvedTheme === "dark" ? iconDark : iconLight;

  return (
    <div className="flex flex-col items-center md:min-w-[298px] gap-4 font-inter bg-slate-100 px-14 py-8 rounded-2xl shadow-md">
      <div className="flex items-center justify-center w-26 h-26 p-4 rounded-full bg-purple-primary dark:bg-purple-light">
        <img src={iconSrc} alt="Staff Icon" className="w-16 h-16" />
      </div>
      <div>
        <h3 className="text-lg font-semibold">
          Total {title}: <span className="text-2xl">{total}</span>
        </h3>
      </div>
    </div>
  );
}

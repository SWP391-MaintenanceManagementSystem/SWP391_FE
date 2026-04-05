import { useTranslation } from "react-i18next";

export default function Unauthorized() {
  const { t } = useTranslation();
  return (
    <div className="font-bold text-3xl flex flex-1 min-h-screen justify-center items-center">
      {t("errors.unauthorized")}
    </div>
  );
}

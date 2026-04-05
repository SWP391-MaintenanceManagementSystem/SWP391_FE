import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function NotFound() {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center">
            <h1 className="text-6xl font-bold">{t("errors.not_found.title")}</h1>
            <h2 className="text-2xl font-semibold">{t("errors.not_found.subtitle")}</h2>
            <h3 className="text-muted-foreground">{t("errors.not_found.description")}</h3>
            <Link to="/" className="text-purple-primary hover:underline font-medium">
                {t("errors.not_found.go_home")}
            </Link>
        </div>
    )
}

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18nBackend from "i18next-http-backend";

const getCurrentHost =
  import.meta.env.MODE === "development"
    ? "http://localhost:5175"
    : "https://electric-controller.vercel.app";

const userLanguage = localStorage.getItem("language")
console.log(userLanguage)
i18n
    .use(i18nBackend)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        lng: userLanguage ?? "en",
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: `${getCurrentHost}/src/language/{{lng}}.json`,
        },
    });

export default i18n;

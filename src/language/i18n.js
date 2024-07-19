import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-http-backend";

const userLanguage = localStorage.getItem("language")
i18n.use(detector)
    .use(backend)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        lng: userLanguage ?? "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;

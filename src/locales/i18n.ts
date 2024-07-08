import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en_US from './lang/en_US';
import zh_CN from './lang/zh_CN';
import { getStringItem } from '@/utils/storage.ts';
import { LocalEnum, StorageEnum } from '#/enum.ts';
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const defaultLng = getStringItem(StorageEnum.I18N) || (LocalEnum.zh_CN as string);


i18n.use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en_US: { translation: en_US },
            zh_CN: { translation: zh_CN }
        },
        lng: defaultLng, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option
        fallbackLng: LocalEnum.en_US,
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
export const { t } = i18n;
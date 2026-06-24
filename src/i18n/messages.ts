import type { Locale } from "@/i18n/routing";
import enUsMessages from "@/i18n/messages/en-us.json";
import esUsMessages from "@/i18n/messages/es-us.json";
import zhCnMessages from "@/i18n/messages/zh-cn.json";

const messages = {
  "en-us": enUsMessages,
  "zh-cn": zhCnMessages,
  "es-us": esUsMessages
} satisfies Record<Locale, typeof enUsMessages>;

export function getMessages(locale: Locale) {
  return messages[locale];
}


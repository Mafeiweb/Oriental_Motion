import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/routing";
import { localizedHref } from "@/lib/i18n/paths";

export default function RootPage() {
  redirect(localizedHref(defaultLocale, "/"));
}

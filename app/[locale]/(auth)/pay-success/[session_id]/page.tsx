import { handleOrderSession } from "@/services/order";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

export default async function ({ params }: { params: { session_id: string } }) {
  try {
    await handleOrderSession(params.session_id);
  } catch (e) {
    console.log("handle order session failed: ", e);
    // no toast on server
  }

  const locale = await getLocale();
  redirect(`/${locale}`);
}
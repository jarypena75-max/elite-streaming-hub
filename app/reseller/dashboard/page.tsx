import { redirect } from "next/navigation";

export default function ResellerDashboard() {
  redirect("/catalog?mode=reseller");
}

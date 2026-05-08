import { redirect } from "next/navigation";

export default function HospitalVisitRedirect() {
  redirect("/hospital#vaccine");
}

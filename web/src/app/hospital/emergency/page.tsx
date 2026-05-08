import { redirect } from "next/navigation";

export default function HospitalEmergencyRedirect() {
  redirect("/hospital#emergency");
}

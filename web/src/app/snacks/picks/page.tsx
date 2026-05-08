import { redirect } from "next/navigation";

export default function SnacksPicksRedirect() {
  redirect("/snacks#popular");
}

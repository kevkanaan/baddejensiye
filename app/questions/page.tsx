import type { Metadata } from "next";
import Bank from "./Bank";

export const metadata: Metadata = { title: "Toutes les questions" };

export default function Page() {
  return <Bank />;
}

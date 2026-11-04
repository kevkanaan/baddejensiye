import type { Metadata } from "next";
import ProgressView from "./ProgressView";

export const metadata: Metadata = { title: "Progression" };

export default function Page() {
  return <ProgressView />;
}

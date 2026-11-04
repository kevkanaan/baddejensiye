import type { Metadata } from "next";
import ExamRunner from "./ExamRunner";

export const metadata: Metadata = { title: "Examen blanc" };

export default function Page() {
  return <ExamRunner />;
}

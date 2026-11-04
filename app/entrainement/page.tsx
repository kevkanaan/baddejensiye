import { Suspense } from "react";
import type { Metadata } from "next";
import Practice from "./Practice";

export const metadata: Metadata = { title: "S'entraîner" };

export default function Page() {
  return (
    <Suspense>
      <Practice />
    </Suspense>
  );
}

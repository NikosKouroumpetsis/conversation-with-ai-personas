import React from "react";
import { UserButton } from "@clerk/nextjs";

export default function MainPage() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

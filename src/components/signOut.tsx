"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <div>
      <div>
      <button
            className="bg-red-500 p-5 rounded-md"
            onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
          >
            Log Out
          </button>
      </div>
    </div>
  );
}

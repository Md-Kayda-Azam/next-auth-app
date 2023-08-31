import RegisterPage from "@/components/Register/RegisterPage";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
export default async function Register() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <>
      <RegisterPage />
    </>
  );
}

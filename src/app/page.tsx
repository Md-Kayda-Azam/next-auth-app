import SignOutButton from "@/components/signOut";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <section>
      <div>
        <div className="flex justify-center items-center h-screen flex-col">
          <h1 className=" bg-purple-300 text-3xl font-bold p-4 rounded-md mb-6">
            Hello bro i am your home page.
          </h1>
          <p>{JSON.stringify(session)}</p>
          <SignOutButton />
        </div>
      </div>
    </section>
  );
}

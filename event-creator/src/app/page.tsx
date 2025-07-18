"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/event-creator/src/lib/supabase/client";

export default function Dashboard() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
        >
          🚪 Logout
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <Link
          href="/experiments/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          ➕ Create Experiment
        </Link>

        <Link
          href="/projects/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          ➕ Create Project
        </Link>

        <Link
          href="/projects"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          📁 View All Projects
        </Link>

        <Link
          href="/experiments"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          🧪 View All Experiments
        </Link>
      </div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/event-creator/src/lib/supabase/client";
import getProjects from "./actions/getProjects";
import { Project } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Array<Project>>([]);

  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      setProjects(data);
    }
    fetchProjects();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <button
        onClick={() => router.push("/create-project")}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Create Project Page
      </button>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white p-2 rounded ml-4"
      >
        Logout
      </button>
      <div className="w-full">
        <h2 className="text-xl font-semibold mt-6">Your Projects</h2>
        <p className="text-gray-600">
          List of projects will be displayed here.
        </p>
        {/* Add logic to fetch and display user's projects */}
        <ul>
          {projects.map((project) => (
            <li key={project.id} className="border-b py-2">
              <Link href={`/${project.id}`}>
                <div className="text-lg font-medium">{project.title}</div>
                <div className="text-gray-500">{project.client}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

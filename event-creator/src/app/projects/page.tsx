"use client";
import React from "react";
import Link from "next/link";
import getProjects from "@/event-creator/src/app/actions/getProjects";
import { Project } from "@prisma/client";
import { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState<Array<Project>>([]);

  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      setProjects(data);
    }
    fetchProjects();
  }, []);
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        <Link
          href="/projects/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          ➕ Create New Project
        </Link>
      </div>

      <ul className="divide-y divide-gray-200 bg-white rounded-lg shadow">
        {projects.map((project) => (
          <li key={project.id} className="p-4 hover:bg-gray-50 transition">
            <Link href={`/projects/${project.id}`} className="block">
              <div className="text-lg font-semibold text-blue-700">
                {project.title}
              </div>
              <div className="text-sm text-gray-500">{project.client}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;

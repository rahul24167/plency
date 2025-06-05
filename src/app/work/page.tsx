"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
//import Image from "next/image";

interface ProjectInfo {
  id: string;
  image: string;
  title: string;
  brand: string;
  date: Date;
}
const Work = () => {
  const router = useRouter();
  const projects: ProjectInfo[] = [
    {
      id:"abc1",
       image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Project One",
      brand: "Brand A",
      date: new Date("2023-01-01"),
    },
    {
      id:"abc2",
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Project Two",
      brand: "Brand B",
      date: new Date("2023-02-01"),
    },
    {
      id:"abc3",
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Project One",
      brand: "Brand A",
      date: new Date("2023-01-01"),
    },
    { 
      id:"abc4",
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Project Two",
      brand: "Brand B",
      date: new Date("2023-02-01"),
    },
    { 
      id:"abc5",
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Project One",
      brand: "Brand A",
      date: new Date("2023-01-01"),
    },
    { 
      id:"abc6",
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Project Two",
      brand: "Brand B",
      date: new Date("2023-02-01"),
    },
  ];
  const onClickProject = (id: string) => {
   router.push(`/project/${id}`);
  };
  return (
    <div className="h-screen w-full p-8 flex flex-row flex-wrap overflow-auto">
      {projects.map((project, index) => (
        <div key={index} className="w-1/2 p-5 h-[75vh] flex flex-col">
          <Link href={`/project/${project.id}`} className="w-full border flex-grow" >
          <div onClick={()=>onClickProject(project.id)} className="w-full border flex-grow" ></div>
          {/* <Image src={project.image} alt={project.title} onClick={()=>onClickProject(project.id)} className="w-full h-48 object-cover mb-3" />
           */}
          </Link>
          
          <div className="w-full flex flex-row justify-between items-center px-2">
            <h2 className="text-xl font-bold">{project.title}</h2>
            <p className="text-gray-600">{project.brand}</p>
            <p className="text-gray-400">{project.date.toLocaleDateString()}</p>
          </div>
        </div>
      ))}
      
     
    </div>
  );
};

export default Work;

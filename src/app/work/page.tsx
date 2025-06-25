import Link from "next/link";
//import Image from "next/image";

interface ProjectInfo {
  id: string;
  image: string;
  title: string;
  brand: string;
  date: Date;
}
const Work = () => {
 
  const projects: ProjectInfo[] = [
    {
      id: "abc1",
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Project One",
      brand: "Brand A",
      date: new Date("2023-01-01"),
    },
    {
      id: "abc2",
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Project Two",
      brand: "Brand B",
      date: new Date("2023-02-01"),
    },
    {
      id: "abc3",
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Project One",
      brand: "Brand A",
      date: new Date("2023-01-01"),
    },
    {
      id: "abc4",
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Project Two",
      brand: "Brand B",
      date: new Date("2023-02-01"),
    },
    {
      id: "abc5",
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Project One",
      brand: "Brand A",
      date: new Date("2023-01-01"),
    },
    {
      id: "abc6",
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Project Two",
      brand: "Brand B",
      date: new Date("2023-02-01"),
    },
  ];
  
  return (
    
    <div className="bg-cover w-full flex flex-row flex-wrap  ">
      <div className="px-5 md:hidden text-largest font-bold">WORK</div>
      <div className="flex flex-row flex-wrap w-full ">
        {projects.map((project, index) => (
        <div key={index} className="w-full md:w-1/2 h-[75vh] p-5 flex flex-col">
          <Link
            href={`/work/${project.id}`}
            className="w-full border flex-grow bg-gray-500"
          >
            
            {/* <Image src={project.image} alt={project.title} onClick={()=>onClickProject(project.id)} className="w-full h-48 object-cover mb-3" />
             */}
          </Link>

          <div className="w-full flex flex-row justify-start items-center px-2">
            <h2 className="w-1/3 uppercase font-bold">{project.title}</h2>
            <p className="w-1/3 uppercase font-bold">{project.brand}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Work;

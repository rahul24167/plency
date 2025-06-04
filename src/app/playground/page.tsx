interface ProjectInfo {
  title: string;
}const Playground = () => {
  const projects: ProjectInfo[] = [
    {
      title: "Project One",
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One"
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",   
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One"
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",   
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One"
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",   
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One"
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",   
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One"
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",   
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One"
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",   
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One"
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",   
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One"
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",   
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One"
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",   
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One"
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",   
    },
    {
      title: "Project Two",
    },
  
    {
      title: "Project One",
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One"
    },
    {
      title: "Project Two",
    },
    {
      title: "Project One",   
    },
    {
      title: "Project Two",
    },
  ];
  return (
    <div className="h-screen overflow-auto p-10 flex flex-row justify-end">
     <div className="w-1/2">
      {projects.map((project, index) => (
        <div key={index} className="p-2">
          {project.title}
        </div>
      ))}

     </div>

    </div>
    
  )
}

export default Playground
interface ProjectPageProps {
  params: {
    id: string;
  };
}
const Project = ({ params }: ProjectPageProps) => {
  const { id } = params;
  const projectInfo = {
    id: id,
    images: [
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
    ],
    title: "Project Title",
    brand: "Brand Name",
    service: "Service Provided",
  };
  return (
    <div className="h-screen w-screen overflow-auto flex flex-col flex-wrap p-4 py-8 pb-[15vh] gap-2">

      <div className="w-1/2 h-[90vh] flex flex-col justify-end pb-1/4">
        <h1 className="text-largest text-secondary font-bold uppercase">{projectInfo.title}</h1>
        <h1 className="text-largest text-secondary font-bold uppercase">{projectInfo.brand}</h1>
        <h3 className="text-medium text-secondary font-bold uppercase">{projectInfo.service}</h3>

      </div>
      <div className="w-[calc(50%-4px)] h-[90vh] overflow-auto">
        <div className="w-full h-full border my-2"></div>
        <div className="w-full h-full  my-2 border "></div>
        <div className="w-full h-full  my-2 border "></div>
        <div className="w-full h-full  my-2 border "></div>
        <div className="w-full h-full  my-2 border "></div>
        <div className="w-full h-full  my-2 border "></div>
        <div className="w-full h-full  my-2 border "></div>
        <div className="w-full h-full  my-2 border "></div>
        <div className="w-full h-full  my-2 border "></div>
        <div className="w-full h-full  my-2 border "></div>
        <div className="w-full h-full  my-2 border "></div>
        <div className="w-full h-full  my-2 border "></div>
        <div className="w-full h-full  my-2 border "></div>
        <div className="w-full h-full  my-2 border "></div>
        <div className="w-full h-full  my-2 border "></div>
      
      </div>
    </div>
  );
};

export default Project;

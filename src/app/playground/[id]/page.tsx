export default async function Experiment({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectInfo = {
    id: "123",
    images: [
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ],
    title: "Project Title",
    brand: "Brand Name",
    service: "Service Provided",
  };
  return (
    <div className="h-screen w-full overflow-auto flex flex-row md:flex-col flex-wrap p-5 gap-2">
      <div className="md:relative pointer-events-none md:w-[45vh] md:h-[90vh] flex flex-col justify-end items-start">
        <h1 className="text-largest text-secondary font-bold uppercase">
          {projectInfo.title}
        </h1>
        <h1 className="text-largest text-secondary font-bold uppercase">
          {projectInfo.brand}
        </h1>
        <h3 className="text-medium text-secondary font-bold uppercase">
          {id}
          {projectInfo.service}
        </h3>
      </div>
      <div className="w-full md:w-1/2 h-[90vh] overflow-auto">
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
}

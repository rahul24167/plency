

export default async function Project({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectInfo = {
    id: id,
    images: [
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    ],
    title: "Project Title",
    client: "Client Name",
    brand: "Amazing Brand",
    description: "About the brand",
    service: "Service Provided",
    services:
      "Superdry challenges us to create a dynamic campaign for their new collection launch in collaboration with Parmish Verma. The campaign should capture the energy of the partnership and engage the target audience effectively.",
  };
  return (
    <div className="bg-cover py-8">
      <div className="mx-4 flex flex-wrap w-full gap-2">
        <div className=" w-full h-[90vh] text-tertiary font-bold uppercase border flex flex-col justify-end pb-1/4">
          <h1 className="text-largest">{projectInfo.title}</h1>
          <h1 className="text-largest">{projectInfo.brand}</h1>
          <h3 className="text-medium">{projectInfo.service}</h3>
        </div>
        <div className="w-[calc(50%-4px)] h-[60vh] border"></div>
        <div className="w-[calc(50%-4px)] h-[60vh] border"></div>
        <div className="w-full h-[50vh] border"></div>
        <div className="w-full h-[90vh] border"></div>
        <div className="w-[calc(50%-4px)] h-screen border"></div>
        <div className="w-[calc(50%-4px)] h-screen border"></div>
      </div>

      <div className="w-full border flex justify-center">
        <div className="w-1/3 px-5">
        <div>
          <span></span>
          <span></span>
        </div>
        
        </div>
      </div>
      <div className="w-full h-[30vh]"></div>
    </div>
  );
}

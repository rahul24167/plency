import { getExperimentById } from "../../actions/getExperiments";
import Image from "next/image";
import { cdnUrl } from "../../lib/cdnUrl";

export default async function Experiment({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const experiment = await getExperimentById(id);
  if (!experiment) {
    return <div className="text-center text-red-500">Experiment not found</div>;
  }

  return (
    <div className="h-screen w-full flex flex-col md:flex-row  gap-5 p-5  pb-0">
      <div className="hidden md:w-[38%] md:flex flex-col justify-end items-start">
        <div className="font-normal uppercase">{experiment.brand}</div>
        <div className="font-normal">{experiment.brandDescription}</div>
        <div className="font-normal uppercase ">{experiment.question}</div>
        <div className="font-normal md:mb-14">{experiment.answer}</div>
      </div>
      <div className="md:w-[62%] overflow-auto">
        {experiment.images.map((image, index) => (
          <div className="w-full mb-2" key={index}>
            <Image
              src={cdnUrl(image.url)}
              alt={`Uploaded image ${index}`}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />
            {index === 0 && (
              <div className="md:hidden flex flex-col justify-end items-start">
                <div className="font-normal uppercase">{experiment.brand}</div>
                <div className="font-normal">{experiment.brandDescription}</div>
                <div className="font-normal uppercase ">
                  {experiment.question}
                </div>
                <div className="font-normal md:mb-14">{experiment.answer}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

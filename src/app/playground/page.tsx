import { getExperiments } from "../actions/getExperiments";
import Link from "next/link";

const Playground = async () => {
  const experiments = await getExperiments();

  return (
    <div className="w-full flex flex-col justify-end items-end">
      <div className="md:w-1/3 flex flex-col justify-start">
        {experiments.map((experiment) => (
          <div
            key={experiment.id}
            className="w-full flex flex-col md:flex-row p-5 group relative"
          >
            <Link href={`/playground/${experiment.id}`} className="cursor-pointer uppercase">{experiment.brand}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playground;

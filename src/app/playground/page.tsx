
import { getExperiments } from "../actions/getExperiments";

const Playground = async () => {
  const experiments = await getExperiments();

  return (
    <div className="w-full flex flex-col justify-end items-end">
      <div className="md:w-1/3 flex flex-col justify-start">
      <ul>
        {experiments.map((experiment) => (
          <li key={experiment.id}>{experiment.brand}</li>
        ))}
      </ul>
        {experiments.map((experiment) => (
          <div
            key={experiment.id}
            className="w-full flex flex-col md:flex-row p-5 group relative"
          >
            <div className="cursor-pointer uppercase">{experiment.brand}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playground;

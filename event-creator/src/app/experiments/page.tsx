import React from 'react'
import Link from "next/link";
import { getExperiments }  from '@/event-creator/src/app/actions/getExperiments'

const Experiments = async () => {
    const experiments = await getExperiments();
  return (
   <div className="p-6 max-w-3xl mx-auto">
    <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Experiments</h2>
        <Link
          href="/experiments/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
        >
          ➕ Create New Experiment
        </Link>
      </div>
 
  <ul className="space-y-3">
    {experiments.map((experiment) => (
      <li
        key={experiment.id}
        className="bg-white p-4 rounded-lg shadow hover:bg-gray-50 transition"
      >
        <div className="text-lg font-medium text-blue-700">
          {experiment.brand}
        </div>
      </li>
    ))}
  </ul>
</div>

  )
}

export default Experiments
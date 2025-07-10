// "use client";
// import { useState } from "react";
// import { motion, AnimatePresence } from "motion/react";
// import { Experiment } from "@prisma/client";

// export default function ExperimentList({ experiments }: { experiments: Experiment[] }) {
//   const [hoveredExperiment, setHoveredExperiment] = useState<null | {
//     images: { url: string }[];
//     y: number;
//     id: string;
//   }>(null);

//   return (
//     <div className="w-full flex flex-col justify-end items-end relative h-screen overflow-hidden bg-black text-white">
//       {/* Fixed Image Preview on Hover */}
//       <AnimatePresence>
//         {hoveredExperiment && hoveredExperiment.images.length > 0 && (
//           <motion.div
//             key={hoveredExperiment.id}
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: -50 }}
//             transition={{ duration: 0.3 }}
//             className="absolute left-10 w-64 h-64 z-20 overflow-hidden"
//             style={{ top: hoveredExperiment.y }}
//           >
//             <img
//               src={hoveredExperiment.images[0].url}
//               alt=""
//               className="w-full h-full object-cover rounded shadow-lg"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Brand List */}
//       <div className="md:w-1/3 flex flex-col justify-start pr-16 pt-20 space-y-6">
//         {experiments.map((experiment) => (
//           <div
//             key={experiment.id}
//             className="group relative cursor-pointer text-4xl font-bold uppercase transition-colors"
//             onMouseEnter={(e) => {
//               const rect = e.currentTarget.getBoundingClientRect();
//               setHoveredExperiment({
//                 images: experiment.images,
//                 y: rect.top,
//                 id: experiment.id,
//               });
//             }}
//             onMouseLeave={() => setHoveredExperiment(null)}
//           >
//             {experiment.brand}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

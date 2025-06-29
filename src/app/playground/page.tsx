const Playground = () => {
  const experiments=[
    {
      id: 1,
      name: "Project Title A",
    },
    
    {
      id: 2,
      name: "Project Title B",
    },
    {
      id: 3,
      name: "Project Title C",
    },


  ]
  
  return (
    

    <div className="w-full flex flex-col justify-end items-end">
      <div className="md:w-1/3 flex flex-col justify-start">
      {experiments.map((experiment) => (
        <div key={experiment.id} className="w-full flex flex-col md:flex-row p-5">
          <div>{experiment.name}</div>
        </div>
      ))}
       {experiments.map((experiment) => (
        <div key={experiment.id} className="w-full flex flex-col md:flex-row p-5">
          <div>{experiment.name}</div>
        </div>
      ))}
       {experiments.map((experiment) => (
        <div key={experiment.id} className="w-full flex flex-col md:flex-row p-5">
          <div>{experiment.name}</div>
        </div>
      ))}
       {experiments.map((experiment) => (
        <div key={experiment.id} className="w-full flex flex-col md:flex-row p-5">
          <div>{experiment.name}</div>
        </div>
      ))} {experiments.map((experiment) => (
        <div key={experiment.id} className="w-full flex flex-col md:flex-row p-5">
          <div>{experiment.name}</div>
        </div>
      ))}
       {experiments.map((experiment) => (
        <div key={experiment.id} className="w-full flex flex-col md:flex-row p-5">
          <div>{experiment.name}</div>
        </div>
      ))}
       {experiments.map((experiment) => (
        <div key={experiment.id} className="w-full flex flex-col md:flex-row p-5">
          <div>{experiment.name}</div>
        </div>
      ))}
       {experiments.map((experiment) => (
        <div key={experiment.id} className="w-full flex flex-col md:flex-row p-5">
          <div>{experiment.name}</div>
        </div>
      ))}
       {experiments.map((experiment) => (
        <div key={experiment.id} className="w-full flex flex-col md:flex-row p-5">
          <div>{experiment.name}</div>
        </div>
      ))}
       {experiments.map((experiment) => (
        <div key={experiment.id} className="w-full flex flex-col md:flex-row p-5">
          <div>{experiment.name}</div>
        </div>
      ))} {experiments.map((experiment) => (
        <div key={experiment.id} className="w-full flex flex-col md:flex-row p-5">
          <div>{experiment.name}</div>
        </div>
      ))} {experiments.map((experiment) => (
        <div key={experiment.id} className="w-full flex flex-col md:flex-row p-5">
          <div>{experiment.name}</div>
        </div>
      ))} {experiments.map((experiment) => (
        <div key={experiment.id} className="w-full flex flex-col md:flex-row p-5">
          <div>{experiment.name}</div>
        </div>
      ))}


      </div>
     
     
    </div> 
  )
}

export default Playground
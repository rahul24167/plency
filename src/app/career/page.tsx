interface CareerWithUs {
  title: string;
  description: string;
}
const Career = () => {
  const careerWithUs:CareerWithUs[]=[{
    title: "Job Updates",
    description: "Stay updated with the latest job openings and career opportunities."
  }, {
    title: "Internship Updates",
    description: "Explore internship opportunities to kickstart your career."
  }, {
    title: "Freelance Updates",
    description: "Find freelance projects that match your skills and interests."
  }]
  return (
    <div  className="min-h-screen p-10" >
      <div className="h-1/2 w-full flex flex-row justify-center items-center">
        <div className="pl-[32rem] pr-56">
        {careerWithUs.map((item, index) => (
          <div key={index} className="w-full flex flex-row p-5">
            <div className="w-1/4 uppercase font-normal">{item.title}</div>
            <div className="w-3/4">{item.description}</div>
          </div>
        ))}
        </div>
      </div>
      <div className="h-1/2 w-full"></div>
    </div>
  )
}

export default Career
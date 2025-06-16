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
    <div  className="min-h-screen" >
      <div className="px-5 md:hidden text-largest font-bold">CAREER</div>
      <div className="w-full flex flex-row justify-end items-center">
        <div className="md:w-2/3">
        {careerWithUs.map((item, index) => (
          <div key={index} className="w-full flex flex-col md:flex-row p-5">
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
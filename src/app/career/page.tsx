interface CareerWithUs {
  type: string;
  career:{
  title: string;
  description: string;
  }
}
const Career = () => {
  const careerWithUs:CareerWithUs[]=[{
    type: "current openings",
    career: {
      title: "3D MOTION GRAPHIC DESIGNER",
      description: "As a 3D Motion Graphic Designer at Plency, you’ll be responsible for creating visually engaging animations and motion graphics that bring our ideas to life. You’ll work closely with the creative team to translate concepts and storyboards into high-quality visual content, manage multiple projects simultaneously, and ensure timely delivery without compromising on aesthetics. A strong understanding of storytelling, design and current motion trends will be key to shaping work that stands out."
    }
   
  }]
  return (
    <div  className="min-h-screen" >
     
      <div className="w-full flex flex-row justify-end items-center">
        <div className="md:w-2/3">
        {careerWithUs.map((item, index) => (
          <div key={index} className="w-full flex flex-col md:flex-row p-5">
            <div className="w-1/4 uppercase font-normal text-secondary">{item.type}</div>
            <div className="w-3/4 flex flex-col gap-3">
              <span>{item.career.title}</span>
              <span>{item.career.description}</span>
            </div>
          </div>
        ))}
        </div>
      </div>
      <div className="h-1/2 w-full"></div>
    </div>
  )
}

export default Career
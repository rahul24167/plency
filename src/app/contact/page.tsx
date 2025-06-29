interface ContactUs {
  title: string;
  description: string;
}
const Contact = () => {

  const contactUs:ContactUs[]=[
    {
      title: "Office Address",
      description: "Kh No. 621 Silver Oak Farms, Zero Number Rd, Ghitorni, New Delhi, 110030"
    },
    {
      title: "General Email",
      description: "hi@plency.com"
    }
  ]
  return (
     <div  className="min-h-screen bg-transparent" >
      <div className="w-full flex flex-row justify-end items-center">
        <div className="md:w-2/3">
        {contactUs.map((item, index) => (
          <div key={index} className={` w-full flex flex-col md:flex-row p-5`}>
            <div className={`md:w-1/4 uppercase font-normal`}>{item.title}</div>
            <div className="md:w-3/4">{item.description}</div>
          </div>
        ))}
        </div>
      </div>
      
    </div>
  )
}

export default Contact
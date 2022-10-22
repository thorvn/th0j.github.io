const Greeting = () => {
  let headingColorClass =
    'bg-gradient-to-r from-yellow-600 to-red-600 dark:bg-gradient-to-l dark:from-emerald-500 dark:to-lime-600'

  return (
    <div>
      <div
        className={`mb-8 bg-clip-text text-5xl font-extrabold leading-[60px] tracking-tight text-transparent md:text-7xl md:leading-[86px] ${headingColorClass}`}
      >
        Hello world! <i className="twe twe-waving-hand"></i>
      </div>

      <div className="flex justify-items-center">
        <span>I'm Tho Vo - a Software Engineer has 5 years of experience in Web Development</span>
        <i className="twe twe-boy"></i>
      </div>
    </div>
  )
}

export { Greeting }

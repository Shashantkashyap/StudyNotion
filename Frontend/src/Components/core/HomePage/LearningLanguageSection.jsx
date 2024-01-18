import React from 'react'
import HighlightedText from './HighlightedText'
import know_your_progress from "../../../assets/know_your_progress.png"
import Plan_your_lessons from "../../../assets/Plan_your_lessons.png"
import Compare_with_others from "../../../assets/Compare_with_others.png"
import CTAButton from "./Button"
function LearningLanguageSection() {
  return (
    <div className='mt-[120px] mb-32'>
        <div className='flex flex-col gap-5 items-center'>

            <div className='text-4xl font-semibold text-center'>
                Your Swiss Knife for 
                <HighlightedText text={"learning any language"}/>
            </div>

            <div className="text-center text-richblack-700 font-medium lg:w-[75%] mx-auto leading-6 text-base mt-3">
              Using spin making learning multiple languages easy. with 20+
              languages realistic voice-over, progress tracking, custom schedule
              and more.
            </div>

            <div className='flex flex-row items-center justify-center mt-5 max-lg:flex-col'>
                    <img src={know_your_progress} alt="know_your_progress" className=' object-contain -mr-28' />
                    <img src={Compare_with_others} alt="Compare_with_others" className=' object-contain'/>
                    <img src={Plan_your_lessons} alt="Plan_your_lessons" className=' object-contain -ml-32'  />
              </div>

              <div className='w-fit '>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
              </div>



        </div>
      
    </div>
  )
}

export default LearningLanguageSection

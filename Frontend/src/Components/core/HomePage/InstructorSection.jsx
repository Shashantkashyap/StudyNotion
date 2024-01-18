import React from 'react'
import Instructor from "../../../assets/Instructor.png"
import HighlightedText from './HighlightedText'
import { FaArrowRight } from 'react-icons/fa'
import CTAButton from "./Button"

function InstructorSection() {
  return (
    <div className='mt-16'>
      <div className='flex flex-row gap-20 items-center'>
        <div className='w-[50%] '>
        <img
              src={Instructor}
              alt="Instructor"
              className="shadow-white shadow-[-20px_-20px_0_0]"
            />

        </div>

        <div className='w-[50%] flex flex-col '>
            <div className='w-[50%] text-4xl font-semibold mb-8'>
                Become an 
                <HighlightedText text={"Instructor"}/>
                
            </div>
            <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>

            <div className='w-fit mt-4'>
            <CTAButton active={true} linkto={"./signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                        Start Learning today
                        <FaArrowRight></FaArrowRight>

                    </div>
            </CTAButton>
            </div>

        </div>
      </div>
    </div>
  )
}

export default InstructorSection

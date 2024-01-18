import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightedText from "../Components/core/HomePage/HighlightedText";
import CTAButton from "../Components/core/HomePage/Button"
import Banner from "../assets/banner.mp4";
import CodeBlocks from "../Components/core/HomePage/CodeBlocks";
import TimelineSection from "../Components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../Components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../Components/core/HomePage/InstructorSection";
import Footer from "../Components/common/Footer";
import ExploreMore from "../Components/core/HomePage/ExploreMore";

function Home() {
  return (
    <div>
      {/*SECTION 1 */}

      <div className=" max-w-maxContent relative mx-auto flex flex-col w-11/12 items-center text-white justify-between ">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] bg-richblue-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit ">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblue-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future With
          <HighlightedText text={"Coding Skill"} />
        </div>

        <div className="mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book A Demo
          </CTAButton>
        </div>

        <div className=" w-[70%] mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* code Section 1*/}

        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your{" "}
                <HighlightedText text={"Coding Potential"}></HighlightedText>{" "}
                with our online courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          ></CodeBlocks>
        </div>

        {/* code Section 2*/}

        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start <HighlightedText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        <ExploreMore />
      </div>

      {/*SECTION 2 */}

      <div className="bg-pure-greys-5 text-richblue-700">
        <div className="homepage_bg h-[310px]">

          <div className=" w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
            <div className="h-[250px]"></div>
            <div className="flex flex-row gap-7 text-white ">
              <CTAButton active={true} linkto={"/signup"}>
                <div className=" flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight></FaArrowRight>
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"./signup"}>
                <div>
                  Learn More
                </div>
              </CTAButton>


            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 max-lg:flex-col">

            <div className="flex flex-row gap-5 mb-10 mt-[95px] max-lg:flex-col">

              <div className="text-4xl font-semibold w-[45%] max-lg:flex-col">
                Get the skill you need for a 
                <HighlightedText text={"Job that are in demand"}>

                </HighlightedText>
              </div>

              <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </CTAButton>
            </div>

            </div>

            <TimelineSection></TimelineSection>

        <LearningLanguageSection></LearningLanguageSection>

        </div>

        
      </div>

      {/*SECTION 3 */}

      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col justify-between gap-8 bg-richblue-900 text-white">
            <InstructorSection/>

            <h2 className="text-center text-4xl font-semibold mt-10">review from other learners</h2>
      </div>

      {/*FOOTER  */}

      <Footer></Footer>
    </div>
  );
}

export default Home;

import { FaUserPlus } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { MdFindInPage } from "react-icons/md";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How Career Connect Works !</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                Easily sign up to create your profile and start exploring job opportunities or
                posting job openings. Your journey to career success begins here.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
                Easily sign up to create your profile and start exploring job opportunities or
                posting job openings. Your journey to career success begins here.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
                Submit your applications with confidence or review and select the best candidates to
                fill your vacancies, streamlining the hiring process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;

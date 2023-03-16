import React, { useState } from "react"
import { fadeInRight, fadeInUp, fadeInLeft, fadeInDown } from "react-animations"
import Radium, { StyleRoot } from "radium"

import { Link } from "react-router-dom"
import { notification } from "antd"
import validator from "validator"
import axios from "axios"
const styles = {
  fadeInLeft: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInLeft, "fadeInLeft"),
  },
  fadeInRight: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
  },
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
  fadeInDown: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInDown, "fadeInDown"),
  },
}

// bg-orange
export const LoginPage = ({
  setPage,
  data,
  pages,
  userInfo,
  setUserInfo,
  code,
  setAnswers,
}) => {
  const [errorMessage, setErrorMessage] = useState("")
  const checkUser = () => {
    axios
      .put(`/survey/login/${code}`, { email })
      .then((res) => {
        console.log("answers from db", res.data)
        setUserInfo({
          email: email,
          respondent_id: res.data.respondent_id,
          is_completed: res.data.is_completed,
          location_id: res.data.location_id,
          department_id: res.data.department_id,
        })
        setAnswers(
          res?.data?.answers.map((i) => {
            return { ...i, type: i.option_id ? "option" : "question" }
          })
        )
        setPage(!res.data.is_completed ? res.data?.position || 2 : null)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const [email, setEmail] = useState("")

  const onSubmit = () => {
    let domains = data?.domains?.map((i) => i.domain)
    if (!validator.isEmail(email)) {
      setErrorMessage("Please enter a valid email address.")
    } else if (
      domains?.includes(email.split("@")[1]) ||
      email.split("@")[1].includes("leesmanindex.com")
    ) {
      setErrorMessage("")
      checkUser()
    } else {
      setErrorMessage("Please enter a valid email address.")
    }
  }

  return (
    <>
      <StyleRoot style={styles.fadeInUp} className="text_section">
        <h2 className="xll">
          <span className="default-bold">
            Let’s get started <span className="line-_thin">―</span>{" "}
          </span>
          <br />
          enter your email to continue
        </h2>

        <div className="form-group type-email">
          <div className="fl-wrap fl-wrap-input fl-is-required">
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="form-control start-_email fl-input"
              placeholder="Email"
            />
          </div>
          <span style={{ color: "black" }}>{errorMessage}</span>
        </div>

        <div className="chapter-_btns">
          <button
            onClick={onSubmit}
            id="hover-_hand"
            className={`btn_1 validate ${!data?.domains && "disable_it"}`}
          >
            Enter
          </button>
        </div>
      </StyleRoot>
    </>
  )
}

// bg-white
export const WelcomePage = ({ setPage, data }) => {
  return (
    <>
      <StyleRoot style={styles.fadeInUp} className="text_section">
        <h2 className="xl">
          <span className="green-bold">
            Welcome <span className="line-_thin">―</span>{" "}
          </span>
          This survey is
          <br /> an opportunity to voice your opinions about your{" "}
          {data?.general?.core_module.replace("+", "and")}.
        </h2>
        <p className="intro-_p">
          We’ll ask you about your experience in the{" "}
          {data?.general?.core_module?.replace("+", "and")} so we can understand
          what’s working well and what isn’t in your work environment. To resume
          the survey, you can use the same email address, but your answers will
          remain anonymous and confidential. All email addresses will be
          automatically deleted once the survey closes.
          <br />
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="cursorp"
            id="hover-_hand"
            href="https://www.leesmanindex.com/privacy-policy/"
          >
            Read about the Leesman privacy statement here.
          </a>
        </p>

        <div className="chapter-_btns">
          {/* <button id="hover-_hand" className="btn_2 mr-3 validate" onClick={() => setPage(3)}>
            Resume
          </button> */}

          <button
            id="hover-_hand"
            className="btn_1 validate"
            onClick={() => setPage(3)}
          >
            Start
          </button>
        </div>
      </StyleRoot>
    </>
  )
}

// bg-white
export const WelcomePageLogo = ({ setPage }) => {
  return (
    <>
      <StyleRoot style={styles.fadeInUp} className="text_section">
        <h2 className="xl">
          <span className="green-bold">
            Welcome <span className="line-_thin">―</span>{" "}
          </span>
          This survey
          <br /> allows you to tell us what you think about your workplace.
        </h2>
        <p className="intro-_p">
          The survey should take 10 minutes to complete, and your results will
          remain entirely confidential and anonymous. The more responses we
          receive, the more accurate your workplace picture will be. Thank you.
          <br />
          <br />
          <a
            href="https://www.leesmanindex.com/"
            target="_blank"
            rel="noopener noreferrer"
            id="hover-_hand"
          >
            Please read about the Leesman’s privacy statement here.
          </a>
        </p>

        <div className="chapter-_btns">
          <button
            id="hover-_hand"
            className="btn_2 mr-3 validate"
            onClick={() => setPage(3)}
          >
            Resume
          </button>

          <button
            id="hover-_hand"
            className="btn_1 validate"
            onClick={() => setPage(3)}
          >
            Start
          </button>

          <a
            className="find-btn ml-3"
            href="#!"
            target="_blank"
            rel="noopener noreferrer"
            id="hover-_hand"
          >
            Find out more <span className="iconx-arrow-right-circle"></span>
          </a>
        </div>
      </StyleRoot>

      <div className="chapter-_logo">
        <img src="/assets/images/temp/logo-company.png"></img>
      </div>
    </>
  )
}

// bg-white
export const TextPage = ({ setPage }) => {
  return (
    <>
      <StyleRoot style={styles.fadeInUp} className="text_section">
        <p className="intro-_p bolded">
          This is dummy text. It is intended to be read but it has no meaning.
          As a simulation of actual copy, using ordinary words with normal
          letter frequencies, it cannot deceive the eye or brain.
        </p>
        <p className="intro-_p">
          Dummy settings that use other languages or even gibberish for text
          have the inherent disadvantage that they distract attention towards
          themselves. This is dummy text. It is intended to be read but it has
          no meaning. As a simulation of actual copy, using ordinary words with
          normal letter frequencies, it cannot deceive the eye or brain.
        </p>
        <p className="intro-_p">
          It is intended to be read but it has no meaning. As a simulation of
          actual copy, using ordinary words with normal letter frequencies, it
          cannot deceive the eye or brain.
        </p>

        <div className="chapter-_btns">
          <button
            id="hover-_hand"
            className="btn_2 mr-3 validate"
            onClick={() => setPage(3)}
          >
            Resume
          </button>

          <button
            id="hover-_hand"
            className="btn_1 validate"
            onClick={() => setPage(3)}
          >
            Start
          </button>
        </div>
      </StyleRoot>

      <div className="bottom-_copyright">
        <span>© Leesman 2022 | Produced for Ericsson</span>
        <a
          href="#!"
          target="_blank"
          rel="noopener noreferrer"
          className="cursorp"
          id="hover-_hand"
        >
          Click here to view Leesman’s privacy statement.
        </a>
      </div>
    </>
  )
}

// bg-white
export const AboutPage = ({ setPage }) => {
  return (
    <>
      <StyleRoot style={styles.fadeInRight}>
        <figure className="hero_item">
          <img
            src="/assets/images/chapter_icons/chapter--1.png"
            alt=""
            className="img-fluid"
            width="200"
            height="200"
          />
        </figure>
      </StyleRoot>
      <StyleRoot style={styles.fadeInUp} className="text_section">
        <h2 className="xl">
          <span className="orange-bold">
            All about you <span className="line-_thin">―</span>{" "}
          </span>
          <br /> What’s your work style?
        </h2>
        <p className="intro-_p">
          We’d like to start by asking you a few questions about you and what’s
          important to the work that you do, so we can understand your work
          style. Remember, your answers remain anonymous and confidential.
        </p>

        <div className="chapter-_btns">
          <button
            id="hover-_hand"
            className="btn_2 mr-3 validate"
            onClick={() => setPage(6)}
          >
            Back
          </button>

          <button
            id="hover-_hand"
            className="btn_1 validate"
            onClick={() => setPage(6)}
          >
            Next
          </button>
        </div>
      </StyleRoot>
    </>
  )
}

// bg-green
export const ThanksPage = ({ setPage, isPage }) => {
  return (
    <div>
      <StyleRoot style={styles.fadeInRight}>
        <figure className="hero_item">
          <img
            src="/assets/images/temp/img--2.png"
            alt=""
            className="img-fluid"
            width="200"
            height="200"
          />
        </figure>
      </StyleRoot>
      <StyleRoot style={styles.fadeInUp} className="text_section">
        <h2 className="xl">
          <span className="default-bold">Thank you</span>
          <br /> for completing the survey
        </h2>
        <p className="intro-_p">
          All email addresses will be automatically deleted once the survey
          closes.
        </p>
        <p className="intro-_p">
          To understand more about how Leesman helps the world's best
          organisations develop better places to work, visit{" "}
          <a
            href="https://www.leesmanindex.com/"
            target="_blank"
            rel="noopener noreferrer"
            id="hover-_hand"
          >
            www.leesmanindex.com
          </a>
        </p>

        <div className="chapter-_btns">
          {/* <button onClick={() => setPage(isPage - 1)} id="hover-_hand" className="btn_2 mr-3 validate">
            Review survey
          </button> */}

          {/* <button
            onClick={() => {
              notification.success({ message: "Survey submitted successfully" });
              setPage(1);
            }}
            id="hover-_hand"
            className="btn_1 validate"
          >
            Close survey
          </button> */}
        </div>
      </StyleRoot>
    </div>
  )
}

// bg-white
export const BackToSurveyIntro = ({ setPage, data }) => {
  return (
    <>
      <StyleRoot style={styles.fadeInUp} className="text_section">
        <h2 className="xl">
          <span className="green-bold">
            Welcome <span className="line-_thin">―</span>{" "}
          </span>
          This survey
          <br /> allows you to tell us what you think about your workplace.
        </h2>
        <p className="intro-_p">
          The survey should take 10 minutes to complete, and your results will
          remain entirely confidential and anonymous. The more responses we
          receive, the more accurate your workplace picture will be. Thank you.
          <br />
          <br />
          <a
            onClick={() => {
              setPage("details")
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="cursorp"
            id="hover-_hand"
          >
            Read about the Leesman privacy statement here.
          </a>
        </p>

        <div className="chapter-_btns">
          <button id="hover-_hand" className="btn_2 mr-3 validate">
            Resume
          </button>

          <button id="hover-_hand" className="btn_1 validate">
            Start new
          </button>
        </div>
      </StyleRoot>
    </>
  )
}

// bg-white
export const BackToSurveyEnterCode = ({ setPage, data }) => {
  return (
    <>
      <StyleRoot style={styles.fadeInUp} className="text_section">
        <h2 className="xl">
          <span className="green-bold">
            Welcome <span className="line-_thin">―</span>{" "}
          </span>
          This survey
          <br /> allows you to tell us what you think about your workplace.
        </h2>
        <p className="intro-_p">
          The survey should take 10 minutes to complete, and your results will
          remain entirely confidential and anonymous. The more responses we
          receive, the more accurate your workplace picture will be. Thank you.
          <br />
          <br />
          <a
            onClick={() => {
              setPage("details")
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="cursorp"
            id="hover-_hand"
          >
            Read about the Leesman privacy statement here.
          </a>
        </p>

        <input
          className="n_input chapter"
          type="text"
          defaultValue={"R3suM3789"}
          placeholder="Enter code"
        ></input>

        <div className="chapter-_btns">
          <button id="hover-_hand" className="btn_1 validate">
            Resume
          </button>
        </div>
      </StyleRoot>
    </>
  )
}

// bg-orange
export const ClosedSurveyThanksPage = ({ setPage, isPage }) => {
  return (
    <div>
      <StyleRoot style={styles.fadeInRight}>
        <figure className="hero_item">
          <img
            src="/assets/images/temp/img--3.png"
            alt=""
            className="img-fluid"
            width="200"
            height="200"
          />
        </figure>
      </StyleRoot>
      <StyleRoot style={styles.fadeInUp} className="text_section">
        <h2 className="xl">
          <span className="default-bold">
            Thank you for your
            <br /> interest
          </span>
          ― This survey is now closed.
        </h2>
        <p className="intro-_p">
          We hope you have the opportunity to provide feedback about your
          workplace in the future.
        </p>
        <p className="intro-_p">
          For further information on this survey, please contact the survey
          organiser from your organisation (see the invitation email for more
          details). To find out more details about Leesman please go to{" "}
          <a
            className="default"
            href="https://www.leesmanindex.com/"
            target="_blank"
            rel="noopener noreferrer"
            id="hover-_hand"
          >
            leesmanindex.com
          </a>
        </p>

        <div className="chapter-_btns">
          <button
            onClick={() =>
              window.open("https://www.leesmanindex.com/", "_blank")
            }
            id="hover-_hand"
            className="btn_1 validate"
          >
            Visit our website
          </button>
        </div>
      </StyleRoot>
    </div>
  )
}

// bg-white
export const OfficePage = ({ setPage, isPage }) => {
  return (
    <div>
      <StyleRoot style={styles.fadeInRight}>
        <figure className="hero_item">
          <img
            src="/assets/images/chapter_icons/chapter--2.png"
            alt=""
            className="img-fluid"
            width="200"
            height="200"
          />
        </figure>
      </StyleRoot>
      <StyleRoot style={styles.fadeInUp} className="text_section">
        <h2 className="xl">
          <span className="green-bold">
            Something about an
            <br />
            office <span className="line-_thin">―</span>{" "}
          </span>
          We help create effective workplaces for you.
        </h2>
        <p className="intro-_p">
          This is dummy text. It is intended to be read but it has no meaning.
          Used as a simulation of actual copy, using ordinary words with normal
          letter frequencies, it cannot deceive the eye or brain.
        </p>

        <div className="chapter-_btns">
          <button id="hover-_hand" className="btn_1 validate">
            Continue
          </button>
        </div>
      </StyleRoot>
    </div>
  )
}

// bg-white
export const HomePage = ({ setPage, isPage }) => {
  return (
    <div>
      <StyleRoot style={styles.fadeInRight}>
        <figure className="hero_item">
          <img
            src="/assets/images/chapter_icons/chapter--3.png"
            alt=""
            className="img-fluid"
            width="200"
            height="200"
          />
        </figure>
      </StyleRoot>
      <StyleRoot style={styles.fadeInUp} className="text_section">
        <h2 className="xl">
          <span className="orange-bold">
            There’s no place like
            <br /> home <span className="line-_thin">―</span>{" "}
          </span>
          We help create effective workplacesfor you.
        </h2>
        <p className="intro-_p">
          This is dummy text. It is intended to be read but it has no meaning.
          Used as a simulation of actual copy, using ordinary words with normal
          letter frequencies, it cannot deceive the eye or brain.
        </p>

        <div className="chapter-_btns">
          <button id="hover-_hand" className="btn_1 validate">
            Continue
          </button>
        </div>
      </StyleRoot>
    </div>
  )
}

// bg-white
export const ClientSpecificPage = ({ setPage, isPage }) => {
  return (
    <div>
      <StyleRoot style={styles.fadeInRight}>
        <figure className="hero_item">
          <img
            src="/assets/images/chapter_icons/chapter--19.png"
            alt=""
            className="img-fluid"
            width="200"
            height="200"
          />
        </figure>
      </StyleRoot>
      <StyleRoot style={styles.fadeInUp} className="text_section">
        <h2 className="xl">
          <span className="green-bold">
            Something about an
            <br />
            office <span className="line-_thin">―</span>{" "}
          </span>
          We help create effective workplaces for you.
        </h2>
        <p className="intro-_p">
          This is dummy text. It is intended to be read but it has no meaning.
          Used as a simulation of actual copy, using ordinary words with normal
          letter frequencies, it cannot deceive the eye or brain.
        </p>

        <div className="chapter-_btns">
          <button id="hover-_hand" className="btn_1 validate">
            Continue
          </button>
        </div>
      </StyleRoot>
    </div>
  )
}

// bg-white
export const NearlyDonePage = ({ setPage, isPage, userInfo, code }) => {
  const finishSurvey = () => {
    axios
      .put(`/survey/finish/${code}`, userInfo)
      .then((res) => {
        setPage(isPage + 1)
      })
      .catch((err) => console.log(err))
  }
  return (
    <div>
      <StyleRoot style={styles.fadeInRight}>
        <figure className="hero_item">
          <img
            src="/assets/images/temp/img--7.png"
            alt=""
            className="img-fluid"
            width="200"
            height="200"
          />
        </figure>
      </StyleRoot>
      <StyleRoot style={styles.fadeInUp} className="text_section">
        <h2 className="xl">
          <span className="green-bold">
            Youʼre nearly done <span className="line-_thin">―</span>{" "}
          </span>
          <br></br>
          Are you happy with all your answers?
        </h2>
        <p className="intro-_p">
          You have now reached the end of the survey. If you are happy with your
          answers, please click the submit button below.
        </p>

        <div className="chapter-_btns">
          <button
            onClick={() => {
              setPage(isPage - 1)
            }}
            id="hover-_hand"
            className="btn_2 mr-3 validate"
          >
            Review answers
          </button>

          <button
            onClick={() => {
              finishSurvey()
            }}
            id="hover-_hand"
            className="btn_1 validate"
          >
            Submit survey
          </button>
        </div>
      </StyleRoot>
    </div>
  )
}

// bg-white
export const ChapterHasIconComponent = ({
  setPage,
  imgUrl,
  imgTitle,
  titleColor,
  beforeLine,
  afterLine,
  desc1,
  desc2,
  itemList,
  btnBack,
  btnNext,
}) => {
  return (
    <>
      <StyleRoot style={styles.fadeInRight}>
        <figure className="hero_item">
          <img
            src={imgUrl}
            alt={imgTitle}
            className="img-fluid"
            width="200"
            height="200"
          />
        </figure>
      </StyleRoot>
      <StyleRoot style={styles.fadeInUp} className="text_section">
        <h2 className="xl pre__line">
          <span className={`pre__line ${titleColor} `}>
            {beforeLine} <span className="line-_thin">―</span>{" "}
          </span>
          {afterLine}
        </h2>
        <p className="intro-_p">{desc1}</p>
        {itemList && (
          <p className="intro-_p items">
            <ul>
              {itemList.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </p>
        )}

        {desc2 && <p className="intro-_p">{desc2}</p>}

        <div className="chapter-_btns">
          {btnBack && (
            <button
              id="hover-_hand"
              className="btn_2 mr-3 validate"
              onClick={() => setPage(6)}
            >
              Back
            </button>
          )}

          {btnNext && (
            <button
              id="hover-_hand"
              className="btn_1 validate"
              onClick={() => setPage(6)}
            >
              Continue
            </button>
          )}
        </div>
      </StyleRoot>
    </>
  )
}

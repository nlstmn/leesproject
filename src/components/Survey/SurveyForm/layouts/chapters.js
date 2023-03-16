/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react"
import { fadeInRight, fadeInUp, fadeInLeft, fadeInDown } from "react-animations"
import Radium, { StyleRoot } from "radium"
import { isMobile } from "react-device-detect"
import ReactMarkdown from "react-markdown"
import { Link } from "react-router-dom"
import { notification } from "antd"
import validator from "validator"
import axios from "axios"
import moment from "moment"
import {
  findTextFromTranslations,
  modifyDates,
  replaceJSX,
} from "../../../../util/functions"
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
  selectedLanguageId,
}) => {
  const [errorMessage, setErrorMessage] = useState("")
  const checkUser = () => {
    axios
      .put(`/survey/login/${code}`, { email, isMobile })
      .then((res) => {
        console.log("answers from db", res.data)
        setUserInfo({
          email: email,
          respondent_id: res.data?.respondent_id,
          is_completed: res.data?.is_completed,
          location_id: res.data?.location_id,
          department_id: res.data?.department_id,
          parent_department: res.data?.parent_department,
          parent_location: res.data?.parent_location,
          floor: res.data?.floor,
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
        setTimeout(function () {
          checkUser()
        }, 2000)
      })
  }
  const [email, setEmail] = useState("")

  useEffect(() => {
    console.log(selectedLanguageId)
  }, [selectedLanguageId])

  const onSubmit = () => {
    if (data?.domains) {
      let domains = data?.domains?.map((i) => i.domain)
      if (!validator.isEmail(email)) {
        setErrorMessage(
          findTextFromTranslations(
            "Please enter a valid email address.",
            selectedLanguageId,
            data?.customisations
          )
        )
      } else if (
        domains?.includes(email.split("@")[1]) ||
        email.split("@")[1].includes("leesmanindex.com")
      ) {
        setErrorMessage("")
        checkUser()
      } else {
        setErrorMessage(
          findTextFromTranslations(
            "Please enter a valid email address.",
            selectedLanguageId,
            data?.customisations
          )
        )
      }
    }
  }

  return (
    <>
      <StyleRoot style={styles.fadeInUp} className="text_section">
        <h2 className="xl">
          <span className="default-bold">
            {
              findTextFromTranslations(
                "Let's get started \n\n enter your email to continue  ",
                selectedLanguageId,
                data?.customisations
              )?.split("\n\n")[0]
            }{" "}
            <span className="line-_thin">―</span>
          </span>
          <br />
          {
            findTextFromTranslations(
              "Let's get started \n\n enter your email to continue  ",
              selectedLanguageId,
              data?.customisations
            )?.split("\n\n")[1]
          }
        </h2>
        <div className="form-group type-email">
          <div className="fl-wrap fl-wrap-input fl-is-required">
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="form-control start-_email fl-input"
              placeholder={findTextFromTranslations(
                "Email",
                selectedLanguageId,
                data?.customisations
              )}
            />
          </div>
          <span className="input_error">{errorMessage}</span>
        </div>

        <div className="chapter-_btns">
          <button
            onClick={onSubmit}
            id="hover-_hand"
            className={`btn_1 validate ${!data?.domains && "disable_it"}`}
          >
            {findTextFromTranslations(
              "Enter",
              selectedLanguageId,
              data?.customisations
            )}
          </button>
        </div>
      </StyleRoot>
    </>
  )
}

// bg-white
export const WelcomePage = ({ setPage, data, selectedLanguageId }) => {
  const [message, setMessage] = useState("")
  useEffect(() => {
    switch (data?.general?.core_module) {
      case "office + home":
        setMessage(
          "Welcome - This survey is an opportunity to voice your opinions about working in your office and from home.\nWe’ll ask you about your experience in the office and at home so we can understand what’s working well and what isn’t in your work environments. To resume the survey, you can use the same email address, but your answers will remain anonymous and confidential. All email addresses will be automatically deleted once the survey closes.\nRead about the Leesman privacy statement here."
        )
        break
      case "office":
        setMessage(
          "Welcome - This survey is an opportunity to voice your opinions about your office.\nWe’ll ask you about your experience in the office so we can understand what’s working well and what isn’t in your work environment.\nTo resume the survey, you can use the same email address, but your answers will remain anonymous and confidential. All email addresses will be automatically deleted once the survey closes.\nRead about the Leesman privacy statement here."
        )
        break
      case "home":
        setMessage(
          "Welcome - This survey is an opportunity to voice your opinions about working from home.\nWe’ll ask you about your home working experience so we can understand what’s working well and what isn’t in your work environment.\nTo resume the survey, you can use the same email address, but your answers will remain anonymous and confidential. All email addresses will be automatically deleted once the survey closes.\nRead about the Leesman privacy statement here."
        )
        break
      default:
        break
    }
  }, [data?.general?.core_module])

  return (
    <>
      <StyleRoot style={styles.fadeInUp} className="text_section">
        <h2 className="xl">
          <span className="green-bold">
            {
              findTextFromTranslations(
                message,
                selectedLanguageId,
                data.customisations
              )?.split("-")[0]
            }{" "}
            <span className="line-_thin">―</span>{" "}
          </span>
          {
            findTextFromTranslations(
              message,
              selectedLanguageId,
              data.customisations
            )
              ?.split("-")[1]
              ?.split("\n")[0]
          }
        </h2>
        <p className="intro-_p">
          {
            findTextFromTranslations(
              message,
              selectedLanguageId,
              data.customisations
            )?.split("\n")[1]
          }{" "}
          {data?.customisations?.filter(
            (i) =>
              i.type === "intro" &&
              i.survey_id === data?.general?.id &&
              i.language_id === 12
          )[0]?.label?.length > 0 && (
            <>
              <a
                className="find-btn p__btn"
                onClick={() => setPage("details")}
                target="_blank"
                rel="noopener noreferrer"
                id="hover-_hand"
              >
                {findTextFromTranslations(
                  "Read more here",
                  selectedLanguageId,
                  data.customisations
                )}
                <span className="iconx-arrow-right-circle"></span>
              </a>
            </>
          )}
          <br />
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="cursorp"
            id="hover-_hand"
            href="https://www.leesmanindex.com/privacy-policy/"
          >
            {
              findTextFromTranslations(
                message,
                selectedLanguageId,
                data.customisations
              )?.split("\n")[2]
            }
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
            {findTextFromTranslations(
              "Enter",
              selectedLanguageId,
              data.customisations
            )}
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
export const TextPage = ({ setPage, selectedLanguageId, data }) => {
  const [label, setLabel] = useState("")
  useEffect(() => {
    setLabel(
      <ReactMarkdown>
        {modifyDates(
          data?.general?.start_date,
          data?.general?.end_date,
          findTextFromTranslations(
            "intro",
            parseInt(selectedLanguageId),
            data?.customisations
          ) === "intro"
            ? findTextFromTranslations(
                "intro",
                parseInt(12),
                data?.customisations
              )
            : findTextFromTranslations(
                "intro",
                parseInt(selectedLanguageId),
                data?.customisations
              )
        )}
      </ReactMarkdown>
    )
  }, [data, selectedLanguageId])

  return (
    <>
      <StyleRoot style={styles.fadeInUp} className="text_section intro__body">
        {label}
        <br></br>
        <div className="chapter-_btns">
          <button
            id="hover-_hand"
            className="btn_2 mr-3 validate"
            onClick={() => setPage(2)}
          >
            {findTextFromTranslations(
              "Back",
              selectedLanguageId,
              data.customisations
            )}
          </button>
          <button
            id="hover-_hand"
            className="btn_1 validate"
            onClick={() => setPage(3)}
          >
            {findTextFromTranslations(
              "Enter",
              selectedLanguageId,
              data.customisations
            )}
          </button>
        </div>
      </StyleRoot>

      {/* İMZA */}
      {/* <div className="chapter-_logo">
        <img src="/assets/images/temp/logo-company.png"></img>
      </div> */}

      {/* <div className="bottom-_copyright">
        <span>© Leesman 2022 | Produced for Ericsson</span>
        <a href="#!" target="_blank" rel="noopener noreferrer" className="cursorp" id="hover-_hand">
          Click here to view Leesman’s privacy statement.
        </a>
      </div> */}
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
export const ThanksPage = ({ setPage, isPage, data, selectedLanguageId }) => {
  const [hasTailoredClose, setHasTailoredClose] = useState(false)
  useEffect(() => {
    data?.customisations?.filter(
      (i) => i.type === "close" && i.language_id === 12
    ).length && setHasTailoredClose(true)
  }, [data?.customisations])
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
          <span className="default-bold">
            {
              findTextFromTranslations(
                "Thank you \nfor completing the survey.\n\nAll email addresses will be automatically deleted once the survey closes.",
                selectedLanguageId,
                data.customisations
              )?.split("\n")[0]
            }
          </span>
          <br />
          {
            findTextFromTranslations(
              "Thank you \nfor completing the survey.\n\nAll email addresses will be automatically deleted once the survey closes.",
              selectedLanguageId,
              data.customisations
            )?.split("\n")[1]
          }
        </h2>
        {/* no translation */}
        <p className="intro-_p">
          {hasTailoredClose ? (
            <StyleRoot
              style={styles.fadeInUp}
              className="text_section intro__body"
            >
              <ReactMarkdown>
                {modifyDates(
                  data?.general?.start_date,
                  data?.general?.end_date,
                  data?.customisations?.filter(
                    (i) =>
                      i.type === "close" && i.language_id === selectedLanguageId
                  )[0]?.label?.length
                    ? data?.customisations?.filter(
                        (i) =>
                          i.type === "close" &&
                          i.language_id === selectedLanguageId
                      )[0]?.label
                    : data?.customisations?.filter(
                        (i) => i.type === "close" && i.language_id === 12
                      )[0]?.label
                )}
              </ReactMarkdown>
            </StyleRoot>
          ) : (
            findTextFromTranslations(
              "To understand more about how Leesman helps the world’s best organisations develop better places to work, visit www.leesmanindex.com",
              selectedLanguageId,
              data.customisations
            ).replace("www.leesmanindex.com", "")
          )}
          {!hasTailoredClose && (
            <a
              href="https://www.leesmanindex.com/"
              target="_blank"
              rel="noopener noreferrer"
              id="hover-_hand"
            >
              www.leesmanindex.com
            </a>
          )}
        </p>
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
export const BackToSurveyEnterCode = ({
  setPage,
  data,
  pages,
  userInfo,
  setUserInfo,
  code,
  setAnswers,
  selectedLanguageId,
}) => {
  const [refCode, setRefCode] = useState("")
  const [inputVisible, setInputVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    switch (data?.general?.core_module) {
      case "office + home":
        setMessage(
          "Welcome - This survey is an opportunity to voice your opinions about working in your office and from home.\r\nWe’ll ask you about your experience in the office and at home so we can understand what’s working well and what isn’t in your work environments.\r\nYour answers are anonymous and confidential. \r\nRead about the Leesman privacy statement here."
        )
        break
      case "office":
        setMessage(
          "Welcome - This survey is an opportunity to voice your opinions about your office.\r\nWe’ll ask you about your experience in the office so we can understand what’s working well and what isn’t in your work environment.\r\nYour answers are anonymous and confidential. \r\nRead about the Leesman privacy statement here."
        )
        break
      case "home":
        setMessage(
          "Welcome - This survey is an opportunity to voice your opinions about working from home.\r\nWe’ll ask you about your home working experience so we can understand what’s working well and what isn’t in your work environment.\r\nYour answers are anonymous and confidential. \r\nRead about the Leesman privacy statement here."
        )
        break
      default:
        break
    }
  }, [data?.general?.core_module])

  const checkUser = (ref) => {
    if (ref?.length === 0) {
      setErrorMessage("Please enter reference code to continue")
    } else {
      axios
        .put(`/survey/login/reference/${code}`, { refCode: ref, isMobile })
        .then((res) => {
          console.log("answers from db", res.data)
          if (res.data?.error) {
            setErrorMessage("Reference code not recognised. Please try again")
          } else {
            setUserInfo({
              refCode: res.data.email,
              respondent_id: res.data.respondent_id,
              is_completed: res.data.is_completed,
              location_id: res.data.location_id,
              department_id: res.data.department_id,
              parent_department: res.data?.parent_department,
              parent_location: res.data?.parent_location,
              floor: res.data?.floor,
            })
            setAnswers(
              res?.data?.answers.map((i) => {
                return { ...i, type: i.option_id ? "option" : "question" }
              })
            )
            setPage(!res.data.is_completed ? res.data?.position || 3 : null)
          }
        })
        .catch((err) => {
          console.log(err)
          setTimeout(function () {
            checkUser()
          }, 2000)
        })
    }
  }

  return (
    <>
      {" "}
      <StyleRoot style={styles.fadeInUp} className="text_section">
        <h2 className="xl">
          <span className="green-bold">
            {
              findTextFromTranslations(
                message,
                selectedLanguageId,
                data.customisations
              )?.split("-")[0]
            }{" "}
            <span className="line-_thin">―</span>{" "}
          </span>
          {
            findTextFromTranslations(
              message,
              selectedLanguageId,
              data.customisations
            )
              ?.split("-")[1]
              ?.split("\n")[0]
          }
        </h2>
        <p className="intro-_p">
          {
            findTextFromTranslations(
              message,
              selectedLanguageId,
              data.customisations
            )?.split("\n")[1]
          }{" "}
          {data?.customisations?.filter(
            (i) =>
              i.type === "intro" &&
              i.survey_id === data?.general?.id &&
              i.language_id === 12
          )[0]?.label?.length > 0 && (
            <>
              <a
                className="find-btn p__btn"
                onClick={() => setPage("details")}
                target="_blank"
                rel="noopener noreferrer"
                id="hover-_hand"
              >
                {findTextFromTranslations(
                  "Read more here",
                  selectedLanguageId,
                  data.customisations
                )}
                <span className="iconx-arrow-right-circle"></span>
              </a>
            </>
          )}
          <br />
          <br />
          {
            findTextFromTranslations(
              message,
              selectedLanguageId,
              data.customisations
            )?.split("\n")[2]
          }{" "}
          <br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="cursorp"
            id="hover-_hand"
            href="https://www.leesmanindex.com/privacy-policy/"
          >
            {
              findTextFromTranslations(
                message,
                selectedLanguageId,
                data.customisations
              )?.split("\n")[3]
            }
          </a>
        </p>
        {inputVisible && (
          <>
            <input
              className="n_input chapter"
              type="text"
              value={refCode}
              onChange={(e) => {
                setRefCode(e.target.value)
              }}
              placeholder={findTextFromTranslations(
                "Reference Number",
                selectedLanguageId,
                data.customisations
              )}
            ></input>
            <span className="input_error">{errorMessage}</span>
          </>
        )}

        <div className="chapter-_btns">
          <button
            id="hover-_hand"
            className="btn_2 mr-3 validate"
            disabled={!data.general}
            onClick={() => {
              if (inputVisible) {
                checkUser(refCode)
              } else {
                setInputVisible(true)
              }
            }}
          >
            {findTextFromTranslations(
              "Resume survey",
              selectedLanguageId,
              data.customisations
            )}
          </button>

          <button
            id="hover-_hand"
            onClick={() => checkUser(null)}
            disabled={!data.general}
            className="btn_1 validate"
          >
            {findTextFromTranslations(
              "Start survey",
              selectedLanguageId,
              data.customisations
            )}
          </button>
        </div>
      </StyleRoot>
    </>
  )
}

// bg-orange
export const ClosedSurveyThanksPage = ({
  setPage,
  isPage,
  data,
  selectedLanguageId,
}) => {
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
            {
              findTextFromTranslations(
                "Thank you for your interest; however, this survey is now closed. We hope you have the opportunity to provide feedback about your workplace in the future.\nFor further information on this survey, please contact the survey organiser from your organisation (see the invitation email for more details). To find out more about Leesman, please go to leesmanindex.com\n ",
                selectedLanguageId,
                data.customisations
              )?.split("\n")[0]
            }
            {/* <br /> interest */}
          </span>
          {/* ― This survey is now closed. */}
        </h2>
        {/* <p className="intro-_p">We hope you have the opportunity to provide feedback about your workplace in the future.</p> */}
        <p className="intro-_p">
          {
            findTextFromTranslations(
              "Thank you for your interest; however, this survey is now closed. We hope you have the opportunity to provide feedback about your workplace in the future.\nFor further information on this survey, please contact the survey organiser from your organisation (see the invitation email for more details). To find out more about Leesman, please go to leesmanindex.com\n ",
              selectedLanguageId,
              data.customisations
            )?.split("\n")[1]
          }
        </p>

        {/* <div className="chapter-_btns">
          <button
            onClick={() => window.open("https://www.leesmanindex.com/", "_blank")}
            id="hover-_hand"
            className="btn_1 validate"
          >
            Visit our website
          </button>
        </div> */}
      </StyleRoot>
    </div>
  )
}
// bg-orange
export const SurveyNotFoundPage = ({
  setPage,
  isPage,
  data,
  selectedLanguageId,
}) => {
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
            {
              findTextFromTranslations(
                "Sorry - This link cannot be found.",
                selectedLanguageId,
                data?.customisations
              )?.split(" - ")[0]
            }{" "}
            <span className="line-_thin">―</span>
            <br />
          </span>
          {
            findTextFromTranslations(
              "Sorry - This link cannot be found.",
              selectedLanguageId,
              data?.customisations
            )?.split(" - ")[1]
          }
        </h2>
        <p className="intro-_p">
          {findTextFromTranslations(
            "For further information, please contact the survey organiser from your organisation.",
            selectedLanguageId,
            data?.customisations
          )}
        </p>
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
export const NearlyDonePage = ({
  setPage,
  isPage,
  userInfo,
  code,
  selectedLanguageId,
  data,
}) => {
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
            {
              findTextFromTranslations(
                "Youʼre nearly done – are you happy with all your answers?\nYou have now reached the end of the survey. If you are happy with your answers, please click the submit button below.",
                selectedLanguageId,
                data.customisations
              )?.split("\n")[0]
            }
          </span>
          {/* <br></br>
          Are you happy with all your answers? */}
        </h2>
        <p className="intro-_p">
          {
            findTextFromTranslations(
              "Youʼre nearly done – are you happy with all your answers?\nYou have now reached the end of the survey. If you are happy with your answers, please click the submit button below.",
              selectedLanguageId,
              data.customisations
            )?.split("\n")[1]
          }
        </p>

        <div className="chapter-_btns">
          <button
            onClick={() => {
              setPage(isPage - 1)
            }}
            id="hover-_hand"
            className="btn_2 mr-3 validate"
          >
            {findTextFromTranslations(
              "Review survey",
              selectedLanguageId,
              data.customisations
            )}
          </button>

          <button
            onClick={() => {
              finishSurvey()
            }}
            id="hover-_hand"
            className="btn_1 validate"
          >
            {findTextFromTranslations(
              "Submit survey",
              selectedLanguageId,
              data.customisations
            )}
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

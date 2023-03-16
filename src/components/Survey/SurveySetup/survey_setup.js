import React, { useState, useEffect, useLayoutEffect } from "react"
import { fadeInRight } from "react-animations"
import Radium, { StyleRoot } from "radium"
import { useHistory } from "react-router-dom"

import TopWizard from "./layouts/top_wizard"
import BtnGroup from "./layouts/btn_group"
import LanguagesDrawer from "./layouts/languages_drawer"
import ModulesDrawer from "./layouts/modules_drawer"
import Start from "./steps/start"
import Thanks from "./steps/thanks"
import AnyThingElse from "./steps/anything_else"
import UploadFile from "./steps/upload_file"
import ClosingText from "./steps/closing_text"
import Signature from "./steps/signature"
import IntroText from "./steps/intro_text"
import CommentBox from "./steps/comment_box"
import Dropdown from "./steps/dropdown"
import Modules from "./steps/modules"
import JobRole from "./steps/job_role"
import PrimaryLanguage from "./steps/primary_language"
import Languages from "./steps/languages"
import EmailOrCode from "./steps/email_code"
import LoginType from "./steps/login_type"
import Dates from "./steps/dates"
import Buildings from "./steps/buildings"
import OrganisationName from "./steps/organisation_name"
import YourName from "./steps/your_name"

const styles = {
  fadeInRight: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
  },
}

const SurveyForm = () => {
  const [finishStatus, setfinishStatus] = useState(false)
  const [clientName, setClientName] = useState("")
  const [emailCodeChange, setEmailCodeChange] = useState("")
  const [skipEmail, setSkipEmail] = useState(false)
  const [visibleLanguages, setLangages] = useState(false)
  const [visibleModules, setModules] = useState(false)
  const [checkedLanguages, setCheckedLanguages] = useState([])
  const [checkedModules, setCheckedModules] = useState([])

  const [isStart, setStart] = useState(false)
  const [isLoader, setLoader] = useState(false)
  const [isInfo, setInfo] = useState(false)
  const [isSubmitted, setSubmitted] = useState(false)
  const [isPage, setPage] = useState(1)

  useLayoutEffect(() => {
    document.body.classList.add("survey__first")
    document.body.classList.add("survey-_body")
  }, [])

  const handleLanguagesChange = (event) => {
    console.log(event.target.name)
    let arr = checkedLanguages
    if (arr.includes(event.target.name)) {
      arr = arr.filter((i) => i !== event.target.name)
    } else {
      arr.push(event.target.name)
    }
    setCheckedLanguages(arr)
  }

  const handleModulesChange = (event) => {
    console.log(event.target.name)
    let arr = checkedModules
    if (arr.includes(event.target.name)) {
      arr = arr.filter((i) => i !== event.target.name)
    } else {
      arr.push(event.target.name)
    }
    setCheckedModules(arr)
  }

  useEffect(() => {
    console.log(checkedLanguages)
  }, [checkedLanguages.length])

  const removeLanguage = (e) => {
    let arr = checkedLanguages
    arr = arr.filter((i) => i !== e)
    setCheckedLanguages(arr)
  }

  const removeModule = (e) => {
    let arr = checkedModules
    arr = arr.filter((i) => i !== e)
    setCheckedLanguages(arr)
  }

  const handleClientName = (e) => {
    setClientName(e.target.value)
    console.log(clientName)
  }

  const handleEmailCodeChange = (e) => {
    console.log(emailCodeChange)
    setEmailCodeChange(e.target.value)
    if (e.target.value === "Email") {
      setSkipEmail(true)
    } else {
      setSkipEmail(false)
    }
  }

  const history = useHistory()

  const onBackButtonEvent = (e) => {
    e.preventDefault()
    if (!finishStatus) {
      if (
        window.confirm(
          'Do you want to go back? If you do this, the setup survey page will be closed. Please use the "Prev" button for the previous page.'
        )
      ) {
        setfinishStatus(true)
        history.goBack()
      } else {
        window.history.pushState(null, null, window.location.pathname)
        setfinishStatus(false)
      }
    }
  }

  useEffect(() => {
    resetSurvey()
    window.history.pushState(null, null, window.location.pathname)
    window.addEventListener("popstate", onBackButtonEvent)
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent)
    }
  }, [])

  const pageCount = skipEmail ? 17 : 16

  const startSurvey = () => {
    setStart(true)
    setLoader(true)
    document.body.classList.remove("survey__first")
    document.body.classList.add("survey__started")
    document.getElementById("start").scroll(0, 0)
    setTimeout(() => {
      setLoader(false)
      setInfo(true)
    }, 1200)
  }

  const resetSurvey = () => {
    setStart(false)
    setLoader(false)
    setInfo(false)
    setSubmitted(false)
    setPage(1)
  }

  const scrollToSection = () => {
    document.getElementById("start").scroll(0, 0)
  }

  const next = () => {
    setPage(isPage + 1)
    scrollToSection()
  }

  const prev = () => {
    setPage(isPage - 1)
    scrollToSection()
  }

  const submit = () => {
    setStart(false)
    setSubmitted(true)
  }

  return (
    <>
      <div
        className={`survey-_setup_container container-fluid 
        ${isStart ? " started-main-sc" : " start-main-sc"}
        ${isSubmitted ? " submitted-main-sc" : " "}
          `}
        id="survey-_section"
      >
        <div className="row row-height">
          {/* INTRO - START */}
          <Start startSurvey={startSurvey} />

          {/* FINAL - SUBMITTED */}
          <Thanks />

          <div className="content-right" id="start">
            <div id="wizard_container">
              {/* PROGRESS BAR - PAGE TITLE */}
              <TopWizard
                isPage={isPage}
                pageCount={pageCount}
                skipEmail={skipEmail}
              />

              <div className="page_survey create_survey-middle">
                {/* SELECT LANGUAGE - SELECT MODULE */}
                <LanguagesDrawer
                  visibleLanguages={visibleLanguages}
                  setLangages={setLangages}
                  handleLanguagesChange={handleLanguagesChange}
                  checkedLanguages={checkedLanguages}
                  setCheckedLanguages={setCheckedLanguages}
                />

                <ModulesDrawer
                  visibleModules={visibleModules}
                  setModules={setModules}
                  handleModulesChange={handleModulesChange}
                  checkedModules={checkedModules}
                  setCheckedModules={setCheckedModules}
                />
                {/* SELECT LANGUAGE - SELECT MODULE */}

                {/* STEPS */}
                {/* STEPS */}
                {/* STEPS */}

                {/* YOUR NAME */}
                {isPage === 1 && (
                  <>
                    <YourName
                      clientName={clientName}
                      handleClientName={handleClientName}
                    />
                  </>
                )}

                {/* ORGANISATION NAME */}
                {isPage === 2 && (
                  <>
                    <OrganisationName clientName={clientName} />
                  </>
                )}

                {/* BUILDING NUMBER */}
                {isPage === 3 && (
                  <>
                    <Buildings />
                  </>
                )}

                {/* START - END DATE */}
                {isPage === 4 && (
                  <>
                    <Dates />
                  </>
                )}

                {/* LOGIN TYPE - EMAIL OR CODE */}
                {isPage === 5 && (
                  <>
                    <LoginType handleEmailCodeChange={handleEmailCodeChange} />
                  </>
                )}

                {/* ENTER EMAIL OR CODE */}
                {/* Email ya da Access seçili ise bu sayfa gelsin değilse geç */}
                {skipEmail && isPage === 6 && (
                  <>
                    <EmailOrCode />
                  </>
                )}

                {/* SELECT LANGUAGES */}
                {(skipEmail && isPage === 7) || (!skipEmail && isPage === 6) ? (
                  <>
                    <Languages
                      skipEmail={skipEmail}
                      checkedLanguages={checkedLanguages}
                      setLangages={setLangages}
                      removeLanguage={removeLanguage}
                    />
                  </>
                ) : (
                  <></>
                )}

                {/* PRIMARY LANGUAGE */}
                {(skipEmail && isPage === 8) || (!skipEmail && isPage === 7) ? (
                  <>
                    <PrimaryLanguage
                      skipEmail={skipEmail}
                      checkedLanguages={checkedLanguages}
                    />
                  </>
                ) : (
                  <></>
                )}

                {/* JOB ROLE */}
                {(skipEmail && isPage === 9) || (!skipEmail && isPage === 8) ? (
                  <>
                    <JobRole skipEmail={skipEmail} />
                  </>
                ) : (
                  <></>
                )}

                {/* SELECT MODULES */}
                {(skipEmail && isPage === 10) ||
                (!skipEmail && isPage === 9) ? (
                  <>
                    <Modules
                      skipEmail={skipEmail}
                      setModules={setModules}
                      removeModule={removeModule}
                      checkedModules={checkedModules}
                    />
                  </>
                ) : (
                  <></>
                )}

                {/* DROPDOWN QUESTION? */}
                {(skipEmail && isPage === 11) ||
                (!skipEmail && isPage === 10) ? (
                  <>
                    <Dropdown skipEmail={skipEmail} />
                  </>
                ) : (
                  <></>
                )}

                {/* COMMENT BOX QUESTION */}
                {(skipEmail && isPage === 12) ||
                (!skipEmail && isPage === 11) ? (
                  <>
                    <CommentBox skipEmail={skipEmail} />
                  </>
                ) : (
                  <></>
                )}

                {/* INTRO TEXT */}
                {(skipEmail && isPage === 13) ||
                (!skipEmail && isPage === 12) ? (
                  <>
                    <IntroText skipEmail={skipEmail} />
                  </>
                ) : (
                  <></>
                )}

                {/* SIGNATURE */}
                {(skipEmail && isPage === 14) ||
                (!skipEmail && isPage === 13) ? (
                  <>
                    <Signature skipEmail={skipEmail} />
                  </>
                ) : (
                  <></>
                )}

                {/* CLOSING TEXT */}
                {(skipEmail && isPage === 15) ||
                (!skipEmail && isPage === 14) ? (
                  <>
                    <ClosingText skipEmail={skipEmail} />
                  </>
                ) : (
                  <></>
                )}

                {/* UPLOAD FILE */}
                {(skipEmail && isPage === 16) ||
                (!skipEmail && isPage === 15) ? (
                  <>
                    <UploadFile skipEmail={skipEmail} />
                  </>
                ) : (
                  <></>
                )}

                {/* ANYTHING ELSE */}
                {(skipEmail && isPage === 17) ||
                (!skipEmail && isPage === 16) ? (
                  <AnyThingElse skipEmail={skipEmail} />
                ) : (
                  <></>
                )}

                {/* STEPS */}
                {/* STEPS */}
                {/* STEPS */}

                {/* BTN GROUPS */}
                {/* BACK - NEXT */}
                <BtnGroup
                  isPage={isPage}
                  setPage={setPage}
                  prev={prev}
                  next={next}
                  submit={submit}
                  pageCount={pageCount}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SurveyForm

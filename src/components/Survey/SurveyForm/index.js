import React, { useState, useEffect, useLayoutEffect, useContext } from "react"
import { fadeInRight, fadeInUp, fadeInLeft, fadeInDown } from "react-animations"
import Radium, { StyleRoot } from "radium"
import { connect } from "react-redux"
import { Link, useHistory, useLocation } from "react-router-dom"
import * as settingsActions from "../../../actions/settingsAction"
import { useMediaQuery } from "react-responsive"
import { Helmet } from "react-helmet"
import TopBreadcrumb from "./layouts/top_breadcrumb"
import BtnGroup from "./layouts/btn_group"
import PageModal from "./layouts/page_modal"
import PageCodeModal from "./layouts/page_code_modal"
import LeftSidebar from "./layouts/left_sidebar"
import { Storage } from "@aws-amplify/storage"
import Amplify from "@aws-amplify/core"
import axios from "axios"
import { amplifyConfig } from "../../../context/auth"
import {
  LoginPage,
  WelcomePage,
  AboutPage,
  ThanksPage,
  WelcomePageLogo,
  TextPage,
  NearlyDonePage,
  ClosedSurveyThanksPage,
  ChapterHasIconComponent,
  SurveyNotFoundPage,
  BackToSurveyEnterCode,
} from "./layouts/chapters"

// Question Components
import DropdownSelect from "./questions/dropdown_select"
import DropdownSelectDepartment from "./questions/dropdown_select_department"
import ImageSelect from "./questions/image_select"
import SortableSelect from "./questions/sortable_select"
import SliderPercentage from "./questions/slider_percentage"
import SliderPercentageTotal from "./questions/slider_percentage_total"
import SliderBinary from "./questions/slider_binary"
import SliderBinaryStatic from "./questions/slider_binary_static"
import CheckboxSelect from "./questions/checkbox_select"
import CheckboxSelectSpecify from "./questions/checkbox_select_specify"
import RadioSelect from "./questions/radio_select"
import RadioSelectSpecify from "./questions/radio_select_specify"
import TableRadioSelect from "./questions/table_radio_select"
import TableRadioSelectOpenable from "./questions/table_radio_select_openable"
import TableCheckboxSelectOpenable from "./questions/table_checkbox_select_openable"
import TableCheckboxRadioSelect from "./questions/table_checkbox_radio_select"
import RadioSelectLocation from "./questions/radio_select_location"

import Opentext from "./questions/open_text"
import {
  findLocationFromTranslations,
  findPageFromTranslations,
  findQuestionFromTranslations,
  findTranslationFromData,
} from "../../../util/functions"
import ResetModal from "./layouts/reset_modal"
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

const SurveyForm = ({
  isStart,
  setStart,
  isLoader,
  setLoader,
  isInfo,
  setInfo,
  isSubmitted,
  setSubmitted,
  isPage,
  setPage,
  surveyAnswers,
  setSurveyAnswers,
}) => {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const code = params.get("code")
  const [isModal, setModal] = useState(false)
  const [isResetModal, setResetModal] = useState(false)
  const [isLater, saveLater] = useState(false)
  const [isReferance, setIsReferance] = useState(
    params.get("referance") === "4"
  )
  useEffect(() => {
    isReferance && setPage(2)
  }, [isReferance])

  const [finishStatus, setfinishStatus] = useState(false)
  const location = useLocation()
  const history = useHistory()
  const pageCount = 5
  const [valuesTotal, setTotalValues] = useState([0])
  const [surveyClosed, setSurveyClosed] = useState(false)

  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" })
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" })
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" })
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" })
  const isMobileDevice = useMediaQuery({ query: "(max-width: 768px)" })
  const [currentPage, SetCurrentPage] = useState([])
  const [initData, setInitData] = useState([])
  const [pivotData, setPivotData] = useState(0)
  const [pages, setPages] = useState([])
  const [initPages, setInitPages] = useState([])
  const [dependencies, setDependencies] = useState([])
  const [answers, setAnswers] = useState(surveyAnswers || [])
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true)
  const [backButtonDisabled, setBackButtonDisabled] = useState(false)
  const [issliderRadio, setsliderRadio] = useState("now")
  const [selectedLocationName, setSelectedLocationName] = useState()
  const [flatedPageData, setFlatData] = useState([])
  const [hideButtonGroups, setHideButtonGroups] = useState(false)
  const [userInfo, setUserInfo] = useState([])
  const [notFound, setNotFound] = useState(false)
  const [hideBackButton, setHideBackButton] = useState(false)
  const [hideNextButton, setHideNextButton] = useState(false)
  const [locationGroupLevel, setLocationGroupLevel] = useState(0)
  const [checkedMenu, setCheckedMenu] = useState(false)
  const [selectedLanguageId, setSelectedLanguageId] = useState(12)
  const [selectedLanguageText, setSelectedLanguageText] =
    useState("English (UK)")
  const [isRTL, setRTL] = useState(false)

  // Dummy test values

  // Chapter Icons
  const ImgAbout1 = "/assets/images/chapter_icons/chapter--1.png"
  const ImgOffice1 = "/assets/images/chapter_icons/chapter--2.png"
  const ImgHome1 = "/assets/images/chapter_icons/chapter--3.png"
  const ImgEducation1 = "/assets/images/chapter_icons/chapter--4.png"
  const ImgLab1 = "/assets/images/chapter_icons/chapter--5.png"
  const ImgRetail1 = "/assets/images/chapter_icons/chapter--6.png"
  const ImgIT1 = "/assets/images/chapter_icons/chapter--7.png"
  const ImgMobilitySupport1 = "/assets/images/chapter_icons/chapter--8.png"
  const ImgWellbeing1 = "/assets/images/chapter_icons/chapter--9.png"
  const ImgAlignment1 = "/assets/images/chapter_icons/chapter--10.png"
  const ImgAlignment2 = "/assets/images/chapter_icons/chapter--11.png"
  const ImgJourneyToWork1 = "/assets/images/chapter_icons/chapter--12.png"
  const ImgReturnToOffice1 = "/assets/images/chapter_icons/chapter--13.png"
  const ImgDaysInWorkplace1 = "/assets/images/chapter_icons/chapter--14.png"
  const ImgThirdSpace1 = "/assets/images/chapter_icons/chapter--15.png"
  const ImgAdjacency1 = "/assets/images/chapter_icons/chapter--16.png"
  const ImgCorporateCampus1 = "/assets/images/chapter_icons/chapter--17.png"
  const ImgHybridWorking1 = "/assets/images/chapter_icons/chapter--18.png"
  const ImgClient1 = "/assets/images/chapter_icons/chapter--19.png"
  const ImgThankYou1 = "/assets/images/chapter_icons/chapter--20.png"
  // Chapter Icons
  Amplify.configure(amplifyConfig)
  useEffect(() => {
    document.body.classList.add("survey__first")
  }, [])

  const next = () => {
    setPage(isPage + 1)
    document.getElementById("survey-_scroll").scroll(0, 0, "smooth")
    document.getElementById("middle-wizard") &&
      document.getElementById("middle-wizard").scroll(0, 0, "smooth")
    document.getElementById("scroll__that") &&
      document.getElementById("scroll__that").scroll(0, 0, "smooth")
  }

  const prev = () => {
    setPage(isPage - 1)
    document.getElementById("survey-_scroll").scroll(0, 0, "smooth")
    document.getElementById("middle-wizard") &&
      document.getElementById("middle-wizard").scroll(0, 0, "smooth")
    document.getElementById("scroll__that") &&
      document.getElementById("scroll__that").scroll(0, 0, "smooth")
  }

  const submit = () => {
    setStart(false)
    setSubmitted(true)
    document.getElementById("survey-_scroll").scroll(0, 0)
  }

  const getSurveyData = (code) => {
    axios
      .get(`/survey/${code}`)
      .then((res) => {
        if (res?.data?.general?.status === "closed") {
          setInitData(res.data)
          setSurveyClosed(true)
          setPage(0)
        } else {
          if (res?.data?.status === "not found") {
            setPage(0)
            setNotFound(true)
            setInitData((pre) => {
              return {
                ...pre,
                customisations: res?.data?.translations,
                languages: res?.data?.languages,
              }
            })
          } else {
            console.log("init data", res.data)
            setSelectedLanguageId(res.data?.general?.language_id)
            setSelectedLanguageText(
              res.data?.languages?.filter(
                (i) => i.language_id === res.data?.general?.language_id
              )[0]?.text
            )
            setInitData(res.data)
            if (res?.data?.general?.login_type === "referance") {
              setIsReferance(true)
            } else {
              setPage(1)
              setIsReferance(false)
            }

            generateFlatedPageData(res.data.pagesAndQuestions)
          }
        }
      })
      .catch((err) => {
        console.log(err)
        setTimeout(function () {
          //getSurveyData(code);
        }, 5000)
      })
  }

  const generateFlatedPageData = (data) => {
    let flatedPageData = []
    data.forEach((p) => {
      p.questions.forEach((q) => {
        if (q.options.length > 0) {
          q.options.forEach((o) => {
            flatedPageData.push({
              survey_module_id: p.survey_module_id,
              page_group_id: p.page_group_id,
              page_id: p.id,
              page_name: p.name,
              question_id: q.id,
              question_label: q.label,
              option_id: o.option_id,
              option_label: o.option_label,
            })
          })
        } else {
          flatedPageData.push({
            survey_module_id: p.survey_module_id,
            page_group_id: p.page_group_id,
            page_id: p.id,
            page_name: p.name,
            question_id: q.id,
            question_label: q.label,
            option_id: null,
            option_label: null,
          })
        }
      })
    })
    setFlatData(flatedPageData)
  }

  useEffect(() => {
    getSurveyData(code)
  }, [])
  useLayoutEffect(() => {
    resetSurveyState()
  }, [])

  useEffect(() => {
    initData?.pagesAndQuestions?.length > 0 && populatePages()
  }, [initData])

  useEffect(() => {
    SetCurrentPage(pages?.filter((i) => i.position === isPage))
    const params = new URLSearchParams()
    params.delete("page_name")
    params.append(
      "page_name",
      pages?.filter((i) => i.position === isPage)[0]?.name
    )

    setSurveyAnswers(answers)
  }, [isPage, pages])

  useEffect(() => {
    setNextButtonDisabled(pivotData === 0 || pivotData !== 100)
    let p = pivotData
    setPivotData(p)
  }, [pivotData])

  useEffect(() => {
    let p = pivotData
    setPivotData(p)
  }, [pivotData])

  const textModifier = (oldText) => {
    let newText = oldText
      ? oldText.replace(
          "(Organisation name)",
          `(${initData?.general?.organisation_name})`
        )
      : ""
    newText = newText.replace(
      "[Location name]",
      `${selectedLocationName ? "(" + selectedLocationName + ")" : ""}`
    )
    newText = newText.replace(
      "(Organisation X)",
      `${
        initData?.general?.organisation_name
          ? "(" + initData?.general?.organisation_name + ")"
          : ""
      }`
    )
    newText = newText.replace(
      "(Workplace X / Other workplace)",
      `${selectedLocationName ? "(" + selectedLocationName + ")" : ""}`
    )
    newText = newText.replace(
      "(Workplace X/Other workplace)",
      `${selectedLocationName ? "(" + selectedLocationName + ")" : ""}`
    )
    newText = newText.replace(
      "(Workplace X / Other Workplace)",
      `${selectedLocationName ? "(" + selectedLocationName + ")" : ""}`
    )
    newText = newText.replace(
      "（Workplace X / Other Workplace）",
      `${selectedLocationName ? "(" + selectedLocationName + ")" : ""}`
    )
    newText = newText.replace(
      "（(Workplace X/ Other workplace)",
      `${selectedLocationName ? "(" + selectedLocationName + ")" : ""}`
    )
    newText = newText.replace(
      "(Workplace X/ Other workplace)",
      `${selectedLocationName ? "(" + selectedLocationName + ")" : ""}`
    )

    newText = newText.replace(
      "（Workplace X/Other workplace）",
      `${selectedLocationName ? "(" + selectedLocationName + ")" : ""}`
    )

    newText = newText.replace(
      "（Workplace X / Other workplace）",
      `${selectedLocationName ? "(" + selectedLocationName + ")" : ""}`
    )

    newText = newText.replace(
      "（Workplace X/ Other workplace）",
      `${selectedLocationName ? "(" + selectedLocationName + ")" : ""}`
    )
    newText = newText.replace(
      "([BuildingX])",
      `${selectedLocationName ? "(" + selectedLocationName + ")" : ""}`
    )
    newText = newText.replace(
      "(Location name)",
      `${selectedLocationName ? "(" + selectedLocationName + ")" : ""}`
    )
    newText = newText.replace(
      "(Organization name)",
      `${
        initData?.general?.organisation_name
          ? "(" + initData?.general?.organisation_name + ")"
          : ""
      }`
    )
    newText = newText.replace(
      "(nom de l’organisation)",
      `${
        initData?.general?.organisation_name
          ? "(" + initData?.general?.organisation_name + ")"
          : ""
      }`
    )
    newText = newText.replace(
      "(Organisation Name)",
      `${
        initData?.general?.organisation_name
          ? "(" + initData?.general?.organisation_name + ")"
          : ""
      }`
    )
    newText = newText.replace(
      "（Organisation name）",
      `${
        initData?.general?.organisation_name
          ? "(" + initData?.general?.organisation_name + ")"
          : ""
      }`
    )
    newText = newText.replace(
      "（Organisation Name）",
      `${
        initData?.general?.organisation_name
          ? "(" + initData?.general?.organisation_name + ")"
          : ""
      }`
    )
    newText = newText.replace("&nbsp;", ` `)
    newText = newText.replace("&amp;", `&`)
    return newText
  }

  const renderQuestionByQuestionType = (page) => {
    let options = []
    let label = ""
    let type = page?.type
    let data = page

    switch (type) {
      case "dropdown":
        return page.questions
          .sort((a, b) => a.position - b.position)
          .map((data) => {
            let filterOptions = []
            if (
              [
                "DEMOGRAPHICS",
                "CAMPDEMOGRAPHICS",
                "RETAILDEMOGRAPHICS",
              ].includes(page.name)
            ) {
              if (data.label === "Department") {
                filterOptions = initData.departments.sort(
                  (a, b) => a.position - b.position
                )
              } else {
                filterOptions = data.options
                  .sort((a, b) => a.position - b.position)
                  .filter((o) => initData?.demographics?.includes(o.option_id))
                  .map((i) => i.option_label)
              }
            } else {
              filterOptions = data.options
                .sort((a, b) => a.position - b.position)
                .map((i) => i.option_label)
            }

            if (filterOptions.length && data.label !== "Department") {
              return (
                <DropdownSelect
                  item={{
                    id: data?.id,
                    label: data?.label,
                    options: filterOptions,
                  }}
                  i={data?.label}
                  arr={data?.options?.map((i) => i.option_label)}
                  data={data}
                  handleAnswer={handleAnswer}
                  answers={answers}
                  currentPage={currentPage}
                  initData={initData}
                  selectedLanguageId={selectedLanguageId}
                />
              )
            } else if (filterOptions.length && data.label === "Department") {
              return (
                <DropdownSelectDepartment
                  item={{
                    id: data?.question_id,
                    label: data?.label,
                    options: filterOptions,
                  }}
                  departments={filterOptions}
                  i={data?.label}
                  arr={data?.options?.map((i) => i.option_label)}
                  data={data}
                  handleAnswer={handleAnswer}
                  answers={answers}
                  currentPage={currentPage}
                  initData={initData}
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                  selectedLanguageId={selectedLanguageId}
                />
              )
            }
          })

      case "continuous":
        if (page.questions.length === 1) {
          label = page.questions[0].label
          options = page.questions[0].options
            .sort((a, b) => a.position - b.position)
            .map((i) => {
              return {
                question_id: page.questions[0].id,
                id: i.option_id,
                type: "option",
                label: i.option_label,
              }
            })
        } else if (page.questions.length > 1) {
          options = page.questions
            .sort((a, b) => a.position - b.position)
            .map((i) => {
              return {
                id: i.id,
                type: "question",
                label: i.label,
              }
            })
        }
        return (
          <div id="middle-wizard">
            <div className="question_div" id="scroll__that">
              {/* Question Title */}
              <h3 className="main_question">
                {textModifier(
                  currentPage[0]?.heading
                    ? findTranslationFromData(
                        currentPage[0]?.id,
                        currentPage[0].heading,
                        selectedLanguageId,
                        initData
                      )
                    : findTranslationFromData(
                        currentPage[0]?.questions[0]?.id,
                        currentPage[0]?.questions[0]?.label,
                        selectedLanguageId,
                        initData
                      )
                )}
              </h3>
              {options
                .sort((a, b) => a.position - b.position)
                .map((item, i, arr) => {
                  return data.name === "AVERAGETIME" ? (
                    <SliderPercentageTotal
                      item={{
                        id: item?.question_id,
                        label: item?.label,
                        ...item,
                      }}
                      i={i}
                      arr={arr}
                      pivotData={pivotData}
                      setPivotData={setPivotData}
                      handleAnswer={handleAnswer}
                      answers={answers}
                      setAnswers={setAnswers}
                      currentPage={currentPage}
                      options={options}
                      setNextButtonDisabled={setNextButtonDisabled}
                      initData={initData}
                      selectedLanguageId={selectedLanguageId}
                      textModifier={textModifier}
                      isRTL={isRTL}
                    />
                  ) : (
                    <SliderPercentage
                      item={{
                        id: item?.question_id,
                        label: item?.label,
                        ...item,
                      }}
                      i={i}
                      arr={arr}
                      pivotData={pivotData}
                      setPivotData={setPivotData}
                      handleAnswer={handleAnswer}
                      answers={answers}
                      setAnswers={setAnswers}
                      currentPage={currentPage}
                      options={options}
                      setNextButtonDisabled={setNextButtonDisabled}
                      initData={initData}
                      selectedLanguageId={selectedLanguageId}
                      textModifier={textModifier}
                      isRTL={isRTL}
                    />
                  )
                })}
            </div>
          </div>
        )
      case "radio":
        return (
          <div
            id="middle-wizard"
            className={`${
              data?.questions?.length > 1 && " multi_radio_container"
            } `}
          >
            {/* Boş geliyor? */}
            {data?.questions?.length > 1 && (
              <h3 className="main_question outside">
                {/* findPageFromTranslations(
                    currentPage[0]?.id,
                    currentPage[0].heading,
                    selectedLanguageId,
                    initData?.questionTranslations
                  ) */}
                {currentPage[0]?.name === "LOCATION"
                  ? findTranslationFromData(
                      currentPage[0]?.questions[0]?.id,
                      currentPage[0]?.questions[0]?.label,
                      selectedLanguageId,
                      initData
                    ) + "1"
                  : textModifier(
                      findTranslationFromData(
                        currentPage[0]?.id,
                        currentPage[0].heading,
                        selectedLanguageId,
                        initData
                      )
                    )}
              </h3>
            )}
            {data.questions
              .sort((a, b) => a.position - b.position)
              .map((q) => {
                if (data.name === "LOCATION") {
                  return (
                    <RadioSelectLocation
                      data={{
                        ...q,
                        options: initData?.locations?.map((i) => {
                          return { option_id: i.id, option_label: i.label }
                        }),
                      }}
                      handleAnswer={handleAnswer}
                      answers={answers}
                      setAnswers={setAnswers}
                      currentPage={currentPage}
                      initData={initData}
                      hideButtonGroups={hideButtonGroups}
                      setHideButtonGroups={setHideButtonGroups}
                      isPage={isPage}
                      setPage={setPage}
                      userInfo={userInfo}
                      setUserInfo={setUserInfo}
                      locationGroupLevel={locationGroupLevel}
                      setLocationGroupLevel={setLocationGroupLevel}
                      selectedLanguageId={selectedLanguageId}
                      textModifier={textModifier}
                    />
                  )
                } else if (data.name === "THIRDSPACESATISFACTION") {
                  return (
                    <RadioSelect
                      data={{
                        ...q,
                        options: initData?.locations?.map((i) => {
                          return { option_id: i.id, option_label: i.label }
                        }),
                      }}
                      handleAnswer={handleAnswer}
                      answers={answers}
                      currentPage={currentPage}
                      textModifier={textModifier}
                    />
                  )
                } else {
                  return (
                    <>
                      <RadioSelect
                        data={q}
                        textModifier={textModifier}
                        handleAnswer={handleAnswer}
                        answers={answers}
                        currentPage={currentPage}
                        initData={initData}
                        selectedLanguageId={selectedLanguageId}
                      />
                    </>
                  )
                }
              })}
          </div>
        )
      case "radio_slider":
        return (
          <div id="middle-wizard">
            {data.questions
              .sort((a, b) => a.position - b.position)
              .map((q) => {
                return (
                  <RadioSelect
                    initData={initData}
                    selectedLanguageId={selectedLanguageId}
                    data={q}
                    handleAnswer={handleAnswer}
                    answers={answers}
                    currentPage={currentPage}
                    textModifier={textModifier}
                  />
                )
              })}
          </div>
        )
      case "tick":
        if (page.questions.length === 1) {
          label = page.questions[0].label
          options = page.questions[0].options
            .sort((a, b) => a.position - b.position)
            .map((i) => {
              return {
                id: i.option_id,
                type: "option",
                label: i.option_label,
                position: i.position,
                help_text: i.help_text,
              }
            })
        } else if (page.questions.length > 1) {
          options = page.questions
            .sort((a, b) => a.position - b.position)
            .map((i) => {
              return {
                id: i.id,
                type: "question",
                label: i.label,
                position: i.position,
                question_group_id: i.question_group_id,
                help_text: i.help_text,
                question_group_name: i.question_group_name,
              }
            })
        }

        return (
          <div id="middle-wizard">
            <CheckboxSelect
              arr={options}
              handleAnswer={handleAnswer}
              answers={answers}
              setAnswers={setAnswers}
              currentPage={currentPage}
              hideButtonGroups={hideButtonGroups}
              setHideButtonGroups={setHideButtonGroups}
              isPage={isPage}
              setPage={setPage}
              selectedLanguageId={selectedLanguageId}
              initData={initData}
              textModifier={textModifier}
            />
          </div>
        )
      case "tick_m":
        if (page.questions.length === 1) {
          label = page.questions[0].label
          options = page.questions[0].options
            .sort((a, b) => a.position - b.position)
            .map((i) => {
              return {
                id: i.option_id,
                type: "option",
                label: i.option_label,
                position: i.position,
                optional: i.optional,
                help_text: i.help_text,
              }
            })
        } else if (page.questions.length > 1) {
          options = page.questions
            .sort((a, b) => a.position - b.position)
            .map((i) => {
              return {
                id: i.id,
                type: "question",
                label: i.label,
                help_text: i.help_text,
                position: i.position,
              }
            })
        }
        return (
          <div id="middle-wizard">
            <CheckboxSelect
              arr={options}
              handleAnswer={handleAnswer}
              answers={answers}
              setAnswers={setAnswers}
              currentPage={currentPage}
              hideButtonGroups={hideButtonGroups}
              setHideButtonGroups={setHideButtonGroups}
              isPage={isPage}
              setPage={setPage}
              initData={initData}
              textModifier={textModifier}
              selectedLanguageId={selectedLanguageId}
            />
          </div>
        )
      case "scale":
        return (
          <div id="middle-wizard">
            <TableRadioSelect
              data={{
                ...data,
                options: data?.questions
                  ?.sort((a, b) => a.position - b.position)
                  .map((q) => {
                    return {
                      option_id: q.id,
                      option_label: q.label,
                      neutral: q?.neutral,
                      lower_limit: q?.lower_limit,
                      upper_limit: q?.upper_limit,
                      help_text: q?.help_text,
                    }
                  }),
              }}
              handleAnswer={handleAnswer}
              answers={answers}
              currentPage={currentPage}
              initData={initData}
              selectedLanguageId={selectedLanguageId}
              textModifier={textModifier}
            />
          </div>
        )
      case "mode":
        return (
          <div id="middle-wizard">
            <TableCheckboxRadioSelect
              data={data}
              handleAnswer={handleAnswer}
              answers={answers}
              setAnswers={setAnswers}
              currentPage={currentPage}
              initData={initData}
              selectedLanguageId={selectedLanguageId}
              textModifier={textModifier}
            />
          </div>
        )
      case "opt_scale":
        return (
          <div id="middle-wizard">
            <TableRadioSelectOpenable
              data={data}
              handleAnswer={handleAnswer}
              answers={answers}
              currentPage={currentPage}
              setAnswers={setAnswers}
              initData={initData}
              selectedLanguageId={selectedLanguageId}
            />
          </div>
        )
      case "checkbox_scale":
        return (
          <div id="middle-wizard">
            <TableCheckboxSelectOpenable
              data={data}
              handleAnswer={handleAnswer}
              answers={answers}
              currentPage={currentPage}
              setAnswers={setAnswers}
              initData={initData}
              selectedLanguageId={selectedLanguageId}
              selectAll={[
                "THIRDSPACEREASON",
                "ITDISSATISFIED (ITDIS)",
              ].includes(currentPage[0].name)}
            />
          </div>
        )
      case "open":
        return (
          <div id="middle-wizard">
            <Opentext
              data={data}
              handleAnswer={handleAnswer}
              answers={answers}
              currentPage={currentPage}
              initData={initData}
              selectedLanguageId={selectedLanguageId}
            />
          </div>
        )
      default:
        break
    }
  }

  useEffect(() => {
    initPages.length > 0 && dependencies?.length && applyDependencies()
  }, [dependencies, answers, initPages, pivotData, isPage, selectedLanguageId])
  useEffect(() => {
    selectedLocationName !==
      findLocationFromTranslations(
        initData?.locations?.filter((l) => l.id === userInfo?.location_id)[0]
          ?.id,
        initData?.locations?.filter((l) => l.id === userInfo?.location_id)[0]
          ?.label,
        selectedLanguageId,
        initData?.locationTranslations
      ) &&
      setSelectedLocationName(
        findLocationFromTranslations(
          initData?.locations?.filter((l) => l.id === userInfo?.location_id)[0]
            ?.id,
          initData?.locations?.filter((l) => l.id === userInfo?.location_id)[0]
            ?.label,
          selectedLanguageId,
          initData?.locationTranslations
        ) || ""
      )
  }, [answers, userInfo, selectedLanguageId])
  useEffect(() => {
    console.log(
      "selectedLocationName",
      selectedLocationName,
      initData?.locations?.filter((l) => l.id === userInfo?.location_id)[0],
      findLocationFromTranslations(
        initData?.locations?.filter((l) => l.id === userInfo?.location_id)[0]
          ?.id,
        initData?.locations?.filter((l) => l.id === userInfo?.location_id)[0]
          ?.label,
        selectedLanguageId,
        initData?.locationTranslations
      )
    )
  }, [selectedLocationName])
  useEffect(() => {
    currentPage[0]?.questions && checkNavigationButtonsAvailability()
    //setNextButtonDisabled(false);
  }, [currentPage[0], answers, pivotData, locationGroupLevel])

  useEffect(() => {
    if (
      pages.filter((i) => i.name === "AVERAGETIME")[0]?.position ===
      isPage - 1
    ) {
      setBackButtonDisabled(true)
    } else {
      setBackButtonDisabled(false)
    }
  }, [currentPage, isPage])

  const checkNavigationButtonsAvailability = () => {
    //dropdown requires all questions
    //continous requires one
    setNextButtonDisabled(true)
    const checkOpenables = () => {
      let arr = []
      let questionIds = answers.filter(
        (i) => i.page_id === currentPage[0].id && !i.option_id
      )
      console.log(questionIds)
      questionIds.forEach((i) => {
        if (
          answers.filter(
            (o) =>
              o.page_id === currentPage[0].id &&
              o.question_id === i.question_id &&
              o.option_id
          ).length === 0
        ) {
          arr.push(false)
        }
      })
      console.log(arr)
      return (
        arr.length === 0 &&
        answers.filter((i) => i.page_id === currentPage[0].id && !i.option_id)
          .length > 0
      )
    }

    switch (currentPage[0]?.type) {
      case "dropdown":
        if (
          currentPage[0].name === "DEMOGRAPHICS" &&
          currentPage[0]?.questions
            ?.map((q) => {
              return {
                ...q,
                options: q.options.filter((e) =>
                  initData?.demographics?.includes(e.option_id)
                ),
              }
            })
            ?.filter((i) => i?.options.length > 0)
            ?.map((i) => i.id)
            ?.isSubset(answers.map((i) => i.question_id)) &&
          answers.filter(
            (i) =>
              i.question_id ===
              flatedPageData.filter((o) => o.question_label === "Department")[0]
                ?.question_id
          )?.length > 0
        ) {
          setNextButtonDisabled(false)
        } else {
          if (
            currentPage[0]?.questions
              ?.map((i) => i.id)
              ?.isSubset(
                answers
                  .filter((i) => i.page_id === currentPage[0].id)
                  .map((i) => i.question_id)
              )
          ) {
            setNextButtonDisabled(false)
          }
        }
        break
      case "continuous":
        if (currentPage[0].name !== "AVERAGETIME") {
          if (
            answers
              .filter((i) => i.page_id === currentPage[0].id && i.value !== 0)
              .map((i) => i.page_id)
              .includes(currentPage[0]?.id)
          ) {
            setNextButtonDisabled(false)
          }
          break
        } else {
          setNextButtonDisabled(pivotData === 0 || pivotData !== 100)
          break
        }

      case "radio":
        if (currentPage[0]?.name === "LOCATION") {
          switch (locationGroupLevel) {
            case 0:
              userInfo?.parent_location && setNextButtonDisabled(false)
              break
            case 1:
              userInfo?.location_id && setNextButtonDisabled(false)
              break
            case 2:
              userInfo?.floor && setNextButtonDisabled(false)
              break
          }
        } else if (
          currentPage[0]?.questions
            ?.map((i) => i.id)
            ?.isSubset(
              answers
                .filter((i) => i.page_id === currentPage[0].id)
                .map((i) => i.question_id)
            )
        ) {
          setNextButtonDisabled(false)
        }
        break
      case "tick":
        setNextButtonDisabled(false)
        break
      case "tick_m":
        if (
          currentPage[0]?.questions
            ?.map((i) => i.id)
            ?.isSubset(
              answers
                .filter((i) => i.page_id === currentPage[0].id)
                .map((i) => i.question_id)
            )
        ) {
          setNextButtonDisabled(false)
        }
        break
      case "scale":
        if (
          currentPage[0]?.questions
            ?.map((i) => i.id)
            ?.isSubset(
              answers
                .filter((i) => i.page_id === currentPage[0]?.id)
                .map((i) => i.question_id)
            )
        ) {
          setNextButtonDisabled(false)
        }
        break
      case "opt_scale":
        console.log(
          answers
            .filter((i) => i.page_id === currentPage[0].id)
            .map((o) => o.question_id),
          answers
            .filter((i) => i.page_id === currentPage[0].id && i.option_id)
            .map((o) => o.option_id)
        )
        if (
          answers
            .filter((i) => i.page_id === currentPage[0].id)
            .map((o) => o.question_id).length ===
            answers
              .filter((i) => i.page_id === currentPage[0].id && i.option_id)
              .map((o) => o.option_id).length &&
          answers
            .filter((i) => i.page_id === currentPage[0].id)
            .map((o) => o.question_id).length > 0
        ) {
          setNextButtonDisabled(false)
        }

        break

      case "open":
        setNextButtonDisabled(false)
        break
      case "mode":
        setNextButtonDisabled(false)
        break
      case "checkbox_scale":
        if (checkOpenables()) {
          setNextButtonDisabled(false)
        }
        break
      default:
        setNextButtonDisabled(true)
        break
    }
  }

  const populatePages = () => {
    let pages_ = initData?.pagesAndQuestions
      ?.sort((a, b) => a.position - b.position)
      ?.sort((a, b) => a.section_position - b.section_position)

    pages_ = pages_?.map((i, index) => {
      return {
        ...i,
        position: index + 3,
      }
    })

    let additionalDemographicsQuestionIds = initData?.pagesAndQuestions
      ?.filter((i) => i.name === "DEMOGRAPHICS")[0]
      .questions.map((i) => i.id)

    initData?.additional?.length > 0 &&
      initData.additional
        .filter((i) => !additionalDemographicsQuestionIds.includes(i.id))
        .forEach((q, index) => {
          pages_.push({
            id: q.id,
            section_position: 100,
            position: pages_[pages.length - 1]?.position + 1,
            questions: [
              {
                id: q.id,
                options: q.options.map((i) => {
                  return {
                    option_id: i.option_id,
                    option_label: i.option_label,
                    position: i.position,
                  }
                }),
                label: q.label,
                type: q.type,
                position: 0,
              },
            ],
            name: `Additional ${index + 1} `,
            type: q.type,
          })
        })

    setPages([...pages_])
    setDependencies([...initData.dependencies])
    setInitPages([
      ...pages_
        ?.sort((a, b) => a.position - b.position)
        .sort((a, b) => a.dependencyPosition - b.dependencyPosition),
    ])
    SetCurrentPage(pages_?.filter((i) => i.position === isPage))
  }

  const resetSurveyState = () => {
    setSurveyAnswers([])
    setAnswers([])
    setPage(0)
  }

  const applyDependencies = () => {
    let currentPages = initPages
    let preparedPages = initPages
    const handleChangedPages = (newPages, from) => {
      let uniquePageIds = [...newPages?.map((i) => i?.id)]
      preparedPages = uniquePageIds
        ?.map((i) => {
          return newPages?.filter((o) => o?.id === i)[0]
        })
        ?.filter((i) => i.questions?.length > 0)
        .sort((a, b) => a.section_position - b.section_position)
        .sort((a, b) => a.position - b.position)
        .sort((a, b) => a.dependencyPosition - b.dependencyPosition)
        .sort((a, b) => a.dependencyPosition2 - b.dependencyPosition2)
        .map((i, index) => {
          return {
            ...i,
            heading: i.heading,
            questions: i.questions.map((q) => {
              return { ...q, label: q.label }
            }),
            position: index + 3,
          }
        })
    }
    const checkLogicConditions = (arr) => {
      let orConditions = arr.filter((i) => i.logic === "or")?.length
      let andCondtions = arr.filter((i) => i.logic === "and")?.length
      let TrueOrConditions = arr
        .filter((i) => i.logic === "or")
        .filter((i) => i.valid)?.length
      let TrueAndCondtions = arr
        .filter((i) => i.logic === "and")
        .filter((i) => i.valid)?.length

      //if or conditions, true or conditions length should be bigger then 0
      //if and conditions, all and conditions should be true

      if (
        (orConditions > 0 ? TrueOrConditions > 0 : true) &&
        (andCondtions > 0 ? andCondtions === TrueAndCondtions : true)
      ) {
        return true
      } else {
        return false
      }
    }

    const checkCoreModuleDependencies = () => {
      let validDependencies = []
      dependencies
        .filter(
          (d) =>
            d.target_type === "core_module" &&
            initData.general.survey_module_id === d.target_id
        )
        .map((d) => {
          let conditionArr = []
          let dependencyActionAnswer = {}

          d.conditions.map((c) => {
            let isConditionValid = false
            let conditionAnswer1 = {}
            let conditionAnswer2 = {}

            switch (c.target_type_1) {
              case "questions":
                conditionAnswer1 =
                  answers?.filter((a) => a.question_id === c.target_id_1)[0]
                    ?.value || 0
                break
              case "value":
                conditionAnswer1 = c.target_value_1
                break
              case "dependency_action":
                conditionAnswer1 = dependencyActionAnswer
                break
              default:
                break
            }
            switch (c.target_type_2) {
              case "questions":
                conditionAnswer2 =
                  answers?.filter((a) => a.question_id === c.target_id_2)[0]
                    ?.value || 0
                break
              case "value":
                conditionAnswer2 = c.target_value_2
                break
              case "dependency_action":
                conditionAnswer2 = dependencyActionAnswer
                break
              default:
                break
            }

            switch (c.comparison_type) {
              case ">":
                isConditionValid =
                  parseInt(conditionAnswer1) > parseInt(conditionAnswer2)
                break
              case "<":
                isConditionValid =
                  parseInt(conditionAnswer1) < parseInt(conditionAnswer2)
                break
              case "=":
                isConditionValid =
                  parseInt(conditionAnswer1) === parseInt(conditionAnswer2)
                break
              case "<=":
                isConditionValid =
                  parseInt(conditionAnswer1) <= parseInt(conditionAnswer2)
                break
              case ">=":
                isConditionValid =
                  parseInt(conditionAnswer1) >= parseInt(conditionAnswer2)
                break
              case "+":
                dependencyActionAnswer =
                  parseInt(conditionAnswer1) + parseInt(conditionAnswer2)
                isConditionValid = true
                break
              default:
                break
            }
            conditionArr.push({
              valid: isConditionValid,
              logic: c.comparison_logic,
              dependency: c.dependency_id,
            })
          })

          if (checkLogicConditions(conditionArr)) {
            validDependencies.push(d)
          }
        })
      return validDependencies
    }
    const checkLeesmanModuleDependencies = () => {
      let validDependencies = []
      dependencies
        .filter((d) => d.target_type === "leesman_module")
        .map((d) => {
          let conditionArr = []
          let dependencyActionAnswer = {}
          d?.conditions &&
            d.conditions.map((c) => {
              let isConditionValid = false
              let conditionAnswer1 = {}
              let conditionAnswer2 = {}
              switch (c.target_type_1) {
                case "core_module":
                  conditionAnswer1 = c.target_id_1
                  break
                case "questions":
                  conditionAnswer1 =
                    answers?.filter((a) => a.question_id === c.target_id_1)[0]
                      ?.value || 0
                  break
                case "options":
                  conditionAnswer1 =
                    answers?.filter((a) => a.option_id === c.target_id_1)
                      .length > 0

                  break

                case "value":
                  conditionAnswer1 = c.target_value_1
                  break
                default:
                  conditionAnswer1 = 0
                  break
              }
              switch (c.target_type_2) {
                case "core_module":
                  conditionAnswer2 = initData.general.survey_module_id
                  break
                case "questions":
                  conditionAnswer2 =
                    answers?.filter((a) => a.question_id === c.target_id_2)[0]
                      ?.value || 0
                  break
                case "options":
                  conditionAnswer2 =
                    answers?.filter((a) => a.option_id === c.target_id_2)[0]
                      ?.value || 0
                  break

                case "value":
                  conditionAnswer2 = c.target_value_2
                  break
                default:
                  conditionAnswer2 = 0
                  break
              }

              switch (c.comparison_type) {
                case "not_existed":
                  isConditionValid = !conditionAnswer1
                  break
                case "not_selected":
                  isConditionValid =
                    parseInt(conditionAnswer1) !== parseInt(conditionAnswer2)
                  break
                case "<":
                  isConditionValid =
                    parseInt(conditionAnswer1) < parseInt(conditionAnswer2)
                  break
                case "=":
                  isConditionValid =
                    parseInt(conditionAnswer1) === parseInt(conditionAnswer2)
                  break
                case "<=":
                  isConditionValid =
                    parseInt(conditionAnswer1) <= parseInt(conditionAnswer2)
                  break
                case ">=":
                  isConditionValid =
                    parseInt(conditionAnswer1) >= parseInt(conditionAnswer2)
                  break
                case "+":
                  dependencyActionAnswer =
                    parseInt(conditionAnswer1) + parseInt(conditionAnswer2)
                  isConditionValid = true
                  break
                default:
                  break
              }

              conditionArr.push({
                valid: isConditionValid,
                logic: c.comparison_logic,
                dependency: c.dependency_id,
              })
            })

          if (checkLogicConditions(conditionArr)) {
            validDependencies.push(d)
          }
        })
      return validDependencies
    }
    const checkPageGroupDependencies = () => {
      let validDependencies = []
      dependencies
        .filter(
          (d) =>
            d.target_type === "page_group" &&
            initData?.pagesAndQuestions?.filter(
              (i) => i.page_group_id === d.target_id
            )
        )
        .map((d) => {
          let conditionArr = []
          let dependencyActionAnswer = {}
          d?.conditions &&
            d.conditions.map((c) => {
              let isConditionValid = false
              let conditionAnswer1 = {}
              let conditionAnswer2 = {}
              switch (c.target_type_1) {
                case "core_module":
                  conditionAnswer1 = c.target_id_1
                  break
                case "questions":
                  conditionAnswer1 =
                    answers?.filter((a) => a.question_id === c.target_id_1)[0]
                      ?.value || 0
                  break
                case "options":
                  conditionAnswer1 =
                    answers?.filter((a) => a.option_id === c.target_id_1)[0]
                      ?.value || 0
                  break
                case "value":
                  conditionAnswer1 = c.target_value_1
                  break
                default:
                  conditionAnswer1 = 0
                  break
              }
              switch (c.target_type_2) {
                case "core_module":
                  conditionAnswer2 = initData.general.survey_module_id
                  break
                case "questions":
                  conditionAnswer2 =
                    answers?.filter((a) => a.question_id === c.target_id_2)[0]
                      ?.value || 0
                  break
                case "options":
                  conditionAnswer2 =
                    answers?.filter((a) => a.option_id === c.target_id_2)[0]
                      ?.value || 0
                  break

                case "value":
                  conditionAnswer2 = c.target_value_2
                  break
                default:
                  conditionAnswer2 = 0
                  break
              }

              switch (c.comparison_type) {
                case "not_selected":
                  isConditionValid =
                    parseInt(conditionAnswer1) !== parseInt(conditionAnswer2)
                  break
                case "selected":
                  isConditionValid =
                    parseInt(conditionAnswer1) === parseInt(conditionAnswer2)
                  break
                case "<":
                  isConditionValid =
                    parseInt(conditionAnswer1) < parseInt(conditionAnswer2)
                  break
                case ">":
                  isConditionValid =
                    parseInt(conditionAnswer1) > parseInt(conditionAnswer2)
                  break
                case "=":
                  isConditionValid =
                    parseInt(conditionAnswer1) === parseInt(conditionAnswer2) &&
                    conditionAnswer1 !== 0
                  break
                case "<=":
                  isConditionValid =
                    parseInt(conditionAnswer1) <= parseInt(conditionAnswer2)
                  break
                case ">=":
                  isConditionValid =
                    parseInt(conditionAnswer1) >= parseInt(conditionAnswer2)
                  break
                case "+":
                  dependencyActionAnswer =
                    parseInt(conditionAnswer1) + parseInt(conditionAnswer2)
                  isConditionValid = true
                  break
                default:
                  break
              }
              conditionArr.push({
                valid: isConditionValid,
                logic: c.comparison_logic,
                dependency: c.dependency_id,
              })
            })
          if (checkLogicConditions(conditionArr)) {
            validDependencies.push(d)
          }
        })
      return validDependencies
    }
    const checkPageDependencies = () => {
      let validDependencies = []
      dependencies
        .filter(
          (d) =>
            d.target_type === "pages" &&
            initData?.pagesAndQuestions?.map((i) => i.id).includes(d.target_id)
        )
        .map((d) => {
          let conditionArr = []
          let dependencyActionAnswer = {}
          d?.conditions &&
            d.conditions.length &&
            d.conditions.map((c) => {
              //selected_questions
              //selected
              //value
              let isConditionValid = false
              let conditionAnswer1 = {}
              let conditionAnswer2 = {}
              switch (c.target_type_1) {
                case "questions":
                  conditionAnswer1 =
                    answers?.filter(
                      (a) => a.question_id === parseInt(c.target_id_1)
                    )[0]?.value || 0
                  break
                case "options":
                  conditionAnswer1 =
                    answers?.filter(
                      (a) => a.option_id === parseInt(c.target_id_1)
                    )[0]?.value || 0
                  break
                case "selected_questions":
                  conditionAnswer1 =
                    answers
                      ?.filter((a) => a.page_id === parseInt(c.target_id_1))
                      ?.map((i) => i.question_id) || []
                  break
                case "value":
                  conditionAnswer1 = c.target_value_1
                  break
                default:
                  conditionAnswer1 = 0
                  break
              }
              switch (c.target_type_2) {
                case "core_module":
                  conditionAnswer2 = initData.general.survey_module_id
                  break
                case "questions":
                  conditionAnswer2 =
                    answers?.filter((a) => a.question_id === c.target_id_2)[0]
                      ?.value || 0
                  break
                case "options":
                  conditionAnswer2 =
                    answers?.filter((a) => a.option_id === c.target_id_2)[0]
                      ?.value || 0
                  break
                case "value":
                  conditionAnswer2 = c.target_value_2
                  break
                default:
                  conditionAnswer2 = 0
                  break
              }
              switch (c.comparison_type) {
                case "<":
                  isConditionValid = conditionAnswer1 < conditionAnswer2
                  break
                case "=":
                  isConditionValid = conditionAnswer1 === conditionAnswer2
                  break
                case "<=":
                  isConditionValid = conditionAnswer1 <= conditionAnswer2
                  break
                case ">=":
                  isConditionValid = conditionAnswer1 >= conditionAnswer2
                  break
                case "selected":
                  isConditionValid =
                    answers.filter(
                      (i) => i.option_id === parseInt(c.target_id_1)
                    ).length > 0
                  break
                default:
                  break
              }

              conditionArr.push({
                valid: isConditionValid,
                logic: c.comparison_logic,
                dependency: c.dependency_id,
              })
            })
          if (d?.conditions.length > 0) {
            if (checkLogicConditions(conditionArr)) {
              validDependencies.push(d)
            }
          } else {
            validDependencies.push(d)
          }
        })
      return validDependencies
    }
    const checkQuestionDependencies = () => {
      let validDependencies = []
      dependencies
        .filter(
          (d) =>
            d.target_type === "question" &&
            flatedPageData.map((i) => i.question_id).includes(d.target_id)
        )
        .map((d) => {
          let conditionArr = []

          d?.conditions &&
            d.conditions.length &&
            d.conditions.map((c) => {
              let isConditionValid = false
              let conditionAnswer1 = {}
              switch (c.target_type_1) {
                case "leesman_module":
                  conditionAnswer1 =
                    flatedPageData.filter(
                      (i) => i.survey_module_id === c.target_id_1
                    ).length > 0
                  break
                case "questions":
                  conditionAnswer1 =
                    answers.filter((i) => i.question_id === c.target_id_1)
                      .length > 0
                  break
                default:
                  conditionAnswer1 = false
                  break
              }

              switch (c.comparison_type) {
                case "not_existed":
                  isConditionValid = !conditionAnswer1
                  break
                case "existed":
                  isConditionValid = conditionAnswer1
                  break
                case "has_no_answer":
                  isConditionValid = !conditionAnswer1
                  break
                case "has_answer":
                  isConditionValid = conditionAnswer1
                  break
              }
              conditionArr.push({
                valid: isConditionValid,
                logic: c.comparison_logic,
                dependency: c.dependency_id,
              })
            })
          if (checkLogicConditions(conditionArr)) {
            validDependencies.push(d)
          }
        })

      return validDependencies
    }
    const checkOptionDependencies = () => {
      let validDependencies = []

      dependencies
        .filter(
          (d) =>
            d.target_type === "options" &&
            flatedPageData.map((i) => i.option_id).includes(d.target_id)
        )
        .map((d) => {
          let conditionArr = []
          d?.conditions &&
            d.conditions.length &&
            d.conditions.map((c) => {
              let isConditionValid = false
              let conditionAnswer1 = {}
              switch (c.target_type_1) {
                case "options":
                  conditionAnswer1 =
                    answers.filter((i) => i.option_id === c.target_id_1)
                      .length > 0
                  break

                default:
                  conditionAnswer1 = false
                  break
              }

              switch (c.comparison_type) {
                case "is_selected":
                  isConditionValid = conditionAnswer1
                  break
              }
              conditionArr.push({
                valid: isConditionValid,
                logic: c.comparison_logic,
                dependency: c.dependency_id,
              })
            })
          if (checkLogicConditions(conditionArr)) {
            validDependencies.push(d)
          }
        })
      return validDependencies
    }

    const handleActions = (dependency) => {
      const handlePageGroups = (actions) => {
        let changingPart = currentPages?.filter(
          (i) => i.survey_module_id === dependency.target_id && i.page_group_id
        )
        currentPages = currentPages?.filter(
          (i) => !changingPart.map((o) => o.id).includes(i.id)
        )

        switch (actions[0].action_type) {
          case "show_only":
            changingPart = changingPart.filter((i) =>
              actions.map((o) => o.target_id).includes(i.page_group_id)
            )
            break

          default:
            break
        }
        changingPart = changingPart.map((c) => {
          return {
            ...c,
            dependencyPosition: actions.filter(
              (a) => a.target_id === c.page_group_id
            )[0]?.position,
          }
        })

        currentPages = [...currentPages, ...changingPart]

        changingPart[0]?.id && handleChangedPages(currentPages, "page groups")
      }

      const handlePages = (actions) => {
        actions.map((a) => {
          switch (a.action_type) {
            case "selected_questions":
              //get selected questions
              let selectedQuestionsOnPage = answers?.filter(
                (i) => i.page_id === a.target_id
              )

              let changingPart = currentPages?.filter(
                (i) => i?.id === dependency?.target_id
              )
              let currentPart = currentPages?.filter(
                (i) => i?.id !== dependency?.target_id
              )

              if (changingPart?.length > 0) {
                changingPart = changingPart.map((i) => {
                  return {
                    ...i,
                    questions: i?.questions?.filter((q) =>
                      selectedQuestionsOnPage
                        .map((o) => o.question_id)
                        .includes(q.id)
                    ),
                  }
                })
              }
              currentPages = currentPages?.filter(
                (i) => i?.id !== dependency.target_id
              )
              currentPages.push(changingPart[0])

              changingPart[0]?.id && handleChangedPages(currentPages, "pages")

              break
            case "hide":
              currentPages = currentPages?.filter(
                (i) => !actions.map((a) => a.target_id).includes(i?.id)
              )
              handleChangedPages(currentPages, "pages")
              break
            case "selected_questions<=-1":
              //get selected questions
              let dependencyActionTargets = dependencies
                .filter((i) => i.id === a.dependency_id)[0]
                ?.actions.map((i) => i.target_id)

              let selectedQuestionsOnPage_ = answers?.filter(
                (i) =>
                  dependencyActionTargets.includes(i.page_id) &&
                  i.value <= -1 &&
                  i.value > -4
              )

              let changingPart_ = currentPages?.filter(
                (i) => i?.id === dependency?.target_id
              )
              let currentPart_ = currentPages?.filter(
                (i) => i?.id !== dependency?.target_id
              )

              if (changingPart_.length > 0) {
                changingPart_ = changingPart_.map((i) => {
                  return {
                    ...i,
                    questions: i?.questions?.filter((q) =>
                      selectedQuestionsOnPage_
                        .map((o) => o.question_id)
                        .includes(q.id)
                    ),
                  }
                })
              }
              currentPages = currentPages?.filter(
                (i) => i?.id !== dependency.target_id
              )
              currentPages.push(changingPart_[0])

              changingPart_[0]?.id && handleChangedPages(currentPages, "pages")

              break
            default:
              break
          }
        })
      }

      const handleLeesmanModules = (actions) => {
        switch (actions[0].action_type) {
          case "hide":
            currentPages = currentPages.filter(
              (i) =>
                !actions.map((a) => a.target_id).includes(i.survey_module_id)
            )
            break
          case "follow_office":
            const isOfficeBefore = () => {
              return (
                currentPages.filter((i) => i.page_type === "office")[0]
                  ?.dependencyPosition <
                currentPages.filter((i) => i.page_type === "home")[0]
                  ?.dependencyPosition
              )
            }
            const decidePosition = (page) => {
              if (!page.page_group_id && page.section_position === 0) {
                //questions until location
                return 0
              } else if (page.page_group_id && page.section_position === 0) {
                //home and offices
                if (page.page_type === "office") {
                  return isOfficeBefore() ? 1 : 3
                } else if (page.page_type === "home") {
                  return isOfficeBefore() ? 3 : 1
                }
              } else if (
                !page.page_group_id &&
                actions.map((i) => i.target_id).includes(page.survey_module_id)
              ) {
                //leesman modules that follows office

                return isOfficeBefore() ? 2 : 4
              } else if (
                !page.page_group_id &&
                page.survey_module_id &&
                !actions.map((i) => i.target_id).includes(page.survey_module_id)
              ) {
                //leesman modules that not follows office
                //return isOfficeBefore() ? 4 : 2;
                return 5
              } else if (page.section_position === 100) {
                return 6
              }
            }

            if (
              currentPages.filter((i) => i.page_type === "office")?.length === 0
            ) {
              currentPages = currentPages.filter(
                (item) =>
                  !actions
                    .map((i) => i.target_id)
                    .includes(item.survey_module_id)
              )
            }
            currentPages = currentPages
              .map((i) => {
                return {
                  ...i,
                  dependencyPosition: i.dependencyPosition,
                  dependencyPosition2: decidePosition(i),
                }
              })
              .sort((a, b) => a.dependencyPosition - b.dependencyPosition)
              .sort((a, b) => a.dependencyPosition2 - b.dependencyPosition2)

            break
          default:
            break
        }

        handleChangedPages(currentPages, "leesman modules")
      }

      const handleQuestions = (actions) => {
        const removeQuestion = (id) => {
          let questionPageId = flatedPageData?.filter(
            (i) => i.question_id === id
          )[0]?.page_id
          let changingPart = currentPages?.filter(
            (i) => i?.id === questionPageId
          )[0]
          currentPages = currentPages?.filter((i) => i?.id !== questionPageId)
          changingPart = {
            ...changingPart,
            questions: changingPart?.questions.map((q) => {
              return { ...q, options: q.id === id ? [] : q.options }
            }),
          }

          currentPages = [...currentPages, changingPart]
          currentPages = [...currentPages.filter((i) => i)]
          changingPart?.id && handleChangedPages(currentPages, "question")
        }

        actions.map((a) => {
          switch (a.action_type) {
            case "hide":
              removeQuestion(a.target_id)
              break

            default:
              break
          }
        })
      }

      const handleOptions = (actions) => {
        const showOptions = () => {
          let changedPageId = flatedPageData.filter(
            (i) => i.option_id === actions[0].target_id
          )[0]?.page_id
          let questionId = flatedPageData.filter(
            (i) => i.option_id === actions[0].target_id
          )[0]?.question_id
          let changedPagePosition = pages.filter(
            (i) => i.id === changedPageId
          )[0]?.position

          if (isPage === changedPagePosition) {
            let changingPart = pages.filter((i) => i.id === changedPageId)
            let currentPages = pages.filter((i) => i.id !== changedPageId)

            changingPart = preparedPages
              .filter((i) => i.id === changedPageId)
              .map((i) => {
                return {
                  ...i,
                  questions: i.questions.map((q) => {
                    return {
                      ...q,
                      options:
                        questionId === q.id
                          ? q.options.filter((e) =>
                              actions
                                .map((w) => w.target_id)
                                .includes(e.option_id)
                            )
                          : q.options,
                    }
                  }),
                }
              })
            changingPart = [...changingPart]
            currentPages = [...currentPages, ...changingPart]
            currentPages = [...currentPages.filter((i) => i)]
            changingPart[0]?.id && handleChangedPages(currentPages, "options")
            console.log(changingPart)
            isPage === changingPart[0].position &&
              SetCurrentPage([...changingPart])
          }
        }

        switch (actions[0].action_type) {
          case "show":
            showOptions()
            break
          default:
            break
        }
      }

      switch (dependency?.actions[0]?.target_type) {
        case "leesman_module":
          handleLeesmanModules(dependency.actions)
          break
        case "page_group":
          handlePageGroups(dependency.actions)
          break
        case "pages":
          handlePages(dependency.actions, dependency.dependencyActionAnswer)
          break
        case "questions":
          handleQuestions(dependency.actions)
          break
        case "options":
          handleOptions(dependency.actions)
          break
        default:
          break
      }
    }

    let validCoreModuleDependencies = checkCoreModuleDependencies()
    let validLeesmanModuleDependencies = checkLeesmanModuleDependencies()
    let validPageGroupDependencies = checkPageGroupDependencies()
    let validPageDependencies = checkPageDependencies()
    let validQuestionDependencies = checkQuestionDependencies()
    let validOptionDependencies = checkOptionDependencies()
    // let validOtherDependencies = checkOtherDependencies();

    let currentPageDependencies = [
      ...validOptionDependencies,
      ...validQuestionDependencies,
      ...validPageDependencies,
      ...validLeesmanModuleDependencies,
      ...validCoreModuleDependencies,
      ...dependencies.filter((i) => i.target_type === "other"),
      ...validPageGroupDependencies,
      ...validOptionDependencies,
    ]
    let pagesDependencies = [
      ...validLeesmanModuleDependencies,
      ...validCoreModuleDependencies,
      ...validPageGroupDependencies,
      ...validLeesmanModuleDependencies,
    ]
    // let selectedDependencies = scope == "pages" ? currentPageDependencies : pagesDependencies;

    console.log("validDependencies", currentPageDependencies)
    ;[...currentPageDependencies].map((d) => {
      handleActions(d)
    })
    //will change pages at the end

    console.log(preparedPages, "pages changed by dependencies")
    console.log(initPages, "pages untouched")
    setPages([...preparedPages.filter((i) => i.id)])
  }

  const handleAnswer = (answer) => {
    let currentAnswers = answers
    if (
      currentAnswers?.map((a) => a.question_id).includes(answer.question_id)
    ) {
      if (!["tick", "checkbox_scale"].includes(answer?.type)) {
        currentAnswers = currentAnswers?.filter(
          (a) =>
            a.question_id !== answer.question_id ||
            a.page_id !== answer.page_id ||
            (a?.department_id &&
              answer?.department_id &&
              a.department_id !== answer.department_id)
        )
      }
    }

    currentAnswers = [...currentAnswers, answer]
    setAnswers([...currentAnswers])
  }

  const resetAnswer = () => {
    axios
      .put(`/survey/resetrespondentanswers/${code}`, userInfo)
      .then(() => {
        setResetModal(false)
        setUserInfo([])
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  var patternArabic = /[\u0600-\u06FF\u0750-\u077F]/
  var patternChinese =
    /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/
  var patternJapanese =
    /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/

  // Dynamic page title testing
  const [title, setTitle] = useState("Leesman® Analytics | Survey")

  // Leesman: G-RNW91N92CQ
  // Testing: G-0FZ70EDGPN

  //will add to secret manager later
  const [googleAnalyticsId, setgoogleAnalyticsId] = useState("G-RNW91N92CQ")

  useEffect(() => {
    setTitle(
      "Leesman® Analytics | " +
        "Survey | Page info: " +
        (isPage === 1 ? "Login page" : "") +
        (isPage === 2 ? "Welcome page" : "") +
        (isPage === "details" ? "More details page" : "") +
        (isPage === 3 + pages?.length ? "Nearly done page" : "") +
        (isPage === 4 + pages?.length || userInfo?.is_completed
          ? "Thanks page"
          : "") +
        (surveyClosed ? "Closed survey page" : "") +
        (notFound ? "Survey not found page" : "") +
        textModifier(currentPage[0]?.name)
    )

    document.title = title

    setTimeout(() => {
      function gtag() {
        window.dataLayer.push(arguments)
      }
      gtag("js", new Date())
      gtag("config", googleAnalyticsId)
    }, 750)
  }, [isPage, currentPage])
  // Dynamic page title testing

  useEffect(() => {
    if (patternArabic.test(selectedLanguageText) || selectedLanguageId === 21) {
      document.body.classList.add("rtl_mode")
      setRTL(true)
    } else {
      document.body.classList.remove("rtl_mode")
      setRTL(false)
    }
  }, [selectedLanguageText, selectedLanguageId])

  return (
    <>
      <Helmet>
        <title>{document.title}</title>
        {isRTL ? <html dir="rtl" lang="ar" /> : <html dir="ltr" lang="en" />}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        ></script>
      </Helmet>

      <div
        className="container-fluid survey_form-container"
        id="survey-_section"
      >
        <div className="row row-height">
          {/* 
          Classes Conditions:

          Login - Closed Survey Chapter:   bg-orange,
          Thanks Chapter:                  bg-green
          Other Chapters - Question Pages: bg-white

          Question Pages:                  question_sc
          */}
          <div
            className={`lssman-survey_-section full-_width
          
          // arka plan turuncu olursa - login sayfası
          ${(isPage === 1 || surveyClosed || notFound) && " bg-orange"} 

          // arka plan yeşil olursa - thanks sayfası
          ${
            (isPage === 4 + pages?.length || userInfo?.is_completed) &&
            " bg-green"
          }

          // arka plan beyaz olursa
          ${isPage > 1 && isPage < 3 + pages?.length ? " bg-white" : ""}

          // soru ekranları
          ${isPage > 2 && isPage < 3 + pages?.length ? " question_sc" : ""}`}
          >
            <div id="survey-_scroll" className="survey_-wrapper">
              <div className="mobile-_bg-head"></div>

              {/* Logo */}
              <Link
                to={history.location.pathname}
                id="logo"
                className={`logo-_srv ${checkedMenu && " opened"}`}
              >
                <img
                  src="/assets/images/leesman-logos/leesman_logo_survey.svg"
                  alt=""
                />
              </Link>

              {isPage > 5 && isPage < 3 + pages?.length ? (
                <label id="survey_mobile_burger">
                  <input
                    type="checkbox"
                    checked={checkedMenu}
                    onChange={() => setCheckedMenu(!checkedMenu)}
                  />
                  <span className="menu">
                    {" "}
                    <span className="hamburger"></span>{" "}
                  </span>
                </label>
              ) : (
                <></>
              )}

              {/* Select Language */}
              {initData?.languages?.length >= 1 ? (
                <select
                  className={`custom-select survey-language-select ${
                    isPage > 5 && isPage < 3 + pages?.length ? " opened" : " "
                  }`}
                  style={{
                    width: `${
                      selectedLanguageText?.length * 8 + 65 > 215
                        ? selectedLanguageText?.length * 8 + 100
                        : selectedLanguageText?.length * 8 + 65 < 110 &&
                          selectedLanguageText?.length * 8 + 65 > 85
                        ? selectedLanguageText?.length * 8 + 57
                        : patternArabic.test(selectedLanguageText)
                        ? 91
                        : patternChinese.test(selectedLanguageText)
                        ? 150
                        : patternJapanese.test(selectedLanguageText)
                        ? 95
                        : selectedLanguageText?.length * 8 + 65
                    }px`,
                  }}
                  value={selectedLanguageId}
                  onChange={(e) => {
                    setSelectedLanguageId(e.target.value)
                    setSelectedLanguageText(e.target.selectedOptions[0].text)
                  }}
                >
                  {initData?.languages
                    ?.filter((i) => i.text)
                    ?.sortAlphabetically("text")
                    ?.map((option, index) => (
                      <option value={option.language_id}>{option.text}</option>
                    ))}
                </select>
              ) : (
                <></>
              )}

              {/* Left Sidebar */}
              {isPage > 6 && isPage < 3 + pages?.length ? (
                <div
                  className={`dropdown_-content ${checkedMenu && " opened"}`}
                >
                  <StyleRoot style={styles.fadeInUp} className="anim-_sc">
                    <LeftSidebar
                      initData={initData}
                      setPage={setPage}
                      pages={pages}
                      isPage={isPage}
                      saveLater={saveLater}
                      isLater={isLater}
                      currentPage={currentPage}
                      setCheckedMenu={setCheckedMenu}
                      selectedLanguageId={selectedLanguageId}
                    />
                  </StyleRoot>
                </div>
              ) : (
                <></>
              )}

              {/* Reset my answers */}
              <ResetModal
                resetAnswer={resetAnswer}
                isResetModal={isResetModal}
                setResetModal={setResetModal}
              />
              {(userInfo?.email || userInfo?.refCode) &&
                initData.general?.status !== "live" && (
                  <div
                    className={`reset_answers ${
                      isPage > 1 && isPage < 3 + pages?.length ? " jump" : " "
                    }`}
                  >
                    <div className="r_content">
                      <p>
                        <span>You are on demonstration survey |</span>
                        <button
                          type="button"
                          onClick={() => setResetModal(true)}
                        >
                          Reset my answers
                        </button>
                      </p>
                    </div>
                  </div>
                )}
              {/* Reset my answers */}

              {/* 
              Classes Conditions: 
              Chapter has Image:  has_figure
              Question Pages:     full-_height
              */}
              <div
                className={`left_info-survey 
                  ${
                    isPage > 2 && isPage < 3 + pages?.length
                      ? " full-_height"
                      : " chapters-_height"
                  } 
                  ${
                    isPage === 3 + pages?.length ||
                    isPage === 4 + pages?.length ||
                    notFound
                      ? " has_figure"
                      : " "
                  } 
                  ${isPage === 1 && !surveyClosed && " login-_page"}
                  ${isPage === "details" && " long__chapter"}
                  `}
              >
                {/* Breadcrumb */}

                {/* Login */}
                {isPage > 2 && isPage < 3 + pages?.length ? (
                  <TopBreadcrumb
                    pageCount={pageCount}
                    isPage={isPage}
                    currentPage={currentPage}
                    selectedLanguageId={selectedLanguageId}
                    languages={initData?.customisations}
                  />
                ) : (
                  <></>
                )}

                {/* CHAPTERS */}

                {/* Login */}
                {isPage === 1 && !surveyClosed && (
                  <LoginPage
                    setPage={setPage}
                    data={initData}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    setAnswers={setAnswers}
                    code={code}
                    pages={pages}
                    selectedLanguageId={selectedLanguageId}
                  />
                )}

                {/* Welcome - Intro */}
                {isPage === 2 && !isReferance && (
                  <WelcomePage
                    setPage={setPage}
                    data={initData}
                    selectedLanguageId={selectedLanguageId}
                  />
                )}

                {isPage === 2 && isReferance && (
                  <BackToSurveyEnterCode
                    setPage={setPage}
                    data={initData}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    setAnswers={setAnswers}
                    code={code}
                    pages={pages}
                    selectedLanguageId={selectedLanguageId}
                  />
                )}
                {/* Logolu Welcome - Intro */}
                {/* {isPage === 3 && <WelcomePageLogo setPage={setPage} />} */}

                {/* Text - Intro */}
                {isPage === "details" && (
                  <TextPage
                    setPage={setPage}
                    selectedLanguageId={selectedLanguageId}
                    data={initData}
                  />
                )}

                {/* About */}
                {/* {isPage === 3 && <AboutPage setPage={setPage} />} */}

                {/* Modal */}
                <PageModal
                  isModal={isModal}
                  setModal={setModal}
                  initData={initData}
                  selectedLanguageId={selectedLanguageId}
                  currentPage={currentPage[0]}
                  isPage={isPage}
                />
                <PageCodeModal
                  saveLater={saveLater}
                  isLater={isLater}
                  loginType={initData?.general?.login_type}
                  setPage={setPage}
                  selectedLanguageId={selectedLanguageId}
                  initData={initData}
                  userInfo={userInfo}
                />

                {/* QUESTIONS */}

                {/* Dropdown Select */}
                <div className="page_survey">
                  <>
                    {currentPage[0]?.type === "dropdown" ? (
                      <StyleRoot
                        style={isMobileDevice ? null : styles.fadeInRight}
                      >
                        <div className="question_div" id="scroll__that">
                          {/* Question Title */}

                          {renderQuestionByQuestionType(currentPage[0])}
                        </div>
                      </StyleRoot>
                    ) : (
                      <StyleRoot
                        style={isMobileDevice ? null : styles.fadeInRight}
                      >
                        {renderQuestionByQuestionType(currentPage[0])}
                      </StyleRoot>
                    )}
                  </>

                  {/* Question Buttons */}
                  {isPage > 2 &&
                    isPage < 3 + pages?.length &&
                    !hideButtonGroups && (
                      <BtnGroup
                        isPage={isPage}
                        setPage={setPage}
                        prev={prev}
                        next={next}
                        submit={submit}
                        pageCount={pageCount}
                        pages={pages}
                        nextButtonDisabled={nextButtonDisabled}
                        backButtonDisabled={backButtonDisabled}
                        answers={answers}
                        currentPage={currentPage[0]}
                        code={code}
                        userInfo={userInfo}
                        hideBackButton={hideBackButton}
                        hideNextButton={hideNextButton}
                        locationGroupLevel={locationGroupLevel}
                        setLocationGroupLevel={setLocationGroupLevel}
                        initData={initData}
                        selectedLanguageId={selectedLanguageId}
                      />
                    )}
                </div>

                {/* Final - Thanks Page - Final Chapter*/}
                {isPage === 3 + pages?.length && (
                  <NearlyDonePage
                    setPage={setPage}
                    isPage={isPage}
                    userInfo={userInfo}
                    code={code}
                    data={initData}
                    selectedLanguageId={selectedLanguageId}
                  />
                )}
                {(isPage === 4 + pages?.length || userInfo?.is_completed) && (
                  <ThanksPage
                    setPage={setPage}
                    isPage={isPage}
                    data={initData}
                    selectedLanguageId={selectedLanguageId}
                  />
                )}
                {surveyClosed && (
                  <ClosedSurveyThanksPage
                    data={initData}
                    selectedLanguageId={selectedLanguageId}
                  ></ClosedSurveyThanksPage>
                )}
                {notFound && (
                  <SurveyNotFoundPage
                    data={initData}
                    selectedLanguageId={selectedLanguageId}
                  ></SurveyNotFoundPage>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  isStart: state.settings.isStart,
  isLoader: state.settings.isLoader,
  isInfo: state.settings.isInfo,
  isSubmitted: state.settings.isSubmitted,
  isPage: state.settings.isPage,
  surveyAnswers: state.settings.surveyAnswers,
})

const mapDispatchToProps = (dispatch) => ({
  setStart: (e) => dispatch(settingsActions.setStart(e)),
  setLoader: (e) => dispatch(settingsActions.setLoader(e)),
  setInfo: (e) => dispatch(settingsActions.setInfo(e)),
  setSubmitted: (e) => dispatch(settingsActions.setSubmitted(e)),
  setPage: (e) => dispatch(settingsActions.setPage(e)),
  setSurveyAnswers: (e) => dispatch(settingsActions.setSurveyAnswers(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(SurveyForm)

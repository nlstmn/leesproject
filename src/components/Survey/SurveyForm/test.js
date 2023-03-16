import React, { useState, useEffect, useLayoutEffect } from "react"
import { fadeInRight, fadeInUp, fadeInLeft, fadeInDown } from "react-animations"
import Radium, { StyleRoot } from "radium"
import { connect } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import * as settingsActions from "../../../actions/settingsAction"
import { useMediaQuery } from "react-responsive"

import TopBreadcrumb from "./layouts/top_breadcrumb"
import BtnGroup from "./layouts/btn_group"
import PageModal from "./layouts/page_code_modal"
import LeftSidebar from "./layouts/left_sidebar"

import {
  BackToSurveyIntro,
  WelcomePage,
  AboutPage,
  ThanksPage,
  WelcomePageLogo,
  TextPage,
  ClosedSurveyThanksPage,
  OfficePage,
  HomePage,
  ClientSpecificPage,
  NearlyDonePage,
  ChapterHasIconComponent,
} from "./layouts/chapters"

// Question Components
import ImageSelect from "./questions/image_select"
import SortableSelect from "./questions/sortable_select"
import SliderPercentage from "./questions/slider_percentage"
import SliderPercentageTotal from "./questions/slider_percentage_total"
import SliderBinary from "./questions/slider_binary"
import CheckboxSelect from "./questions/checkbox_select"
import CheckboxSelectSpecify from "./questions/checkbox_select_specify"
import RadioSelect from "./questions/radio_select"
import RadioSelectSpecify from "./questions/radio_select_specify"
import TableRadioSelect from "./questions/table_radio_select"
import TableRadioSelectOpenable from "./questions/table_radio_select_openable"
import TableCheckboxSelectOpenable from "./questions/table_checkbox_select_openable"
import TableCheckboxRadioSelect from "./questions/table_checkbox_radio_select"
import DropdownSelect from "./questions/dropdown_select"

import DropdownCheckboxSelect from "./questions/dropdown_checkbox_select"
import UpDown from "./questions/up_down_percentage"
import SliderBinaryRadio from "./questions/slider_binary_radio"

import {
  percentage_items,
  percentage_items_total,
  binary_items,
  binary_items_static,
  drodown_items,
  drodown_c_items,
  up_down_items,
  slider_radio_items,
} from "./questions/0_dummy_data"

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
}) => {
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

  const [isModal, setModal] = useState(true)
  const [finishStatus, setfinishStatus] = useState(false)
  const history = useHistory()
  const pageCount = 5
  const [valuesTotal, setTotalValues] = useState([0])
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" })
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" })
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" })
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" })
  const isMobileDevice = useMediaQuery({ query: "(max-width: 768px)" })

  const onBackButtonEvent = (e) => {
    e.preventDefault()
    if (!finishStatus) {
      if (
        window.confirm(
          'Do you want to go back? If you do this, the survey page will be closed. Please use the "Prev" button for the previous page.'
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
    document.body.classList.add("survey__first")
    setPage(2)
    window.history.pushState(null, null, window.location.pathname)
    window.addEventListener("popstate", onBackButtonEvent)
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent)
    }
  }, [])

  const next = () => {
    setPage(isPage + 1)
    document.getElementById("survey-_scroll").scroll(0, 0)
  }

  const prev = () => {
    setPage(isPage - 1)
    document.getElementById("survey-_scroll").scroll(0, 0)
  }

  const submit = () => {
    setStart(false)
    setSubmitted(true)
    document.getElementById("survey-_scroll").scroll(0, 0)
  }

  const [issliderRadio, setsliderRadio] = useState("now")

  return (
    <>
      <div></div>
      <div
        className="container-fluid survey_form-container"
        id="survey-_section"
      >
        <div className="row row-height">
          {/* Backgrounds
          bg-orange - bg-green - bg-white*/}
          <div
            className={`lssman-survey_-section full-_width bg-white
          
          // arka plan turuncu olursa - login sayfası
          ${isPage === 10 && " bg-orange"} 

          // arka plan yeşil olursa - thanks sayfası
          ${isPage === 21 && " bg-green"}


          // soru ekranları
          ${isPage > 5 && isPage < 21 ? " question_sc" : ""}`}
          >
            <div id="survey-_scroll" className="survey_-wrapper">
              <div className="mobile-_bg-head"></div>

              {/* Logo */}
              <Link to="/survey" id="logo" className="logo-_srv">
                <img
                  src="/assets/images/leesman-logos/leesman_logo_survey.svg"
                  alt=""
                />
              </Link>

              {/* Select Language */}
              <select className="custom-select survey-language-select">
                <option selected="EN">EN</option>
                <option value="DE">DE</option>
                <option value="TR">TR</option>
                <option value="ZH">ZH</option>
              </select>

              {/* Left Sidebar */}
              {/* {isPage > 5 && isPage < 21 ? (
                    <div className='dropdown_-content'>
                      <StyleRoot style={styles.fadeInUp} className="anim-_sc"> 
                        <LeftSidebar/>
                      </StyleRoot>
                    </div>
                    ):<></>} */}
              {/* <div className="dropdown_-content">
                <StyleRoot style={styles.fadeInUp} className="anim-_sc">
                  <LeftSidebar />
                </StyleRoot>
              </div> */}

              <div
                className={`left_info-survey  has_figure ${
                  isPage <= 5 || isPage === 21 ? " " : " "
                } 
                  ${isPage === 5 || isPage === 21 ? " has_figure" : " "}`}
              >
                {/* Breadcrumb */}

                {/* {isPage > 4 && isPage < 21 ? (
                  <TopBreadcrumb pageCount={pageCount} isPage={isPage}/>
                    ):<></>} */}
                {/* <TopBreadcrumb pageCount={pageCount} isPage={isPage} /> */}

                {/* CHAPTERS */}

                {/* Welcome - Intro */}
                {/* {isPage === 2 && (
                  <BackToSurveyIntro setPage={setPage}/>
                    )} */}

                {/* Modal */}
                {/* {isPage === 6 && (
                  <PageModal isModal={isModal} setModal={setModal} />
                    )} */}

                {/* QUESTIONS */}

                <div className="page_survey">
                  {/* Image Select */}
                  {/* {isPage === 20 && (
                    <StyleRoot style={isMobileDevice ? null : styles.fadeInRight}>
                      <div id="middle-wizard">
                        <ImageSelect />
                      </div>
                    </StyleRoot>
                  )} */}
                  {/* <StyleRoot style={isMobileDevice ? null : styles.fadeInRight}>
                    <div className="question_div">
                      <h3 className="main_question">
                        Q ― For each pair of descriptors, drag the slider to the position on the scale that shows where you would
                        like your organisation’s workplace <span className="text-blue">(Workplace X)</span> to aim to be.
                        <br />
                        <br />
                        Please drag the slider to where you want the workplace to be in the{" "}
                        <span className="text-strong">future.</span>
                      </h3>
                      <div id="middle-wizard">
                        <div className="question_radios">
                          <div className="labeled_custom_select default">
                            <label className="dashboard_radio">
                              <input type="radio" name="bb22" value="now" onChange={()=>setsliderRadio("now")} checked={issliderRadio === 'now'}/>
                              <span className="label-_text">Where you believe your workplace is now. </span>
                              <span className="checkmark"></span>
                            </label>
                          </div>
                          <div className="labeled_custom_select default">
                            <label className="dashboard_radio">
                              <input
                                type="radio"
                                name="bb22"
                                value="future"
                                onChange={()=>setsliderRadio("future")}
                                checked={issliderRadio === 'future'}
                              />
                              <span className="label-_text">Where want your workplace to be in the future. </span>
                              <span className="checkmark"></span>
                            </label>
                          </div>
                        </div>
                        {slider_radio_items.map((item, i, arr) => (
                          <SliderBinaryRadio item={item} i={i} arr={arr} radio={issliderRadio}/>
                        ))}
                      </div>
                    </div>
                  </StyleRoot> */}

                  {/* <StyleRoot style={isMobileDevice ? null : styles.fadeInRight}>
                    <div id="middle-wizard">
                      <div className="question_div" id="scroll__that">
                        <h3 className="main_question">
                        Q ― Please answer the following questions about yourself and your role within your organisation.
                        </h3>
                          {drodown_items.map((item, i, arr) => (
                            <DropdownSelect item={item} i={i} arr={arr}/>
                          ))}
                      </div>
                    </div>
                  </StyleRoot> */}

                  {/* Question Buttons */}
                  {/* {isPage > 5 && isPage < 21 ? (
                    <BtnGroup isPage={isPage} setPage={setPage} prev={prev} next={next} submit={submit} pageCount={pageCount} />
                  ) : (
                    <></>
                  )}
                  <BtnGroup isPage={isPage} setPage={setPage} prev={prev} next={next} submit={submit} pageCount={pageCount} /> */}
                </div>

                {/* Final - Thanks Page - Final Chapter*/}
                {/* {isPage === 21 && (
                    <ThanksPage />
                      )} */}
                {/* <NearlyDonePage /> */}

                {/* About you */}
                {/* <ChapterHasIconComponent 
                  setPage={setPage}
                  imgUrl={ImgAbout1} 
                  imgTitle={"About you"} 
                  titleColor={"orange-bold"}
                  beforeLine={"About you"}
                  afterLine={"Tell us\nabout your work style?"}
                  desc1={"We’d like to start by asking you a few questions about you and what’s important to the work that you do, so we can understand your work style. Remember, your answers remain anonymous and confidential."}
                  desc2={false} 
                  itemList={false}
                  btnBack={true} 
                  btnNext={true}
                  /> */}

                {/* Office */}
                {/* <ChapterHasIconComponent 
                  setPage={setPage}
                  imgUrl={ImgOffice1} 
                  imgTitle={"In the office"} 
                  titleColor={"green-bold"}
                  beforeLine={"In the office"}
                  afterLine={"\nWhat’s your office\nexperience?"}
                  desc1={"Thanks for filling in the previous section. The next questions ask about how you use your office and how well the things you find important are supported there. Your answers are anonymous and confidential."}
                  desc2={false} 
                  itemList={false}
                  btnBack={false} 
                  btnNext={true}
                  /> */}

                {/* Home */}
                {/* <ChapterHasIconComponent 
                    setPage={setPage}
                    imgUrl={ImgHome1} 
                    imgTitle={"At home"} 
                    titleColor={"orange-bold"}
                    beforeLine={"At home"}
                    afterLine={"What’s\nyour home working\nexperience?"}
                    desc1={"Thanks for filling in the previous section. The next questions ask about your experience of working from home and how well the things you find important are supported there. Your answers are anonymous and confidential."}
                    desc2={false} 
                    itemList={false}
                    btnBack={false} 
                    btnNext={true}
                    /> */}

                {/* Education */}
                {/* <ChapterHasIconComponent 
                      setPage={setPage}
                      imgUrl={ImgEducation1} 
                      imgTitle={"Education"} 
                      titleColor={"green-bold"}
                      beforeLine={"At university"}
                      afterLine={"What’s\nyour experience of the\nuniversity environment?"}
                      desc1={"Thanks for filling in the previous section. The next questions ask about your experience in the university environment and how well the things you find important are supported there. Your answers are anonymous and confidential."}
                      desc2={false} 
                      itemList={false}
                      btnBack={false} 
                      btnNext={true}
                      /> */}

                {/* Lab */}
                {/* <ChapterHasIconComponent 
                        setPage={setPage}
                        imgUrl={ImgLab1} 
                        imgTitle={"Lab"} 
                        titleColor={"orange-bold"}
                        beforeLine={"In the lab"}
                        afterLine={"\nWhat’s your experience\nof the lab environment?"}
                        desc1={"Thanks for filling in the previous section. The next questions ask about your experience in the lab environment and how well the things you find important are supported there. Your answers are anonymous and confidential."}
                        desc2={false} 
                        itemList={false}
                        btnBack={false} 
                        btnNext={true}
                        /> */}

                {/* Retail */}
                {/* <ChapterHasIconComponent 
                          setPage={setPage}
                          imgUrl={ImgRetail1} 
                          imgTitle={"Retail"} 
                          titleColor={"green-bold"}
                          beforeLine={"In the retail branch"}
                          afterLine={"\nWhat’s your experience\nof your main retail\nbranch?"}
                          desc1={"Thanks for filling in the previous section. The next questions ask about your experience in your main retail branch and how well the things you find important are supported there. Your answers are anonymous and confidential."}
                          desc2={false} 
                          itemList={false}
                          btnBack={false} 
                          btnNext={true}
                          /> */}

                {/* IT */}
                {/* <ChapterHasIconComponent 
                            setPage={setPage}
                            imgUrl={ImgIT1} 
                            imgTitle={"IT"} 
                            titleColor={"green-bold"}
                            beforeLine={"Technology"}
                            afterLine={"\nHow well is technology\nworking?"}
                            desc1={"The following questions will ask you about the technology you use for work and how well it is working. Your answers remain anonymous and confidential."}
                            desc2={false} 
                            itemList={false}
                            btnBack={false} 
                            btnNext={true}
                            /> */}

                {/* Mobility support */}
                {/* <ChapterHasIconComponent 
                              setPage={setPage}
                              imgUrl={ImgMobilitySupport1} 
                              imgTitle={"IT"} 
                              titleColor={"orange-bold"}
                              beforeLine={"Mobility support"}
                              afterLine={"\nDoes your workplace\nsupport flexible\nworking?"}
                              desc1={"The following question seeks to understand your work style better, and how well your work environment supports flexible working. Your answers remain anonymous and confidential."}
                              desc2={false} 
                              itemList={false}
                              btnBack={false} 
                              btnNext={true}
                              /> */}

                {/* Wellbeing */}
                {/* <ChapterHasIconComponent 
                                setPage={setPage}
                                imgUrl={ImgWellbeing1} 
                                imgTitle={"Wellbeing"} 
                                titleColor={"green-bold"}
                                beforeLine={"Wellbeing"}
                                afterLine={"\nHow well does your\nworkplace support\nwellbeing?"}
                                desc1={"The following question explores how well the design of your workplace supports different aspects of your wellbeing. Rest assured, your answers remain anonymous and confidential."}
                                desc2={false} 
                                itemList={false}
                                btnBack={false} 
                                btnNext={true}
                                /> */}

                {/* Alignment */}
                {/* <ChapterHasIconComponent 
                                  setPage={setPage}
                                  imgUrl={ImgAlignment1} 
                                  imgTitle={"Alignment"} 
                                  titleColor={"orange-bold"}
                                  beforeLine={"Alignment"}
                                  afterLine={"\nWhat do you want your\nworkplace to be like?"}
                                  desc1={"The following questions will ask you to reflect on your current workplace and whether it aligns with how you’d like your future workplace to be. Your answers remain anonymous and confidential."}
                                  desc2={false} 
                                  itemList={false}
                                  btnBack={false} 
                                  btnNext={true}
                                  /> */}

                {/* Alignment 2 */}
                {/* <ChapterHasIconComponent 
                                    setPage={setPage}
                                    imgUrl={ImgAlignment2} 
                                    imgTitle={"Alignment"} 
                                    titleColor={"green-bold"}
                                    beforeLine={"Inclusive workplace"}
                                    afterLine={"\nHow inclusive is your\nworkplace?"}
                                    desc1={"The following questions will ask you to rate how supportive you find your workplace and current work circumstances in terms of your:"}
                                    desc2={"Remember, your answers remain anonymous and confidential."} 
                                    itemList={["Disability", "Long-term health condition", "Mental health difficulty", "Neurodiverse profile"]}
                                    btnBack={false} 
                                    btnNext={true}
                                    /> */}

                {/* Journey to work */}
                {/* <ChapterHasIconComponent 
                                      setPage={setPage}
                                      imgUrl={ImgJourneyToWork1} 
                                      imgTitle={"Journey to work"} 
                                      titleColor={"orange-bold"}
                                      beforeLine={"Journey to the\nworkplace"}
                                      afterLine={"What’s\nyour commute like?"}
                                      desc1={"The following questions will ask you about your journey to the workplace. Your answers remain anonymous and confidential."}
                                      desc2={false} 
                                      itemList={false}
                                      btnBack={false} 
                                      btnNext={true}
                                      /> */}

                {/* Return to office */}
                {/* <ChapterHasIconComponent 
                                        setPage={setPage}
                                        imgUrl={ImgReturnToOffice1} 
                                        imgTitle={"Return to office"} 
                                        titleColor={"green-bold"}
                                        beforeLine={"Return to office"}
                                        afterLine={"\nWhat do you think\nabout your office?"}
                                        desc1={"The following questions explore your thoughts and concerns about using your office, and how the culture supports your role. Your answers remain anonymous and confidential."}
                                        desc2={false} 
                                        itemList={false}
                                        btnBack={false} 
                                        btnNext={true}
                                        /> */}

                {/* Days in workplace */}
                {/* <ChapterHasIconComponent 
                                          setPage={setPage}
                                          imgUrl={ImgDaysInWorkplace1} 
                                          imgTitle={"Days in workplace"} 
                                          titleColor={"orange-bold"}
                                          beforeLine={"Days in workplace"}
                                          afterLine={"\nWhen are you likely to\nuse the office?"}
                                          desc1={"The following questions will ask you how often you see yourself going into the office/workplace, helping us to estimate what a ‘busy’ and ‘quiet’ day will look like in your office/workplace. Your answers remain anonymous and confidential."}
                                          desc2={false} 
                                          itemList={false}
                                          btnBack={false} 
                                          btnNext={true}
                                          /> */}

                {/* Third space */}
                {/* <ChapterHasIconComponent 
                                            setPage={setPage}
                                            imgUrl={ImgThirdSpace1} 
                                            imgTitle={"Third space"} 
                                            titleColor={"green-bold"}
                                            beforeLine={"Third space"}
                                            afterLine={"\nDo you have alternative\nwork locations?"}
                                            desc1={"The following questions will ask you to indicate which other locations you work from and rate your experience. Your answers remain anonymous and confidential."}
                                            desc2={false} 
                                            itemList={false}
                                            btnBack={false} 
                                            btnNext={true}
                                            /> */}

                {/* Adjacency */}
                {/* <ChapterHasIconComponent 
                                              setPage={setPage}
                                              imgUrl={ImgAdjacency1} 
                                              imgTitle={"Adjacency"} 
                                              titleColor={"orange-bold"}
                                              beforeLine={"Adjacency"}
                                              afterLine={"\nWho do you interact\nwith in your role?"}
                                              desc1={"The following question will ask you which organisational units you typically work with in your role and your preferred type of interaction. Your answers remain anonymous and confidential."}
                                              desc2={false} 
                                              itemList={false}
                                              btnBack={false} 
                                              btnNext={true}
                                              /> */}

                {/* Corporate campus */}
                {/* <ChapterHasIconComponent 
                                                setPage={setPage}
                                                imgUrl={ImgCorporateCampus1} 
                                                imgTitle={"Corporate campus"} 
                                                titleColor={"green-bold"}
                                                beforeLine={"Corporate campus"}
                                                afterLine={"\nWhich campus locations\ndo you work from?"}
                                                desc1={"The following questions will ask you where you usually work from when you are on campus, and how well the locations support your activities. Your answers remain anonymous and confidential."}
                                                desc2={false} 
                                                itemList={false}
                                                btnBack={false} 
                                                btnNext={true}
                                                /> */}

                {/* Hybrid working */}
                {/* <ChapterHasIconComponent 
                                                  setPage={setPage}
                                                  imgUrl={ImgHybridWorking1} 
                                                  imgTitle={"Hybrid working"} 
                                                  titleColor={"orange-bold"}
                                                  beforeLine={"Hybrid working"}
                                                  afterLine={"\nWhat’s your hybrid\nworking experience?"}
                                                  desc1={"The following question will ask about your experience of working across multiple locations (‘hybrid working’). Your answers remain anonymous and confidential."}
                                                  desc2={false} 
                                                  itemList={false}
                                                  btnBack={false} 
                                                  btnNext={true}
                                                  /> */}

                {/* Client */}
                {/* <ChapterHasIconComponent 
                                                    setPage={setPage}
                                                    imgUrl={ImgClient1} 
                                                    imgTitle={"Client"} 
                                                    titleColor={"green-bold"}
                                                    beforeLine={"Final feedback"}
                                                    afterLine={"\nWhat are your final\nthoughts on your\nexperience?"}
                                                    desc1={"The following questions have been specifically selected by your organisation. Your answers remain anonymous and confidential."}
                                                    desc2={false} 
                                                    itemList={false}
                                                    btnBack={false} 
                                                    btnNext={true}
                                                    /> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW QUESTION TYPES DESIGN */}
      {/* Dropdown Checkbox Select */}
      {/* <StyleRoot style={isMobileDevice ? null : styles.fadeInRight}>
            <div id="middle-wizard">
                <div className="question_div">
                    <h3 className="main_question">
                    Q ― For the technology features that you indicated you were ‘highly dissatisfied’ or ‘dissatisfied’ with, please identify the main reason you are not satisfied with them.
                    </h3>
                        {drodown_c_items.map((item, i, arr) => (
                        <DropdownCheckboxSelect item={item} i={i} arr={arr}/>
                        ))}
                </div>
            </div>
        </StyleRoot> */}

      {/* Up Down Percentage Input */}
      {/* <StyleRoot style={isMobileDevice ? null : styles.fadeInRight}>
        <div id="middle-wizard">
        <div className="question_div">
            <h3 className="main_question">
            Q ― For the technology features that you indicated you were ‘highly dissatisfied’ or ‘dissatisfied’ with, please identify the main reason you are not satisfied with them.
            </h3>
            {up_down_items.map((item, i, arr) => (
            <UpDown item={item} i={i} arr={arr}/>
            ))}

            <div className="up_down_total"><div className="total">91<span>%</span></div></div>
            </div>
        </div>
        </StyleRoot> */}

      {/* Slider with Radio Select */}
      {/* <StyleRoot style={isMobileDevice ? null : styles.fadeInRight}>
            <div className="question_div">
                <h3 className="main_question">
                Q ― For each pair of descriptors, drag the slider to the position on the scale that shows where you would like your organisation’s workplace <span className="text-blue">(Workplace X)</span> to aim to be.
                <br/><br/>
                Please drag the slider to where you want the workplace to 
                be in the <span className="text-strong">future.</span>
                </h3>
              <div id="middle-wizard">
                <div className="question_radios">
                    <div className="labeled_custom_select default">
                        <label className="dashboard_radio">
                            <input type="radio" name="dd1" value="Where you believe your workplace is now. " />
                            <span className="label-_text">Where you believe your workplace is now. </span>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div className="labeled_custom_select default">
                        <label className="dashboard_radio">
                            <input type="radio" name="dd1" value="Where want your workplace to be in the future. ernal comparison" />
                            <span className="label-_text">Where want your workplace to be in the future. </span>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                  {slider_radio_items.map((item, i, arr) => (
                  <SliderBinaryRadio item={item} i={i} arr={arr} />
                  ))}
                </div>
            </div>
          </StyleRoot> */}
    </>
  )
}

const mapStateToProps = (state) => ({
  isStart: state.settings.isStart,
  isLoader: state.settings.isLoader,
  isInfo: state.settings.isInfo,
  isSubmitted: state.settings.isSubmitted,
  isPage: state.settings.isPage,
})

const mapDispatchToProps = (dispatch) => ({
  setStart: (e) => dispatch(settingsActions.setStart(e)),
  setLoader: (e) => dispatch(settingsActions.setLoader(e)),
  setInfo: (e) => dispatch(settingsActions.setInfo(e)),
  setSubmitted: (e) => dispatch(settingsActions.setSubmitted(e)),
  setPage: (e) => dispatch(settingsActions.setPage(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(SurveyForm)

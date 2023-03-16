import React, { useState, useEffect, useLayoutEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import StepWizard from "react-step-wizard"
import { Select, notification, Skeleton } from "antd"
import { connect } from "react-redux"
import { setBgImage } from "../../../actions/settingsAction"
import ThatsIt from "../../../assets/images/thats-it.png"
import AnswerMore from "../../../assets/images/answer-more.png"
import ScaleQuestion from "../QuestionComponents/scaleQuestions"
import BooleanScaleQuestion from "../QuestionComponents/booleanScaleQuestions"
import axios from "axios"
import { Steps } from "../../common/commonComponents/CommonBlocks"
const { Option } = Select

const SelectLocation = (props) => {
  const [isOffice, setIsOffice] = useState(false)
  const [location_id, setLocationId] = useState()
  const [location_type, setLocationType] = useState()

  useEffect(() => {
    console.log(location_type, location_id)
    console.log(
      location_type === undefined ||
        (location_type === "One of my organisation’s other offices" &&
          location_id === undefined)
    )
  }, [location_type, location_id])
  useLayoutEffect(() => {
    console.log(props.passLocation)
    sessionStorage.getItem("selectedLocationName") &&
      props.passLocation &&
      props.nextStep()
  }, [props.passLocation])

  return (
    <>
      <div className="multi-_step">
        <div className="row clearfix step-_header">
          <div className="col text-left">
            <h2 className="h4 m-0 font-600">Answer a question</h2>
          </div>

          <div className="col-auto">
            <div className="stamp" aria-hidden="true">
              <i className="icon-rp-thinkrspo step-_icon"></i>
            </div>
          </div>
          <Link
            to={props.updateLink ? "/responder-home" : "/"}
            className="close-_step"
            title="Close"
          >
            <i className="iconx-x"></i>
          </Link>
        </div>

        <div className="form-_actions min-h-366 ">
          <p>{props.questionLabel}</p>

          <div className="row justify-content-center pb-5">
            <div className="col-12 pb-15">
              <Select
                aria-label="Location type selection; please double tap to open the list."
                getPopupContainer={(trigger) => trigger.parentElement}
                placeholder="Choose location"
                style={{ width: 200 }}
                onChange={(e, d) => {
                  props.selectLocationType(e)
                  setLocationType(d.children)
                  console.log(e, d)
                  if (d.children === "One of my organisation’s other offices") {
                    setIsOffice(true)
                  } else {
                    setIsOffice(false)
                    props.selectLocationId()
                    setLocationId()
                    props.setSelectedLocationName(
                      "Where you are working: " + d.children
                    )
                  }
                }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {props.questionOptions
                  .sort((a, b) => {
                    if (a.position < b.position) return -1
                    if (a.position > b.position) return 1
                    return 0
                  })
                  .map((item) => {
                    return (
                      <Option
                        title={item.label}
                        aria-label={item.label}
                        tabIndex={0}
                        key={item.id}
                        value={item.id}
                      >
                        {item.label}
                      </Option>
                    )
                  })}
              </Select>
            </div>
            {isOffice && (
              <div className="col-12">
                <Select
                  aria-label="Office selection; please double tap to open the list."
                  getPopupContainer={(trigger) => trigger.parentElement}
                  showSearch
                  placeholder="Choose location"
                  style={{ width: 200 }}
                  onChange={(e, d) => {
                    props.selectLocationId(e)
                    setLocationId(e)
                    props.setSelectedLocationName(
                      "Main office location: " + d.children
                    )
                    console.log(e)
                  }}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {props.otherLocations
                    .filter((i) => !i.code)
                    .map((item) => {
                      return (
                        <Option
                          title={item.label}
                          aria-label={item.label}
                          tabIndex={0}
                          value={item.id}
                        >
                          {item.label}
                        </Option>
                      )
                    })}
                </Select>
              </div>
            )}
          </div>
        </div>
      </div>

      <Stats
        disable={
          props.fetching ||
          location_type === undefined ||
          (location_type === "One of my organisation’s other offices" &&
            location_id === undefined)
        }
        fetching={props.fetching}
        step={1}
        {...props}
      />
    </>
  )
}

const ThankYou = (props) => {
  return (
    <>
      <div className="multi-_step thanks-_step">
        <Link
          to={props.updateLink ? "/responder-home" : "/"}
          className="close-_step"
          title="Close"
        >
          <i className="iconx-x"></i>
        </Link>
        <div className="form-_actions min-h-431">
          <div className="row clearfix step-_header">
            <div className="col text-left">
              <img
                className="thanks-_img"
                src={AnswerMore}
                alt="Answer more?"
                title="Answer more?"
              ></img>
            </div>
          </div>
          <p className="text-centerr">
            If you’ve got a minute or two, there are a few more questions we’d
            love you to answer
          </p>

          <div className="row justify-content-center text-centerr pb-5">
            <div className="col-12">
              <button
                className="btn btn-primary more-_q"
                onClick={() => {
                  //props.TriggerQuestions().then(() => props.goToStep(1));
                  props.refresh()
                }}
              >
                Answer more questions
              </button>
            </div>
            <div className="col-12">
              <Link
                to={props.updateLink ? "/responder-home" : "/"}
                className="mb-0 btn btn-default to-_home"
              >
                Back to homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <Stats step={4} {...props} /> */}
    </>
  )
}

const ThankYou2 = (props) => {
  useLayoutEffect(() => {
    props.setBackgroundColorCss(" blue-_thanks")
  }, [])
  return (
    <>
      <div className="multi-_step thanks-_step">
        <Link
          to={props.updateLink ? "/responder-home" : "/"}
          className="close-_step"
          title="Close"
        >
          <i className="iconx-x"></i>
        </Link>
        <div className="form-_actions min-h-431">
          <div className="row clearfix step-_header">
            <div className="col text-left">
              <img
                className="thanks-_img"
                src={ThatsIt}
                alt="That's it for now"
                title="That's it for now"
              ></img>
            </div>
          </div>
          <p className="white-_title text-centerr">
            There’s nothing more for you to answer at the moment. Check back
            soon or feel free to share your own comments.
          </p>

          <div className="row justify-content-center text-centerr pb-5">
            {props.client.enable_xp && (
              <div className="col-12">
                <Link className="btn btn-primary more-_q" to="/rate-my-xp">
                  Rate your XP
                </Link>
              </div>
            )}
            {props.client.enable_feedbacks && (
              <div className="col-12">
                <Link
                  to="/share-thinking"
                  className="mb-0 btn btn-default to-_home"
                >
                  Share a thought
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <Stats step={4} {...props} /> */}
    </>
  )
}

// MULTI STEP WIZARD
const Wizard = ({ setBgImage, openFullScreen, totalSteps, reduxClient }) => {
  const history = useHistory()
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [scale, setScale] = useState(0)
  const [index, setIndex] = useState(0)
  const [questionLabel, setQuestionLabel] = useState("")
  const [questionOptions, setQuestionOptions] = useState([])
  const [otherLocations, setOtherLocations] = useState([])
  const [selectedLocationType, setSelectedLocationType] = useState("")
  const [selectedLocationId, setSelectedLocationId] = useState("")
  const [questionType, setQuestionType] = useState("")
  const [locationOptions, setLocationOptions] = useState([])
  const [locationName, setLocationName] = useState([])
  const [selectedLocationName, setSelectedLocationName] = useState("")
  const [fetching, setFetching] = useState(false)
  const [passLocation, setPassLocation] = useState(false)
  const [backgroundColorCss, setBackgroundColorCss] = useState("")

  useEffect(() => {
    setBgImage("question-image")
  }, [])

  const getInit = () => {
    return Promise.all([
      axios.get("/campaigns/init"),
      axios.get("/feedbacks/location/options"),
    ]).then((value) => {
      console.log(value)
      decideRequest(value[0].data)
      setQuestionLabel(value[1].data.question_label)
      AddMain(
        value[1].data.options,
        value[1].data.locations,
        value[1].data.user
      )
      setLocationOptions(value[1].data.options)
    })
  }
  const decideRequest = (data) => {
    const selectedLocationType = sessionStorage.getItem("selectedLocationType")
      ? sessionStorage.getItem("selectedLocationType")
      : null
    const boolean_count =
      data.filter((i) => i.type === "boolean_scale").length > 0
        ? data.filter((i) => i.type === "boolean_scale")[0].count
        : 0
    const scale_count =
      data.filter((i) => i.type === "scale").length > 0
        ? data.filter((i) => i.type === "scale")[0].count
        : 0
    console.log(selectedLocationType, boolean_count, scale_count)
    if (parseInt(scale_count) > 0 && !selectedLocationType) {
      //select location first
      setPassLocation(false)
      setLoading(false)
      console.log("decided to show location select screen")
    } else if (parseInt(scale_count) > 0 && selectedLocationType) {
      console.log(
        "decided to fetch scale questions by location type id",
        selectedLocationType
      )
      setPassLocation(true)
      return fetchQuestionByUrl(`/campaigns/scale/${selectedLocationType}`)
    } else if (parseInt(scale_count) === 0 && parseInt(boolean_count) > 0) {
      console.log("decided to fetch boolean_scale questions")
      setPassLocation(true)

      return fetchQuestionByUrl("/campaigns/boolean")
    } else {
      console.log("no question available")

      setQuestions([])
      setQuestionType(null)
      setLoading(false)
      setPassLocation(true)
    }
  }

  const fetchQuestionByUrl = (url) => {
    console.log("requested url", url)
    setFetching(true)
    return axios.get(url).then((res) => {
      setLoading(false)
      setFetching(false)
      if (res.data && res.data.questions.length > 0) {
        setQuestions(res.data.questions)
        setQuestionType(res.data.type)
        return true
      } else {
        sessionStorage.removeItem("selectedLocationType")
        sessionStorage.removeItem("selectedLocationId")
        sessionStorage.removeItem("selectedLocationName")
        return false
      }
    })
  }
  useLayoutEffect(() => {
    setBgImage("question-image")
    getInit()
  }, [])

  const [state, updateState] = useState({
    transitions: {
      enterRight: `step-_animated step-_enterRight`,
      enterLeft: `step-_animated step-_enterLeft`,
      exitRight: `step-_animated step-_exitRight`,
      exitLeft: `step-_animated step-_exitLeft`,
      intro: `step-_animated step-_intro`,
    },
  })

  const onStepChange = (stats) => {
    console.log(stats, totalSteps)
    console.log(questions.length)
  }
  useEffect(() => {
    if (selectedLocationId) {
      console.log(otherLocations)
      if (otherLocations && otherLocations.length > 0) {
        setLocationName(
          otherLocations.filter((i) => i.id === selectedLocationId)[0].label
        )
      }
    }
  }, [selectedLocationType, selectedLocationId, locationOptions])

  function AddMain(options, locations, user) {
    console.log(locations, user)
    let userLocation = locations.filter((i) => i.id === user.location_id)[0]
    console.log(userLocation)

    let userDefaultlocationTitle = userLocation.code
      ? options.filter((i) => i.type === userLocation.code)[0].label
      : userLocation.label

    if (
      userLocation.code === "code_never_visit_an_office" ||
      userLocation.code === "code_office" ||
      userLocation.code === "code_other"
    ) {
      options = options.filter((i) => i.type !== "main_location")
    }
    options = options.filter((i) => i.type !== "code_never_visit_an_office")
    // else if (userLocation.code) {
    //   options = options.filter((i) => i.type !== userLocation.code);
    // }
    let newOptions = options.map((item) => {
      if (item.type === "main_location") {
        return {
          id: item.id,
          label: userDefaultlocationTitle,
          position: item.position,
        }
      } else {
        return item
      }
    })

    setQuestionOptions(newOptions)
    setOtherLocations(
      locations.filter((i) => i.label !== userDefaultlocationTitle)
    )
    setLocationName(userDefaultlocationTitle)
  }
  function checkBlockWords(text) {
    const blockWords = [
      "paki",
      "nigger",
      "nigga",
      "cunt",
      "coon",
      "faggot",
      "homo",
      "whore",
      "motherfucker",
    ]
    let textArr = text.split(" ")
    let bool = false
    textArr.forEach((word) => {
      if (blockWords.includes(word.toLowerCase())) {
        bool = true
      }
    })
    return bool
  }
  function send(bool, id, scale, comment) {
    let selected_location_type = selectedLocationType
      ? selectedLocationType
      : sessionStorage.getItem("selectedLocationType")

    console.log(id, scale)
    let data = {}
    if (bool) {
      data = {
        answers: [
          {
            bool: bool,
            question_id: id,
            answer: parseInt(scale),
            text: comment,
          },
        ],
        location: { option_id: selected_location_type, id: selectedLocationId },
      }
    } else {
      data = {
        answers: [
          {
            bool: bool,
            question_id: id,
            text: comment,
          },
        ],
      }
    }

    console.log(data)
    return axios
      .post("/answers", data)
      .then((res) => {
        setScale(0)
        setIndex(index + 1)
        return true
      })
      .catch((err) => {
        console.log(err)
        notification.warning({ message: "Cannot send answer" })
      })
  }
  function refresh() {
    window.location.href = "/answer-question"
  }

  return (
    <>
      <div className="auth-main particles_js responder-form-center multi-_steps">
        <div className="auth_div responder-intro-card text-leftt">
          <div className={`card ${backgroundColorCss}`}>
            <div className="body">
              {!loading ? (
                <StepWizard
                  onStepChange={onStepChange}
                  transitions={state.transitions}
                  nav={<Steps />}
                  isLazyMount={true}
                >
                  {!passLocation && (
                    <SelectLocation
                      selectLocationType={(e) => {
                        setSelectedLocationType(e)
                        if (
                          e ===
                          locationOptions.filter(
                            (i) => i.type === "main_location"
                          )[0].id
                        ) {
                          let officeLocationId = locationOptions.filter(
                            (i) => i.type === "code_office"
                          )[0].id
                          fetchQuestionByUrl(
                            `/campaigns/scale/${officeLocationId}`
                          )
                        } else {
                          fetchQuestionByUrl(`/campaigns/scale/${e}`)
                        }
                        sessionStorage.setItem("selectedLocationType", e)
                      }}
                      selectLocationId={(e) => {
                        setSelectedLocationId(e)
                        sessionStorage.setItem("selectedLocationId", e)
                      }}
                      questionLabel={questionLabel}
                      questionOptions={questionOptions}
                      otherLocations={otherLocations}
                      updateLink={openFullScreen}
                      fetching={fetching}
                      setSelectedLocationName={(e) => {
                        setSelectedLocationName(e)
                        sessionStorage.setItem("selectedLocationName", e)
                      }}
                      passLocation={passLocation}
                      questions={questions}
                      fetchBoolean={() => {
                        fetchQuestionByUrl(`/campaigns/boolean`)
                      }}
                    />
                  )}
                  {questions &&
                    questions.length > 0 &&
                    questions
                      .map((i) => {
                        if (i.label.includes("(name of building)")) {
                          return {
                            ...i,
                            label: i.label.replace(
                              "name of building",
                              locationName
                            ),
                          }
                        } else return i
                      })
                      .map((item, i) => {
                        switch (item.name) {
                          case "scale":
                            return (
                              <ScaleQuestion
                                key={i}
                                scale={scale}
                                setScale={(e) => {
                                  setScale(e)
                                }}
                                index={i}
                                question={item}
                                send={send}
                                checkBlockWords={checkBlockWords}
                                loading={loading}
                                updateLink={openFullScreen}
                                setBackgroundColorCss={setBackgroundColorCss}
                                selectedLocationName={
                                  selectedLocationName
                                    ? selectedLocationName
                                    : sessionStorage.getItem(
                                        "selectedLocationName"
                                      )
                                }
                              />
                            )
                          case "boolean_scale":
                            return (
                              <BooleanScaleQuestion
                                scale={scale}
                                setScale={(e) => {
                                  setScale(e)
                                }}
                                index={i}
                                question={item}
                                checkBlockWords={checkBlockWords}
                                send={send}
                                loading={loading}
                                selectLocationType={(e) => {
                                  setSelectedLocationType(e)
                                }}
                                selectLocationId={(e) => {
                                  setSelectedLocationId(e)
                                }}
                                questionLabel={questionLabel}
                                questionOptions={questionOptions}
                                otherLocations={otherLocations}
                                updateLink={openFullScreen}
                                setSelectedLocationName={(e) => {
                                  setSelectedLocationName(e)
                                }}
                                selectedLocationName={selectedLocationName}
                                locationName={locationName}
                                setBackgroundColorCss={setBackgroundColorCss}
                              />
                            )

                          default:
                            return <Skeleton />
                        }
                      })}
                  {questions && questions.length > 0 ? (
                    <ThankYou refresh={refresh} updateLink={openFullScreen} />
                  ) : (
                    <ThankYou2
                      updateLink={openFullScreen}
                      setBackgroundColorCss={setBackgroundColorCss}
                      client={reduxClient}
                      // hashKey={"thanks-for-sharing"}
                      refresh={refresh}
                    ></ThankYou2>
                    // thanks-for-sharing for background blue color
                  )}
                </StepWizard>
              ) : (
                <Skeleton></Skeleton>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  bgImage: state.settings.bgImage,
  openFullScreen: state.settings.openFullScreen,
  reduxClient: state.client,
})

const mapDispatchToProps = (dispatch) => ({
  setBgImage: (e) => dispatch(setBgImage(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Wizard)

const Stats = ({
  nextStep,
  previousStep,
  totalSteps,
  step,
  updateLink,
  disable,
  fetching,
}) => {
  console.log(disable, fetching)
  return (
    <div className="bottom">
      {step > 1 ? (
        <button className="mb-0 float-l btn btn-default" onClick={previousStep}>
          Back
        </button>
      ) : (
        <Link
          to={updateLink ? "/responder-home" : "/"}
          className="mb-0 float-l btn btn-default"
        >
          Close
        </Link>
      )}
      {step < totalSteps ? (
        <button
          className="mb-0 float-r btn btn-primary"
          disabled={disable}
          onClick={nextStep}
        >
          {fetching ? <div className="sbl-circ"></div> : "Next"}
        </button>
      ) : (
        <button
          className="mb-0 float-r btn btn-primary"
          disabled={disable}
          onClick={nextStep}
        >
          {fetching ? <div className="sbl-circ"></div> : "Submit"}
        </button>
      )}
    </div>
  )
}

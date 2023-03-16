import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import StepWizard from "react-step-wizard"
import { Select, Input, notification } from "antd"
import { connect } from "react-redux"
import { setBgImage } from "../../../actions/settingsAction"
import InsideLogo from "../../../assets/images/inside.png"
import axios from "axios"
import SetupOk from "../../../assets/images/setup-ok.png"
import { Steps } from "../../common/commonComponents/CommonBlocks"

const { Option } = Select

const Intro1 = (props) => {
  return (
    <>
      <div className="multi-_step">
        <div className="row clearfix step-_header">
          <div className="col text-left">
            <h2 className="h4 m-0 font-600">Get inside</h2>
          </div>
          <div className="col-auto">
            <div className="stamp" aria-hidden="true">
              <img
                src={InsideLogo}
                className="rp-_icon step-_icon"
                alt="Leesman inside icon"
                title="Leesman inside icon"
              ></img>
            </div>
          </div>
        </div>

        <div className="form-_actions min-h-366">
          <p>Hi, welcome to Leesman Inside.</p>

          <div className="row justify-content-center pb-5">
            <div className="col-12 pb-5">
              <p className="intro-_text">
                This is your space to provide ongoing feedback on your daily
                experience – wherever you’re working!
              </p>

              <p className="intro-_text">
                By joining the community, your voice can help shape better
                places for you to work.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Stats step={1} {...props} />
    </>
  )
}

const Intro2 = (props) => {
  return (
    <>
      <div className="multi-_step">
        <div className="row clearfix step-_header">
          <div className="col text-left">
            <h2 className="h4 m-0 font-600">Get inside</h2>
          </div>
          <div className="col-auto">
            <div className="stamp" aria-hidden="true">
              <img
                src={InsideLogo}
                className="rp-_icon step-_icon"
                alt="Leesman inside icon"
                title="Leesman inside icon"
              ></img>
            </div>
          </div>
        </div>

        <div className="form-_actions min-h-366">
          <div className="row justify-content-center pb-5">
            <div className="col-12 pb-5">
              <p className="intro-_text">
                You’ll receive the a few questions, but also feel free to submit
                any comments about your working environments, whenever you think
                we need to know about them.
              </p>

              <p className="intro-_text">
                First, we need to get to know you by creating your profile. It
                won’t take long and you can always come back and edit your
                details later.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Stats step={2} {...props} />
    </>
  )
}

const Account = (props) => {
  return (
    <>
      <div className="multi-_step">
        <div className="row clearfix step-_header">
          <div className="col text-left">
            <h2 className="h4 m-0 font-600">Create your account</h2>
          </div>
          <div className="col-auto">
            <div className="stamp" aria-hidden="true">
              <img
                src={InsideLogo}
                className="rp-_icon step-_icon"
                alt="Leesman inside icon"
                title="Leesman inside icon"
              ></img>
            </div>
          </div>
        </div>

        <div className="form-_actions min-h-366">
          <p>Tell us more about you</p>

          {/* !!!!ARTIK SEÇİLMEYEN SEÇENEKLER DİREK GÖSTERMEMEK DEĞİL DE "disabled" ETİKETİ ALACAK
                !!!!ÖRNEK OLARAK İLK INPUT MESELA "disabled" ETİKETİ VERİLDİ */}
          <div className="row justify-content-center pb-5">
            <div className="col-12 pb-15">
              <Input
                placeholder="First name"
                name="first_name"
                onChange={props.handleUserData}
                value={
                  props.userData.first_name
                    ? props.userData.first_name
                    : props.data.user
                    ? props.data.user.first_name
                    : ""
                }
                style={{ width: 200 }}
              />
            </div>
            <div className="col-12 pb-15">
              <Input
                placeholder="Last name"
                name="last_name"
                onChange={props.handleUserData}
                value={
                  props.userData.last_name
                    ? props.userData.last_name
                    : props.data.user
                    ? props.data.user.last_name
                    : ""
                }
                style={{ width: 200 }}
              />
            </div>
            {props.getOptions("DEMO_AGE").length > 0 && (
              <div className="col-12 pb-15">
                <Select
                  aria-label="Age selection; please swipe once more and then double tap to open the list."
                  getPopupContainer={(trigger) => trigger.parentElement}
                  optionFilterProp="children"
                  placeholder="Age"
                  style={{ width: 200 }}
                  onChange={(e) => {
                    props.handleSelections("DEMO_AGE", "single", e)
                  }}
                  value={props.getSelected("DEMO_AGE")[0]}
                >
                  {props.getOptions("DEMO_AGE").map((item) => {
                    return (
                      <Option
                        title={item.option_label}
                        aria-label={item.option_label}
                        tabIndex={0}
                        value={item.option_id}
                      >
                        {item.option_label}
                      </Option>
                    )
                  })}
                </Select>
              </div>
            )}
            {props.getOptions("DEMO_GEN").length > 0 && (
              <div className="col-12">
                <Select
                  aria-label="Gender selection; please swipe once more and then double tap to open the list."
                  getPopupContainer={(trigger) => trigger.parentElement}
                  optionFilterProp="children"
                  placeholder="Gender"
                  style={{ width: 200 }}
                  onChange={(e) => {
                    props.handleSelections("DEMO_GEN", "single", e)
                  }}
                  value={props.getSelected("DEMO_GEN")[0]}
                >
                  {props.getOptions("DEMO_GEN").map((item) => {
                    return (
                      <Option
                        title={item.option_label}
                        aria-label={item.option_label}
                        tabIndex={0}
                        value={item.option_id}
                      >
                        {item.option_label}
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
        step={3}
        {...props}
        disabled={
          (props.getOptions("DEMO_GEN").length > 0 &&
            props.getSelected("DEMO_GEN").length < 1) ||
          (props.getOptions("DEMO_AGE").length > 0 &&
            props.getSelected("DEMO_AGE").length < 1)
        }
      />
    </>
  )
}

const SelectLocation = (props) => {
  const [location, setLocation] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)
  console.log(props.step, props.totalSteps)
  useEffect(() => {
    console.log(
      props.getOptions("DEMO_ACT"),
      props.getOptions("DEMO_HOMESET").length === 0 &&
        props.getOptions("DEMO_PRES").length === 0 &&
        props.getOptions("DEMO_ACT").length === 0
    )

    setIsSubmit(
      props.getOptions("DEMO_HOMESET").length === 0 &&
        props.getOptions("DEMO_PRES").length === 0 &&
        props.getOptions("DEMO_ACT").length === 0
    )

    // setLocation(props.getOptions("DEMO_LOC").filter(i => i.option_id === props.getSelected("DEMO_LOC")[0])[0]);
  }, [props])

  return (
    <>
      <div className="multi-_step">
        <div className="row clearfix step-_header">
          <div className="col text-left">
            <h2 className="h4 m-0 font-600">Create your account</h2>
          </div>
          <div className="col-auto">
            <div className="stamp" aria-hidden="true">
              <img
                src={InsideLogo}
                className="rp-_icon step-_icon"
                alt="Leesman inside icon"
                title="Leesman inside icon"
              ></img>
            </div>
          </div>
        </div>

        <div className="form-_actions min-h-366">
          <p>Tell us about your work</p>

          <div className="row justify-content-center pb-5">
            {props.getOptions("DEMO_ROLE").length > 0 && (
              <div className="col-12 pb-15">
                <Select
                  aria-label="Role selection; please swipe once more and then double tap to open the list."
                  getPopupContainer={(trigger) => trigger.parentElement}
                  optionFilterProp="children"
                  placeholder="Role"
                  style={{ width: 200 }}
                  onChange={(e) => {
                    props.handleSelections("DEMO_ROLE", "single", e)
                  }}
                  value={props.getSelected("DEMO_ROLE")[0]}
                >
                  {props.getOptions("DEMO_ROLE").map((item) => {
                    return (
                      <Option
                        title={item.option_label}
                        aria-label={item.option_label}
                        tabIndex={0}
                        value={item.option_id}
                      >
                        {item.option_label}
                      </Option>
                    )
                  })}
                </Select>
              </div>
            )}

            {props.getOptions("DEMO_EMP").length > 0 && (
              <div className="col-12 pb-15">
                <Select
                  aria-label="Employment type selection; please swipe once more and then double tap to open the list."
                  getPopupContainer={(trigger) => trigger.parentElement}
                  optionFilterProp="children"
                  placeholder="Employment type"
                  style={{ width: 200 }}
                  onChange={(e) => {
                    props.handleSelections("DEMO_EMP", "single", e)
                  }}
                  value={props.getSelected("DEMO_EMP")[0]}
                >
                  {props.getOptions("DEMO_EMP").map((item) => {
                    return (
                      <Option
                        title={item.option_label}
                        aria-label={item.option_label}
                        tabIndex={0}
                        value={item.option_id}
                      >
                        {item.option_label}
                      </Option>
                    )
                  })}
                </Select>
              </div>
            )}

            {props.getOptions("DEMO_TIME").length > 0 && (
              <div className="col-12 pb-15">
                <Select
                  aria-label="Time with organisation selection; please swipe once more and then double tap to open the list."
                  getPopupContainer={(trigger) => trigger.parentElement}
                  optionFilterProp="children"
                  placeholder="Time with organisation"
                  style={{ width: 200 }}
                  onChange={(e) => {
                    props.handleSelections("DEMO_TIME", "single", e)
                  }}
                  value={props.getSelected("DEMO_TIME")[0]}
                >
                  {props.getOptions("DEMO_TIME").map((item) => {
                    return (
                      <Option
                        title={item.option_label}
                        aria-label={item.option_label}
                        tabIndex={0}
                        value={item.option_id}
                      >
                        {item.option_label}
                      </Option>
                    )
                  })}
                </Select>
              </div>
            )}
            <div className="col-12 pb-15">
              <Select
                aria-label="Department selection; please swipe once more and then double tap to open the list."
                getPopupContainer={(trigger) => trigger.parentElement}
                optionFilterProp="children"
                placeholder="Department"
                style={{ width: 200 }}
                name="department_id"
                value={props.userData.department_id}
                onChange={(e) => {
                  props.setUserData((pre) => {
                    return { ...pre, department_id: e }
                  })
                }}
              >
                {props.data.departments &&
                  props.data.departments.map((item) => {
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
            <div className="col-12 pb-15">
              <Select
                aria-label="Main office location selection; please swipe once more and then double tap to open the list."
                getPopupContainer={(trigger) => trigger.parentElement}
                optionFilterProp="children"
                placeholder="Main office location"
                style={{ width: 200 }}
                value={props.userData.location_id}
                name="location_id"
                onChange={(e) => {
                  props.setUserData((pre) => {
                    return { ...pre, location_id: e }
                  })
                }}
              >
                {props.data.locations &&
                  props.data.locations.map((item) => {
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
            {/* )} */}
          </div>
        </div>
      </div>
      <div className="bottom">
        <button
          className="mb-0 float-l btn btn-default"
          onClick={props.previousStep}
        >
          Back
        </button>
        <button
          className="mb-0 float-r btn btn-primary"
          disabled={
            (props.getOptions("DEMO_ROLE").length > 0 &&
              props.getSelected("DEMO_ROLE").length < 1) ||
            (props.getOptions("DEMO_EMP").length > 0 &&
              props.getSelected("DEMO_EMP").length < 1) ||
            (props.getOptions("DEMO_TIME").length > 0 &&
              props.getSelected("DEMO_TIME").length < 1) ||
            (location &&
              location.option_label === "Office" &&
              !props.userData.location_id) ||
            !props.userData.department_id
          }
          onClick={
            !isSubmit
              ? props.nextStep
              : () => {
                  props.send()
                  props.lastStep()
                }
          }
        >
          {!isSubmit ? "Next" : "Submit"}
        </button>
      </div>
    </>
  )
}

const HomeWorking = (props) => {
  const [isSubmit, setIsSubmit] = useState(false)
  console.log(props.step, props.totalSteps)
  useEffect(() => {
    console.log(props.getOptions("DEMO_ACT"))
    props.getOptions("DEMO_ACT").length === 0 && setIsSubmit(true)
    if (
      props.getOptions("DEMO_HOMESET").length === 0 &&
      props.getOptions("DEMO_PRES").length === 0
    ) {
      props.nextStep()
    }
  }, [props])

  function handleSpecial(e) {
    const { name, value } = e.target
    let arr = props.selections
    console.log(name, value)
    const v = parseInt(value)
    const options = props.getOptions("DEMO_PRES")
    const noone_id = options.filter((i) => i.option_label === "No one")[0]
      .option_id
    const nwfh = options.filter(
      (i) => i.option_label === "I never work from home"
    )[0].option_id

    if (v === noone_id || v === nwfh) {
      options.forEach((item) => {
        arr = arr.filter((i) => i !== item.option_id)
      })
      arr.push(v)
    } else {
      arr = arr.filter((i) => i !== nwfh).filter((i) => i !== noone_id)

      if (props.selections.includes(v)) {
        arr = arr.filter((i) => i !== v)
      } else {
        arr.push(v)
      }
    }
    props.setSelections([...arr])
  }

  return (
    <>
      <div className="multi-_step">
        <div className="row clearfix step-_header">
          <div className="col text-left">
            <h2 className="h4 m-0 font-600">Create your account</h2>
          </div>
          <div className="col-auto">
            <div className="stamp" aria-hidden="true">
              <img
                src={InsideLogo}
                className="rp-_icon step-_icon"
                alt="Leesman inside icon"
                title="Leesman inside icon"
              ></img>
            </div>
          </div>
        </div>

        <div className="form-_actions min-h-366">
          {props.getOptions("DEMO_HOMESET").length > 0 && (
            <>
              <p>Tell us about your home working environment</p>

              <div className="row justify-content-center">
                <div className="col-12 pb-15">
                  <Select
                    aria-label="Home work setting selection; please swipe once more and then double tap to open the list."
                    getPopupContainer={(trigger) => trigger.parentElement}
                    optionFilterProp="children"
                    placeholder="Home work setting"
                    style={{ width: 200 }}
                    onChange={(e) => {
                      props.handleSelections("DEMO_HOMESET", "single", e)
                    }}
                    value={props.getSelected("DEMO_HOMESET")[0]}
                    disabled={props.getOptions("DEMO_HOMESET").length < 1}
                  >
                    {props.getOptions("DEMO_HOMESET").map((item) => {
                      return (
                        <Option
                          title={item.option_label}
                          aria-label={item.option_label}
                          tabIndex={0}
                          value={item.option_id}
                        >
                          {item.option_label}
                        </Option>
                      )
                    })}
                  </Select>
                </div>
              </div>
            </>
          )}

          {props.getOptions("DEMO_PRES").length > 0 && (
            <>
              <p>When working from home, who is usually present?</p>

              <div className="row justify-content-center pb-5">
                <div className="col-12 pb-15">
                  <div className="form-group">
                    {props.getOptions("DEMO_PRES").map((item) => {
                      return (
                        <label
                          className="fancy-checkbox account-checkbox-form"
                          htmlFor={item.option_id}
                        >
                          <input
                            type="checkbox"
                            checked={props.selections.includes(item.option_id)}
                            value={item.option_id}
                            id={item.option_id}
                            onChange={handleSpecial}
                            name="presence_of_others"
                          />
                          <span className="light-black">
                            {item.option_label}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="bottom">
        <button
          className="mb-0 float-l btn btn-default"
          onClick={props.previousStep}
        >
          Back
        </button>
        <button
          className="mb-0 float-r btn btn-primary"
          onClick={
            !isSubmit
              ? props.nextStep
              : () => {
                  props.send()
                  props.lastStep()
                }
          }
        >
          {!isSubmit ? "Next" : "Submit"}
        </button>
      </div>
    </>
  )
}

const Activities = (props) => {
  console.log(props.selections)
  function handleSpecial(e) {
    const { value } = e.target
    const v = parseInt(value)
    let arr = props.selections
    if (props.selections.includes(v)) {
      arr = arr.filter((i) => i !== v)
    } else {
      arr.push(v)
    }
    props.setSelections([...arr])
  }

  return (
    <>
      <div className="multi-_step">
        <div className="row clearfix step-_header">
          <div className="col text-left">
            <h2 className="h4 m-0 font-600">Create your account</h2>
          </div>
          <div className="col-auto">
            <div className="stamp" aria-hidden="true">
              <img
                src={InsideLogo}
                className="rp-_icon step-_icon"
                alt="Leesman inside icon"
                title="Leesman inside icon"
              ></img>
            </div>
          </div>
        </div>

        <div className="form-_actions min-h-366 scrollable-_-366">
          <p>
            Finally, which activities are important to your role? Select all
            that apply.
          </p>

          <div className="row justify-content-center pb-5">
            <div className="col-12 pb-15">
              <div className="form-group">
                {props.selections &&
                  props
                    .getOptions("DEMO_ACT")
                    .sort((a, b) => {
                      if (a.option_label < b.option_label) return -1
                      if (a.option_label > b.option_label) return 1
                      return 0
                    })
                    .map((item) => {
                      return (
                        <label
                          className="fancy-checkbox account-checkbox-form"
                          htmlFor={item.option_id}
                        >
                          <input
                            type="checkbox"
                            value={item.option_id}
                            id={item.option_id}
                            checked={props.selections.includes(item.option_id)}
                            onChange={(e) => {
                              handleSpecial(e)
                            }}
                            name="important_activities"
                          />
                          <span className="light-black">
                            {item.option_label}
                          </span>
                        </label>
                      )
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <button
          className="mb-0 float-l btn btn-default"
          onClick={props.previousStep}
        >
          Back
        </button>
        <button
          className="mb-0 float-r btn btn-primary"
          disabled={
            props.getOptions("DEMO_ACT").length > 0 &&
            props.getSelected("DEMO_ACT").length < 1
          }
          onClick={() => {
            props.send()
            props.lastStep()
          }}
        >
          Submit
        </button>
      </div>
    </>
  )
}

const ThankYou = (props) => {
  return (
    <>
      <div className="multi-_step">
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
                src={SetupOk}
                alt="You're done"
                title="You're done"
              ></img>
            </div>
          </div>
          <p className="text-centerr">
            Thanks for setting up your account!
            <br />
            You are now ready to give us your feedback
          </p>

          <div className="row justify-content-center text-centerr pb-5">
            <div className="col-12">
              <Link className="btn btn-primary more-_q" to="share-thinking">
                Give feedback
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <Stats step={4} {...props} /> */}
    </>
  )
}

// MULTI STEP WIZARD
const Wizard = ({ setBgImage }) => {
  sessionStorage.setItem("isTour", "true")

  useEffect(() => {
    setBgImage("other-image")
    console.log("Image changed!!!")
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
  const [data, setData] = useState([])
  const [userData, setUserData] = useState([])
  const [selections, setSelections] = useState([])

  useEffect(() => {
    getData()
  }, [])

  function getData() {
    axios
      .get("/demographics")
      .then((res) => {
        console.log(res.data.result)
        setData(res.data.result)
        setSelections(res.data.result.answers)
        setUserData(res.data.result.user)
      })
      .catch((err) => console.log(err))
  }
  function handleSelections(heading, type, e) {
    let arr = selections
    let value = parseInt(e)
    if (type === "multiple") {
      if (selections.includes(value)) {
        arr = arr.filter((i) => i !== value)
      } else {
        arr.push(value)
      }
    } else if (type === "single") {
      getOptions(heading)
        .map((i) => i.option_id)
        .map((item) => {
          arr = arr.filter((i) => i !== item)
        })
      arr.push(value)
    }

    console.log(arr)
    setSelections(arr)
  }
  function handleUserData(e) {
    const { name, value } = e.target

    setUserData((pre) => {
      return { ...pre, [name]: value.capitalize() }
    })
  }
  function getOptions(Code) {
    if (!data.demos) {
      return []
    } else {
      return data.demos
        .filter((i) => i.code === Code)[0]
        .options.filter((i) => data.enabledOptions.includes(i.option_id))
        .sort((a, b) => {
          if (a.position < b.position) return -1
          if (a.position > b.position) return 1
          return 0
        })
    }
  }
  function getSelected(Code) {
    if (!data.demos) {
      return []
    } else {
      let selects = []
      getOptions(Code).forEach((item) => {
        if (selections.includes(item.option_id)) {
          selects.push(item.option_id)
        }
      })

      return selects
    }
  }
  function send() {
    Promise.all([
      axios.post("/account", {
        answers: selections.map((i) => {
          return { answer: i }
        }),
      }),
      axios.put("/account", userData),
    ])
      .then((val) => {
        console.log(val)
        notification.success({ message: "Profile updated!" })
      })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <div className="auth-main particles_js responder-form-center multi-_steps">
        <div className="auth_div responder-intro-card text-leftt">
          <div className="card">
            <div className="body">
              <StepWizard
                isHashEnabled
                transitions={state.transitions}
                nav={<Steps />}
                isLazyMount={true}
              >
                <Intro1 />
                <Intro2 />
                <Account
                  data={data}
                  userData={userData}
                  handleUserData={handleUserData}
                  handleSelections={handleSelections}
                  getOptions={getOptions}
                  getSelected={getSelected}
                />
                <SelectLocation
                  data={data}
                  userData={userData}
                  handleUserData={handleUserData}
                  handleSelections={handleSelections}
                  getOptions={getOptions}
                  getSelected={getSelected}
                  setUserData={setUserData}
                  send={send}
                />
                {((data.enabledOptions &&
                  getOptions("DEMO_HOMESET").length > 0) ||
                  (data.enabledOptions &&
                    getOptions("DEMO_PRES").length > 0)) && (
                  <HomeWorking
                    data={data}
                    handleSelections={handleSelections}
                    selections={selections}
                    setSelections={setSelections}
                    getOptions={getOptions}
                    getSelected={getSelected}
                    send={send}
                  />
                )}
                {data.enabledOptions && getOptions("DEMO_ACT").length > 0 && (
                  <Activities
                    data={data}
                    selections={selections}
                    selectionLength={selections.length}
                    setSelections={setSelections}
                    handleSelections={handleSelections}
                    getOptions={getOptions}
                    getSelected={getSelected}
                    send={send}
                  />
                )}
                <ThankYou></ThankYou>
              </StepWizard>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  bgImage: state.settings.bgImage,
})

const mapDispatchToProps = (dispatch) => ({
  setBgImage: (e) => dispatch(setBgImage(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Wizard)

const Stats = ({ nextStep, previousStep, totalSteps, step, disabled }) => (
  <div className="bottom">
    {step > 1 ? (
      <button className="mb-0 float-l btn btn-default" onClick={previousStep}>
        Back
      </button>
    ) : (
      ""
    )}
    {step < totalSteps ? (
      <button
        className="mb-0 float-r btn btn-primary"
        disabled={disabled}
        onClick={nextStep}
      >
        Next
      </button>
    ) : (
      <Link className="mb-0 float-r btn btn-primary" to="/">
        Submit
      </Link>
    )}
  </div>
)

import React, { useState, useEffect, useLayoutEffect } from "react"
import { Link } from "react-router-dom"
import StepWizard from "react-step-wizard"
import ProgressBar from "react-customizable-progressbar"
import ResponderXPBar from "../../common/charts/responderXP"
import { notification, Spin } from "antd"
import { connect } from "react-redux"
import { setBgImage } from "../../../actions/settingsAction"
import HandOk from "../../../assets/images/hand-ok.png"
import axios from "axios"
import moment from "moment"
import NoData from "../../common/noData"

// Navbar
const Steps = (props) => {
  const dots = []
  for (let i = 1; i <= props.totalSteps; i += 1) {
    const isActive = props.currentStep === i
    dots.push(
      <span
        key={`step-${i}`}
        className={`step-_dot ${isActive ? "step-_active" : ""}`}
        title="Dot of step"
      >
        &bull;
      </span>
    )
  }

  return (
    <div className="step-_nav" aria-hidden="true">
      {dots}
    </div>
  )
}

// STEPS
const Question = (props) => {
  const [score, setScore] = useState()
  function change(e) {
    setScore(e.target.value)
  }
  const send = () => {
    var now = moment()
    var formatted = now.format("YYYY-MM-DD HH:mm:ss Z")
    let data = {
      score: parseInt(score),
      created_at: formatted,
    }

    if (!score) {
      notification.warning({ message: "Please select how do you feel" })
    } else {
      axios
        .post("/xp", data)
        .then((res) => {
          props.setAvg(res.data.avg)
          props.setDonut(res.data.donut)
          props.goToStep(2)
          sessionStorage.setItem("xpAnswered", "true")
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
  return (
    <>
      <div className="multi-_step">
        <div className="row clearfix step-_header">
          <div className="col text-left">
            <h2 className="h4 m-0 font-600">Rate your XP</h2>
          </div>
          <div className="col-auto">
            <div className="stamp" aria-hidden="true">
              <i className="icon-rp-raterspo step-_icon"></i>
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

        <div className="form-_actions min-h-366">
          <p>
            Thinking about the place/s you use for work, how would you rate your
            overall experience?
          </p>

          <div className="row justify-content-center pb-5">
            {/* !!! İFADE SEÇİMİ DEĞİŞTİ !!!*/}
            <div className="col-12 pb-5">
              <input
                onChange={change}
                value="-2"
                className="checkbox-tools"
                type="radio"
                name="xp"
                id="1"
              />
              <label className="for-checkbox-tools" htmlFor="1">
                <i
                  className="icon_f-very-badicon_f- uil rate-first"
                  aria-hidden="true"
                ></i>
                <small className="emoji-screen-reader">Very bad</small>
              </label>
              <input
                onChange={change}
                value="-1"
                className="checkbox-tools"
                type="radio"
                name="xp"
                id="2"
              />
              <label className="for-checkbox-tools" htmlFor="2">
                <i
                  className="icon_f-badicon_f- uil rate-2"
                  aria-hidden="true"
                ></i>
                <small className="emoji-screen-reader">Bad</small>
              </label>
              <input
                onChange={change}
                value="0"
                className="checkbox-tools"
                type="radio"
                name="xp"
                id="3"
              />
              <label className="for-checkbox-tools" htmlFor="3">
                <i
                  className="icon_f-neutralicon_f- uil rate-3"
                  aria-hidden="true"
                ></i>
                <small className="emoji-screen-reader">Normal</small>
              </label>
              <input
                onChange={change}
                value="1"
                className="checkbox-tools"
                type="radio"
                name="xp"
                id="4"
              />
              <label className="for-checkbox-tools" htmlFor="4">
                <i
                  className="icon_f-goodicon_f- uil rate-4"
                  aria-hidden="true"
                ></i>
                <small className="emoji-screen-reader">Good</small>
              </label>
              <input
                onChange={change}
                value="2"
                className="checkbox-tools"
                type="radio"
                name="xp"
                id="5"
              />
              <label className="for-checkbox-tools" htmlFor="5">
                <i
                  className="icon_f-very-goodicon_f- uil rate-_last"
                  aria-hidden="true"
                ></i>
                <small className="emoji-screen-reader">Very good</small>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom text-centerr">
        <button
          disabled={!score}
          className="mb-0 btn btn-_submit"
          onClick={send}
        >
          Submit
        </button>
      </div>
      {/* <Stats step={1} {...props} /> */}
    </>
  )
}

const Result = (props) => {
  const submit = () => {
    alert("Form başarıyla gönderildi!") // eslint-disable-line
  }

  return (
    <>
      <div className="multi-_step">
        <div className="row clearfix step-_header">
          <div className="col text-left">
            <h2 className="h4 m-0 font-600">Thanks!</h2>
          </div>
          <div className="col-auto">
            <div className="stamp" aria-hidden="true">
              <img
                className="rp-_icon step-_icon"
                src={HandOk}
                alt="Okey icon"
                title="Okey icon"
              ></img>
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

        <div className="form-_actions min-h-366">
          <p>
            Each time you rate your own experience you’re contributing to your
            company’s overall XP Score. Keep it up.
          </p>

          {props && props.avg > 0.0 ? (
            <div className="row row-_reset">
              <div className="col-4 col-lg-4 donut-respo">
                <span className="res-_chart-title let-_width">
                  Company XP Score
                </span>

                <div
                  className="donut-new donut-new-main"
                  style={{ height: "120px" }}
                >
                  {/* '#bf1717', '#e95c0c', '#292b2b', '#63b450', '#119336' */}
                  <ProgressBar
                    radius={50}
                    progress={parseFloat(props.avg).toFixed(1)}
                    strokeWidth={4}
                    strokeColor="#119336"
                    strokeLinecap="square"
                    trackStrokeColor="#bcbec0"
                    trackStrokeWidth={4}
                    transition="0.3s ease"
                    initialAnimation={true}
                  >
                    <div className="indicator">
                      <div>{parseFloat(props.avg).toFixed(1)}</div>
                    </div>
                  </ProgressBar>
                </div>
              </div>

              <div className="col-8 col-lg-8 info-respo">
                <span className="res-_chart-title">
                  Company XP Score breakdown
                </span>
                <ResponderXPBar data={props.donut} />
              </div>
            </div>
          ) : props.loading ? (
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <Spin size="large"></Spin>
            </div>
          ) : (
            <NoData fontColor="black"></NoData>
          )}
        </div>
      </div>
      <Stats step={2} {...props} nextStep={submit} />
    </>
  )
}

// MULTI STEP WIZARD
const Wizard = ({ setBgImage, openFullScreen, reduxClient }) => {
  const [score, setScore] = useState(0)
  const [avg, setAvg] = useState([])
  const [donut, setDonut] = useState([])
  const [loading, setLoading] = useState(true)
  const xpAnswered = sessionStorage.getItem("xpAnswered")
    ? JSON.parse(sessionStorage.getItem("xpAnswered"))
    : false
  console.log(xpAnswered)
  useLayoutEffect(() => {
    getAvg()
    setBgImage("rate-image")
  }, [])
  const getAvg = () => {
    axios
      .get("/xp")
      .then((res) => {
        setAvg(res.data.avg)
        setDonut(res.data.donut)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

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
    // console.log(stats);
  }

  return (
    <>
      <div className="auth-main particles_js responder-form-center multi-_steps">
        <div className="auth_div responder-intro-card text-leftt">
          <div className="card">
            <div className="body">
              <StepWizard
                onStepChange={onStepChange}
                isHashEnabled
                transitions={state.transitions}
                nav={<Steps />}
                isLazyMount={true}
              >
                {!xpAnswered && (
                  <Question
                    setAvg={setAvg}
                    setDonut={setDonut}
                    updateLink={openFullScreen}
                  />
                )}
                <Result
                  loading={loading}
                  client={reduxClient}
                  avg={avg}
                  donut={donut}
                  updateLink={openFullScreen}
                />
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
  openFullScreen: state.settings.openFullScreen,
  reduxClient: state.client,
})

const mapDispatchToProps = (dispatch) => ({
  setBgImage: (e) => dispatch(setBgImage(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Wizard)

// BUTTONS
const Stats = ({ nextStep, totalSteps, step, updateLink, client }) => (
  <div className="bottom">
    {step < totalSteps ? (
      <button className="mb-0 float-r btn btn-primary" onClick={nextStep}>
        Submit
      </button>
    ) : (
      <>
        <Link
          className="mb-0 float-l btn btn-default"
          to={updateLink ? "/responder-home" : "/"}
        >
          Back to homepage
        </Link>
        {client.enable_feedbacks && (
          <Link className="mb-0 float-r btn btn-primary" to="/share-thinking">
            Share a comment
          </Link>
        )}
      </>
    )}
  </div>
)

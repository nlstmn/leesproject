import React, { useState, useContext, useEffect } from "react"
import { connect } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import Tour from "reactour"
import { notification, Tooltip } from "antd"
import axios from "axios"
import { reset } from "../../actions/demographics"
import { AuthContext } from "../../context/auth"
import {
  setBgImage,
  setLightTheme,
  setOffcanvas,
  setLoginBackground,
} from "../../actions/settingsAction"

const steps = [
  {
    selector: '[data-tour="my-first-step"]',
    content: ({ goTo, inDOM }) => (
      <div>
        <strong>Do we need to know about something?</strong>
        <br />
        Provide comments on anything to do with your working environments here
      </div>
    ),
    position: "top",
    action: (node) => {
      node.focus()
      console.log("yup, the target element is also focused!")
    },
    style: {
      backgroundColor: "#fff",
      borderRadius: ".25rem",
      color: "#000000",
    },
    stepInteraction: false,
    navDotAriaLabel: "Go to step 1",
  },
  {
    selector: '[data-tour="my-second-step"]',
    content: ({ goTo, inDOM }) => (
      <div>
        <strong>
          We’ll occasionally nudge you to answer the a few questions.
        </strong>
        <br />
        Here is where you can give your responses
      </div>
    ),
    position: "bottom",
    action: (node) => {
      node.focus()
      console.log("yup, the target element is also focused!")
    },
    style: {
      backgroundColor: "#fff",
      borderRadius: ".25rem",
      color: "#000000",
    },
    stepInteraction: false,
    navDotAriaLabel: "Go to step 2",
  },
  {
    selector: '[data-tour="my-third-step"]',
    content: ({ goTo, inDOM }) => (
      <div>
        <strong>
          Come here to rate your overall experience on a weekly basis
        </strong>
      </div>
    ),
    position: "bottom",
    action: (node) => {
      node.focus()
      console.log("yup, the target element is also focused!")
    },
    style: {
      backgroundColor: "#fff",
      borderRadius: ".25rem",
      color: "#000000",
    },
    stepInteraction: false,
    navDotAriaLabel: "Go to final step",
  },
]

const ResponderHome = ({
  demographics,
  user,
  resetDemographics,
  setBgImage,
  setLightTheme,
  reduxClient,
}) => {
  const history = useHistory()
  // ACCOUNT MODAL İÇİN EKLENENLER
  const auth = useContext(AuthContext)
  const role = auth.role

  // Commented for further usage
  // const loggedIn = !! auth.user.signInUserSession
  // TEMPORARY, ONE TIME TOUR FUNCTIONS
  // FIRST DATA IN INTRO.JS; sessionStorage.setItem("isTour", "true")

  const [isTourOpen, setIsTourOpen] = useState(sessionStorage.getItem("isTour"))
  const [tourStep, setTourStep] = useState(0)
  const [data, setData] = useState([])
  const [userData, setUserData] = useState([])
  const [client, setClient] = useState([])

  useEffect(() => {
    setBgImage("home-image")
    setOffcanvas(false)
    setLightTheme(true)
    setLoginBackground(false)
    console.log("Image changed!!!")
    getDatas()
  }, [])
  useEffect(() => {
    setClient(reduxClient)
  }, [reduxClient])

  function getDatas() {
    Promise.all([axios.get("/demographics")])
      .then((value) => {
        console.log(value)
        setData(value[0].data.result)
        const user_ = value[0].data.result.user
        console.log(value[0].data.result.user)
        setUserData(value[0].data.result.user)
        sessionStorage.setItem("xpAnswered", value[0].data.result.xpAnswered)

        console.log(role)
        if (!user_.first_name) {
          console.log(user_)
          history.push("/setup")
        } else {
          // notification.success({
          //   message:
          //     "Looks like it is not your first time. Intro is passed. If you want, you can see the intro again (for tests)",
          //   className: "cursorp",
          //   onClick: () => {
          //     console.log("button pressed");
          //     sessionStorage.setItem("isTour", false);
          //     history.push("/setup");
          //   },
          //   duration: 0
          // });
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function closeTour(e) {
    const { value } = e
    setIsTourOpen((pre) => {
      return {
        ...pre,
        isTour: value,
      }
    })
    sessionStorage.setItem("isTour", value)
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
        if (data.answers.includes(item.option_id)) {
          selects.push(item.option_id)
        }
      })

      return selects
    }
  }
  useEffect(() => {
    data.demos && checkMissing()
    console.log(data)
    console.log(userData)
  }, [data, userData])
  function checkMissing() {
    let check = data.demos.map((i, index) => {
      return {
        heading: data.demos[index].heading,
        selections: getSelected(i.code).length,
        options: getOptions(i.code).filter((o) =>
          data.enabledOptions.includes(o.option_id)
        ).length,
        code: data.demos[index].code,
      }
    })
    console.log(check)
    let missingHeadings = check.map((item) => {
      if (item.options > 0 && item.selections === 0) {
        return item
      }
    })
    console.log(missingHeadings)
    if (
      missingHeadings
        .filter((i) => i)
        .filter(
          (i) =>
            i.code !== "DEMO_HOMESET" &&
            i.code !== "DEMO_PRES" &&
            i.code !== "DEMO_LOC"
        ).length > 0 ||
      !data.user.department_id ||
      !data.user.location_id
    ) {
      let notifyMessage =
        "Missing profile data: " +
        missingHeadings
          .filter((i) => i)
          .filter(
            (i) =>
              i !== "DEMO_HOMESET" &&
              i.code !== "DEMO_PRES" &&
              i.code !== "DEMO_LOC"
          )
          .map((i) => i.heading)
      notifyMessage += !data.user.department_id ? " Department" : ""
      notifyMessage += !data.user.location_id ? " Location" : ""

      if (userData.first_name) {
        !role && history.push("/my-account")
        notification.warning({ message: notifyMessage })
      }
    }
  }
  return (
    <>
      {isTourOpen === "true" && (
        <Tour
          getCurrentStep={(curr) => setTourStep(curr + 1)}
          closeWithMask={tourStep >= 3 ? true : false}
          steps={steps}
          isOpen={isTourOpen === "true" ? true : false}
          onRequestClose={() => closeTour("false")}
          showButtons={true}
          accessibilityOptions={{
            closeButtonAriaLabel: "Close tour",
          }}
        />
      )}
      <div className="auth-main particles_js responder-form-center rp-_main">
        <div className="auth_div responder-intro-card responder-_home">
          <div className="row clearfix">
            <div className="col-12">
              <div className="info-_content">
                <h1 className="info-title">
                  Change starts from
                  <br /> the inside
                </h1>
                <p>
                  Our platform gives you a powerful voice and your company a way
                  to listen and shape better places for you to work.
                </p>
              </div>
            </div>
            {client.enable_feedbacks && (
              <div className="col-6 col-md-4 col-xl-2">
                <Tooltip
                  placement="bottom"
                  title={
                    <p>
                      <strong>Do we need to know about something?</strong>
                      <br /> Provide comments on anything to do with your
                      working environments here.
                    </p>
                  }
                  overlayClassName="responder-home_tooltip"
                >
                  <Link
                    to="/share-thinking"
                    data-tour="my-first-step"
                    className="card rp-home-btn"
                  >
                    <div className="body ribbon">
                      <div className="my_sort_cut">
                        <i className="irr-commenttv"></i>
                        <span>Share a comment</span>
                      </div>
                    </div>
                  </Link>
                </Tooltip>
              </div>
            )}
            {client.enable_questions && (
              <div className="col-6 col-md-4 col-xl-2">
                <Tooltip
                  placement="bottom"
                  title={
                    <p>
                      <strong>
                        We’ll occasionally nudge you to answer a few questions.
                      </strong>
                      <br /> Here is where you can give your responses.
                    </p>
                  }
                  overlayClassName="responder-home_tooltip"
                >
                  <Link
                    to="/answer-question"
                    data-tour="my-second-step"
                    className="card rp-home-btn"
                  >
                    <div className="body">
                      <div className="my_sort_cut">
                        <i className="irr-questionnv"></i>
                        <span>Answer a question</span>
                      </div>
                    </div>
                  </Link>
                </Tooltip>
              </div>
            )}
            {client.enable_xp && (
              <div className="col-6 col-md-4 col-xl-2">
                <Tooltip
                  placement="bottom"
                  title={
                    <p>
                      <strong>
                        {data.xpAnswered
                          ? "Looks like you already rated your XP this week. Come again next week."
                          : "Come here to rate your overall experience on a weekly basis."}
                      </strong>
                    </p>
                  }
                  overlayClassName="responder-home_tooltip"
                >
                  <Link
                    to={"/rate-my-xp"}
                    data-tour="my-third-step"
                    className="card rp-home-btn"
                  >
                    <div className="body ribbon">
                      <div className="my_sort_cut">
                        <i className="irr-xppv"></i>
                        <span>Rate your XP</span>
                      </div>
                    </div>
                  </Link>
                </Tooltip>
              </div>
            )}
            <div className="col-6 col-md-4 col-xl-2">
              <Tooltip
                placement="bottom"
                title={
                  <p>
                    <strong>
                      Learn more about Leesman Inside, read content and view
                      frequently asked questions.
                    </strong>
                  </p>
                }
                overlayClassName="responder-home_tooltip"
              >
                <a
                  href="https://www.leesmaninside.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card rp-home-btn"
                >
                  <div className="body">
                    <div className="my_sort_cut">
                      <i className="irr-abouttv"></i>
                      <span>More about Leesman Inside</span>
                    </div>
                  </div>
                </a>
              </Tooltip>
            </div>
            <div className="col-12">
              <div className="info-_content gg">
                <p>
                  Leesman is committed to protecting your data. When sharing
                  your feedback and personal information, we ensure all
                  responses are kept anonymous.
                </p>
              </div>
            </div>
          </div>
        </div>
        <span className="leesman-copyright">
          <strong>Powered by Leesman® |</strong>{" "}
          <a
            href="https://www.leesmanindex.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Leesmanindex.com
          </a>
        </span>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  demographics: state.demographics,
  user: state.user,
  bgImage: state.settings.bgImage,
  reduxClient: state.client,
})

const mapDispatchToProps = (dispatch) => ({
  resetDemographics: () => dispatch(reset()),
  setBgImage: (e) => dispatch(setBgImage(e)),
  setLightTheme: (e) => dispatch(setLightTheme(e)),
  setOffcanvas: (e) => dispatch(setOffcanvas(e)),
  setLoginBackground: (e) => dispatch(setLoginBackground(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ResponderHome)

import React from "react"
import { fadeInUp } from "react-animations"
import Radium, { StyleRoot } from "radium"

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
}

const Start = ({ startSurvey }) => {
  return (
    <>
      <div className="content-left create-_survey start">
        <div className="row row-height">
          <div className="col-xl-12 col-lg-12 right-_main">
            <StyleRoot style={styles.fadeInUp}>
              <img
                src="/assets/images/svg-images/leesman_analytics.svg"
                alt=""
                className="img-fluid mb-3"
                width="200"
                height="200"
              />
              <h2>Welcome to the Leesman survey setup form</h2>
              <p>
                The following pages outline the information that we need to
                setup the unique survey for your organisation.
              </p>
              <p>
                When you have entered all the information required, we will
                receive a copy of the setup information.
              </p>
              <p>
                We will then validate and finalise the setup information to
                provide you with a survey URL to test before it is made live.
              </p>

              <div>
                <button
                  onClick={() => startSurvey()}
                  type="submit"
                  className="submit mt-3"
                >
                  Start
                </button>
              </div>
            </StyleRoot>
          </div>
        </div>
      </div>
    </>
  )
}

export default Start

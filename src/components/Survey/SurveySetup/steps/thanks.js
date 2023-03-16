import React from "react"
import { fadeInUp } from "react-animations"
import Radium, { StyleRoot } from "radium"

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
}

const Thanks = () => {
  return (
    <>
      <div className="content-left create-_survey thanks">
        <div className="row row-height">
          <div className="col-xl-12 col-lg-12 right-_main">
            <StyleRoot style={styles.fadeInUp}>
              <h2>Thanks for sharing this!</h2>
              <p>
                Your Leesman point of contact will come back to you within 3
                working days with your survey link to test.
              </p>

              <div>
                <button
                  onClick={() =>
                    window.open("https://www.leesmanindex.com/", "_blank")
                  }
                  target="_blank"
                  className="submit"
                >
                  Leesmanindex.com
                </button>
              </div>
            </StyleRoot>
          </div>
        </div>
      </div>
    </>
  )
}

export default Thanks

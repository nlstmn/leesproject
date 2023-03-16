/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react"
import { connect } from "react-redux"

import ImageHome from "../../assets/images/bg-images/responder-bg.jpg"
import ImageHomeMobile from "../../assets/images/bg-images/responder-bg-mb.jpg"

import ImageFeedback from "../../assets/images/bg-images/feedback-bg.jpg"
import ImageFeedbackMobile from "../../assets/images/bg-images/feedback-bg-mobile.jpg"

import ImageQuestion from "../../assets/images/bg-images/questions-bg.jpg"
import ImageQuestionMobile from "../../assets/images/bg-images/questions-bg-mobile.jpg"

import ImageRate from "../../assets/images/bg-images/rate-bg.jpg"
import ImageRateMobile from "../../assets/images/bg-images/rate-bg-mobile.jpg"

// home-image
// feedback-image
// question-image

const BgImage = ({ bgImage }) => {
  return (
    <>
      {(() => {
        switch (bgImage) {
          case "home-image":
            return (
              <>
                {/* DESKTOP */}
                <div
                  className={`trans--_effect bg-image-desktop bg-zero ${
                    sessionStorage.getItem("isIntroActive") === "true"
                      ? " z-index-99"
                      : "z-index--1"
                  }`}
                  style={{ backgroundImage: `url("${ImageHome}")` }}
                  role="img"
                  aria-label="A woman gives feedback background image"
                ></div>

                {/* MOBILE  */}
                <div
                  className="bg-image-mobile bg-zero"
                  style={{ backgroundImage: `url(${ImageHomeMobile})` }}
                  role="img"
                  aria-label="A woman gives feedback background image"
                ></div>
              </>
            )
          case "feedback-image":
            return (
              <>
                {/* DESKTOP */}
                <div
                  className={`trans--_effect bg-image-desktop-other bg-zero ${
                    sessionStorage.getItem("isIntroActive") === "true"
                      ? " z-index-99"
                      : "z-index--1"
                  }`}
                  style={{ backgroundImage: `url(${ImageFeedback})` }}
                  role="img"
                  aria-label="A man gives feedback background image"
                ></div>

                {/* MOBILE  */}
                <div
                  className={`bg-image-mobile-others bg-zero ${
                    sessionStorage.getItem("isIntroActive") === "true"
                      ? " z-index-99"
                      : "z-index--1"
                  }`}
                  style={{ backgroundImage: `url(${ImageFeedbackMobile})` }}
                  role="img"
                  aria-label="A man gives feedback background image"
                ></div>
              </>
            )
          case "question-image":
            return (
              <>
                {/* DESKTOP */}
                <div
                  className={`trans--_effect bg-image-desktop-other bg-zero ${
                    sessionStorage.getItem("isIntroActive") === "true"
                      ? " z-index-99"
                      : "z-index--1"
                  }`}
                  style={{ backgroundImage: `url(${ImageQuestion})` }}
                  role="img"
                  aria-label="Background image"
                ></div>

                {/* MOBILE  */}
                <div
                  className={`bg-image-mobile-others bg-zero ${
                    sessionStorage.getItem("isIntroActive") === "true"
                      ? " z-index-99"
                      : "z-index--1"
                  }`}
                  style={{ backgroundImage: `url(${ImageQuestionMobile})` }}
                  role="img"
                  aria-label="Background image"
                ></div>
              </>
            )
          case "rate-image":
            return (
              <>
                {/* DESKTOP */}
                <div
                  className={`trans--_effect bg-image-desktop-other bg-zero ${
                    sessionStorage.getItem("isIntroActive") === "true"
                      ? " z-index-99"
                      : "z-index--1"
                  }`}
                  style={{ backgroundImage: `url(${ImageRate})` }}
                  role="img"
                  aria-label="A woman is thinking in front of the laptop background image"
                ></div>

                {/* MOBILE  */}
                <div
                  className={`bg-image-mobile-others bg-zero ${
                    sessionStorage.getItem("isIntroActive") === "true"
                      ? " z-index-99"
                      : "z-index--1"
                  }`}
                  style={{ backgroundImage: `url(${ImageRateMobile})` }}
                  role="img"
                  aria-label="A woman is thinking in front of the laptop background image"
                ></div>
              </>
            )
          case "other-image":
            return (
              <>
                {/* DESKTOP */}
                <div
                  className={`trans--_effect bg-image-desktop bg-zero ${
                    sessionStorage.getItem("isIntroActive") === "true"
                      ? " z-index-99"
                      : "z-index--1"
                  }`}
                  style={{ backgroundImage: `url(${ImageHome})` }}
                  role="img"
                  aria-label="A woman gives feedback background image"
                ></div>

                {/* MOBILE  */}
                <div
                  className={`bg-image-mobile-others bg-zero ${
                    sessionStorage.getItem("isIntroActive") === "true"
                      ? " z-index-99"
                      : "z-index--1"
                  }`}
                  style={{ backgroundImage: `url(${ImageHomeMobile})` }}
                  role="img"
                  aria-label="A woman gives feedback background image"
                ></div>
              </>
            )
          default:
            return (
              <>
                {/* DESKTOP */}
                <div
                  className={`trans--_effect bg-image-desktop bg-zero ${
                    sessionStorage.getItem("isIntroActive") === "true"
                      ? " z-index-99"
                      : "z-index--1"
                  }`}
                  style={{ backgroundImage: `url(${ImageHome})` }}
                  role="img"
                  aria-label="A woman gives feedback background image"
                ></div>

                {/* MOBILE  */}
                <img
                  className="bg-image-mobile"
                  src={ImageHome}
                  alt="A woman gives feedback background image"
                ></img>
              </>
            )
        }
      })()}
    </>
  )
}

const mapStateToProps = (state) => ({
  bgImage: state.settings.bgImage,
})
export default connect(mapStateToProps)(BgImage)

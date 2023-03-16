/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react"
import { zoomIn } from "react-animations"
import Radium, { StyleRoot } from "radium"
import { findTextFromTranslations } from "../../../../util/functions"

const styles = {
  zoomIn: {
    animation: "x 1s",
    animationName: Radium.keyframes(zoomIn, "zoomIn"),
  },
}

const Modal = ({
  isLater,
  saveLater,
  loginType,
  setPage,
  selectedLanguageId,
  initData,
  userInfo,
}) => {
  const [label, setLabel] = useState("")
  const [code, setCode] = useState()

  useEffect(() => {
    console.log(userInfo)
  }, [userInfo])

  useEffect(() => {
    switch (loginType) {
      case "email":
        setLabel(
          "Thanks, your survey has been saved. To resume the survey, enter the same email address you used."
        )
        break
      case "referance":
        setLabel(
          "To resume your survey later, please make a note of your unique reference number:"
        )
        setCode("R3suM3789")
        break
      default:
        break
    }
  }, [loginType])

  return (
    <>
      <div
        className={`modal fade ${isLater && "show d-block"}`}
        id="survey_page_modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="termsLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered survey-__modal">
          <StyleRoot style={styles.zoomIn}>
            <div className="modal-content">
              <div className="modal-header">
                <span className="emojis">
                  <img src="/assets/images/svg-icons/info-modal.svg"></img>
                </span>
                <br />
                <a
                  id="hover-_hand"
                  onClick={() => {
                    saveLater(false)
                    loginType === "email" && setPage(1)
                  }}
                  className="close-modal_btn js-dismiss cursorp"
                  aria-label="close"
                  role="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 22 22"
                    fill="currentColor"
                    role="img"
                    className="icon icon-16 fill-current"
                  >
                    <path d="M7.22876 5.81455C6.83824 5.42403 6.20507 5.42403 5.81455 5.81455C5.42402 6.20507 5.42402 6.83824 5.81455 7.22876L9.58578 11L5.81455 14.7712C5.42402 15.1618 5.42402 15.7949 5.81455 16.1854C6.20507 16.576 6.83824 16.576 7.22876 16.1854L11 12.4142L14.7712 16.1854C15.1618 16.576 15.7949 16.576 16.1854 16.1854C16.576 15.7949 16.576 15.1618 16.1854 14.7712L12.4142 11L16.1854 7.22876C16.576 6.83824 16.576 6.20507 16.1854 5.81455C15.7949 5.42403 15.1618 5.42403 14.7712 5.81455L11 9.58579L7.22876 5.81455Z"></path>
                  </svg>
                </a>
              </div>
              <div className="modal-body">
                {label && (
                  <p>
                    {findTextFromTranslations(
                      loginType === "email"
                        ? "Thanks, your survey has been saved. To resume the survey, enter the same email address you used."
                        : "To resume your survey later, please make a note of your unique reference number: (6469B3BBDB)",
                      selectedLanguageId,
                      initData?.customisations
                    ).replace("6469B3BBDB", userInfo?.refCode)}
                    {/* <br />
                    {code && <span className="code_area mt-2 d-block">{userInfo?.refCode}</span>} */}
                  </p>
                )}
              </div>
              {/* <div className="modal-footer">
                            <button type="button" className="modal__btn" data-dismiss="modal" onClick={()=>saveLater(false)}>Close</button>
                        </div> */}
            </div>
          </StyleRoot>
        </div>
      </div>
    </>
  )
}

export default Modal

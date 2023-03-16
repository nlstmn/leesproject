/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react"
import { zoomIn } from "react-animations"
import Radium, { StyleRoot } from "radium"
import {
  findTextFromTranslations,
  modifyDates,
} from "../../../../util/functions"
import ReactMarkdown from "react-markdown"

const styles = {
  zoomIn: {
    animation: "x 1s",
    animationName: Radium.keyframes(zoomIn, "zoomIn"),
  },
}

const Modal = ({
  isModal,
  setModal,
  initData,
  selectedLanguageId,
  currentPage,
  isPage,
}) => {
  const [isWelcome, setIsWelcome] = useState(false)
  const [label, setLabel] = useState("")
  useEffect(() => {
    let pagePopup = initData?.customisations?.filter(
      (i) =>
        i.survey_id &&
        i.survey_id === initData?.general?.id &&
        i.language_id === 12 &&
        i.type === `page_${currentPage?.id}_popup`
    )
    console.log(pagePopup, currentPage?.id)

    pagePopup?.length > 0 && pagePopup[0]?.label?.length > 0 && setModal(true)
  }, [currentPage?.id, initData])
  useEffect(() => {
    console.log(
      currentPage?.id,
      isPage,
      initData?.customisations?.filter(
        (i) =>
          i.survey_id &&
          i.survey_id === initData?.general?.id &&
          i.type === "welcome_popup" &&
          i.language_id === 12
      )[0]
    )
    if (
      ((initData?.general?.access === 4 && isPage === 2) ||
        (initData?.general?.access === 1 && isPage === 1)) &&
      initData?.customisations?.filter(
        (i) =>
          i.survey_id &&
          i.survey_id === initData?.general?.id &&
          i.type === "welcome_popup" &&
          i.language_id === 12
      )[0]?.label?.length > 0
    ) {
      setModal(true)
      setIsWelcome(true)
    } else {
      setIsWelcome(false)
    }
  }, [isPage, initData])
  return (
    <>
      <div
        className={`modal fade ${isModal && "show d-block"}`}
        id="survey_page_modal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="termsLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered survey-__modal">
          <StyleRoot style={styles.zoomIn} className="text_section intro__body">
            <div className="modal-content">
              <div className="modal-header">
                <span className="emojis">
                  <img src="/assets/images/svg-icons/info-modal.svg"></img>
                </span>
                <br />
                <a
                  id="hover-_hand"
                  onClick={() => setModal(false)}
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
                <ReactMarkdown>
                  {modifyDates(
                    initData?.general?.start_date,
                    initData?.general?.end_date,
                    isWelcome
                      ? initData?.customisations?.filter(
                          (i) =>
                            i.survey_id &&
                            i.type === `welcome_popup` &&
                            i.language_id === selectedLanguageId
                        )[0]?.label ||
                          initData?.customisations?.filter(
                            (i) =>
                              i.survey_id &&
                              i.type === "welcome_popup" &&
                              i.language_id === 12
                          )[0]?.label
                      : findTextFromTranslations(
                          `page_${currentPage?.id}_popup`,
                          selectedLanguageId,
                          initData.customisations
                        ) !== `page_${currentPage?.id}_popup`
                      ? findTextFromTranslations(
                          `page_${currentPage?.id}_popup`,
                          selectedLanguageId,
                          initData.customisations
                        )
                      : findTextFromTranslations(
                          `page_${currentPage?.id}_popup`,
                          12,
                          initData.customisations
                        )
                  )}
                </ReactMarkdown>
              </div>
              {/* <div className="modal-footer">
                            <button type="button" className="modal__btn" data-dismiss="modal" onClick={()=>setModal(false)}>Close</button>
                        </div> */}
            </div>
          </StyleRoot>
        </div>
      </div>
    </>
  )
}

export default Modal

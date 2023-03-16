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

const ResetModal = ({ resetAnswer, isResetModal, setResetModal }) => {
  return (
    <>
      <div
        className={`modal fade ${isResetModal && "show d-block"}`}
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
                  <img src="/assets/images/svg-icons/error-modal.svg"></img>
                </span>
                <br />
                <a
                  id="hover-_hand"
                  onClick={() => setResetModal(false)}
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
                Are you sure you want to delete all your answers?
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn-dash outline float-left"
                  data-dismiss="modal"
                  onClick={() => setResetModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-dash dark float-right"
                  data-dismiss="modal"
                  onClick={() => resetAnswer()}
                >
                  Yes
                </button>
              </div>
            </div>
          </StyleRoot>
        </div>
      </div>
    </>
  )
}

export default ResetModal

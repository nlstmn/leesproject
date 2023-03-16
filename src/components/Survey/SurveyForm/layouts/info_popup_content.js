/* eslint-disable jsx-a11y/alt-text */
import React from "react"

// MESSAGES:

// A disability is defined as a long term condition (that has lasted or likely to last 12 months or more) which impacts on day to day activities.

// A long term condition is one that has lasted or is likely to last 12 months or more and which impacts on day to day activities, or requires ongoing medical care, or both.

// e.g. different working hours/patterns

// e.g. avoid noise or crowds

// e.g. participate fully in discussions/decisions

// e.g. accessible fonts, images, colours and accessibility information

// e.g. I can express preference regarding where I work and when I work

// e.g. sit-stand desk or similar

// e.g. dyslexic spellcheckers, mind mapping, speech to text or text

// e.g. hearing support systems, captioning and sign language support

const InfoPopupContent = (text) => {
  return (
    <>
      <div className="popup-content">
        <div className="popup-header">
          <span className="emojis">
            <img src="/assets/images/svg-icons/info.svg"></img>
          </span>
          <br />
        </div>
        <div className="popup-body">{text}</div>
      </div>
    </>
  )
}

export default InfoPopupContent

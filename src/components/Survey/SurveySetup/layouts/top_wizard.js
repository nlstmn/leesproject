import React from "react"

const TopWizard = ({ pageCount, isPage, skipEmail }) => {
  return (
    <>
      <div id="top-wizard" className="top__wizard">
        <div className="wizard_cont">
          <span id="location">
            Step {isPage} of {pageCount}
          </span>
          <div
            id="progressbar"
            className="ui-progressbar ui-widget ui-widget-content ui-corner-all"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={(isPage / pageCount) * 100}
          >
            <div
              className="ui-progressbar-value ui-widget-header ui-corner-left"
              style={{ width: `${(isPage / pageCount) * 100}%` }}
            ></div>
          </div>

          <h2 className="section_title">
            {isPage === 1 && "Your name"}
            {isPage === 2 && "Name of your organisation"}
            {isPage === 3 && "Number of your building(s)"}
            {isPage === 4 && "Start and end date"}
            {isPage === 5 && "Email address or unique provided codes"}

            {skipEmail ? (
              <>
                {isPage === 6 && "Email domains"}
                {isPage === 7 && "Languages"}
                {isPage === 8 && "Default language"}
                {isPage === 9 && "Leesman standard job role"}
                {isPage === 10 && "Additional module"}
                {isPage === 11 && "Additional dropdown question"}
                {isPage === 12 && "Open comment box question"}
                {isPage === 13 && "Intro text"}
                {isPage === 14 && "Signature"}
                {isPage === 15 && "Closing text"}
                {isPage === 16 && "Setup Excel file"}
                {isPage === 17 && "Anything else"}
              </>
            ) : (
              <>
                {isPage === 6 && "Languages"}
                {isPage === 7 && "Default language"}
                {isPage === 8 && "Leesman standard job role"}
                {isPage === 9 && "Additional module"}
                {isPage === 10 && "Additional dropdown question"}
                {isPage === 11 && "Open comment box question"}
                {isPage === 12 && "Intro text"}
                {isPage === 13 && "Signature"}
                {isPage === 14 && "Closing text"}
                {isPage === 15 && "Setup Excel file"}
                {isPage === 16 && "Anything else"}
              </>
            )}
          </h2>
        </div>
      </div>
    </>
  )
}

export default TopWizard

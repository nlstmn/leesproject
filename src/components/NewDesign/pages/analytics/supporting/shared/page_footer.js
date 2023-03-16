import React from "react"

const PageFooter = ({ type, page_number, total_pages }) => {
  return (
    <>
      <div className="page__footer">
        <div className="left">
          <span>Leesman {type} Survey</span> — Core question set
        </div>
        <div className="right">
          <span>Page</span>&nbsp;
          <div className="page_number">
            <span className="first">{page_number}</span>&nbsp;
            <span className="of">of</span>&nbsp;
            <span className="second">{total_pages}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageFooter

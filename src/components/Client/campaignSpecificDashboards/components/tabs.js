import React from "react"
import ImportExport from "../../../common/ImportExport"
import { campaignCommentsSearchPart } from "../../../common/commonComponents/CommonBlocks"
export default function Tabs({
  setCategoryType,
  setChartType,
  categoryType,
  bufferCommentData,
  query,
  setQuery,
  campaignDetails,
}) {
  return (
    <div className="col-lg-12">
      <ul className="nav">
        {/* FOR ALWAYS ON */}
        {campaignDetails.always_on && (
          <li className="nav-item mr--8 category-margin">
            <a
              className={`btn btn-default btn-block chartcategory-btn ${
                categoryType === "trends" ? "active" : ""
              }`}
              onClick={() => {
                setCategoryType("trends")
                setChartType("individual-chart")
              }}
            >
              Trends
            </a>
          </li>
        )}

        <li className="nav-item mr--8 category-margin">
          <a
            className={`btn btn-default btn-block chartcategory-btn ${
              categoryType === "breakdown" ? "active" : ""
            }`}
            onClick={() => {
              setCategoryType("breakdown")
              setChartType("bar-chart")
            }}
          >
            Campaign breakdown
          </a>
        </li>
        <li className="nav-item mr--8 category-margin">
          <a
            className={`btn btn-default btn-block chartcategory-btn ${
              categoryType === "internal" ? "active" : ""
            }`}
            onClick={() => {
              setCategoryType("internal")
              setChartType("heat-map")
            }}
          >
            Internal comparison
          </a>
        </li>
        {/* will be here in phase 2 */}
        {/* <li className="nav-item mr--8 category-margin">
                        <a
                          className={`btn btn-default btn-block chartcategory-btn ${categoryType === "external" ? "active" : ""}`}
                          onClick={() => {
                            setCategoryType("external");
                            setChartType("grouped-bar");
                          }}
                        >
                          External comparison
                        </a>
                      </li>
                       */}
        <li className="nav-item mr--8 category-margin">
          <a
            className={`btn btn-default btn-block chartcategory-btn ${
              categoryType === "comments" ? "active" : ""
            }`}
            onClick={() => {
              setCategoryType("comments")
              setChartType("comments")
            }}
          >
            Question comments
          </a>
        </li>
        {categoryType === "comments" &&
          campaignCommentsSearchPart(bufferCommentData, query, setQuery)}
      </ul>

      {/* FOR ALWAYS ON */}
      {categoryType === "trends" ? (
        <p className="small-_info text-leftt pt-10">Scores over time</p>
      ) : (
        ""
      )}

      {categoryType === "breakdown" ? (
        <p className="small-_info text-leftt pt-10">
          Breakdown of the campaign by question
        </p>
      ) : (
        ""
      )}
      {categoryType === "internal" ? (
        <p className="small-_info text-leftt pt-10">
          Comparison of campaign data between different groups
        </p>
      ) : (
        ""
      )}
      {categoryType === "external" ? (
        <p className="small-_info text-leftt pt-10">
          Comparison of campaign data with other datasets outside this campaign
        </p>
      ) : (
        ""
      )}
      {categoryType === "comments" ? (
        <p className="small-_info text-leftt pt-10">Question comments</p>
      ) : (
        ""
      )}
    </div>
  )
}

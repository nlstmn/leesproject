import React from "react"
import moment from "moment"
import ProgressBar from "react-customizable-progressbar"
import NoData from "../../../common/noData"
import { getCampaingCurrentStatus } from "../../../../util/functions"

export default function Details({ campaignDetails, data }) {
  const closedPart = (
    <div className="col-12 col-xl-6 col-lg-12 col-md-12 pt-20">
      <div className="row headline-stat-closed">
        <div className="col-lg-4 col-sm-12 max-h-200">
          <h4 className="font-16r text-white  text-leftt">
            {data?.stats?.responses}
          </h4>
          <label className="mb-0  text-leftt">Responses</label>
        </div>
        <div className="col-lg-4 col-sm-12 max-h-200">
          <h4 className="font-16r text-white  text-leftt">
            {data?.uniqueUserCount}
          </h4>
          <label className="mb-0  text-leftt">Respondents</label>
        </div>
        {/* <div className="col-lg-4 col-sm-12 max-h-200 ">
                        <h4 className="font-16r text-white  text-leftt">{data && data?.stats && data?.response_rate + "%"}</h4>
                        <label className="mb-0  text-leftt">Response rate</label>
                      </div> */}
        <div className="col-lg-4 col-sm-12 max-h-200">
          <h4 className="font-16r text-white  text-leftt">
            {data && data?.stats && data?.response_rate + "%"}
          </h4>
          <label className="mb-0  text-leftt">Response rate</label>
        </div>
        <div className="col-lg-6 col-sm-12 max-h-200 pt-40">
          <h4 className="font-16r text-white  text-leftt">
            {moment(campaignDetails?.start).format("DD MMM YY")}
          </h4>
          <label className="mb-0  text-leftt">Start date</label>
        </div>
        <div className="col-lg-6 col-sm-12 max-h-200 pt-40">
          <h4 className="font-16r text-white  text-leftt">
            {moment(campaignDetails?.end).format("DD MMM YY")}
          </h4>
          <label className="mb-0  text-leftt">End date</label>
        </div>
      </div>
    </div>
  )
  const alwaysOnPart = (
    <div className="col-lg-5 two-donut-small">
      <div className="row">
        <div className="col-lg-6 col-sm-12">
          {!data?.available ? (
            <NoData></NoData>
          ) : (
            <div
              className="donut-new donut-new-main"
              style={{ height: "200px" }}
            >
              <ProgressBar
                radius={70}
                progress={
                  parseInt(data && data.stats && data.progress) >= 0
                    ? parseInt(data && data.stats && data.progress)
                    : 0
                }
                strokeWidth={7}
                strokeColor="#fff"
                strokeLinecap="square"
                trackStrokeColor="#70777a"
                trackStrokeWidth={4}
                transition="0.3s ease"
                initialAnimation={true}
              >
                <div className="indicator i-small">
                  {/* Round to 0 decimal places (X%) */}
                  <div>
                    {parseInt(data && data.stats && data.progress) >= 0
                      ? parseInt(data && data.stats && data.progress)
                      : 0}
                    %
                  </div>
                </div>
              </ProgressBar>

              <span className="mb-0 sub-title small-chart-link">
                Campaign progressbar
              </span>
            </div>
          )}
        </div>

        <div className="col-lg-6 col-sm-12">
          {!data?.available ? (
            <NoData></NoData>
          ) : (
            <div
              className="donut-new donut-new-main"
              style={{ height: "200px" }}
            >
              <ProgressBar
                radius={70}
                progress={
                  parseInt(data && data.stats && data.response_rate) >= 0
                    ? parseInt(data && data.stats && data.response_rate)
                    : 0
                }
                strokeWidth={7}
                strokeColor="#fff"
                strokeLinecap="square"
                trackStrokeColor="#70777a"
                trackStrokeWidth={4}
                transition="0.3s ease"
                initialAnimation={true}
              >
                <div className="indicator i-small">
                  {/* Round to 0 decimal places (X%) */}
                  <div>
                    {parseInt(data && data.stats && data.response_rate) >= 0
                      ? parseInt(data && data.stats && data.response_rate)
                      : 0}
                    %
                  </div>
                </div>
              </ProgressBar>

              {/* <Link to="/response-rate-region" className="mb-0 sub-title convert-link small-chart-link">
                            Response rate
                            <span className="iconx-controller-play"></span>
                          </Link> */}
              <span className="mb-0 sub-title small-chart-link">
                Response rate
              </span>
              {/* <span>{!data?.available && " (Not enough data)"}</span> */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
  return (
    <div>
      <div className="row text-center campaigns-details">
        <div className="col-12 col-xl-6 col-lg-12 col-md-12 pt-20">
          <p className="campaign-details-text">
            Campaign title: {campaignDetails?.title}
            <br />
            Status:
            {campaignDetails.always_on
              ? "ALWAYS ON"
              : getCampaingCurrentStatus({
                  ...campaignDetails,
                  start_date: campaignDetails.start,
                  end_date: campaignDetails.end,
                })}
            <br />
            Number of questions: {campaignDetails?.questions?.length}
            <br />
            Target population: {data?.stats?.targetPopulation}
            <br />
            Number of locations:{" "}
            {campaignDetails?.locations?.length -
              campaignDetails?.commonLocations?.length}
            <br />
            Number of departments: {campaignDetails?.departments?.length}
            <br />
            Number of responses: {data?.stats?.responses}
            <br />
            Number of unique users: {data?.uniqueUserCount}
          </p>
        </div>
        {campaignDetails.always_on ? alwaysOnPart : closedPart}
      </div>
    </div>
  )
}

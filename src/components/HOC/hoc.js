/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useLayoutEffect } from "react"
import "./assets/hoc.css"
import MainImage from "./assets/main-hero.png"
import ExportImage from "./assets/export-main.png"
import { connect } from "react-redux"
import { setLoginBackground } from "../../actions/settingsAction"
import { Popover } from "antd"
import {
  ActivityContent,
  HomeContent,
  SpesContent,
  DensContent,
  PieCContent,
} from "./components/info_contents"
import SliderDensity from "./components/slider_density"
import SliderBuffer from "./components/slider_buffer"
import SliderPercentage from "./components/slider_percentage"
import PieChartHOC from "./components/pie_chart"
import BarChartHOC from "./components/bar_chart"
import { fadeInUp } from "react-animations"
import validator from "validator"
import Radium, { StyleRoot } from "radium"
import axios from "../../../node_modules/axios/index"
import PrintHOC from "./print-hoc/index"

export function checkPercentage(arr) {
  let count = 0
  arr.forEach((item) => {
    count += item
  })
  return count
}
export function numFormatter(num, degree) {
  if (num > 999.9 && num < 1000000.0) {
    return (num / 1000.0).toFixed(degree) + "K"
  } else if (num > 1000000.0 && num < 999999999.9) {
    return (num / 1000000.0).toFixed(degree) + "M"
  } else if (num > 999999999.9) {
    return 999 + "M+"
  } else if (num < 999.9) {
    return num > 0.0 ? num : 0.0
  } else {
    return 0.0
  }
}

const styles = {
  fadeInUp: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
  },
}

const HOC = ({ setLoginBackground }) => {
  const [loaderHOC, setloaderHOC] = useState(true)
  const [isSidebar, setSidebar] = useState(true)
  const [isRolePercentage, setIsRolePercentage] = useState(false)
  const [isWorkPercentage, setIsWorkPercentage] = useState(false)
  const [isStart, setStart] = useState(true)
  const [isModal, setModal] = useState(false)
  const [isPDFPage, setPDFPage] = useState(false)
  const [exportData, setExportData] = useState({
    name: "",
    email: "",
    company: "",
    title: "",
  })
  document.body.classList.add("hoc-bg")
  document.getElementsByTagName("html")[0].setAttribute("class", "no-scrollit")
  useLayoutEffect(() => {
    setTimeout(() => {
      setloaderHOC(false)
    }, 800)
    setLoginBackground(false)
  }, [])
  const letStart = () => {
    setloaderHOC(true)
    setTimeout(() => {
      setloaderHOC(false)
    }, 700)
    setStart(false)
  }

  const initData = {
    balancedRole: "0",
    buffer: 0,
    businessConfidential: "0",
    collaborativeRole: "0",
    costPerSqm: "0",
    headcount: "0",
    individualRole: "0",
    nonWork: "0",
    privateConversations: "0",
    specialist: "0",
    type: "Financial",
    workArea: "0",
    workRoom: "0",
    workspaceDensity: 5,
    hostingVisitors: "0",
  }
  const [selectedTab, setSelectedTab] = useState("People")
  const [formData, setFormData] = useState(initData)
  const [chartData, setChartData] = useState([])
  const [tableData, setTableData] = useState([])
  const [errors, setErrors] = useState([])
  const change = (e) => {
    const { name, value } = e.target

    let val =
      name !== "headcount" && name !== "costPerSqm"
        ? value > 100
          ? 100
          : value < 1
          ? 0
          : value
        : value

    setFormData((pre) => {
      return {
        ...pre,
        [name]: val,
      }
    })
  }

  useEffect(() => {
    setIsRolePercentage(
      checkPercentage([
        parseInt(formData.individualRole),
        parseInt(formData.balancedRole),
        parseInt(formData.collaborativeRole),
      ])
    )
    setIsWorkPercentage(
      checkPercentage([
        parseInt(formData.workArea),
        parseInt(formData.workRoom),
        parseInt(formData.nonWork),
      ])
    )
  }, [formData])
  useEffect(() => {
    localStorage.setItem("hocForm", JSON.stringify(formData))
    localStorage.setItem("hocChart", JSON.stringify(chartData))
    localStorage.setItem("hocTable", JSON.stringify(tableData))
    localStorage.setItem("hocExport", JSON.stringify(exportData))
  }, [formData, chartData, tableData, exportData])

  useEffect(() => {
    isRolePercentage <= 100 && isWorkPercentage <= 100 && calculate(formData)
  }, [isWorkPercentage, isRolePercentage, formData])

  const removeZero = (val) => {
    let buffer = String(val)
    if (buffer.length > 1 && buffer.charAt(0) === "0") {
      buffer = buffer.substring(1)
    }
    return buffer
  }

  const MultiplyBy = (buffer) => {
    return 1.0 + parseFloat(buffer) * 0.05
  }
  function getArrayMax(array) {
    return Math.max.apply(null, array)
  }
  function getArrayMin(array) {
    return Math.min.apply(null, array)
  }
  const calculate = (data) => {
    const remoteLearning =
      parseFloat(
        parseFloat(data.individualRole) +
          parseFloat(data.workRoom) +
          parseFloat(data.privateConversations) +
          parseFloat(data.businessConfidential)
      ) / 400.0
    const officeLearning =
      parseFloat(
        parseFloat(data.collaborativeRole) +
          parseFloat(data.nonWork) +
          parseFloat(data.specialist) +
          parseFloat(data.hostingVisitors)
      ) / 400.0
    const balancedHybrid = 1 - (remoteLearning + officeLearning)
    const pie = {
      remoteLearning,
      balancedHybrid,
      officeLearning,
    }

    const avgDaysInWorkplace =
      remoteLearning > 0.0 || officeLearning > 0.0
        ? parseFloat(remoteLearning) * 0.5 +
          parseFloat(balancedHybrid) * 2.5 +
          parseFloat(officeLearning * 4.5)
        : 0.0

    const likelihoodDailyData = [
      {
        5: 16.2,
        4: 9.0,
        3: 8.2,
        2: 6.6,
        1: 8.7,
        0.25: 9.2,
      },
      {
        5: 21.2,
        4: 23.5,
        3: 22.9,
        2: 28.2,
        1: 23.8,
        0.25: 25.3,
      },
      {
        5: 21.8,
        4: 22.3,
        3: 26.8,
        2: 23.5,
        1: 28.4,
        0.25: 27.7,
      },
      {
        5: 21.9,
        4: 24.0,
        3: 25.2,
        2: 28.0,
        1: 25.8,
        0.25: 25.1,
      },
      {
        5: 18.9,
        4: 21.1,
        3: 16.9,
        2: 13.7,
        1: 13.3,
        0.25: 12.6,
      },
    ]

    const headTimeAvgDays =
      (parseFloat(avgDaysInWorkplace) * parseFloat(data.headcount)) / 100.0
    const estimatedPeopleCountBasedOnHeadcount = [
      {
        5: parseFloat(likelihoodDailyData[0][5]) * headTimeAvgDays,
        4: parseFloat(likelihoodDailyData[0][4]) * headTimeAvgDays,
        3: parseFloat(likelihoodDailyData[0][3]) * headTimeAvgDays,
        2: parseFloat(likelihoodDailyData[0][2]) * headTimeAvgDays,
        1: parseFloat(likelihoodDailyData[0][1]) * headTimeAvgDays,
        0.25: parseFloat(likelihoodDailyData[0]["0.25"]) * headTimeAvgDays,
      },
      {
        5: parseFloat(likelihoodDailyData[1][5]) * headTimeAvgDays,
        4: parseFloat(likelihoodDailyData[1][4]) * headTimeAvgDays,
        3: parseFloat(likelihoodDailyData[1][3]) * headTimeAvgDays,
        2: parseFloat(likelihoodDailyData[1][2]) * headTimeAvgDays,
        1: parseFloat(likelihoodDailyData[1][1]) * headTimeAvgDays,
        0.25: parseFloat(likelihoodDailyData[1]["0.25"]) * headTimeAvgDays,
      },
      {
        5: parseFloat(likelihoodDailyData[2][5]) * headTimeAvgDays,
        4: parseFloat(likelihoodDailyData[2][4]) * headTimeAvgDays,
        3: parseFloat(likelihoodDailyData[2][3]) * headTimeAvgDays,
        2: parseFloat(likelihoodDailyData[2][2]) * headTimeAvgDays,
        1: parseFloat(likelihoodDailyData[2][1]) * headTimeAvgDays,
        0.25: parseFloat(likelihoodDailyData[2]["0.25"]) * headTimeAvgDays,
      },
      {
        5: parseFloat(likelihoodDailyData[3][5]) * headTimeAvgDays,
        4: parseFloat(likelihoodDailyData[3][4]) * headTimeAvgDays,
        3: parseFloat(likelihoodDailyData[3][3]) * headTimeAvgDays,
        2: parseFloat(likelihoodDailyData[3][2]) * headTimeAvgDays,
        1: parseFloat(likelihoodDailyData[3][1]) * headTimeAvgDays,
        0.25: parseFloat(likelihoodDailyData[3]["0.25"]) * headTimeAvgDays,
      },
      {
        5: parseFloat(likelihoodDailyData[4][5]) * headTimeAvgDays,
        4: parseFloat(likelihoodDailyData[4][4]) * headTimeAvgDays,
        3: parseFloat(likelihoodDailyData[4][3]) * headTimeAvgDays,
        2: parseFloat(likelihoodDailyData[4][2]) * headTimeAvgDays,
        1: parseFloat(likelihoodDailyData[4][1]) * headTimeAvgDays,
        0.25: parseFloat(likelihoodDailyData[4]["0.25"]) * headTimeAvgDays,
      },
    ]
    const getPeakLoad = (row) => {
      if (parseFloat(avgDaysInWorkplace) >= 4.5) {
        return row[5]
      } else if (
        parseFloat(avgDaysInWorkplace) < 4.5 &&
        parseFloat(avgDaysInWorkplace) > 3.5
      ) {
        return row[4]
      } else if (
        parseFloat(avgDaysInWorkplace) < 3.5 &&
        parseFloat(avgDaysInWorkplace) > 2.5
      ) {
        return row[3]
      } else if (
        parseFloat(avgDaysInWorkplace) < 2.5 &&
        parseFloat(avgDaysInWorkplace) > 1.5
      ) {
        return row[2]
      } else if (
        parseFloat(avgDaysInWorkplace) < 1.5 &&
        parseFloat(avgDaysInWorkplace) > 0.5
      ) {
        return row[1]
      } else if (parseFloat(avgDaysInWorkplace) < 0.5) {
        return row["0.25"]
      }
    }
    const estimatedWorkplaceLoad = [
      {
        "Level Load": (data.headcount * avgDaysInWorkplace) / 5,
        "Peak Load": getPeakLoad(estimatedPeopleCountBasedOnHeadcount[0]),
      },
      {
        "Level Load": (data.headcount * avgDaysInWorkplace) / 5,
        "Peak Load": getPeakLoad(estimatedPeopleCountBasedOnHeadcount[1]),
      },
      {
        "Level Load": (data.headcount * avgDaysInWorkplace) / 5,
        "Peak Load": getPeakLoad(estimatedPeopleCountBasedOnHeadcount[2]),
      },
      {
        "Level Load": (data.headcount * avgDaysInWorkplace) / 5,
        "Peak Load": getPeakLoad(estimatedPeopleCountBasedOnHeadcount[3]),
      },
      {
        "Level Load": (data.headcount * avgDaysInWorkplace) / 5,
        "Peak Load": getPeakLoad(estimatedPeopleCountBasedOnHeadcount[4]),
      },
    ]

    const costTable = [
      {
        title: "Workspaces needed",
        "Level load":
          estimatedWorkplaceLoad[0]["Level Load"] * MultiplyBy(data.buffer),
        "Level cost": "",
        "Peak load":
          getArrayMax(
            estimatedWorkplaceLoad.map((i) => parseFloat(i["Peak Load"]))
          ) * MultiplyBy(data.buffer),
        "Peak cost": "",
      },
      {
        title: "Net leasable area (NLA, m2)",
        "Level load":
          estimatedWorkplaceLoad[0]["Level Load"] *
          MultiplyBy(data.buffer) *
          parseFloat(data.workspaceDensity),
        "Level cost":
          estimatedWorkplaceLoad[0]["Level Load"] *
          MultiplyBy(data.buffer) *
          parseFloat(data.workspaceDensity) *
          parseFloat(data.costPerSqm),
        "Peak load":
          getArrayMax(
            estimatedWorkplaceLoad.map((i) => parseFloat(i["Peak Load"]))
          ) *
          MultiplyBy(data.buffer) *
          parseFloat(data.workspaceDensity),
        "Peak cost":
          getArrayMax(
            estimatedWorkplaceLoad.map((i) => parseFloat(i["Peak Load"]))
          ) *
          MultiplyBy(data.buffer) *
          parseFloat(data.workspaceDensity) *
          parseFloat(data.costPerSqm),
      },
      {
        title: "M2 / person",
        "Level load":
          (estimatedWorkplaceLoad[0]["Level Load"] *
            MultiplyBy(data.buffer) *
            parseFloat(data.workspaceDensity)) /
          parseFloat(data.headcount),
        "Level cost":
          ((estimatedWorkplaceLoad[0]["Level Load"] *
            MultiplyBy(data.buffer) *
            parseFloat(data.workspaceDensity)) /
            parseFloat(data.headcount)) *
          parseFloat(data.costPerSqm),
        "Peak load":
          (getArrayMax(estimatedWorkplaceLoad.map((i) => i["Peak Load"])) *
            MultiplyBy(data.buffer) *
            parseFloat(data.workspaceDensity)) /
          parseFloat(data.headcount),
        "Peak cost":
          ((getArrayMax(estimatedWorkplaceLoad.map((i) => i["Peak Load"])) *
            MultiplyBy(data.buffer) *
            parseFloat(data.workspaceDensity)) /
            parseFloat(data.headcount)) *
          parseFloat(data.costPerSqm),
      },
      {
        title: "Desk sharing ratio",
        "Level load":
          parseFloat(data.headcount) /
          (estimatedWorkplaceLoad[0]["Level Load"] * MultiplyBy(data.buffer)),
        "Level cost": "",
        "Peak load":
          parseFloat(data.headcount) /
          (getArrayMax(estimatedWorkplaceLoad.map((i) => i["Peak Load"])) *
            MultiplyBy(data.buffer)),
        "Peak cost": "",
      },
    ]

    const others = {
      bigger:
        getArrayMax(
          estimatedWorkplaceLoad.map((i) => parseFloat(i["Peak Load"]))
        ) *
        MultiplyBy(data.buffer) *
        parseFloat(data.workspaceDensity) *
        parseFloat(data.costPerSqm),
      smaller:
        estimatedWorkplaceLoad[0]["Level Load"] *
        MultiplyBy(data.buffer) *
        parseFloat(data.workspaceDensity) *
        parseFloat(data.costPerSqm),
      "Cost saved":
        getArrayMax(
          estimatedWorkplaceLoad.map((i) => parseFloat(i["Peak Load"]))
        ) *
          MultiplyBy(data.buffer) *
          parseFloat(data.workspaceDensity) *
          parseFloat(data.costPerSqm) -
        estimatedWorkplaceLoad[0]["Level Load"] *
          MultiplyBy(data.buffer) *
          parseFloat(data.workspaceDensity) *
          parseFloat(data.costPerSqm),
      "Max peak load":
        getArrayMax(estimatedWorkplaceLoad.map((i) => i["Peak Load"])) *
        MultiplyBy(data.buffer),
      "Min peak load":
        estimatedWorkplaceLoad[0]["Level Load"] * MultiplyBy(data.buffer),
      Busiest: getArrayMax(estimatedWorkplaceLoad.map((i) => i["Peak Load"])),
      Quietest: getArrayMin(estimatedWorkplaceLoad.map((i) => i["Peak Load"])),
      "Difference in workspaces (Busiest day vs quietest day)":
        getArrayMax(estimatedWorkplaceLoad.map((i) => i["Peak Load"])) -
        getArrayMin(estimatedWorkplaceLoad.map((i) => i["Peak Load"])),
      "Difference in workspaces (Peak vs Level load)":
        getArrayMax(estimatedWorkplaceLoad.map((i) => i["Peak Load"])) *
          MultiplyBy(data.buffer) -
        estimatedWorkplaceLoad[0]["Level Load"] * MultiplyBy(data.buffer),
      "Cost per desk": data.costPerSqm * data.workspaceDensity,
      "Saving between peak & level load options":
        getArrayMax(estimatedWorkplaceLoad.map((i) => i["Peak Load"])) *
          MultiplyBy(data.buffer) *
          parseFloat(data.workspaceDensity) *
          parseFloat(data.costPerSqm) -
        estimatedWorkplaceLoad[0]["Level Load"] *
          MultiplyBy(data.buffer) *
          parseFloat(data.workspaceDensity) *
          parseFloat(data.costPerSqm),
      avgDaysInWorkplace: avgDaysInWorkplace,
    }
    setTableData({
      costTable: costTable,
      others: others,
      likelihoodDailyData: likelihoodDailyData,
      estimatedPeopleCountBasedOnHeadcount:
        estimatedPeopleCountBasedOnHeadcount,
      estimatedWorkplaceLoad: estimatedWorkplaceLoad,
    })

    setChartData({
      pie: pie,
      load: estimatedWorkplaceLoad,
    })
  }

  const changeExport = (e) => {
    const { name, value } = e.target
    setExportData((pre) => {
      return { ...pre, [name]: value }
    })
  }
  const checkExportInputs = () => {
    let arr = []
    if (exportData.name.length < 3) {
      arr.push({
        type: "name",
        message: "Please enter a valid name with more then 3 characters",
      })
    }
    if (!validator.isEmail(exportData.email)) {
      arr.push({ type: "email", message: "Please enter a valid email" })
    }
    if (exportData.company.length < 2) {
      arr.push({
        type: "company",
        message:
          "Please enter a valid company name with more then 2 characters",
      })
    }
    if (exportData.title.length < 3) {
      arr.push({
        type: "title",
        message: "Please enter a valid title more then 3 characters",
      })
    }
    setErrors(arr)
    if (arr.length === 0) {
      axios.post("/hwa", { ...exportData, ...formData }).then((res) => {
        setModal(false)
        // window.open("/pdf-export", "_blank").focus();
        setloaderHOC(false)
        setPDFPage(true)
        setloaderHOC(true)
      })
    }
  }

  useEffect(() => {
    let data = formData
    setFormData(data)
  }, [formData])
  useEffect(() => {
    let data = formData
    setFormData(data)
  }, [formData])
  useEffect(() => {
    let data = formData
    setFormData(data)
  }, [formData])
  return (
    <>
      {isPDFPage && (
        <div className="pdf-_viewer">
          <PrintHOC setPDFPage={setPDFPage} setloaderHOC={setloaderHOC} />
        </div>
      )}

      {loaderHOC && (
        <div className="loader-_large hoc__loader">
          <div className="loader-_large-div">
            <div className="bt-spinner"></div>
          </div>
        </div>
      )}

      {isModal && (
        <div className="modal-_export-pdf">
          <StyleRoot style={styles.fadeInUp} className="no_-scrl">
            <div className="modal-_export-container">
              <div className="row clearfix">
                <div className="col-lg-12 col-md-12 mb-3 mt-3">
                  <h1 className="l-h1 fcf">Report export</h1>
                </div>
                <div className="col-lg-12 col-md-12">
                  <img className="export-_img" src={ExportImage}></img>
                </div>
                <div className="col-lg-12 col-md-12">
                  <p>
                    To receive a copy of your report, please confirm your
                    details:
                  </p>
                </div>
                <div className="col-lg-12 col-md-12 mt-3">
                  <label className="form-group zz">
                    Full name <span className="text-danger">*</span>
                    <input
                      value={exportData.name}
                      onChange={changeExport}
                      name="name"
                      type="text"
                      className="form-control llk"
                      placeholder=""
                    />
                  </label>

                  {errors.filter((i) => i.type === "name").length > 0 && (
                    <p className="text-danger rer mb-0 mt-0">
                      <strong>
                        {errors.filter((i) => i.type === "name")[0].message}
                      </strong>
                    </p>
                  )}
                </div>
                <div className="col-lg-12 col-md-12">
                  <label className="form-group zz">
                    Email <span className="text-danger">*</span>
                    <input
                      value={exportData.email}
                      onChange={changeExport}
                      name="email"
                      type="email"
                      className="form-control llk"
                      placeholder=""
                    />
                  </label>

                  {errors.filter((i) => i.type === "email").length > 0 && (
                    <p className="text-danger rer mb-0 mt-0">
                      <strong>
                        {errors.filter((i) => i.type === "email")[0].message}
                      </strong>
                    </p>
                  )}
                </div>
                <div className="col-lg-12 col-md-12">
                  <label className="form-group zz">
                    Company <span className="text-danger">*</span>
                    <input
                      name="company"
                      value={exportData.company}
                      onChange={changeExport}
                      type="text"
                      className="form-control llk"
                      placeholder=""
                    />
                  </label>

                  {errors.filter((i) => i.type === "company").length > 0 && (
                    <p className="text-danger rer mb-0 mt-0">
                      <strong>
                        {errors.filter((i) => i.type === "company")[0].message}
                      </strong>
                    </p>
                  )}
                </div>
                <div className="col-lg-12 col-md-12">
                  <label className="form-group zz">
                    Report title <span className="text-danger">*</span>
                    <input
                      name="title"
                      type="text"
                      value={exportData.title}
                      onChange={changeExport}
                      className="form-control llk"
                      placeholder="What would you like the title of your report to be called?"
                    />
                  </label>

                  {errors.filter((i) => i.type === "title").length > 0 && (
                    <p className="text-danger rer mb-0 mt-0">
                      <strong>
                        {errors.filter((i) => i.type === "title")[0].message}
                      </strong>
                    </p>
                  )}
                </div>
                <div className="col-lg-12 col-md-12">
                  <p>
                    I agree to receive communications from Leesman and for my
                    personal information being handled in accordance with the
                    Leesman{" "}
                    <a
                      className="prvcl"
                      href="https://www.leesmanindex.com/privacy-policy/"
                      target="_blank"
                    >
                      privacy policy
                    </a>
                    . You can opt out of our communications at any time.
                  </p>
                </div>
                <div className="col-lg-12 col-md-12">
                  <label className="fancy-radio">
                    <input
                      name="agree"
                      value={exportData.aggreed}
                      onChange={(e) => {
                        setExportData((pre) => {
                          return {
                            ...pre,
                            aggreed: true,
                          }
                        })
                      }}
                      type="radio"
                    />
                    <span>
                      <i></i>I agree
                    </span>
                  </label>
                  <label className="fancy-radio">
                    <input
                      value={exportData.aggreed}
                      onChange={(e) => {
                        setExportData((pre) => {
                          return {
                            ...pre,
                            aggreed: false,
                          }
                        })
                      }}
                      name="agree"
                      type="radio"
                    />
                    <span>
                      <i></i>I do not agree
                    </span>
                  </label>
                </div>
                <div className="col-lg-12 col-md-12">
                  <button
                    type="button"
                    className="btn calc-btn mt-4"
                    disabled={!exportData.aggreed}
                    onClick={() => checkExportInputs()}
                  >
                    Export
                  </button>
                </div>
              </div>
            </div>
          </StyleRoot>
        </div>
      )}
      <div
        id="main-content"
        className={`hoc-_main mt-0 mb-0 ${isStart && " start-clc"}`}
      >
        <div className="container">
          <div className="row clearfix">
            {isStart ? (
              <>
                <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 left-_l">
                  <div className="card">
                    <div className="body trp">
                      <h1 className="l-h1 mb-0">
                        What does your hybrid
                        <br />
                        future look like?
                      </h1>
                      <p>
                        The Hybrid Occupancy Calculator uses insights from our
                        global reach research to show quite how important it is
                        to know what your employees do in their roles, before
                        deciding the optimal location for them. It then aims to
                        give a sense of what that might mean for your real
                        estate. Numerous other factors will ultimately need to
                        be considered, like commuting distances and mode of
                        travel, but this model aims to illustrate the influence
                        an employee’s role has on the adoption of hybrid
                        working, possible weekly utilisation high and low tide
                        marks and the impact of load balancing.
                      </p>
                      <p>Start exploring your space options now.</p>

                      <button
                        type="button"
                        className="btn calc-btn mt-4"
                        onClick={letStart}
                      >
                        Start
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-7 col-md-12 col-sm-12 left-_r">
                  <div className="card">
                    <div className="body trp">
                      <img
                        className="hoc-main-bg"
                        src={MainImage}
                        alt="leesman hybrid occupancy calculator main image"
                      ></img>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* CALCULATE SECTION */}

                {isSidebar && (
                  <div
                    className="calc-_sidebar-overlay"
                    onClick={() => setSidebar(false)}
                  ></div>
                )}

                <div className={`calc-_sidebar ${!isSidebar && " closed"}`}>
                  <span
                    onClick={() => setSidebar(false)}
                    className="calc-_sidebar-cls"
                  >
                    X
                  </span>
                  <div className="card">
                    <div className="body">
                      <div className="header">
                        <h1>Hybrid Occupancy Calculator</h1>

                        {/* <ul className="nav nav-tabs3 mt-0 mb-4">
                          <li className="nav-item">
                            <a
                              className={`nav-link ${selectedTab === "People" && " active"}`}
                              onClick={() => setSelectedTab("People")}
                              data-toggle="People"
                              href="#!"
                            >
                              People data
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={`nav-link ${selectedTab === "Space" && " active"}`}
                              onClick={() => setSelectedTab("Space")}
                              data-toggle="Space"
                              href="#!"
                            >
                              Space data
                            </a>
                          </li>
                        </ul>
                        <p>
                          {selectedTab === "Space"
                            ? "Please input your Space data by adjusting the fields below. If your portfolio includes multiple workplaces, please think of the most representative one."
                            : "Please input your People data by adjusting the fields below. If your portfolio includes multiple workplaces, please think of the most representative one."}
                        </p> */}
                        <p>
                          Please scroll down to input your People and Space data
                          by adjusting the fields below. If your portfolio
                          includes multiple workplaces, please think of the most
                          representative one.
                        </p>
                      </div>
                      <div className="row clearfix">
                        <div className="col-lg-6 col-md-12 col-reset">
                          <label className="form-group zz">
                            Headcount
                            <input
                              name="headcount"
                              onChange={change}
                              value={removeZero(formData.headcount)}
                              max="99999999"
                              maxLength="8"
                              type="number"
                              className="form-control"
                              placeholder="0"
                            />
                          </label>
                        </div>
                        <div className="col-lg-6 col-md-12 col-reset tt">
                          <button
                            onClick={() => {
                              setFormData({ ...initData })
                            }}
                            type="button"
                            className="btn calc-btn ex-_p rb ml-0"
                          >
                            <span className="iconx-refresh"></span> Reset
                          </button>
                        </div>
                      </div>
                    </div>

                    {selectedTab === "People" ? (
                      <>
                        <div className="body mt-0">
                          <div className="item-_clc">
                            <h3 className="text-muted">Activity profile</h3>
                            <Popover content={ActivityContent}>
                              <h4 className="more-info-class">
                                <span className="iconx-help-with-circle"></span>
                              </h4>
                            </Popover>
                          </div>
                          <p className="d-block w-100 mb-4">
                            Percentages must add up to 100
                          </p>
                          <div className="row clearfix">
                            <div className="col-lg-12 col-md-12">
                              <SliderPercentage
                                name="individualRole"
                                setFormData={setFormData}
                                checkPercentage={isRolePercentage}
                                formData={formData}
                                valuePercentage={"33%"}
                                info={"Individual role"}
                              />
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <SliderPercentage
                                setFormData={setFormData}
                                formData={formData}
                                checkPercentage={isRolePercentage}
                                valuePercentage={"33%"}
                                info={"Balanced role"}
                                name="balancedRole"
                              />
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <SliderPercentage
                                setFormData={setFormData}
                                formData={formData}
                                checkPercentage={isRolePercentage}
                                valuePercentage={"33%"}
                                info={"Collaborative role"}
                                name="collaborativeRole"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="body mt-0">
                          <div className="item-_clc">
                            <h3 className="text-muted">Home Work Setting</h3>
                            <Popover content={HomeContent}>
                              <h4 className="more-info-class">
                                <span className="iconx-help-with-circle"></span>
                              </h4>
                            </Popover>
                          </div>
                          <p className="d-block w-100 mb-4">
                            Percentages must add up to 100
                          </p>
                          <div className="row clearfix">
                            <div className="col-lg-12 col-md-12">
                              <SliderPercentage
                                setFormData={setFormData}
                                formData={formData}
                                checkPercentage={isWorkPercentage}
                                valuePercentage={"33%"}
                                info={"Dedicated work room"}
                                name="workRoom"
                              />
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <SliderPercentage
                                setFormData={setFormData}
                                formData={formData}
                                checkPercentage={isWorkPercentage}
                                valuePercentage={"33%"}
                                info={"Dedicated work area"}
                                name="workArea"
                              />
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <SliderPercentage
                                setFormData={setFormData}
                                formData={formData}
                                checkPercentage={isWorkPercentage}
                                valuePercentage={"33%"}
                                info={"Non-work specific"}
                                name="nonWork"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="body mt-0">
                          <div className="item-_clc mb-2">
                            <h3 className="text-muted">
                              Specific activities & equipment
                            </h3>
                            <Popover content={SpesContent}>
                              <h4 className="more-info-class">
                                <span className="iconx-help-with-circle"></span>
                              </h4>
                            </Popover>
                          </div>
                          {/* <p className="d-block w-100 mb-4">&nbsp;&nbsp;&nbsp;</p> */}
                          <div className="row clearfix">
                            <div className="col-lg-12 col-md-12">
                              <label className="form-group ff">
                                Private conversations
                                <div className="input-group">
                                  <input
                                    name="privateConversations"
                                    onChange={change}
                                    value={removeZero(
                                      formData.privateConversations
                                    )}
                                    type="number"
                                    className="form-control"
                                    min={1}
                                    max={100}
                                  />
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">%</span>
                                  </div>
                                </div>
                              </label>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <label className="form-group ff">
                                Specialist / technical equipment
                                <div className="input-group">
                                  <input
                                    name="specialist"
                                    onChange={change}
                                    value={removeZero(formData.specialist)}
                                    type="number"
                                    className="form-control"
                                    placeholder="0"
                                    min={1}
                                    max={100}
                                  />
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">%</span>
                                  </div>
                                </div>
                              </label>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <label className="form-group ff">
                                Business confidential discussions
                                <div className="input-group">
                                  <input
                                    name="businessConfidential"
                                    onChange={change}
                                    value={removeZero(
                                      formData.businessConfidential
                                    )}
                                    type="number"
                                    className="form-control"
                                    placeholder="0"
                                    min={1}
                                    max={100}
                                  />
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">%</span>
                                  </div>
                                </div>
                              </label>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <label className="form-group ff">
                                Hosting visitors, clients or customers
                                <div className="input-group">
                                  <input
                                    name="hostingVisitors"
                                    onChange={change}
                                    value={removeZero(formData.hostingVisitors)}
                                    type="number"
                                    className="form-control"
                                    placeholder="0"
                                    min={1}
                                    max={100}
                                  />
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">%</span>
                                  </div>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* SPACE DATA */}
                        <div className="body mt-0">
                          <div className="item-_clc">
                            <h3 className="text-muted">Workspace density</h3>
                            <Popover content={DensContent}>
                              <h4 className="more-info-class">
                                <span className="iconx-help-with-circle"></span>
                              </h4>
                            </Popover>
                          </div>
                          <div className="row clearfix">
                            <div className="col-lg-12 col-md-12">
                              <SliderDensity
                                name="workspaceDensity"
                                setFormData={setFormData}
                                formData={formData}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="body mt-3">
                          <div className="item-_clc">
                            <h3 className="text-muted">Buffer</h3>
                            {/* <Popover content={BufContent}>
                              <h4 className="more-info-class">
                                <span className="iconx-help-with-circle"></span>
                              </h4>
                            </Popover> */}
                          </div>
                          <div className="row clearfix">
                            <div className="col-lg-12 col-md-12">
                              <SliderBuffer
                                name="buffer"
                                setFormData={setFormData}
                                formData={formData}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="body mt-3">
                          <div className="row clearfix">
                            <div className="col-lg-5 col-md-12 col-reset">
                              <label className="form-group zz tt mt-0">
                                Cost per SQM
                                <div className="input-group stt">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">£</span>
                                  </div>
                                  <input
                                    name="costPerSqm"
                                    onChange={change}
                                    value={removeZero(formData.costPerSqm)}
                                    type="number"
                                    className="form-control"
                                    placeholder="0"
                                  />
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-lg-6 col-md-12 col-reset tt">
                          <button
                            onClick={() => {
                              window.open("/print-hoc", "_blank").focus();
                            }}
                            type="button"
                            className="btn calc-btn ex-_p rb ml-0"
                          >
                            <span className="iconx-refresh"></span> Export
                          </button>
                        </div> */}
                        <div className="body mt-0">
                          <div className="row clearfix">
                            {/* <div className="col-lg-12 col-md-12">
                              <div className="divider--hoc"></div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <p>To download your full report, please export your data below</p>
                            </div> */}
                            <div className="col-lg-12 col-md-12 d-flex">
                              <button
                                type="button"
                                className="btn calc-btn mb-2 hidden-_mobile"
                                onClick={() => setModal(true)}
                              >
                                Export my data
                              </button>
                              <button
                                type="button"
                                className="btn calc-btn dd mb-2 ml-2 ml-_mobile"
                                onClick={() => setSidebar(false)}
                              >
                                Calculate
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 left-_s">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="card">
                            <div className="body min-h-450">
                              <div className="item-_clc">
                                <h3 className="text-muted mb-0">
                                  Hybrid profile distribution
                                </h3>
                                <Popover content={PieCContent}>
                                  <h4 className="more-info-class cvv">
                                    <span className="iconx-help-with-circle"></span>
                                  </h4>
                                </Popover>
                              </div>
                              <span className="text-muted d-block ">
                                Proportion of employees in each hybrid profile.
                                <br /> Percentages may not add up to 100 due to
                                rounding.
                              </span>

                              <PieChartHOC
                                data={chartData?.pie}
                                height={360}
                                offsetY={"responsive"}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="card">
                                    <div className="body txt-align-bottom min-h-173">
                                      <div className="card-_inf">
                                        <h3 className="text-muted mb-0">
                                          Avg number of days in workplace
                                        </h3>
                                        <span className="text-muted d-block mb-4">
                                          &nbsp;&nbsp;
                                        </span>
                                      </div>
                                      <div className="m-0 text-center h1">
                                        {parseFloat(
                                          tableData?.others?.avgDaysInWorkplace
                                        ).toFixed(1)}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="card">
                                    <div className="body txt-align-bottom min-h-173">
                                      <div className="card-_inf">
                                        <h3 className="text-muted mb-0">
                                          Net leasable area (SqM)
                                        </h3>
                                        <span className="text-muted d-block mb-2">
                                          &nbsp;&nbsp;
                                        </span>
                                      </div>
                                      <div className="d-block align-items-center hwa-__items">
                                        <div className="hwa-item_c d-flex align-items-center mb-2">
                                          <div className="ml-0 flex-_that">
                                            <h4 className="mb-0 font-weight-medium">
                                              {numFormatter(
                                                parseFloat(
                                                  tableData?.costTable?.filter(
                                                    (i) =>
                                                      i.title.includes(
                                                        "Net leasable area (NLA, m2)"
                                                      )
                                                  )[0]["Peak load"],
                                                  1
                                                ).toFixed(1)
                                              )}
                                            </h4>
                                            <span className="ml-2">
                                              Expected load
                                            </span>
                                          </div>
                                        </div>
                                        <div className="hwa-item_c d-flex align-items-center">
                                          <div className="ml-0 flex-_that">
                                            <h4 className="mb-0 font-weight-medium">
                                              {numFormatter(
                                                parseFloat(
                                                  tableData?.costTable?.filter(
                                                    (i) =>
                                                      i.title.includes(
                                                        "Net leasable area (NLA, m2)"
                                                      )
                                                  )[0]["Level load"],
                                                  1
                                                ).toFixed(1)
                                              )}
                                            </h4>
                                            <span className="ml-2">
                                              Level load
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="card">
                                    <div className="body txt-align-bottom min-h-173">
                                      <div className="card-_inf">
                                        <h3 className="text-muted mb-0">
                                          SqM / person
                                        </h3>
                                        <span className="text-muted d-block mb-2">
                                          &nbsp;&nbsp;
                                        </span>
                                      </div>
                                      <div className="d-block align-items-center hwa-__items">
                                        <div className="hwa-item_c d-flex align-items-center mb-2">
                                          <div className="ml-0 flex-_that">
                                            <h4 className="mb-0 font-weight-medium">
                                              {numFormatter(
                                                parseFloat(
                                                  tableData?.costTable?.filter(
                                                    (i) =>
                                                      i.title.includes(
                                                        "M2 / person"
                                                      )
                                                  )[0]["Peak load"],
                                                  1
                                                ).toFixed(1)
                                              )}
                                            </h4>
                                            <span className="ml-2">
                                              Expected load
                                            </span>
                                          </div>
                                        </div>
                                        <div className="hwa-item_c d-flex align-items-center">
                                          <div className="ml-0 flex-_that">
                                            <h4 className="mb-0 font-weight-medium">
                                              {numFormatter(
                                                parseFloat(
                                                  tableData?.costTable?.filter(
                                                    (i) =>
                                                      i.title.includes(
                                                        "M2 / person"
                                                      )
                                                  )[0]["Level load"],
                                                  1
                                                ).toFixed(1)
                                              )}
                                            </h4>
                                            <span className="ml-2">
                                              Level load
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="card">
                                    <div className="body txt-align-bottom min-h-173">
                                      <div className="card-_inf">
                                        <h3 className="text-muted mb-0">
                                          Desk sharing ratio
                                        </h3>
                                        <span className="text-muted d-block mb-2">
                                          &nbsp;&nbsp;
                                        </span>
                                      </div>
                                      <div className="d-block align-items-center hwa-__items">
                                        <div className="hwa-item_c d-flex align-items-center mb-2">
                                          <div className="ml-0 flex-_that">
                                            <h4 className="mb-0 font-weight-medium">
                                              {numFormatter(
                                                parseFloat(
                                                  tableData?.costTable?.filter(
                                                    (i) =>
                                                      i.title.includes(
                                                        "Desk sharing ratio"
                                                      )
                                                  )[0]["Peak load"],
                                                  1
                                                ).toFixed(1)
                                              )}
                                            </h4>
                                            <span className="ml-2">
                                              Expected load
                                            </span>
                                          </div>
                                        </div>
                                        <div className="hwa-item_c d-flex align-items-center">
                                          <div className="ml-0 flex-_that">
                                            <h4 className="mb-0 font-weight-medium">
                                              {numFormatter(
                                                parseFloat(
                                                  tableData?.costTable?.filter(
                                                    (i) =>
                                                      i.title.includes(
                                                        "Desk sharing ratio"
                                                      )
                                                  )[0]["Level load"],
                                                  1
                                                ).toFixed(1)
                                              )}
                                            </h4>
                                            <span className="ml-2">
                                              Level load
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 right-_s">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="card">
                            <div className="body min-h-450">
                              <button
                                onClick={() => setSidebar(true)}
                                type="button"
                                className="btn btn-primary ex-_p ww mt-4"
                              >
                                <span className="iconx-sound-mix"></span>{" "}
                                Calculator
                              </button>
                              {/* <button type="button" className="btn btn-primary ex-_p gg mt-4">
                                <span className="iconx-local_library"></span> Glossary
                              </button> */}
                              {/* <button
                                
                                type="button"
                                className="btn btn-primary ex-_p mt-4"
                              >
                                <span className="iconx-refresh"></span> Reset
                              </button> */}
                              <h3 className="text-muted mb-0">
                                Estimated workplace utilisation
                              </h3>
                              <span className="text-muted d-block mb-4">
                                Number of employees likely to use the workplace
                                on any given day if no fixed occupancy
                                <br /> rules are in place (Expected load) or if
                                balancing rules are enforced (Level load)
                              </span>
                              {chartData?.load?.length > 0 && (
                                <BarChartHOC
                                  data={chartData?.load}
                                  height={300}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="card">
                                    <div className="body txt-align-bottom min-h-173">
                                      <div className="card-_inf">
                                        <h3 className="text-muted mb-0">
                                          Cost per individual workspace
                                        </h3>
                                        <span className="text-muted d-block mb-4">
                                          Annual cost for each individual
                                          workspace
                                        </span>
                                      </div>
                                      <div className="m-0 text-center h1">
                                        £
                                        {numFormatter(
                                          tableData?.others &&
                                            parseFloat(
                                              tableData.others["Cost per desk"]
                                            ).toFixed(0),
                                          1
                                        ) || "0"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="card">
                                    <div className="body txt-align-bottom min-h-173">
                                      <div className="card-_inf">
                                        <h3 className="text-muted mb-0">
                                          Cost difference (Busiest day vs level
                                          load)
                                        </h3>
                                        <span className="text-muted d-block mb-2">
                                          Cost saving between the workspaces
                                          needed for the busiest expected day
                                          compared to the level load
                                        </span>
                                      </div>
                                      <div className="m-0 text-center h1">
                                        £
                                        {numFormatter(
                                          tableData?.others &&
                                            parseFloat(
                                              tableData.others["Cost saved"] /
                                                100.0
                                            ).toFixed(0),
                                          1
                                        ) || "0"}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="row">
                                <div className="col-lg-12">
                                  <div className="card">
                                    <div className="body txt-align-bottom min-h-173">
                                      <div className="card-_inf">
                                        <h3 className="text-muted mb-0">
                                          Workspaces required
                                        </h3>
                                        <span className="text-muted d-block mb-4">
                                          Number of workspaces needed to meet
                                          the expected and level load demands
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center hwa-__items">
                                        <div className="hwa-item_c d-flex align-items-center border-right pr-5 first-itm">
                                          <div className="ml-0">
                                            <h4 className="mb-0 font-weight-medium">
                                              {tableData?.others &&
                                                numFormatter(
                                                  parseFloat(
                                                    tableData?.others[
                                                      "Max peak load"
                                                    ]
                                                  ).toFixed(0),
                                                  0
                                                )}
                                            </h4>
                                            <span>Exp. load</span>
                                          </div>
                                        </div>
                                        <div className="hwa-item_c d-flex align-items-center border-right pr-5 ml-5">
                                          <div className="ml-0">
                                            <h4 className="mb-0 font-weight-medium">
                                              {tableData?.others &&
                                                numFormatter(
                                                  parseFloat(
                                                    tableData?.others[
                                                      "Min peak load"
                                                    ]
                                                  ).toFixed(0),
                                                  0
                                                )}
                                            </h4>
                                            <span>Level load</span>
                                          </div>
                                        </div>
                                        <div className="hwa-item_c d-flex align-items-center ml-5">
                                          <div className="ml-0">
                                            <h4 className="mb-0 font-weight-medium">
                                              {tableData?.others &&
                                                numFormatter(
                                                  parseFloat(
                                                    tableData.others[
                                                      "Difference in workspaces (Peak vs Level load)"
                                                    ],
                                                    0
                                                  ).toFixed(0)
                                                )}
                                            </h4>
                                            <span>Difference</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-12">
                                  <div className="card">
                                    <div className="body txt-align-bottom min-h-173">
                                      <div className="card-_inf">
                                        <h3 className="text-muted mb-0">
                                          Workspace differential
                                        </h3>
                                        <span className="text-muted d-block mb-4">
                                          The occupancy difference between the
                                          expected busiest and quietest days
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center hwa-__items">
                                        <div className="hwa-item_c d-flex align-items-center border-right pr-5 first-itm">
                                          <div className="ml-0">
                                            <h4 className="mb-0 font-weight-medium">
                                              {tableData?.others &&
                                                numFormatter(
                                                  parseFloat(
                                                    tableData.others.Busiest
                                                  ).toFixed(0),
                                                  0
                                                )}
                                            </h4>
                                            <span>Busiest</span>
                                          </div>
                                        </div>
                                        <div className="hwa-item_c d-flex align-items-center border-right pr-5 ml-5">
                                          <div className="ml-0">
                                            <h4 className="mb-0 font-weight-medium">
                                              {tableData?.others &&
                                                numFormatter(
                                                  parseFloat(
                                                    tableData.others.Quietest
                                                  ).toFixed(0),
                                                  0
                                                )}
                                            </h4>
                                            <span>Quietest</span>
                                          </div>
                                        </div>
                                        <div className="hwa-item_c d-flex align-items-center ml-5">
                                          <div className="ml-0">
                                            <h4 className="mb-0 font-weight-medium">
                                              {tableData?.others &&
                                                numFormatter(
                                                  parseFloat(
                                                    tableData.others[
                                                      "Difference in workspaces (Busiest day vs quietest day)"
                                                    ],
                                                    0
                                                  ).toFixed(0)
                                                )}
                                            </h4>
                                            <span>Difference</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  loginBackground: state.settings.loginBackground,
})

const mapDispatchToProps = (dispatch) => ({
  setLoginBackground: (e) => dispatch(setLoginBackground(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HOC)

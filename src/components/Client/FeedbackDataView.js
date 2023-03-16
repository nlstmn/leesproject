import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import TreeMapChart from "../common/charts/treeMapChart"

import AdvancedFilter from "../common/AdvancedFilter"
import Loader from "../common/Loader"
import LoaderLarge from "../common/LoaderLarge"
import { useDispatch, useSelector } from "react-redux"
import ApexCharts from "apexcharts"
import ImportExport from "../common/ImportExport"
import {
  feedbackClientDataViewAction,
  feedbackJoinDataViewAction,
} from "../../actions/clientActions"
const chartOptions = {
  series: [{ data: [{ x: "loading", y: 1.2 }] }],
  options: {
    legend: { show: false },
    chart: {
      height: 350,
      type: "treemap",
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: { enabled: true, style: { fontSize: "12px" }, offsetY: -4 },
    plotOptions: {
      treemap: {
        useFillColorAsStroke: false,
        enableShades: false,
        shadeIntensity: 1,
        reverseNegativeShade: false,
        distributed: false,
      },
    },
  },
}

const FeedbackDataView = () => {
  const dispatch = useDispatch()
  const { clientData, error } = useSelector(
    (store) => store.feedbackClientDataViewReducer
  )
  const { joinData } = useSelector((store) => store.feedbackJoinDataViewReducer)
  useEffect(() => {
    if (
      window.location.pathname === "/feedback-data-view" &&
      document.querySelector("#comments-_link") !== null
    ) {
      document.querySelector("#comments-_link").classList.add("active")
    }
  }, [])

  const [scales, setScales] = useState(chartOptions)
  const [graphState, setGraphState] = useState("theme")
  const [selectedIndex, setSelectedIndex] = useState("")
  const [selectedParentLabel, setSelectedParentLabel] = useState("")
  const [filterData, setFilterData] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log(filterData)
    filterData?.start && getData()
  }, [filterData])
  useEffect(() => {
    clientData.length > 0 &&
      joinData?.themeParentsJoin?.length > 0 &&
      CalcData()
  }, [clientData, graphState, joinData])
  useEffect(() => {
    if (!loading && selectedIndex !== "") {
      switch (graphState) {
        case "theme":
          setGraphState("parent")
          break
        case "parent":
          setGraphState("tags")
          break
        case "tags":
          setGraphState("theme")
          break
      }
    }
  }, [selectedIndex])
  useEffect(() => {
    scales.length > 0 &&
      ApexCharts.exec("treeChart", "updateSeries", scales.series, true)
  }, [scales])
  const getData = () => {
    let fdata = {
      ...filterData,
      page: "comment_breakdown",
    }
    dispatch(feedbackClientDataViewAction({ fdata }))
    dispatch(feedbackJoinDataViewAction({ fdata }))
    if (error) {
      sessionStorage.removeItem("filterData")
    }
  }

  const CalcData = () => {
    console.log(graphState)
    setLoading(false)
    switch (graphState) {
      case "theme":
        calcThemeData()
        break
      case "parent":
        calcParentData()
        break
      case "tags":
        calcTagsData()
        break
    }
  }

  const calcColor = (score) => {
    let color = ""
    if (score < 14) color = "#bf1717"
    else if (score >= 14 && score < 28) color = "#e95c0c"
    else if (score >= 28 && score < 42) color = "#f5a04c"
    else if (score >= 42 && score < 56) color = "#ffe054"
    else if (score >= 56 && score < 68) color = "#b6d484"
    else if (score >= 68 && score < 82) color = "#63b450"
    else if (score >= 82 && score <= 100) color = "#119336"
    return color
  }

  const calcThemeData = () => {
    let uniqueThemeIds = [
      ...new Set(joinData.themeParentsJoin.map((i) => i.theme_id)),
    ]

    let uniqueThemes = uniqueThemeIds.map((item, index) => {
      let parents = joinData.themeParentsJoin.filter(
        (i) => i.theme_id === item
      )[0].parent_ids

      let score = clientData.filter(
        (i) => parents.includes(i.parent_id) && i.answer_bool
      ).length
      let singleTheme = clientData.filter((i) => parents.includes(i.parent_id))
      let all = singleTheme.length
      let innerscore = (100 * score) / all
      return {
        id: item,
        label: joinData.themeParentsJoin.filter((i) => i.theme_id === item)[0]
          .label,
        weight: singleTheme.length,
        innerscore: innerscore,
      }
    })

    console.log(uniqueThemes)
    let d = uniqueThemes.map((item) => {
      return {
        x: item.label,
        y: item.weight,
        z: "score:" + item.innerscore.toFixed(1),
        fillColor: calcColor(item.innerscore),
      }
    })
    modifyData(d)
  }

  const calcParentData = () => {
    console.log(selectedIndex)

    let uniqueParentIds = [
      ...new Set(joinData.parentThemeJoin.map((i) => i.parent_id)),
    ]
    let uniqueParents = uniqueParentIds.map((item) => {
      let score = clientData.filter(
        (i) => i.parent_id === item && i.answer_bool
      ).length
      let singleTheme = clientData.filter((i) => i.parent_id === item)
      let all = singleTheme.length
      let innerscore = (100 * score) / all

      return {
        id: item,
        label: joinData.parentThemeJoin.filter((i) => i.parent_id === item)[0]
          .label,
        //theme_label: singleTheme[0].label,
        weight: singleTheme.length,
        innerscore: innerscore,
      }
    })
    if (selectedIndex !== "") {
      console.log(selectedIndex)
      const getThemeId = joinData.themeParentsJoin.filter((i) =>
        i.label.includes(selectedIndex)
      )[0].theme_id
      const getConnectedParents = joinData.parentThemeJoin.filter((i) =>
        i.theme_ids.includes(getThemeId)
      )
      console.log(getConnectedParents, getThemeId)
      uniqueParents = uniqueParents.filter(
        (i) =>
          getConnectedParents.map((o) => o.parent_id).includes(i.id) &&
          i.weight > 0
      )
    }
    console.log(uniqueParents)
    let d = uniqueParents.map((item) => {
      return {
        x: item.label,
        y: item.weight,
        z: "score:" + item.innerscore.toFixed(1),
        fillColor: calcColor(item.innerscore),
      }
    })
    modifyData(d)
  }
  const calcTagsData = () => {
    console.log(selectedParentLabel)
    let uniqueTagIds = [...new Set(clientData.map((i) => i.tag_id))]
    let uniqueTags = uniqueTagIds.map((item) => {
      let score = clientData.filter(
        (i) => i.tag_id === item && i.answer_bool
      ).length
      let singleTheme = clientData.filter((i) => i.tag_id === item)
      let all = singleTheme.length
      let innerscore = (100 * score) / all

      return {
        id: singleTheme[0].tag_id,
        label: singleTheme[0].tag_label,
        parent_label: singleTheme[0].parent_label,
        weight: singleTheme.length,
        innerscore: innerscore,
      }
    })
    if (selectedParentLabel !== "") {
      uniqueTags = uniqueTags.filter(
        (i) => i.parent_label === selectedParentLabel
      )
    }
    console.log(uniqueTags)
    let d = uniqueTags.map((item) => {
      return {
        x: item.label,
        y: item.weight,
        z: "score:" + item.innerscore.toFixed(1),
        fillColor: calcColor(item.innerscore),
      }
    })
    modifyData(d)
  }

  const modifyData = (e) => {
    //console.log(graphState);
    let prepareData = {
      series: [
        {
          data: e,
        },
      ],
      options: {
        legend: { show: false },
        chart: {
          height: 350,
          type: "treemap",
          id: "treeChartGraph",
          toolbar: { show: false },
          zoom: { enabled: false },
          events: {
            click: function (event, chartContext, config) {
              //makeDeeper(config.dataPointIndex, graphState);
              //console.log(graphState);
              setSelectedIndex(
                config.globals.categoryLabels[config.dataPointIndex]
              )
              console.log(config)
              console.log(config.globals.categoryLabels[config.dataPointIndex])
              setSelectedParentLabel(
                config.globals.categoryLabels[config.dataPointIndex]
              )
            },
          },
        },
        dataLabels: { enabled: true, style: { fontSize: "12px" }, offsetY: -4 },
        yaxis: {
          labels: {
            formatter: (text) => {
              return parseFloat(text).toFixed(0) + " response"
            },
          },
        },
        plotOptions: {
          treemap: {
            useFillColorAsStroke: false,
            enableShades: false,
            shadeIntensity: 1,
            reverseNegativeShade: false,
            distributed: false,
            colorScale: {
              ranges: [
                { from: 0, to: 14, color: "#bf1717" },
                { from: 14.001, to: 28, color: "#e95c0c" },
                { from: 28.001, to: 42, color: "#f5a04c" },
                { from: 42.001, to: 56, color: "#ffe054" },
                { from: 56.001, to: 68, color: "#b6d484" },
                { from: 68.001, to: 82, color: "#63b450" },
                { from: 82.001, to: 100, color: "#119336" },
              ],
            },
          },
        },
      },
    }
    //console.log(prepareData);
    prepareData && setScales({ ...prepareData })
  }

  return (
    <>
      {loading ? <LoaderLarge /> : <></>}

      <div className="container-fluid">
        <div className="block-header">
          <div className="row clearfix control--nav">
            <div className="col-md-3 col-sm-12 user-feedback-top">
              <h1>Comments</h1>
              <p className="small-_info for-title">
                Size of each box represents the volume of comments and the
                colour represents the Comments score
              </p>
            </div>

            {/* FİLTRELEME SEÇENEKLERİ */}
            <AdvancedFilter setComponentFilterData={setFilterData} />
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-md-12 col-sm-12 mb-3">
            <ul className="nav">
              <li className="nav-item mr--8">
                <Link
                  to="/results-feedbacks"
                  className="btn btn-default btn-block"
                >
                  Summary
                </Link>
              </li>
              <li className="nav-item mr--8">
                <Link
                  to="/feedback-theme-view"
                  className="btn btn-default btn-block"
                >
                  Themes
                </Link>
              </li>
              <li className="nav-item mr--8">
                <Link
                  to="/feedback-data-view"
                  className="btn btn-default active btn-block"
                >
                  Theme breakdown
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/feedback-comments-view"
                  className="btn btn-default btn-block"
                >
                  Comments
                </Link>
              </li>
              <li>
                <ImportExport
                  refresh={getData}
                  type={"tag-themes"}
                  data={clientData}
                  import={false}
                  export={true}
                  hideLine={true}
                />
              </li>
            </ul>
          </div>
          <div className="col-md-12 col-sm-12">
            <div className="user-feedback-top data-view-buttons">
              <button
                onClick={() => {
                  setGraphState("theme")
                  setSelectedIndex("")
                  setSelectedParentLabel("")
                }}
                className={`ant-btn ant-btn-sm ${
                  graphState === "theme" ? "ant-btn-primary" : "ant-btn-default"
                }`}
              >
                Theme
              </button>
              <button
                onClick={() => {
                  setGraphState("parent")
                  setSelectedIndex("")
                  setSelectedParentLabel("")
                }}
                className={`ant-btn ant-btn-sm ml-1 ${
                  graphState === "parent"
                    ? "ant-btn-primary"
                    : "ant-btn-default"
                }`}
              >
                Parent
              </button>
              <button
                onClick={() => {
                  setGraphState("tags")
                  setSelectedIndex("")
                  setSelectedParentLabel("")
                }}
                className={`ant-btn ant-btn-sm ml-1 ${
                  graphState === "tags" ? "ant-btn-primary" : "ant-btn-default"
                }`}
              >
                Tags
              </button>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 leesman-section  text-center">
            <div className="card">
              <div className="body min-h-290">
                {loading ? (
                  <Loader />
                ) : (
                  scales.series.length > 0 && <TreeMapChart data={scales} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeedbackDataView

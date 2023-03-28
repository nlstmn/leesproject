import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import LeftFilter from "../../../elements/filter_left"
import RightFilter from "../../../elements/filter_right"
import DatasetModal from "../../../elements/modal_dataset"
import DatasetModalLarge from "../../../elements/modal_dataset_large"
import LoaderPage from "../../../elements/loader_page"
import DeleteModal from "../../../elements/modal_delete"
import BreadcrumbDashboard from "../../../elements/breadcrumb_dashboard"
import TopFilter from "../../../elements/top_filter_dashboard"
import TopActions from "../../../elements/top_actions_dashboard"

import ComparisonDataTable from "./_comparison_data_table"
import ComparisonTable from "./_comparison_table"
import CrossTab from "./_cross_tab_analysis_table"
import DataSummary from "./_data_summary_table"
import Demographics from "./_demographics_table"
import DumbbellTable from "./_dumbbell_table"
import HeatmapTableBlueDark from "./_heatmap_table_blue-dark"
import HeatmapTableGreenRed from "./_heatmap_table_green-red"
import HeatmapTableRadial from "./_heatmap_work_environment_table"
import MobilityProfile from "./_mobility_profile_table"
import SentimentBreakdown from "./_sentiment_breakdown_table"
import ActivityProfile from "./_activity_profile_table"
import WorkEnvironment from "./_work_environment"
import { useParams } from "react-router-dom"
import { useQuery } from "../../../../../util/query"

const AllResults = () => {
  const query = useQuery()
  useLayoutEffect(() => {
    document.body.classList.add("temp__class")
  }, [])
  const params = useParams()
  useEffect(() => {
    console.log("This chart's params area: ", params)
    console.log("QUERY IS", query.get("chart_type"))
  }, [])

  // Table Drop Functions
  const [actionKey, setActionKey] = useState("")
  const isAction = (record) => record.key === actionKey
  const openDrop = (record) => {
    setActionKey(record.key)
  }
  const refDrop = useRef()

  // Drawer / Modal Functions
  const [visibleLeftDrawer, setVisibleLeftDrawer] = useState(false)
  const [visibleRightDrawer, setVisibleRightDrawer] = useState(false)
  const [visibleDatasetModal, setDatasetModal] = useState(false)
  const [visibleDatasetModalLarge, setDatasetModalLarge] = useState(false)
  // Drawer / Modal Functions

  // Table Visibility Functions
  const [visibleKey, setVisibleKey] = useState("")
  const isVisible = (record) => record.key === visibleKey
  const visibleThat = (record) => {
    setVisibleKey(record.key)
  }
  // Table Visibility Functions

  // Reset Drop Select
  const [isTopSelectFlag, setTopSelectFlag] = useState("")
  // Reset Drop Select
  const [deleteModal, setDeleteModal] = useState(false)

  const data_chartTypes = [
    {
      id: 2,
      label: "",
      options: [
        "Table",
        "Stacked chart",
        "Demographics",
        "Mobility profile",
        "Dumbbell chart",
        "Data summary",
        "Heat map (Green / Red)",
        "Heat map (Dark / Blue)",
        "Average Location Time Distribution",
        "Cross-tab analysis",
        "Comparison",
        "Activity profile",
        "Work environment",
      ],
    },
  ]

  const [isSelectChartType, setSelectChartType] = useState(0)

  useEffect(() => {
    setSelectChartType(parseInt(query.get("chart_type")) ?? 0);
  }, []);

  const topActionsProps = {
    setTopSelectFlag: setTopSelectFlag,
    isTopSelectFlag: isTopSelectFlag,
    isSelectChartType: isSelectChartType,
    setSelectChartType: setSelectChartType,
    // Filter items
    isExport: true,
    isChartType: true,
    isInternalComparison: [6, 7, 9].includes(isSelectChartType),
    isComparisonData: false,
    isQuestionSet: [0, 1, 4, 6, 7].includes(isSelectChartType),
    isOrderBy: [0, 1, 4, 9].includes(isSelectChartType),
    isHeatMapColumns: false,
    isDataValue: false,
    isSortRowBy: false,
    isColumnsRowBy: false,
    isTopBottom: false,
    isHeatMapColors: false,
    isMinimumRespondents: [6, 7, 10].includes(isSelectChartType),
    isSearchClients: false,
    isSearchAlphabetical: false,
    isCreateNew: false,
    isRows: [10].includes(isSelectChartType),
    isColumns: [10].includes(isSelectChartType),
    isCrossValue: [10].includes(isSelectChartType),
    isOrderRowsBy: [6, 7, 10].includes(isSelectChartType),
    isOrderColumnsBy: [6, 7, 10].includes(isSelectChartType),
    isTopBottom10: [6, 7, 10].includes(isSelectChartType),
    isLmiHlmi: [2, 3, 11].includes(isSelectChartType),
    isMeasue: [4, 6, 7].includes(isSelectChartType),
    isGap: [4].includes(isSelectChartType),
    isColourCoding: [6, 7].includes(isSelectChartType),
    isAxis: [1].includes(isSelectChartType),
    // Dummy datas
    data_chartTypes: data_chartTypes
  };

  return (
    <>
      <DeleteModal
        visibleDatasetModal={deleteModal}
        setDeleteModal={setDeleteModal}
      />
      <DatasetModal
        visibleDatasetModal={visibleDatasetModal}
        setDatasetModal={setDatasetModal}
      />
      <DatasetModalLarge
        visibleDatasetModal={visibleDatasetModalLarge}
        setDatasetModal={setDatasetModalLarge}
      />
      <LeftFilter
        visibleDrawer={visibleLeftDrawer}
        setVisibleDrawer={setVisibleLeftDrawer}
        setDatasetModal={setDatasetModal}
      />
      <RightFilter
        visibleDrawer={visibleRightDrawer}
        setVisibleDrawer={setVisibleRightDrawer}
      />

      <LoaderPage />

      <div className="container-fluid">
        <div className="row clearfix top-info">
          <div className="col-lg-12">
            <BreadcrumbDashboard
              isShow={true}
              mainTitle={"Results overview"}
              mainURL={"/analytics-overview"}
              secondTitle={"All results"}
              secondURL={"/analytics-results"}
            />
            <h1>All results</h1>
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12">
            <TopFilter
              setVisibleLeftDrawer={setVisibleLeftDrawer}
              setVisibleRightDrawer={setVisibleRightDrawer}
              setDatasetModal={setDatasetModal}
              setTopSelectFlag={setTopSelectFlag}
              isTopSelectFlag={isTopSelectFlag}
              // Filter items
              isFilter={true}
              isRegions={true}
              isIndustry={true}
              isClients={true}
              isRefresh={true}
              isReview={true}
              isComparison={true}
              isQuestionSet={true}
            />
          </div>

          <div className="col-lg-12">
            {/* FOR DEMO TOP ACTION LIST */}
            <TopActions {...topActionsProps} />
          </div>

          {isSelectChartType === 0 && <ComparisonDataTable />}

          {isSelectChartType === 1 && <SentimentBreakdown />}

          {isSelectChartType === 2 && <Demographics />}

          {isSelectChartType === 3 && <MobilityProfile />}

          {isSelectChartType === 4 && <DumbbellTable />}

          {isSelectChartType === 5 && <DataSummary />}

          {isSelectChartType === 6 && <HeatmapTableGreenRed />}

          {isSelectChartType === 7 && <HeatmapTableBlueDark />}

          {isSelectChartType === 8 && <HeatmapTableRadial />}

          {isSelectChartType === 9 && <CrossTab />}

          {isSelectChartType === 10 && <ComparisonTable />}

          {isSelectChartType === 11 && <ActivityProfile />}

          {isSelectChartType === 12 && <WorkEnvironment />}
        </div>
      </div>
    </>
  )
}

export default AllResults

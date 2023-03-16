import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import CustomSelect from "../../../elements/custom_select"
import DashboardKeySelect from "../../../elements/dashboard_key_select"
import LeftFilter from "../../../elements/filter_left"
import RightFilter from "../../../elements/filter_right"
import DatasetModal from "../../../elements/modal_dataset"
import DatasetModalLarge from "../../../elements/modal_dataset_large"
import LoaderPage from "../../../elements/loader_page"
import RangeColumn from "../../../charts/range_column_chart"
import HorizontalBarChart from "../../../charts/basic_bar_chart"
import RadialBar from "../../../charts/radial_bar_chart"
import BasicColumn from "../../../charts/basic_column_chart"
import BasicColumnV2 from "../../../charts/basic_column_v2_chart"
import TopFilter from "../../../elements/top_filter_dashboard"
import TopRightInfo from "../../../elements/top_right_info"
import DonutChart from "../../../charts/donut_chart"
import BreadcrumbDashboard from "../../../elements/breadcrumb_dashboard"
import SummaryInfo from "./_summary_info"
import ActivityCard from "./_activity_card"

const Overview = () => {
  useLayoutEffect(() => {
    document.body.classList.add("temp__class")
  }, [])

  // Drop Functions
  const refDrop = useRef()
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (!refDrop?.current.contains(event.target)) {
  //       setTopSelectFlag('');
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  // }, [refDrop]);
  // Drop Functions

  // Drawer / Modal Functions
  const [visibleLeftDrawer, setVisibleLeftDrawer] = useState(false)
  const [visibleRightDrawer, setVisibleRightDrawer] = useState(false)
  const [visibleDatasetModal, setDatasetModal] = useState(false)
  const [visibleDatasetModalLarge, setDatasetModalLarge] = useState(false)
  // Drawer / Modal Functions

  // Reset Drop Select
  const [isTopSelectFlag, setTopSelectFlag] = useState("")
  // Reset Drop Select

  const data_filters40 = [
    {
      id: 2,
      label: "Dashboard key",
      options: [
        "Dashboard key",
        "None of them",
        "Leesman Index – Office",
        "Leesman Index – Home",
        "Above Benchmark",
        "Below Benchmark",
        "Equal to Benchmark",
        "Leesman+",
        "Super driver",
        "Top tip",
      ],
    },
  ]
  const data_filters41 = [
    {
      id: 2,
      label: "Building",
      options: [
        "Building",
        "Option 001…",
        "Option 002…",
        "Option 003…",
        "Option 004…",
        "Option 005…",
      ],
    },
  ]
  const data_filters42 = [
    {
      id: 2,
      label: "Importance",
      options: [
        "Importance",
        "Option 001…",
        "Option 002…",
        "Option 003…",
        "Option 004…",
        "Option 005…",
      ],
    },
  ]
  const data_filters43 = [
    {
      id: 2,
      label: "Importance",
      options: [
        "Importance",
        "Option 001…",
        "Option 002…",
        "Option 003…",
        "Option 004…",
        "Option 005…",
      ],
    },
  ]
  const data_filters48 = [
    {
      id: 2,
      label: "Office",
      options: ["Office", "Home"],
    },
  ]

  const range_data = [
    {
      id: 1,
      label: "L+ 86.2",
      label_color: "blue",
      bar_height: 86.2,
      bar_bottom: 0,
      bar_color: "dark_blue",
      legend_label: "Antwerpen Centraal Stationsgebouw",
      legend_color: "dark_blue",
    },
    {
      id: 2,
      label: "55.6",
      label_color: "red",
      bar_height: 55.6,
      bar_bottom: 0,
      bar_color: "light_blue",
      legend_label: "Antwerpen Century Center Offices",
      legend_color: "light_blue",
    },
    {
      id: 3,
      label: "30.6",
      label_color: "black",
      bar_height: 30.6,
      bar_bottom: 55.6,
      bar_color: "black",
      legend_label: "Difference",
      legend_color: "black",
    },
  ]

  const bar_data = [
    {
      id: 1,
      label: "Assigned work setting",
      bar_width: 75,
      legend_label: "Lmi",
      legend_color: "red",
      legend_value: 58.2,
    },
    {
      id: 2,
      label: "Flexible work setting",
      bar_width: 23,
      legend_label: "Lmi",
      legend_color: "red",
      legend_value: 70.7,
    },
    {
      id: 3,
      label: "Specialist practical/technical setting",
      bar_width: 2,
      legend_label: "Lmi",
      legend_color: "red",
      legend_value: 67.1,
    },
    {
      id: 4,
      label: "Other",
      bar_width: 1,
      legend_label: "Lmi",
      legend_color: "red",
      legend_value: 57.7,
    },
  ]

  const activity_data = [
    {
      id: 1,
      left_color: "dark_blue",
      activity_value: 17,
      activity_label: "Up to 5",
      no: 388,
      lmi: 65.5,
      lmi_color: "green",
      hlmi: 65.1,
      hlmi_color: "red",
    },
    {
      id: 2,
      left_color: "light_blue",
      activity_value: 44,
      activity_label: "6 to 10",
      no: 153,
      lmi: 68.4,
      lmi_color: "green",
      hlmi: 65.9,
      hlmi_color: "red",
    },
    {
      id: 3,
      left_color: "grey",
      activity_value: 24,
      activity_label: "11 to 15",
      no: 212,
      lmi: 65.2,
      lmi_color: "green",
      hlmi: 65.6,
      hlmi_color: "red",
    },
    {
      id: 4,
      left_color: "blue",
      activity_value: 15,
      activity_label: "16 to 21",
      no: 135,
      lmi: 61.5,
      lmi_color: "red",
      hlmi: 64.5,
      hlmi_color: "red",
    },
  ]

  return (
    <>
      <LoaderPage />
      <LeftFilter
        visibleDrawer={visibleLeftDrawer}
        setVisibleDrawer={setVisibleLeftDrawer}
        setDatasetModal={setDatasetModal}
      />
      <RightFilter
        visibleDrawer={visibleRightDrawer}
        setVisibleDrawer={setVisibleRightDrawer}
      />

      <DatasetModal
        visibleDatasetModal={visibleDatasetModal}
        setDatasetModal={setDatasetModal}
      />
      <DatasetModalLarge
        visibleDatasetModal={visibleDatasetModalLarge}
        setDatasetModal={setDatasetModalLarge}
      />

      <div className="container-fluid">
        <div className="row clearfix top-info">
          <div className="col-lg-12">
            <BreadcrumbDashboard isShow={false} />
            <h1>Results overview</h1>
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
              isDate={true}
              isOfficeData={true}
              isExport={true}
              isAllResults={true}
              isComparison={true}
            />
          </div>
          <div className="col-lg-12 top_filters">
            <div className="top_filters_container">
              {data_filters40.map((item, i, arr) => (
                <DashboardKeySelect
                  item={item}
                  i={i}
                  arr={arr}
                  bordered={true}
                />
              ))}
            </div>
          </div>

          <div className="col-lg-3">
            <div className="row height__100">
              <SummaryInfo />

              <div className="col-lg-12">
                <div className="bottom__actions">
                  <button className="btn-dash explore has-icn">
                    Explore
                    <span className="cxc-explore"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="row">
              <div className="col-lg-12">
                <div className="n_card">
                  <div className="n-body min__height405">
                    <h3>Highest and lowest performing</h3>
                    {data_filters41.map((item, i, arr) => (
                      <CustomSelect
                        item={item}
                        i={i}
                        arr={arr}
                        bordered={false}
                      />
                    ))}
                    <div className="row">
                      <div className="col-lg-12 mt-2">
                        <RangeColumn data={range_data} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="bottom__actions">
                  {data_filters48.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} bordered={true} />
                  ))}

                  <button className="btn-dash explore has-icn">
                    Explore
                    <span className="cxc-explore"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-12">
                <div className="n_card">
                  <div className="n-body min__height405">
                    <h3>Activity complexity</h3>
                    <div className="row">
                      <div className="col-lg-6 result__donut">
                        <DonutChart isItemNumber={4} hasLines={false} />
                      </div>
                      <div className="col-lg-6">
                        <ActivityCard data={activity_data} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="bottom__actions">
                  <button className="btn-dash explore has-icn">
                    Explore
                    <span className="cxc-explore"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-12">
                <div className="n_card">
                  <div className="n-body min__height405">
                    <h3>Work setting</h3>
                    <div className="row">
                      <div className="col-lg-12 mt-5">
                        <HorizontalBarChart data={bar_data} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="bottom__actions">
                  {data_filters48.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} bordered={true} />
                  ))}

                  <button className="btn-dash explore has-icn">
                    Explore
                    <span className="cxc-explore"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="row">
              <div className="col-lg-12">
                <div className="n_card">
                  <div className="n-body min__height405">
                    <h3>Productivity agreement</h3>
                    <span className="card_desc">
                      My workplace/home environment enables me to work
                      productively.
                    </span>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="n_radial_chart">
                          <RadialBar />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="bottom__actions">
                  <button className="btn-dash explore has-icn">
                    Explore
                    <span className="cxc-explore"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="row">
              <div className="col-lg-12">
                <div className="n_card">
                  <div className="n-body min__height405">
                    <h3>Knowledge sharing agreement</h3>
                    <span className="card_desc">
                      I am able to share ideas/knowledge amongst colleagues.
                    </span>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="n_radial_chart">
                          <RadialBar />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="bottom__actions">
                  <button className="btn-dash explore has-icn">
                    Explore
                    <span className="cxc-explore"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-12">
                <div className="n_card">
                  <div className="n-body min__height405">
                    <div className="body_top_items">
                      <h3>Work activity groups</h3>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="chart__area">
                          <BasicColumn />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="bottom__actions">
                  <button className="btn-dash explore has-icn">
                    Explore
                    <span className="cxc-explore"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-12">
                <div className="n_card">
                  <div className="n-body min__height405">
                    <div className="body_top_items">
                      <h3>Work actvities – highest and lowest</h3>
                      {data_filters42.map((item, i, arr) => (
                        <CustomSelect
                          item={item}
                          i={i}
                          arr={arr}
                          bordered={false}
                        />
                      ))}
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="blocks__area">
                          <h4>Highest</h4>
                          <ul>
                            <li className="info">
                              <span>Support (%)</span>
                              <span>Importance (%)</span>
                            </li>

                            <li className="results">
                              <h5>Individual routine tasks</h5>
                              <div className="results_info">
                                <div className="left">
                                  <span>
                                    88.4 <span className="perc">%</span>
                                  </span>
                                  <span className="cxv-above-benchmark-l-icn green icon"></span>
                                </div>
                                <div className="right">
                                  <span>
                                    38.7 <span className="perc">%</span>
                                  </span>
                                </div>
                              </div>
                            </li>

                            <li className="results">
                              <h5>Planned meetings</h5>
                              <div className="results_info">
                                <div className="left">
                                  <span>
                                    87.6 <span className="perc">%</span>
                                  </span>
                                  <span className="cxv-above-benchmark-l-icn green icon"></span>
                                </div>
                                <div className="right">
                                  <span>
                                    76.9 <span className="perc">%</span>
                                  </span>
                                </div>
                              </div>
                            </li>

                            <li className="results">
                              <h5>
                                Informal social interaction{" "}
                                <span className="cxv-top-tip-l-icn"></span>
                              </h5>
                              <div className="results_info">
                                <div className="left">
                                  <span>
                                    83.7 <span className="perc">%</span>
                                  </span>
                                  <span className="cxv-equal-to-benchmark-l-icn dark icon"></span>
                                </div>
                                <div className="right">
                                  <span>
                                    57.4 <span className="perc">%</span>
                                  </span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="blocks__area">
                          <h4>Lowest</h4>
                          <ul>
                            <li className="info">
                              <span>Support (%)</span>
                              <span>Importance (%)</span>
                            </li>

                            <li className="results">
                              <h5>
                                Thinking/creative thinking{" "}
                                <span className="cxc-super-driver-new"></span>
                              </h5>
                              <div className="results_info">
                                <div className="left">
                                  <span>
                                    47.6 <span className="perc">%</span>
                                  </span>
                                  <span className="cxv-below-benchmark-l-icn red icon"></span>
                                </div>
                                <div className="right">
                                  <span>
                                    44.5 <span className="perc">%</span>
                                  </span>
                                </div>
                              </div>
                            </li>

                            <li className="results">
                              <h5>Reading</h5>
                              <div className="results_info">
                                <div className="left">
                                  <span>
                                    56.7 <span className="perc">%</span>
                                  </span>
                                  <span className="cxv-below-benchmark-l-icn red icon"></span>
                                </div>
                                <div className="right">
                                  <span>
                                    30.2 <span className="perc">%</span>
                                  </span>
                                </div>
                              </div>
                            </li>

                            <li className="results">
                              <h5>Telephone conversations</h5>
                              <div className="results_info">
                                <div className="left">
                                  <span>
                                    47.6 <span className="perc">%</span>
                                  </span>
                                  <span className="cxv-below-benchmark-l-icn red icon"></span>
                                </div>
                                <div className="right">
                                  <span>
                                    57.1 <span className="perc">%</span>
                                  </span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="bottom__actions">
                  {data_filters48.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} bordered={true} />
                  ))}

                  <button className="btn-dash explore has-icn">
                    Explore
                    <span className="cxc-explore"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-12">
                <div className="n_card">
                  <div className="n-body min__height405">
                    <div className="body_top_items">
                      <h3>Feature groups</h3>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="chart__area">
                          <BasicColumnV2 />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="bottom__actions">
                  <button className="btn-dash explore has-icn">
                    Explore
                    <span className="cxc-explore"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-12">
                <div className="n_card">
                  <div className="n-body min__height405">
                    <div className="body_top_items">
                      <h3>Features – highest and lowest</h3>
                      {data_filters43.map((item, i, arr) => (
                        <CustomSelect
                          item={item}
                          i={i}
                          arr={arr}
                          bordered={false}
                        />
                      ))}
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="blocks__area">
                          <h4>Highest</h4>
                          <ul>
                            <li className="info">
                              <span>Satisfaction (%)</span>
                              <span>Importance (%)</span>
                            </li>

                            <li className="results">
                              <h5>
                                Desk{" "}
                                <span className="cxc-super-driver-new"></span>
                              </h5>
                              <div className="results_info">
                                <div className="left">
                                  <span>90.5</span>
                                  <span className="cxv-leesman-l-icn blue icon"></span>
                                </div>
                                <div className="right">
                                  <span>
                                    86.5 <span className="perc">%</span>
                                  </span>
                                  {/* <span className="percentage">%</span> */}
                                </div>
                              </div>
                            </li>

                            <li className="results">
                              <h5>
                                Using technical/specialist equipment or
                                materials{" "}
                              </h5>
                              <div className="results_info">
                                <div className="left">
                                  <span>87.4</span>
                                  <span className="cxv-above-benchmark-l-icn green icon"></span>
                                </div>
                                <div className="right">
                                  <span>
                                    75.3 <span className="perc">%</span>
                                  </span>
                                  {/* <span className="percentage">%</span> */}
                                </div>
                              </div>
                            </li>

                            <li className="results">
                              <h5>General cleanliness</h5>
                              <div className="results_info">
                                <div className="left">
                                  <span>86.2</span>
                                  <span className="cxv-equal-to-benchmark-l-icn dark icon"></span>
                                </div>
                                <div className="right">
                                  <span>
                                    72.0 <span className="perc">%</span>
                                  </span>
                                  {/* <span className="percentage">%</span> */}
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="blocks__area">
                          <h4>Lowest</h4>
                          <ul>
                            <li className="info">
                              <span>Satisfaction (%)</span>
                              <span>Importance (%)</span>
                            </li>

                            <li className="results">
                              <h5>Art & photography</h5>
                              <div className="results_info">
                                <div className="left">
                                  <span>22.2</span>
                                  <span className="cxv-below-benchmark-l-icn red icon"></span>
                                </div>
                                <div className="right">
                                  <span>
                                    31.9 <span className="perc">%</span>
                                  </span>
                                  {/* <span className="percentage">%</span> */}
                                </div>
                              </div>
                            </li>

                            <li className="results">
                              <h5>
                                Space for working with car parts/test equipment
                                (experience)
                              </h5>
                              <div className="results_info">
                                <div className="left">
                                  <span>26.5</span>
                                  <span className="cxv-below-benchmark-l-icn red icon"></span>
                                </div>
                                <div className="right">
                                  <span>
                                    26.5 <span className="perc">%</span>
                                  </span>
                                  {/* <span className="percentage">%</span> */}
                                </div>
                              </div>
                            </li>

                            <li className="results">
                              <h5>Dividers – between desk/areas</h5>
                              <div className="results_info">
                                <div className="left">
                                  <span>27.0</span>
                                  <span className="cxv-below-benchmark-l-icn red icon"></span>
                                </div>
                                <div className="right">
                                  <span>
                                    40.2 <span className="perc">%</span>
                                  </span>
                                  {/* <span className="percentage">%</span> */}
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="bottom__actions">
                  {data_filters48.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} bordered={true} />
                  ))}

                  <button className="btn-dash explore has-icn">
                    Explore
                    <span className="cxc-explore"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-12 divider-col">
            <div className="l-divider" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Overview

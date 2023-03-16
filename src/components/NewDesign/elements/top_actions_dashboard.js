import React, { useState } from "react"
import CustomSelect from "../elements/custom_select"
import DropMenuExport from "../elements/drop_menu_export"

const TopActions = ({
  // Filter items
  setTopSelectFlag,
  isTopSelectFlag,
  isSelectChartType,
  setSelectChartType,
  isExport,
  isChartType,
  isComparisonData,
  isQuestionSet,
  isOrderBy,
  isHeatMapColumns,
  isDataValue,
  isSortRowBy,
  isColumnsRowBy,
  isTopBottom,
  isHeatMapColors,
  isMinimumRespondents,
  isInternalComparison,
  isRows,
  isColumns,
  isCrossValue,
  isOrderRowsBy,
  isOrderColumnsBy,
  isTopBottom10,
  isLmiHlmi,
  isMeasue,
  isGap,
  isColourCoding,
  isAxis,

  // Dummy datas
  data_chartTypes,
}) => {
  const data_filters8 = [
    {
      id: 2,
      label: "",
      options: [
        "Option 001…",
        "Option 002…",
        "Option 003…",
        "Option 004…",
        "Option 005…",
      ],
    },
  ]

  return (
    <>
      <div className="n-body p_20 border_none_lr">
        <div className="chart_top_actions">
          {isExport && (
            <>
              <div className="export_chart__item">
                <DropMenuExport
                  setTopSelectFlag={setTopSelectFlag}
                  isTopSelectFlag={isTopSelectFlag}
                />
              </div>
            </>
          )}

          {isChartType && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Chart type</label>
                  {data_chartTypes.map((item, i, arr) => (
                    <CustomSelect
                      item={item}
                      i={i}
                      arr={arr}
                      isSelectChartType={isSelectChartType}
                      setSelectChartType={setSelectChartType}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {isLmiHlmi && (
            <>
              <div className="chart_action_item has_check">
                <div className="labeled_custom_select default top">
                  <label className="dashboard_check">
                    <input type="checkbox" name="Lmi" value="Lmi" />
                    <span className="label-_text">Lmi</span>
                    <span className="checkmark"></span>
                  </label>
                </div>

                <div className="labeled_custom_select default top">
                  <label className="dashboard_check">
                    <input type="checkbox" name="H-Lmi" value="H-Lmi" />
                    <span className="label-_text">H-Lmi</span>
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            </>
          )}

          {isInternalComparison && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Internal Comparison</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* <div className="h_divider vv"></div> */}

          {isComparisonData && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Comparison data</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}

          {isQuestionSet && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Question set</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}

          {isMeasue && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Measure</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}

          {isGap && (
            <>
              <div className="chart_action_item has_check">
                <div className="labeled_custom_select default top">
                  <label className="dashboard_radio">
                    <input type="radio" name="dd1" value="Gap analysis" />
                    <span className="label-_text">Gap analysis</span>
                    <span className="checkmark"></span>
                  </label>
                </div>

                <div className="labeled_custom_select default top">
                  <label className="dashboard_radio">
                    <input
                      type="radio"
                      name="dd1"
                      value="Internal comparison"
                    />
                    <span className="label-_text">Internal comparison</span>
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            </>
          )}

          {isOrderBy && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Order by</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}

          {isAxis && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Axis</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}

          {isHeatMapColumns && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Heat map columns</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}

          {isDataValue && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Data value</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}

          {isRows && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Rows</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}

          {isColumns && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Columns</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}

          {isCrossValue && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Cross-tab value</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}

          {isOrderRowsBy && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Order rows by</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}

          {isOrderColumnsBy && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Order columns by</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}

          {isSortRowBy && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Sort rows by</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}

          {isColumnsRowBy && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Sort columns by</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}

          {isTopBottom && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Top/bottom</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}

          {isTopBottom10 && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Top/bottom 10</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}

          {isHeatMapColors && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Heat map colours</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}

          {isColourCoding && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Colour coding</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}

          {isMinimumRespondents && (
            <>
              <div className="chart_action_item">
                <div className="labeled_custom_select">
                  <label>Minimum Respondents</label>
                  {data_filters8.map((item, i, arr) => (
                    <CustomSelect item={item} i={i} arr={arr} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default TopActions

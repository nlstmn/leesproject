import React, { useEffect, useState } from "react"
import { Table } from "antd"
import { useDispatch, useSelector } from "react-redux"
import {
  getOtherSurveySetupAction,
  getSurveySetupAction,
  surveySetupDrawerData,
  surveySetupFormData,
} from "../../../../../../../actions/adminActions"
const LocationSurveySettings = ({
  isLocationSurveyDrawer,
  setLocationSurveyDrawer,
}) => {
  const [mergeableColumn, setMergeableColumn] = useState([])
  const dispatch = useDispatch()
  const dataSelector = useSelector(
    (store) => store.getOtherSurveySetupData?.data
  )
  const surveyId = useSelector((store) => store.saveSurveyId.data)
  const clientId = useSelector((store) => store.saveClientIdForSurveys.data)
  const [selectedLocationId, setSelectedLocationId] = useState(null)

  useEffect(() => {
    dispatch(
      surveySetupDrawerData({
        attributes: dataSelector?.attributes,
        locationId: selectedLocationId,
        allLocations: dataSelector?.allLocations,
        selectedLocations: dataSelector?.locations,
        tailored: dataSelector?.tailored,
      })
    )
  }, [selectedLocationId])

  useEffect(() => {
    dispatch(
      surveySetupFormData({
        data: dataSelector.locations,
        allLocations: dataSelector.allLocations,
        requestType: "locations",
        successMessage: "Locations updated successfully",
      })
    )
    dispatch(
      surveySetupDrawerData({
        attributes: dataSelector?.attributes,
        locationId: selectedLocationId,
        allLocations: dataSelector?.allLocations,
        selectedLocations: dataSelector?.locations,
        tailored: dataSelector?.tailored,
      })
    )
  }, [dataSelector.locations])

  const getData = () => {
    dispatch(
      getOtherSurveySetupAction({
        clientId: clientId,
        tab: "locations",
        surveyId: surveyId,
      })
    )
  }
  useEffect(() => {
    getData()
  }, [])

  const populateMergeableColumn = () => {
    let columns = [
      {
        title: "##",
        dataIndex: "id",
        key: "id",
        width: "90px",
      },
      {
        title: "Location group",
        dataIndex: "location_group_name",
        key: "location_group_name",
        render: (item) => <span>{item === null ? " - " : item}</span>,
      },
      {
        title: "Workplace name",
        dataIndex: "label",
        key: "label",
        render: (item) => <span>{item === null ? " - " : item}</span>,
      },
    ]
    dataSelector &&
      dataSelector.attributes &&
      dataSelector.attributes
        .sort((a, b) => a.position - b.position)
        .forEach((item) => {
          columns.push({
            title: item.label,
            dataIndex: item.label,
            key: item.label,
            render: (item) => <span>{item === null ? " - " : item}</span>,
          })
        })
    columns.push({
      title: "Action",
      key: "action",
      width: "130px",
      fixed: "right",
      render: (_, record) => {
        return (
          <div className="action_btns">
            <div className="fixed__btn">
              <button className="icon__btn" title="Delete">
                <span className="cxv-delete-l-icn clients_table_drop"></span>
              </button>
              <button
                onClick={() => {
                  setSelectedLocationId(record.id)
                  setLocationSurveyDrawer(true)
                }}
                className="icon__btn"
                title="Edit"
              >
                <span className="cxv-settings-l-icn clients_table_drop"></span>
              </button>

              {/* <Switch size="small" defaultChecked /> */}
            </div>
          </div>
        )
      },
    })
    setMergeableColumn(columns)
  }
  useEffect(() => {
    populateMergeableColumn()
  }, [dataSelector])

  return (
    <>
      <div className="n__card mt-0">
        <div className="n__body">
          <h3 className="">Selected locations</h3>
          <span className="card_desc">
            Total: <strong>{dataSelector?.locations?.length} locations</strong>
          </span>
          <div className="row">
            <div className="col-lg-12">
              <div className="n_table pr__10 center_labels first_not_center respo">
                <Table
                  columns={mergeableColumn}
                  dataSource={dataSelector?.locations}
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LocationSurveySettings

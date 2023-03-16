import React, { useEffect, useState } from "react"
import { Table } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedPages } from "../../../../../../../actions/adminActions"

const data = [
  {
    key: "BAB001",
    page: "DEMOGRAPHICS",
    index: 0,
  },
  {
    key: "BAB002",
    page: "ACTIVITYQUESTION1",
    index: 1,
  },
  {
    key: "BAB003",
    page: "AVERAGETIME",
    index: 2,
  },
  {
    key: "BAB004",
    page: "LOCATION",
    index: 3,
  },
  {
    key: "BAB005",
    page: "EXTERNALMOBILITY",
    index: 4,
  },
]

const AdditionalPagesTable = ({
  setSelectedPage,
  setPageId,
  surveyModuleId,
}) => {
  const [dataSource, setDataSource] = useState(data)
  const dispatch = useDispatch()
  const pagesData = useSelector((store) => store.getSelectedPages)
  const clientId = useSelector((store) => store.saveClientIdForSurveys.data)
  const surveyId = useSelector((store) => store.saveSurveyId.data)
  useEffect(() => {
    dispatch(getSelectedPages(clientId, surveyId, surveyModuleId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyModuleId])
  const getColumns = () => {
    return [
      {
        title: "Select",
        dataIndex: "radio",
        width: 50,
        className: "drag-hidden",
        render: (_, record) => {
          return (
            <div className="action_btns">
              <div className="fixed__btn">
                <div className="n__form_control">
                  <label className="n__form_label dashboard_radio">
                    <input
                      type="radio"
                      name="pages"
                      value="select"
                      onClick={() => {
                        setPageId(record.id)
                        setSelectedPage(record.name)
                      }}
                    />
                    <span className="label-_text"></span>
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>
            </div>
          )
        },
      },
      {
        title: "Selected pages",
        dataIndex: "name",
        key: "name",
        className: "drag-visible",
      },

      {
        title: "Action",
        key: "action",
        width: "130px",
        fixed: "right",
        className: "drag-hidden",
        render: (_, record) => {
          return (
            <div className="action_btns">
              <div className="fixed__btn">
                <button className="icon__btn" title="Delete user">
                  <span className="cxv-delete-l-icn clients_table_drop"></span>
                </button>

                {/* <Switch size="small" defaultChecked /> */}
              </div>
            </div>
          )
        },
      },
    ]
  }

  return (
    <>
      <Table
        columns={getColumns()}
        dataSource={pagesData.data}
        loading={pagesData.loading}
        pagination={false}
        rowKey="index"
      />
    </>
  )
}

export default AdditionalPagesTable

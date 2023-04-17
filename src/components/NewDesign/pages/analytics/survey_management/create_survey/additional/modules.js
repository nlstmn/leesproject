import React, { useState, useEffect } from "react"
import { Table } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedModules } from "../../../../../../../actions/adminActions"

const AdditionalModulesTable = ({ setSelectedModule, setSurveyModuleId }) => {
  const dispatch = useDispatch()
  const modulesData = useSelector((store) => store?.getSelectedModules)
  const clientId = useSelector((store) => store?.saveClientIdForSurveys?.data)
  const surveyId = useSelector((store) => store?.saveSurveyId?.data)
  useEffect(() => {
    dispatch(getSelectedModules(clientId, surveyId))
  }, [])

  const columns = [
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
                    name="modules"
                    value="select"
                    defaultChecked={record?.survey_module_id === 3}
                    onClick={() => {
                      setSurveyModuleId(record?.survey_module_id)
                      setSelectedModule(record?.title)
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
      title: "Selected modules",
      dataIndex: "title",
      key: "title",
      className: "drag-visible",
      render: (text, record) => {
        return text?.capitalize()
      },
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

  return (
    <>
      <Table
        columns={columns}
        dataSource={
          modulesData && modulesData?.data?.length ? modulesData?.data : []
        }
        loading={modulesData && modulesData?.loading}
        pagination={false}
        rowKey="index"
      />
    </>
  )
}

export default AdditionalModulesTable

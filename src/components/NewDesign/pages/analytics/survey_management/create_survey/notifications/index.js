import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getOtherSurveySetupAction,
  getSurveySetupAction,
} from "../../../../../../../actions/adminActions"
const NotificationsSurveySettings = () => {
  const dispatch = useDispatch()
  const dataSelector = useSelector(
    (store) => store.getOtherSurveySetupData?.data
  )
  const surveyId = useSelector((store) => store.saveSurveyId.data)
  const clientId = useSelector((store) => store.saveClientIdForSurveys.data)

  const getData = () => {
    dispatch(
      getOtherSurveySetupAction({
        clientId: clientId,
        tab: "notifications",
        surveyId: surveyId,
      })
    )
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className="n__card mt-0">
        <div className="n__body">
          <h3 className="">Added emails</h3>
          <span className="card_desc">
            Total: <strong>{dataSelector?.length} emails</strong>
          </span>

          <div className="row">
            <div className="col-lg-4">
              <div className="n__added_list">
                <ul>
                  {dataSelector?.length > 0 &&
                    dataSelector?.map(({ name, email }, index) => {
                      return (
                        <li key={index}>
                          <button className="icon__btn" title="Delete">
                            <span className="cxv-delete-l-icn clients_table_drop"></span>
                          </button>{" "}
                          {name + " - " + email}
                        </li>
                      )
                    })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotificationsSurveySettings

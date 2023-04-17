import { Button, Drawer, Space } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllLanguages,
  surveySetupDrawerData,
  surveySetupFormData,
} from "../../../../../../actions/adminActions"
import { dbToTree } from "../../../../../../util/functions"
import { LightModeTreeColumn } from "../../../../../common/commonComponents/formItems"

const DrawerLanguage = ({
  isLanguageDrawer,
  setLanguageDrawer,
  title,
  isSurvey,
}) => {
  const dispatch = useDispatch()
  const drawerData = useSelector(
    (store) => store.setSurveySetupDrawerData?.data
  )
  const allLanguages = useSelector(
    (store) => store.setSurveySetupDrawerData?.data?.allLanguages
  )
  const selectedLanguages = useSelector(
    (store) => store.setSurveySetupDrawerData?.data?.selectedLanguages
  )
  const formData = useSelector((store) => store.setSurveySetupFormData)
  const [selections, setSelections] = useState([])

  useEffect(() => {
    setSelections(selectedLanguages?.map((i) => i.id))
  }, [allLanguages, selectedLanguages])

  useEffect(() => {
    selections?.length > 0 &&
      JSON.stringify(selections.sort()) !==
        JSON.stringify(selectedLanguages?.map((i) => i.id).sort()) &&
      dispatch(
        surveySetupDrawerData({
          ...drawerData,
          selectedLanguages: allLanguages?.filter((i) =>
            selections?.includes(i.id)
          ),
        })
      )
  }, [selections, drawerData])
  return (
    <>
      <Drawer
        className="filter_drawer small maxt right_filter"
        title=""
        placement={"right"}
        onClose={() => setLanguageDrawer(false)}
        visible={isLanguageDrawer}
        extra={
          <Space>
            <Button onClick={() => setLanguageDrawer(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setLanguageDrawer(false)}>
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setLanguageDrawer(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>

          <div className="row">
            <div className="col-lg-12">
              <h5 className="d_sub_title">All languages</h5>
            </div>

            <LightModeTreeColumn
              type="languages"
              description="Selected Departments"
              setSelected={setSelections}
              checkedKeys={selections}
              treeData={dbToTree(allLanguages)}
            />
          </div>
        </div>

        <div className="bottom_side">
          <button
            onClick={() => setLanguageDrawer(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => setLanguageDrawer(false)}
            className="btn-dash dark float-right tt"
          >
            Apply
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerLanguage

import { Button, Drawer, Tree, Space } from "antd"
import React, { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { surveySetupFormData } from "../../../../../../../actions/adminActions"
import { dbToTree } from "../../../../../../../util/functions"
import { LightModeTreeColumn } from "../../../../../../common/commonComponents/formItems"
const DrawerDepartmentSurvey = ({
  isDepartmentSurveyDrawer,
  setDepartmentSurveyDrawer,
  title,
}) => {
  const dispatch = useDispatch()
  const formDataSelectedDepartments = useSelector(
    (store) => store.getOtherSurveySetupData?.data?.selectedDepartments
  )
  const formDataAllDepartments = useSelector(
    (store) => store.getOtherSurveySetupData?.data?.departments
  )
  const [selections, setSelections] = useState(formDataSelectedDepartments)

  useEffect(() => {
    setSelections(
      formDataSelectedDepartments
        ?.sort((a, b) => a.position - b.position)
        ?.map((i) => i.id)
    )
  }, [formDataSelectedDepartments])

  useEffect(() => {
    dispatch(
      surveySetupFormData({
        data: formDataAllDepartments
          ?.filter((i) => selections?.includes(i.id))
          ?.sort((a, b) => a.position - b.position)
          ?.map((i, index) => {
            return { ...i, position: index }
          }),
        requestType: "departments",
        successMessage: "Departments updated successfully",
      })
    )
  }, [selections])

  return (
    <>
      <Drawer
        className="filter_drawer small maxt right_filter"
        title=""
        placement={"right"}
        onClose={() => setDepartmentSurveyDrawer(false)}
        visible={isDepartmentSurveyDrawer}
        extra={
          <Space>
            <Button onClick={() => setDepartmentSurveyDrawer(false)}>
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={() => setDepartmentSurveyDrawer(false)}
            >
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setDepartmentSurveyDrawer(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>
          <div className="row">
            <div className="col-lg-12">
              <h5 className="d_sub_title">Selected departments</h5>
            </div>
            <div className="col-lg-12">
              <div className="n__form_divider">
                <div className="n__divider"></div>
              </div>
            </div>

            <div className="col-lg-12">
              <LightModeTreeColumn
                type="departments"
                description="Selected Departments"
                setSelected={setSelections}
                checkedKeys={selections}
                treeData={dbToTree(formDataAllDepartments)}
              />
            </div>
          </div>
        </div>

        <div className="bottom_side">
          <button
            onClick={() => setDepartmentSurveyDrawer(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => setDepartmentSurveyDrawer(false)}
            className="btn-dash dark float-right tt"
          >
            Apply
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerDepartmentSurvey

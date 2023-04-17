import { Button, Drawer, Tree, Space } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { surveySetupFormData } from "../../../../../../../actions/adminActions"
import { dbToTree } from "../../../../../../../util/functions"
import { LightModeTreeColumn } from "../../../../../../common/commonComponents/formItems"

const DrawerLocationGroup = ({
  isLocationGroupDrawer,
  setLocationGroupDrawer,
  title,
}) => {
  const dispatch = useDispatch()
  const drawerData = useSelector(
    (store) => store.setSurveySetupDrawerData?.data
  )
  const formData = useSelector((store) => store.setSurveySetupFormData?.data)
  const [selections, setSelections] = useState([])

  useEffect(() => {
    surveySetupFormData({
      data: formData?.data,
      requestType: "locations",
      successMessage: "Locations added successfully",
    })
  }, [selections])

  return (
    <>
      <Drawer
        className="filter_drawer small maxt right_filter"
        title=""
        placement={"right"}
        onClose={() => setLocationGroupDrawer(false)}
        visible={isLocationGroupDrawer}
        extra={
          <Space>
            <Button onClick={() => setLocationGroupDrawer(false)}>
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={() => setLocationGroupDrawer(false)}
            >
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setLocationGroupDrawer(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>
          <div className="row">
            <div className="col-lg-12">
              <h5 className="d_sub_title">Selected locations</h5>
            </div>
            <div className="col-lg-12">
              <div className="n__form_divider">
                <div className="n__divider"></div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="n_input_control has_icon in_drawer_small">
                <span className="cxv-search-l-icn icn"></span>
                <input
                  placeholder="Search..."
                  type="text"
                  className="n_input"
                  id="find-box"
                ></input>
              </div>
            </div>

            <div className="col-lg-12">
              <LightModeTreeColumn
                type="locations"
                description="Selected Locations"
                setSelected={setSelections}
                checkedKeys={selections}
                treeData={dbToTree(
                  formData?.allLocations?.filter((i) => !i.is_location_group)
                )}
              />
            </div>
          </div>
        </div>

        <div className="bottom_side">
          <button
            onClick={() => setLocationGroupDrawer(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => setLocationGroupDrawer(false)}
            className="btn-dash dark float-right tt"
          >
            Apply
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerLocationGroup

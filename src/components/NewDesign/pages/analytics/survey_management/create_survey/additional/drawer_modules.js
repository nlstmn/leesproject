import { Button, Drawer, Tree, Space } from "antd"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAdditionalModules } from "../../../../../../../actions/adminActions"

const DrawerModules = ({ isModulesDrawer, setModulesDrawer, title }) => {
  const dispatch = useDispatch()
  const modulesSelector = useSelector((store) => store.getAdditionalModules)
  const formData = useSelector((store) => store.setSurveySetupFormData.data)

  useEffect(() => {
    dispatch(getAdditionalModules(2))
  }, [])

  useEffect(() => {
    setSelectedKeys(formData?.surveyModules?.map((i) => i.id))
  }, [formData])

  const [checkedKeys, setCheckedKeys] = useState()
  modulesSelector.data.surveyModules !== undefined &&
    modulesSelector.data.surveyModules
      .map((item) => {
        return item.enabled === true && item.id
      })
      .filter((item2) => {
        return Number.isInteger(item2)
      })
  const [selectedKeys, setSelectedKeys] = useState(
    formData?.surveyModules?.map((i) => i.id)
  )

  const onSelect = (selectedKeysValue, info) => {
    setSelectedKeys(selectedKeysValue)
  }

  return (
    <>
      <Drawer
        className="filter_drawer small maxt right_filter"
        title=""
        placement={"right"}
        onClose={() => setModulesDrawer(false)}
        visible={isModulesDrawer}
        extra={
          <Space>
            <Button onClick={() => setModulesDrawer(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setModulesDrawer(false)}>
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setModulesDrawer(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>
          <div className="row">
            <div className="col-lg-12">
              <h5 className="d_sub_title">All modules</h5>
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
              <Tree
                checkable
                // TODO: we will use these functions in future
                // onExpand={onExpand}
                // expandedKeys={expandedKeys}
                // autoExpandParent={autoExpandParent}
                // onCheck={onCheck}
                checkedKeys={selectedKeys}
                onSelect={onSelect}
                selectedKeys={selectedKeys}
                treeData={
                  modulesSelector.data.surveyModules !== undefined &&
                  modulesSelector.data.surveyModules
                    ?.sort((a, b) => a.id - b.id)
                    .map((item) => {
                      return { title: item?.name?.capitalize(), key: item.id }
                    })
                }
              />
            </div>
          </div>
        </div>

        <div className="bottom_side">
          <button
            onClick={() => setModulesDrawer(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => setModulesDrawer(false)}
            className="btn-dash dark float-right tt"
          >
            Apply
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerModules

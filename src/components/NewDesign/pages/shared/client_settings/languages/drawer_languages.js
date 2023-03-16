import { Button, Drawer, Space } from "antd"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllLanguages } from "../../../../../../actions/adminActions"

const DrawerLanguage = ({
  isLanguageDrawer,
  setLanguageDrawer,
  title,
  isSurvey,
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    // TODO: Hardcoded area will change after completed other areas...
    dispatch(getAllLanguages(4159))
  }, [dispatch])

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
            {!isSurvey && (
              <>
                <div className="col-lg-12">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Default language</span>
                      <div className="n__form_select">
                        <select name="industry" id="industry">
                          <option value="Option 1...">English (UK)</option>
                          <option value="Option 2...">Option 2...</option>
                          <option value="Option 3...">Option 3...</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="n__form_divider">
                    <div className="n__divider"></div>
                  </div>
                </div>
              </>
            )}

            <div className="col-lg-12">
              <h5 className="d_sub_title">All languages</h5>
            </div>
            {/* {allLanguages.map((item,idx)=>{
                console.log(`Item ${idx}: ${item}`);
                return (<div className="col-lg-6" key={item.id}>
                <div className="n__form_control">
                  <label className="n__form_label dashboard_check">
                    <input type="checkbox" name={item.label} value={item.enabled} defaultChecked={item.enabled} />
                    <span className="label-_text">{item.label}</span>
                    <span className="checkmark"></span>
                  </label>
                </div>
              </div>)
              })} */}
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

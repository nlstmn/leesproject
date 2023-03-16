import { Button, Drawer, Tree, Space } from "antd"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllLanguages } from "../../../../../../actions/adminActions"

const DrawerTranslations = ({
  isTranslationsDrawer,
  setTranslationsDrawer,
  setLanguageDrawer,
  title,
}) => {
  // REDUX DATA
  const dispatch = useDispatch()
  // Commented, will use
  // const languagesData = useSelector((store) => store.getAllLanguages)
  const surveyId = useSelector((store) => store.saveSurveyId.data)

  useEffect(() => {
    dispatch(getAllLanguages(surveyId))
  }, [])

  return (
    <>
      <Drawer
        className="filter_drawer small right_filter"
        title=""
        placement={"right"}
        onClose={() => setTranslationsDrawer(false)}
        visible={isTranslationsDrawer}
        extra={
          <Space>
            <Button onClick={() => setTranslationsDrawer(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setTranslationsDrawer(false)}>
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setTranslationsDrawer(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>
          <div className="row">
            <div className="col-lg-12 title_with_button">
              <h5 className="d_sub_title">Translate for selected languages</h5>

              <button
                onClick={() => {
                  setLanguageDrawer(true)
                }}
                className="new_l"
              >
                <span className="iconx-plus1"></span> Add new language
              </button>
            </div>
            <div className="col-lg-12">
              <div className="n__form_divider">
                <div className="n__divider"></div>
              </div>
            </div>
            {/* {languagesData.map((item)=>{
                return (
                  <div className="col-lg-12">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>{item.label}</span>
                      <input type="text" name="name" className="n__form_input" />
                    </label>
                  </div>
                </div>
                );
              })} */}
          </div>
        </div>

        <div className="bottom_side">
          <button
            onClick={() => setTranslationsDrawer(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => setTranslationsDrawer(false)}
            className="btn-dash dark float-right tt"
          >
            Apply
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerTranslations

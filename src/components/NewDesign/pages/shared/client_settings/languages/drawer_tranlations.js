import { Button, Drawer, Tree, Space } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllLanguages,
  surveySetupDrawerData,
} from "../../../../../../actions/adminActions"

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
  const drawerData = useSelector(
    (store) => store.setSurveySetupDrawerData?.data
  )
  const surveyId = useSelector((store) => store.saveSurveyId.data)
  const selectedLanguages = useSelector(
    (store) => store.setSurveySetupDrawerData?.data?.selectedLanguages
  )
  const selectedTranslation = useSelector(
    (store) => store.setSurveySetupDrawerData?.data?.selectedTranslation
  )
  const [selectedLanguage, setSelectedLanguage] = useState(12)
  const [label, setLabel] = useState([])
  const [currentTranslation, setCurrentTranslation] = useState([])
  useEffect(() => {
    dispatch(getAllLanguages(surveyId))
  }, [])
  useEffect(() => {
    setCurrentTranslation(selectedTranslation)
  }, [selectedTranslation])
  useEffect(() => {
    // JSON.stringify(currentTranslation) !==
    //   JSON.stringify(selectedTranslation) &&
    // dispatch(
    //   surveySetupDrawerData({
    //     ...drawerData,
    //     selectedTranslation: currentTranslation,
    //   })
    // )
  }, [currentTranslation])

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

            <div className="col-lg-12 col-md-12">
              <div className="n__form_select">
                <select
                  onChange={(e) => {
                    setSelectedLanguage(e.target.value)
                  }}
                  className="form-control"
                  value={selectedLanguage}
                >
                  {selectedLanguages?.map((i) => {
                    return <option value={i.id}>{i?.label}</option>
                  })}
                </select>
              </div>
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <span className="light">
                  {"English translation: " +
                    currentTranslation?.translations?.filter(
                      (i) => i.language_id == 12
                    )[0]?.label}
                </span>
              </div>
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <span className="light">
                  {"selected language translation: " +
                    currentTranslation?.translations?.filter(
                      (i) => i.language_id == selectedLanguage
                    )[0]?.label}
                </span>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="form-group">
                <button
                  type="button"
                  onClick={() => {
                    setLabel(label + " (Organisation name)")
                  }}
                  className="btn btn-sm btn-primary"
                  style={{ marginLeft: "15px" }}
                >
                  Add Organisation code
                </button>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="form-group">
                <button
                  type="button"
                  onClick={() => {
                    setLabel(label + " (Workplace X / Other workplace)")
                  }}
                  className="btn btn-sm btn-primary"
                  style={{ marginLeft: "15px" }}
                >
                  Add location code
                </button>
              </div>
            </div>
            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                {/* bildirim adı */}

                <textarea
                  onChange={(e) => setLabel(e.target.value)}
                  value={label}
                  style={{ minHeight: "200px" }}
                  type="text"
                  className="n__form_input"
                  placeholder="update/create translation"
                />
              </div>
            </div>
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

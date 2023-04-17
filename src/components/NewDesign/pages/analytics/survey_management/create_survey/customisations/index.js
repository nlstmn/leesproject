import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getOtherSurveySetupAction,
  getSurveySetupAction,
  surveySetupFormData,
} from "../../../../../../../actions/adminActions"
const CustomisationsSurveySettings = () => {
  const dispatch = useDispatch()
  const dataSelector = useSelector(
    (store) => store.getOtherSurveySetupData?.data
  )
  const surveyId = useSelector((store) => store.saveSurveyId.data)
  const clientId = useSelector((store) => store.saveClientIdForSurveys.data)
  const [selectedPageId, setSelectedPageId] = useState()
  const [formData, setFormData] = useState([])

  const getData = () => {
    dispatch(
      getOtherSurveySetupAction({
        clientId: clientId,
        tab: "customizations",
        surveyId: surveyId,
      })
    )
  }

  const change = (type, value) => {
    setFormData([
      ...formData.filter((i) => i.type !== type),
      {
        surveyId: surveyId,
        language_id: 12,
        label: value,
        type: type,
      },
    ])
  }

  useEffect(() => {
    if (dataSelector?.translations) {
      setFormData(dataSelector.translations)
    }
  }, [dataSelector.translations])

  useEffect(() => {
    dispatch(
      surveySetupFormData({
        data: formData.map((i) => {
          return {
            surveyId: surveyId,
            language_id: 12,
            value: i.label,
            name: i.type,
          }
        }),
        requestType: "customisations",
        successMessage: "Customisations updated successfully",
      })
    )
  }, [formData])

  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <div className="n__card mt-0">
        <div className="n__body">
          <h3 className="">Customisations</h3>
          <span className="card_desc">
            <span className="mark__title">How to use</span>
            <div className="markdown__info">
              <div className="car_d">
                <div className="type">
                  <div className="heading">Headings</div>
                </div>
                <div className="method"># H1## H2### H3</div>
              </div>
              <div className="car_d">
                <div className="type">
                  <div className="italic">Italic</div>
                </div>
                <div className="method">*This text will render italic*</div>
              </div>
              <div className="car_d">
                <div className="type">
                  <div className="bold">Bold</div>
                </div>
                <div className="method">**This text will render bold**</div>
              </div>
              <div className="car_d">
                <div className="type">
                  <div className="block_quote">Blockquote</div>
                </div>
                <div className="method">{"> blockquote"}</div>
              </div>
              <div className="car_d">
                <div className="type">
                  <div className="ordered">1. Ordered List</div>
                </div>
                <div className="method">
                  1. First item 2. Second item 3. Third item
                </div>
              </div>
              <div className="car_d">
                <div className="type">
                  <div className="unordered">&bull; Unordered List</div>
                </div>
                <div className="method">
                  - First item - Second item - Third item
                </div>
              </div>
              <div className="car_d">
                <div className="type">
                  <div className="link">
                    <a href="https://www.leesmanindex.com/" target="_blank">
                      Link
                    </a>
                  </div>
                </div>
                <div className="method">
                  [Link](https://www.leesmanindex.com/)
                </div>
              </div>
            </div>
          </span>

          <div className="row">
            <div className="col-lg-3">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Pages</span>
                  <div className="n__form_select">
                    <select
                      name="page"
                      id="page"
                      onChange={(e) => {
                        setSelectedPageId(e.target.value)
                      }}
                    >
                      <option>Select Page</option>
                      {dataSelector?.pages?.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.name?.capitalize() + " - "}
                          {item?.headings?.filter((i) => i)[0] &&
                            item?.headings?.filter((i) => i)[0]?.capitalize() +
                              " - "}
                          {item?.question_label[0]?.capitalize()}
                        </option>
                      ))}
                    </select>
                    <div className="icn cxv-expand-more-l-icn"></div>
                    <div className="n__form_control">
                      <label className="n__form_label">
                        <span>Welcome popup</span>
                        <textarea
                          type="text"
                          style={{ height: "200px" }}
                          name="name"
                          onChange={(e) => {
                            change(
                              `page_${selectedPageId}_popup`,
                              e.target.value
                            )
                          }}
                          value={
                            formData?.filter(
                              (i) => i.type == `page_${selectedPageId}_popup`
                            )[0]?.label || ""
                          }
                          className="n__form_input"
                          placeholder="This is page popup..."
                        />
                      </label>
                    </div>{" "}
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-9 mt-4">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Intro text</span>
                  <textarea
                    type="text"
                    name="name"
                    onChange={(e) => {
                      change("intro", e.target.value)
                    }}
                    value={formData?.filter((i) => i.type == "intro")[0]?.label}
                    className="n__form_input"
                    placeholder="this is intro text..."
                  />
                </label>
              </div>
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Closing text</span>
                  <textarea
                    type="text"
                    name="name"
                    onChange={(e) => {
                      change("close", e.target.value)
                    }}
                    value={formData?.filter((i) => i.type == "close")[0]?.label}
                    className="n__form_input"
                    placeholder="this is closing text..."
                  />
                </label>
              </div>
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Welcome popup</span>
                  <textarea
                    type="text"
                    onChange={(e) => {
                      change("welcome_popup", e.target.value)
                    }}
                    value={
                      formData?.filter((i) => i.type == "welcome_popup")[0]
                        ?.label
                    }
                    name="name"
                    className="n__form_input"
                    placeholder="this is welcome popup..."
                  />
                </label>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomisationsSurveySettings

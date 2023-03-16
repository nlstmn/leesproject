import React, { useState } from "react"
import AdditionalModulesTable from "./modules"
import AdditionalPagesTable from "./pages"
import AdditionalQuestionsTable from "./questions"

const AdditionalSettings = () => {
  const [surveyModuleId, setSurveyModuleId] = useState(3)
  const [pageId, setPageId] = useState(null)
  const [selectedModule, setSelectedModule] = useState("office + home")
  const [selectedPage, setSelectedPage] = useState("")
  return (
    <>
      <div className="n__card mt-0">
        <div className="n__body">
          <h3 className="">Additional modules and questions</h3>

          <div className="row">
            <div className="col-lg-4 col_b_r col_b_ll mt-3">
              <span className="card_desc">Selected modules</span>

              {/* TODO: commented out parts will implement in next pr */}

              {/* <div className="n_table pr__10 center_labels first_not_center second_not_center third_not_center respo">
                <AdditionalModulesTable
                  setSelectedModule={setSelectedModule}
                  surveyModuleId={surveyModuleId}
                  setSurveyModuleId={setSurveyModuleId}
                />
              </div> */}
            </div>
            {surveyModuleId !== null && (
              <div className="col-lg-4 col_b_r mt-3">
                <span className="card_desc">
                  Selected pages of{" "}
                  <strong>{selectedModule.toUpperCase()}</strong> module
                </span>
                {/* <div className="n_table pr__10 center_labels first_not_center second_not_center third_not_center respo">
                  <AdditionalPagesTable
                    setSelectedPage={setSelectedPage}
                    setPageId={setPageId}
                    surveyModuleId={surveyModuleId}
                  />
                </div> */}
              </div>
            )}
            <div className="col-lg-4 col_b_r col_b_rr mt-3">
              <span className="card_desc">
                Selected questions of{" "}
                <strong>{selectedPage.toUpperCase()}</strong> page
              </span>
              {/* <div className="n_table pr__10 center_labels first_not_center second_not_center third_not_center respo">
                {pageId !== null && (
                  <AdditionalQuestionsTable pageId={pageId} />
                )}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdditionalSettings

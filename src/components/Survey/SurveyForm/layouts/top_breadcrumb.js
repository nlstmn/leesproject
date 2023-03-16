import React, { useEffect, useState } from "react"
import { findTextFromTranslations } from "../../../../util/functions"

const TopBreadcrumb = ({
  pageCount,
  isPage,
  currentPage,
  languages,
  selectedLanguageId,
}) => {
  const [label, setLabel] = useState("")
  useEffect(() => {
    setLabel(
      currentPage[0]?.module_client_id
        ? currentPage[0]?.module_description
        : currentPage[0]?.page_group_name
        ? currentPage[0]?.page_type
        : "About you"
    )
  }, [currentPage])
  return (
    <>
      <div id="breadcrumb_survey">
        <ul>
          <li className="breadcrumb-item_survey">
            <span>
              {findTextFromTranslations(
                "Welcome",
                selectedLanguageId,
                languages
              )}
            </span>
          </li>
          <li className="breadcrumb-item_survey">
            <span>
              {findTextFromTranslations(
                label?.capitalize(),
                selectedLanguageId,
                languages
              )}
            </span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default TopBreadcrumb

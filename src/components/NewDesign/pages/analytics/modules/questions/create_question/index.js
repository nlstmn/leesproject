import React, { useState } from "react"
import EditQMain from "./_main"
import EditQOptions from "./_options"
import EditQOther from "./_other"

const CreateQuestion = () => {
  const [checkedQType, setQType] = useState("Dropdown")

  return (
    <>
      <div id="create__q" className="create__question">
        <div className="row">
          {/* <div className="col-lg-12">
                <h5 className="d_sub_title">Edit</h5>
            </div> */}
          <div className="col-lg-12">
            <div className="n__form_divider">
              <div className="n__divider"></div>
            </div>
          </div>

          <EditQMain checkedQType={checkedQType} setQType={setQType} />

          {checkedQType !== "Comment" ? (
            <EditQOptions checkedQType={checkedQType} setQType={setQType} />
          ) : (
            <></>
          )}

          {checkedQType === "Dropdown" ||
          checkedQType === "Checkbox" ||
          checkedQType === "Scale" ||
          checkedQType === "Custom" ? (
            <EditQOther checkedQType={checkedQType} setQType={setQType} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  )
}

export default CreateQuestion

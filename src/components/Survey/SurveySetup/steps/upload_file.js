import React from "react"
import { fadeInRight } from "react-animations"
import Radium, { StyleRoot } from "radium"
import { UploadContent } from "../../../HOC/components/info_contents"
import { Upload, Popover, message } from "antd"

const styles = {
  fadeInRight: {
    animation: "x 1s",
    animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
  },
}

const { Dragger } = Upload

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file
    if (status !== "uploading") {
      console.log(info.file, info.fileList)
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files)
  },
}

const UploadFile = ({ skipEmail }) => {
  return (
    <>
      <StyleRoot style={styles.fadeInRight} className="wizard_sc">
        <div id="middle-wizard">
          <div className="question_div">
            {/* Question Title */}
            <h3 className="main_question">
              {skipEmail ? "16." : "15."} Please upload the{" "}
              <strong>Setup Excel file</strong> below.
            </h3>
            <Popover content={UploadContent}>
              <h4 className="more-info-class">
                <span className="iconx-info-with-circle"></span> More info
              </h4>
            </Popover>

            {/* Actions */}
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <span className="iconx-upload-cloud"></span>
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">Size limit: 10 MB</p>
            </Dragger>
          </div>
        </div>
      </StyleRoot>
    </>
  )
}

export default UploadFile

import React, { useEffect, useState } from "react"
import { PlusOutlined } from "@ant-design/icons"
import { Upload, Checkbox } from "antd"
import axios from "axios"
import { notification } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { getClientIndustry } from "../../../../../../actions/adminActions"

const MainSettings = ({
  clientName,
  setClientName,
  clientRefNo,
  setClientRefNo,
  website,
  setWebsite,
  checkedInside,
  setCheckedInside,
  checkedFeedbacks,
  setCheckedFeedbacks,
  checkedQuestions,
  setCheckedQuestions,
  checkedXp,
  setCheckedXp,
  clientIndustry,
  setClientIndustry,
  enableHybridFutureCheck,
  setEnableHybridFutureCheck,
}) => {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id")
  const dispatch = useDispatch()
  const clientIdFromTable = useSelector(
    (store) => store.saveClientIdForSurveys.data
  )
  const rowData = useSelector((store) => store.saveRowData.data)
  const industryData = useSelector((store) => store.getClientIndustry)
  const [previewImage, setPreviewImage] = useState("")
  const [fileList, setFileList] = useState("")
  // This state controls whether we have image or not
  const [imagePreviewExists, setImagePreviewExists] = useState(false)
  const [clientOrganisaton, setClientOrganisaton] = useState(1)

  const organisationData = [
    {
      value: 1,
      label: "1 - 10 employees",
    },
    {
      value: 2,
      label: "11 - 24 employees",
    },
    {
      value: 3,
      label: "25 - 49 employees",
    },
    {
      value: 4,
      label: "50 - 99 employees",
    },
    {
      value: 5,
      label: "100 - 249 employees",
    },
    {
      value: 6,
      label: "250 - 499 employees",
    },
    {
      value: 7,
      label: "500 - 999 employees",
    },
    {
      value: 8,
      label: "1000 - 4999 employees",
    },
    {
      value: 9,
      label: "Over 5000 employees",
    },
  ]

  const getImage = async (clientIdNumber) => {
    await axios
      .get(`v2admin/clients/${clientIdNumber}/clientmanagement/get-logo-url`)
      .then(async (res) => {
        setPreviewImage(res.data)
        setImagePreviewExists(true)
      })
      .catch((err) => console.log("IMG GET ERROR", err))
  }

  const handleOnChange = ({ file, fileListArr, event }) => {
    console.log(file, fileList, event)
    //Using Hooks to update the state to the current filelist
    setFileList(fileListArr)
    //filelist - [{uid: "-1",url:'Some url to image'}]
  }
  useEffect(() => {
    clientIdFromTable !== null && getImage(clientIdFromTable)
  }, [previewImage])

  useEffect(() => {
    setClientName(rowData.name)
    setClientRefNo(rowData.client_ref_no)
    setClientIndustry(rowData.industry_id || parseInt(clientIndustry))
    setEnableHybridFutureCheck(
      rowData.enable_hybrid_future || rowData.enableHybridFuture
    )
    dispatch(getClientIndustry(1))
  }, [])

  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options
    const fmData = new FormData()

    fmData.append("image", file)
    await axios
      .get(
        `/v2admin/clients/${clientIdFromTable}/clientmanagement/put-logo-url`,
        {
          params: { contentType: file.type },
        }
      )
      .then(async (res) => {
        const uploadPromise = fetch(res.data, {
          // For Uploading Events
          onUploadProgress: (event) => {
            console.log((event.loaded / event.total) * 100)
            onProgress({ percent: (event.loaded / event.total) * 100 }, file)
          },
          method: "PUT",
          body: file,
        })
        return uploadPromise
          .then((val) => {
            onSuccess(file)
            getImage(clientId)
            notification.success({
              message: `Client Logo Upload Successful!`,
              placement: "topRight",
              duration: 2,
            })
          })
          .catch((err) => {
            notification.warning({
              message: `Client Logo Upload Warning!`,
              placement: "topRight",
              duration: 2,
            })
          })
      })
      .catch((err) => {
        const error = new Error("Some error")
        notification.error({
          message: `Client Logo Upload Error!`,
          placement: "topRight",
          duration: 2,
        })
        onError({ event: error })
      })
  }

  const uploadButton = (
    <div>
      {<PlusOutlined />}
      <div className="mt-2">Upload</div>
    </div>
  )

  return (
    <>
      <div className="n__card my-0">
        <div className="n__body">
          <h3 className="">Main</h3>
          <div className="row">
            <div className="col-lg-6">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Client name *</span>
                  <input
                    type="text"
                    name="name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="n__form_input"
                    required
                  />
                </label>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Client Ref No *</span>
                  <input
                    type="text"
                    name="name"
                    value={clientRefNo}
                    onChange={(e) => {
                      setClientRefNo(e.target.value)
                    }}
                    className="n__form_input"
                    required
                  />
                </label>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Client industry</span>
                  <div className="n__form_select">
                    <select
                        name="industry"
                        id="industry"
                        onChange={(e) => {
                          const industryValue = e.target.value
                          setClientIndustry(industryValue)
                        }}
                    >
                      <option value="" disabled hidden selected>
                        Please Select Industry
                      </option>
                      {industryData.data.length > 0 &&
                          industryData.data.map((item) => (
                              <option
                                  value={item.id}
                                  key={item.id}
                              >
                                {item.name}
                              </option>
                          ))}
                    </select>
                    <div className="icn cxv-expand-more-l-icn"></div>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="n__form_control">
                <label className="n__form_label">
                  <span>Size of organisaton</span>
                  <div className="n__form_select">
                    <select
                      name="organisaton"
                      id="organisaton"
                      onChange={(e) => {
                        const organisatonValue = e.target.value
                        setClientOrganisaton(organisatonValue)
                      }}
                    >
                      <option value="" disabled hidden selected>
                        Please select
                      </option>
                      {organisationData?.map((item) => (
                        <option
                          value={item.value}
                          key={item.value}

                        >
                          {item.label}
                        </option>
                      ))}
                    </select>
                    <div className="icn cxv-expand-more-l-icn"></div>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="n__form_control">
                <Checkbox
                  type="checkbox"
                  name="enable-hybrid-future"
                  id="enable-hybrid-future"
                  checked={enableHybridFutureCheck}
                  onChange={(e) => setEnableHybridFutureCheck(e.target.checked)}
                >
                  THF Client
                </Checkbox>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="n__form_control">
                {clientIdFromTable !== null && (
                  <>
                    {" "}
                    <label className="n__form_label">
                      <span>Upload client logo *</span>
                    </label>{" "}
                    <Upload
                      listType="picture-card"
                      onChange={handleOnChange}
                      customRequest={uploadImage}
                      fileList={fileList}
                      maxCount={1}
                      progress={{ strokeWidth: 2, showInfo: false }}
                      showUploadList={false}
                    >
                      {previewImage !== "" && imagePreviewExists ? (
                        <img
                          src={previewImage}
                          onError={(e) => {
                            e.target.onerror = null
                            setImagePreviewExists(false)
                          }}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "inherit",
                          }}
                          alt="Preview"
                        />
                      ) : (
                        !imagePreviewExists && uploadButton
                      )}
                    </Upload>
                  </>
                )}
              </div>
            </div>

            {checkedInside && (
              <div className="col-lg-3">
                <div className="n__form_control">
                  <label className="n__form_label">
                    <span>Question validity period (days)</span>
                    <input
                      width="50"
                      height="50"
                      type="url"
                      name="name"
                      className="n__form_input"
                    />
                  </label>
                </div>
              </div>
            )}
            <div className="col-lg-12">
              <div className="flex_groups">
                <div className="n__form_control">
                  {/* THIS HAS TO STAY COMMENTED - WILL BE UPDATED AFTER CUSTOMER FEEDBACK */}
                  {/*<label className="n__form_label dashboard_check">
                    <input type="checkbox" name="Inside" value={checkedInside} onChange={() => setCheckedInside(!checkedInside)} />
                    <span className="label-_text">Inside</span>
                    <span className="checkmark"></span>
                  </label>*/}
                </div>

                {checkedInside && (
                  <>
                    <div className="horizontal__divider"></div>
                    <div className="n__form_control">
                      <label className="n__form_label dashboard_check">
                        <input
                          type="checkbox"
                          name="Feedbacks"
                          value={checkedFeedbacks}
                          onChange={() =>
                            setCheckedFeedbacks(!checkedFeedbacks)
                          }
                        />
                        <span className="label-_text">Feedbacks</span>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="n__form_control">
                      <label className="n__form_label dashboard_check">
                        <input
                          type="checkbox"
                          name="Questions"
                          value={checkedQuestions}
                          onChange={() =>
                            setCheckedQuestions(!checkedQuestions)
                          }
                        />
                        <span className="label-_text">Questions</span>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <div className="n__form_control">
                      <label className="n__form_label dashboard_check">
                        <input
                          type="checkbox"
                          name="Xp"
                          value={checkedXp}
                          onChange={setCheckedXp}
                        />
                        <span className="label-_text">Xp</span>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainSettings

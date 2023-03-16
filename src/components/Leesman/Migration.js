import React, { useEffect, useLayoutEffect, useState } from "react"
import { Popconfirm, message } from "antd"
import { leesmanMigrationAction } from "../../actions/leesmanActions"
import { useSelector, useDispatch } from "react-redux"

const Migration = () => {
  const dispatch = useDispatch()
  const { allData } = useSelector((store) => store.leesmanMigration)
  const [selectedTab, setSelectedTab] = useState("")
  const [selected1, setSelected1] = useState([])
  const [selected2, setSelected2] = useState([])
  const [buffer1, setBuffer1] = useState([])
  const [buffer2, setBuffer2] = useState([])

  function confirm(e) {
    console.log(e)
    message.success("Successful.", [3])
  }

  function cancel(e) {
    console.log(e)
    message.error("Cancelled.")
  }

  useLayoutEffect(() => {
    getData()
  }, [])
  const getData = () => {
    dispatch(leesmanMigrationAction)
    setSelectedTab("Clients")
  }

  useEffect(() => {
    selectData(selectedTab)
  }, [selectedTab])

  const selectData = (type) => {
    console.log(type)
    switch (type) {
      case "Clients":
        console.log(allData)
        console.log(allData?.analyticsClients)
        setSelected1(allData?.analyticsClients)
        setSelected2(allData?.insideClients)
        setBuffer1(allData?.analyticsClients)
        setBuffer2(allData?.insideClients)
        break
      case "Departments":
        setSelected1(allData?.analyticsDepartments)
        setSelected2(allData?.insideDepartments)
        setBuffer1(allData?.analyticsDepartments)
        setBuffer2(allData?.insideDepartments)
        break
      case "Locations":
        setSelected1(allData?.analyticsLocations)
        setSelected2(allData?.insideLocations)
        setBuffer1(allData?.analyticsLocations)
        setBuffer2(allData?.insideLocations)
        break
      case "Questions":
        setSelected1(allData?.analyticsQuestions)
        setSelected2(allData?.analyticsQuestions)
        setBuffer1(allData?.analyticsQuestions)
        setBuffer2(allData?.analyticsQuestions)
        break
      case "Options":
        setSelected1(allData?.analyticsOptions)
        setSelected2(allData?.analyticsOptions)
        setBuffer1(allData?.analyticsOptions)
        setBuffer2(allData?.analyticsOptions)
        break
      default:
        break
    }
  }

  return (
    <div className="container-fluid new-2022_class">
      <div className="block-header">
        <div className="row clearfix">
          <div className="col-md-12 col-sm-12">
            <ul className="nav nav-tabs3 mt-0 mb-2">
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    selectedTab === "Clients" && " active"
                  }`}
                  onClick={() => setSelectedTab("Clients")}
                  data-toggle="tab"
                  href="#!"
                >
                  Clients
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    selectedTab === "Departments" && " active"
                  }`}
                  onClick={() => setSelectedTab("Departments")}
                  data-toggle="tab"
                  href="#!"
                >
                  Departments
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    selectedTab === "Locations" && " active"
                  }`}
                  onClick={() => setSelectedTab("Locations")}
                  data-toggle="tab"
                  href="#!"
                >
                  Locations
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    selectedTab === "Questions" && " active"
                  }`}
                  onClick={() => setSelectedTab("Questions")}
                  data-toggle="tab"
                  href="#!"
                >
                  Questions
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    selectedTab === "Options" && " active"
                  }`}
                  onClick={() => setSelectedTab("Options")}
                  data-toggle="tab"
                  href="#!"
                >
                  Options
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row clearfix">
        <div className="col-xl-12 col-lg-12 col-md-12">
          <div className="row mb-4 page-__header">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <h5 className="light-black">{selectedTab}</h5>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 jus-end">
              <a className="btn btn-default bigger-_btn ml-3" href="#!">
                Undo Last Action
              </a>

              <Popconfirm
                title="Are you sure to save all the last actions?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <a className="btn btn-primary bigger-_btn ml-3" href="#!">
                  Save Last Action
                </a>
              </Popconfirm>
            </div>
          </div>
        </div>

        <div className="col-xl-12 col-lg-12 col-md-12 migration-_sections mt--22">
          {/* OLD DATA */}
          <div className="card">
            <div className="header">
              <h2>Analiytics Data</h2>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="body">
              {buffer1?.map((item) => (
                <label className="fancy-checkbox" key={item.id}>
                  <input type="checkbox" name="old-data" />
                  <span className="light-black">
                    {item.label}
                    {item.code && (
                      <i>
                        <i>{"  code:" + item.code}</i>
                      </i>
                    )}
                  </span>
                </label>
              ))}
            </div>
          </div>
          {/* OLD DATA */}

          {/* NEW DATA */}
          <div className="card">
            <div className="header">
              <h2>Inside Data</h2>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="body">
              <Popconfirm
                title="Are you sure to undo this action?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <a className="btn btn-primary mig-_btn" href="#!">
                  Map
                </a>
              </Popconfirm>

              {buffer2?.map((item) => (
                <label className="fancy-radio" key={item.id}>
                  <input type="radio" name="new-data" />
                  <span className="light-black">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
          {/* NEW DATA */}

          {/* OVERVİEW */}
          <div className="card">
            <div className="header">
              <h2>Summary</h2>
              <div className="input-group opacity-_z">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </div>
            </div>
            <div className="body">
              <div className="migrated_card">
                <Popconfirm
                  title="Are you sure to undo this action?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <a className="btn btn-default btn-sm undo-mig" href="#!">
                    Undo
                  </a>
                </Popconfirm>
                <div className="row text-center">
                  <div className="col-lg-6 border-right">
                    <label className="mb-0">
                      <strong>ANALIYTICS DATA</strong>
                    </label>
                    <p className="text-muted mt-0 mb-0">
                      Analiytics Data label 1
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <label className="mb-0">
                      <strong>INDSIDE DATA</strong>
                    </label>
                    <p className="text-muted mt-0 mb-0">Inside Data label 1</p>
                  </div>
                </div>
              </div>

              <div className="migrated_card">
                <Popconfirm
                  title="Are you sure to undo this action?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <a className="btn btn-default btn-sm undo-mig" href="#!">
                    Undo
                  </a>
                </Popconfirm>
                <div className="row text-center">
                  <div className="col-lg-6 border-right">
                    <label className="mb-0">
                      <strong>ANALIYTICS DATA</strong>
                    </label>
                    <p className="text-muted mt-0 mb-0">
                      Analiytics Data label 5
                    </p>
                    <p className="text-muted mt-0 mb-0">
                      Analiytics Data label 6
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <label className="mb-0">
                      <strong>INDSIDE DATA</strong>
                    </label>
                    <p className="text-muted mt-0 mb-0">Inside Data label 2</p>
                  </div>
                </div>
              </div>

              <div className="migrated_card">
                <Popconfirm
                  title="Are you sure to undo this action?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <a className="btn btn-default btn-sm undo-mig" href="#!">
                    Undo
                  </a>
                </Popconfirm>
                <div className="row text-center">
                  <div className="col-lg-6 border-right">
                    <label className="mb-0">
                      <strong>ANALIYTICS DATA</strong>
                    </label>
                    <p className="text-muted mt-0 mb-0">
                      Analiytics Data label 1
                    </p>
                    <p className="text-muted mt-0 mb-0">
                      Analiytics Data label 2
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <label className="mb-0">
                      <strong>INDSIDE DATA</strong>
                    </label>
                    <p className="text-muted mt-0 mb-0">Inside Data label 11</p>
                    <p className="text-muted mt-0 mb-0">Inside Data label 12</p>
                    <p className="text-muted mt-0 mb-0">Inside Data label 34</p>
                    <p className="text-muted mt-0 mb-0">Inside Data label 88</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* OVERVİEW */}
        </div>
      </div>
    </div>
  )
}

export default Migration

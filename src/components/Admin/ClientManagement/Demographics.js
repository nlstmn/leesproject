import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import Tabs from "./Tabs"
import { notification } from "antd"
import Loader from "../../common/Loader"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import {
  getPreferencesDemographicAction,
  sendPreferencesDemographicAction,
} from "../../../actions/adminActions"

const Demographics = () => {
  const dispatch = useDispatch()
  const { options, data, error } = useSelector(
    (store) => store.getPreferencesDemographic
  )
  const { error: sendError } = useSelector(
    (store) => store.sendPreferencesDemographic
  )

  const [populated, setPopulated] = useState([])
  const [selectedHeadings, setSelectedHeadings] = useState([])
  const [selections, setSelections] = useState([])
  const [loading, setloading] = useState(true)
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id")

  useEffect(() => {
    getPreferences()
  }, [])
  useEffect(() => {
    setSelectedHeadings(
      options
        .filter((i) => i.options.filter((o) => o.is_selected === 1).length > 0)
        .map((i) => i.heading)
    )
  }, [options])
  useEffect(() => {
    populate(options)
  }, [selections, selectedHeadings])

  const getPreferences = () => {
    dispatch(getPreferencesDemographicAction({ clientId }))
    if (data.message !== "FAIL" && data.result) {
      if (data.result.length === 0) {
        notification.warning({ message: "No data found!" })
      }

      populateSelections(data.result)
    }
    setloading(false)

    if (error) {
      notification.warning({ message: "No client found!" })
    }
  }
  const populateSelections = (o) => {
    let selected = []
    o.forEach((item) => {
      item.options.forEach((i) => {
        if (i.is_selected) {
          selected.push(i.option_id)
        }
      })
    })
    setSelections([...selected])
  }
  const populate = (e) => {
    let arr = e.map((item) => {
      return (
        <div className="col-lg-4 col-md-12">
          <div className="form-group">
            <span className="light-black list-group-item min-h-316">
              <strong>{item.heading}</strong>
              <div className="float-right">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={selectedHeadings.includes(item.heading)}
                    name={item.heading}
                    onChange={() => {
                      changeMultiple(item.heading)
                    }}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <ul>
                {item.options
                  .sort((a, b) => {
                    if (a.option_label < b.option_label) return -1
                    if (a.option_label > b.option_label) return 1
                    return 0
                  })
                  .sort((a, b) => {
                    if (a.position < b.position) return -1
                    if (a.position > b.position) return 1
                    return 0
                  })
                  .map((i) => {
                    return (
                      <li>
                        <label className="fancy-checkbox">
                          <input
                            type="checkbox"
                            name={i.option_id}
                            checked={selections.includes(i.option_id)}
                            onChange={() => {
                              changeCheckBox(i.option_id)
                            }}
                          />
                          <span className="light-black">{i.option_label}</span>
                        </label>
                      </li>
                    )
                  })}
              </ul>
            </span>
          </div>
        </div>
      )
    })
    setPopulated(arr)
  }

  const changeCheckBox = (e) => {
    let arr = selections
    if (arr.includes(e)) {
      arr = arr.filter((i) => i !== e)
    } else {
      arr.push(e)
    }
    setSelections([...arr])
  }
  const changeMultiple = (e) => {
    let arr = selectedHeadings
    if (arr.includes(e)) {
      arr = arr.filter((i) => i !== e)
      removeMultiple(e)
    } else {
      arr.push(e)
      addMultiple(e)
    }
    setSelectedHeadings([...arr])
  }
  const addMultiple = (e) => {
    const arr = selections
    let option_ids = options
      .filter((i) => i.heading === e)[0]
      .options.map((item) => {
        return item.option_id
      })

    option_ids.forEach((item) => {
      if (!selections.includes(item)) {
        arr.push(item)
      }
    })
    setSelections([...arr])
  }
  const removeMultiple = (e) => {
    let arr = selections
    let option_ids = options
      .filter((i) => i.heading === e)[0]
      .options.map((item) => {
        return item.option_id
      })

    option_ids.forEach((item) => {
      if (selections.includes(item)) {
        arr = arr.filter((i) => i !== item)
      }
    })
    setSelections([...arr])
  }

  const sendPreferences = () => {
    sendPreferencesDemographicAction({ clientId, selections })

    notification.success({ message: "Preferences changed!" })

    if (sendError) {
      notification.error({ message: "Somethings wrong!" })
    }
  }
  return (
    <>
      <div className="container-fluid clients-page dd new-2022_class">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12">
              <h1>Admin management</h1>
              <Tabs></Tabs>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="row mb-4 page-__header">
              <div className="col-xl-6 col-lg-6 col-md-6">
                <h2 className="card-title mt-4">Demographics</h2>
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 mt--22">
            <div className="card">
              <div className="body">
                <div className="row clearfix">
                  {loading ? <Loader /> : populated}
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <Link
                      to="/clients"
                      className="btn btn-sm btn-default mr-1 float-l"
                    >
                      Cancel
                    </Link>{" "}
                    &nbsp;&nbsp;
                    <a
                      onClick={sendPreferences}
                      className="btn btn-sm btn-primary mr-1 float-r"
                    >
                      Save
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Demographics

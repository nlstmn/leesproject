import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import AdvancedFilter from "../common/AdvancedFilter"
import Loader from "../common/Loader"
import IsEmpty from "../common/IsDataEmpty"
import LoaderLarge from "../common/LoaderLarge"
import { Collapse } from "antd"
import ImportExport from "../common/ImportExport"
import { FeedbackCommentsAction } from "../../actions/clientActions"
import { useDispatch, useSelector } from "react-redux"
const { Panel } = Collapse

//let userFeedback = [];
const FeedbackCommentsView = (props) => {
  const dispatch = useDispatch()
  const { userFeedback, error } = useSelector(
    (store) => store.feedbackCommentsViewReducer
  )
  useEffect(() => {
    if (
      window.location.pathname === "/feedback-comments-view" &&
      document.querySelector("#comments-_link") !== null
    ) {
      document.querySelector("#comments-_link").classList.add("active")
    }
  }, [])
  const [openModal, setModal] = useState("")

  const [count, setCount] = useState(50)
  const [bufferData, setBufferData] = useState([])
  const [positives, setPositives] = useState([])
  const [negatives, setNegatives] = useState([])
  const [Tags, setTags] = useState([])
  const [FeedbackData, setFeedbackData] = useState({})
  const [type, setType] = useState("all")
  const [val, setVal] = useState("")
  const [loading, setLoading] = useState(true)
  const [filterData, setFilterData] = useState([])

  const query = new URLSearchParams(props.location.search)

  const isPositiveUrl = query.get("i_p")
  const locationUrl = query.get("l")

  useEffect(() => {
    console.log(filterData)
    filterData?.start && getData()
  }, [filterData])
  useEffect(() => {
    if (Tags.length > 0) {
      setModal("active")
    }
  }, [Tags])
  useEffect(() => {
    populateFeedbacks()
  }, [bufferData])
  useEffect(() => {
    setBufferData(userFeedback.slice(0, count))
  }, [userFeedback, count])

  const getData = () => {
    let fdata = {
      ...filterData,
      page: "comments",
    }
    dispatch(FeedbackCommentsAction({ fdata }))

    setLoading(false)

    if (error) {
      sessionStorage.removeItem("filterData")
      window.location.reload(false)
      return
    }
  }
  const filterFeedbacks = (e) => {
    let buffer = []
    userFeedback.forEach((item) => {
      if (String(item.text).toLowerCase().includes(e.toLowerCase())) {
        buffer.push(item)
      }
    })

    setBufferData(buffer.slice(0, count))
    populateFeedbacks()
  }
  const change = (e) => {
    const { value } = e.target
    setVal(value)
    filterFeedbacks(value)
  }
  const populateFeedbacks = () => {
    let e = bufferData
    if (locationUrl && isPositiveUrl) {
      let bool = isPositiveUrl === "1" ? true : false
      e = e.filter(
        (i) => i.ispositive === bool && i.location_type === locationUrl
      )
    }

    console.log(e)
    let positiveBuffer = []
    let negativeBuffer = []
    e = e.filter((i) => i.text)
    e.map((item, i) => {
      if (item.ispositive) {
        positiveBuffer.push(
          <Panel
            header={item.text}
            key={i}
            className="collapse-Positive-status"
          >
            {/* Açılan alan */}
            <div className="row text-leftt pt-20">
              <div className="col-lg-12">
                <h6 className="score-title-left">
                  <strong>Feedback:</strong>
                </h6>
                <p className="question-text">{item.text}</p>
              </div>
            </div>
            <div className="tags-section">
              <div className="row clearfix">
                <div className="col-12">
                  <h6 className="score-title-left">
                    <strong>Tags:</strong>
                  </h6>
                  <ul className="nav">
                    {item.tags !== "[]"
                      ? item.tag_labels.map((q) => {
                          return (
                            <li className="nav-item m-lr-5">
                              <span className="feedback-tag">{q}</span>
                            </li>
                          )
                        })
                      : "No Tags (old data)"}
                  </ul>
                </div>
              </div>
            </div>
            <div className="row text-leftt">
              <div className="col-lg-6 col-6">
                <p className="question-text float-l">ID: {item.id}</p>
              </div>
              <div className="col-lg-6 col-6">
                <p className="question-text float-r">
                  Date: {item.date.splitDate()}
                </p>
              </div>
            </div>
          </Panel>
        )
      } else {
        negativeBuffer.push(
          <Panel
            header={item.text}
            key={i}
            className="collapse-Negative-status"
          >
            {/* Açılan alan */}
            <div className="row text-leftt pt-20">
              <div className="col-lg-12">
                <h6 className="score-title-left">
                  <strong>Feedback:</strong>
                </h6>
                <p className="question-text">{item.text}</p>
              </div>
            </div>
            <div className="tags-section">
              <div className="row clearfix">
                <div className="col-12">
                  <h6 className="score-title-left">
                    <strong>Tags:</strong>
                  </h6>
                  <ul className="nav">
                    {item.tag_labels.map((q) => {
                      return (
                        <li className="nav-item m-lr-5">
                          <span className="feedback-tag">{q}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
            <div className="row text-leftt">
              <div className="col-lg-6 col-6">
                <p className="question-text float-l">ID: {item.id}</p>
              </div>
              <div className="col-lg-6 col-6">
                <p className="question-text float-r">
                  Date: {item.date.splitDate()}
                </p>
              </div>
            </div>
          </Panel>
        )
      }
    })
    //for testing nodata
    // setPositives([]);
    // setNegatives(negativeBuffer);

    // setPositives(positiveBuffer);
    // setNegatives([]);

    // setPositives([]);
    // setNegatives([]);

    setPositives(positiveBuffer)
    setNegatives(negativeBuffer)
  }
  function handleScroll(e) {
    const target = e.target
    console.log(e)
  }
  return (
    <>
      {loading ? <LoaderLarge /> : <></>}

      {/* MODAL PENCERESİ */}
      <div
        className={`map-results-modal overlay ${
          openModal === "active" ? " d-block show" : ""
        }`}
      >
        {/* FEEDBACK EĞER POZİTİFSE positive-feed / NEGATİFSE negative-feed ETİKETİNE SAHİP OLUR */}
        <div
          className={`card feedback-results ${
            FeedbackData.ispositive === true
              ? " positive-feed"
              : " negative-feed"
          }`}
        >
          <div className="body">
            <div className="d-flex justify-content-between align-items-center feedbacks-header">
              <div>
                {/* O ANKİ TARİH GÖSTERİLECEK */}
                <label className="mb-0 card-info">
                  Date: {FeedbackData.date}
                </label>
              </div>
              <ul className="nav">
                {/* <li className="nav-item">
                                        <a className="btn btn-primary btn-block" href="#">Region View</a>
                                    </li> */}
                <li className="nav-item m-l-1">
                  <a onClick={() => setModal("")} className="nav-link cursorp">
                    <i className="iconx-x"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div className="row text-leftt pt-20 m-t-50">
              <div className="col-lg-12">
                <h6 className="score-title-left">Feedback</h6>
                <p className="question-text">{FeedbackData.text}</p>
              </div>
            </div>

            <div className="tags-section">
              <div className="row clearfix">
                <div className="col-12">
                  <h6 className="score-title-left">Tags</h6>
                  <ul className="nav">{Tags}</ul>
                </div>
              </div>
            </div>
          </div>

          <div className="body card-bottom-section">
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <label className="mb-0 card-info">{FeedbackData.id}</label>
              </div>
              <div className="col-lg-6 col-sm-12">
                <label className="mb-0 card-info float-r">
                  {FeedbackData.location}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL PENCERESİ */}

      <div className="container-fluid" onScroll={handleScroll.bind(this)}>
        <div className="block-header">
          <div className="row clearfix control--nav">
            <div className="col-md-3 col-sm-12 user-feedback-top">
              <h1>Comments</h1>
              <p className="small-_info for-title">
                Comments submitted by employees
              </p>
            </div>
            {/* FİLTRELEME SEÇENEKLERİ */}
            <AdvancedFilter setComponentFilterData={setFilterData} />
          </div>
        </div>
        <div className="row clearfix" onScroll={handleScroll}>
          <div className="col-md-12 col-sm-12 mb-3">
            <ul className="nav">
              <li className="nav-item mr--8">
                <Link
                  to="/results-feedbacks"
                  className="btn btn-default btn-block"
                >
                  Summary
                </Link>
              </li>
              <li className="nav-item mr--8">
                <Link
                  to="/feedback-theme-view"
                  className="btn btn-default btn-block"
                >
                  Themes
                </Link>
              </li>
              <li className="nav-item mr--8">
                <Link
                  to="/feedback-data-view"
                  className="btn btn-default btn-block"
                >
                  Theme breakdown
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/feedback-comments-view"
                  className="btn btn-default active btn-block"
                >
                  Comments
                </Link>
              </li>
            </ul>
            <div className="comment-right">
              <ImportExport
                data={userFeedback}
                export={true}
                import={false}
                refresh={getData}
                type="comments"
                className="float-r"
              />
            </div>
          </div>

          <div className="col-md-12 col-sm-12">
            <div className="user-feedback-top data-view-buttons">
              <button
                className={`ant-btn ant-btn-sm ${
                  type === "all" ? "ant-btn-primary" : "ant-btn-default"
                }`}
                onClick={() => {
                  setType("all")
                }}
              >
                All
              </button>
              <button
                className={`ant-btn ant-btn-sm ml-1 ${
                  type === "positive" ? "ant-btn-primary" : "ant-btn-default"
                }`}
                onClick={() => {
                  setType("positive")
                }}
              >
                Positive
              </button>
              <button
                className={`ant-btn ant-btn-sm ml-1 ${
                  type === "negative" ? "ant-btn-primary" : "ant-btn-default"
                }`}
                onClick={() => {
                  setType("negative")
                }}
              >
                Negative
              </button>
              <div className="top-small-srch">
                <div className="input-group search-top-right">
                  <input
                    value={val}
                    onChange={change}
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />

                  <div className="input-group-append">
                    <span className="input-group-text">
                      <i className="icon-magnifier"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* YENİ FEEDBACK LİSTELEME */}
          <div className="col-lg-12 col-md-12 leesman-section">
            <Collapse accordion className="all-feedbacks-collapse">
              {/* Positive Feedback */}
              {/* Hem mobil hem de masaüstünde iyi gözükmesi için: */}
              {loading && <Loader />}
              {type === "all"
                ? [...positives, ...negatives]
                : type === "positive"
                ? positives
                : negatives}
              {!loading &&
                ((type === "all" && [...positives, ...negatives].length < 1) ||
                  (type === "positive" && positives.length < 1) ||
                  (type === "negative" && negatives.length < 1)) && <IsEmpty />}
            </Collapse>
          </div>
          <div className="col-lg-12 col-md-12 leesman-section text-centerr load-_more-section">
            {!loading && userFeedback.length - count > 0 && (
              <button
                onClick={() => {
                  setCount(count + 50)
                }}
                className="btn btn-default btn-block btn-_load-more"
              >
                Load more
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default FeedbackCommentsView

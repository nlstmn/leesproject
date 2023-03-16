import React, { useEffect, useLayoutEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Step1 from "./CreateCampaign"
import Step2 from "./CreateCampaignFinal"
import axios from "axios"
import { jsPDF } from "jspdf"
import {
  campaignMainAction,
  campaignMainByIDAction,
} from "../../../../actions/adminActions"
import { useDispatch, useSelector } from "react-redux"

export default function FeedbackMain() {
  const dispatch = useDispatch()
  const {
    selectedQuestions: data,
    demos,
    locations,
    departments,
    error,
  } = useSelector((store) => store.campaignMain)
  const { formData, regions } = useSelector((store) => store.campaignMainByID)

  const history = useHistory()
  const search = window.location.search
  const params = new URLSearchParams(search)
  const campaign_id = params.get("campaign_id")
  const urlParam = params.get("client_id")
  const clientId = urlParam ? urlParam : 0
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [number, setNumber] = useState(0)
  const [loading, setLoading] = useState(true)
  const [selectedModules, setSelectedModules] = useState([])
  const [isEdit, setIsEdit] = useState(campaign_id ? campaign_id : false)
  const [selections, setSelections] = useState({
    demos,
    locations,
    departments,
    error,
  })

  console.log(campaign_id)
  //campaign_id ? setIsEdit(campaign_id) : setIsEdit(false);

  useEffect(() => {
    getInitData()
  }, [isEdit])

  useEffect(() => {
    isEdit && getCampaignData(isEdit)
  }, [isEdit])

  function getCampaignData(id) {
    dispatch(campaignMainAction({ clientId, id }))
    setSelectedQuestions(data)
  }

  const getInitData = () => {
    dispatch(campaignMainByIDAction({ clientId }))

    dispatch(campaignMainByIDAction({ clientId }))

    if (!isEdit) {
      setSelections((pre) => {
        return {
          ...pre,
          demos: demos.map((i) => i.option_id),
          departments: departments.map((i) => i.id),
          locations: locations.map((i) => i.id),
          regions: regions.map((i) => i.id),
        }
      })
    }

    setLoading(false)
  }
  const changeNumber = (e) => {
    setNumber(e)
  }
  const printSummary = (all, d, l, dd, t, title) => {
    const doc = new jsPDF()
    doc.setFontSize(12)
    var line = 25 // Line height to start text at
    var lineHeight = 5
    var leftMargin = 20
    var wrapWidth = 180

    let questions_ = selectedQuestions.map((item) => {
      return all.filter((i_) => i_.id === item)[0].heading
    })

    doc.setFont("Source Sans Pro", "normal")

    var longString =
      "Title:\r\n\r\n" +
      title +
      "\r\n\r\n Questions:\r\n\r\n" +
      questions_ +
      "\r\n\r\n Demos:\r\n\r\n" +
      dd +
      "\r\n\r\n Departments:\r\n\r\n" +
      d +
      "\r\n\r\n Locations:\r\n\r\n" +
      l +
      "\r\n\r\n Time: \r\n\r\n" +
      t

    var splitText = doc.splitTextToSize(longString, wrapWidth)
    for (var i = 0, length = splitText.length; i < length; i++) {
      // loop thru each line and increase
      doc.text(splitText[i], leftMargin, line)
      line = lineHeight + line
    }

    doc.save("Campaign_Details.pdf")
  }

  const send = (status) => {
    let data = {
      selections: { ...selections, status: status },
      questions: selectedQuestions,
    }
    if (isEdit) {
      axios
        .put(`/admin/clients/${clientId}/campaigns/${isEdit}`, data)
        .then((res) => {
          history.push(`/campaigns-management?client_id=${clientId}`)
        })
        .catch((err) => console.log(err))
    } else {
      axios
        .post(`/admin/clients/${clientId}/campaigns`, data)
        .then((res) => {
          history.push(`/campaigns-management?client_id=${clientId}`)
        })
        .catch((err) => console.log(err))
    }
  }
  const comps = [
    <Step1
      questions={formData.questions ? formData.questions : []}
      setSelectedQuestionIds={(e) => selectedQuestions(e)}
      selectedQuestions_={selectedQuestions}
      selectedModules={selectedModules}
      setSelectedModules={setSelectedModules}
      index={changeNumber}
      loading={loading}
      isEdit={isEdit}
      setTitle={(e) => {
        setSelections((pre) => {
          return { ...pre, title: e }
        })
      }}
    ></Step1>,
    <Step2
      printSummary={printSummary}
      formData={formData}
      SetSelections={(e) => {
        setSelections(e)
      }}
      isEdit={isEdit}
      selections={selections}
      index={changeNumber}
      send={send}
    ></Step2>,
  ]

  return comps[number]
}

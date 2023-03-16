import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { notification } from "antd"

import Loader from "../../../common/Loader"
import Tabs from "../Tabs"

const CreateCampaign = ({
  questions,
  index,
  setSelectedQuestionIds,
  selectedQuestions_,
  loading,
  setTitle,
  selectedModules,
  setSelectedModules,
  isEdit,
}) => {
  const [elements, setElements] = useState([])
  const [heads, setHeads] = useState([])
  const [flag, setFlag] = useState(true)
  const [selectedQuestions, setSelectedQuestions] = useState(selectedQuestions_)
  const history = useHistory()

  useEffect(() => {
    prepareTitle(selectedModules, selectedQuestions)
    populate(questions)
    populateSection(selectedModules)
    deselectModules(selectedQuestions)
  }, [selectedModules, selectedQuestions, flag])

  useEffect(() => {
    setSelectedQuestionIds(selectedQuestions)
  }, [selectedQuestions])
  useEffect(() => {
    populate(questions)
    populateSection(selectedModules)
    setSelectedQuestions(selectedQuestions_)
    deselectModules(selectedQuestions)
  }, [questions, selectedQuestions_])

  function deselectModules(q) {
    let questions_ = q.map((item) => questions.filter((i) => i.id === item)[0])

    if (questions_.length > 0 && questions_[0] && flag) {
      let questionsByModules = uniqueModules(questions).map((module) => {
        return {
          module: module,
          question_ids: questions
            .filter((i) => i.modules.includes(module))
            .map((i) => i.id),
        }
      })
      console.log(questions_)
      questions_ = questions_.filter((i) => i)

      let modules = questions_.map((i) => i && i.modules)
      let m = []
      modules.forEach((i) => {
        i.forEach((o) => {
          if (
            questionsByModules
              .filter((i) => i.module === o)[0]
              .question_ids.Contains(questions_.map((i) => i.id))
          ) {
            m.push(o)
          }
        })
      })
      setSelectedModules([...new Set(m)])
      setFlag(false)
    }
  }
  function prepareTitle(m, q) {
    let modulequestionIds = m.map((item) => {
      return questions.filter((i) => i.modules.includes(item)).map((i) => i.id)
    })
    let o = []
    modulequestionIds.forEach((arr, index_) => {
      let bool = true
      arr.forEach((i) => {
        if (!q.includes(i)) {
          bool = false
        }
      })
      o[index_] = bool
    })
    let title_ = m.map((item, index_) => {
      if (o[index_]) {
        return item
      }
    })
    !isEdit && setTitle(title_.filter((i) => i).join())
  }
  function uniqueModules(a) {
    let buffer = []
    a.forEach((i) => {
      i.modules.forEach((m) => {
        buffer.push(m)
      })
    })

    return [...new Set(buffer)]
  }
  function uniqueSections(a) {
    return [...new Set(a.map((i) => i.section))]
  }
  function addQuestions(module, allQuestions) {
    let questionsId = allQuestions
      .filter((i) => i.modules.includes(module))
      .map((item) => {
        return item.id
      })

    let s = selectedQuestions
    let merge = [...questionsId, ...s]
    setSelectedQuestions([...new Set(merge)])
  }
  function removeQuestions(module, allQuestions) {
    let questionsId = allQuestions
      .filter((i) => i.modules.includes(module))
      .map((item) => {
        return item.id
      })

    let filtered = selectedQuestions.filter(
      (item) => !questionsId.includes(item)
    )

    setSelectedQuestions(filtered)
  }
  function selectModule(e) {
    const { value } = e.target

    let arr = selectedModules

    if (selectedModules.includes(value)) {
      arr = selectedModules.filter((i) => i !== value)
      removeQuestions(value, questions)
    } else {
      arr.push(value)
      addQuestions(value, questions)
    }
    //for use effect doesn't trigger on array
    const newArray = [...arr]

    setSelectedModules(newArray)
  }
  function populate(q) {
    let uModules = uniqueModules(q)
    let modules = uModules.map((m) => {
      return (
        <label className="fancy-checkbox min-w-168">
          <input
            checked={selectedModules.includes(m)}
            onChange={selectModule}
            type="checkbox"
            name="modules"
            value={m}
          />
          <span className="light-black">
            <strong>{m}</strong>
          </span>
        </label>
      )
    })
    setElements(modules)
  }
  function populateSection(module) {
    let questions_all = []
    module.forEach((element) => {
      let q = [
        ...questions_all,
        ...questions.filter((i) => i.modules.includes(element)),
      ]
      questions_all = q
    })

    let arr = uniqueSections(questions)

    arr = arr.map((item) => {
      return (
        <div className="col-lg-3 col-md-4 campaigns-fancy  pt-40">
          <div className="text-leftt light-black pb-20">{item}</div>
          {populateQuestions(questions, item)}
        </div>
      )
    })

    setHeads(arr)
  }
  function populateQuestions(filteredQuestions, section) {
    let filtered = filteredQuestions.filter((i) => i.section === section)

    filtered = filtered.map((item, index_) => {
      return (
        <>
          {" "}
          <label className="fancy-checkbox">
            <input
              checked={selectedQuestions.includes(item.id)}
              type="checkbox"
              name="questions"
              onChange={() => questionChangeHandle(item.id)}
              value={index_}
            />
            <span className="light-black">{item.heading}</span>
          </label>
        </>
      )
    })
    return filtered
  }
  function questionChangeHandle(questionId) {
    setFlag(true)

    let arr = selectedQuestions

    if (arr.includes(questionId)) {
      arr = arr.filter((i) => i !== questionId)
    } else {
      arr.push(questionId)
    }
    let arr2 = [...arr]

    setSelectedQuestions(arr2)
  }
  return (
    <>
      <div className="container-fluid clients-page">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12">
              {/* <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a onClick={() => history.goBack()}><span className="iconx-triangle-left"></span> Back</a></li>
                                </ol>
                            </nav> */}
              <h1>Admin management</h1>
              <Tabs></Tabs>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="card">
              <div className="body min-h-381">
                <h2 className="card-title mb-0">New campaign</h2>

                <div className="row clearfix pt-40 pb-20">
                  <div className="col-lg-12 col-md-12">
                    {/* ANA MODÜLLER */}
                    {/* BURADA BİR MODÜL SEÇİLDİĞİNDE AŞAĞIDAKİ LİSTEDE DEFAULT OLARAK İLGİLİ MODÜLE AİT SEÇENEKLER OTOMATİK SEÇİLİ OLACAKTIR */}

                    <div className="text-leftt light-black pb-20">Modules</div>
                    {!loading ? elements : <Loader />}
                  </div>
                </div>

                {/* ALT MODÜLLERİN LİSTESİ / SEÇENEKLER */}

                <div className="row clearfix pb-20 modules--border mb--55">
                  {heads}
                </div>

                <div className="bottom-btns">
                  <button
                    onClick={() => {
                      history.goBack()
                    }}
                    className="btn btn-sm btn-default mr-1 float-l"
                  >
                    Cancel
                  </button>{" "}
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-sm btn-primary mr-1 float-r"
                    onClick={() => {
                      selectedQuestions.length > 0
                        ? index(1)
                        : notification.warning({
                            message: "Please select at least one question",
                          })
                    }}
                  >
                    Next
                  </button>
                  {/* <Link
                    to={{ pathname: "/campaign-submit", data: selectedQuestions }}
                    className="btn btn-sm btn-primary mr-1 float-r"
                  >
                    Next
                  </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CreateCampaign

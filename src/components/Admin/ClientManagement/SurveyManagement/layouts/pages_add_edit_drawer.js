import React, { useState, useRef, useEffect } from "react"
import "react-toastify/dist/ReactToastify.css"
import { Link } from "react-router-dom"
import JoditEditor from "jodit-react"
import { Drawer } from "antd"
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
  arrayMove,
} from "react-sortable-hoc"
import { customfilter, makeUnique } from "../../../../../util/functions"
import axios from "axios"
const PageDrawer = ({
  isModalVisible,
  setIsModalVisible,
  isChildrenModalVisible,
  setIsChildrenModalVisible,
  formData,
  change,
  pages,
  send,
  questions,
  setFormData,
  selectedPage,
  clientId,
}) => {
  const editorIntro = useRef(null)
  const [contentIntro, setContentIntro] = useState("")
  const [query, setQuery] = useState("")
  const [questionBuffer, setBuffer] = useState([])
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    zIndex: 0,
    activeButtonsInReadOnly: ["source", "fullsize", "print", "about"],
    toolbarButtonSize: "middle",
    theme: "default",
    enableDragAndDropFileToEditor: true,
    saveModeInCookie: false,
    spellcheck: true,
    editorCssClass: false,
    triggerChangeEvent: true,
    height: "100%",
    direction: "ltr",
    language: "en",
    debugLanguage: false,
    i18n: "en",
    tabIndex: -1,
    toolbar: true,
    enter: "P",
    useSplitMode: false,
    colorPickerDefaultTab: "background",
    imageDefaultWidth: 100,
    removeButtons: [
      "source",
      "fullsize",
      "about",
      "outdent",
      "indent",
      "video",
      "print",
      "table",
      "fontsize",
      "superscript",
      "subscript",
      "file",
      "cut",
      "selectall",
    ],
    disablePlugins: ["paste", "stat"],
    events: {},
    textIcons: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
    placeholder: "",
    showXPathInStatusbar: false,
  }
  useEffect(() => {
    // setFormData((pre) => {
    //   return { ...pre, popup: contentIntro };
    // });
  }, [contentIntro])

  useEffect(() => {
    selectedPage && getPageData(selectedPage)
  }, [selectedPage])

  const getPageData = (page_id) => {
    axios
      .get(`/admin/clients/${clientId}/surveys/pages/${page_id}`)
      .then((res) => {
        console.log(res.data)
        setFormData((pre) => {
          return {
            ...pre,
            title: res.data.title,
            name: res.data.name,
            questions: res.data.questions,
          }
        })
        setContentIntro(res.data.popup)
      })
  }

  useEffect(() => {
    questions?.length &&
      customfilter(
        query,
        questions,
        ["question_label", "section", "id"],
        setBuffer
      )
  }, [query])
  useEffect(() => {
    setBuffer(questions)
  }, [questions])

  const DragHandle = sortableHandle(() => (
    <span className="sortable-thumb">
      <span className="iconx-dots-three-vertical"></span>
      <span className="iconx-dots-three-vertical r-_icon"></span>
    </span>
  ))

  const SortableItemQuestion = sortableElement(({ value }) => (
    <li className="sort_item dark sections with_z">
      <span
        onClick={() => {
          handleQuestionSelect(value)
        }}
        className="delete iconx-trash-2 mr-3"
      ></span>

      <DragHandle />
      {value.heading}
    </li>
  ))

  const SortableContainer = sortableContainer(({ children }) => {
    return <ul className="ul-_sort-items">{children}</ul>
  })

  const onQuestionSortEnd = ({ oldIndex, newIndex }) => {
    setFormData((pre) => {
      return {
        ...pre,
        questions: arrayMove(formData?.questions, oldIndex, newIndex),
      }
    })
  }

  const handleQuestionSelect = (question) => {
    console.log(question)
    let q = formData?.questions //id and position
    if (q.map((i) => i.id).includes(question.id)) {
      q = q.filter((i) => i.id !== question.id)
    } else {
      q.push(question)
    }
    setFormData((pre) => {
      return { ...pre, questions: q }
    })
  }

  return (
    <>
      <Drawer
        className="dark--modal"
        title="Add / edit page"
        width="80%"
        closable={true}
        onClose={() => setIsModalVisible(false)}
        visible={isModalVisible}
      >
        <div className="row clearfix">
          <div className="col-lg-4 col-md-12">
            <div className="form-group">
              <input
                type="text"
                name="name"
                onChange={change}
                value={formData?.name}
                className="form-control"
                placeholder="Page name"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="form-group">
              <input
                type="text"
                name="title"
                onChange={change}
                value={formData?.title}
                className="form-control"
                placeholder="Page title"
              />
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="form-group">
              <label>Popup message</label>
              <JoditEditor
                ref={editorIntro}
                value={contentIntro}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setContentIntro(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {}}
              />
            </div>
          </div>

          <div className="col-lg-12">
            <hr />
          </div>

          <div className="col-md-12 col-sm-12">
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12">
                {/* yeni soru ekle */}
                <button
                  type="button"
                  onClick={() => setIsChildrenModalVisible(true)}
                  className="btn btn-sm btn-primary add--q mt-2 mb-2"
                  title="Delete"
                >
                  Add new question
                </button>

                <div className="form-group sort_items mt-3">
                  <label>Questions</label>
                  <SortableContainer
                    onSortEnd={onQuestionSortEnd}
                    useDragHandle
                    helperclassName="sortableHelper"
                  >
                    {formData?.questions?.map((value, index) => {
                      return (
                        <SortableItemQuestion
                          key={`item-${index}`}
                          index={index}
                          value={value}
                        />
                      )
                    })}
                  </SortableContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dual--screen-bottom">
          <button
            type="button"
            className="btn btn-sm btn-secondary"
            onClick={() => setIsModalVisible(false)}
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => send()}
            className="btn btn-sm btn-primary"
            style={{ marginLeft: "15px" }}
          >
            Save
          </button>
        </div>
        <Drawer
          title="Select question(s)"
          width="60%"
          closable={true}
          onClose={() => setIsChildrenModalVisible(false)}
          visible={isChildrenModalVisible}
        >
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12">
              <div className="form-group">
                <select
                  onChange={(e) => {
                    setBuffer(
                      questions.filter((i) => i.page_id === e.target.value)
                    )
                  }}
                  className="form-control show-tick"
                >
                  {makeUnique(pages, "id")?.map((i) => {
                    return <option value={i.id}>{i.name}</option>
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                }}
                type="text"
                className="form-control"
                placeholder="Search"
              />

              <hr />

              {/* Sadece aktif questionlar gösterilecek */}

              <div className="questions--list-s">
                {/* başlık */}

                <div className="row">
                  {/* başlığa ait liste */}
                  {[...new Set(questionBuffer)]?.map((i) => {
                    return (
                      <div className="col-lg-12">
                        <label className="fancy-checkbox">
                          <input
                            onClick={() => {
                              handleQuestionSelect(i)
                            }}
                            checked={formData?.questions
                              ?.map((q) => q?.id)
                              .includes(i?.id)}
                            type="checkbox"
                            name="questions"
                          />
                          <span className="light-black">
                            {i.question_label}
                          </span>
                        </label>
                      </div>
                    )
                  })}{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="dual--screen-bottom">
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => setIsChildrenModalVisible(false)}
            >
              Close
            </button>
          </div>
        </Drawer>
      </Drawer>
    </>
  )
}

export default PageDrawer

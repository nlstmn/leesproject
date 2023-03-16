import React, { useState, useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { Drawer } from "antd"
import { connect } from "react-redux"
import * as settingsActions from "../../../../../actions/settingsAction"
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
  arrayMove,
} from "react-sortable-hoc"
import PageDrawer from "../layouts/pages_add_edit_drawer"
import {
  CustomTreeColumn,
  TreeColumn,
} from "../../../../common/commonComponents/formItems"
import { dbToTree } from "../../../../../util/functions"

const Sections = ({
  isSurveyTab,
  setSurveyTab,
  initData,
  setInitData,
  surveyId,
  clientId,
  formData,
  setFormData,
  send,
  close,
}) => {
  // let data = [
  //   { section_id: "1", position: 0, pages: [{ page_id: "1", position: 0, questions: [{ question_id: "1", position: 0 }] }] },
  // ];
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isChildrenModalVisible, setIsChildrenModalVisible] = useState(false)
  let drawerContainer = useRef()

  const [visibleSections, setSections] = useState(false)
  const [selectedSectionIds, setSelectedSectionIds] = useState([])
  const [selectedSections, setSelectedSections] = useState([])
  const [selectedPages, setSelectedPages] = useState([])
  const [selectedQuestions, setselectedQuestions] = useState([])
  const [selectedPage, setSelectedPage] = useState("")

  const [buffer, setBuffer] = useState([])
  const [querySection, setQuerySection] = useState("")
  const [selectedSection, setSelectedSection] = useState("")

  const DragHandle = sortableHandle(() => (
    <span className="sortable-thumb">
      <span className="iconx-dots-three-vertical"></span>
      <span className="iconx-dots-three-vertical r-_icon"></span>
    </span>
  ))
  const SortableItemSections = sortableElement(
    ({ value, sortable, id, survey_module_id }) => (
      <li className={`${sortable && "sections"} sort_item dark sections`}>
        {sortable && formData?.general?.status !== "live" && (
          <span
            onClick={() => {
              setSelectedSections(
                selectedSections?.filter((i) => i.survey_module_id !== id)
              )
              setSelectedSectionIds(selectedSectionIds?.filter((i) => i !== id))
            }}
            className="delete iconx-trash-2"
          ></span>
        )}

        {sortable && <DragHandle survey_module_id={survey_module_id} />}
        <span
          onClick={() => {
            setSelectedSection(id)
          }}
          className="delete iconx-magnifying-glass"
        ></span>
        {value}
      </li>
    )
  )
  const SortableItemPages = sortableElement(
    ({ value, sortable, id, survey_module_id }) => (
      <li className={`${sortable && "sections"} sort_item dark sections`}>
        {sortable && formData?.general?.status !== "live" && (
          <span
            onClick={() => {
              setSelectedPages(selectedPages.filter((i) => i.id !== id))
            }}
            className="delete iconx-trash-2"
          ></span>
        )}

        {sortable && <DragHandle survey_module_id={survey_module_id} />}
        <span
          onClick={() => {
            setSelectedPage(id)
          }}
          className="delete iconx-magnifying-glass"
        ></span>
        {value}
      </li>
    )
  )
  const SortableItemQuestion = sortableElement(
    ({ value, id, key, sortable }) => (
      <li className="sort_item dark sections">
        {sortable && formData?.general?.status !== "live" && (
          <span
            onClick={() => {
              setselectedQuestions(
                selectedQuestions.filter((i) => i.question_id !== id)
              )
            }}
            className="delete iconx-trash-2"
          ></span>
        )}
        {sortable && <DragHandle />}
        {value}
      </li>
    )
  )
  const SortableContainer = sortableContainer(({ children }) => {
    return <ul className="ul-_sort-items">{children}</ul>
  })

  const onPageSortEnd = ({ oldIndex, newIndex }, key, survey_module_id) => {
    let updatedPages = selectedPages
      .filter((i) => i.survey_module_id === survey_module_id)
      .sort((a, b) => a.position - b.position)
    updatedPages = arrayMove(updatedPages, oldIndex, newIndex)
    updatedPages = updatedPages.map((i, index) => {
      return {
        ...i,
        position: index,
      }
    })
    let removedUpdatedPages = selectedPages.filter(
      (i) => i.survey_module_id !== survey_module_id
    )
    let mergedPages = [...removedUpdatedPages, ...updatedPages]

    setSelectedPages(arrayMove(mergedPages, oldIndex, newIndex))
  }
  const onSectionSortEnd = ({ oldIndex, newIndex }, key, survey_module_id) => {
    let updatedSections = selectedSections.sort(
      (a, b) => a.position - b.position
    )
    updatedSections = arrayMove(updatedSections, oldIndex, newIndex)

    updatedSections = updatedSections.map((i, index) => {
      return {
        ...i,
        position: index,
      }
    })

    setSelectedSections(updatedSections)
    setSelectedSectionIds(updatedSections.map((i) => i.survey_module_id))
  }
  const onQuestionSortEnd = ({ oldIndex, newIndex }) => {
    let questionSet = selectedQuestions
      .filter((p) => p.survey_page_id === selectedPage)
      .sort((a, b) => a.position - b.position)

    questionSet = arrayMove(questionSet, oldIndex, newIndex)

    questionSet = questionSet.map((q, index) => {
      return { ...q, position: index }
    })

    let questionsArr = selectedQuestions
    questionsArr = questionsArr.filter((q) => q.survey_page_id !== selectedPage)
    questionSet.forEach((q) => {
      questionsArr.push(q)
    })
    setselectedQuestions(
      questionsArr
        .sort((a, b) => a.position - b.position)
        .sort((a, b) => a.survey_page_id - b.survey_page_id)
    )
  }

  useEffect(() => {
    //setSelectedSectionIds(selectedSections?.map((i) => i?.survey_module_id));
  }, [selectedSections])

  useEffect(() => {
    setBuffer((pre) => {
      return {
        ...pre,
        sections: dbToTree(initData?.sections)
          ?.sort((a, b) => a.key - b.key)
          .map((i) => {
            return {
              ...i,
              disabled: initData?.sections?.filter((p) => p.id === i.key)[0]
                ?.is_core,
            }
          }),
      }
    })
  }, [initData])

  useEffect(() => {}, [selectedQuestions])

  const handleSectionData = (ids) => {
    let arr = ids
    let b = []

    arr &&
      arr.forEach((a, index) => {
        b.push({ survey_module_id: a, position: index + 1 })
      })
    setSelectedSections(b)
    return b
  }
  const handlePageData = (sections) => {
    //detect sections to add and sections to remove by looking selectedPages
    let currentPageSectionIds = selectedPages?.map((i) => i.survey_module_id)
    let sectionPagesToRemove = currentPageSectionIds?.filter(
      (i) => !sections?.map((o) => o.survey_module_id).includes(i)
    )
    let sectionPagesToAdd = sections
      ?.map((i) => i.survey_module_id)
      ?.filter((o) => !currentPageSectionIds.includes(o))

    sectionPagesToAdd = [...new Set(sectionPagesToAdd)]
    sectionPagesToRemove = [...new Set(sectionPagesToRemove)]

    let pages = selectedPages
    pages = pages?.filter(
      (i) => !sectionPagesToRemove.includes(i.survey_module_id)
    )
    let newPages = []
    let lastPosition = pages[pages.length - 1]?.position
    sectionPagesToAdd.forEach((s) => {
      initData.sections?.filter((i) => i.id === s)[0] &&
        initData.sections
          .filter((i) => i.id === s)[0]
          .page_ids.forEach((p, index) => {
            newPages.push({
              survey_module_id: s,
              page_id: p,
              position: lastPosition + 1 + index,
            })
          })
    })
    newPages.forEach((p, index) => {
      let lastId = Math.max(...pages?.map((i) => i.id))

      pages.push({ id: lastId + index + 1, ...p })
    })
    setSelectedPages(pages)

    return pages
  }
  const handleQuestionData = (pages) => {
    let questions = selectedQuestions
    //detect questions to remove
    let availablePageIds = pages?.map((p) => p.id)
    questions = questions.filter((i) =>
      availablePageIds.includes(i.survey_page_id)
    )
    //get pages that hasn't any question in questions data

    let pageQuestionsToAdd = []
    pages.forEach((p) => {
      if (questions.filter((q) => q.survey_page_id === p.id).length === 0) {
        //no question on that page
        let pageQuestions = initData?.pages?.filter(
          (w) => w.id === p.page_id
        )[0]?.questions
        pageQuestions?.length &&
          pageQuestions.forEach((r, index) => {
            pageQuestionsToAdd.push({
              position: p.position * 100 + index,
              question_id: r.question_id,
              survey_page_id: p.id,
              page_id: p.page_id,
            })
          })
      }
    })

    let mergedQuestions = [...questions, ...pageQuestionsToAdd]

    setselectedQuestions(mergedQuestions)
    return mergedQuestions
  }

  useEffect(() => {
    let newSections = handleSectionData(selectedSectionIds)
    let newPages = handlePageData(newSections)
    let newQuestions = handleQuestionData(newPages)
  }, [selectedSectionIds])

  const removeSections = (e) => {
    setSelectedSectionIds(selectedSectionIds.filter((i) => i !== e.id))
  }

  const selectAll = (type) => {}
  const deselectAll = (type) => {}

  useEffect(() => {
    let data = formData?.pagesAndQuestions
    data && setSelectedSections(data?.sections)
    data && setSelectedPages(data?.pages)
    data && setselectedQuestions(data?.questions)
    data &&
      setSelectedSectionIds(data?.sections?.map((i) => i.survey_module_id))
    data && setSelectedSection(formData?.general?.survey_module_id)
  }, [formData])

  return (
    <>
      <PageDrawer
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        isChildrenModalVisible={isChildrenModalVisible}
        setIsChildrenModalVisible={setIsChildrenModalVisible}
      />

      <div
        className="drawer_sc-div create--sr"
        id="survey-_section"
        ref={drawerContainer}
      >
        <Drawer
          title="Section list"
          placement="right"
          width="30%"
          onClose={() => setSections(false)}
          visible={visibleSections}
          getContainer={() => drawerContainer.current}
        >
          <CustomTreeColumn
            type={"sections"}
            selectAll={() => selectAll("sections")}
            deselectAll={() => deselectAll("sections")}
            query={querySection}
            setQuery={setQuerySection}
            setSelected={setSelectedSectionIds}
            checkedKeys={selectedSectionIds}
            treeData={buffer}
            count={1}
            nonRemovable={formData?.general?.status === "live"}
          />
        </Drawer>
      </div>

      <div className="aspect-tab ">
        <label htmlFor="item-4" className="aspect-label"></label>
        <div className="aspect-content">
          <div className="aspect-info">
            <div className="tab-_status"></div>
            <span className="aspect-name">
              Additional Modules and Questions
            </span>
          </div>
        </div>
        <div className="">
          <div className="sentiment-wrapper">
            <div className="row clearfix">
              <div className="col-lg-4 col-md-4 mb-3 br-dark">
                <h2>
                  Core module: {formData?.general?.core_module.capitalize()}
                </h2>
                <h6>Additional Modules</h6>
                <button
                  onClick={() => setSections(true)}
                  className="btn btn-outline-default btn-sm mt-3"
                >
                  Select Additional Modules
                </button>

                <p className="mt-3">Selected Modules:</p>

                <SortableContainer
                  onSortEnd={(...props) => onSectionSortEnd(...props)}
                  useDragHandle
                  helperclassName="sortableHelper"
                >
                  {selectedSections?.length > 0 &&
                    selectedSections?.map((section, index) => {
                      return (
                        <SortableItemSections
                          key={section.survey_module_id}
                          index={index}
                          value={initData?.sections
                            ?.filter(
                              (p) => p.id === section.survey_module_id
                            )[0]
                            ?.name?.capitalize()}
                          id={section.survey_module_id}
                          survey_module_id={section.survey_module_id}
                          sortable={
                            formData?.general?.survey_module_id !==
                            section.survey_module_id
                          }
                        />
                      )
                    })}
                </SortableContainer>
              </div>
              <div
                className={
                  selectedPage
                    ? `col-lg-4 col-md-4 mb-3 br-dark`
                    : `col-lg-8 col-md-8 mb-3 br-dark`
                }
              >
                <h6>Pages</h6>
                <p className="mt-3">Selected page(s):</p>
                <div className="form-group sort_items">
                  {selectedSectionIds
                    ?.filter((i) => i === selectedSection)
                    ?.map((s) => {
                      return (
                        <>
                          <div className="form-group sort_items">
                            <p className="mt-3">
                              {
                                initData?.sections?.filter((i) => i.id === s)[0]
                                  ?.name
                              }
                            </p>
                            <SortableContainer
                              onSortEnd={(...props) =>
                                onPageSortEnd(...props, s)
                              }
                              useDragHandle
                              helperclassName="sortableHelper"
                            >
                              {selectedPages
                                .filter((i) => i.survey_module_id === s)
                                .map((page) => {
                                  return (
                                    <SortableItemPages
                                      key={page.id}
                                      index={page.position}
                                      value={
                                        initData?.pages?.filter(
                                          (p) => p.id === page.page_id
                                        )[0]?.label
                                      }
                                      id={page.id}
                                      survey_module_id={s}
                                      sortable={
                                        page.survey_module_id !==
                                        formData?.general?.survey_module_id
                                      }
                                    />
                                  )
                                })}
                            </SortableContainer>
                            <hr></hr>
                          </div>
                        </>
                      )
                    })}

                  {/* <SortableContainer onSortEnd={onPageSortEnd} useDragHandle helperclassName="sortableHelper">
                    {selectedPages.map((page) => {
                      return (
                        <SortableItemPages
                          key={`item-${page?.id || page.position}`}
                          index={page.position}
                          value={initData?.pages?.filter((p) => p.id === page.page_id)[0]?.label}
                          id={page.id}
                          sortable={page.survey_module_id != formData?.general?.survey_module_id}
                        />
                      );
                    })}
                  </SortableContainer> */}
                </div>{" "}
              </div>
              {selectedPage && (
                <div className="col-lg-4 col-md-4 mb-3">
                  <h6>Questions</h6>

                  <p className="mt-3">Selected question(s):</p>

                  <div className="form-group sort_items questions">
                    <SortableContainer
                      onSortEnd={onQuestionSortEnd}
                      useDragHandle
                      helperclassName="sortableHelper"
                    >
                      {selectedQuestions
                        .filter((i) => i.survey_page_id === selectedPage)
                        .map((q, index) => {
                          return (
                            <SortableItemQuestion
                              key={q.question_id}
                              index={index}
                              id={q.question_id}
                              value={
                                initData?.questions?.filter(
                                  (i) => i.id === q.question_id
                                )[0].heading
                              }
                              sortable={true}
                            />
                          )
                        })}
                    </SortableContainer>
                  </div>
                </div>
              )}
              <div className="col-lg-12 col-md-12 mt-4 bottoms-_btn-group">
                &nbsp;&nbsp;
                <button
                  onClick={() => {
                    //console.log("test");
                    send("additional modules and questions", {
                      sections: selectedSections,
                      pages: selectedPages,
                      questions: selectedQuestions,
                    })
                  }}
                  className="btn btn-sm btn-primary ml-2 float-l"
                >
                  Save
                </button>
                &nbsp;&nbsp;
                <button
                  onClick={() => {
                    close()
                  }}
                  className="btn btn-sm btn-primary ml-2 float-l"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  isSurveyTab: state.settings.isSurveyTab,
})

const mapDispatchToProps = (dispatch) => ({
  setSurveyTab: (e) => dispatch(settingsActions.setSurveyTab(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Sections)

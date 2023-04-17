import React, { useEffect, useState } from "react"
import DemographicsCard from "./demographics_card"
import { useDispatch, useSelector } from "react-redux"
import {
  getOtherSurveySetupAction,
  surveySetupFormData,
} from "../../../../../../actions/adminActions"
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
  arrayMove,
} from "react-sortable-hoc"

const DemographicsSettings = ({
  setDemographicsQuestionsDrawer,
  setDeleteModal,
}) => {
  // Redux States
  const dispatch = useDispatch()
  const demographicsData = useSelector(
    (store) => store.getOtherSurveySetupData.data.demographics
  )
  const optionsData = useSelector(
    (store) => store.getOtherSurveySetupData.data.selectedOptions
  )
  const additionalQuestionData = useSelector(
    (store) => store.getOtherSurveySetupData.data.additionalQuestions
  )
  const surveyId = useSelector((store) => store.saveSurveyId.data)

  // useState Hook that Sets All Card Datas
  useEffect(() => {
    dispatch(
      getOtherSurveySetupAction({
        clientId: 0,
        tab: "demographics",
        surveyId: surveyId,
      })
    )
  }, [])

  const [isItems, setItems] = useState(demographicsData)
  const [additionals, setAdditionals] = useState(additionalQuestionData)
  const [selections, setSelections] = useState(optionsData)

  useEffect(() => {
    setItems(
      demographicsData
        ?.sort((a, b) => a.position - b.position)
        ?.map((item) => {
          return { ...item, type: "demographics" }
        })
    )
  }, [demographicsData])
  useEffect(() => {
    setAdditionals(
      additionalQuestionData
        ?.sort((a, b) => a.position - b.position)
        ?.map((item) => {
          return { ...item, type: "additional" }
        })
    )
  }, [additionalQuestionData])
  useEffect(() => {
    setSelections(optionsData)
  }, [optionsData])
  useEffect(() => {
    dispatch(
      surveySetupFormData({
        data: { selections, additionals, demographics: isItems },
        requestType: "demographicsNew",
        successMessage: "Selected options updated successfully",
      })
    )
  }, [selections, JSON.stringify(additionals), JSON.stringify(isItems)])

  useEffect(() => {}, [additionals, isItems])
  const DragHandle = sortableHandle(({ active }) => (
    <span
      className={`iconx-move grab__table_item ${active && " actived"}`}
    ></span>
  ))

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(arrayMove(isItems, oldIndex, newIndex))
  }
  const onSortEndAdditional = ({ oldIndex, newIndex }) => {
    setAdditionals(arrayMove(additionals, oldIndex, newIndex))
  }
  const SortableItem = sortableElement(({ item }) => {
    return (
      <DemographicsCard
        selectedOptions={selections}
        setSelectedOptions={setSelections}
        title={item.heading}
        //if question has survey_id, it is additional demographics question. its order is changeble
        enabled={item?.survey_id}
        items={item}
        drag={<DragHandle />}
        setParents={item.type == "additional" ? setAdditionals : setItems}
        parents={item.type == "additional" ? additionals : isItems}
        setDemographicsQuestionsDrawer={setDemographicsQuestionsDrawer}
        setDeleteModal={setDeleteModal}
      />
    )
  })

  const SortableList = sortableContainer(({ items }) => {
    return (
      <div className="cards_sortable">
        {items?.map((item, index) => {
          return (
            <SortableItem
              key={`${item.id}`}
              enabled={item?.survey_id}
              index={index}
              item={item}
              disabled={index === 0 ? true : false}
            />
          )
        })}
      </div>
    )
  })

  return (
    <>
      <div className="n__card mt-0">
        <div className="n__body">
          <h3 className="">Demographics</h3>
          <div className="row">
            <SortableList
              useDragHandle
              items={isItems}
              onSortEnd={onSortEnd}
              axis="xy"
              helperClass="item_sorting"
            />
            {additionals?.length > 0 && (
              <>
                <h3 className="mt-5">
                  Additional Questions (including additional demographics
                  questions)
                </h3>
                <SortableList
                  useDragHandle
                  items={additionals}
                  onSortEnd={onSortEndAdditional}
                  axis="xy"
                  helperClass="item_sorting"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default DemographicsSettings

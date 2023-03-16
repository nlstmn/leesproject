import React, { useEffect, useState } from "react"
import DemographicsCard from "./demographics_card"
import { useDispatch, useSelector } from "react-redux"
import { getOtherSurveySetupAction } from "../../../../../../actions/adminActions"
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

  useEffect(() => {
    setItems(demographicsData)
  }, [demographicsData])

  const DragHandle = sortableHandle(({ active }) => (
    <span
      className={`iconx-move grab__table_item ${active && " actived"}`}
    ></span>
  ))

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (newIndex === 0) {
      // the first element is "unsortable"
      return
    }
    setItems(arrayMove(isItems, oldIndex, newIndex))
  }

  const SortableItem = sortableElement(({ item }) => (
    <DemographicsCard
      title={item.heading}
      enabled={true}
      items={item}
      drag={<DragHandle />}
      setDemographicsQuestionsDrawer={setDemographicsQuestionsDrawer}
      setDeleteModal={setDeleteModal}
    />
  ))

  const SortableList = sortableContainer(({ items }) => (
    <div className="cards_sortable">
      {items?.map((item, index) => (
        <SortableItem
          key={`${item.id}`}
          index={index}
          item={item}
          disabled={index === 0 ? true : false}
        />
      ))}
    </div>
  ))

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

            {/* {demographicsData !== undefined &&
              demographicsData.map((value, index) => {
                console.log(value);
                return (
                  <DemographicsCard
                    title={value.heading}
                    enabled={true}
                    items={value}
                  />
                );
              })} */}
          </div>
        </div>
      </div>
    </>
  )
}

export default DemographicsSettings

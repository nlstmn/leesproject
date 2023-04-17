import React, { useEffect, useState } from "react"
import { Switch } from "antd"
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
  arrayMove,
} from "react-sortable-hoc"
import { useDispatch, useSelector } from "react-redux"
import { setSurveySetupDrawerData } from "../../../../../../reducers/adminReducers"
import { surveySetupDrawerData } from "../../../../../../actions/adminActions"

const DemographicsCard = ({
  title,
  enabled,
  items,
  drag,
  setDemographicsQuestionsDrawer,
  setDeleteModal,
  selectedOptions,
  setSelectedOptions,
  parents,
  setParents,
}) => {
  const dispatch = useDispatch()

  let sortedItems = items.options.sort((a, b) => {
    return a.position - b.position
  })
  const [isItems, setItems] = useState(sortedItems)

  useEffect(() => {
    const sortedOptions = parents.map((i) => {
      if (i.id === items.id) {
        return {
          ...i,
          options: isItems,
        }
      } else {
        return i
      }
    })

    JSON.stringify(parents) != JSON.stringify(sortedOptions) &&
      isItems?.length > 0 &&
      setParents([...sortedOptions])
  }, [JSON.stringify(isItems)])

  const DragHandle = sortableHandle(({ active }) => (
    <span
      className={`iconx-dehaze grab__table_item ${active && " actived"}`}
    ></span>
  ))

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setItems(
      arrayMove(isItems, oldIndex, newIndex).map((i, index) => {
        return {
          ...i,
          position: index,
        }
      })
    )
  }

  const SortableItem = sortableElement(({ item }) => {
    const optionEnabled = items.survey_id || item.optional
    return (
      <div className="drag_item">
        <li>
          <div className="n__form_control">
            <label className="n__form_label dashboard_check">
              {optionEnabled && (
                <input
                  type="checkbox"
                  name={item["option_label"]}
                  onChange={() => {
                    const arr = [...selectedOptions]
                    if (arr?.length > 0 && arr?.includes(item.option_id)) {
                      arr.splice(arr.indexOf(item.option_id), 1)
                    } else {
                      arr.push(item.option_id)
                    }
                    setSelectedOptions(arr)
                  }}
                  checked={selectedOptions?.includes(item.option_id)}
                />
              )}
              <span className="label-_text">{item["option_label"]}</span>
              {optionEnabled && <span className="checkmark"></span>}
            </label>
          </div>
        </li>
        {items.survey_id && <DragHandle />}
      </div>
    )
  })

  const SortableList = sortableContainer(({ items }) => (
    <div className="items_sortable">
      {items !== undefined &&
        items.map((item, index) => {
          return (
            <SortableItem key={`${item.option_id}`} index={index} item={item} />
          )
        })}
    </div>
  ))
  const toggleAll = () => {
    //if more then one options are selected, deselect all
    //else select all
    if (
      items?.options
        .map((i) => i.option_id)
        .filter((item) => selectedOptions.includes(item)).length > 0
    ) {
      const arr = selectedOptions ? selectedOptions : []
      items.options.map((i) => {
        if (arr?.length > 0 && arr.includes(i.option_id)) {
          arr.splice(arr.indexOf(i.option_id), 1)
        }
      })
      setSelectedOptions([...arr])
    } else {
      //if all options are not selected, select all
      const arr = selectedOptions ? selectedOptions : []
      items.options.map((i) => {
        if (!arr.includes(i.option_id) && i.option_id !== null) {
          arr.push(i.option_id)
        }
      })
      setSelectedOptions([...arr])
    }
  }

  return (
    <>
      <div className="col-lg-4 col-md-12">
        <div className="card_block">
          {drag && drag}
          {items?.survey_id && (
            <>
              <span
                onClick={() => {
                  dispatch(surveySetupDrawerData({ selectedQuestion: items }))
                  setDemographicsQuestionsDrawer(true)
                }}
                className="iconx-pencil cursorp edit_card"
              ></span>
              <span
                onClick={() => setDeleteModal(true)}
                className="iconx-trash-2 cursorp delete_card"
              ></span>
            </>
          )}
          <div className="info">
            <Switch
              size="small"
              onChange={toggleAll}
              checked={
                items?.options
                  .map((i) => i.option_id)
                  .filter((item) => selectedOptions.includes(item)).length > 0
              }
            />
            <h4 className="sub_title">{title}</h4>
          </div>

          <div className="items">
            <ul>
              <SortableList
                useDragHandle
                items={isItems}
                onSortEnd={onSortEnd}
                axis="y"
                lockAxis="y"
                helperClass="itemb_sorting"
              />
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default DemographicsCard

import React, { useEffect, useLayoutEffect, useState } from "react"
import "react-toastify/dist/ReactToastify.css"
import { Link } from "react-router-dom"
import { Drawer } from "antd"
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
  arrayMove,
} from "react-sortable-hoc"
import { customfilter } from "../../../../../util/functions"
import axios from "axios"
const SectionDrawer = ({
  isModalVisible,
  setIsModalVisible,
  isChildrenModalVisible,
  setIsChildrenModalVisible,
  formData,
  change,
  send,
  pages,
  setFormData,
  selectedSection,
}) => {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id")
  const [isPageVisible, setIsPageVisible] = useState(false)
  const [isChildrenPageVisible, setIsChildrenPageVisible] = useState(false)
  const [query, setQuery] = useState("")
  const [pageBuffer, setBuffer] = useState([])
  const [allPages, setAllPages] = useState([])
  useLayoutEffect(() => {
    getPageData()
  }, [])

  const DragHandle = sortableHandle(() => (
    <span className="sortable-thumb">
      <span className="iconx-dots-three-vertical"></span>
      <span className="iconx-dots-three-vertical r-_icon"></span>
    </span>
  ))

  const SortableItemPage = sortableElement(({ value }) => (
    <li className="sort_item dark sections with_z">
      <span
        onClick={() => {
          handlePageSelect(value)
        }}
        className="delete iconx-trash-2 mr-3"
      ></span>

      <DragHandle />
      {value.name}
    </li>
  ))
  useEffect(() => {
    console.log(formData)
  }, [formData])
  const handlePageSelect = (page) => {
    console.log(page)
    let q = formData?.pages //id and position
    if (q.map((i) => i.id).includes(page.id)) {
      q = q.filter((i) => i.id !== page.id)
    } else {
      q.push(page)
    }
    setFormData((pre) => {
      return { ...pre, pages: q }
    })
  }
  useEffect(() => {
    console.log(selectedSection)
    selectedSection && getSectionData(selectedSection)
  }, [selectedSection])
  const getSectionData = (section_id) => {
    axios
      .get(`/admin/clients/${clientId}/surveys/sections/${section_id}`)
      .then((res) => {
        console.log(res)
        setFormData((pre) => {
          return {
            ...pre,
            name: res.data.name,
            pages: res?.data?.pages,
          }
        })
      })
  }
  const getPageData = () => {
    axios.get(`/admin/clients/${clientId}/surveys/pages`).then((res) => {
      console.log(res)
      setAllPages(res?.data?.pages)
    })
  }
  const SortableContainer = sortableContainer(({ children }) => {
    return <ul className="ul-_sort-items">{children}</ul>
  })

  const onPageSortEnd = ({ oldIndex, newIndex }) => {
    console.log(formData.pages)
    let pages = formData.pages
    pages = arrayMove(pages, oldIndex, newIndex)
    setFormData((pre) => {
      return {
        ...pre,
        pages,
      }
    })
  }
  useEffect(() => {
    pages?.length && customfilter(query, pages, ["name", "id"], setBuffer)
  }, [query])
  useEffect(() => {
    setBuffer(pages)
  }, [pages])
  return (
    <>
      {/* <PageDrawer 
        isModalVisible={isPageVisible} 
        setIsModalVisible={setIsPageVisible}
        isChildrenModalVisible={isChildrenPageVisible} 
        setIsChildrenModalVisible={setIsChildrenPageVisible}/> */}

      <Drawer
        className="dark--modal"
        title="Add / edit section"
        width={1300}
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
                placeholder="Section name"
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
                  Add new page
                </button>

                <div className="form-group sort_items mt-3">
                  <label>Pages</label>
                  <SortableContainer
                    onSortEnd={onPageSortEnd}
                    useDragHandle
                    helperclassName="sortableHelper"
                  >
                    {formData?.pages?.map((value, index) => (
                      <SortableItemPage
                        key={`item-${value}`}
                        index={index}
                        value={value}
                      />
                    ))}
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
          title="Select page(s)"
          width={500}
          closable={true}
          onClose={() => setIsChildrenModalVisible(false)}
          visible={isChildrenModalVisible}
        >
          <div className="row clearfix">
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

                {/* başlığa ait liste */}
                {allPages?.map((i) => {
                  return (
                    <label className="fancy-checkbox">
                      <input
                        onClick={() => {
                          handlePageSelect(i)
                        }}
                        checked={formData?.pages
                          ?.map((q) => q?.id)
                          .includes(i?.id)}
                        type="checkbox"
                        name="pages"
                      />
                      <span className="light-black">{i.name}</span>
                    </label>
                  )
                })}
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

export default SectionDrawer

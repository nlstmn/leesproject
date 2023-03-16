import React, { useState } from "react"
import SortableTree, {
  changeNodeAtPath,
  addNodeUnderParent,
  removeNodeAtPath,
  toggleExpandedForAll,
  getNodeAtPath,
} from "react-sortable-tree"
import { Row, Col, Switch, Button } from "antd"
import "react-sortable-tree/style.css"
import { useSelector, useDispatch } from "react-redux"
import { dropdownDepartmentsAction } from "../../../../../../actions/adminActions"
import { useEffect } from "react"

const DepartmentsSettings = ({
  customSearchMethod,
  searchString,
  searchFocusIndex,
  searchFinishCallback,
  treeStruct,
  setTreeStruct,
  istreeData,
  isMenuSub,
}) => {
  const getNodeKey = ({ treeIndex }) => treeIndex
  const dispatch = useDispatch()
  const dropdownDepartmentsData = useSelector(
    (store) => store.dropdownDepartments
  )

  const clientId = useSelector((store) => store.saveClientIdForSurveys.data)

  const [subDepartmentDrawerVisible, setSubDepartmentDrawerVisible] =
    useState(false)

  const [showAll, setShowAll] = useState(false)

  const getDropdownDepartments = async () => {
    await dispatch(dropdownDepartmentsAction(clientId))
    setTreeStruct(
      dropdownDepartmentsData.departments.departmentTreeArray.map((item) => {
        const trees = {
          name: item.name,
          children: item.children,
        }
        return trees
      })
    )
  }

  useEffect(() => {
    getDropdownDepartments()
  }, [])

  return (
    <>
      <div className="n__card mt-0 sortable__container nestable__crad">
        <div className="n__body">
          <Row align="top">
            <Col span="8">
              <h3 className="">{isMenuSub} departments</h3>
              <span className="card_desc">
                Total:{" "}
                <strong>
                  {`${dropdownDepartmentsData.departments.departmentCount} ${isMenuSub} `}
                  departments
                </strong>
              </span>
            </Col>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <Button onClick={() => setShowAll((prevState) => !prevState)}>
                Show/Hide All
              </Button>
              <Button style={{ display: "flex", alignItems: "center" }}>
                <i className="iconx-trash mr-2"></i>
                Delete non-used departments
              </Button>
              <Button
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => setSubDepartmentDrawerVisible(true)}
              >
                Change department label
              </Button>
            </Col>
          </Row>
          <Row style={{ height: "100%", overflowY: "scroll" }}>
            <Col span={24} style={{ overflowY: "none" }}>
              <SortableTree
                treeData={toggleExpandedForAll({
                  treeData: treeStruct,
                  expanded: showAll,
                })}
                onChange={(dropdownDepartmentsData) =>
                  setTreeStruct(dropdownDepartmentsData)
                }
                searchMethod={customSearchMethod}
                searchQuery={searchString}
                searchFocusOffset={searchFocusIndex}
                searchFinishCallback={searchFinishCallback}
                generateNodeProps={({ node, path }) => {
                  return {
                    title: (
                      <input
                        style={{ fontSize: "1.1rem" }}
                        value={node.name}
                        onChange={(event) => {
                          const name = event.target.value
                          setTreeStruct((state) =>
                            changeNodeAtPath({
                              treeData: treeStruct,
                              path,
                              getNodeKey,
                              newNode: { ...node, name: name },
                            })
                          )
                        }}
                      />
                    ),
                    buttons: [
                      <button
                        className="nestable_btn"
                        title="Add item"
                        onClick={() => {
                          const newPath = [...path]
                          const parentNode = getNodeAtPath({
                            treeData: treeStruct,
                            path: newPath,
                            getNodeKey,
                          }).node
                          setTreeStruct(
                            (state) =>
                              addNodeUnderParent({
                                treeData: treeStruct,
                                parentKey: path[path.length - 1],
                                expandParent: true,
                                getNodeKey,
                                newNode: {
                                  name: `${"New item"} ${
                                    path[path.length - 1]
                                  }`,
                                },
                                // addAsFirstChild: addAsFirstChild,
                              }).treeData
                          )
                        }}
                      >
                        <span className="iconx-plus-square"></span>
                      </button>,
                      <Switch
                        size="small"
                        className="mr-2"
                        checked={node.enable}
                      >
                        Toggle Switch
                      </Switch>,
                      <button
                        className="nestable_btn"
                        title="Remove item"
                        onClick={() =>
                          setTreeStruct(() =>
                            removeNodeAtPath({
                              treeData: treeStruct,
                              path,
                              getNodeKey,
                            })
                          )
                        }
                      >
                        <span className="iconx-minus-square"></span>
                      </button>,
                    ],
                  }
                }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default DepartmentsSettings

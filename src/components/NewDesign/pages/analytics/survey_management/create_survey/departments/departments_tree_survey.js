import React, { useState } from "react"
import SortableTree, {
  changeNodeAtPath,
  addNodeUnderParent,
  removeNodeAtPath,
  toggleExpandedForAll,
} from "react-sortable-tree"
import { Row, Col, Switch, Button } from "antd"
import "react-sortable-tree/style.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

const DepartmentsTreeSurveys = ({}) => {
  const getNodeKey = ({ treeIndex }) => treeIndex
  const dispatch = useDispatch()
  const dropdownDepartmentsData = useSelector(
    (store) => store.dropdownDepartments
  )

  const [subDepartmentDrawerVisible, setSubDepartmentDrawerVisible] =
    useState(false)
  const [treeStruct, setTreeStruct] = useState([])
  const [showAll, setShowAll] = useState(false)

  const getDropdownDepartments = async () => {
    // await dispatch(dropdownDepartmentsAction(1));
    setTreeStruct(
      dropdownDepartmentsData.departments.map((item) => {
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
          <Row style={{ height: "100%", overflowY: "scroll" }}>
            <Col span={24} style={{ overflowY: "none" }}>
              <SortableTree
                treeData={toggleExpandedForAll({
                  treeData: treeStruct,
                  expanded: showAll,
                })}
                onChange={(dropdownDepartmentsData) => null}
                searchMethod={null}
                searchQuery={null}
                searchFocusOffset={null}
                searchFinishCallback={null}
                generateNodeProps={({ node, path }) => {
                  return {
                    title: (
                      <input
                        style={{ fontSize: "1.1rem" }}
                        value={node.name}
                        onChange={(event) => {
                          const name = event.target.value
                        }}
                      />
                    ),
                    buttons: [
                      <button
                        className="nestable_btn"
                        title="Add item"
                        onClick={() => null}
                      >
                        <span className="iconx-plus-square"></span>
                      </button>,
                      <Switch size="small" className="mr-2">
                        Toggle Switch
                      </Switch>,
                      <button
                        className="nestable_btn"
                        title="Remove item"
                        onClick={() => null}
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

export default DepartmentsTreeSurveys

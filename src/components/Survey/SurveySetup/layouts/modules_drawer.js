import React, { useRef } from "react"
import { Drawer } from "antd"
import { isMobile } from "react-device-detect"

const ModulesDrawer = ({
  visibleModules,
  setModules,
  handleModulesChange,
  checkedModules,
  setCheckedModules,
}) => {
  let drawerContainer = useRef()

  const languages = [
    {
      key: 1,
      name: "Adjacency",
      label: "Adjacency",
    },
    {
      key: 2,
      name: "Alignement",
      label: "Alignement",
    },
    {
      key: 3,
      name: "Days per week",
      label: "Days per week",
    },
    {
      key: 4,
      name: "Homeworking",
      label: "Homeworking",
    },
    {
      key: 5,
      name: "Inclusive Workplace",
      label: "Inclusive Workplace",
    },
    {
      key: 6,
      name: "IT",
      label: "IT",
    },
    {
      key: 7,
      name: "Journey to Work",
      label: "Journey to Work",
    },
    {
      key: 8,
      name: "Lab",
      label: "Lab",
    },
    {
      key: 9,
      name: "Mobility Support",
      label: "Mobility Support",
    },
    {
      key: 10,
      name: "Return to Office",
      label: "Return to Office",
    },
    {
      key: 11,
      name: "Third Space",
      label: "Third Space",
    },
    {
      key: 12,
      name: "Wellbeing",
      label: "Wellbeing",
    },
  ]

  console.log(checkedModules)
  return (
    <div className="drawer_sc-div survey__form" ref={drawerContainer}>
      <Drawer
        title="Choose as many as you like"
        placement="right"
        width={isMobile === true ? "100%" : "60%"}
        onClose={() => setModules(false)}
        visible={visibleModules}
        getContainer={() => drawerContainer.current}
      >
        {languages.map((item) => (
          <div className="form-group for__drawer" key={item.key}>
            <label className="container_check version_2">
              {item.label}
              <input
                type="checkbox"
                name={item.name}
                // checked={checkedModules.includes(item.name)}
                onChange={handleModulesChange}
              />
              <span className="checkmark"></span>
            </label>
          </div>
        ))}
      </Drawer>
    </div>
  )
}

export default ModulesDrawer

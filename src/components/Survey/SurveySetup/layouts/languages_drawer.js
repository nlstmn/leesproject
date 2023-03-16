import React, { useRef } from "react"
import { Drawer } from "antd"

const LanguagesDrawer = ({
  visibleLanguages,
  setLangages,
  handleLanguagesChange,
  checkedLanguages,
  setCheckedLanguages,
}) => {
  let drawerContainer = useRef()

  const languages = [
    {
      key: 1,
      name: "Arabic",
      label: "Arabic",
    },
    {
      key: 2,
      name: "Bahasa",
      label: "Bahasa",
    },
    {
      key: 3,
      name: "Chinese (Simplified)",
      label: "Chinese (Simplified)",
    },
    {
      key: 4,
      name: "Chinese (Traditional)",
      label: "Chinese (Traditional)",
    },
    {
      key: 5,
      name: "Czech",
      label: "Czech",
    },
    {
      key: 6,
      name: "Danish",
      label: "Danish",
    },
    {
      key: 7,
      name: "Dutch",
      label: "Dutch",
    },
    {
      key: 8,
      name: "Dutch (informal)",
      label: "Dutch (informal)",
    },
    {
      key: 9,
      name: "English (UK)",
      label: "English (UK)",
    },
    {
      key: 10,
      name: "English (USA)",
      label: "English (USA)",
    },
    {
      key: 11,
      name: "Estonian",
      label: "Estonian",
    },
    {
      key: 12,
      name: "Finnish",
      label: "Finnish",
    },
  ]

  console.log(checkedLanguages)
  return (
    <div className="drawer_sc-div survey__form" ref={drawerContainer}>
      <Drawer
        title="Choose as many as you like"
        placement="right"
        width="60%"
        onClose={() => setLangages(false)}
        visible={visibleLanguages}
        getContainer={() => drawerContainer.current}
      >
        {languages.map((item) => (
          <div className="form-group for__drawer" key={item.key}>
            <label className="container_check version_2">
              {item.label}
              <input
                type="checkbox"
                name={item.name}
                // checked={checkedLanguages.includes(item.name)}
                onChange={handleLanguagesChange}
              />
              <span className="checkmark"></span>
            </label>
          </div>
        ))}
      </Drawer>
    </div>
  )
}

export default LanguagesDrawer

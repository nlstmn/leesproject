import React, { useState, useRef, useEffect } from "react"

const DashboardSelect = ({ item, i, arr, bordered }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(0)
  const [isClassSelect, setClassSelect] = useState(false)

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen)
  }

  const setSelectedThenCloseDropdown = (index) => {
    setSelectedOption(index)
    setIsOptionsOpen(false)
  }

  const handleKeyDown = (index) => (e) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault()
        setSelectedThenCloseDropdown(index)
        break
      default:
        break
    }
  }

  const handleListKeyDown = (e) => {
    switch (e.key) {
      case "Escape":
        e.preventDefault()
        setIsOptionsOpen(false)
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedOption(
          selectedOption - 1 >= 0 ? selectedOption - 1 : item.options.length - 1
        )
        break
      case "ArrowDown":
        e.preventDefault()
        setSelectedOption(
          selectedOption == item.options.length - 1 ? 0 : selectedOption + 1
        )
        break
      default:
        break
    }
  }

  const ref_dash_dropdown_toggle_select = useRef()
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.classList.contains("dash_dropdown_toggle_select")) {
        setIsOptionsOpen(false)
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [setIsOptionsOpen])

  return (
    <>
      <div
        className={`dash-dropdown_select-container dashboard__key ${
          bordered && bordered ? " bordered" : " "
        } ${i === 0 ? " first-_itm" : " "} ${
          arr.length - 1 === i ? " last-_itm" : ""
        }`}
        id={item.id}
      >
        <div
          className={`dash-dropdown_select ${
            item.options[selectedOption] === item.options[0] ? "" : ""
          } `}
        >
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isOptionsOpen}
            className={`dash_dropdown_toggle_select ${
              isOptionsOpen ? "expanded" : ""
            }`}
            onClick={toggleOptions}
            onKeyDown={handleListKeyDown}
            ref={ref_dash_dropdown_toggle_select}
          >
            <span
              className={`
              ${
                item.options[selectedOption] === "Dashboard key"
                  ? "dp-none"
                  : ""
              }
              ${
                item.options[selectedOption] === "Above Benchmark"
                  ? "cxv-above-benchmark-l-icn"
                  : ""
              }
              ${
                item.options[selectedOption] === "Below Benchmark"
                  ? "cxv-below-benchmark-l-icn"
                  : ""
              }
              ${
                item.options[selectedOption] === "Equal to Benchmark"
                  ? "cxv-equal-to-benchmark-l-icn"
                  : ""
              }
              ${
                item.options[selectedOption] === "Above Leesman+"
                  ? "cxv-leesman-l-icn"
                  : ""
              }
              ${
                item.options[selectedOption] === "Super driver"
                  ? "cxc-super-driver-new"
                  : ""
              }
              ${
                item.options[selectedOption] === "Top tip"
                  ? "cxv-top-tip-l-icn"
                  : ""
              }
              `}
            >
              {item.options[selectedOption] === "Leesman Index – Office"
                ? "Lmi"
                : ""}
              {item.options[selectedOption] === "Leesman Index – Home"
                ? "H-Lmi"
                : ""}
            </span>
            {item.options[selectedOption]}
          </button>
          <ul
            className={`options ${isOptionsOpen ? "show" : ""}`}
            role="listbox"
            aria-activedescendant={item.options[selectedOption]}
            tabIndex={-1}
            onKeyDown={handleListKeyDown}
          >
            {item.options.map((option, index) => (
              <li
                id={option}
                role="option"
                aria-selected={selectedOption == index}
                className={index === 0 ? "dp-none" : " "}
                tabIndex={0}
                onKeyDown={handleKeyDown(index)}
                onClick={() => {
                  setSelectedThenCloseDropdown(index)
                }}
              >
                <span
                  className={`
                  ${
                    option === "Above Benchmark"
                      ? "cxv-above-benchmark-l-icn"
                      : ""
                  }
                  ${
                    option === "Below Benchmark"
                      ? "cxv-below-benchmark-l-icn"
                      : ""
                  }
                  ${
                    option === "Equal to Benchmark"
                      ? "cxv-equal-to-benchmark-l-icn"
                      : ""
                  }
                  ${option === "Above Leesman+" ? "cxv-leesman-l-icn" : ""}
                  ${option === "Super driver" ? "cxc-super-driver-new" : ""}
                  ${option === "Top tip" ? "cxv-top-tip-l-icn" : ""}
                  `}
                >
                  {option === "Leesman Index – Office" ? "Lmi" : ""}
                  {option === "Leesman Index – Home" ? "H-Lmi" : ""}
                </span>

                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default DashboardSelect

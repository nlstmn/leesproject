import React, { useState } from "react"
import DropdownSelect from "./dropdown_select"
import ImageSelect from "./image_select"
import SortableSelect from "./sortable_select"
import SliderPercentage from "./slider_percentage"
import SliderPercentageTotal from "./slider_percentage_total"
import SliderBinary from "./slider_binary"
import SliderBinaryStatic from "./slider_binary_static"
import CheckboxSelect from "./checkbox_select"
import CheckboxSelectSpecify from "./checkbox_select_specify"
import RadioSelect from "./radio_select"
import RadioSelectSpecify from "./radio_select_specify"
import TableRadioSelect from "./table_radio_select"
import TableRadioSelectOpenable from "./table_radio_select_openable"
import TableCheckboxSelectOpenable from "./table_checkbox_select_openable"
import TableCheckboxRadioSelect from "./table_checkbox_radio_select"
import { fadeInRight, fadeInUp, fadeInLeft, fadeInDown } from "react-animations"
import { useMediaQuery } from "react-responsive"
import Radium, { StyleRoot } from "radium"
import {
  percentage_items,
  percentage_items_total,
  binary_items,
  binary_items_static,
  drodown_items,
} from "./0_dummy_data"
export default function AllQuestions() {
  const isDesktopOrLaptop = useMediaQuery({ query: "(min-width: 1224px)" })
  const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" })
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" })
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" })
  const isMobileDevice = useMediaQuery({ query: "(max-width: 768px)" })
  const styles = {
    fadeInLeft: {
      animation: "x 1s",
      animationName: Radium.keyframes(fadeInLeft, "fadeInLeft"),
    },
    fadeInRight: {
      animation: "x 1s",
      animationName: Radium.keyframes(fadeInRight, "fadeInRight"),
    },
    fadeInUp: {
      animation: "x 1s",
      animationName: Radium.keyframes(fadeInUp, "fadeInUp"),
    },
    fadeInDown: {
      animation: "x 1s",
      animationName: Radium.keyframes(fadeInDown, "fadeInDown"),
    },
  }
  const [valuesTotal, setTotalValues] = useState([0])

  return (
    <StyleRoot style={isMobileDevice ? null : styles.fadeInRight}>
      <div id="middle-wizard">
        <div className="question_div" id="scroll__that">
          {/* Question Title */}
          <br />
          <br />
          <h3 className="main_question">
            DropdownSelect Q ― Please answer the following questions about
            yourself and your role within your organisation.
          </h3>
          {drodown_items.map((item, i, arr) => (
            <DropdownSelect item={item} i={i} arr={arr} />
          ))}
        </div>
      </div>
      <div id="middle-wizard">
        <div className="question_div" id="scroll__that">
          {/* Question Title */}
          <br />
          <br />
          <h3 className="main_question">
            SliderPercentageTotal Q ― On average, what proportion of your work
            time at <span className="text-blue">Organisation name</span> do you
            spend at the following locations? Drag the sliders to total 100%,
            and tick the ‘I have no fixed routine box / As required’ box if
            applicable.
            <br />
            <br />
            Please note: the information you provide here helps us understand
            which sections of the survey are relevant to you.
          </h3>
          {percentage_items_total.map((item, i, arr) => (
            <SliderPercentageTotal
              item={item}
              i={i}
              arr={arr}
              setTotalValues={setTotalValues}
              valuesTotal={valuesTotal}
            />
          ))}
          <div className="total-slider">
            <h3>{valuesTotal}%</h3>
          </div>

          {/* <label className="container_check version_2 for_slider no_border">
                          I have no fixed routine / As required
                            <input type="checkbox" />
                            <span className="checkmark"></span>
                          </label> */}
        </div>
      </div>
      <div id="middle-wizard">
        <TableRadioSelect /> <br />
        <br />
        <h3 className="main_question">TableRadioSelect</h3>
      </div>
      <div id="middle-wizard">
        <CheckboxSelect /> <br />
        <br />
        <h3 className="main_question">CheckboxSelect</h3>
      </div>
      <div id="middle-wizard">
        <CheckboxSelectSpecify /> <br />
        <br />
        <h3 className="main_question">CheckboxSelectSpecify</h3>
      </div>{" "}
      <div id="middle-wizard">
        <RadioSelectSpecify /> <br />
        <br />
        <h3 className="main_question">RadioSelectSpecify</h3>
      </div>{" "}
      <div id="middle-wizard">
        <RadioSelect /> <br />
        <br />
        <h3 className="main_question">RadioSelect</h3>
      </div>
      <div id="middle-wizard">
        <TableCheckboxRadioSelect /> <br />
        <br />
        <h3 className="main_question">TableCheckboxRadioSelect</h3>
      </div>{" "}
      <div id="middle-wizard">
        <TableRadioSelectOpenable /> <br />
        <br />
        <h3 className="main_question">TableRadioSelectOpenable</h3>
      </div>
      <div id="middle-wizard">
        <TableCheckboxSelectOpenable /> <br />
        <br />
        <h3 className="main_question">TableCheckboxSelectOpenable</h3>
      </div>
      <div id="middle-wizard">
        <div className="question_div" id="scroll__that">
          {/* Question Title */}
          <h3 className="main_question">
            SliderPercentage Q ― Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua?
          </h3>
          {percentage_items.map((item, i, arr) => (
            <SliderPercentage item={item} i={i} arr={arr} />
          ))}
          <br />
          <br /> <h3 className="main_question">SliderPercentage</h3>
        </div>
      </div>{" "}
      <div className="question_div" id="scroll__that">
        {/* Question Title */}
        <br />
        <br />
        <h3 className="main_question">
          SliderBinaryStatic Q ― Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua?
        </h3>
        <div id="middle-wizard">
          {binary_items_static.map((item, i, arr) => (
            <SliderBinaryStatic item={item} i={i} arr={arr} />
          ))}
        </div>
        <br />
        <br /> <h3 className="main_question">SliderPercentage</h3>
      </div>{" "}
      <div className="question_div" id="scroll__that">
        {/* Question Title */}
        <br />
        <br />
        <h3 className="main_question">
          SliderBinary Q ― Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua?
          <br />
          <br />
          Greatest impact being 1 and lowest impact being 5, only one ranking
          number can be used per "aspect".
        </h3>
        <div id="middle-wizard">
          {binary_items.map((item, i, arr) => (
            <SliderBinary item={item} i={i} arr={arr} />
          ))}
        </div>{" "}
        <br />
        <br />
        <h3 className="main_question">SliderBinary</h3>
      </div>{" "}
      <div id="middle-wizard">
        <SortableSelect /> <br />
        <br />
        <h3 className="main_question">SortableSelect</h3>
      </div>
      <div id="middle-wizard">
        <ImageSelect /> <br />
        <br />
        <h3 className="main_question">ImageSelect</h3>
      </div>
    </StyleRoot>
  )
}

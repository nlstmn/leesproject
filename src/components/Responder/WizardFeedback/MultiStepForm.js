import React, { useState, useEffect, useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import StepWizard from "react-step-wizard"
import { Select, Tag, Tooltip } from "antd"
import { connect } from "react-redux"
import { setBgImage } from "../../../actions/settingsAction"
import Wrap from "../../../assets/images/wrap-dark.png"
import axios from "axios"
import { Steps } from "../../common/commonComponents/CommonBlocks"
import { notification } from "antd"
import moment from "moment"
const { Option } = Select

const PositiveNegative = (props) => {
  const [disable, setDisable] = useState()
  function radioChange(e) {
    console.log(e.target.value, e.target.name)
    props.ispositive(e.target.value === "true")
    setDisable(e.target.value === "true")
  }
  useEffect(() => {
    console.log(disable, !!disable)
  }, [])
  useEffect(() => {
    console.log(disable, !!disable)
  }, [disable])
  return (
    <>
      <div className="multi-_step">
        <div className="row clearfix step-_header">
          <div className="col text-left">
            <h2 className="h4 m-0 font-600">Share a comment</h2>
          </div>
          <div className="col-auto">
            <div className="stamp" aria-hidden="true">
              <i className="icon-rp-answerrspo step-_icon"></i>
            </div>
          </div>
          <Link
            to={props.updateLink ? "/responder-home" : "/"}
            className="close-_step"
            title="Close"
          >
            <i className="iconx-x" aria-label="Light icon"></i>
          </Link>
        </div>

        <div className="form-_actions min-h-366">
          <p>Is your comment positive or negative?</p>

          <div className="row justify-content-center pb-5">
            {/* !!! İFADE SEÇİMİ DEĞİŞTİ !!!*/}
            <div className="col-12">
              <input
                onChange={radioChange}
                className="checkbox-tools"
                type="radio"
                name="comment"
                value="true"
                id="positive"
              />
              <label
                className="for-checkbox-tools to-_bigger"
                htmlFor="positive"
              >
                <i
                  className="icon_f-very-goodicon_f- give-_feedback rate-_positive"
                  aria-hidden="true"
                ></i>
                Positive
              </label>
              <input
                onChange={radioChange}
                className="checkbox-tools"
                type="radio"
                name="comment"
                value="false"
                id="negative"
              />
              <label
                className="for-checkbox-tools to-_bigger"
                htmlFor="negative"
              >
                <i
                  className="icon_f-very-badicon_f- give-_feedback rate-_negative"
                  aria-hidden="true"
                ></i>
                Negative
              </label>
            </div>
          </div>
        </div>
      </div>
      <Stats disable={disable === undefined} step={1} {...props} />
    </>
  )
}

const SelectLocation = (props) => {
  const [isOffice, setIsOffice] = useState(false)
  const [location_id, setLocationId] = useState()
  const [location_type, setLocationType] = useState()
  useEffect(() => {
    console.log(props.user)
  }, [props])

  return (
    <>
      <div className="multi-_step">
        <div className="row clearfix step-_header">
          <div className="col text-left">
            <h2 className="h4 m-0 font-600">Share a comment</h2>
          </div>
          <div className="col-auto">
            <div className="stamp" aria-hidden="true">
              <i className="icon-rp-answerrspo step-_icon"></i>
            </div>
          </div>
          <Link
            to={props.updateLink ? "/responder-home" : "/"}
            className="close-_step"
            title="Close"
          >
            <i className="iconx-x"></i>
          </Link>
        </div>

        <div className="form-_actions min-h-366 ">
          <p>Which location are you talking about?</p>
          {/* <p>{props.questionLabel}</p> */}

          <div className="row justify-content-center pb-5">
            <div className="col-12 pb-15">
              <Select
                aria-label="Location type selection; please double tap to open the list."
                getPopupContainer={(trigger) => trigger.parentElement}
                dropdownStyle={{ zIndex: 2000 }}
                placeholder="Choose type"
                style={{ width: 200 }}
                onChange={(e, d) => {
                  props.selectLocationType(e)
                  setLocationType(d.children)
                  console.log(e, d)
                  if (d.children === "One of my organisation’s other offices") {
                    setIsOffice(true)
                  } else {
                    setIsOffice(false)
                    props.selectLocationId()
                    setLocationId()
                  }
                }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {props.questionOptions
                  .sort((a, b) => {
                    if (a.position < b.position) return -1
                    if (a.position > b.position) return 1
                    return 0
                  })
                  .map((item) => {
                    return (
                      <Option
                        title={item.label}
                        aria-label={item.label}
                        tabIndex={0}
                        value={item.id}
                      >
                        {item.label}
                      </Option>
                    )
                  })}
              </Select>
            </div>
            {isOffice && (
              <div className="col-12">
                <Select
                  aria-label="Office selection; please double tap to open the list."
                  getPopupContainer={(trigger) => trigger.parentElement}
                  showSearch
                  placeholder="Choose location"
                  style={{ width: 200 }}
                  onChange={(e) => {
                    props.selectLocationId(e)
                    setLocationId(e)

                    console.log(e)
                  }}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {props.otherLocations
                    .filter((i) => !i.code)
                    .map((item) => {
                      return (
                        <Option
                          title={item.label}
                          aria-label={item.label}
                          tabIndex={0}
                          value={item.id}
                        >
                          {item.label}
                        </Option>
                      )
                    })}
                </Select>
              </div>
            )}
          </div>
        </div>
      </div>
      <Stats
        disable={
          location_type === undefined ||
          (location_type === "One of my organisation’s other offices" &&
            location_id === undefined)
        }
        step={2}
        {...props}
      />
    </>
  )
}

const AnswerQuestion = (props) => {
  const [selections, setSelections] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [selected, setSelected] = useState([])
  const [suggested, setSuggested] = useState([])
  const [input, setInput] = useState("")
  const [searchVal, setSearchVal] = useState("")
  const [disable, setDisable] = useState(true)
  const [helpdesk, setHelpdesk] = useState([])
  const [selectedHelpdesk, setSelectedHelpdesk] = useState([])
  const [currentLocationId, setCurrentLocationId] = useState([])
  const minimumStringLength = 2
  const maximumSelectableTag = 5
  const ShownSuggestionCount = 12
  const filteredWords = [
    "about",
    "above",
    "across",
    "after",
    "afterwards",
    "again",
    "against",
    "all",
    "almost",
    "alone",
    "along",
    "already",
    "also",
    "although",
    "always",
    "am",
    "among",
    "amongst",
    "amount",
    "an",
    "and",
    "another",
    "any",
    "anyhow",
    "anyone",
    "anything",
    "anyway",
    "anywhere",
    "are",
    "around",
    "as",
    "at",
    "back",
    "be",
    "became",
    "because",
    "become",
    "becomes",
    "becoming",
    "been",
    "before",
    "beforehand",
    "behind",
    "being",
    "below",
    "beside",
    "besides",
    "between",
    "beyond",
    "both",
    "bottom",
    "but",
    "by",
    "can",
    "cannot",
    "can't",
    "could",
    "couldn't",
    "describe",
    "detail",
    "do",
    "doing",
    "done",
    "don't",
    "down",
    "due",
    "during",
    "each",
    "eg",
    "eight",
    "either",
    "eleven",
    "else",
    "elsewhere",
    "empty",
    "enough",
    "etc",
    "even",
    "ever",
    "every",
    "everyone",
    "everything",
    "everywhere",
    "except",
    "few",
    "fifteen",
    "fifty",
    "fill",
    "find",
    "fire",
    "first",
    "five",
    "for",
    "former",
    "formerly",
    "forty",
    "found",
    "four",
    "from",
    "front",
    "full",
    "further",
    "get",
    "give",
    "go",
    "had",
    "has",
    "hasn't",
    "have",
    "he",
    "hence",
    "her",
    "here",
    "hereafter",
    "hereby",
    "herein",
    "hereupon",
    "hers",
    "herself",
    "him",
    "himself",
    "his",
    "how",
    "however",
    "hundred",
    "i",
    "ie",
    "if",
    "in",
    "inc",
    "indeed",
    "into",
    "is",
    "it",
    "its",
    "itself",
    "keep",
    "last",
    "latter",
    "latterly",
    "least",
    "less",
    "ltd",
    "made",
    "many",
    "may",
    "me",
    "meanwhile",
    "might",
    "mine",
    "more",
    "moreover",
    "most",
    "mostly",
    "move",
    "much",
    "must",
    "my",
    "myself",
    "name",
    "namely",
    "neither",
    "never",
    "nevertheless",
    "next",
    "nine",
    "no",
    "nobody",
    "none",
    "noone",
    "nor",
    "not",
    "nothing",
    "now",
    "nowhere",
    "of",
    "off",
    "often",
    "on",
    "once",
    "one",
    "only",
    "onto",
    "or",
    "other",
    "others",
    "otherwise",
    "our",
    "ours",
    "ourselves",
    "out",
    "over",
    "own",
    "part",
    "per",
    "perhaps",
    "please",
    "put",
    "rather",
    "re",
    "same",
    "see",
    "seem",
    "seemed",
    "seeming",
    "seems",
    "several",
    "she",
    "should",
    "side",
    "since",
    "six",
    "sixty",
    "so",
    "some",
    "somehow",
    "someone",
    "something",
    "sometime",
    "sometimes",
    "somewhere",
    "still",
    "such",
    "take",
    "ten",
    "than",
    "that",
    "the",
    "their",
    "them",
    "themselves",
    "then",
    "thence",
    "there",
    "thereafter",
    "thereby",
    "therefore",
    "therein",
    "thereupon",
    "these",
    "they",
    "thick",
    "thin",
    "third",
    "this",
    "those",
    "though",
    "three",
    "through",
    "throughout",
    "thru",
    "thus",
    "to",
    "together",
    "too",
    "top",
    "toward",
    "towards",
    "twelve",
    "twenty",
    "two",
    "un",
    "under",
    "until",
    "up",
    "upon",
    "us",
    "very",
    "via",
    "was",
    "we",
    "well",
    "were",
    "what",
    "whatever",
    "when",
    "whence",
    "whenever",
    "where",
    "whereafter",
    "whereas",
    "whereby",
    "wherein",
    "whereupon",
    "wherever",
    "whether",
    "which",
    "while",
    "whither",
    "who",
    "whoever",
    "whole",
    "whom",
    "whose",
    "why",
    "will",
    "with",
    "within",
    "without",
    "would",
    "yet",
    "you",
    "your",
    "yours",
    "yourself",
    "yourselves",
  ]

  useEffect(() => {
    populateSuggestions(input)
  }, [input])

  useEffect(() => {
    console.log(selections)
    populateSuggestions(input)
    populateSelections()
  }, [selections])
  useEffect(() => {
    check()
    let l = props.selectedLocationId
      ? props.selectedLocationId
      : props.user.location_id
    console.log(l)
    setCurrentLocationId(l)

    let h = props.helpdesk
    console.log(h)
    let sss = []
    selections.forEach((item) => {
      item.theme_id.forEach((t) => {
        if (
          h
            .filter((i) => i.locations.includes(l))
            .filter((i) => i.themes.includes(t)).length > 0
        ) {
          let helpdesk = h
            .filter((i) => i.locations.includes(l))
            .filter((i) => i.themes.includes(t))
          console.log(helpdesk)
          sss.push(helpdesk)
        }
      })
    })
    setHelpdesk([...sss])
  }, [selections, input, selectedHelpdesk])
  useState(() => {
    console.log(helpdesk)
  }, [helpdesk])
  function changeHelpDesk(e, id) {
    console.log(e, id)
    let arr = selectedHelpdesk
    if (arr.includes(id)) {
      arr = arr.filter((i) => i !== id)
    } else {
      arr.push(id)
    }
    setSelectedHelpdesk([...arr])
  }

  function populateSuggestions(e) {
    console.log(helpdesk)
    let arr = e.split(" ")
    let buffer = props.data
    let bufferSuggest = []
    let startsWith = []
    let exactMatch = []
    console.log(selections.map((o) => o.label.toLowerCase()))
    console.log(arr)
    arr = arr.filter((i) => !filteredWords.includes(i))
    arr = arr.filter((i) => i.length > minimumStringLength)

    console.log(buffer)
    buffer = buffer.map((i) => {
      return { ...i, label_arr: i.label.split(" ") }
    })
    console.log(buffer)
    arr.forEach((item) => {
      buffer.forEach((i) => {
        i.label_arr.forEach((word) => {
          if (item !== "") {
            if (
              String(word).toLocaleLowerCase() === String(item).toLowerCase()
            ) {
              exactMatch.push(i)
            } else if (
              String(word)
                .toLocaleLowerCase()
                .startsWith(item.toLocaleLowerCase())
            ) {
              startsWith.push(i)
            } else if (
              String(word).toLowerCase().includes(item.toLowerCase())
            ) {
              if (item.length > minimumStringLength) {
                bufferSuggest.push(i)
              }
            } else if (
              item.slice(-1).toLowerCase() === "s" ||
              item.slice(-1).toLowerCase() === "," ||
              item.slice(-1).toLowerCase() === "." ||
              item.slice(-1).toLowerCase() === "'" ||
              item.slice(-2).toLowerCase() === "'s" ||
              item.slice(-2).toLowerCase() === "s'"
            ) {
              if (
                item.length > minimumStringLength + 2 &&
                String(word)
                  .toLowerCase()
                  .startsWith(item.slice(0, -2).toLowerCase())
              ) {
                startsWith.push(i)
              }
            }
          }
        })
      })
    })
    let suggestionArr = [...exactMatch, ...startsWith, ...bufferSuggest]
    console.log(
      "exacts: ",
      exactMatch.map((i) => i.label),
      " starts with: ",
      startsWith.map((i) => i.label),
      " suggested: ",
      bufferSuggest.map((i) => i.label)
    )
    suggestionArr = [...new Set(suggestionArr)]
    suggestionArr = suggestionArr.filter(
      (i) =>
        !selections
          .map((o) => o.label.toLowerCase())
          .includes(i.label.toLowerCase())
    )

    let populate = suggestionArr.slice(0, ShownSuggestionCount).map((item) => {
      return (
        <Tag
          className="tag-input-div "
          color="#70777a"
          onClick={() => {
            addTag(item)
          }}
        >
          {item.label}
        </Tag>
      )
    })
    setSuggested(populate)
    console.log(arr)
  }
  function populateSelections(e) {
    let arr = selections.map((item) => {
      return (
        <Tag
          className="tag-input-div"
          color="#70777a"
          onClick={() => {
            removeTag(item)
          }}
        >
          {item.label}
        </Tag>
      )
    })

    setSelected(arr)
  }
  function addTag(item) {
    console.log(selections.length)
    setSearchVal("")
    if (selections.length >= maximumSelectableTag) {
      notification.warning({
        message: `You cannot select more then ${
          maximumSelectableTag + maximumSelectableTag <= 1 ? " tag" : " tags"
        }`,
      })
    } else if (selections.includes(item)) {
      notification.warning({ message: "You have already added this tag" })
    } else {
      let arr = selections
      arr.push(item)
      populateSelections([...arr])
      setSelections([...arr])
    }
  }
  function removeTag(item) {
    console.log(selections.length)
    console.log(item)
    let arr = [...selections.filter((i) => i.tag_id !== item.tag_id)]
    console.log(arr)
    setSelections([...arr])
    populateSelections([...arr])
    console.log(selections)
  }
  function change(e) {
    const { value } = e.target
    setInput(value)
    setSearchVal("")
    console.log(value)
  }
  function changeSearch(e) {
    let { value } = e.target
    setSearchVal(value)
    populateSuggestions(input + " " + value)
  }
  function check() {
    console.log(selections, input)
    if (input.length < 3) {
      setDisable(true)
    } else if (selections.length < 1) {
      setDisable(true)
    } else if (input.length > 254) {
      setDisable(true)
    } else {
      setDisable(false)
    }
  }
  function checkBlockWords(text) {
    const blockWords = [
      "paki",
      "nigger",
      "nigga",
      "cunt",
      "coon",
      "faggot",
      "homo",
      "whore",
      "motherfucker",
    ]
    let textArr = text.split(" ")
    let bool = false
    textArr.forEach((word) => {
      if (blockWords.includes(word.toLowerCase())) {
        bool = true
      }
    })
    return bool
  }
  function send(input_, selections_) {
    console.log(currentLocationId)
    console.log(
      props.alllocations.filter((i) => i.id === currentLocationId)[0].label
    )
    console.log(selectedHelpdesk)
    if (input_.length < 3) {
      notification.warning({ message: "Please write more than 3 letters" })
    } else if (selections_.length < 1) {
      notification.warning({ message: "Please select at least 1 tag!" })
    } else if (input_.length > 254) {
      notification.warning({
        message: `Text is too long! (max 255 characters, current:${input_.length})`,
      })
    } else if (checkBlockWords(input_)) {
      notification.warning({
        message: "Your comment cannot be submitted using that language",
      })
    } else {
      setDisable(false)

      let d = {
        location_type: props.selectedLocationType,
        location_id: props.selectedLocationId,
        message: input_,
        selections: selections_.map((item) => {
          return item.tag_id
        }),
        ispositive: props.ispositive,
        location_title: props.alllocations.filter(
          (i) => i.id === currentLocationId
        )[0].label,
      }
      console.log(d)
      axios
        .post("/feedbacks", d)
        .then((res) => {
          console.log(props, res)
          setInput("")
          setSelections([])
          if (selectedHelpdesk.length > 0) {
            console.log("data:", d, " selected helpdesk:", selectedHelpdesk)
            let data = {
              ...d,
              helpdesk_ids: selectedHelpdesk,
            }
            axios.post("/helpdesk", data).then((r) => {
              console.log(r)
              notification.success({
                message: "Your feedback sent to helpdesk.",
              })
            })
          }
          props.goToStep(4)
        })
        .catch((err) => {
          console.log(err)
          notification.warning({ message: "Something is wrong" })
        })
    }
  }
  return (
    <>
      <div className="multi-_step">
        <div className="row clearfix step-_header">
          <div className="col text-left">
            <h2 className="h4 m-0 font-600">Share a comment</h2>
          </div>
          <div className="col-auto">
            <div className="stamp" aria-hidden="true">
              <i className="icon-rp-answerrspo step-_icon"></i>
            </div>
          </div>
          <Link
            to={props.updateLink ? "/responder-home" : "/"}
            className="close-_step"
            title="Close"
          >
            <i className="iconx-x"></i>
          </Link>
        </div>

        <div className="form-_actions min-h-366">
          <p>What kind of feedback would you like to share?</p>

          <div className="row justify-content-center pb-5  auto-_resize">
            <div className="col-12">
              <div className="form-group">
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Can you please tell us more?"
                  cols="30"
                  value={input}
                  onChange={change}
                  required
                ></textarea>
              </div>
            </div>
            {selections.length >= 1 ? (
              <div className="col-lg-12 col-md-12 pb-20 float-leftt">
                <p className="suggestions-title c-blue">Selected tags</p>{" "}
                {/* BÜYÜK HARFTEN SONRA DİĞER KELİME HEP KÜÇÜK HARFLE BAŞLAYACAK !! */}
                {/* <TagInput/> */}
                {selected}
              </div>
            ) : (
              <></>
            )}
            <div className="col-12 float-leftt">
              <span className="suggestions-title c-blue sub-_title">
                What is your feedback?
              </span>
              <div className="input-group search-suggestions">
                <input
                  type="text"
                  value={searchVal}
                  onChange={changeSearch}
                  className="form-control"
                  placeholder="Select a few relevant tags"
                />

                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="icon-magnifier"></i>
                  </span>
                </div>
              </div>
            </div>

            <div className="col-12 float-leftt">{suggested}</div>
            <div className="col-12 zero-top">
              {helpdesk[0] &&
                helpdesk[0].map((item) => {
                  return (
                    <label
                      className="pt-20 fancy-checkbox responder-checkbox-form checkbox-flexible"
                      htmlFor="flag"
                    >
                      <input
                        type="checkbox"
                        id="flag"
                        checked={selectedHelpdesk.includes(item.id)}
                        onChange={(e) =>
                          changeHelpDesk(e.target.value, item.id)
                        }
                      />
                      <Tooltip
                        title="If this comment needs more urgent attention, click here to send to the relevant helpdesk."
                        color="#fff"
                        className="respo-_tooltip"
                      >
                        <span className="light-black text-leftt">
                          Would you like to submit or flag issue to {item.title}{" "}
                          helpdesk?
                        </span>
                      </Tooltip>
                    </label>
                  )
                })}
            </div>
          </div>
        </div>
      </div>

      <div className="bottom text-centerr">
        <button
          className="mb-0 btn btn-_submit"
          disabled={disable}
          onClick={() => {
            send(input, selections)
          }}
        >
          Submit
        </button>
      </div>
      {/* <Stats step={3} {...props} /> */}
    </>
  )
}

const ThankYou = (props) => {
  return (
    <>
      <div className="multi-_step thanks-_step">
        <Link
          to={props.updateLink ? "/responder-home" : "/"}
          className="close-_step"
          title="Close"
        >
          <i className="iconx-x"></i>
        </Link>
        <div className="form-_actions min-h-431">
          <div className="row clearfix step-_header">
            <div className="col text-left">
              <img
                className="thanks-_img"
                src={Wrap}
                title="That's a wrap"
                alt="That's a wrap"
              ></img>
            </div>
          </div>
          <p className="text-centerr">
            Behind every response is an experience that matters
          </p>

          <div className="row justify-content-center text-centerr pb-5">
            <div className="col-12">
              <button
                className="btn btn-primary more-_q"
                onClick={() => {
                  props.refresh()
                  //props.goToStep(1);
                }}
              >
                Share another thought
              </button>
            </div>
            {props.client.enable_questions && (
              <div className="col-12">
                <Link
                  to="/answer-question"
                  className="mb-0 btn btn-default to-_home"
                >
                  Answer a question
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <Stats step={4} {...props} /> */}
    </>
  )
}

const Wizard = ({ setBgImage, openFullScreen, reduxClient }) => {
  const history = useHistory()
  const [data, setData] = useState([])
  const [ispositive, setIsPositive] = useState(false)
  const [questionLabel, setQuestionLabel] = useState("")
  const [questionOptions, setQuestionOptions] = useState([])
  const [otherLocations, setOtherLocations] = useState([])
  const [selectedLocationType, setSelectedLocationType] = useState("")
  const [selectedLocationId, setSelectedLocationId] = useState("")
  const [helpdesk, setHelpdesk] = useState([])
  const [user_, setUser_] = useState([])
  const [allLocations, setAllLocations] = useState([])
  const [feedbackQuestionId, setFeedbackQuestionId] = useState()
  const [state, updateState] = useState({
    transitions: {
      enterRight: `step-_animated step-_enterRight`,
      enterLeft: `step-_animated step-_enterLeft`,
      exitRight: `step-_animated step-_exitRight`,
      exitLeft: `step-_animated step-_exitLeft`,
      intro: `step-_animated step-_intro`,
    },
  })
  useEffect(() => {
    setBgImage("feedback-image")
    console.log("Image changed!!!")
    getFormData()
  }, [])

  function getFormData() {
    Promise.all([
      axios.get("/feedbacks/location/options"),
      axios.get("/tags/global"),
      axios.get("/helpdesk"),
    ])
      .then((value) => {
        console.log(value)
        setQuestionLabel(value[0].data.question_label)
        setAllLocations(value[0].data.locations)
        setFeedbackQuestionId(value[0].data.question_id)

        AddMain(
          value[0].data.options,
          value[0].data.locations,
          value[0].data.user
        )

        setData(value[1].data.result ? value[1].data.result : [])
        setHelpdesk(value[2].data.result)
        console.log(value[0].data.user)
        setUser_(value[0].data.user)
      })
      .catch((err) => console.log(err))
  }
  function AddMain(options, locations, user) {
    console.log(locations)
    let userLocation = locations.filter((i) => i.id === user.location_id)[0]
    console.log(
      options,
      userLocation,
      options.filter((i) => i.type === userLocation.code)[0]
    )

    let userDefaultlocationTitle = userLocation.code
      ? options.filter((i) => i.type === userLocation.code)[0].label
      : userLocation.label

    if (
      userLocation.code === "code_never_visit_an_office" ||
      userLocation.code === "code_office" ||
      userLocation.code === "code_other"
    ) {
      options = options.filter((i) => i.type !== "main_location")
    }
    // else if (userLocation.code) {
    //   options = options.filter((i) => i.type !== userLocation.code);
    // }
    console.log(options)
    options = options.filter((i) => i.type !== "code_never_visit_an_office")
    let newOptions = options.map((item) => {
      if (item.type === "main_location") {
        return {
          id: item.id,
          label: userDefaultlocationTitle,
          position: item.position,
        }
      } else {
        return item
      }
    })

    setQuestionOptions(newOptions)
    setOtherLocations(
      locations.filter((i) => i.label !== userDefaultlocationTitle)
    )
  }

  const onStepChange = (stats) => {
    console.log(stats)
  }
  function refresh() {
    window.location.href = "/share-thinking"
  }

  return (
    <>
      <div className="auth-main particles_js responder-form-center multi-_steps">
        <div className="auth_div responder-intro-card text-leftt">
          <div
            className={`card ${
              window.location.hash.substr(1) === " thanks-for-sharing"
                ? " thanks-for-sharing"
                : ""
            }`}
          >
            <div className="body">
              <StepWizard
                onStepChange={onStepChange}
                isHashEnabled
                transitions={state.transitions}
                nav={<Steps />}
                isLazyMount={true}
              >
                <PositiveNegative
                  updateLink={openFullScreen}
                  ispositive={(e) => {
                    setIsPositive(e)
                  }}
                />
                <SelectLocation
                  updateLink={openFullScreen}
                  selectLocationType={(e) => {
                    setSelectedLocationType(e)
                  }}
                  selectLocationId={(e) => {
                    setSelectedLocationId(e)
                  }}
                  questionLabel={questionLabel}
                  questionOptions={questionOptions}
                  otherLocations={otherLocations}
                />
                <AnswerQuestion
                  updateLink={openFullScreen}
                  data={data}
                  user={user_}
                  helpdesk={helpdesk}
                  alllocations={allLocations}
                  selectedLocationType={selectedLocationType}
                  selectedLocationId={selectedLocationId}
                  ispositive={ispositive}
                />
                <ThankYou
                  client={reduxClient}
                  hashKey={"thanks-for-sharing"}
                  updateLink={openFullScreen}
                  refresh={refresh}
                />
              </StepWizard>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const mapStateToProps = (state) => ({
  bgImage: state.settings.bgImage,
  openFullScreen: state.settings.openFullScreen,
  reduxClient: state.client,
})

const mapDispatchToProps = (dispatch) => ({
  setBgImage: (e) => dispatch(setBgImage(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Wizard)

const Stats = ({
  nextStep,
  previousStep,
  totalSteps,
  step,
  disable,
  updateLink,
}) => (
  <div className="bottom">
    {step > 1 ? (
      <button className="mb-0 float-l btn btn-default" onClick={previousStep}>
        Back
      </button>
    ) : (
      <Link
        to={updateLink ? "/responder-home" : "/"}
        className="mb-0 float-l btn btn-default"
      >
        Close
      </Link>
    )}
    {step < totalSteps ? (
      <button
        disabled={disable}
        className="mb-0 float-r btn btn-primary"
        onClick={nextStep}
      >
        Next
      </button>
    ) : (
      <button className="mb-0 float-r btn btn-primary" onClick={nextStep}>
        Submit
      </button>
    )}
  </div>
)

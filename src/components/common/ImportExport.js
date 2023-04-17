import React, { useEffect, useState, useRef, useLayoutEffect } from "react"
import { Drawer, notification, Table } from "antd"
import XLSX from "xlsx"
import axios from "../../../node_modules/axios/index"
import { getCampaingCurrentStatus, makeUnique } from "../../util/functions"
export default function ImportExport(props) {
  const [visible, setVisible] = useState(false)
  const [tableData, setTableData] = useState([])
  const [labelData, setlabelData] = useState([])
  const [selectedColumn, setSelectedColumn] = useState([])
  const [isFileName, setFileName] = useState("No file chosen...")
  const [mergeableColumn, setMergeableColumn] = useState([])
  const [additionalAttributes, setAddionalAttributes] = useState([])
  const ref = useRef()

  const onClose = () => {
    setVisible(false)
  }
  const prepareData = (data) => {
    handleInput(props.type, data)
  }
  useLayoutEffect(() => {
    console.log(props.type)
    selectColumn(props.type)
  }, [props.type])

  useEffect(() => {
    mergeableColumn?.length > 0 && setSelectedColumn(mergeableColumn)
  }, [mergeableColumn])

  const makeArray = (sheet) => {
    var result = []
    var row
    var rowNum
    var colNum
    var range = XLSX.utils.decode_range(sheet["!ref"])
    for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
      row = []
      for (colNum = range.s.c; colNum <= range.e.c; colNum++) {
        var nextCell = sheet[XLSX.utils.encode_cell({ r: rowNum, c: colNum })]
        if (typeof nextCell === "undefined") {
          row.push(void 0)
        } else row.push(nextCell.v)
      }
      result.push(row)
    }
    return result
  }
  const handleFile = (e) => {
    var files = e.target.files,
      f = files[0]
    if (f.size > 2 * 1024 * 1024) {
      notification.warning({ message: "Max file limit is 2mb!" })
    } else {
      var reader = new FileReader()
      reader.onload = (e) => {
        var workbook = XLSX.read(e.target.result)
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        prepareData(makeArray(sheet))
      }
      reader.readAsArrayBuffer(f)
    }
    setFileName(files[0].name)
  }
  const checkDuplication = (label, allData, type) => {
    return allData?.map((i) => i[type]).includes(label)
  }
  const handleInput = (type, data) => {
    const handleDepartmentCascade = (data) => {
      let labels = data[0]
      let flatDepartments = []
      data.forEach((i, index) => {
        Array.apply(null, Array(labels.length)).forEach((o, index2) => {
          index > 0 &&
            flatDepartments.push({
              level: index2,
              label: i[index2],
              parent_level: index2 - 1,
              parent_label: i[index2 - 1] ? i[index2 - 1] : null,
              parent_parent_label: i[index2 - 2] ? i[index2 - 2] : null,
              parent_parent_parent_label: i[index2 - 3] ? i[index2 - 3] : null,
              upper_path: i.slice(0, index2 + 1).join(","),
              upper_path_arr: i.slice(0, index2),
            })
        })
      })

      //remove null cells
      flatDepartments = flatDepartments.filter((i) => i?.label)
      flatDepartments = makeUnique(flatDepartments, "upper_path").sort(
        (a, b) => a.level - b.level
      )
      console.log("after position", flatDepartments)

      //give temporary id to each departments
      flatDepartments = flatDepartments.map((i, index) => {
        return {
          id: index + 1,
          ...i,
        }
      })
      flatDepartments = flatDepartments.map((i) => {
        return {
          ...i,
          parent_id: flatDepartments.filter(
            (o) =>
              o.label === i.parent_label &&
              JSON.stringify([...o.upper_path_arr, o.label]) ===
                JSON.stringify(i.upper_path_arr)
          )[0]?.id,
        }
      })

      console.log("labels:", labels)
      console.log("flat departments:", flatDepartments)
      setVisible(true)
      setlabelData(labels)
      setTableData(flatDepartments)
    }
    const handleDepartment = (data) => {
      console.log(data)
      setVisible(true)
      setTableData(
        data
          .map((i, index) => {
            return {
              id: isNaN(parseInt(i[0])) ? null : parseInt(i[[0]]),
              label: i[1],
              parent_label: i[2],
              parent_id: isNaN(parseInt(i[3])) ? null : parseInt(i[3]),
            }
          })
          .filter((i) => i)
      )
    }
    const handleLocation = (data) => {
      console.log(data)
      setVisible(true)
      setTableData(
        data
          .map((i, index) => {
            if (index > 0)
              return {
                id: parseInt(i[0]) || null,
                label: i[1] || null,
                parent_label: i[3] || null,
                parent_id: parseInt(i[4]) || null,
                post_code: i[2] || null,
                number_of_floor: i[5] || null,
                lat: parseFloat(i[6]) || null,
                long: parseFloat(i[7]) || null,
              }
          })
          .filter((i) => i)
      )
    }
    const handleLocationCascade = (data) => {
      console.log(data, props?.allData)
      setVisible(true)

      setTableData(
        data
          .map((i, index) => {
            if (index > 0) {
              if (checkDuplication(i[2], props?.allData, "name")) {
                notification.warning({
                  message: `Duplicate location: ${i[2]}, skipped`,
                })
              } else {
                return {
                  id: parseInt(i[0]) || null,
                  location_group: i[1] || null,
                  label: i[2] || null,
                  country: i[3] || null,
                  city: i[4] || null,
                  postcode: i[5] || null,
                  address: i[6] || null,
                  building_location: i[7] || null,
                  building_style: i[8] || null,
                  occupancy_status: i[9] || null,
                  occupancy_mix: i[10] || null,
                  date_organisation_moved_in: i[11] || null,
                  position: index,
                }
              }
            }
          })
          .filter((i) => i)
      )
    }
    const handleLocationCascadeSurvey = (data) => {
      console.log(data)
      const findLocationIdFromlocationGroupAndLabel = (
        locationGroup,
        label
      ) => {
        !props?.allData?.filter(
          (i) => i.label === label && i.location_group_name === locationGroup
        )[0]?.id &&
          notification.warning({
            message: `Cannot find location: ${label} and skipped`,
          })
        return (
          props?.allData?.filter(
            (i) => i.label === label && i.location_group_name === locationGroup
          )[0]?.id || null
        )
      }
      const checkDuplicationById = (id, allData) => {
        return allData.includes(id)
      }
      let preparedData = data
        .filter((i) => i[2] && i[2] !== "")
        .map((i, index) => {
          if (index > 0) {
            if (
              checkDuplicationById(
                findLocationIdFromlocationGroupAndLabel(i[1], i[2]),
                props.data
              )
            ) {
              notification.warning({
                message: `Duplicate location id: ${findLocationIdFromlocationGroupAndLabel(
                  i[1],
                  i[2]
                )}, skipped`,
              })
            } else if (
              findLocationIdFromlocationGroupAndLabel(i[1], i[2]) == null
            ) {
              notification.warning({
                message: `location cannot found: ${i[2]}, skipped`,
              })
            } else if (i[3] == null || i[3] === "") {
              notification.warning({
                message: `location ${i[2]}, doesn't have 'Survey workplace target population', skipped`,
              })
            } else if (i[4] == null || i[4] === "") {
              notification.warning({
                message: `location ${i[2]}, doesn't have 'Assessment type' attribute, skipped`,
              })
            } else if (i[5] == null || i[5] === "") {
              notification.warning({
                message: `location ${i[2]}, doesn't have 'All occupants invited to survey' attribute, skipped`,
              })
            } else {
              return {
                id: findLocationIdFromlocationGroupAndLabel(i[1], i[2]),
                location_group: i[1] || null,
                label: i[2] || null,
                "Survey workplace target population": i[3] || null,
                "Assessment type": i[4] || null,
                "All occupants invited to survey?": i[5] || null,
                "Number of workstations": i[6] || null,
                "Survey reason": i[7] || null,
                "Mandate to use the workplace?": i[8] || null,
                "Total net internal/usable area": i[9] || null,
                "Number of floors / levels": i[10] || null,
                position: index,
              }
            }
          }
        })
        .filter((i) => i)
        .sort((a, b) => a.position - b.position)
      let preparedAttributeAnswerData = []
      let attributes = props.customAttributes

      preparedData.forEach((row) => {
        for (var key in row) {
          if (row.hasOwnProperty(key)) {
            let selectedAttribute = attributes.filter(
              (i) => i.heading === key
            )[0]

            preparedAttributeAnswerData.push({
              location_id: row.id,
              question_id: selectedAttribute?.id,
              option_id:
                selectedAttribute?.type === "dropdown"
                  ? selectedAttribute?.options?.filter(
                      (o) => o.option_label === row[key]
                    )[0]?.option_id
                  : null,
              answer: row[key],
              required: selectedAttribute?.required,
              position: row.position,
            })
          }
        }
      })

      // const checkRequiredAttributes = (data, locations) => {
      //   let requiredQuestionIds = attributes.filter((i) => i.required).map((i) => i.id);
      //   let acceptedLocations = [];

      //   let UniqueLocationData = makeUnique(data, "location_id");
      //   UniqueLocationData.forEach((locationOptions) => {
      //     if (
      //       requiredQuestionIds?.isSubset(
      //         UniqueLocationData?.filter((i) => i.answer && i.location_id == locationOptions.location_id)?.map(
      //           (i) => i.question_id
      //         )
      //       )
      //     ) {
      //       console.log(locations.filter((i) => i.id == locationOptions?.location_id)[0]);
      //       acceptedLocations.push(locations.filter((i) => i.id == locationOptions?.location_id)[0]);
      //     } else {
      //       notification.warning({
      //         message: `location:${
      //           locations.filter((i) => i.id == locationOptions?.location_id)[0].label
      //         } does not have all required attributes. Skipping...`,
      //       });
      //     }
      //   });
      //   console.log(acceptedLocations);

      //   return acceptedLocations.filter((i) => i);
      // };

      preparedAttributeAnswerData = preparedAttributeAnswerData.filter(
        (i) => i.question_id && i.location_id && (i.option_id || i.answer)
      )

      console.log(
        props.customAttributes,
        preparedAttributeAnswerData,
        preparedData
      )
      setVisible(true)
      setTableData(preparedData)
      setAddionalAttributes(preparedAttributeAnswerData)
    }
    const handleTranslation = (data) => {
      setVisible(true)
      //set mergeable column

      setMergeableColumn(
        data[0].map((i, index) => {
          console.log(i)
          return {
            title: i,
            dataIndex: [
              props.languages.filter((l) => l.label === i)[0]?.id || "key",
            ],
          }
        })
      )

      let buffer = []
      data.forEach((i, index) => {
        let arr = {}
        if (index > 0) {
          data[0].forEach((c, columnIndex) => {
            arr = {
              ...arr,
              [props.languages.filter((l) => l.label === c)[0]?.id || "key"]:
                i[columnIndex],
            }
          })
          buffer.push(arr)
        }
      })
      console.log(buffer)

      setTableData(buffer)
    }
    const handleSurveySpecificTranslations = (data) => {
      setVisible(true)
      //set mergeable column

      setMergeableColumn(
        data[0].map((i, index) => {
          console.log(i)
          return {
            title: i,
            dataIndex: [
              props.allLanguages.filter((l) => l.label === i)[0]?.id || i,
            ],
          }
        })
      )

      let buffer = []
      data.forEach((i, index) => {
        let arr = {}
        if (index > 0) {
          data[0].forEach((c, columnIndex) => {
            arr = {
              ...arr,
              [props.allLanguages.filter((l) => l.label === c)[0]?.id || c]:
                i[columnIndex],
            }
          })
          buffer.push(arr)
        }
      })
      console.log(buffer)

      setTableData(buffer)
    }
    const handleSurveyAcceptedEmails = (data) => {
      setTableData(
        [...new Set(data.map((i) => i[0]))]
          .map((i, index) => {
            if (index > 0)
              return {
                email: i,
              }
          })
          .filter((i) => i)
      )
    }
    const handleFloors = (data) => {
      const checkDuplication = (allData, floor) => {
        console.log(
          allData,
          floor,
          allData.filter((i) => i.label === floor).length > 1
        )
        return allData.filter((i) => i.label === floor).length > 0
      }

      const checkDuplicationOnFile = (data, floor) => {
        console.log(
          data,
          floor,
          data.filter((i) => i && i[0] === floor).length > 1
        )

        return data.filter((i) => i && i[0] === floor).length > 1
      }

      let d_ = [...new Set(data.map((i) => i[0]))]
      setTableData(
        d_
          .filter((i) => i && i?.length > 0)
          .map((i, index) => {
            if (
              index > 0 &&
              !checkDuplication(props.allData, i) &&
              !checkDuplicationOnFile(d_, i)
            ) {
              console.log("floors", i)

              return {
                floor: i,
                position: index,
              }
            } else {
              if (checkDuplication(props.allData, i))
                notification.warning({
                  message: `Duplicatad floor ${i} skipped...`,
                })
              if (checkDuplicationOnFile(d_, i))
                notification.warning({
                  message: `Duplicatad floor in excel ${i} skipped...`,
                })
            }
          })
          .filter((i) => i?.floor)
      )
    }
    const handleCascadeFloors = (data) => {
      console.log(data, props.allData)
      const getLocationIdFromLabel = (label) => {
        return props.allData.filter((i) => i.label === label)[0]?.id
      }
      const checkDuplication = (allData, location, label) => {
        return (
          allData.filter(
            (i) =>
              i.parent_id === getLocationIdFromLabel(location) &&
              i.label === label
          ).length > 0
        )
      }
      const checkDuplicationOnFile = (data, location, label) => {
        return (
          data.filter((i) => i[1] === location && i[2] === label).length > 1
        )
      }
      setTableData(
        data
          .map((i, index) => {
            if (index > 0) {
              if (
                getLocationIdFromLabel(i[1]) &&
                i[2]?.length > 0 &&
                !checkDuplication(props.allData, i[1], i[2]) &&
                !checkDuplicationOnFile(data, i[1], i[2])
              ) {
                return {
                  location_id: getLocationIdFromLabel(i[1]) || i[0],
                  location: i[1],
                  floor: i[2],
                  position: index,
                }
              } else {
                if (!getLocationIdFromLabel(i[1]))
                  notification.warning({
                    message: `Cannot found location:${i[1]} skipped...`,
                  })
                if (!i[2]?.length)
                  notification.warning({
                    message: `Cannot insert empty floor for location:${i[1]} skipped...`,
                  })
                if (checkDuplication(props.allData, i[1], i[2]))
                  notification.warning({
                    message: `Duplicatad floor ${i[2]} in location:${i[1]} skipped...`,
                  })
                if (checkDuplicationOnFile(data, i[1], i[2]))
                  notification.warning({
                    message: `Duplicatad floor ${i[2]} in location:${i[1]} skipped...`,
                  })
              }
            }
          })
          .filter((i) => i)
      )
    }
    switch (type) {
      case "department_cascade":
        handleDepartmentCascade(data)
        break
      case "department":
        handleDepartment(data)
        break
      case "location":
        handleLocation(data)
        break
      case "location_cascade":
        handleLocationCascade(data)
        break
      case "location_cascade_survey":
        handleLocationCascadeSurvey(data)
        break
      case "translation-departments":
        handleTranslation(data)
        break
      case "translation-locations":
        handleTranslation(data)
        break
      case "survey_accepted_emails":
        handleSurveyAcceptedEmails(data)
        break
      case "survey_specific_translations":
        handleSurveySpecificTranslations(data)
        break
      case "floors":
        handleFloors(data)
        break
      case "cascade_floors":
        handleCascadeFloors(data)
        break
      default:
        break
    }
  }
  const selectColumn = (type) => {
    switch (type) {
      case "department_cascade":
        setSelectedColumn(columnsDepartment)
        break
      case "department":
        setSelectedColumn(columnsDepartment)
        break
      case "location":
        setSelectedColumn(columnsLocation)
        break
      case "location_cascade":
        setSelectedColumn(columnsLocationCascade)
        break
      case "location_cascade_survey":
        setSelectedColumn(columnsLocationCascadeSurvey)
        break
      case "translation-department":
        setSelectedColumn(mergeableColumn)
        break
      case "translation-locations":
        setSelectedColumn(mergeableColumn)
        break
      case "survey_accepted_emails":
        setSelectedColumn([...columnsSurveyEmail])
        break
      case "survey_specific_translations":
        setSelectedColumn(mergeableColumn)
        break
      case "floors":
        setSelectedColumn(columnsFloor)
        break
      case "cascade_floors":
        setSelectedColumn(columnCascadeFloor)
        break
    }
  }
  const exportData = () => {
    console.log(props.data, props.type)
    /* make the worksheet */
    let arr = []
    switch (props.type) {
      case "department_cascade":
        arr =
          props.data.length > 0
            ? props.data.map((i) => {
                return {
                  id: isNaN(parseInt(i.id)) ? null : parseInt(i.id),
                  label: i.label,
                  parent_label: props.data.filter(
                    (item) => item.id === i.parent_id
                  )[0]?.label,
                  parent_id: isNaN(parseInt(i.parent_id))
                    ? null
                    : parseInt(i.parent_id),
                }
              })
            : [
                {
                  id: null,
                  label: null,
                  parent_label: null,
                  parent_id: null,
                },
              ]
        break
      case "department":
        arr =
          props.data.length > 0
            ? props.data.map((i) => {
                return {
                  id: isNaN(parseInt(i.id)) ? null : parseInt(i.id),
                  label: i.label,
                  parent_label: props.data.filter(
                    (item) => item.id === i.parent_id
                  )[0]?.label,
                  parent_id: isNaN(parseInt(i.parent_id))
                    ? null
                    : parseInt(i.parent_id),
                }
              })
            : [
                {
                  id: null,
                  label: null,
                  parent_label: null,
                  parent_id: null,
                },
              ]
        break
      case "location":
        arr =
          props.data.length > 0
            ? props.data.map((i) => {
                return {
                  id: isNaN(parseInt(i.id)) ? null : parseInt(i.id),
                  label: i.label,
                  post_code: i.post_code,
                  parent_label: props.data.filter(
                    (item) => item.id === i.parent_id
                  )[0]?.label,
                  parent_id: isNaN(parseInt(i.parent_id))
                    ? null
                    : parseInt(i.parent_id),
                  number_of_floor: i.number_of_floor,
                  latitude: parseFloat(i.lat) || null,
                  longitude: parseFloat(i.long) || null,
                }
              })
            : [
                {
                  id: null,
                  label: null,
                  post_code: null,
                  parent_label: null,
                  parent_id: null,
                  number_of_floor: null,
                  latitude: null,
                  longitude: null,
                },
              ]
        break
      case "location_cascade":
        arr =
          props.data.length > 0
            ? props.data.map((i) => {
                return {
                  id: isNaN(parseInt(i.id)) ? null : parseInt(i.id),
                  label: i.label,
                  post_code: i.post_code,
                  parent_label: props.data.filter(
                    (item) => item.id === i.parent_id
                  )[0]?.label,
                  parent_id: isNaN(parseInt(i.parent_id))
                    ? null
                    : parseInt(i.parent_id),
                  number_of_floor: i.number_of_floor,
                  latitude: parseFloat(i.lat) || null,
                  longitude: parseFloat(i.long) || null,
                }
              })
            : [
                {
                  id: null,
                  label: null,
                  post_code: null,
                  parent_label: null,
                  parent_id: null,
                  number_of_floor: null,
                  latitude: null,
                  longitude: null,
                },
              ]
        break
      case "location_cascade_survey":
        arr =
          props.data.length > 0
            ? props.data.map((i) => {
                return {
                  id: isNaN(parseInt(i.id)) ? null : parseInt(i.id),
                  label: i.label,
                  post_code: i.post_code,
                  parent_label: props.data.filter(
                    (item) => item.id === i.parent_id
                  )[0]?.label,
                  parent_id: isNaN(parseInt(i.parent_id))
                    ? null
                    : parseInt(i.parent_id),
                  number_of_floor: i.number_of_floor,
                  latitude: parseFloat(i.lat) || null,
                  longitude: parseFloat(i.long) || null,
                }
              })
            : [
                {
                  id: null,
                  label: null,
                  post_code: null,
                  parent_label: null,
                  parent_id: null,
                  number_of_floor: null,
                  latitude: null,
                  longitude: null,
                },
              ]
        break
      case "campaigns":
        arr =
          props.data.length > 0 &&
          props.data.map((i) => {
            return {
              ...i,
              status: getCampaingCurrentStatus(i),
            }
          })
        break
      case "translation-departments":
      case "translation-locations":
        console.log(props.data, props.languages)
        let buffer = []
        props.data.forEach((d) => {
          let smallBuffer = {}
          for (const item in d) {
            smallBuffer = {
              ...smallBuffer,
              [item !== "key"
                ? props?.languages?.filter((i) => i.id === item)[0]?.label
                : "key"]: d[item],
            }
          }
          buffer.push(smallBuffer)
        })

        console.log(buffer)
        arr = buffer
        break
      case "survey_accepted_emails":
        arr =
          props.data.length > 0
            ? props?.data?.map((i) => {
                return { email: i.email }
              })
            : [
                {
                  email: null,
                },
              ]
        break
      case "floors":
        arr =
          props.data.length > 0
            ? props?.data?.map((i) => {
                return { floor: i.floor }
              })
            : [
                {
                  floor: null,
                },
              ]
        break
      case "cascade_floors":
        let data = props.data?.length > 0 ? props.data : []
        data.length
          ? data.forEach((location) => {
              location.floor_labels.forEach((floor) => {
                arr.push({
                  location_id: location.id,
                  location: location.label,
                  floor: floor,
                })
              })
            })
          : (arr = [{ location_id: null, location: null, floor: null }])

        break
      default:
        arr = props.data
        break
    }

    var ws = XLSX.utils.json_to_sheet(arr)

    /* add to workbook */
    var wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "export")

    /* generate an XLSX file */
    XLSX.writeFile(wb, `${props.type}-export.xlsx`)
  }

  const columnsDepartment = [
    {
      title: "Unique id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Parent name",
      dataIndex: "parent_label",
      key: "parent_label",
    },
    {
      title: "Parent unique id",
      dataIndex: "parent_id",
      key: "parent_id",
    },
  ]
  const columnsLocation = [
    {
      title: "Unique id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Label",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Parent name",
      dataIndex: "parent_label",
      key: "parent_label",
    },
    {
      title: "Parent unique id",
      dataIndex: "parent_id",
      key: "parent_id",
    },
    {
      title: "Postcode",
      dataIndex: "post_code",
      key: "post_code",
    },
    {
      title: "Floor count",
      dataIndex: "number_of_floor",
      key: "number_of_floor",
    },
    {
      title: "Latitude",
      dataIndex: "lat",
      key: "lat",
    },
    {
      title: "Longitude",
      dataIndex: "long",
      key: "long",
    },
  ]
  const columnsLocationCascade = [
    {
      title: "Unique id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Location group",
      dataIndex: "location_group",
      key: "location_group",
    },
    {
      title: "Workplace Name",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Postcode",
      dataIndex: "postcode",
      key: "postcode",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Building location",
      dataIndex: "building_location",
      key: "building_location",
    },
    {
      title: "Building style",
      dataIndex: "building_style",
      key: "building_style",
    },
    {
      title: "Occupancy status",
      dataIndex: "occupancy_status",
      key: "occupancy_status",
    },
    {
      title: "Occupancy mix",
      dataIndex: "occupancy_mix",
      key: "occupancy_mix",
    },
    {
      title: "Date organisation moved in",
      dataIndex: "date_organisation_moved_in",
      key: "date_organisation_moved_in",
    },
  ]
  const columnsLocationCascadeSurvey = [
    {
      title: "Unique id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Location group",
      dataIndex: "location_group",
      key: "location_group",
    },
    {
      title: "Workplace Name",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "Survey workplace target population",
      dataIndex: "Survey workplace target population",
      key: "Survey workplace target population",
    },
    {
      title: "Assessment type",
      dataIndex: "Assessment type",
      key: "Assessment type",
    },
    {
      title: "All occupants invited to survey?",
      dataIndex: "All occupants invited to survey?",
      key: "All occupants invited to survey?",
    },
    {
      title: "Number of workstations",
      dataIndex: "Number of workstations",
      key: "Number of workstations",
    },
    {
      title: "Survey reason",
      dataIndex: "Survey reason",
      key: "Survey reason",
    },
    {
      title: "Mandate to use the workplace?",
      dataIndex: "Mandate to use the workplace?",
      key: "Mandate to use the workplace?",
    },
    {
      title: "Total net internal/usable area",
      dataIndex: "Total net internal/usable area",
      key: "Total net internal/usable area",
    },
    {
      title: "Number of floors / levels",
      dataIndex: "Number of floors / levels",
      key: "Number of floors / levels",
    },
  ]
  const columnsSurveyEmail = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ]
  const columnsFloor = [
    {
      title: "Floor name",
      dataIndex: "floor",
      key: "floor",
    },
  ]
  const columnCascadeFloor = [
    {
      title: "Unique id",
      dataIndex: "location_id",
      key: "location_id",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Floor",
      dataIndex: "floor",
      key: "floor",
    },
  ]
  const send = () => {
    let url = ""
    let data = []
    switch (props.type) {
      case "department":
        url = `/admin/clients/${props.clientId}/departments`
        data = tableData
        break
      case "department_cascade":
        url = `/admin/clients/${props.clientId}/departments/cascade`
        data = { data: tableData, labels: labelData }
        break
      case "location":
        url = `/admin/clients/${props.clientId}/locations/bulk`
        data = tableData
        break
      case "location_cascade":
        url = `/admin/clients/${props.clientId}/locations/cascade`
        data = tableData
        break
      case "location_cascade_survey":
        url = `/admin/clients/${props.clientId}/surveys/${props.surveyId}/cascadelocations`
        data = { locations: tableData, attributes: additionalAttributes }
        break
      case "translation-departments":
        url = `/admin/clients/${props.clientId}/departments/translations`
        data = tableData
        break
      case "translation-locations":
        url = `/admin/clients/${props.clientId}/locations/translations`
        data = tableData
        break
      case "survey_accepted_emails":
        url = `/admin/clients/${props.clientId}/surveys/${props.surveyId}/bulkemailimport`
        data = tableData
        break
      case "survey_specific_translations":
        url = `/admin/clients/${props.clientId}/surveys/${props.surveyId}/bulktranslationimport`
        data = tableData
        break
      case "floors":
        url = `/admin/clients/${props.clientId}/locations/${props.locationId}/floorupload`
        data = tableData
        break
      case "cascade_floors":
        url = `/admin/clients/${props.clientId}/locations/flooruploadbulk`
        data = tableData
        break
      default:
        break
    }
    console.log(url, tableData)
    axios
      .put(url, data)
      .then((res) => {
        setVisible(false)
        setTableData([])
        ref.current.value = ""
        props.refresh()
      })
      .catch((err) => {
        ref.current.value = ""
        notification.warning({
          message:
            "Cannot insert. Please check ids and labels in the excel file.",
        })
        console.log(err)
      })
  }

  return (
    <>
      <a
        onClick={() => {
          props.import ? setVisible(true) : exportData()
        }}
        className={`btn btn-default bigger-_btn ml-3 ${
          !props.hideLine && "after-_r-border"
        } ${props?.additionalClasses?.join(" ")}`}
      >
        {props.import ? "Import | Export" : "Export"}
      </a>

      <Drawer
        width="%100"
        title="Import | Export management"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <div className="container-fluid new-2022_class">
          <div className="row clearfix">
            <div className="col-xl-12 col-lg-12 col-md-12">
              <div className="row mb-4 page-__header">
                <div className="col-xl-12 col-lg-12 col-md-12 jus-start-iex">
                  <p>Only CSV, XLSX file types.</p>
                </div>

                <div className="col-xl-6 col-lg-6 col-md-6 jus-start-iex">
                  <div
                    className={`file-upload_section mr-4 ${
                      !props.hideLine && "after-_r-border"
                    }`}
                  >
                    <div className="file-select">
                      <div className="file-select-button" id="fileName">
                        Import File
                      </div>
                      <div className="file-select-name" id="noFile">
                        {isFileName}
                      </div>
                      <input
                        ref={ref}
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={handleFile}
                      />
                    </div>
                  </div>

                  <button className="btn btn-default ml-3" onClick={exportData}>
                    Export File
                  </button>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 jus-end">
                  <span className="text-table-info">
                    Total: {tableData.length} rows
                  </span>
                  {tableData.length > 0 && (
                    <>
                      <button
                        type="button"
                        className="btn btn-default ml-3"
                        data-dismiss="modal"
                        onClick={() => {
                          setTableData([])
                        }}
                        style={{ marginLeft: "15px" }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        data-dismiss="modal"
                        onClick={send}
                        className="btn btn-primary ml-3"
                      >
                        Save
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="card without-btn-table">
                <Table
                  pagination={false}
                  columns={selectedColumn}
                  dataSource={tableData}
                />
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  )
}

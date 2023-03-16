import React, { useState, useEffect } from "react"
import "react-toastify/dist/ReactToastify.css"
import { Table, Input, InputNumber, Popconfirm, Form, notification } from "antd"
import axios from "axios"
import { EditableCell } from "../../common/commonComponents/formItems"
import ImportExport from "../../common/ImportExport"

const TranslationTemplate = ({
  type,
  languages,
  selectedLanguageIds,
  selections,
}) => {
  let langsArr = localStorage.getItem("selectedLangsArr")
    ? JSON.parse(localStorage.getItem("selectedLangsArr"))
    : []
  let allLanguages_ = localStorage.getItem("allLanguages")
    ? JSON.parse(localStorage.getItem("allLanguages"))
    : []
  const [form] = Form.useForm()
  const [data, setData] = useState([])
  const [editingKey, setEditingKey] = useState("")
  const [selectedLangs, setSelectedLangs] = useState(langsArr)
  const [allLanguages, setAllLanguages] = useState(allLanguages_)
  const [column, setColumn] = useState([])
  const [clientData, setClientData] = useState([])
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id")

  const getTranslations = () => {
    axios
      .get(`/admin/clients/${clientId}/${type}/translations`)
      .then((res) => {
        console.log(res.data, selections)
        if (res.data.result.length === 0) {
          notification.warning({ message: "No data found!" })
        }
        handleResultData(
          res.data.result.filter(
            (i) =>
              selectedLanguageIds?.includes(i.language_id) &&
              selections.includes(i.id)
          )
        )
        handleColumns(
          res.data.result.filter(
            (i) =>
              selectedLanguageIds?.includes(i.language_id) &&
              selections?.includes(i.id)
          )
        )
        setClientData(
          res.data.result.filter(
            (i) =>
              selectedLanguageIds?.includes(i.language_id) &&
              selections?.includes(i.id)
          )
        )
      })
      .catch((err) => {
        console.log(err)
        notification.warning({ message: "No client found!" })
      })
  }

  useEffect(() => {
    console.log("triggered", languages)
    languages && setAllLanguages(languages)
  }, [languages])
  useEffect(() => {
    selectedLanguageIds && setSelectedLangs(selectedLanguageIds)
  }, [selectedLanguageIds])

  const refresh = () => {
    handleColumns(clientData)
  }
  useEffect(() => {
    getTranslations()
    refresh()
  }, [type, selectedLangs])
  useEffect(() => {
    refresh()
  }, [selectedLangs, allLanguages, editingKey])

  const handleResultData = (e) => {
    let arr = e.map((item) => {
      let l = allLanguages.filter((i) => i.id === item.language_id)
      return {
        key: String(item.id),
        [l[0].id]: item.label,
      }
    })

    let keysBuffer = []
    arr.map((item) => {
      !keysBuffer.includes(item.key) && keysBuffer.push(item.key)
    })

    let d = keysBuffer.map((k) => {
      let merge = arr.filter((i) => i.key === k)
      let buffer = {}
      if (merge.length > 1) {
        merge.map((t) => {
          buffer = { ...buffer, ...t }
        })
      } else {
        merge.map((t) => {
          buffer = { ...t }
        })
      }

      return buffer
    })

    setData(d)
  }
  const handleColumns = (e) => {
    //get different languages from db
    let buffer = []
    e.map((item) => {
      !buffer.includes(item.language_id) && buffer.push(item.language_id)
    })

    //get selected langs
    selectedLangs.map((item) => {
      !buffer.includes(parseInt(item)) && buffer.push(parseInt(item))
    })

    let langBuffer = []

    buffer.forEach((i) => {
      langBuffer.push(allLanguages.filter((item) => i === item.id)[0])
    })

    let langColumns = langBuffer.map((item) => {
      return {
        title: item.label,
        dataIndex: item.id,
        editable: true,
      }
    })

    let column_ = [
      {
        title: "Action",
        dataIndex: "operation",
        render: (_, record) => {
          const editable = isEditing(record)

          return editable ? (
            <>
              <a
                className="cursorp"
                onClick={() => save(record.key)}
                style={{
                  marginRight: 7,
                }}
              >
                Save
              </a>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a className="cursorp">Cancel</a>
              </Popconfirm>
            </>
          ) : (
            <a
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              className="btn btn-sm btn-liste cursorp"
            >
              <i className="iconx-pencil"></i>
            </a>
          )
        },
      },
      ...langColumns,
    ]

    setColumn(column_)
  }

  const isEditing = (record) => record.key === editingKey

  const edit = (record) => {
    console.log(record)
    form.setFieldsValue({
      ...record,
    })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey("")
  }

  const save = async (key) => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex((item) => key === item.key)

      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, { ...item, ...row })
        setData(newData)
        setEditingKey("")
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey("")
      }

      let changedData = newData.filter((item) => item.key === editingKey)[0]
      console.log(changedData)
      updateTranslation(changedData)
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo)
    }
  }
  const updateTranslation = (e) => {
    let buffer = []
    for (const item in e) {
      console.log(`${item}: ${e[item]}`)

      item !== "key" &&
        buffer.push({
          lang_id: item,
          label: e[item],
        })
    }

    axios
      .put(`/admin/clients/${clientId}/${type}/${e.key}/translations`, buffer)
      .then((res) => {
        notification.success({ message: "Translations Updated!" })
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const mergedColumns = column.map((col) => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  return (
    <Form form={form} component={false}>
      <ImportExport
        import={true}
        export={true}
        type={`translation-${type}`}
        refresh={getTranslations}
        clientId={clientId}
        data={data}
        languages={allLanguages}
      />
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  )
}

export default TranslationTemplate

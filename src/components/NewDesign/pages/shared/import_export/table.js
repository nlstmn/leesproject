import React from "react"
import { Space, Table, Button, Input, Switch } from "antd"

const ImportExportTable = () => {
  const columns = [
    {
      title: "##",
      dataIndex: "key",
      key: "key",
      width: "100px",
    },
    {
      title: "Custom column name",
      dataIndex: "custom1",
      key: "custom1",
    },
    {
      title: "Custom column name",
      dataIndex: "custom2",
      key: "custom2",
    },
    {
      title: "Custom column name",
      dataIndex: "custom3",
      key: "custom3",
    },
    {
      title: "Custom column name",
      dataIndex: "custom4",
      key: "custom4",
    },
    {
      title: "Custom column name",
      dataIndex: "custom5",
      key: "custom5",
    },
    {
      title: "Custom column name",
      dataIndex: "custom6",
      key: "custom6",
    },
    {
      title: "Custom column name",
      dataIndex: "custom7",
      key: "custom7",
    },
    {
      title: "Custom column name",
      dataIndex: "custom8",
      key: "custom8",
    },
    {
      title: "Custom column name",
      dataIndex: "custom9",
      key: "custom9",
    },
    {
      title: "Custom column name",
      dataIndex: "custom10",
      key: "custom10",
    },
  ]

  const data = [
    {
      key: "AB001",
      custom1: "Custom Name…",
      custom2: "…",
      custom3: "…",
      custom4: "…",
      custom5: "…",
      custom6: "…",
      custom7: "…",
      custom8: "…",
      custom9: "…",
      custom10: "…",
    },
    {
      key: "AB002",
      custom1: "Custom Name…",
      custom2: "…",
      custom3: "…",
      custom4: "…",
      custom5: "…",
      custom6: "…",
      custom7: "…",
      custom8: "…",
      custom9: "…",
      custom10: "…",
    },
    {
      key: "AB002",
      custom1: "Custom Name…",
      custom2: "…",
      custom3: "…",
      custom4: "…",
      custom5: "…",
      custom6: "…",
      custom7: "…",
      custom8: "…",
      custom9: "…",
      custom10: "…",
    },
    {
      key: "AB003",
      custom1: "Custom Name…",
      custom2: "…",
      custom3: "…",
      custom4: "…",
      custom5: "…",
      custom6: "…",
      custom7: "…",
      custom8: "…",
      custom9: "…",
      custom10: "…",
    },
    {
      key: "AB004",
      custom1: "Custom Name…",
      custom2: "…",
      custom3: "…",
      custom4: "…",
      custom5: "…",
      custom6: "…",
      custom7: "…",
      custom8: "…",
      custom9: "…",
      custom10: "…",
    },
    {
      key: "AB005",
      custom1: "Custom Name…",
      custom2: "…",
      custom3: "…",
      custom4: "…",
      custom5: "…",
      custom6: "…",
      custom7: "…",
      custom8: "…",
      custom9: "…",
      custom10: "…",
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  )
}

export default ImportExportTable

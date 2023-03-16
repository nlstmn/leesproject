import React from "react"
import { Modal, Table } from "antd"

const TranslationsModal = ({ translationsModal, setTranslationsModal }) => {
  const columns = [
    {
      title: "Original",
      dataIndex: "original",
      key: "original",
      width: "300px",
    },
    {
      title: "Translations",
      key: "translations",
      width: "130px",
      render: (_, record) => {
        return (
          <span style={{ textAlign: "left" }}>
            Bulgarian: Test b, <a href="#!">+3 more</a>
          </span>
        )
      },
    },
    {
      title: "Action",
      key: "action",
      width: "130px",
      fixed: "right",
    },
  ]

  const data = [
    {
      key: "AB001",
      original: "Location Name…",
    },
    {
      key: "AB002",
      original: "Location Name…",
    },
    {
      key: "AB003",
      original: "Location Name…",
    },
    {
      key: "AB004",
      original: "Location Name…",
    },
    {
      key: "AB005",
      original: "Location Name…",
    },
  ]

  return (
    <>
      {translationsModal && (
        <Modal
          onClick={() => setTranslationsModal(false)}
          className="n_modal_bg"
        ></Modal>
      )}
      <div className={`n_modal ${translationsModal ? " show" : ""} `}>
        <div className="n_modal_body">
          <div className="">
            <h3>Available Clients</h3>
            <ul>
              <li>English: Translation</li>
              <li>French: Translation</li>
              <li>Dutch: Translation</li>
              <Table
                columns={columns}
                style={{ backgroundColor: "transparent !important" }}
                data={data}
              />
            </ul>
          </div>
          <div className="n_modal_bottom_btns">
            <button
              onClick={() => setTranslationsModal(false)}
              className="btn-dash outline float-left"
            >
              Cancel
            </button>
            <button
              onClick={() => setTranslationsModal(false)}
              className="btn-dash dark float-right"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default TranslationsModal

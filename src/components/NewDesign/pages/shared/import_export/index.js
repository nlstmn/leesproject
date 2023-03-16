import { Button, Drawer, DatePicker, Space } from "antd"
import React, { useState } from "react"
import ImportExportTable from "./table"

const DrawerImportExport = ({
  isImportExportDrawer,
  setImportExportDrawer,
  title,
}) => {
  return (
    <>
      <Drawer
        className="filter_drawer small xll notify right_filter"
        title=""
        placement={"right"}
        onClose={() => setImportExportDrawer(false)}
        visible={isImportExportDrawer}
        extra={
          <Space>
            <Button onClick={() => setImportExportDrawer(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setImportExportDrawer(false)}>
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setImportExportDrawer(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>

          <div className="row">
            <div className="col-lg-12">
              <div className="fixed_infos mb-2">
                <span className="card_desc info">
                  <strong>
                    <span className="iconx-info-with-circle"></span> Only CSV,
                    XLSX file types
                  </strong>
                  <span className="text-muted">Total: 11 rows</span>
                </span>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="file__up">
                <div className="file-upload_section">
                  <div className="file-select">
                    <div className="file-select-button" id="fileName">
                      Import file
                    </div>
                    <div className="file-select-name" id="noFile">
                      Filename.xlsx
                    </div>
                    <input
                      type="file"
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    />
                  </div>
                </div>

                <button className="btn-dash drop has-icn">
                  Download sample file
                  <span className="iconx-paperclip icn xl"></span>
                </button>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="n__form_divider">
                <div className="n__divider"></div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="n_table respo">
                <ImportExportTable />
              </div>
            </div>
          </div>
        </div>

        <div className="bottom_side">
          <button
            onClick={() => setImportExportDrawer(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => setImportExportDrawer(false)}
            className="btn-dash dark float-right tt"
          >
            Apply
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerImportExport

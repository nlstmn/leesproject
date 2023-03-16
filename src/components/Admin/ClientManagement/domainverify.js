import React, { useState, useEffect } from "react"
import {
  notification,
  Input,
  Table,
  Divider,
  Modal,
  Tooltip,
  Button,
} from "antd"
import {
  CheckOutlined,
  PlusOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"
import API from "@aws-amplify/api"
import TableLoader from "../../common/TableLoader"

import Tabs from "./Tabs"

function DomainVerify(props) {
  const [domains, setDomains] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetched, setFetched] = useState(new Date())
  const [formData, setFormData] = useState({})
  const [visible, setVisible] = useState(false)

  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id")

  const tableLoading = {
    spinning: loading,
    indicator: <TableLoader />,
  }

  useEffect(() => {
    API.get("CoreAPI", `/admin/clients/${clientId}/domains`)
      .then((res) => {
        console.log("DOMAINS", res.result)
        setDomains(res.result)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        notification.error({
          message: "Unable to fetch idenity provider details",
        })
      })
  }, [fetched])

  const onChange = (event) => {
    const { name, value } = event.target
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }))
  }

  const promptDelete = (id) => {
    setFormData((pre) => ({
      ...pre,
      deleteId: id,
    }))
    setVisible(true)
  }

  const refresh = () => {
    setFetched(new Date())
    setLoading(true)
  }

  const confirmDelete = () => {
    setVisible(false)
    API.del(
      "CoreAPI",
      `/admin/clients/${clientId}/domains/${formData.deleteId}`
    )
      .then((res) => {
        console.log("DELETE /client/identityprovider", res.result)
        notification.success({ message: "Successfully removed domain" })
        setFormData((pre) => ({
          ...pre,
          delete: null,
        }))
        setFetched(new Date())
        setLoading(true)
      })
      .catch((err) => {
        console.error(err)
        notification.error({ message: "Unable to delete domain" })
      })
  }

  const cancelDelete = () => {
    setVisible(false)
    setFormData((pre) => ({
      ...pre,
      delete: null,
    }))
  }

  const saveDomain = () => {
    API.post("CoreAPI", `/admin/clients/${clientId}/domains`, {
      body: {
        name: formData.domain,
      },
    })
      .then((res) => {
        console.log(`post: /admin/clients/${clientId}/domains`, res.result)
        notification.success({ message: "Successfully added domain" })
        setFormData((pre) => ({
          ...pre,
          domain: "",
        }))
        setFetched(new Date())
        setLoading(true)
      })
      .catch((err) => {
        console.error(err)
        notification.error({ message: "Unable to add domain" })
      })
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Verified",
      dataIndex: "verified",
      render: (verified) =>
        verified ? <CheckOutlined /> : <ClockCircleOutlined />,
    },
    {
      title: "Token",
      dataIndex: "token",
    },
    {
      title: "Actions",
      width: 100,
      fixed: "right",
      render: (domain) => (
        <>
          <Tooltip title="Delete">
            <button
              onClick={() => promptDelete(domain.id)}
              className="btn btn-sm btn-liste cursorp"
            >
              <span className="iconx-trash"></span>
            </button>
          </Tooltip>
        </>
      ),
    },
  ]

  return (
    <>
      <Modal
        title={`Are you sure?`}
        className="more-filters-modal advanced-_filter"
        centered
        width={400}
        visible={visible}
        onOk={confirmDelete}
        onCancel={cancelDelete}
        footer={[
          // CANCEL BUTONUNA BASILINCA TÜM SEÇİLENLER SIFIRLANACAK - RESET // SAĞ ÜSTTEKİ BUTON KAPATMA İŞLEVİNİ GÖRECEK ZATEN
          <button
            onClick={cancelDelete}
            type="button"
            className="btn btn-sm btn-default"
          >
            <span>Cancel</span>
          </button>,
          <button
            onClick={confirmDelete}
            type="button"
            className="btn btn-sm btn-primary"
          >
            Yes
          </button>,
        ]}
      >
        <p className="light-black">{`Are you sure you want to remove ${
          domains.find((x) => x.id === formData.deleteId)?.name
        }?`}</p>
      </Modal>

      <div className="container-fluid clients-page new-2022_class">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-12 col-sm-12">
              <h1>Admin management</h1>
              <Tabs></Tabs>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="row mb-4 page-__header">
              <div className="col-xl-6 col-lg-6 col-md-6">
                <h2 className="card-title mt-4">Domains</h2>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 jus-end">
                <button
                  onClick={refresh}
                  title="Refresh"
                  className="btn btn-primary icon-_btn"
                >
                  <i className="iconx-refresh" />
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="card">
              <Table
                columns={columns}
                rowKey={(x) => x.id}
                loading={tableLoading}
                dataSource={domains}
              />
              <Divider orientation="left" />
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="row mb-4 page-__header">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <h2 className="card-title">Emails</h2>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 jus-end">
            <Input
              type="text"
              name="domain"
              addonAfter={<PlusOutlined onClick={saveDomain} />}
              value={formData.domain}
              onChange={onChange}
              placeholder="Email domain"
            />
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="card without-btn-table">
              <p className="mt-3 mb-0">
                Please add the token in a TXT record to your domain under the
                name _leesman
              </p>
              <p>For example:</p>
              <Table
                columns={[
                  {
                    title: "Type",
                    dataIndex: "type",
                  },
                  {
                    title: "Domain Name",
                    dataIndex: "domain",
                  },
                  {
                    title: "Record",
                    dataIndex: "record",
                  },
                ]}
                rowKey={(x) => x.id}
                loading={tableLoading}
                dataSource={[
                  {
                    type: "TXT",
                    domain: "_leesman.leesmanindex.com",
                    record: "a55a09bb-fdb0-4542-bc34-3a59a855844f",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DomainVerify

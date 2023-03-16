import React, { useState, useEffect } from "react"
import { notification } from "antd"
import { Input, List, Modal } from "antd"
import API from "@aws-amplify/api"
import Tabs from "./Tabs"
function IdentityProvider(props) {
  const [providerData, setProviderData] = useState()
  const [domains, setDomains] = useState()
  const [formData, setFormData] = useState({})
  const [visible, setVisible] = useState(false)

  const { history } = props
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id")

  useEffect(() => {
    API.get("CoreAPI", `/admin/clients/${clientId}/identityprovider`)
      .then((res) => {
        console.log("IDENTITY PROVIDER", res.result)
        setProviderData(res.result)
      })
      .catch((err) => {
        console.error(err)
        notification.error({
          message: "Unable to fetch idenity provider details",
        })
      })
    API.get("CoreAPI", `/admin/clients/${clientId}/domains`)
      .then((res) => {
        console.log("DOMAINS", res.result)
        setDomains(res.result)
      })
      .catch((err) => {
        console.error(err)
        notification.error({ message: "Unable to fetch domains" })
      })
  }, [])

  const onChange = (event) => {
    const { name, value } = event.target
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }))
  }

  const promptDelete = () => {
    setVisible(true)
  }

  const confirmDelete = () => {
    setVisible(false)
    API.del("CoreAPI", `/admin/clients/${clientId}/identityprovider`)
      .then((res) => {
        console.log("DELETE /client/identityprovider", res.result)
        notification.success({
          message: "Successfully deleted identity provider",
        })
        history.go(0)
      })
      .catch((err) => {
        console.error(err)
        notification.error({ message: "Unable to delete identity provider" })
      })
  }

  const cancelDelete = () => {
    setVisible(false)
  }

  const save = () => {
    if (domains.length === 0) {
      notification.warning({
        message: "Please verify domains before setting up an identity provider",
      })
      return
    }
    if (!!providerData?.ProviderDetails?.MetadataURL) {
      const body = {
        identifiers: domains.map((x) => x.name),
      }
      API.put("CoreAPI", `/admin/clients/${clientId}/identityprovider`, {
        body,
      })
        .then((res) => {
          console.log("PUT /client/identityprovider", res.result)
          notification.success({
            message: "Successfully updated identity provider",
          })
          history.go(0)
        })
        .catch((err) => {
          console.error(err)
          notification.error({ message: "Unable to update identity provider" })
        })
    } else {
      if (!formData.metadataurl) {
        notification.warning({ message: "Please enter the metadata URL" })
        return
      }
      const body = {
        identifiers: domains.map((x) => x.name),
        metadata_url: formData.metadataurl,
      }
      API.post("CoreAPI", `/admin/clients/${clientId}/identityprovider`, {
        body,
      })
        .then((res) => {
          console.log("POST /client/identityprovider", res.result)
          notification.success({
            message: "Successfully added identity provider",
          })
          history.go(0)
        })
        .catch((err) => {
          console.error(err)
          notification.error({ message: "Unable to add identity provider" })
        })
    }
  }

  return (
    <>
      <Modal
        title="Are you sure?"
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
        <p className="light-black">
          Are you sure you want to remove the provider?
        </p>
      </Modal>

      <div className="container-fluid clients-page saml-_content new-2022_class">
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
                <h2 className="card-title mt-4">SSO</h2>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-12 mt--22">
            <div className="card">
              <div className="body body-_sso">
                <div className="row clearfix">
                  <div className="col-lg-12">
                    <h2 className="card-title">SAML</h2>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <p>
                      <strong className="light-black">Entity Id: </strong>
                      urn:amazon:cognito:sp:
                      {process.env.REACT_APP_COGNITO_USER_POOL_ID}
                      <br />
                      <strong className="light-black">
                        Reply URL (Assertion Consumer Service URL):{" "}
                      </strong>
                      https://
                      {process.env.REACT_APP_AUTH_DOMAIN}
                      /saml2/idpresponse
                    </p>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <Input
                        type="text"
                        name="metadataurl"
                        value={
                          providerData?.ProviderDetails?.MetadataURL ||
                          formData.metadataurl
                        }
                        onChange={onChange}
                        className="form-control meta--input"
                        placeholder="Metadata URL"
                        disabled={!!providerData?.ProviderDetails?.MetadataURL}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <List
                      className="form-control"
                      size="small"
                      dataSource={domains}
                      renderItem={(item) => (
                        <List.Item className="form-control">
                          {item.name}
                        </List.Item>
                      )}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 bottom-_btns">
                    <button
                      onClick={promptDelete}
                      className="btn btn-sm btn-default mr-1 float-l"
                    >
                      Delete
                    </button>{" "}
                    &nbsp;&nbsp;
                    <button
                      onClick={save}
                      className="btn btn-sm btn-primary mr-1 float-r"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default IdentityProvider

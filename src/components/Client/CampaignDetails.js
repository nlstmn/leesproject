import React, { useEffect, useState, useContext } from "react"
import { Drawer, Divider, Col, Row, Skeleton } from "antd"

import { AuthContext } from "../../context/auth"
import moment from "moment"
import { useDispatch, useSelector } from "react-redux"
import { campaignDetailsAction } from "../../actions/clientActions"

export default function CampaignDetails({ visible, data, setIsVisible }) {
  const dispatch = useDispatch()
  const { error } = useSelector((store) => store.campaignDetailsReducer)

  const [campaignData, setCampaignData] = useState([])
  const [loading, setLoading] = useState(true)
  const { role } = useContext(AuthContext)
  const search = window.location.search
  const params = new URLSearchParams(search)
  const clientId = params.get("client_id") ? params.get("client_id") : 0

  useEffect(() => {
    console.log(data)
    setIsVisible(true)
    data.id && getData(data.id)
    setLoading(true)
  }, [data])
  useEffect(() => {
    console.log(visible)
    setIsVisible(visible)
  }, [visible])

  const getData = (id) => {
    console.log(clientId, id)
    let url =
      role === "Admin"
        ? `/campaigns/labels/${id}`
        : `/admin/clients/${clientId}/campaigns/${id}/labels`
    dispatch(campaignDetailsAction({ url }))

    data ? setCampaignData(data) : setIsVisible(false)
    setLoading(false)

    if (error) {
      setIsVisible(false)
    }
  }

  return (
    <Drawer
      width={640}
      placement="right"
      title="Campaign details"
      onClose={() => setIsVisible(false)}
      visible={visible}
    >
      {!loading ? (
        <>
          <Row style={{ marginBottom: 8 }}>
            <Col span={24} style={{ marginBottom: 20 }}>
              <h6 className="d-block">Campaign title:</h6>
              <span className="d-block">{data?.title}</span>
            </Col>
            <Col span={12}>
              <h6 className="d-block">Start date:</h6>
              <span className="d-block">
                {moment(data?.start_date?.splitDate()).format("DD-MM-YYYY")}
              </span>
            </Col>
            <Col span={12}>
              <h6 className="d-block">End date:</h6>
              <span className="d-block">
                {moment(data?.end_date).format("DD-MM-YYYY") === "Invalid date"
                  ? "Always on"
                  : moment(data?.end_date?.splitDate()).format("DD-MM-YYYY")}
              </span>
            </Col>
          </Row>
          <Divider />
          <Row style={{ marginBottom: 8 }}>
            <Col span={12}>
              <h6 className="d-block">Selected departments:</h6>
              <ul className="campaign-det-ul">
                {campaignData.departments &&
                  campaignData.departments.map((item) => <li>{item}</li>)}
              </ul>
            </Col>

            <Col span={12}>
              <h6 className="d-block">Selected locations:</h6>
              <ul className="campaign-det-ul">
                {campaignData.locations &&
                  campaignData.locations.map((item) => <li>{item}</li>)}
              </ul>
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={12}>
              <h6 className="d-block">Question headings:</h6>
              <ul className="campaign-det-ul">
                {campaignData.questions &&
                  campaignData.questions.map((item) => <li>{item}</li>)}
              </ul>
            </Col>
            <Col span={12}>
              <h6 className="d-block">Selected demographics options:</h6>
              <ul className="campaign-det-ul">
                {campaignData.demos &&
                  campaignData.demos.map((item) => <li>{item}</li>)}
              </ul>
            </Col>
          </Row>
        </>
      ) : (
        <Skeleton active />
      )}
    </Drawer>
  )
}

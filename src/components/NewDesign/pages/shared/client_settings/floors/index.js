import React, { useEffect, useState } from "react"
import { Table } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { getClientLocations } from "../../../../../../actions/adminActions"
const Floors = () => {
  // Redux Hooks
  const dispatch = useDispatch()
  const clientData = useSelector((store) => store.saveRowData.data)
  const clientLocations = useSelector((store) => store.getClientLocations)

  // React useState, useEffect
  const [pageNumber, setPageNumber] = useState(1)
  useEffect(() => {
    dispatch(getClientLocations(clientData["client_id"], "floors", pageNumber))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber])
  return (
    <div>
      {/* TODO: WILL IMPLEMENT AFTER CHANGES FROM BACKEND - DO NOT DELETE */}
      {/* <Table
        onChange={(pagination, _) => {
          setPageNumber(pagination.current)
        }}
        dataSource={clientLocations.data.locationGroups}
        pagination={{
          current: pageNumber,
          pageSize: 10,
          total: clientLocations.data.totalLocationCount,
          showSizeChanger: false,
        }}
        loading={clientLocations.loading}
      /> */}
    </div>
  )
}

export default Floors

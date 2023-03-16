import React from "react"
import { Popconfirm } from "antd"

const BtnGroup = ({ isPage, setPage, prev, next, submit, pageCount }) => {
  return (
    <>
      <div id="bottom-wizard">
        {isPage > 1 && (
          <button
            onClick={prev}
            type="button"
            name="backward"
            className="backward mr-2"
          >
            Prev
          </button>
        )}

        {isPage < pageCount ? (
          <button
            onClick={next}
            type="button"
            name="forward"
            className="forward mr-2"
          >
            Next
          </button>
        ) : (
          <Popconfirm
            title="Are you sure to complete this survey?"
            onConfirm={submit}
            okText="Yes"
            cancelText="No"
          >
            <button type="submit" name="process" className="submit">
              Submit
            </button>
          </Popconfirm>
        )}
      </div>
    </>
  )
}

export default BtnGroup

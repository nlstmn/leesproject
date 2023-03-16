import React from "react"
import { Table } from "antd"
import PagesTable from "./table"

const QuestionsSettings = ({ isDrawerQuestions, setDrawerQuestions }) => {
  return (
    <>
      <div className="n__card mt-0">
        <div className="n__body">
          <h3 className="">Questions</h3>
          <span className="card_desc">
            Total: <strong>11 questions</strong>
          </span>
          <div className="row">
            <div className="col-lg-12">
              <div className="n_table pr__10 first_not_center respo">
                <PagesTable
                  isDrawerQuestions={isDrawerQuestions}
                  setDrawerQuestions={setDrawerQuestions}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuestionsSettings

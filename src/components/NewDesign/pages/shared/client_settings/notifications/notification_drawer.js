import { Button, Drawer, DatePicker, Space } from "antd"
import React, { useState } from "react"

const DrawerNotification = ({
  isNotificationDrawer,
  setNotificationDrawer,
  title,
  setLocationGroupDrawer,
  setEmailsDrawer,
  setQuestionsDrawer,
}) => {
  return (
    <>
      <Drawer
        className="filter_drawer small xll notify right_filter"
        title=""
        placement={"right"}
        onClose={() => setNotificationDrawer(false)}
        visible={isNotificationDrawer}
        extra={
          <Space>
            <Button onClick={() => setNotificationDrawer(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setNotificationDrawer(false)}>
              OK
            </Button>
          </Space>
        }
      >
        <div className="n_drawer_body">
          <button
            onClick={() => setNotificationDrawer(false)}
            className="drawer__close"
          >
            <span className="cxv-close-l-icn"></span>
          </button>

          <h3 className="mb-4">{title}</h3>

          <div className="row">
            <div className="col-lg-3 col_b_r">
              <div className="row">
                <div className="col-lg-12">
                  <h5 className="d_sub_title">Details</h5>
                </div>
                <div className="col-lg-12">
                  <div className="n__form_divider">
                    <div className="n__divider"></div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Rule title</span>
                      <input
                        type="text"
                        name="name"
                        className="n__form_input"
                      />
                    </label>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Type</span>
                      <div className="n__form_select">
                        <select name="industry" id="industry">
                          <option value="Question">Question</option>
                          <option value="Campaign">Campaign</option>
                          <option value="Xp">Xp</option>
                          <option value="Feedback">Feedback</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Campaign</span>
                      <div className="n__form_select">
                        <select name="industry" id="industry">
                          <option value="Option 1...">Option 1...</option>
                          <option value="Option 2...">Option 2...</option>
                          <option value="Option 3...">Option 3...</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Respondent count</span>
                      <input
                        type="number"
                        name="name"
                        className="n__form_input"
                      />
                    </label>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Condition</span>
                      <div className="n__form_select">
                        <select name="industry" id="industry">
                          <option value="Higher">Higher than</option>
                          <option value="Lower">Lower than</option>
                        </select>
                        <div className="icn cxv-expand-more-l-icn"></div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="n__form_control">
                    <label className="n__form_label">
                      <span>Score threshold</span>
                      <input
                        type="number"
                        name="name"
                        className="n__form_input"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col_b_r">
              <div className="row">
                <div className="col-lg-12 title_with_button">
                  <h5 className="d_sub_title">Emails</h5>

                  <button
                    onClick={() => setEmailsDrawer(true)}
                    className="new_l"
                  >
                    <span className="iconx-plus1"></span> Add new email
                  </button>
                </div>
                <div className="col-lg-12">
                  <div className="n__form_divider">
                    <div className="n__divider"></div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="n__added_list">
                    <ul>
                      <li>
                        <button className="icon__btn" title="Delete">
                          <span className="cxv-delete-l-icn clients_table_drop"></span>
                        </button>{" "}
                        xeheb87263@lurenwu.com
                      </li>
                      <li>
                        <button className="icon__btn" title="Delete">
                          <span className="cxv-delete-l-icn clients_table_drop"></span>
                        </button>{" "}
                        ccjools@salonkarma.online
                      </li>
                      <li>
                        <button className="icon__btn" title="Delete">
                          <span className="cxv-delete-l-icn clients_table_drop"></span>
                        </button>{" "}
                        shulcsofya@longdz.site
                      </li>
                      <li>
                        <button className="icon__btn" title="Delete">
                          <span className="cxv-delete-l-icn clients_table_drop"></span>
                        </button>{" "}
                        ladooops@gmailvn.net
                      </li>
                      <li>
                        <button className="icon__btn" title="Delete">
                          <span className="cxv-delete-l-icn clients_table_drop"></span>
                        </button>{" "}
                        vikapushkina@bedul.net
                      </li>
                      <li>
                        <button className="icon__btn" title="Delete">
                          <span className="cxv-delete-l-icn clients_table_drop"></span>
                        </button>{" "}
                        terksenya@typery.com
                      </li>
                      <li>
                        <button className="icon__btn" title="Delete">
                          <span className="cxv-delete-l-icn clients_table_drop"></span>
                        </button>{" "}
                        mikebrick@3xpl0it.vip
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col_b_r">
              <div className="row">
                <div className="col-lg-12 title_with_button">
                  <h5 className="d_sub_title">Locations</h5>

                  <button
                    onClick={() => setLocationGroupDrawer(true)}
                    className="new_l"
                  >
                    <span className="iconx-plus1"></span> Add new location
                  </button>
                </div>
                <div className="col-lg-12">
                  <div className="n__form_divider">
                    <div className="n__divider"></div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="n__added_list">
                    <ul>
                      <li>
                        <button className="icon__btn" title="Delete">
                          <span className="cxv-delete-l-icn clients_table_drop"></span>
                        </button>{" "}
                        Location 0-0
                      </li>
                      <li>
                        <button className="icon__btn" title="Delete">
                          <span className="cxv-delete-l-icn clients_table_drop"></span>
                        </button>{" "}
                        Location 0-1
                      </li>
                      <li>
                        <button className="icon__btn" title="Delete">
                          <span className="cxv-delete-l-icn clients_table_drop"></span>
                        </button>{" "}
                        Location 0-2
                      </li>
                      <li>
                        <button className="icon__btn" title="Delete">
                          <span className="cxv-delete-l-icn clients_table_drop"></span>
                        </button>{" "}
                        Location 0-3
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col_b_r">
              <div className="row">
                <div className="col-lg-12 title_with_button">
                  <h5 className="d_sub_title">Questions</h5>

                  <button
                    onClick={() => setQuestionsDrawer(true)}
                    className="new_l"
                  >
                    <span className="iconx-plus1"></span> Add new question
                  </button>
                </div>
                <div className="col-lg-12">
                  <div className="n__form_divider">
                    <div className="n__divider"></div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="n__added_list">
                    <ul>
                      <li>
                        <button className="icon__btn" title="Delete">
                          <span className="cxv-delete-l-icn clients_table_drop"></span>
                        </button>{" "}
                        Planned meetings
                      </li>
                      <li>
                        <button className="icon__btn" title="Delete">
                          <span className="cxv-delete-l-icn clients_table_drop"></span>
                        </button>{" "}
                        Learning from others
                      </li>
                      <li>
                        <button className="icon__btn" title="Delete">
                          <span className="cxv-delete-l-icn clients_table_drop"></span>
                        </button>{" "}
                        Individual focused work at a desk
                      </li>
                      <li>
                        <button className="icon__btn" title="Delete">
                          <span className="cxv-delete-l-icn clients_table_drop"></span>
                        </button>{" "}
                        Thinking/creative thinking
                      </li>
                      <li>
                        <button className="icon__btn" title="Delete">
                          <span className="cxv-delete-l-icn clients_table_drop"></span>
                        </button>{" "}
                        Relaxing/taking a break
                      </li>
                      <li>
                        <button className="icon__btn" title="Delete">
                          <span className="cxv-delete-l-icn clients_table_drop"></span>
                        </button>{" "}
                        Desk
                      </li>
                      <li>
                        <button className="icon__btn" title="Delete">
                          <span className="cxv-delete-l-icn clients_table_drop"></span>
                        </button>{" "}
                        Small meeting rooms
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom_side">
          <button
            onClick={() => setNotificationDrawer(false)}
            className="btn-dash outline float-left tt"
          >
            Cancel
          </button>
          <button
            onClick={() => setNotificationDrawer(false)}
            className="btn-dash dark float-right tt"
          >
            Apply
          </button>
        </div>
      </Drawer>
    </>
  )
}

export default DrawerNotification

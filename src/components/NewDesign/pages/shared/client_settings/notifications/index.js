import React from "react"
import NotificationsTable from "./notifications_table"

const NotificationSettings = ({
  isNotificationDrawer,
  setNotificationDrawer,
}) => {
  return (
    <>
      <div className="n__card hast__table mt-0">
        <div className="n__body">
          <h3 className="">Notifications</h3>
          <span className="card_desc">
            Total: <strong>11 notifications</strong>
          </span>

          <div className="row">
            <div className="col-lg-12">
              <div className="n_table center_labels first_not_center second_not_center respo">
                <NotificationsTable
                  isNotificationDrawer={isNotificationDrawer}
                  setNotificationDrawer={setNotificationDrawer}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotificationSettings

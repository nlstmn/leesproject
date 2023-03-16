import React from "react"
import { NavLink } from "react-router-dom"

const BreadcrumbDashboard = ({
  isShow,
  mainTitle,
  mainURL,
  secondTitle,
  secondURL,
}) => {
  return (
    <>
      {isShow && (
        <div id="breadcrumb__dashboard">
          <ul>
            <li className="breadcrumb-item_dashboard">
              <NavLink to={mainURL}>{mainTitle}</NavLink>
            </li>
            {secondTitle && (
              <li className="breadcrumb-item_dashboard">
                <NavLink to={secondURL}>{secondTitle}</NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  )
}

export default BreadcrumbDashboard

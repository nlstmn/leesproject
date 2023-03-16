import React from "react"
import { Divider, Menu, Drawer } from "antd"

const MenuMobileDashboard = ({ checkedMenu, setCheckedMenu, img_src }) => {
  return (
    <div id="dashboard_mobile_menu">
      <label id="survey_mobile_burger">
        <input
          type="checkbox"
          checked={checkedMenu}
          onChange={() => setCheckedMenu(!checkedMenu)}
        />
        <span className="menu">
          {" "}
          <span className="hamburger"></span>{" "}
        </span>
      </label>

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setCheckedMenu(false)}
        open={checkedMenu}
        closable={false}
        visible={checkedMenu}
        getContainer={false}
        width={"90%"}
      >
        <>
          <img
            className="m__menu_logo"
            src={img_src}
            alt="Leesman Inside Logo"
          />
          <div className="middle">
            <div className="menu_content">
              <span className="menu__title">Menu</span>
              <ul>
                <li className="item">
                  <a href="#!" className="menu_link">
                    {" "}
                    Surveys
                  </a>
                </li>

                <li className="item">
                  <a href="#!" className="menu_link">
                    {" "}
                    Results
                  </a>
                </li>

                <li className="item">
                  <a href="#custom" className="menu_link">
                    {" "}
                    Custom
                  </a>
                </li>

                <li className="item" id="clients">
                  <a href="#clients" className="menu_link has_sub">
                    Clients
                  </a>
                  <div className="smenu">
                    <a href="#!">Clients table</a>
                    <a href="#!">New client</a>
                  </div>
                </li>

                <li className="item_divider">
                  <div className="divider">
                    <span className="menu__title">System</span>
                  </div>
                </li>

                <li className="item active">
                  <a href="#!" className="menu_link">
                    <i className="cxv-home-l-icn"></i> Home
                  </a>
                </li>
                <li className="item" id="admin">
                  <a href="#admin" className="menu_link has_sub">
                    <i className="cxv-admin-l-icn"></i> Admin
                  </a>
                  <div className="smenu">
                    <a href="#!">Modules</a>
                    <a href="#!">Global set up</a>
                    <a href="#!">Supporting docs</a>
                    <a href="#!">Logs</a>
                    <a href="#!">Alerts</a>
                  </div>
                </li>
                <li className="item">
                  <a href="#!" className="menu_link">
                    <i className="cxv-settings-l-icn"></i> Settings
                  </a>
                </li>
                <li className="item">
                  <a href="#!" className="menu_link">
                    <i className="cxv-help-l-icn"></i> Help
                  </a>
                </li>
                <li className="item">
                  <a href="#!" className="menu_link">
                    <i className="cxv-logout-l-icn"></i> Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      </Drawer>
    </div>
  )
}
export default MenuMobileDashboard

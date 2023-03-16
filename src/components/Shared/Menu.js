import React, { Component } from "react"
import { connect } from "react-redux"
import MetisMenu from "react-metismenu"
import { Link } from "react-router-dom"
import DefaultLink from "./DefaultLink"
import Responder from "../Routes/Responder"
import Client from "../Routes/Client"
import Admin from "../Routes/Admin"
import LeesmanAdmin from "../Routes/LeesmanAdmin"
import SuperAdmin from "../Routes/LeesmanAdmin"
import { AuthContext } from "../../context/auth"
import {
  setMiniSidebarMenuOn,
  setMiniHover,
  setLightTheme,
  setOffcanvas,
} from "../../actions/settingsAction"

class Menu extends Component {
  constructor(props) {
    super(props)
    this.toggleSubMenu = this.toggleSubMenu.bind(this)
    this.minisidebarMouseOver = this.minisidebarMouseOver.bind(this)
    this.minisidebarMouseOut = this.minisidebarMouseOut.bind(this)

    this.menus = {
      "Super Admin": SuperAdmin.metisMenu,
      "Leesman Admin": LeesmanAdmin.metisMenu,
      Admin: Admin.metisMenu,
      Client: Client.metisMenu,
      [null]: Responder.metisMenu, // Responder
      [undefined]: Responder.metisMenu, // Responder
    }
  }
  static contextType = AuthContext

  toggleSubMenu(e) {
    let menucClass = ""
    if (e.itemId) {
      const subClass = e.items.map((menuItem) => {
        if (
          menuItem.id === "main" ||
          menuItem.id === "app" ||
          menuItem.id === "extra" ||
          menuItem.id === "ui"
        ) {
          menucClass = "header"
        }
        if (menuItem.to === this.props.location.pathname) {
          menucClass = ""
        } else {
          menucClass = "collapse"
        }
        return menucClass
      })
      return subClass
      // return "collapse";
    } else {
      return e.visible ? "collapse" : "metismenu"
    }
  }

  minisidebarMouseOver() {
    this.props.setMiniSidebarMenuOn(false)
    this.props.setMiniHover(true)
  }

  minisidebarMouseOut() {
    this.props.setMiniSidebarMenuOn(true)
    this.props.setMiniHover(false)
  }

  componentWillMount() {
    const getLitext = document.querySelectorAll("li")
    getLitext.forEach(function (el) {
      if (
        el.innerText === "Main" ||
        el.innerText === "App" ||
        el.innerText === "UI Elements" ||
        el.innerText === "Extra"
      ) {
        el.className = "header"
      }
    })

    const { role } = this.context
    if (!role) {
      this.props.setLightTheme(true)
    } else {
      this.props.setLightTheme(this.props.lightVersion)
    }
  }

  componentDidMount() {
    if (
      window.location.pathname !== "/" &&
      document.querySelector("#location-_link") !== null
    ) {
      document.querySelector("#location-_link").classList.remove("active")
    }
  }

  render() {
    if (document.getElementById("left-sidebar") && this.props.miniSidebar) {
      document
        .getElementById("left-sidebar")
        .addEventListener("mouseover", this.minisidebarMouseOver)
    }
    if (document.getElementById("left-sidebar") && this.props.miniHover) {
      document
        .getElementById("left-sidebar")
        .addEventListener("mouseout", this.minisidebarMouseOut)
    }

    const { role } = this.context
    let metisMenu = this.menus[role]

    let filteredAdminMenus = this.menus["Admin"]

    if (!this.props.reduxClient.enable_xp) {
      filteredAdminMenus = filteredAdminMenus.filter(
        (i) => i.label !== "XP Score"
      )
    }
    if (!this.props.reduxClient.enable_questions) {
      filteredAdminMenus = filteredAdminMenus.filter(
        (i) => i.label !== "Campaigns"
      )
    }
    if (!this.props.reduxClient.enable_feedbacks) {
      filteredAdminMenus = filteredAdminMenus.filter(
        (i) => i.label !== "Comments"
      )
    }

    if (this.menus["Admin"] && role === "Admin") {
      metisMenu = filteredAdminMenus
    }

    return (
      <>
        <div
          id="left-sidebar"
          className={`sidebar${
            !role ? " responder-sidebar-hide" : " full-mockup-logo"
          }`}
        >
          <div className="navbar-brand">
            <Link to="/">
              {!role ? (
                <img
                  src="/assets/images/leesman-logos/wave-long-dark.png"
                  alt="Leesman Logo"
                  className="img-fluid logo"
                />
              ) : (
                <img
                  src="/assets/images/leesman-logos/leesman-inside-bubble.svg"
                  alt="Leesman Logo"
                  className="img-fluid logo"
                />
              )}
            </Link>
          </div>
          <div className={`sidebar-scroll${!role ? " hidden-xl-" : ""}`}>
            <nav
              id="left-sidebar-nav"
              className="sidebar-nav"
              onClick={() => this.props.setOffcanvas(!this.props.offcanvas)}
            >
              <MetisMenu
                content={metisMenu}
                noBuiltInClassNames={true}
                className="menu-list"
                classNameItemActive="active"
                classNameContainer={(e) => this.toggleSubMenu(e)}
                classNameContainerVisible="in"
                iconNamePrefix=""
                activeLinkFromLocation
                LinkComponent={(e) => (
                  <DefaultLink
                    itemProps={e}
                    // activeLinkFromLocation
                  />
                )}
              />
            </nav>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  offcanvas: state.settings.offcanvas,
  miniSidebar: state.settings.miniSidebar,
  miniSideMenuOn: state.settings.miniSideMenuOn,
  miniHover: state.settings.miniHover,
  lightVersion: state.settings.lightVersion,
  reduxClient: state.client,
})

const mapDispatchToProps = (dispatch) => ({
  setOffcanvas: (e) => dispatch(setOffcanvas(e)),
  setMiniSidebarMenuOn: (e) => dispatch(setMiniSidebarMenuOn(e)),
  setMiniHover: (e) => dispatch(setMiniHover(e)),
  setLightTheme: (e) => dispatch(setLightTheme(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Menu)

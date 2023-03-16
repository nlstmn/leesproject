import React, { useState } from "react"
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom"
import { connect } from "react-redux"
import { setLogout } from "../../actions/settingsAction"

const DefaultLink = ({ itemProps, isSetLogout, setLogout, ...props }) => {
  const activeLogoutModal = () => {
    setLogout(!isSetLogout)
  }

  const onAddClick = () => {
    if (document.querySelector("#location-_link") !== null) {
      document.querySelector("#location-_link").classList.add("active")
    }
  }

  const onRemoveClick = () => {
    if (
      document.querySelector("#location-_link") !== null &&
      document.querySelector("#campaigns-_link") !== null &&
      document.querySelector("#comments-_link") !== null
    ) {
      document.querySelector("#location-_link") &&
        document.querySelector("#location-_link").classList.remove("active")
      document.querySelector("#campaigns-_link") &&
        document.querySelector("#campaigns-_link").classList.remove("active")
      document.querySelector("#comments-_link") &&
        document.querySelector("#comments-_link").classList.remove("active")
    }
  }

  const onMainRemoveClick = () => {
    if (
      document.querySelector("#campaigns-_link") !== null &&
      document.querySelector("#comments-_link") !== null
    ) {
      document.querySelector("#campaigns-_link") &&
        document.querySelector("#campaigns-_link").classList.remove("active")
      document.querySelector("#comments-_link") &&
        document.querySelector("#comments-_link").classList.remove("active")
    }
  }

  const onClick = (e) => {
    if (itemProps.hasSubMenu) {
      itemProps.toggleSubMenu(e)
    } else {
      itemProps.activateMe({
        newLocation: itemProps.to,
        selectedMenuLabel: itemProps.label,
      })
    }
  }

  if (
    itemProps.id === "main" ||
    itemProps.id === "app" ||
    itemProps.id === "extra" ||
    itemProps.id === "ui"
  ) {
    return itemProps.label
  } else if (itemProps.to === "/") {
    return (
      <NavLink
        to={`${itemProps.to}`}
        id="location-_link"
        onClick={(e) => {
          onClick(e)
          onAddClick()
          onMainRemoveClick()
        }}
        className={`main-link ${itemProps.hasSubMenu ? "has-arrow" : ""}`}
      >
        <i className={itemProps.children[0].props.className}></i>
        <span>{itemProps.label}</span>
      </NavLink>
    )
  } else if (
    itemProps.to === "/campaigns" ||
    itemProps.to === "/all-campaigns"
  ) {
    return (
      <NavLink
        to={`${itemProps.to}`}
        id="campaigns-_link"
        onClick={(e) => {
          onClick(e)
          onRemoveClick()
        }}
        className={`campaigns-link ${itemProps.hasSubMenu ? "has-arrow" : ""}`}
      >
        <i className={itemProps.children[0].props.className}></i>
        <span>{itemProps.label}</span>
      </NavLink>
    )
  } else if (itemProps.to === "/results-feedbacks") {
    return (
      <NavLink
        to={`${itemProps.to}`}
        id="comments-_link"
        onClick={(e) => {
          onClick(e)
          onRemoveClick()
        }}
        className={`comments-link ${itemProps.hasSubMenu ? "has-arrow" : ""}`}
      >
        <i className={itemProps.children[0].props.className}></i>
        <span>{itemProps.label}</span>
      </NavLink>
    )
  } else if (itemProps.id === "logout-responder") {
    return (
      <NavLink
        to="/#login"
        onClick={(e) => {
          activeLogoutModal()
          onRemoveClick()
        }}
        className={`${itemProps.hasSubMenu ? "has-arrow" : ""}`}
      >
        <i className={itemProps.children[0].props.className}></i>
        <span>{itemProps.label}</span>
      </NavLink>
    )
  } else if (itemProps.id === "logout-other") {
    return (
      <NavLink
        to="/#login"
        onClick={(e) => {
          activeLogoutModal()
          onRemoveClick()
        }}
        className={`hidden-xl-visible main-link ${
          itemProps.hasSubMenu ? "has-arrow" : ""
        }`}
      >
        <i className={itemProps.children[0].props.className}></i>
        <span>{itemProps.label}</span>
      </NavLink>
    )
  } else if (itemProps.id === "responder-ghost-link") {
    return (
      <NavLink
        to="/"
        onClick={(e) => activeLogoutModal()}
        className={`responder-ghost-link ${
          itemProps.hasSubMenu ? "has-arrow" : ""
        }`}
      >
        <i className={itemProps.children[0].props.className}></i>
        <span>{itemProps.label}</span>
      </NavLink>
    )
  } else {
    return itemProps.children[0].props.className ? (
      <NavLink
        to={`${itemProps.to}`}
        onClick={(e) => {
          onClick(e)
          onRemoveClick()
        }}
        className={`${itemProps.hasSubMenu ? "has-arrow" : ""}`}
      >
        <i className={itemProps.children[0].props.className}></i>
        <span>{itemProps.label}</span>
      </NavLink>
    ) : (
      <NavLink
        to={`${itemProps.to}`}
        onClick={(e) => {
          onClick(e)
          onRemoveClick()
        }}
      >
        <span>{itemProps.label}</span>
      </NavLink>
    )
  }
}

const mapStateToProps = (state) => ({
  subMenuIcon: state.settings.isSubMenuIcon,
  menuIcon: state.settings.isMenuIcon,
  isSetLogout: state.settings.isSetLogout,
})

const mapDispatchToProps = (dispatch) => ({
  setLogout: (e) => dispatch(setLogout(e)),
})
export default connect(mapStateToProps, mapDispatchToProps)(DefaultLink)

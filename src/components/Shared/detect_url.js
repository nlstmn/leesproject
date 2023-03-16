import React from "react"
import { withRouter } from "react-router-dom"

class DetectURL extends React.Component {
  componentDidUpdate() {
    if (
      this.props.location.pathname !== "/" &&
      document.querySelector("#location-_link") !== null
    ) {
      document.querySelector("#location-_link").classList.remove("active")
    }
  }

  render() {
    return null
  }
}

export default withRouter(DetectURL)

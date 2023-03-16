import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import MapBox from "./mapBox"
import coordinates from "../common/country_city_coordinates.json"
import { Select } from "antd"
import { setLightTheme, setLoginBackground } from "../../actions/settingsAction"
import AdvancedFilter from "../common/AdvancedFilter"
import LoaderSmall from "../common/LoaderSmall"

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

const RegionsGlobal = ({
  setLightTheme,
  lightVersion,
  setLoginBackground,
  reduxFilterData,
  regionsGlobalData,
}) => {
  useEffect(() => {
    if (window.location.pathname === "/") {
      if (document.querySelector("#location-_link") !== null) {
        document.querySelector("#location-_link") &&
          document.querySelector("#location-_link").classList.add("active")
      }
      if (document.querySelector("#campaigns-_link") !== null) {
        document.querySelector("#campaigns-_link") &&
          document.querySelector("#campaigns-_link").classList.remove("active")
      }
      if (document.querySelector("#comments-_link") !== null) {
        document.querySelector("#comments-_link") &&
          document.querySelector("#comments-_link").classList.remove("active")
      }
    }
    setLoginBackground(false)
    document.body.classList.remove("temp__class")
  }, [])

  const [countries, SetCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState("")
  const { Option } = Select

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    )

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions())
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }, [])

    return windowDimensions
  }

  const { height, width } = useWindowDimensions()

  useEffect(() => {
    setLightTheme(false)
    getCities(coordinates)
  }, [])

  const getCities = (e) => {
    let arr = uniqueCountries(e)
    arr = arr.map((item, index) => {
      return (
        <Option key={index} value={item}>
          {item}
        </Option>
      )
    })
    SetCountries(arr)
  }

  const uniqueCountries = (a) => {
    return [...new Set(a.map((i) => i.country))]
  }

  return (
    <>
      <div className="container-fluid">
        <div className="block-header">
          <div className="row clearfix control--nav">
            <div className="col-md-3 col-sm-12">
              <h1>Locations</h1>
            </div>{" "}
            <AdvancedFilter />
          </div>
        </div>

        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 leesman-section">
            {!regionsGlobalData.length ? <LoaderSmall isMap={true} /> : <></>}
            <MapBox
              reduxFilterData={reduxFilterData}
              data={regionsGlobalData}
              useWindowDimensions={useWindowDimensions}
              key={width + height}
            />
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  lightVersion: state.settings.lightVersion,
  reduxFilterData: state.filter.data,
  regionsGlobalData: state.regionsGlobal.data,
})

const mapDispatchToProps = (dispatch) => ({
  setLightTheme: (e) => dispatch(setLightTheme(e)),
  setLoginBackground: (e) => dispatch(setLoginBackground(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegionsGlobal)

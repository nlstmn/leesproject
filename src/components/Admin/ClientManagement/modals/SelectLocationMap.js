import React, { useEffect, useLayoutEffect, useState } from "react"
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
  Circle,
} from "react-google-maps"
import Geocode from "react-geocode"
import Autocomplete from "react-google-autocomplete"
import { getCountryNameByShortCode } from "../../../../util/functions"
Geocode.setApiKey("%REACT_APP_GOOGLE_MAPS_API_KEY%")
Geocode.enableDebug()
function SelectLocationMap(props) {
  const [state, setState] = useState({
    address: "",
    city: "",
    area: "",
    state: "",
  })
  const [mapPosition, setMapPosition] = useState({
    lat: props.center.lat,
    lng: props.center.lng,
  })
  const [markerPosition, setMarkerPosition] = useState({
    lat: props.center.lat,
    lng: props.center.lng,
  })
  useLayoutEffect(() => {
    Geocode.fromLatLng(mapPosition.lat, mapPosition.lng).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = getCity(addressArray),
          area = getArea(addressArray),
          state = getState(addressArray)

        console.log("city", city, area, state)

        setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
        })
      },
      (error) => {
        console.error(error)
      }
    )
  }, [])
  useLayoutEffect(() => {
    console.log("props", props)

    setMapPosition({ lat: props.center.lat, lng: props.center.lng })
    setMarkerPosition({ lat: props.center.lat, lng: props.center.lng })
    getLatLng(props.country, props.city, props.postCode)
  }, [props])
  useEffect(() => {
    console.log("marker position, ", markerPosition)
    console.log("map position, ", mapPosition)
  }, [mapPosition, markerPosition])

  const getLatLng = (country, city, postCode) => {
    return Geocode.fromAddress(
      `${getCountryNameByShortCode(country)} ,${city}, ${postCode}`
    ).then(
      (res) => {
        const { lat, lng } = res.results[0].geometry.location
        console.log(res, lat, lng)
        setMapPosition({ lat: lat, lng: lng })
        setMarkerPosition({ lat: lat, lng: lng })
      },
      (error) => {
        console.error(error)
      }
    )
  }
  const getCity = (addressArray) => {
    let city = ""
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name
        return city
      }
    }
  }

  const getArea = (addressArray) => {
    let area = ""
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name
            return area
          }
        }
      }
    }
  }

  const getState = (addressArray) => {
    let state = ""
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name
          return state
        }
      }
    }
  }

  const onChange = (event) => {
    setState({ [event.target.name]: event.target.value })
  }
  const onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat()
    let newLng = event.latLng.lng()

    props.setPosition({ newLat, newLng })
    props.setLat(newLat)
    props.setLong(newLng)
    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = getCity(addressArray),
          area = getArea(addressArray),
          state = getState(addressArray)
        setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
        })
        setMarkerPosition({
          lat: newLat,
          lng: newLng,
        })
        setMapPosition({
          lat: newLat,
          lng: newLng,
        })
      },

      (error) => {
        console.error(error)
      }
    )
  }

  const onPlaceSelected = (place) => {
    console.log(place)
    const address = place.formatted_address
    const addressArray = place.address_components,
      city = getCity(addressArray),
      area = getArea(addressArray),
      state = getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng()

    props.setLat(latValue)
    props.setLong(lngValue)

    setState({
      address: address ? address : "",
      area: area ? area : "",
      city: city ? city : "",
      state: state ? state : "",
    })
    setMarkerPosition({
      lat: latValue,
      lng: lngValue,
    })
    setMapPosition({
      lat: latValue,
      lng: lngValue,
    })
  }
  const onInfoWindowClose = (event) => {}

  const AsyncMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        google={props.google}
        defaultZoom={props.zoom}
        defaultCenter={{ lat: mapPosition.lat, lng: mapPosition.lng }}
      >
        {/* marker üstündeki tooltip */}
        {state.city ||
          (state.address && (
            <InfoWindow
              onClose={onInfoWindowClose}
              position={{
                lat: markerPosition.lat + 0.0018,
                lng: markerPosition.lng,
              }}
            >
              <div>
                <span style={{ padding: 0, margin: 0 }}>
                  {props.city ? props.city : state.address}
                </span>
              </div>
            </InfoWindow>
          ))}
        {/*Marker*/}
        <Marker
          google={props.google}
          name={"Dolores park"}
          draggable={true}
          onDragEnd={onMarkerDragEnd}
          position={{ lat: markerPosition.lat, lng: markerPosition.lng }}
        />

        {/* Auto complete Search kutucuğu */}
        {props.radius && (
          <Circle
            defaultCenter={{ lat: mapPosition.lat, lng: mapPosition.lng }}
            radius={props.radius}
          />
        )}
        <Autocomplete
          style={{
            width: "100%",
            height: "40px",
            paddingLeft: "16px",
            marginTop: "2px",
            marginBottom: "500px",
          }}
          onPlaceSelected={onPlaceSelected}
          types={["(regions)"]}
        />
      </GoogleMap>
    ))
  )
  let map
  if (props.center.lat !== undefined) {
    map = (
      <>
        {!props.radius && (
          <>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="lat"
                  onChange={onChange}
                  readOnly="readOnly"
                  value={"lat: " + markerPosition.lat}
                ></input>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="long"
                  onChange={onChange}
                  readOnly="readOnly"
                  value={"long: " + markerPosition.lng}
                ></input>
              </div>
            </div>
          </>
        )}

        <div className="google-_map-container">
          <AsyncMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: props.height }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </>
    )
  } else {
    map = <div style={{ height: props.height }} />
  }

  return map
}
export default React.memo(SelectLocationMap, (props, nextProps) => {
  return (
    props.city === nextProps.city &&
    props.country === nextProps.country &&
    props.postCode === nextProps.postCode
  )
})

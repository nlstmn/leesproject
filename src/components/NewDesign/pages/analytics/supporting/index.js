import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { useHistory } from "react-router-dom"
import { connect } from "react-redux"
import { setLoginBackground } from "../../../../../actions/settingsAction"
import LoaderPage from "../../../elements/loader_page"
import { Helmet } from "react-helmet"
import Hybrid from "./hybrid/index"
import Office from "./office/index"
import Home from "./home/index"

const Index = ({ setLoginBackground }) => {
  let history = useHistory()

  const [isPage, setPage] = useState("Office")

  useLayoutEffect(() => {
    setLoginBackground(false)
    setTimeout(() => {
      document.body.classList.add("temp__class")
    }, 600)
  }, [])

  return (
    <>
      <Helmet
        style={[
          {
            cssText: `
        @media print {
    
            @page {
                size: A4 portrait !important;
                margin: 0mm !important;
                position: relative;
                
              }
            
              * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
              }

           

            #supporting__section h1 {
                margin-top: 0px;
            }

            .page__item {
              padding-top: 90px;
              min-height: 35cm !important;
              position: relative;
              clear: both;
          }

          .hvv_h .page__item {
            height:100vh !important;
          }

          .page__item:first-of-type {
            padding-top: 90px;
            height: 100vh !important;
            min-height: calc(35cm - 35px) !important;
        }


            #supporting__section h1.mt_xl {
              margin-top: 240px;
          }

          

        .n_menu_horizontal.support {
            display:none !important;
        }

        #supporting__section .n__header,
        .page__footer {
            display: flex !important;
        }

        #main-content,
        body.dark_version.temp__class #main-content {
            margin: 100px!important;
            padding: 0!important;
            padding-left: 0!important;
        }

        
        #element-to-print,
        #supporting__section{
           width:100%;
        }

        .container-fluid {
            margin: 0!important;
        }
        
        }
        `,
          },
        ]}
      />

      <div className="n_menu_horizontal header support">
        <div className="left">
          <a
            href="javascript:void(0)"
            className={`${isPage === "Office" ? " active" : " "}`}
            onClick={() => setPage("Office")}
          >
            Office
          </a>
          <a
            href="javascript:void(0)"
            className={`${isPage === "Home" ? " active" : " "}`}
            onClick={() => setPage("Home")}
          >
            Home
          </a>
          <a
            href="javascript:void(0)"
            className={`${isPage === "Hybrid" ? " active" : " "}`}
            onClick={() => setPage("Hybrid")}
          >
            Hybrid
          </a>
        </div>
        <div className="right">
          <button className="btn" onClick={() => window.print()}>
            <span className="iconx-printer"></span> Print
          </button>
          <button className="btn" onClick={() => history.goBack()}>
            <span className="iconx-corner-up-left"></span> Back
          </button>
        </div>
      </div>

      <LoaderPage />
      <div
        id="element-to-print"
        className={`${
          navigator.userAgent.indexOf("Firefox") !== -1 ||
          typeof InstallTrigger !== "undefined"
            ? " "
            : " hvv_h"
        }`}
      >
        {isPage === "Office" && <Office isPage={isPage} totalPages={12} />}

        {isPage === "Home" && <Home isPage={isPage} totalPages={9} />}

        {isPage === "Hybrid" && <Hybrid isPage={isPage} totalPages={14} />}
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  loginBackground: state.settings.loginBackground,
})

const mapDispatchToProps = (dispatch) => ({
  setLoginBackground: (e) => dispatch(setLoginBackground(e)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)

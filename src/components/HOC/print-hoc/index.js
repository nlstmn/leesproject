/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useLayoutEffect, useState } from "react"
import { Helmet } from "react-helmet"
import Progress from "./progressbar"
import "./print.css"
import Print1Image from "./page-1.jpg"
import Print2Image from "./page-2.jpg"
import Print3Image from "./print-laptop.jpg"
import LogoDark from "./lss-dark.png"
import LogoLight from "./lss-light.png"
import A1Icon from "./icons/ir.png"
import A2Icon from "./icons/balanced role.png"
import A3Icon from "./icons/collaborative role.png"
import H1Icon from "./icons/dah.png"
import H2Icon from "./icons/daf.png"
import H3Icon from "./icons/nda.png"
import S1Icon from "./icons/pvb.png"
import S2Icon from "./icons/utv.png"
import S3Icon from "./icons/business-confidential-discussions.png"
import S4Icon from "./icons/hvc.png"
import O1Icon from "./icons/headcount.png"
import O2Icon from "./icons/m2.png"
import O3Icon from "./icons/buffer.png"
import O4Icon from "./icons/cost.png"
import PieChartHOC from "../components/pie_chart"
import BarChartHOC from "../components/bar_chart"
import Font from "./SourceSansPro-Regular.ttf"
import LoaderLarge from "../../common/LoaderLarge"
import moment from "moment"
import { numFormatter } from "../hoc"
import html2pdf from "html2pdf.js"
const PrintHOC = ({ setPDFPage }) => {
  const initData = {
    balancedRole: "0",
    buffer: 0,
    businessConfidential: "0",
    collaborativeRole: "0",
    costPerSqm: "0",
    headcount: "0",
    individualRole: "0",
    nonWork: "0",
    privateConversations: "0",
    specialist: "0",
    type: "Financial",
    workArea: "0",
    workRoom: "0",
    workspaceDensity: 5,
    hostingVisitors: "0",
  }
  document.body.classList.add("hoc-bg")
  const [chart, setChart] = useState(
    localStorage.getItem("hocChart")
      ? JSON.parse(localStorage.getItem("hocChart"))
      : []
  )
  const [form, setForm] = useState(
    localStorage.getItem("hocForm")
      ? JSON.parse(localStorage.getItem("hocForm"))
      : initData
  )
  const [table, setTable] = useState(
    localStorage.getItem("hocTable")
      ? JSON.parse(localStorage.getItem("hocTable"))
      : []
  )
  const [export_, setExport] = useState(
    localStorage.getItem("hocExport")
      ? JSON.parse(localStorage.getItem("hocExport"))
      : []
  )
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingAll, setIsLoadingAll] = useState(true)
  const [isMessage, setMessage] = useState("PDF is generating, please wait")
  const {
    balancedRole,
    buffer,
    businessConfidential,
    collaborativeRole,
    costPerSqm,
    headcount,
    individualRole,
    nonWork,
    privateConversations,
    specialist,
    type,
    workArea,
    workRoom,
    workspaceDensity,
    hostingVisitors,
  } = form?.balancedRole ? form : initData
  useEffect(() => {
    // sayfa yenilenince her zaman başa git
    document
      .getElementsByTagName("html")[0]
      .setAttribute("class", "no-scrollitt")
    document.body.scrollTop = 0
    window.history.scrollRestoration = "manual"
    window.scrollTo(0, 0)
    // sayfa yenilenince her zaman başa git
    setTimeout(() => {
      exportPdf()
    }, 5000)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
      setMessage("Successful.")
    }, 6000)
    setTimeout(() => {
      setIsLoadingAll(false)
      document
        .getElementsByTagName("html")[0]
        .removeAttribute("class", "no-scrollitt")
    }, 7500)
  }, [])

  const exportPdf = () => {
    var element = document.querySelector("#print").innerHTML
    var opt = {
      pagebreak: { mode: "css", after: [".printable_page"] },
      filename: export_?.title + ".pdf",
      image: { type: "JPEG", quality: 1, letterRendering: true },
      html2canvas: {
        scale: 2,
        letterRendering: true,
      },
      jsPDF: {
        unit: "mm",
        format: "A4",
        orientation: "landscape",
        putOnlyUsedFonts: true,
      },
    }

    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then((val) => {
        console.log(val)
        setTimeout(() => {
          setIsLoading(false)
          setMessage("Successful.")
        }, 2000)
        setTimeout(() => {
          setPDFPage(false)
          document
            .getElementsByTagName("html")[0]
            .removeAttribute("class", "no-scrollitt")
        }, 4000)
      })
  }

  return (
    <>
      {isLoadingAll && (
        <div className="loader-_large hoc__loader generating">
          <div className="loader-_large-div generating">
            <div
              className={`circle-loader-pdf ${!isLoading && " load-complete"}`}
            >
              <div className="checkmark-pdf draw"></div>
            </div>
            <h1 className="pdf-generating">
              {isMessage}
              {isLoading && (
                <>
                  &nbsp;<span>.</span>
                  <span>.</span>
                  <span>.</span>
                </>
              )}
            </h1>
          </div>
        </div>
      )}
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hybrid Occupancy Calculator Report - Leesman® Inside</title>
        <meta
          name="description"
          content="The Leesman Hybrid Occupancy Calculator has been developed to help organisations plan their hybrid workplace future."
        />
      </Helmet>

      <div id="print">
        <div className="printable_page">
          <div className="page-_bg first">
            <img src={Print1Image} alt=""></img>
          </div>
          <p className="pdf-_copy">
            <small>© Leesman Ltd. {moment().format("DD.MM.YYYY")}</small>
          </p>
          <div className="container hvw100">
            <div className="row clearfix hvv100">
              <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 left-_tht">
                <div className="left-_middled">
                  <div className="l-_logo main dark mb-4">
                    <img src={LogoDark}></img>
                  </div>
                  <h1 className="printh mb-4">
                    Hybrid Occupancy
                    <br />
                    Calculator Report
                  </h1>

                  <p className="printh fxl mb-0 d-flex">
                    <span className="f-larg">Name:&nbsp;</span>
                    <span className="ml-5mm"> {export_?.title} </span>
                  </p>
                  <p className="printh fxl d-flex">
                    <span className="f-larg">Date:&nbsp;</span>
                    <span> {moment().format("DD/MM/YYYY")}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="printable_page">
          <div className="page-_bg">
            <img src={Print2Image} alt=""></img>
          </div>
          <p className="pdf-_copy">
            <small>© Leesman Ltd. {moment().format("DD.MM.YYYY")}</small>
          </p>
          <div className="l-_logo tr dark">
            <img src={LogoDark}></img>
          </div>
          <div className="container hvw100">
            <div className="row clearfix hvv100">
              <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-5">
                    <h2 className="printh">Introduction</h2>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4">
                    <p className="printh fxl mb5">
                      <span>
                        The future for almost every knowledge business is a
                        ‘hybrid’ one. But what does that really mean and what
                        implication does that have for the way employees work
                        individually and together? And what is the knock-on
                        effect for your corporate workplaces?{" "}
                      </span>
                    </p>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <p className="printh fxl">
                      <span className="xss">
                        At Leesman, we would define the ‘hybrid workplace’ one
                        that is part of a system that actively supports
                        employees combine remote work with office work. It may
                        look different among organisations and across teams
                        working in different ways. But fundamentally, our
                        research shows that focusing your hybrid strategy around
                        location, is probably the wrong place to start.
                      </span>
                    </p>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <p className="printh fxl">
                      <span className="xss">
                        You must first start with your people. Understand them;
                        what they do, how they do it and who they need to do it
                        with. Add to this a deeper understanding of the space
                        available to them when working remotely and then you can
                        start to build a workplace strategy that is optimised
                        for employer and employee alike.{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="printable_page">
          <div className="l-_logo tr dark">
            <img src={LogoDark}></img>
          </div>
          <p className="pdf-_copy">
            <small>© Leesman Ltd. {moment().format("DD.MM.YYYY")}</small>
          </p>
          <div className="container hvw100">
            <div className="row clearfix hvv100">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-5">
                    <h2 className="printh">Hybrid Occupancy Calculator</h2>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="row">
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 fgg">
                        <div className="row d-flex">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <h3 className="printh mb-0">What is it?</h3>
                            <p className="printh fxl mb5 mw-left">
                              <span className="xss mb-2">
                                The Leesman Hybrid Occupancy Calculator has been
                                developed to help organisations plan their
                                hybrid workplace future.
                              </span>
                            </p>
                            <p className="printh fxl mb5 mw-left">
                              <span className="xss">
                                The calculator is an interactive tool where
                                users can enter people and space data to
                                generate various outputs that predict what their
                                organisations hybrid future could look like. The
                                tool produces figures related to an
                                organisation's: Hybrid workstyle, weekly
                                utilisation, desk, cost, and space metrics. The
                                model would usually be fed by the data Leesman
                                collects from an organisation in a Leesman
                                Office, Leesman Home or hybrid workplace survey.
                              </span>
                            </p>

                            <h3 className="printh mb-0 mt-3">
                              How does it work?
                            </h3>
                            <p className="printh fxl mb5 mw-left">
                              <span className="xss">
                                The calculator incorporates hybrid workstyle
                                profiling from office and home working data
                                (People data) with well-established occupancy
                                metrics (Space data), to estimate an optimal
                                utilisation overview of an organisation’s future
                                hybrid workplace. The accuracy of the outputs
                                depends greatly on the accuracy of the input
                                data.
                              </span>
                            </p>

                            <h3 className="printh mb-0 mt-3">Qualification</h3>
                            <p className="printh fxl mb5 mw-left">
                              <span className="xss">
                                The information provided here is solely for
                                illustrative purposes to give a sense of how the
                                model works. For the greatest predictive
                                accuracy, the model should be populated by data
                                collected from your employees using our
                                established methodologies. Feel free to connect
                                with us to find out how.
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8">
                        <img
                          className="print-3-img"
                          src={Print3Image}
                          alt=""
                        ></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="printable_page">
          <div className="l-_logo tr dark">
            <img src={LogoDark}></img>
          </div>
          <p className="pdf-_copy">
            <small>© Leesman Ltd. {moment().format("DD.MM.YYYY")}</small>
          </p>
          <div className="container hvw100">
            <div className="row clearfix hvv100">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-3 mt-5">
                    <h2 className="printh">Your input</h2>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                    <div className="row">
                      <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 fgg">
                        <div className="row d-flex">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <h3 className="printh cxv mb-0">People data</h3>
                            <p className="printh fxl mb5 mw-left">
                              <span className="xss mb-2">
                                The ‘People data’ section addresses the critical
                                factors that determine how many employees would
                                benefit from using the office workplace
                                (office-leaning profile), how many would thrive
                                working remotely (remote-leaning), and how many
                                require a balanced mix of both (hybrid). The
                                calculator estimates hybrid profiles based on
                                the proportion of employees working in
                                collaborative or individual roles, the settings
                                they have available at home, and how many
                                require specific settings. These profiles can be
                                used to gauge how often the workplace is likely
                                to be used on average.
                              </span>
                            </p>

                            <h3 className="printh mb-0 mt-3">Space data</h3>
                            <p className="printh fxl mw-left">
                              <span className="xss">
                                The ‘Space data’ section builds on the scenario
                                defined by the information provided by the
                                ‘People data’. It incorporates several
                                wellestablished real estate metrics in an
                                interactive format to illustrate the effects of
                                different decisions on the cost and occupancy of
                                the workplace.
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 vv">
                        <div className="row d-flex ml-5">
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="blue-_card">
                              <h3 className="printh-chart mb-3">People data</h3>
                              <div className="double-_info">
                                <div className="lft-_info gg">
                                  <h4 className="printh mb-3">
                                    Activity profiles
                                  </h4>
                                  <Progress
                                    title="Individual role"
                                    value={individualRole}
                                    icon={A1Icon}
                                  />
                                  <Progress
                                    title="Balanced role"
                                    value={balancedRole}
                                    icon={A2Icon}
                                  />
                                  <Progress
                                    title="Collaborative role"
                                    value={collaborativeRole}
                                    icon={A3Icon}
                                  />
                                </div>
                                <div className="rgt-_info">
                                  <h4 className="printh mb-3">
                                    Home work settings
                                  </h4>
                                  <Progress
                                    title="Dedicated work room"
                                    value={workRoom}
                                    icon={H1Icon}
                                  />
                                  <Progress
                                    title="Dedicated work area"
                                    value={workArea}
                                    icon={H2Icon}
                                  />
                                  <Progress
                                    title="Non-work specific"
                                    value={nonWork}
                                    icon={H3Icon}
                                  />
                                </div>
                              </div>
                              <h4 className="printh mt-4">
                                Specific activities & equipment
                              </h4>
                              <div className="icon-_infos">
                                <div className="icon-_info">
                                  <img src={S1Icon}></img>
                                  <p>
                                    Private
                                    <br />
                                    conversations
                                  </p>
                                  <h5 className="printh mb-0">
                                    {privateConversations}%
                                  </h5>
                                </div>
                                <div className="icon-_info">
                                  <img src={S2Icon}></img>
                                  <p>
                                    Specialist/ technical
                                    <br />
                                    equipment
                                  </p>
                                  <h5 className="printh mb-0">{specialist}%</h5>
                                </div>
                                <div className="icon-_info">
                                  <img src={S3Icon}></img>
                                  <p>
                                    Business confidential
                                    <br />
                                    discussions
                                  </p>
                                  <h5 className="printh mb-0">
                                    {businessConfidential}%
                                  </h5>
                                </div>
                                <div className="icon-_info">
                                  <img src={S4Icon}></img>
                                  <p>
                                    Hosting visitors,
                                    <br />
                                    clients or customers
                                  </p>
                                  <h5 className="printh mb-0">
                                    {hostingVisitors}%
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-2">
                            <div className="blue-_card">
                              <h3 className="printh mb-0 nn">Headcount</h3>
                              <h3 className="printh mb-0 title-abs">
                                Space data
                              </h3>
                              <div className="white--h"></div>
                              <div className="icon-_infos fgf">
                                <div className="icon-_info">
                                  <img src={O1Icon}></img>
                                  <p>Employees</p>
                                  <h5 className="printh mb-0">{headcount}</h5>
                                </div>
                                <div className="icon-_info">
                                  <img src={O2Icon}></img>
                                  <p>Workplace density</p>
                                  <h5 className="printh mb-0">
                                    {workspaceDensity}m2/desk
                                  </h5>
                                </div>
                                <div className="icon-_info">
                                  <img src={O3Icon}></img>
                                  <p>Buffer</p>
                                  <h5 className="printh mb-0">{buffer * 5}%</h5>
                                </div>
                                <div className="icon-_info">
                                  <img src={O4Icon}></img>
                                  <p>Cost per SQM</p>
                                  <h5 className="printh mb-0">£{costPerSqm}</h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="printable_page">
          <div className="l-_logo tr dark">
            <img src={LogoDark}></img>
          </div>
          <p className="pdf-_copy">
            <small>© Leesman Ltd. {moment().format("DD.MM.YYYY")}</small>
          </p>
          <div className="container hvw100">
            <div className="row clearfix hvv100">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-1 mt-5">
                <h2 className="printh">Your results</h2>
              </div>
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                <div className="row ghh">
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 lcrr pdc mb-2">
                    <div className="blue-_card min-hp">
                      <h3 className="printh-chart mb-0">
                        Hybrid profile distribution
                      </h3>
                      <span className="text-muted d-block printh">
                        Proportion of employees in each hybrid profile.
                        <br />
                        Percentages may not add up to 100 due to rounding.
                      </span>

                      <PieChartHOC
                        data={chart?.pie}
                        height={290}
                        offsetY={105}
                        font={"%85"}
                      />
                    </div>
                  </div>
                  <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 rcrr mb-2">
                    <div className="blue-_card min-hp">
                      <h3 className="printh-chart mb-0">
                        Estimated workplace utilisation
                      </h3>
                      <span className="text-muted d-block printh">
                        Number of employees likely to use the workplace on any
                        given day if no fixed occupancy rules
                        <br />
                        are in place (Expected load) or if fixed occupancy rules
                        are applied (Level load)
                      </span>

                      {chart?.load?.length > 0 && (
                        <BarChartHOC data={chart?.load} height={220} />
                      )}
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 lcrr pdc mb-2">
                    <div className="blue-_card txt-align-bottom">
                      <div className="card-_inf">
                        <h3 className="printh-chart kk mb-0">
                          Avg number of days in workplace
                        </h3>
                      </div>
                      <h5 className="m-0 text-center h1">
                        {parseFloat(table?.others?.avgDaysInWorkplace).toFixed(
                          1
                        )}
                      </h5>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 mcrr mb-2">
                    <div className="blue-_card txt-align-bottom">
                      <div className="card-_inf">
                        <h3 className="printh-chart kk mb-0">SqM / Person</h3>
                      </div>
                      <div className="d-block align-items-center hwa-__items">
                        <div className="hwa-item_c d-flex align-items-center mb-0">
                          <div className="ml-0 flex-_that printh">
                            <h4 className="mb-0 font-weight-medium">
                              {numFormatter(
                                parseFloat(
                                  table?.costTable?.filter((i) =>
                                    i.title.includes("M2 / person")
                                  )[0]["Peak load"],
                                  1
                                ).toFixed(1)
                              )}
                            </h4>
                            <span className="ml-2">Expected load</span>
                          </div>
                        </div>
                        <div className="hwa-item_c d-flex align-items-center">
                          <div className="ml-0 flex-_that printh">
                            <h4 className="mb-0 font-weight-medium">
                              {numFormatter(
                                parseFloat(
                                  table?.costTable?.filter((i) =>
                                    i.title.includes("M2 / person")
                                  )[0]["Level load"],
                                  1
                                ).toFixed(1)
                              )}
                            </h4>
                            <span className="ml-2">Level load</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 mcrr mb-2">
                    <div className="blue-_card txt-align-bottom">
                      <div className="card-_inf">
                        <h3 className="printh-chart kk text-muted mb-0">
                          Cost per individual workspace
                        </h3>
                        <span className="text-muted d-block printh">
                          Annual cost for each individual workspace
                        </span>
                      </div>
                      <div className="m-0 text-center h1">
                        £
                        {numFormatter(
                          table?.others &&
                            parseFloat(table.others["Cost per desk"]).toFixed(
                              0
                            ),
                          1
                        ) || "0"}
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 rcrr mb-2">
                    <div className="blue-_card txt-align-bottom">
                      <div className="card-_inf">
                        <h3 className="printh-chart kk text-muted mb-0">
                          Workspaces required
                        </h3>
                        <span className="text-muted d-block printh">
                          Number of workspaces needed to meet the expected and
                          level load demands
                        </span>
                      </div>
                      <div className="d-flex align-items-center hwa-__items">
                        <div className="hwa-item_c d-flex align-items-center border-right vv pr-3 first-itm">
                          <div className="ml-0">
                            <h4 className="mb-0 font-weight-medium">
                              {table?.others &&
                                numFormatter(
                                  parseFloat(
                                    table?.others["Max peak load"]
                                  ).toFixed(0),
                                  0
                                )}
                            </h4>
                            <span>Exp. load</span>
                          </div>
                        </div>
                        <div className="hwa-item_c d-flex align-items-center border-right ll pr-3 ml-3">
                          <div className="ml-0">
                            <h4 className="mb-0 font-weight-medium">
                              {table?.others &&
                                numFormatter(
                                  parseFloat(
                                    table?.others["Min peak load"]
                                  ).toFixed(0),
                                  0
                                )}
                            </h4>
                            <span>Level load</span>
                          </div>
                        </div>
                        <div className="hwa-item_c d-flex align-items-center ml-3">
                          <div className="ml-0">
                            <h4 className="mb-0 font-weight-medium">
                              {table?.others &&
                                numFormatter(
                                  parseFloat(
                                    table.others[
                                      "Difference in workspaces (Peak vs Level load)"
                                    ],
                                    0
                                  ).toFixed(0)
                                )}
                            </h4>
                            <span>Difference</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 lcrr pdc">
                    <div className="blue-_card txt-align-bottom">
                      <div className="card-_inf">
                        <h3 className="printh-chart kk text-muted mb-0">
                          Net leasable area (SqM)
                        </h3>
                      </div>
                      <div className="d-block align-items-center hwa-__items">
                        <div className="hwa-item_c d-flex align-items-center mb-0">
                          <div className="ml-0 flex-_that printh">
                            <h4 className="mb-0 font-weight-medium">
                              {numFormatter(
                                parseFloat(
                                  table?.costTable?.filter((i) =>
                                    i.title.includes(
                                      "Net leasable area (NLA, m2)"
                                    )
                                  )[0]["Peak load"],
                                  1
                                ).toFixed(1)
                              )}
                            </h4>
                            <span className="ml-2">Expected load</span>
                          </div>
                        </div>
                        <div className="hwa-item_c d-flex align-items-center">
                          <div className="ml-0 flex-_that printh">
                            <h4 className="mb-0 font-weight-medium">
                              {numFormatter(
                                parseFloat(
                                  table?.costTable?.filter((i) =>
                                    i.title.includes(
                                      "Net leasable area (NLA, m2)"
                                    )
                                  )[0]["Level load"],
                                  1
                                ).toFixed(1)
                              )}
                            </h4>
                            <span className="ml-2">Level load</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 mcrr">
                    <div className="blue-_card txt-align-bottom">
                      <div className="card-_inf">
                        <h3 className="printh-chart kk text-muted mb-0">
                          Desk sharing ratio
                        </h3>
                      </div>
                      <div className="d-block align-items-center hwa-__items">
                        <div className="hwa-item_c d-flex align-items-center mb-0">
                          <div className="ml-0 flex-_that printh">
                            <h4 className="mb-0 font-weight-medium">
                              {numFormatter(
                                parseFloat(
                                  table?.costTable?.filter((i) =>
                                    i.title.includes("Desk sharing ratio")
                                  )[0]["Peak load"],
                                  1
                                ).toFixed(1)
                              )}
                            </h4>
                            <span className="ml-2">Expected load</span>
                          </div>
                        </div>
                        <div className="hwa-item_c d-flex align-items-center">
                          <div className="ml-0 flex-_that printh">
                            <h4 className="mb-0 font-weight-medium">
                              {numFormatter(
                                parseFloat(
                                  table?.costTable?.filter((i) =>
                                    i.title.includes("Desk sharing ratio")
                                  )[0]["Level load"],
                                  1
                                ).toFixed(1)
                              )}
                            </h4>
                            <span className="ml-2">Level load</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 mcrr">
                    <div className="blue-_card txt-align-bottom">
                      <div className="card-_inf">
                        <h3 className="printh-chart kk text-muted mb-0">
                          Cost saved (Busiest day vs level load){" "}
                        </h3>
                        <span className="text-muted d-block printh">
                          Cost saving between the workspaces needed for the
                          busiest expected day compared to the level load
                        </span>
                      </div>
                      <div className="m-0 text-center h1">
                        £
                        {numFormatter(
                          table?.others &&
                            parseFloat(
                              table.others["Cost saved"] / 100.0
                            ).toFixed(0),
                          1
                        ) || "0"}
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 rcrr">
                    <div className="blue-_card txt-align-bottom">
                      <div className="card-_inf">
                        <h3 className="printh-chart kk text-muted mb-0">
                          Workspace differential
                        </h3>
                        <span className="text-muted d-block printh">
                          The occupancy difference between the expected busiest
                          and quietest days
                        </span>
                      </div>
                      <div className="d-flex align-items-center hwa-__items">
                        <div className="hwa-item_c d-flex align-items-center border-right vv pr-3 first-itm">
                          <div className="ml-0">
                            <h4 className="mb-0 font-weight-medium">
                              {table?.others &&
                                numFormatter(
                                  parseFloat(table.others.Busiest).toFixed(0),
                                  0
                                )}
                            </h4>
                            <span>Busiest</span>
                          </div>
                        </div>
                        <div className="hwa-item_c d-flex align-items-center border-right ll pr-3 ml-3">
                          <div className="ml-0">
                            <h4 className="mb-0 font-weight-medium">
                              {table?.others &&
                                numFormatter(
                                  parseFloat(table.others.Quietest).toFixed(0),
                                  0
                                )}
                            </h4>
                            <span>Quietest</span>
                          </div>
                        </div>
                        <div className="hwa-item_c d-flex align-items-center ml-3">
                          <div className="ml-0">
                            <h4 className="mb-0 font-weight-medium">
                              {table?.others &&
                                numFormatter(
                                  parseFloat(
                                    table.others[
                                      "Difference in workspaces (Busiest day vs quietest day)"
                                    ],
                                    0
                                  ).toFixed(0)
                                )}
                            </h4>
                            <span>Difference</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-1 pdc">
                    <p className="printh jj">
                      Qualification:{" "}
                      <span className="xss ff">
                        The information provided here is solely for illustrative
                        purposes to give a sense of how the model works. For the
                        greatest predictive accuracy, the model should be
                        populated by data collected from your employees using
                        our established methodologies. Feel free to connect with
                        us to find out how.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="printable_page bg-_black">
          <div className="l-_logo tr dark">
            <img src={LogoLight}></img>
          </div>
          <p className="pdf-_copy">
            <small>© Leesman Ltd. {moment().format("DD.MM.YYYY")}</small>
          </p>
          <div className="container hvw100">
            <div className="row clearfix hvv100">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-4 mt-5">
                    <h2 className="printh">Want to delve deeper?</h2>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mb-5">
                    <p className="printh fxxl mb-5">
                      <span>
                        Talk to our experts to further understand how
                        <br /> you can predict your future hybrid occupancy
                        <br /> or to gain more information on our insights.
                      </span>
                    </p>
                    <p className="printh fxll mb5 mt-5 pbtn">
                      <a href="mailto:connect@leesmanindex.com" target="_blank">
                        <span>Connect with us</span>
                      </a>
                    </p>
                  </div>
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-5 btvv">
                    <p className="printh fxll mb5">
                      <span>
                        For more information on our work, or to visit us,
                        <br /> please feel free to contact:
                      </span>
                    </p>
                    <br />
                    <p className="printh fxll mb5">
                      <span>
                        Leesman
                        <br />
                        Brock House
                        <br />
                        19 Langham Street
                        <br />
                        London W1W 6BP
                        <br />
                        t. +44 (0) 20 8080 2730
                      </span>
                    </p>
                    <br />
                    <p className="printh fxll mb5">
                      <a href="https://www.leesmanindex.com/" target="_blank">
                        <span>www.leesmanindex.com</span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrintHOC

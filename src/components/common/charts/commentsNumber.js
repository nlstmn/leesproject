import React, { PureComponent, useCallback, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  tickFormatter,
} from "recharts"
import { useCurrentPng } from "recharts-to-png"
import FileSaver from "file-saver"
import moment from "moment"
import NoData from "../noData"

const data = [
  {
    name: "01-Dec",
    Uniquesusers: 400,
    Negativefeedback: 240,
    Positivefeedback: 240,
  },
]

function CommentsNumber(props) {
  const [openMenu, setopenMenu] = useState(false)
  function formatXAxis(tickItem) {
    return moment(tickItem).format("D MMM")
  }
  const [getPng, { ref: areaRef }] = useCurrentPng({
    backgroundColor: "#292b2b",
  })

  function handleDownload() {
    window.scrollTo(0, 0)
    setTimeout(() => {
      letDownload()
    }, 500)
  }

  const letDownload = useCallback(async () => {
    const png = await getPng()
    if (png) {
      FileSaver.saveAs(png, "No. of comments versus employees.png")
    }
  }, [getPng])

  return (
    <>
      {props.data && props.data.length >= 1 ? (
        <>
          <ResponsiveContainer
            width="99%"
            height={250}
            className="mb-point-c comment-chart"
          >
            <BarChart
              data={
                props.data
                  ? props.data.map((i) => {
                      return {
                        ...i,
                        name: moment(i.name).format("DD MMM"),
                      }
                    })
                  : data
              }
              margin={{
                top: 20,
                right: 5,
                left: 5,
              }}
              ref={areaRef}
            >
              <XAxis
                dataKey="name"
                tickFormatter={props.data.length < 20 ? undefined : formatXAxis}
              />
              <YAxis type="number">
                <Label
                  value="Count"
                  position="insideLeft"
                  angle={-90}
                  style={{ textAnchor: "middle" }}
                />
              </YAxis>
              <Tooltip cursor={{ fill: "transparent" }} />
              <Legend />
              <Bar
                dataKey="Negativefeedback"
                name="Negative"
                stackId="a"
                fill="#bf1717"
                barSize={20}
                animationBegin={0}
                animationDuration={1500}
                animationEasing="ease"
                isAnimationActive={true}
              />
              <Bar
                dataKey="Positivefeedback"
                name="Positive"
                stackId="a"
                fill="#119336"
                barSize={20}
                animationBegin={0}
                animationDuration={1500}
                animationEasing="ease"
                isAnimationActive={true}
              />
              <Bar
                dataKey="Uniquesusers"
                name="Employees"
                fill="#70777a"
                barSize={20}
                animationBegin={0}
                animationDuration={1500}
                animationEasing="ease"
                isAnimationActive={true}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="apexcharts-toolbar comments-_-toolbar" title="Menu">
            <div
              className="apexcharts-menu-icon"
              onClick={() => setopenMenu(!openMenu)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
              </svg>
            </div>
            <div
              className={`apexcharts-menu ${
                openMenu ? " apexcharts-menu-open opacity-_1" : ""
              }`}
            >
              {/* <div className="apexcharts-menu-item exportSVG" title="Download SVG" onClick={()=>setopenMenu(false)}>
            Download SVG
          </div> */}
              <div
                className="apexcharts-menu-item exportPNG"
                title="Download PNG"
                onClick={() => {
                  handleDownload()
                  setopenMenu(false)
                }}
              >
                Download PNG
              </div>
              {/* <div className="apexcharts-menu-item exportCSV" title="Download CSV" onClick={()=>setopenMenu(false)}>
            Download CSV
          </div> */}
            </div>
          </div>
        </>
      ) : (
        <NoData />
      )}
    </>
  )
}

export default CommentsNumber

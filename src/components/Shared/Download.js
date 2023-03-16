import React from "react"
import { Helmet } from "react-helmet"

const Download = () => {
  //let history = useHistory();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Leesman® Inside | Change starts from the inside</title>
        <meta
          name="description"
          content="Our platform gives you a powerful voice and your company a way to listen and shape better places for you to work."
        />
      </Helmet>
      <div className="container-fluid">
        <div className="block-header">
          <div className="row clearfix">
            <div className="col-md-8 col-sm-12">
              <h1>Download management</h1>
            </div>
          </div>
        </div>
        <div className="row clearfix">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="card">
              <div className="body min-h-381">
                <h2 className="card-title mb-0">
                  Here users will be presented downloadable contents..
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Download

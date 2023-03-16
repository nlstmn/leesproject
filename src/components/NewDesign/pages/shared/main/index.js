/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import AnimatedNumbers from "react-animated-numbers"
import LoaderPage from "../../../elements/loader_page"
import Slider from "react-slick"
import DataCard from "./_data_card"
import BlogCard from "./_blog_card"
import { newSurveyHomeAction } from "../../../../../actions/clientActions"

const AnalyticsMain = () => {
  const dispatch = useDispatch()

  const { client_id } = useSelector((store) => store.user)
  const {
    allCountries,
    allWorkplaces,
    allEmployees,
    LMIByClientId,
    HLMIByClientId,
  } = useSelector((store) => store.newSurveyHomeReducer)

  useLayoutEffect(() => {
    document.body.classList.add("temp__class")
  }, [])

  useEffect(() => {
    if (client_id) {
      dispatch(newSurveyHomeAction(client_id))
    }
  }, [client_id])

  const slideSettings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1070,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          dots: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <>
      <LoaderPage />

      <div className="container-fluid">
        <div className="row clearfix top-info">
          <div className="col-lg-6">
            <div className="main__hero_left">
              {console.log("CHECKING NEW UPDATES FOR LEESMAN")}
              <h1>
                <span>Welcome —</span>
                <br />
                to Leesman Surveys
              </h1>
              <p>
                Our employee workplace experience data is the largest
                <br /> database of its kind. The data, collected via our Leesman
                Surveys,
                <br /> fuel our insights and helps us to understand what makes a
                great
                <br /> place to work.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="main__hero_right">
              <div className="main_right_info">
                <h3>Our global data</h3>
                <ul>
                  <DataCard
                    title={"Countries"}
                    value={allCountries || 0}
                    color={""}
                  />
                  <DataCard
                    title={"Workplaces"}
                    value={allWorkplaces || 0}
                    color={""}
                  />
                  <DataCard
                    title={"Employees"}
                    value={allEmployees || 0}
                    color={""}
                  />
                  <DataCard
                    title={"Lmi"}
                    value={LMIByClientId || 0}
                    color={"green"}
                  />
                  <DataCard
                    title={"H-Lmi"}
                    value={HLMIByClientId || 0}
                    color={"red"}
                  />
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="main__divider">
              <div className="line"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="main__section">
              <div className="info">
                <div className="area">
                  <h2>Your company data</h2>
                  <p>
                    This is dummy text. It is intended to be read but it has no
                    meaning. Used as a simulation of actual copy, it cannot
                    deceive the eye or brain.
                  </p>
                </div>
              </div>
              <div className="map">
                <div className="area">
                  <img src="/assets/images/svg-images/big_map_blue.svg" />
                  <div className="main_cards">
                    <div className="item">
                      <h4>
                        <AnimatedNumbers
                          // includeComma
                          animateToNumber={allCountries || 0}
                          configs={[
                            { mass: 1, tension: 220, friction: 140 },
                            { mass: 1, tension: 180, friction: 140 },
                            { mass: 1, tension: 280, friction: 140 },
                            { mass: 1, tension: 180, friction: 140 },
                            { mass: 1, tension: 260, friction: 140 },
                            { mass: 1, tension: 210, friction: 140 },
                          ]}
                        ></AnimatedNumbers>
                      </h4>
                      <span>Countries</span>
                    </div>
                    <div className="item">
                      <h4>
                        <AnimatedNumbers
                          // includeComma
                          animateToNumber={allWorkplaces || 0}
                          configs={[
                            { mass: 1, tension: 220, friction: 100 },
                            { mass: 1, tension: 180, friction: 130 },
                            { mass: 1, tension: 280, friction: 90 },
                            { mass: 1, tension: 180, friction: 135 },
                            { mass: 1, tension: 260, friction: 100 },
                            { mass: 1, tension: 210, friction: 180 },
                          ]}
                        ></AnimatedNumbers>
                      </h4>
                      <span>Workplaces</span>
                    </div>
                    <div className="item">
                      <h4>
                        <AnimatedNumbers
                          // includeComma
                          animateToNumber={allEmployees || 0}
                          configs={[
                            { mass: 1, tension: 220, friction: 100 },
                            { mass: 1, tension: 180, friction: 130 },
                            { mass: 1, tension: 280, friction: 90 },
                            { mass: 1, tension: 180, friction: 135 },
                            { mass: 1, tension: 260, friction: 100 },
                            { mass: 1, tension: 210, friction: 180 },
                          ]}
                        ></AnimatedNumbers>
                      </h4>
                      <span>Employees</span>
                    </div>
                    <div className="item">
                      <h4>
                        <AnimatedNumbers
                          // includeComma
                          animateToNumber={LMIByClientId || 0}
                          configs={[
                            { mass: 1, tension: 220, friction: 100 },
                            { mass: 1, tension: 180, friction: 130 },
                            { mass: 1, tension: 280, friction: 90 },
                            { mass: 1, tension: 180, friction: 135 },
                            { mass: 1, tension: 260, friction: 100 },
                            { mass: 1, tension: 210, friction: 180 },
                          ]}
                        ></AnimatedNumbers>
                      </h4>
                      <span>Lmi</span>
                    </div>
                    <div className="item">
                      <h4>
                        <AnimatedNumbers
                          // includeComma
                          animateToNumber={HLMIByClientId || 0}
                          configs={[
                            { mass: 1, tension: 220, friction: 100 },
                            { mass: 1, tension: 180, friction: 130 },
                            { mass: 1, tension: 280, friction: 90 },
                            { mass: 1, tension: 180, friction: 135 },
                            { mass: 1, tension: 260, friction: 100 },
                            { mass: 1, tension: 210, friction: 180 },
                          ]}
                        ></AnimatedNumbers>
                      </h4>
                      <span>H-Lmi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="main__divider">
              <div className="line"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="main__section">
              <div className="info">
                <div className="area">
                  <h2>Deep dive results in full</h2>
                  <p>
                    Click below for a detailed view of your company data based
                    on your survey results.
                  </p>

                  <NavLink className="btn-dash" to="/analytics-overview">
                    View full data
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="main__divider ara">
              <div className="line"></div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="main__section">
              <div className="info">
                <div className="area">
                  <h2>Resources</h2>
                  <p>
                    As hybrid continues to dominate the global workforce we have
                    developed tools, solutions and collated valuable research to
                    help our clients plan their hybrid future.
                  </p>
                </div>
              </div>
              <div className="blog">
                <div className="area">
                  <div className="blog_cards">
                    <Slider {...slideSettings}>
                      <BlogCard
                        img_url={"/assets/images/temp/r_1.jpg"}
                        main_title={"Hybrid working webinar"}
                        desc={
                          "Our experts unpack the insights from the second half of 2021 and discuss the various factors that may influence employees’ intentions regarding their workplace."
                        }
                        date_title={"Date —"}
                        date={"00 Month 2021"}
                        btn_title={"Watch the video"}
                        btn_url={"https://www.youtube.com/watch?v=JZnzF2uVs-4"}
                        target={"_blank"}
                      />
                      <BlogCard
                        img_url={"/assets/images/temp/r_2.jpg"}
                        main_title={"Office impact code"}
                        desc={
                          "Take a look at the employee experience data is currently telling us by viewing the results of each line of enquiry."
                        }
                        date_title={"Data updated —"}
                        date={"30 June 2021"}
                        btn_title={"How Leesman Hybrid works"}
                        btn_url={
                          "https://www.leesmanindex.com/the-hybrid-workstyle/#:~:text=How%20it%20works,into%20one%20of%20five%20personas."
                        }
                        target={"_blank"}
                      />
                      <BlogCard
                        img_url={"/assets/images/temp/r_3.jpg"}
                        main_title={"Hybrid Occupancy Calculator"}
                        desc={
                          "The Leesman Hybrid Occupancy Calculator has been developed to help organisations plan their hybrid workplace future."
                        }
                        date_title={"Get in touch —"}
                        date={"to receive an exclusive demo of the tool."}
                        btn_title={"Connect with us"}
                        btn_url={"https://www.leesmanindex.com/contact-us/"}
                        target={"_blank"}
                      />
                      <BlogCard
                        img_url={"/assets/images/temp/r_1.jpg"}
                        main_title={"Hybrid working webinar"}
                        desc={
                          "Our experts unpack the insights from the second half of 2021 and discuss the various factors that may influence employees’ intentions regarding their workplace."
                        }
                        date_title={"Date —"}
                        date={"00 Month 2021"}
                        btn_title={"Watch the video"}
                        btn_url={"https://www.youtube.com/watch?v=JZnzF2uVs-4"}
                        target={"_blank"}
                      />
                      <BlogCard
                        img_url={"/assets/images/temp/r_2.jpg"}
                        main_title={"Office impact code"}
                        desc={
                          "Take a look at the employee experience data is currently telling us by viewing the results of each line of enquiry."
                        }
                        date_title={"Data updated —"}
                        date={"30 June 2021"}
                        btn_title={"How Leesman Hybrid works"}
                        btn_url={
                          "https://www.leesmanindex.com/the-hybrid-workstyle/#:~:text=How%20it%20works,into%20one%20of%20five%20personas."
                        }
                        target={"_blank"}
                      />
                      <BlogCard
                        img_url={"/assets/images/temp/r_3.jpg"}
                        main_title={"Hybrid Occupancy Calculator"}
                        desc={
                          "The Leesman Hybrid Occupancy Calculator has been developed to help organisations plan their hybrid workplace future."
                        }
                        date_title={"Get in touch —"}
                        date={"to receive an exclusive demo of the tool."}
                        btn_title={"Connect with us"}
                        btn_url={"https://www.leesmanindex.com/contact-us/"}
                        target={"_blank"}
                      />
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-12 last__divider_main">
          <div className="main__divider ara">
            <div className="line"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AnalyticsMain

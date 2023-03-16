/* eslint-disable jsx-a11y/alt-text */
import React from "react"
import AboutYou from "../shared/about_you"
import HomeExperience from "../shared/home_experience"
import PageFooter from "../shared/page_footer"

const Index = ({ isPage, totalPages }) => {
  return (
    <>
      <div id="supporting__section">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-lg-12">
              <div className="page__item">
                <div className="n__header">
                  <a href="#!" className="n__logo">
                    <img
                      className=""
                      src="/assets/images/svg-images/leesman-logo-admin.svg"
                    ></img>
                  </a>
                </div>
                <h1 className="mt_xl">
                  Home Survey —<br />
                  <span>Core question set</span>
                </h1>

                <p>
                  <span className="bold">
                    The following pages detail the Leesman Office standardised
                    questions in English (UK).
                  </span>
                </p>

                <p>
                  The core questions are fixed and do not change – this
                  standardisation is integral in our ability to benchmark client
                  data accurately against our global database. A number of
                  demographic questions are tailored to each organisation, and
                  these are graphically highlighted with italic text. Text to be
                  replaced is shown in{" "}
                  <span className="red bold">red text</span>. Guidance notes are
                  shown in <span className="blue bold">blue text</span>, while
                  different bullet points are used throughout to show editable
                  fields or the survey response mechanism:
                </p>

                <p>
                  <ul className="spaced">
                    <li>
                      <img
                        src="/assets/images/svg-icons/support/single_select.svg"
                        className="icon"
                      ></img>
                      Client editable field with single selection
                    </li>
                    <li>
                      <img
                        src="/assets/images/svg-icons/support/dropdown.svg"
                        className="icon"
                      ></img>
                      Single selection dropdown
                    </li>
                    <li>
                      <img
                        src="/assets/images/svg-icons/support/slider.svg"
                        className="icon"
                      ></img>
                      Slider selection
                    </li>
                    <li>
                      <img
                        src="/assets/images/svg-icons/support/multiple.svg"
                        className="icon"
                      ></img>
                      Multiple selection
                    </li>
                    <li>
                      <img
                        src="/assets/images/svg-icons/support/scale.svg"
                        className="icon"
                      ></img>
                      Likert scale
                    </li>
                  </ul>
                </p>

                <p>
                  It is possible to add additional questions at the end of the
                  survey. Please discuss your requirements with your Leesman
                  contact.
                </p>

                <p>
                  To see these questions as they appear in the online survey,
                  check out the demo version on our{" "}
                  <span className="bold">leesmanindex.com</span> homepage or{" "}
                  <a target="_blank" href="https://www.leesmanindex.com/">
                    click here
                  </a>
                  .
                </p>

                <PageFooter
                  type={isPage}
                  page_number={1}
                  total_pages={totalPages}
                />
              </div>

              <AboutYou isPage={isPage} totalPages={totalPages} />

              <HomeExperience isPage={isPage} totalPages={totalPages} />

              <div className="page__item">
                <h1>Office lite —</h1>

                <div className="question__itm">
                  <h3>
                    Q11. How much do you agree with the following statements
                    about your organisation’s workplace (
                    <span className="red">Workplace X</span>)?
                  </h3>
                  <p>
                    <span className="blue">
                      {" "}
                      This question only appears if in Q3 the respondent has
                      indicated spending some time working from their
                      organisation’s workplace(s). ‘Workplace X’ will be
                      replaced by the respondent’s selection in Q4. If ‘Other
                      workplace’ was selected, it will display ‘Other
                      workplace’.
                    </span>
                  </p>

                  <p>
                    <ul className="spaced">
                      <li>
                        <img
                          src="/assets/images/svg-icons/support/dropdown.svg"
                          className="icon"
                        ></img>
                        It provides a positive overall experience
                      </li>
                      <li>
                        <img
                          src="/assets/images/svg-icons/support/dropdown.svg"
                          className="icon"
                        ></img>
                        It enables me to work productively
                      </li>
                      <li>
                        <img
                          src="/assets/images/svg-icons/support/dropdown.svg"
                          className="icon"
                        ></img>
                        It contributes to a sense of community at work
                      </li>
                      <li>
                        <img
                          src="/assets/images/svg-icons/support/dropdown.svg"
                          className="icon"
                        ></img>
                        Working there has a positive impact on my overall
                        wellbeing
                      </li>
                    </ul>

                    <ul className="spaced">
                      <li>
                        <img
                          src="/assets/images/svg-icons/support/scale.svg"
                          className="icon"
                        ></img>
                        Disagree strongly
                      </li>
                      <li>
                        <img
                          src="/assets/images/svg-icons/support/scale.svg"
                          className="icon"
                        ></img>
                        Disagree
                      </li>
                      <li>
                        <img
                          src="/assets/images/svg-icons/support/scale.svg"
                          className="icon"
                        ></img>
                        Disagree slightly
                      </li>
                      <li>
                        <img
                          src="/assets/images/svg-icons/support/scale.svg"
                          className="icon"
                        ></img>
                        Neutral
                      </li>
                      <li>
                        <img
                          src="/assets/images/svg-icons/support/scale.svg"
                          className="icon"
                        ></img>
                        Agree slightly
                      </li>
                      <li>
                        <img
                          src="/assets/images/svg-icons/support/scale.svg"
                          className="icon"
                        ></img>
                        Agree
                      </li>
                      <li>
                        <img
                          src="/assets/images/svg-icons/support/scale.svg"
                          className="icon"
                        ></img>
                        Agree strongly
                      </li>
                    </ul>
                  </p>
                </div>

                <PageFooter
                  type={isPage}
                  page_number={9}
                  total_pages={totalPages}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index

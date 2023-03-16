/* eslint-disable jsx-a11y/alt-text */
import React from "react"
import PageFooter from "./page_footer"

const AboutYou = ({ isPage, totalPages }) => {
  return (
    <>
      <div className="page__item">
        <h1>About you —</h1>

        <h2>
          Q1 — <span>Demographics</span>
        </h2>

        <div className="question__itm">
          <h3>Q1.1 Department</h3>

          <p>
            <span className="blue">
              This question is tailored to your organisational structure and
              will include a list of your departments or organisational units.
              The question title can also be changed based on how you refer to
              the units in your organisation (e.g., division, business unit,
              department, team).
            </span>
          </p>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/single_select.svg"
                  className="icon"
                ></img>
                Your customised list of organisational units
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Other
              </li>
            </ul>
          </p>
        </div>

        <div className="question__itm">
          <h3>Q1.2 Role</h3>

          <p>
            <span className="blue">
              If this question is not applicable to your organisation, or if you
              choose to insert a tailored job role question (Q1.3), it can be
              removed.
            </span>
          </p>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Individual contributor
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                People manager
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Senior leader
              </li>
            </ul>
          </p>
        </div>

        <div className="question__itm">
          <h3>Q1.3 Job grade/level</h3>

          <p>
            <span className="blue">
              {" "}
              This question is tailored to your organisational job roles or
              grades (instead of Q1.2). If neither is applicable, it can be
              removed.
            </span>
          </p>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/single_select.svg"
                  className="icon"
                ></img>
                Your customised list of job roles or grades
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Other
              </li>
            </ul>
          </p>
        </div>

        <div className="question__itm">
          <h3>Q1.4 Employment type</h3>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Individual contributor
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                People manager
              </li>
            </ul>
          </p>
        </div>

        <PageFooter type={isPage} page_number={2} total_pages={totalPages} />
      </div>

      <div className="page__item">
        <div className="question__itm">
          <h3>Q1.5 Time with organisation</h3>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                0-6 months
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                6-18 months
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                18 months to 3 years
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                3-8 years
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                8-12 years
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Over 12 years
              </li>
            </ul>
          </p>
        </div>

        <div className="question__itm">
          <h3>Q1.6 Age group</h3>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Under 25
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                25-34
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                35-44
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                45-54
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                55-64
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                65 or over
              </li>
            </ul>
          </p>
        </div>

        <div className="question__itm">
          <h3>Q1.7 Gender</h3>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Man
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Woman
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Non-binary
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Gender fluid
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Agender
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Prefer not to say
              </li>
            </ul>
          </p>
        </div>

        <PageFooter type={isPage} page_number={3} total_pages={totalPages} />
      </div>

      <div className="page__item">
        <div className="question__itm">
          <h3>
            Q2 Which of the following activities are important to you at your
            organisation (<span className="red">Organisation name</span>)?
          </h3>
          <p>
            <span className="blue">
              ‘Organisation name’ will be replaced by your organisation name as
              you wish it to appear.
            </span>
          </p>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Individual focused work (desk-based)
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Individual focused work (not desk-based)
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Individual routine tasks
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Thinking or creative thinking
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Reading
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Planned meetings
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Informal, unplanned meetings
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Hosting visitors, clients or customers
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Large group meetings or events
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Video calls or conferences
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Audio calls or conferences
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Telephone conversations
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Private conversations
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Business confidential discussions
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Collaborating on creative work
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Collaborating on focused work
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Learning from others
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Informal social interaction
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Relaxing or taking a break
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Using papers or materials
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Using technical/specialist equipment or materials
              </li>
            </ul>
          </p>
        </div>

        <PageFooter type={isPage} page_number={4} total_pages={totalPages} />
      </div>

      <div className="page__item">
        <div className="question__itm">
          <h3>
            Q3 On average, what proportion of your work time at your
            organisation (<span className="red">Organisation name</span>) do you
            spend at the following locations? Drag the sliders to total 100%.
            <br />
            <br />
            Please note: the information you provide here helps us understand
            which sections of the survey are relevant to you.
          </h3>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/slider.svg"
                  className="icon"
                ></img>
                My organisation’s workplace(s)
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/slider.svg"
                  className="icon"
                ></img>
                Serviced offices or co-working spaces
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/slider.svg"
                  className="icon"
                ></img>
                Other workplaces (e.g. those of clients, partners or suppliers)
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/slider.svg"
                  className="icon"
                ></img>
                Home
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/slider.svg"
                  className="icon"
                ></img>
                Working while travelling
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/slider.svg"
                  className="icon"
                ></img>
                Other location(s)
              </li>
            </ul>
          </p>

          <p className="mb-4">
            <span className="blue">Percentage scale:</span>
            <br />
            <span className="bolder">
              0% | 10% | 20% | 30% | 40% | 50% | 60% | 70% | 80% | 90% | 100%
            </span>
          </p>
        </div>

        <div className="question__itm">
          <h3>
            Q4 Which of your organisation’s workplaces is the most important for
            your work?
          </h3>
          <p>
            <span className="blue">
              This question is tailored to the names of the buildings included
              within the scope of the survey. The respondent’s selection here
              will auto-populate the <span className="red bold">red text</span>{" "}
              to questions below
              <br />
              <br />
              If ‘Other workplace’ is selected, it will display ‘Other
              workplace’. In surveys with just one building, this question does
              not appear and the name of the building appears automatically in
              all questions.
            </span>
          </p>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/single_select.svg"
                  className="icon"
                ></img>
                Your customised list of buildings
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Other
              </li>
            </ul>
          </p>
        </div>

        <PageFooter type={isPage} page_number={5} total_pages={totalPages} />
      </div>
    </>
  )
}

export default AboutYou

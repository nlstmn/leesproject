/* eslint-disable jsx-a11y/alt-text */
import React from "react"
import PageFooter from "./page_footer"

const HomeExperience = ({ isPage, totalPages }) => {
  return (
    <>
      <div className="page__item">
        <h1>Home working experience —</h1>
        <p className="title_desc">
          <span className="blue">
            This section only appears if the respondent indicated in Q3 that
            they spend some time working from home, except for Q5.2, which only
            appears if they do not spend any time working from home.
          </span>
        </p>

        <div className="question__itm">
          <h3>
            Q5.1 What type of work setting do you typically use when working
            from home?
          </h3>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                A dedicated work room or office
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                A dedicated work area (but not a separate room)
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                A setting not typically intended for work (e.g. dining table)
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
          <h3>
            Q5.2 If you were to work from home, what type of work setting would
            you typically use?
          </h3>
          <p>
            <span className="blue">
              Only this question appears if the respondent indicated in Q3 that
              they do not spend any time working from home.
            </span>
          </p>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                A dedicated work room or office
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                A dedicated work area (but not a separate room)
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                A setting not typically intended for work (e.g. dining table)
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
          <h3>
            Q6. When you work from home, who is typically present? Select all
            that apply or ‘no one’.
          </h3>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                One or more children or dependents
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                A partner or other family member(s)
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Friend(s) or roommate(s)
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Other person(s)
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                No one
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Prefer not to say
              </li>
            </ul>
          </p>
        </div>

        <PageFooter
          type={isPage}
          page_number={isPage === "Home" ? 6 : 12}
          total_pages={totalPages}
        />
      </div>

      <div className="page__item">
        <div className="question__itm">
          <h3>
            Q7. Earlier in the survey, you indicated that the activities below
            are important for your role. How well are they supported when you
            are working from home?
          </h3>
          <p>
            <span className="blue">
              Only this question appears if the respondent indicated in Q3 that
              they do not spend any time working from home.
            </span>
          </p>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/scale.svg"
                  className="icon"
                ></img>
                Not supported at all
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/scale.svg"
                  className="icon"
                ></img>
                Very under supported
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/scale.svg"
                  className="icon"
                ></img>
                Under supported
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/scale.svg"
                  className="icon"
                ></img>
                Supported
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/scale.svg"
                  className="icon"
                ></img>
                Well supported
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/scale.svg"
                  className="icon"
                ></img>
                Very well supported
              </li>
            </ul>
          </p>
        </div>

        <div className="question__itm">
          <h3>
            Q8. Which of the following features are important in creating an
            optimal home working environment for you?
          </h3>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Desk or table
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Chair
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Desktop computing equipment
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Mobile computing equipment
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Monitor
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                WiFi network connectivity
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Wired network connectivity
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Remote access to work files or network
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Telephone equipment
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Audio headset
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Printing/copying/scanning equipment
              </li>
            </ul>
          </p>
        </div>

        <PageFooter
          type={isPage}
          page_number={isPage === "Home" ? 7 : 13}
          total_pages={totalPages}
        />
      </div>

      <div className="page__item">
        <div className="question__itm">
          <h3>
            Q9. How satisfied are you with these features when working from
            home? Select (x) if the feature is not provided.
          </h3>
          <p>
            <span className="blue">
              Only the features that were selected to be important in Q8 will
              appear here.
            </span>
          </p>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/scale.svg"
                  className="icon"
                ></img>
                Not provided
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/scale.svg"
                  className="icon"
                ></img>
                Highly dissatisfied
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/scale.svg"
                  className="icon"
                ></img>
                Dissatisfied
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
                Satisfied
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/scale.svg"
                  className="icon"
                ></img>
                Highly satisfied
              </li>
            </ul>
          </p>
        </div>

        <div className="question__itm">
          <h3>
            Q10. How much do you agree with the following statements about
            working from home?
          </h3>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                I have access to all of the IT devices and tools I need
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                I have access to all of the software applications/programs I
                need
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                I have access to all of the information needed for the work that
                I do
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                The physical settings I use are suitable for the work that I do
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                My home environment enables me to work productively
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                I’m able to share ideas/knowledge among colleagues
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                I feel connected to my colleagues
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                I feel connected to my organisation
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                I’m able to be physically active
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                I’m able to maintain a healthy work-life balance
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                It has a positive impact on my overall wellbeing
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
          page_number={isPage === "Home" ? 8 : 14}
          total_pages={totalPages}
        />
      </div>
    </>
  )
}

export default HomeExperience

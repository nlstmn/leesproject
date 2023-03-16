/* eslint-disable jsx-a11y/alt-text */
import React from "react"
import PageFooter from "./page_footer"

const OfficeExperience = ({ isPage, totalPages }) => {
  return (
    <>
      <div className="page__item">
        <h1>Office experience —</h1>
        <p className="title_desc">
          <span className="blue">
            This section appears if the respondent indicated in Q3 that they
            spend some time working in their organisation’s workplace(s),
            services offices or co-working spaces.
          </span>
        </p>

        <div className="question__itm">
          <h3>
            Q5 Think about your organisation’s workplace (
            <span className="red">Workplace X</span>). How often do you work
            there?
          </h3>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                I mainly work there and rarely elsewhere
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                I often work there and sometimes elsewhere
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                I sometimes work there but often elsewhere
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                I rarely work there but mainly elsewhere
              </li>
            </ul>
          </p>
        </div>

        <div className="question__itm">
          <h3>
            Q6 Think about the type of work setting you use most in your
            organisation’s workplace (<span className="red">Workplace X</span>).
            <br />
            <br />
            A. Is it permanently assigned to you?
          </h3>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Yes
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                No, but I book it in advance
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                No, I use it when it’s unoccupied (without booking)
              </li>
            </ul>
          </p>
        </div>

        <div className="question__itm">
          <h3>B. What type of setting is it?</h3>
          <p>
            <span className="blue">
              If ‘<span className="bold">Yes</span>’ was selected in{" "}
              <span className="bold">A</span>.
            </span>
          </p>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Workstation in open plan office area
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Cubicle or partially enclosed workstation
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Workstation in shared room
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Private office
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Specialist, practical or technical setting
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

          <p className="mb-4">
            <span className="blue italic">Q6 continued on page 7</span>
          </p>
        </div>

        <PageFooter type={isPage} page_number={6} total_pages={totalPages} />
      </div>

      <div className="page__item">
        <div className="question__itm">
          <p>
            <span className="blue">
              If ‘<span className="bold">No, but I book in advance</span>’ was
              selected in A.
            </span>
          </p>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Workstation in open plan office area
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Cubicle or partially enclosed workstation
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Workstation in shared room
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Shared team table
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Quiet room
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Private office
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Meeting room
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Informal work setting (e.g. break-out area)
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Specialist, practical or technical setting
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

          <p>
            <span className="blue">
              If ‘
              <span className="bold">
                No, but I use it when it’s unoccupied
              </span>
              ’ was selected in A.
            </span>
          </p>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Workstation in open plan office area
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Cubicle or partially enclosed workstation
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Workstation in shared room
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Shared team table
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Quiet room
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Private office
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Meeting room
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Informal work setting (e.g. break-out area)
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Specialist, practical or technical setting
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Other
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Not applicable – I use a mix of settings evenly
              </li>
            </ul>
          </p>
        </div>

        <div className="question__itm">
          <h3>
            Q7 How do you typically use your organisation’s workplace (
            <span className="red">Workplace X</span>)?
          </h3>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                I mainly work at a single setting and rarely use others
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                I often work at a single setting and sometimes use others
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                I sometimes work at a single setting but often use others
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                I rarely work at a single setting but mainly use multiple
                settings
              </li>
            </ul>
          </p>
        </div>

        <PageFooter type={isPage} page_number={7} total_pages={totalPages} />
      </div>

      <div className="page__item">
        <div className="question__itm">
          <h3>
            Q8 Earlier in the survey, you indicated that the activities below
            are important for your role. How well are they supported in your
            organisation’s workplace (<span className="red">Workplace X</span>)?
          </h3>
          <p>
            <span className="blue">
              Only the activities that were selected to be important in Q2 will
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
            Q9 Which of the following features are important in creating an
            optimal work environment for you?
          </h3>
          <h4>Space and Layout</h4>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Atriums and communal areas
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Access (e.g. lifts, stairways, ramps)
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Large meeting rooms
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Small meeting rooms
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Quiet rooms for working alone or in pairs
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Phone/work booth
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Informal work areas (e.g. break-out zones)
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Variety of workspace types
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Space between work settings
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Movement of people past my workstation
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Accessibility of colleagues
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Dividers (between desk and work areas)
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Personal storage
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Shared storage
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Archive storage
              </li>
            </ul>
          </p>
          <p className="mb-4">
            <span className="blue italic">Q9 continued on page 9</span>
          </p>
        </div>

        <PageFooter type={isPage} page_number={8} total_pages={totalPages} />
      </div>

      <div className="page__item">
        <div className="question__itm">
          <h4>Indoor environment and design</h4>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                General décor
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Plants and greenery
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Art and photography
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Internal signage
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Desk
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
                Ability to personalise the workstation I use
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Air quality
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Temperature control
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Noise levels
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Natural light
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Office lighting
              </li>
            </ul>
          </p>

          <h4>Workspace services</h4>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Reception areas
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Hospitality services (e.g. guest reception/services, catering,
                concierge)
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Tea, coffee and other refreshment facilities
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Restaurant/canteen
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                IT help desk
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Mail and post services
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Leisure facilities onsite or nearby (e.g. gym, fitness/wellness
                centre)
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Shower facilities
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Toilets
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Parking facilities (for motor vehicles)
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Bicycle parking facilities
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                General tidiness
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                General cleanliness
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Security
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Health and safety provision
              </li>
            </ul>
          </p>

          <p className="mb-4">
            <span className="blue italic">Q9 continued on page 10</span>
          </p>
        </div>

        <PageFooter type={isPage} page_number={9} total_pages={totalPages} />
      </div>

      <div className="page__item">
        <div className="question__itm">
          <h4>Technology</h4>

          <p>
            <ul className="spaced">
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
                Printing/copying/scanning equipment
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
                Audio headset
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
                WiFi network connectivity
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
                Audiovisual equipment
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Guest/visitor network access
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Room booking systems
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Desk booking systems
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/multiple.svg"
                  className="icon"
                ></img>
                Workplace software/app
              </li>
            </ul>
          </p>
        </div>

        <div className="question__itm">
          <h3>
            Q10 How satisfied are you with these features in your organisation’s
            workplace (<span className="red">Workplace X</span>)? Select (x) if
            the feature is not provided.
          </h3>
          <p>
            <span className="blue">
              Only the features that were selected to be important in Q9 will
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

        <PageFooter type={isPage} page_number={10} total_pages={totalPages} />
      </div>

      <div className="page__item">
        <div className="question__itm">
          <h3>
            Q11 What impact do you think your organisation’s workplace (
            <span className="red">Workplace X</span>) has on the following?
          </h3>

          <p>
            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                The organisation’s workplace culture
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                The organisation’s image (for visitors, clients, potential
                recruits, etc.)
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                The organisation’s environmental sustainability
              </li>
            </ul>

            <ul className="spaced">
              <li>
                <img
                  src="/assets/images/svg-icons/support/scale.svg"
                  className="icon"
                ></img>
                Very negative impact
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/scale.svg"
                  className="icon"
                ></img>
                Negative impact
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/scale.svg"
                  className="icon"
                ></img>
                Slightly negative impact
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
                Slightly positive impact
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/scale.svg"
                  className="icon"
                ></img>
                Positive impact
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/scale.svg"
                  className="icon"
                ></img>
                Very positive impact
              </li>
            </ul>
          </p>
        </div>

        <div className="question__itm">
          <h3>
            Q12 How much do you agree with the following statements about your
            organisation’s workplace (<span className="red">Workplace X</span>)?
          </h3>

          <p>
            <ul className="spaced">
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
                It enables us to work productively
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                It supports me sharing ideas/knowledge among colleagues
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                It creates an enjoyable environment to work in
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
                It’s a place I’m proud to bring visitors to
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                Working here has a positive impact on my overall wellbeing
              </li>
              <li>
                <img
                  src="/assets/images/svg-icons/support/dropdown.svg"
                  className="icon"
                ></img>
                The design of my workplace is important to me
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

        <PageFooter type={isPage} page_number={11} total_pages={totalPages} />
      </div>
    </>
  )
}

export default OfficeExperience

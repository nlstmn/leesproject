/* eslint-disable jsx-a11y/alt-text */
import React from "react"
import { Table } from "antd"
export const StartEndSurveyContent = () => {
  return (
    <>
      <div className="info_-contnt">
        <p>
          We recommend the survey is kept open for 10 days. Ideally launch on a
          Wednesday morning and close the following Friday.
        </p>
        <p>
          This will be discussed with your Leesman point of contact, feel free
          to leave it blank is you are not sure yet.
        </p>
      </div>
    </>
  )
}

export const LanguagesContent = () => {
  return (
    <>
      <div className="info_-contnt">
        <p>
          For any personalised options, we will need you to provide us with the
          translation to all languages selected.
        </p>
      </div>
    </>
  )
}

export const RolesContent = () => {
  return (
    <>
      <div className="info_-contnt">
        <p>Senior Leader</p>
        <p>People Manager</p>
        <p>Individual Contributor</p>
      </div>
    </>
  )
}

export const ModulesContent = () => {
  return (
    <>
      <div className="info_-contnt">
        <p>
          Please enquire from your Leesman contact about the price list or for
          more information about the modules.
        </p>
      </div>
    </>
  )
}

export const QuestionContent = () => {
  return (
    <>
      <div className="info_-contnt">
        <p>
          Please enquire from your Leesman contact about the price list or for
          more information about the modules.
        </p>
        <p>
          If you have open comment box questions in mind, please specify them
          below.
        </p>
      </div>
    </>
  )
}

export const IntroContent = () => {
  return (
    <>
      <div className="info_-contnt large--_cnt">
        <div className="row clearfix">
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="text-_dv">
              <p>
                This survey is designed to give you the opportunity to tell us
                what you think about your current workplace.
              </p>
              <p>
                The responses from this survey will be pooled with all other
                responses so we can get a broad picture of how well your
                workplace currently supports your needs. The more responses we
                receive, the more accurate that picture will be. Your results
                will remain entirely confidential and anonymous.
              </p>
              <p>
                By entering your email address, you'll be able to log in and out
                of the survey. We will delete your email once the survey has
                closed.
              </p>
              <p>
                The survey should take around 11 minutes to complete and you are
                asked to submit your answers by close of business on 30
                December, 2022.
              </p>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6">
            <img src="/assets/images/content/intro.png"></img>
          </div>
        </div>
      </div>
    </>
  )
}

export const SignContent = () => {
  return (
    <>
      <div className="info_-contnt large--_cnt">
        <div className="row clearfix">
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="text-_dv">
              <p>Dr Peggie Rothe</p>
              <p>Chief Insights & Research Officer</p>
              <p>
                <strong>Leesman Index</strong>
              </p>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6">
            <img src="/assets/images/content/sign.png"></img>
          </div>
        </div>
      </div>
    </>
  )
}

export const CloseContent = () => {
  return (
    <>
      <div className="info_-contnt large--_cnt">
        <div className="row clearfix">
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="text-_dv">
              <p>
                Thank you for taking the time to fill In the survey. Your
                answers have been successfully submitted.
              </p>
              <p>
                We would like to reassure you again that the information
                provided is entirely anonymous and confldential.{" "}
                <a href="#!">(Please click here to view)</a>.
              </p>
              <p>
                Leesman helps organisations understand how well !heir employees
                are supported at work. If you would like to find out more about
                our work or subscribe to our Leesman review, please visit us at{" "}
                <a href="#!">leesmanindex.com</a>.
              </p>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6">
            <img src="/assets/images/content/closing.png"></img>
          </div>
        </div>
      </div>
    </>
  )
}

export const UploadContent = () => {
  return (
    <>
      <div className="info_-contnt">
        <p>
          Please only use the provided Excel document as the buildings, floors
          and departments lists have a specific needed structure.
        </p>
      </div>
    </>
  )
}

export const AccessInfo = () => {
  return (
    <>
      <div className="info_-contnt-create">
        <h2>Email domains</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        <div className="empty-_border"></div>

        <h2>IP Whitelist</h2>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>
      </div>
    </>
  )
}

export const CustomizationsInfo = () => {
  let data = [
    { type: "Headings", method: "# H1" + "## H2" + "### H3" },
    { type: "Italics", method: "*This text will render italic*" },
    { type: "Bold", method: "**This text will render bold**" },
    { type: "Blockquote", method: "> blockquote" },
    {
      type: "Ordered List",
      method: `1. First item \n
2. Second item \n
3. Third item`,
    },
    {
      type: "Unordered List",
      method: `- First item\n
- Second item\n
- Third item`,
    },
    { type: "Link", method: "[title](https://www.example.com)" },
    {
      type: "Add start date",
      method: "%start%",
    },
    {
      type: "Add end date",
      method: "%end%",
    },
  ]
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Method",
      dataIndex: "method",
    },
  ]
  return (
    <>
      <div className="info_-contnt-create">
        <Table dataSource={data} columns={columns} />
      </div>
    </>
  )
}

export const ActivityContent = () => {
  return (
    <>
      <div className="info_-contnt">
        <p>
          What proportion of the employees assigned to this workplace are
          working in the following types of roles?
        </p>
      </div>
    </>
  )
}

export const HomeContent = () => {
  return (
    <>
      <div className="info_-contnt">
        <p>
          What proportion of the employees assigned to this workplace have
          access to the following settings when working from home?
        </p>
      </div>
    </>
  )
}

export const SpesContent = () => {
  return (
    <>
      <div className="info_-contnt">
        <p>
          What proportion of the employees assigned to this workplace find the
          following activities and/or equipment important to their role?
        </p>
      </div>
    </>
  )
}

export const DensContent = () => {
  return (
    <>
      <div className="info_-contnt">
        <p>Input the average workspace (m2) per employee</p>
      </div>
    </>
  )
}

export const BufContent = () => {
  return (
    <>
      <div className="info_-contnt">
        <p>
          Nullam blandit odio sed mi accumsan mollis. Vivamus eu lectus eu orci
          accumsan Nullam blandit odio sed mi accumsan mollis.{" "}
        </p>
      </div>
    </>
  )
}

export const PieCContent = () => {
  return (
    <>
      <div className="info_-contnt">
        <p>
          Office-leaning profiles often work in roles that are collaborative
          and/or require equipment found in office settings.
        </p>

        <p>
          Remote-leaning profiles generally work in individual roles that demand
          acoustic privacy, the ability to focus, and few interactions with
          others.
        </p>

        <p>
          Balanced hybrid profiles tends to have complex roles that involve both
          collaborative and individual components and are not anchored to any
          location.
        </p>
      </div>
    </>
  )
}

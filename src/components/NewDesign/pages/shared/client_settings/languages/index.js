import React, { useEffect } from "react"
import { Table } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { getSurveyLanguagesAction } from "../../../../../../actions/adminActions"
import TranslationsModal from "./modal_translations"
import { useState } from "react"

const LanguageSettings = ({
  languagesSubMenu,
  isMenuSub,
  setMenuSub,
  isLanguageDrawer,
  setLanguageDrawer,
  isTranslationsDrawer,
  setTranslationsDrawer,
  isSurvey,
}) => {
  const dispatch = useDispatch()
  const languagesData = useSelector((store) => store.getSurveysLanguages)
  /* TODO: clientId has to be dynamic */
  const clientId = useSelector((store) => store.saveClientIdForSurveys)
  const surveyId = useSelector((store) => store.saveSurveyId.data)
  const [translationsModal, setTranslationsModal] = useState(false)

  useEffect(() => {
    dispatch(getSurveyLanguagesAction(clientId, surveyId))
  }, [])

  const columns = [
    {
      title: "Original",
      dataIndex: "original",
      key: "original",
      width: "300px",
    },
    {
      title: "English (UK)",
      dataIndex: "englishUK",
      key: "englishUK",
      render: (item) => (
        <div className="action_btns status">
          {item ? (
            <span className="cxv-status-complete-active-l-icn "></span>
          ) : (
            <span className="cxv-status-incomplete-l-icn "></span>
          )}
        </div>
      ),
    },
    {
      title: "English (US)",
      dataIndex: "englishUS",
      key: "englishUS",
      render: (item) => (
        <div className="action_btns status">
          {item ? (
            <span className="cxv-status-complete-active-l-icn "></span>
          ) : (
            <span className="cxv-status-incomplete-l-icn "></span>
          )}
        </div>
      ),
    },
    {
      title: "Dutch",
      dataIndex: "dutch",
      key: "dutch",
      render: (item) => (
        <div className="action_btns status">
          {item ? (
            <span className="cxv-status-complete-active-l-icn "></span>
          ) : (
            <span className="cxv-status-incomplete-l-icn "></span>
          )}
        </div>
      ),
    },
    {
      title: "German",
      dataIndex: "german",
      key: "german",
      render: (item) => (
        <div className="action_btns status">
          {item ? (
            <span className="cxv-status-complete-active-l-icn "></span>
          ) : (
            <span className="cxv-status-incomplete-l-icn "></span>
          )}
        </div>
      ),
    },
    {
      title: "Spanish(Spain)",
      dataIndex: "spanish",
      key: "spanish",
      render: (item) => (
        <div className="action_btns status">
          {item ? (
            <span className="cxv-status-complete-active-l-icn "></span>
          ) : (
            <span className="cxv-status-incomplete-l-icn "></span>
          )}
        </div>
      ),
    },
    {
      title: "Turkish",
      dataIndex: "turkish",
      key: "turkish",
      render: (item) => (
        <div className="action_btns status">
          {item ? (
            <span className="cxv-status-complete-active-l-icn "></span>
          ) : (
            <span className="cxv-status-incomplete-l-icn "></span>
          )}
        </div>
      ),
    },
    {
      title: "French (Canada)",
      dataIndex: "french",
      key: "french",
      render: (item) => (
        <div className="action_btns status">
          {item ? (
            <span className="cxv-status-complete-active-l-icn "></span>
          ) : (
            <span className="cxv-status-incomplete-l-icn "></span>
          )}
        </div>
      ),
    },
    // {
    //   title: "Translations",
    //   key: "translations",
    //   width: "130px",
    //   render: (_, record)=>{
    //     // eslint-disable-next-line jsx-a11y/anchor-is-valid
    //     return (<span style={{textAlign:"left"}}>Bulgarian: Test b, <a onClick={()=>{
    //       setTranslationsModal(true);
    //       console.log(translationsModal);
    //     }}>+3 more</a>
    //       </span>);
    //   }
    // },
    {
      title: "Action",
      key: "action",
      width: "130px",
      fixed: "right",
      render: (_, record) => {
        return (
          <div className="action_btns">
            <div className="fixed__btn">
              <button
                onClick={() => setTranslationsDrawer(true)}
                className="icon__btn"
              >
                <span className="cxv-settings-l-icn clients_table_drop"></span>
              </button>

              {/* <Switch size="small" defaultChecked /> */}
            </div>
          </div>
        )
      },
    },
  ]

  const data = [
    {
      key: "AB001",
      original: "Location Name…",
      englishUK: true,
      englishUS: true,
      dutch: true,
      german: true,
      spanish: true,
      turkish: true,
      french: true,
    },
    {
      key: "AB002",
      original: "Location Name…",
      englishUK: true,
      englishUS: true,
      dutch: true,
      german: true,
      spanish: true,
      turkish: true,
      french: false,
    },
    {
      key: "AB003",
      original: "Location Name…",
      englishUK: true,
      englishUS: true,
      dutch: true,
      german: true,
      spanish: true,
      turkish: false,
      french: false,
    },
    {
      key: "AB004",
      original: "Location Name…",
      englishUK: true,
      englishUS: true,
      dutch: true,
      german: true,
      spanish: false,
      turkish: false,
      french: false,
    },
    {
      key: "AB005",
      original: "Location Name…",
      englishUK: true,
      englishUS: true,
      dutch: true,
      german: false,
      spanish: false,
      turkish: false,
      french: false,
    },
  ]

  return (
    <>
      <TranslationsModal
        translationsModal={translationsModal}
        setTranslationsModal={setTranslationsModal}
      />
      <div className="n__card mt-0">
        <div className="n__body">
          <h3 className="">Languages & translations</h3>
          <div className="row">
            <div className="col-lg-12">
              <h4 className="sub_title">Languages</h4>
            </div>

            {!isSurvey && (
              <div className="l__block">
                <h5>Default language</h5>
                <ul>
                  <li>English (UK)</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-12">
          <div className="n__form_divider">
            <div className="n__divider"></div>
          </div>
        </div>

        <div className="col-lg-12">
          <h4 className="sub_title">Translations</h4>
        </div>

        {languagesSubMenu}

        <div className="col-lg-12">
          <div className="n_table center_labels first_not_center respo">
            <Table
              columns={columns}
              dataSource={data}
              expandable={{
                expandedRowRender: (record) => (
                  <Table
                    columns={columns}
                    style={{
                      margin: "32px 32px 32px 0px",
                      border: "none !important",
                    }}
                    dataSource={data}
                    pagination={false}
                  />
                ),
                rowExpandable: (record) => record.name !== "Not Expandable",
              }}
              pagination={false}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default LanguageSettings

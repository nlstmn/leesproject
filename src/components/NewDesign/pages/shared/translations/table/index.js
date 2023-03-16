import React, { useState } from "react"
import { Table } from "antd"

const TranslationsTable = ({
  setMenu,
  setMenuSub,
  isMenu,
  isMenuSub,
  goTop,
  isDrawerEditTranslation,
  setDrawerEditTranslation,
}) => {
  const columns = [
    {
      title: "##",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Main (English (UK))",
      dataIndex: "main",
      key: "main",
    },
    {
      title: "Translations",
      dataIndex: "translations",
      key: "translations",
      render: (_, { translations }) => (
        <>
          <ul className="translations_tags">
            {translations.map((tag) => {
              return <li className="table__type">{tag}</li>
            })}
          </ul>
        </>
      ),
    },
    {
      title: "Edit",
      key: "action",
      render: (_, record) => {
        return (
          <div className="action_btns">
            <button
              className="btn-dash-export"
              onClick={() => setDrawerEditTranslation(true)}
            >
              <span className="cxv-edit-l-icn"></span>
            </button>
          </div>
        )
      },
    },
  ]

  const data = [
    {
      key: "AB001",
      main: "CAMPUSAGREEMENT",
      translations: [
        "English (UK)",
        "Chinese (Hong Kong)",
        "Czech",
        "Danish",
        "Dutch",
        "Greek",
      ],
      translations_details: [
        "Chinese (Hong Kong): 您對下列與您大學環境相關的敘述的同意程度如何？",
        "English (UK): How much do you agree with the following statements about your university environment?",
        "Czech: Do jaké míry souhlasíte s následujícími výroky o vašem univerzitním prostředí?",
        "Danish: I hvor høj grad er du enig i de følgende udsagn om dit universitetsmiljø?",
        "Dutch: In hoeverre bent u het eens of oneens met de volgende uitspraken over uw universiteitsomgeving?",
        "Greek: Σε τι βαθμό συμφωνείτε ή διαφωνείτε με τις ακόλουθες δηλώσεις σχετικά με το πανεπιστημιακό σας περιβάλλον;",
      ],
    },
    {
      key: "AB002",
      main: "CAMPUSACTIVITY2",
      translations: ["English (UK)", "Hebrew", "Czech", "Danish"],
      translations_details: [
        "Chinese (Hong Kong): 您對下列與您大學環境相關的敘述的同意程度如何？",
        "English (UK): How much do you agree with the following statements about your university environment?",
        "Czech: Do jaké míry souhlasíte s následujícími výroky o vašem univerzitním prostředí?",
        "Danish: I hvor høj grad er du enig i de følgende udsagn om dit universitetsmiljø?",
        "Dutch: In hoeverre bent u het eens of oneens met de volgende uitspraken over uw universiteitsomgeving?",
        "Greek: Σε τι βαθμό συμφωνείτε ή διαφωνείτε με τις ακόλουθες δηλώσεις σχετικά με το πανεπιστημιακό σας περιβάλλον;",
      ],
    },
    {
      key: "AB003",
      main: "ADJACENCY",
      translations: ["English (UK)", "Italian", "Romanian", "Slovak"],
      translations_details: [
        "Chinese (Hong Kong): 您對下列與您大學環境相關的敘述的同意程度如何？",
        "English (UK): How much do you agree with the following statements about your university environment?",
        "Czech: Do jaké míry souhlasíte s následujícími výroky o vašem univerzitním prostředí?",
        "Danish: I hvor høj grad er du enig i de følgende udsagn om dit universitetsmiljø?",
        "Dutch: In hoeverre bent u het eens of oneens met de volgende uitspraken over uw universiteitsomgeving?",
        "Greek: Σε τι βαθμό συμφωνείτε ή διαφωνείτε με τις ακόλουθες δηλώσεις σχετικά με το πανεπιστημιακό σας περιβάλλον;",
      ],
    },
    {
      key: "AB004",
      main: "WELLBEING",
      translations: ["English (UK)", "Korean"],
      translations_details: [
        "Chinese (Hong Kong): 您對下列與您大學環境相關的敘述的同意程度如何？",
        "English (UK): How much do you agree with the following statements about your university environment?",
        "Czech: Do jaké míry souhlasíte s následujícími výroky o vašem univerzitním prostředí?",
        "Danish: I hvor høj grad er du enig i de følgende udsagn om dit universitetsmiljø?",
        "Dutch: In hoeverre bent u het eens of oneens met de volgende uitspraken over uw universiteitsomgeving?",
        "Greek: Σε τι βαθμό συμφωνείτε ή διαφωνείτε με τις ακόλουθες δηλώσεις σχετικά με το πανεπιστημιακό σας περιβάλλον;",
      ],
    },
    {
      key: "AB005",
      main: "INCWORKPLACE",
      translations: ["English (UK)"],
      translations_details: [
        "English (UK): How much do you agree with the following statements about your university environment?",
      ],
    },
    {
      key: "AB006",
      main: "RETAILDEMOGRAPHICS",
      translations: ["English (UK)", "Thai", "Turkish"],
      translations_details: [
        "Chinese (Hong Kong): 您對下列與您大學環境相關的敘述的同意程度如何？",
        "English (UK): How much do you agree with the following statements about your university environment?",
        "Czech: Do jaké míry souhlasíte s následujícími výroky o vašem univerzitním prostředí?",
        "Danish: I hvor høj grad er du enig i de følgende udsagn om dit universitetsmiljø?",
        "Dutch: In hoeverre bent u het eens of oneens met de volgende uitspraken over uw universiteitsomgeving?",
        "Greek: Σε τι βαθμό συμφωνείτε ή διαφωνείτε με τις ακόλουθες δηλώσεις σχετικά με το πανεπιστημιακό σας περιβάλλον;",
      ],
    },
  ]

  return (
    <>
      <div className="n__card hast__table mt-0">
        <div className="n__body">
          <h3 className="">{isMenu}</h3>
          {isMenu !== "Survey UI" ? (
            <span className="card_desc">
              Total: <strong>11 {isMenu}</strong>
            </span>
          ) : (
            <></>
          )}

          <div className="row">
            <div className="col-lg-12">
              <div className="n_table respo">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  expandable={{
                    expandedRowRender: (record) => (
                      <ul
                        className="locations"
                        style={{ padding: "15px", marginLeft: "40px" }}
                      >
                        {record.translations_details.map((item) => {
                          return <li>{item}</li>
                        })}
                      </ul>
                    ),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TranslationsTable

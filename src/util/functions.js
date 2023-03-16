import XLSX from "xlsx"
import CountryRegionData from "country-region-data"
import moment from "moment"
const regions = [
  "Europe",
  "Oceania",
  "Asia",
  "Africa",
  "North America",
  "Antarctica",
  "South America",
]
// Example result:
// {
//   cascade: [
//     {
//       key: "EUR",
//       title: "Europe",
//       children: [
//         {
//           key: "FR",
//           title: "France",
//           chidren: [
//             {
//               key: "FR-PRS",
//               title: "Paris",
//             },
//             // ...
//           ]
//         }
//       ]
//     }
//   ],
//   dropdown: [
//     {
//       key: "EUR",
//       title: "Europe"
//     },
//     // ...
//   ],
// }
//
// @returns { object } with structure above.

const countryRegionTable = [
  {
    Country: "Afghanistan",
    Region: regions[2],
  },
  {
    Country: "Åland Islands",
    Region: regions[0],
  },
  {
    Country: "Albania",
    Region: regions[0],
  },
  {
    Country: "Algeria",
    Region: regions[3],
  },
  {
    Country: "American Samoa",
    Region: regions[1],
  },
  {
    Country: "Andorra",
    Region: regions[0],
  },
  {
    Country: "Angola",
    Region: regions[3],
  },
  {
    Country: "Anguilla",
    Region: regions[4],
  },
  {
    Country: "Antarctica",
    Region: regions[5],
  },
  {
    Country: "Antigua and Barbuda",
    Region: regions[4],
  },
  {
    Country: "Argentina",
    Region: regions[6],
  },
  {
    Country: "Armenia",
    Region: regions[2],
  },
  {
    Country: "Aruba",
    Region: regions[4],
  },
  {
    Country: "Australia",
    Region: regions[1],
  },
  {
    Country: "Austria",
    Region: regions[0],
  },
  {
    Country: "Azerbaijan",
    Region: regions[2],
  },
  {
    Country: "Bahamas",
    Region: regions[4],
  },
  {
    Country: "Bahrain",
    Region: regions[2],
  },
  {
    Country: "Bangladesh",
    Region: regions[2],
  },
  {
    Country: "Barbados",
    Region: regions[4],
  },
  {
    Country: "Belarus",
    Region: regions[0],
  },
  {
    Country: "Belgium",
    Region: regions[0],
  },
  {
    Country: "Belize",
    Region: regions[4],
  },
  {
    Country: "Benin",
    Region: regions[3],
  },
  {
    Country: "Bermuda",
    Region: regions[4],
  },
  {
    Country: "Bhutan",
    Region: regions[2],
  },
  {
    Country: "Bolivia",
    Region: regions[6],
  },
  {
    Country: "Bonaire, Sint Eustatius and Saba",
    Region: regions[6],
  },

  {
    Country: "Bosnia and Herzegovina",
    Region: regions[0],
  },
  {
    Country: "Brunei Darussalam",
    Region: regions[2],
  },
  {
    Country: "Botswana",
    Region: regions[3],
  },
  {
    Country: "Bouvet Island",
    Region: regions[6],
  },
  {
    Country: "Brazil",
    Region: regions[6],
  },
  {
    Country: "British Indian Ocean Territory",
    Region: regions[3],
  },
  {
    Country: "Virgin Islands, British",
    Region: regions[4],
  },
  {
    Country: "Brunei",
    Region: regions[2],
  },
  {
    Country: "Bulgaria",
    Region: regions[0],
  },
  {
    Country: "Burkina Faso",
    Region: regions[3],
  },
  {
    Country: "Burundi",
    Region: regions[3],
  },
  {
    Country: "Cambodia",
    Region: regions[2],
  },
  {
    Country: "Cameroon",
    Region: regions[3],
  },
  {
    Country: "Canada",
    Region: regions[4],
  },
  {
    Country: "Cape Verde",
    Region: regions[3],
  },
  {
    Country: "Caribbean Netherlands",
    Region: regions[4],
  },
  {
    Country: "Cayman Islands",
    Region: regions[4],
  },
  {
    Country: "Central African Republic",
    Region: regions[3],
  },
  {
    Country: "Chad",
    Region: regions[3],
  },
  {
    Country: "Chile",
    Region: regions[6],
  },
  {
    Country: "China",
    Region: regions[2],
  },
  {
    Country: "Christmas Island",
    Region: regions[1],
  },
  {
    Country: "Cocos (Keeling) Islands",
    Region: regions[1],
  },
  {
    Country: "Colombia",
    Region: regions[6],
  },
  {
    Country: "Comoros",
    Region: regions[3],
  },
  {
    Country: "Cook Islands",
    Region: regions[1],
  },
  {
    Country: "Côte d'Ivoire, Republic of",
    Region: regions[0],
  },
  {
    Country: "Costa Rica",
    Region: regions[4],
  },
  {
    Country: "Croatia",
    Region: regions[0],
  },
  {
    Country: "Cuba",
    Region: regions[4],
  },
  {
    Country: "Curaçao",
    Region: regions[4],
  },
  {
    Country: "Cyprus",
    Region: regions[2],
  },
  {
    Country: "Czech Republic",
    Region: regions[0],
  },
  {
    Country: "Congo, Republic of the (Brazzaville)",
    Region: regions[3],
  },
  {
    Country: "Congo, the Democratic Republic of the (Kinshasa)",
    Region: regions[3],
  },
  {
    Country: "Denmark",
    Region: regions[0],
  },
  {
    Country: "Djibouti",
    Region: regions[3],
  },
  {
    Country: "Dominica",
    Region: regions[4],
  },
  {
    Country: "Dominican Republic",
    Region: regions[4],
  },
  {
    Country: "Timor-Leste",
    Region: regions[2],
  },
  {
    Country: "Ecuador",
    Region: regions[6],
  },
  {
    Country: "Egypt",
    Region: regions[3],
  },
  {
    Country: "El Salvador",
    Region: regions[4],
  },
  {
    Country: "Equatorial Guinea",
    Region: regions[3],
  },
  {
    Country: "Eritrea",
    Region: regions[3],
  },
  {
    Country: "Estonia",
    Region: regions[0],
  },
  {
    Country: "Ethiopia",
    Region: regions[3],
  },
  {
    Country: "Falkland Islands (Islas Malvinas)",
    Region: regions[6],
  },
  {
    Country: "Faroe Islands",
    Region: regions[0],
  },
  {
    Country: "Fiji",
    Region: regions[1],
  },
  {
    Country: "Finland",
    Region: regions[0],
  },
  {
    Country: "France",
    Region: regions[0],
  },
  {
    Country: "French Guiana",
    Region: regions[6],
  },
  {
    Country: "French Polynesia",
    Region: regions[1],
  },
  {
    Country: "French Southern and Antarctic Lands",
    Region: regions[3],
  },
  {
    Country: "Gabon",
    Region: regions[3],
  },
  {
    Country: "Gambia, The",
    Region: regions[3],
  },
  {
    Country: "Georgia",
    Region: regions[2],
  },
  {
    Country: "Germany",
    Region: regions[0],
  },
  {
    Country: "Ghana",
    Region: regions[3],
  },
  {
    Country: "Gibraltar",
    Region: regions[0],
  },
  {
    Country: "Greece",
    Region: regions[0],
  },
  {
    Country: "Greenland",
    Region: regions[4],
  },
  {
    Country: "Grenada",
    Region: regions[4],
  },
  {
    Country: "Guadeloupe",
    Region: regions[4],
  },
  {
    Country: "Guam",
    Region: regions[1],
  },
  {
    Country: "Guatemala",
    Region: regions[4],
  },
  {
    Country: "Guernsey",
    Region: regions[0],
  },
  {
    Country: "Guinea",
    Region: regions[3],
  },
  {
    Country: "Guinea-Bissau",
    Region: regions[3],
  },
  {
    Country: "Guyana",
    Region: regions[6],
  },
  {
    Country: "Haiti",
    Region: regions[4],
  },
  {
    Country: "Heard Island and McDonald Islands",
    Region: regions[1],
  },
  {
    Country: "Honduras",
    Region: regions[4],
  },
  {
    Country: "Hong Kong",
    Region: regions[2],
  },
  {
    Country: "Hungary",
    Region: regions[0],
  },
  {
    Country: "Iceland",
    Region: regions[0],
  },
  {
    Country: "India",
    Region: regions[2],
  },
  {
    Country: "Indonesia",
    Region: regions[2],
  },
  {
    Country: "Iran, Islamic Republic of",
    Region: regions[2],
  },
  {
    Country: "Iraq",
    Region: regions[2],
  },
  {
    Country: "Ireland",
    Region: regions[0],
  },
  {
    Country: "Isle of Man",
    Region: regions[0],
  },
  {
    Country: "Israel",
    Region: regions[2],
  },
  {
    Country: "Italy",
    Region: regions[0],
  },
  {
    Country: "Ivory Coast",
    Region: regions[3],
  },
  {
    Country: "Jamaica",
    Region: regions[4],
  },
  {
    Country: "Japan",
    Region: regions[2],
  },
  {
    Country: "Jersey",
    Region: regions[0],
  },
  {
    Country: "Jordan",
    Region: regions[2],
  },
  {
    Country: "Kazakhstan",
    Region: regions[2],
  },
  {
    Country: "Kenya",
    Region: regions[3],
  },
  {
    Country: "Kiribati",
    Region: regions[1],
  },
  {
    Country: "Kuwait",
    Region: regions[2],
  },
  {
    Country: "Kyrgyzstan",
    Region: regions[2],
  },
  {
    Country: "Laos",
    Region: regions[2],
  },
  {
    Country: "Latvia",
    Region: regions[0],
  },
  {
    Country: "Lebanon",
    Region: regions[2],
  },
  {
    Country: "Lesotho",
    Region: regions[3],
  },
  {
    Country: "Liberia",
    Region: regions[3],
  },
  {
    Country: "Libya",
    Region: regions[3],
  },
  {
    Country: "Liechtenstein",
    Region: regions[0],
  },
  {
    Country: "Lithuania",
    Region: regions[0],
  },
  {
    Country: "Luxembourg",
    Region: regions[0],
  },
  {
    Country: "Macao",
    Region: regions[2],
  },
  {
    Country: "Madagascar",
    Region: regions[3],
  },
  {
    Country: "Malawi",
    Region: regions[3],
  },
  {
    Country: "Malaysia",
    Region: regions[2],
  },
  {
    Country: "Maldives",
    Region: regions[2],
  },
  {
    Country: "Mali",
    Region: regions[3],
  },
  {
    Country: "Malta",
    Region: regions[0],
  },
  {
    Country: "Marshall Islands",
    Region: regions[1],
  },
  {
    Country: "Martinique",
    Region: regions[4],
  },
  {
    Country: "Mauritania",
    Region: regions[3],
  },
  {
    Country: "Mauritius",
    Region: regions[3],
  },
  {
    Country: "Mayotte",
    Region: regions[3],
  },
  {
    Country: "Mexico",
    Region: regions[4],
  },
  {
    Country: "Micronesia, Federated States of",
    Region: regions[1],
  },
  {
    Country: "Moldova",
    Region: regions[0],
  },
  {
    Country: "Monaco",
    Region: regions[0],
  },
  {
    Country: "Mongolia",
    Region: regions[2],
  },
  {
    Country: "Montenegro",
    Region: regions[0],
  },
  {
    Country: "Montserrat",
    Region: regions[4],
  },
  {
    Country: "Morocco",
    Region: regions[3],
  },
  {
    Country: "Mozambique",
    Region: regions[3],
  },
  {
    Country: "Myanmar",
    Region: regions[2],
  },
  {
    Country: "Namibia",
    Region: regions[3],
  },
  {
    Country: "Nauru",
    Region: regions[1],
  },
  {
    Country: "Nepal",
    Region: regions[2],
  },
  {
    Country: "Netherlands",
    Region: regions[0],
  },
  {
    Country: "New Caledonia",
    Region: regions[1],
  },
  {
    Country: "New Zealand",
    Region: regions[1],
  },
  {
    Country: "Nicaragua",
    Region: regions[4],
  },
  {
    Country: "Niger",
    Region: regions[3],
  },
  {
    Country: "Nigeria",
    Region: regions[3],
  },
  {
    Country: "Niue",
    Region: regions[1],
  },
  {
    Country: "Norfolk Island",
    Region: regions[1],
  },
  {
    Country: "Korea, Democratic People's Republic of",
    Region: regions[2],
  },
  {
    Country: "Macedonia, Republic of",
    Region: regions[0],
  },
  {
    Country: "Northern Mariana Islands",
    Region: regions[1],
  },
  {
    Country: "Norway",
    Region: regions[0],
  },
  {
    Country: "Oman",
    Region: regions[2],
  },
  {
    Country: "Pakistan",
    Region: regions[2],
  },
  {
    Country: "Palau",
    Region: regions[1],
  },
  {
    Country: "Palestine, State of",
    Region: regions[2],
  },
  {
    Country: "Panama",
    Region: regions[4],
  },
  {
    Country: "Papua New Guinea",
    Region: regions[1],
  },
  {
    Country: "Paraguay",
    Region: regions[6],
  },
  {
    Country: "Peru",
    Region: regions[6],
  },
  {
    Country: "Philippines",
    Region: regions[2],
  },
  {
    Country: "Pitcairn",
    Region: regions[1],
  },
  {
    Country: "Poland",
    Region: regions[0],
  },
  {
    Country: "Portugal",
    Region: regions[0],
  },
  {
    Country: "Puerto Rico",
    Region: regions[4],
  },
  {
    Country: "Qatar",
    Region: regions[2],
  },
  {
    Country: "Republic of the Congo",
    Region: regions[3],
  },
  {
    Country: "Réunion",
    Region: regions[3],
  },
  {
    Country: "Romania",
    Region: regions[0],
  },
  {
    Country: "Russian Federation",
    Region: regions[0],
  },
  {
    Country: "Rwanda",
    Region: regions[3],
  },
  {
    Country: "Saint Barthélemy",
    Region: regions[4],
  },
  {
    Country: "Saint Helena, Ascension and Tristan da Cunha",
    Region: regions[3],
  },
  {
    Country: "Saint Kitts and Nevis",
    Region: regions[4],
  },
  {
    Country: "Saint Lucia",
    Region: regions[4],
  },
  {
    Country: "Saint Martin",
    Region: regions[4],
  },
  {
    Country: "Saint Pierre and Miquelon",
    Region: regions[4],
  },
  {
    Country: "Saint Vincent and the Grenadines",
    Region: regions[4],
  },
  {
    Country: "Samoa",
    Region: regions[1],
  },
  {
    Country: "San Marino",
    Region: regions[0],
  },
  {
    Country: "Sao Tome and Principe",
    Region: regions[3],
  },
  {
    Country: "Sark",
    Region: regions[0],
  },
  {
    Country: "Saudi Arabia",
    Region: regions[2],
  },
  {
    Country: "Senegal",
    Region: regions[3],
  },
  {
    Country: "Serbia",
    Region: regions[0],
  },
  {
    Country: "Seychelles",
    Region: regions[3],
  },
  {
    Country: "Sierra Leone",
    Region: regions[3],
  },
  {
    Country: "Singapore",
    Region: regions[2],
  },
  {
    Country: "Sint Maarten (Dutch part)",
    Region: regions[4],
  },
  {
    Country: "Slovakia",
    Region: regions[0],
  },
  {
    Country: "Slovenia",
    Region: regions[0],
  },
  {
    Country: "Solomon Islands",
    Region: regions[1],
  },
  {
    Country: "Somalia",
    Region: regions[3],
  },
  {
    Country: "South Africa",
    Region: regions[3],
  },
  {
    Country: "South Georgia and South Sandwich Islands",
    Region: regions[6],
  },
  {
    Country: "Korea, Republic of",
    Region: regions[2],
  },
  {
    Country: "Kosovo",
    Region: regions[0],
  },
  {
    Country: "South Sudan",
    Region: regions[3],
  },
  {
    Country: "Spain",
    Region: regions[0],
  },
  {
    Country: "Sri Lanka",
    Region: regions[2],
  },
  {
    Country: "Sudan",
    Region: regions[3],
  },
  {
    Country: "Suriname",
    Region: regions[6],
  },
  {
    Country: "Svalbard and Jan Mayen Islands",
    Region: regions[0],
  },
  {
    Country: "Swaziland",
    Region: regions[3],
  },
  {
    Country: "Sweden",
    Region: regions[0],
  },
  {
    Country: "Switzerland",
    Region: regions[0],
  },
  {
    Country: "Syrian Arab Republic",
    Region: regions[2],
  },
  {
    Country: "Taiwan",
    Region: regions[2],
  },
  {
    Country: "Tajikistan",
    Region: regions[2],
  },
  {
    Country: "Tanzania, United Republic of",
    Region: regions[3],
  },
  {
    Country: "Thailand",
    Region: regions[2],
  },
  {
    Country: "Togo",
    Region: regions[3],
  },
  {
    Country: "Tokelau",
    Region: regions[1],
  },
  {
    Country: "Tonga",
    Region: regions[1],
  },
  {
    Country: "Trinidad and Tobago",
    Region: regions[4],
  },
  {
    Country: "Tunisia",
    Region: regions[3],
  },
  {
    Country: "Turkey",
    Region: regions[2],
  },
  {
    Country: "Turkmenistan",
    Region: regions[2],
  },
  {
    Country: "Turks and Caicos Islands",
    Region: regions[4],
  },
  {
    Country: "Tuvalu",
    Region: regions[1],
  },
  {
    Country: "Virgin Islands, U.S.",
    Region: regions[4],
  },
  {
    Country: "Uganda",
    Region: regions[3],
  },
  {
    Country: "Ukraine",
    Region: regions[0],
  },
  {
    Country: "United Arab Emirates",
    Region: regions[2],
  },
  {
    Country: "United Kingdom",
    Region: regions[0],
  },
  {
    Country: "United States",
    Region: regions[4],
  },
  {
    Country: "United States Minor Outlying Islands",
    Region: regions[1],
  },
  {
    Country: "Uruguay",
    Region: regions[6],
  },
  {
    Country: "Uzbekistan",
    Region: regions[2],
  },
  {
    Country: "Vanuatu",
    Region: regions[1],
  },
  {
    Country: "Holy See (Vatican City)",
    Region: regions[0],
  },
  {
    Country: "Venezuela, Bolivarian Republic of",
    Region: regions[6],
  },
  {
    Country: "Vietnam",
    Region: regions[2],
  },
  {
    Country: "Wallis and Futuna",
    Region: regions[1],
  },
  {
    Country: "Western Sahara",
    Region: regions[3],
  },
  {
    Country: "Yemen",
    Region: regions[2],
  },
  {
    Country: "Zambia",
    Region: regions[3],
  },
  {
    Country: "Zimbabwe",
    Region: regions[3],
  },
]

export function getRegionByShortCountryCode(country) {
  const countryName = CountryRegionData.filter(
    (i) => i.countryShortCode === country
  )[0].countryName
  return countryRegionTable.filter((i) => i.Country === countryName)[0].Region
}

export function getCountryByShortCode(country) {
  let l = CountryRegionData.filter((i) => i.countryShortCode === country)
  return l[0]
}
export function getCountryNameByShortCode(country) {
  let l = CountryRegionData.filter((i) => i.countryShortCode === country)
  return l[0] && l[0].countryName
}
export const checkDuplication = (label, alldata, checkedColumn) => {
  return alldata.map((i) => i[checkedColumn]).includes(label)
}
export function getRegionCountryCityTreeData(regions) {
  let dropdown = []
  let regions_ = regions?.map((i) => {
    return { key: i.id, title: i.label }
  })
  let countries = []
  let cities = []
  CountryRegionData.forEach((i) => {
    countries.push({ key: i.countryShortCode, title: i.countryName })
  })
  countries.forEach((i) => {
    CountryRegionData.filter(
      (item) => item.countryShortCode === i.key
    )[0].regions.forEach((e) => {
      cities.push({ key: i.key + "-" + e.shortCode, title: e.name })
    })
  })
  dropdown = dropdown.concat(regions_)
  dropdown = dropdown.concat(countries)
  dropdown = dropdown.concat(cities)

  return {
    cascade: regions?.map((i) => {
      return {
        key: i.id,
        title: i.label,
        children: CountryRegionData.filter((o) =>
          countryRegionTable
            .filter((R) => R.Region === i.label)
            .map((cc) => {
              return cc.Country
            })
            .includes(o.countryName)
        ).map((country) => {
          return {
            key: country.countryShortCode,
            title: country.countryName,
            children: country.regions.map((city) => {
              return {
                key: country.countryShortCode + "-" + city.shortCode,
                title: city.name,
              }
            }),
          }
        }),
      }
    }),
    dropdown: dropdown,
  }
}

export function customfilter(query, data, SearchAttributes, setBuffer) {
  console.log(query, data, SearchAttributes, setBuffer)
  let filteredData = []
  data.forEach((item) => {
    const arr = SearchAttributes.map((i) => {
      return String(item[i])?.toLowerCase()
    })

    arr.forEach((o) => {
      if (o.includes(query?.toString().toLowerCase())) {
        filteredData.push(item)
      }
    })
  })
  setBuffer([...new Set(filteredData)])
}
export const onlyIntArray = (arr) => {
  let buffer = []
  if (Array.isArray(arr)) {
    arr.forEach((i) => {
      if (!isNaN(parseInt(i))) {
        buffer.push(parseInt(i))
      }
    })
  } else {
    return [parseInt(arr)]
  }

  return buffer
}
export const findTextFromTranslations = (type, language_id, allLabels) => {
  return (
    allLabels?.filter(
      (i) =>
        i.type?.capitalize() === type?.capitalize() &&
        i.language_id === parseInt(language_id)
    )[0]?.label || type
  )
}
export const findDepartmentFromTranslations = (
  department_id,
  label,
  language_id,
  allLabels
) => {
  return (
    allLabels?.filter(
      (i) =>
        i.department_id === department_id &&
        i.language_id === parseInt(language_id)
    )[0]?.label || label
  )
}
export const findLocationFromTranslations = (
  location_id,
  label,
  language_id,
  allLabels
) => {
  return (
    allLabels?.filter(
      (i) =>
        i.location_id === location_id && i.language_id === parseInt(language_id)
    )[0]?.label || label
  )
}
export const findQuestionFromTranslations = (
  question_id,
  label,
  language_id,
  allLabels
) => {
  return allLabels?.filter(
    (i) =>
      i.question_id === question_id && i.language_id === parseInt(language_id)
  )[0]?.label
}
export const findHelpTextFromTranslations = (
  question_id,
  label,
  language_id,
  allLabels
) => {
  return (
    allLabels?.filter(
      (i) =>
        i.question_id === question_id && i.language_id === parseInt(language_id)
    )[0]?.help_text || label
  )
}
export const findHelpText2FromTranslations = (
  question_id,
  label,
  language_id,
  allLabels
) => {
  return (
    allLabels?.filter(
      (i) =>
        i.question_id === question_id && i.language_id === parseInt(language_id)
    )[0]?.help_text_2 || label
  )
}
export const findHelpTextFromOptionTranslations = (
  option_id,
  label,
  language_id,
  allLabels
) => {
  return (
    allLabels?.filter(
      (i) =>
        i.option_id === option_id && i.language_id === parseInt(language_id)
    )[0]?.help_text || label
  )
}
export const findHelpText2FromOptionTranslations = (
  option_id,
  label,
  language_id,
  allLabels
) => {
  return (
    allLabels?.filter(
      (i) =>
        i.option_id === option_id && i.language_id === parseInt(language_id)
    )[0]?.help_text_2 || label
  )
}
export const findOptionFromTranslations = (
  option_id,
  label,
  language_id,
  allLabels
) => {
  return allLabels?.filter(
    (i) => i.option_id === option_id && i.language_id === parseInt(language_id)
  )[0]?.label
}
export const findPageFromTranslations = (
  page_id,
  label,
  language_id,
  allLabels
) => {
  return allLabels?.filter(
    (i) => i.page_id === page_id && i.language_id === parseInt(language_id)
  )[0]?.heading
}
export const findTranslationFromData = (id, label, language_id, allLabels) => {
  //first look for page if not found
  //look for questions if not found
  //look for options
  if (parseInt(language_id) === 12) {
    return label
  } else {
    if (
      !findPageFromTranslations(
        id,
        label,
        language_id,
        allLabels?.pageTranslations
      )
    ) {
      //not found
      if (
        !findQuestionFromTranslations(
          id,
          label,
          language_id,
          allLabels?.questionTranslations
        )
      ) {
        //not found

        if (
          !findOptionFromTranslations(
            id,
            label,
            language_id,
            allLabels?.optionTranslations
          )
        ) {
          //not found
          return label
        } else {
          return findOptionFromTranslations(
            id,
            label,
            language_id,
            allLabels?.optionTranslations
          )
        }
      } else {
        return findQuestionFromTranslations(
          id,
          label,
          language_id,
          allLabels?.questionTranslations
        )
      }
    } else {
      return findPageFromTranslations(
        id,
        label,
        language_id,
        allLabels?.pageTranslations
      )
    }
  }
}
export const replaceJSX = (all, find, replace) => {
  console.log(all)
  return [...new Set(all?.split(find)?.flatMap((item) => [item, replace]))]
}
export const dbToTree = (data) => {
  const checkChild = (item) => {
    let findChild = []
    findChild = data.filter((i) => parseInt(i.parent_id) === parseInt(item.id))

    findChild = findChild?.sortAlphabetically("label").map((i) => {
      return [
        {
          key: i.id,
          title: i.label,
          children: checkChild(i).map((item) => item[0]),
        },
      ]
    })

    return findChild
  }

  return data
    ?.filter((i) => !i.parent_id)
    ?.sortAlphabetically("label")
    .map((i) => {
      return {
        key: i.id,
        title: i.label,
        children: checkChild(i).map((item) => item[0]),
      }
    })
}
export const modifyDates = (startDate, endDate, text) => {
  text = endDate
    ? text.replace("%end%", moment(endDate).format("YYYY-MM-DD"))
    : text.replace("%end%", "")
  text = startDate
    ? text.replace("%start%", moment(startDate).format("YYYY-MM-DD"))
    : text.replace("%start%", "")
  return text
}
export const getCampaingCurrentStatus = (record) => {
  let status = ""
  if (record.status === "active") {
    if (
      record.end_date &&
      moment(record.end_date).isBefore(moment().add(1, "days"))
    ) {
      status = "CLOSED"
    } else if (moment(record.start_date).isAfter(moment())) {
      status = "READY"
    } else {
      status = "ACTIVE"
    }
  } else if (record.status === "paused") {
    if (record.end_date) {
      if (moment(record.end_date).isBefore(moment().add(1, "days"))) {
        status = "CLOSED"
      } else {
        status = "PAUSED"
      }
    } else {
      status = "PAUSED"
    }
  } else {
    status = record.status && record.status.toUpperCase()
  }
  return status
}
export const findCascadePath = (id, data) => {
  let path = [id]
  const getParent = (data_id) => {
    const parent_id = data?.filter((i) => i.id === data_id)[0]?.parent_id
    path.push(parent_id)
    if (parent_id) {
      getParent(parent_id)
    }
  }
  getParent(id)
  path = path.filter((i) => i).reverse()

  return path
}

export const generateExcelByDataAndName = (name, data) => {
  var ws = XLSX.utils.json_to_sheet(data)

  /* add to workbook */
  var wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, "export")

  /* generate an XLSX file */
  XLSX.writeFile(wb, `${name}-export.xlsx`)
}

export const resetFilter = () => {
  sessionStorage.removeItem("sessionFilterData")
  window.location.reload(false)
}
String.prototype.splitDate = function () {
  return moment(this, "YYYY-MM-DD").format(moment.HTML5_FMT.DATE)
}
Array.prototype.Contains = function (other) {
  let i = this.length

  while (i--) {
    if (!other.includes(this[i])) {
      return false
    }
  }

  return true
}
Array.prototype.getFirstandLastThree = function () {
  return [...this.slice(0, 3), ...this.slice(this.length - 4, this.length - 1)]
}
Array.prototype.isSubset = function (arr2) {
  return this.every(
    (identifier) =>
      arr2?.findIndex((identifier1) => identifier1 === identifier) >= 0
  )
}
Array.prototype.isParentset = function (arr2) {
  return arr2.every(
    (identifier) =>
      this?.findIndex((identifier1) => identifier1 === identifier) >= 0
  )
}
Array.prototype.sortAlphabetically = function (attribute) {
  return this.sort((a, b) => {
    var textA = a[attribute]?.toUpperCase()
    var textB = b[attribute]?.toUpperCase()
    return textA < textB ? -1 : textA > textB ? 1 : 0
  })
}
Array.prototype.uniqueObjectArray = function (field) {
  var processed = []
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i].hasOwnProperty(field)) {
      if (processed.indexOf(this[i][field]) < 0) {
        processed.push(this[i][field])
      } else {
        this.splice(i, 1)
      }
    }
  }
  return processed
}
Array.prototype.hasIntersection = function (arr2) {
  let value = 0
  arr2.forEach((i) => {
    this.forEach((o) => {
      if (i === o) {
        value++
      }
    })
  })
  return value
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}
String.prototype.removeWhiteSpaces = () => {
  return (
    this && this.length > 0 && this.replace(/^[ ]+/g, "").replace(/[ ]+/g, "")
  )
}

export function truncate(string, length) {
  if (string?.length > length) return string.substring(0, length) + "..."
  else return string
}
export function makeUnique(data, attribute) {
  let arr = [...new Set(data?.map((i) => i[attribute]))]

  return arr?.map((i) => data?.filter((o) => o[attribute] === i)[0])
}
export function makeUniqueWithDoubleAttrubes(data, att1, att2) {
  let arr = data.map((i) => {
    return {
      [att1]: i[att1],
      [att2]: i[att2],
    }
  })
  arr = arr.map((i) => JSON.stringify(i))
  arr = [...new Set(arr)]
  arr = arr.map((i) => JSON.parse(i))

  return arr.map(
    (i) => data.filter((o) => i[att1] === o[att1] && i[att2] === o[att2])[0]
  )
}
export function makeUniqueWithTripleAttrubes(data, att1, att2, att3) {
  let arr = data.map((i) => {
    return {
      [att1]: i[att1],
      [att2]: i[att2],
      [att3]: i[att3],
    }
  })
  arr = arr.map((i) => JSON.stringify(i))
  arr = [...new Set(arr)]
  arr = arr.map((i) => JSON.parse(i))

  return arr.map(
    (i) =>
      data.filter(
        (o) => i[att1] === o[att1] && i[att2] === o[att2] && i[att3] === o[att3]
      )[0]
  )
}
export function makeUniqueWithfourthAttributes(data, att1, att2, att3, att4) {
  let arr = data.map((i) => {
    return {
      [att1]: i[att1],
      [att2]: i[att2],
      [att3]: i[att3],
      [att4]: i[att4],
    }
  })
  arr = arr.map((i) => JSON.stringify(i))
  arr = [...new Set(arr)]
  arr = arr.map((i) => JSON.parse(i))

  return arr.map(
    (i) =>
      data.filter(
        (o) =>
          i[att1] === o[att1] &&
          i[att2] === o[att2] &&
          i[att3] === o[att3] &&
          i[att4] === o[att4]
      )[0]
  )
}
export function makeUniqueWithAttributeArr(data, attributeArr) {
  let arr = data.map((i) => {
    let buffer = []
    attributeArr.forEach((att) => {
      buffer.push({ [att]: i[att] })
    })
    return buffer
  })
  arr = arr.map((i) => JSON.stringify(i))
  arr = [...new Set(arr)]
  arr = arr.map((i) => JSON.parse(i))

  return arr.map(
    (i) =>
      data.filter((o) =>
        arr.every(({ field, value }) => o[field] === i[field])
      )[0]
  )
}

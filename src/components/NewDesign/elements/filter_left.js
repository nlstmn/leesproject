import {Button, Drawer, Space} from "antd"
import React, {useContext, useEffect, useState} from "react"
import {AuthContext} from "../../../context/auth";

const LeftFilter = ({visibleDrawer, setVisibleDrawer, setDatasetModal}) => {
    const [isSelect, setSelect] = useState("")
    const [isReviewFilters, setReviewFilters] = useState(false);
    const [isManageFilters, setManageFilters] = useState(false);
    const {role} = useContext(AuthContext)
    const generalFilters = {
        "Building": [
            {id: 'b1', text: 'Building', isSelected: false},
        ],
        "Department": [
            {id: 'd1', text: 'Department', isSelected: false},
        ],
        "Demographics": [
            {id: 'role', text: 'Role', isSelected: false},
            {id: 'empType', text: 'Employment Type', isSelected: false},
            {id: 'TimeWidOrg', text: 'Time with organisation', isSelected: false},
            {id: 'ageGrp', text: 'Age Group', isSelected: false},
            {id: 'gender', text: 'Gender', isSelected: false},
            {
                id: 'other',
                text: 'Do you have disabilities, physical or mental health disabilities or a neurodiverse profile?',
                isSelected: false
            }
        ],
        "Mobility & Work environment": [
            {id: 'exMob', text: 'External Mobility', isSelected: false},
            {id: 'inMob', text: 'Internal Mobility', isSelected: false},
            {id: 'pws', text: 'Permanently assigned work setting?', isSelected: false},
            {id: 'ows', text: 'Office work setting', isSelected: false},
            {id: 'hws', text: 'Home work setting', isSelected: false},
            {id: 'poo', text: 'Presence of others', isSelected: false},
            {id: 'tah', text: 'Time at home % (0%, 1-25%, 26-50% etc)', isSelected: false},
            {id: 'tio', text: 'Time in office % (0%, 1-25%, 26-50% etc)', isSelected: false},
            {id: 'actvtyCmplxty', text: 'Activity complexity', isSelected: false},
            {id: 'icp', text: 'Individual/collaborative profile', isSelected: false},
        ],
        "Additional Questions": [
            {id: 'aq', text: 'Additional Questions', isSelected: false},
        ],
    }
    const adminFilters = {
        "Geographic": [
            {id: 'region', text: 'Region', isSelected: false},
            {id: 'country', text: 'Country', isSelected: false}
        ],
        "Industry": [
            {id: 'industry', text: 'industry', isSelected: false}
        ],
        "Building Information": [
            {id: 'assmntType', text: 'Assessment type (pre/post/standard)', isSelected: false},
            {id: 'totalIntrnl', text: 'Total net internal/usable area', isSelected: false},
            {id: 'NoOfFloors', text: 'Number of floors/levels', isSelected: false},
            {id: 'NoOfWs', text: 'Number of workstations', isSelected: false},
            {id: 'flxblWs', text: 'Assigned/flexible workstations %', isSelected: false},
            {id: 'mandateOfc', text: 'Mandate to use office', isSelected: false},
            {id: 'surveyReason', text: 'Survey reason', isSelected: false},
            {id: 'buildingLocation', text: 'Building location', isSelected: false},
            {id: 'occupancyStatus', text: 'Occupancy status', isSelected: false},
            {id: 'occupancyMix', text: 'Occupancy mix', isSelected: false},
            {id: 'dateMvd', text: 'Date organisation moved in', isSelected: false},
            {id: 'majorRfrbshmnt', text: 'Major refurbishment', isSelected: false},
            {id: 'workplaceCrtfctn', text: 'Workplace/bulding certification', isSelected: false}
        ]
    }
    const clientFilters = {
        "Client": [
            {id: 'sizeOrg', text: 'Size of organisation', isSelected: false},
            {id: 'Client', text: 'Client', isSelected: false}
        ],
        "Location Group": [
            {id: 'locGrp', text: 'Location Group', isSelected: false}
        ]
    }
    const [filters, setFilters] = useState(generalFilters);

    useEffect(() => {
        if ("Admin" === role || "Leesman Admin" === role) {
            setFilters({...filters, ...adminFilters});
        } else if ("Client" === role) {
            setFilters({...filters, ...clientFilters});
        }
    }, [role]);

    function handleCheckboxChange(event, sectionIndex, itemIndex) {
        const newFilters = {...filters};
        newFilters[sectionIndex][itemIndex].isSelected = event.target.checked;
        setFilters(newFilters);
    }

    function handleClearClick() {
        const newFilters = {...filters};
        Object.values(newFilters).forEach((sectionItems) => {
            sectionItems.forEach((item) => {
                item.isSelected = false;
            });
        });
        setReviewFilters(false);
        setFilters(newFilters);
    }

    function handleGetSelectedClick() {
        const selectedItems = [];
        Object.entries(filters).forEach(([sectionName, sectionItems]) => {
            sectionItems.forEach((item) => {
                if (item.isSelected) {
                    selectedItems.push({sectionName, ...item});
                }
            });
        });
        console.log(selectedItems);
    }

    return (
        <>
            <Drawer
                className="filter_drawer"
                title=""
                placement={"left"}
                onClose={() => setVisibleDrawer(false)}
                visible={visibleDrawer}
                extra={
                    <Space>
                        <Button onClick={() => setVisibleDrawer(false)}>Cancel</Button>
                        <Button type="primary" onClick={() => setVisibleDrawer(false)}>
                            OK
                        </Button>
                    </Space>
                }
            >
                <div className="n_drawer_body">
                    <button
                        onClick={() => setVisibleDrawer(false)}
                        className="drawer__close"
                    >
                        <span className="cxv-close-l-icn"/>
                    </button>
                    <div className="main__side">
                        <div className="left_side">
                            <h3>Filters</h3>
                            <ul>
                                {
                                    Object.keys(filters).map(sectionName => (
                                        <li
                                            className={`${
                                                isSelect === sectionName ? " active strong" : ""
                                            } `}
                                        >
                                            <button
                                                onClick={() => {setSelect(sectionName); setReviewFilters(false)}}
                                            >
                                                {sectionName}
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                            <button onClick={() => {setReviewFilters(true); setManageFilters(false);}} className="r__btn">
                                <span className="cxv-edit-l-icn"/> Review filters
                            </button>
                        </div>
                        <div className="right_side">
                            <div className="top_side">
                                {!isReviewFilters ? (
                                    <div className="drop_dash-search">
                                        <span className="cxv-search-l-icn icn"/>
                                        <input type="text" placeholder="Search"/>
                                    </div>
                                ) : (
                                    <h3>Review filters</h3>
                                )}
                                <button
                                    onClick={() => {setManageFilters(true);}}
                                    className="r__btn_2"
                                >
                                    Manage filters{" "}
                                    <span className="cxv-direct-to-other-page-l-icn"/>
                                </button>
                            </div>

                            {!isReviewFilters ? (
                                <div className="scroll_ul">
                                    <ul>
                                        {
                                            filters[isSelect]?.map(({id, text, isSelected}, itemIndex) => (
                                                <li key={`${isSelect}-${itemIndex}`}>
                                                    <label className="dashboard_check default__it">
                                                        <input
                                                            type="checkbox"
                                                            name={text}
                                                            value={id}
                                                            checked={isSelected}
                                                            onChange={(event) => handleCheckboxChange(event, isSelect, itemIndex)}
                                                        />
                                                        <span className="label-_text">{text}</span>
                                                        <span className="checkmark"/>
                                                    </label>
                                                </li>
                                            ))
                                        }
                                        {/* Create filter group */}
                                        <li>
                                            <button
                                                onClick={() => setDatasetModal(true)}
                                                className="r__btn create"
                                            >
                                                <span className="cxv-create-new-group-l-icn"/>{" "}
                                                Create filter group
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                isManageFilters ? (
                                    <div className="scroll_ul">
                                        <ul className="ul_type_2">
                                            {Object.entries(filters).map(([sectionName, sectionItems], sectionIndex) => (
                                                <>
                                                    {
                                                        sectionItems.filter(value => value.isSelected).length > 0 ? (
                                                                <li>
                                                                    <h4>{sectionName}</h4>
                                                                </li>
                                                            )
                                                            : ""
                                                    }
                                                    {sectionItems.map(({text, isSelected}, itemIndex) => (
                                                        sectionItems.filter(value => value.isSelected).length > 0 ? (
                                                                <li key={`${sectionName}-${itemIndex}`}>
                                                                    <label className="dashboard_check default__it">
                                                                        <input
                                                                            type="checkbox"
                                                                            name={text}
                                                                            value={isSelected}
                                                                            checked={isSelected}
                                                                            onChange={(event) => handleCheckboxChange(event, sectionName, itemIndex)}
                                                                        />
                                                                        <span className="label-_text">{text}</span>
                                                                        <span className="checkmark"/>
                                                                    </label>
                                                                </li>
                                                            )
                                                            : ""
                                                    ))
                                                    }
                                                </>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <div className="scroll_ul">
                                        <ul className="ul_type_2">
                                            {Object.entries(filters).map(([sectionName, sectionItems], sectionIndex) => (
                                                <>
                                                    {
                                                        sectionItems.filter(value => value.isSelected).length > 0 ? (
                                                                <li>
                                                                    <h4>{sectionName}</h4>
                                                                </li>
                                                            )
                                                            : ""
                                                    }
                                                    {sectionItems.map(({text, isSelected}, itemIndex) => (
                                                        isSelected ? (
                                                            <li key={`${sectionName}-${itemIndex}`}>
                                                                <label className="dashboard_check default__it">
                                                                    <input
                                                                        type="checkbox"
                                                                        name={text}
                                                                        value={isSelected}
                                                                        checked={isSelected}
                                                                        onChange={(event) => handleCheckboxChange(event, sectionName, itemIndex)}
                                                                    />
                                                                    <span className="label-_text">{text}</span>
                                                                    <span className="checkmark"/>
                                                                </label>
                                                            </li>
                                                        ) : ""
                                                    ))
                                                    }
                                                </>
                                            ))}
                                        </ul>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div className="bottom_side">
                        <div className="bottom_info">
                            <div className="line"/>
                            <p>
                                Select all required filters from within each category above and
                                click <strong>‘Apply’</strong>.
                            </p>
                        </div>

                        <div>
                            <button className="btn-dash dark float-right tt" style={{marginLeft:"1rem"}} onClick={handleClearClick}>Clear</button>
                            <button className="btn-dash dark float-right tt" onClick={handleGetSelectedClick}>Apply
                            </button>

                            {isReviewFilters && (
                                <button className="btn-dash outline float-right tt mr-4">
                                    Save as dataset
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </Drawer>
        </>
    )
}

export default LeftFilter

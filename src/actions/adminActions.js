import axios from "axios"
import { notification } from "antd"
export const userManagementDepartmentsAction =
  (urlHeader) => async (dispatch) => {
    dispatch({ type: "Departments_Fetch_Request" })
    try {
      const { data } = await axios.get(`${urlHeader}/departments`)
      dispatch({ type: "Departments_Fetch_Success", payload: data.result })
    } catch (error) {
      dispatch({ type: "Departments_Fetch_Failed", payload: error })
      notification.warning({ message: "No client found!" })
    }
  }

export const userManagementLocationsAction =
  (urlHeader) => async (dispatch) => {
    dispatch({ type: "Locations_Fetch_Request" })
    try {
      const { data } = await axios.get(`${urlHeader}/locations`)
      dispatch({ type: "Locations_Fetch_Success", payload: data.result })
    } catch (error) {
      dispatch({ type: "Locations_Fetch_Failed", payload: error })
      notification.warning({ message: "No client found!" })
    }
  }

export const userManagementUsersAction = (urlHeader) => async (dispatch) => {
  dispatch({ type: "Users_Fetch_Request" })
  try {
    const { data } = await axios.get(`${urlHeader}/users`)
    dispatch({ type: "Users_Fetch_Success", payload: data.result })
  } catch (error) {
    dispatch({ type: "Users_Fetch_Failed", payload: error })
    notification.warning({ message: "No client found!" })
  }
}

export const userManagementDomainHeaderAction =
  (domainHeader) => async (dispatch) => {
    dispatch({ type: "CampaignBufferRatesAllData_Fetch_Request" })
    try {
      const { data } = await axios.get(`${domainHeader}`)
      dispatch({
        type: "DomainHeader_Fetch_Success",
        payload: data.result.map((i) => i.name),
      })
    } catch (error) {
      dispatch({ type: "DomainHeader_Fetch_Failed", payload: error })
      notification.warning({ message: "No client found!" })
    }
  }

// Campaign All Data

export const CampaignBasicBufferAllDataAction = (lData) => async (dispatch) => {
  dispatch({ type: "CampaignBasicBufferAllData_Fetch_Request" })
  try {
    const { data } = await axios.post(`/metrics`, lData)
    dispatch({
      type: "CampaignBasicBufferAllData_Fetch_Success",
      payload: data.campaign_breakdown_bar,
    })
  } catch (error) {
    dispatch({
      type: "CampaignBasicBufferAllData_Fetch_Failed",
      payload: error,
    })
    notification.warning({ message: "No client found!" })
  }
}

export const CampaignBufferCommentAllDataAction =
  (lData) => async (dispatch) => {
    dispatch({ type: "CampaignBufferCommentAllData_Fetch_Request" })
    try {
      const { data } = await axios.post(`/metrics`, lData)
      dispatch({
        type: "CampaignBufferCommentAllData_Fetch_Success",
        payload: data.campaign_comments,
      })
    } catch (error) {
      dispatch({
        type: "CampaignBufferCommentAllData_Fetch_Failed",
        payload: error,
      })
      notification.warning({ message: "No client found!" })
    }
  }

export const CampaignBufferRatesAllDataAction = (lData) => async (dispatch) => {
  dispatch({ type: "CampaignBufferRatesAllData_Fetch_Request" })
  try {
    const { data } = await axios.post(`/metrics`, lData)
    dispatch({ type: "DomainHeader_Fetch_Success", payload: data.res })
  } catch (error) {
    dispatch({ type: "DomainHeader_Fetch_Failed", payload: error })
    notification.warning({ message: "No client found!" })
  }
}

export const CampaignCommentAllDataAction = (lData) => async (dispatch) => {
  dispatch({ type: "CampaignCommentAllData_Fetch_Request" })
  try {
    const { data } = await axios.post(`/metrics`, lData)
    dispatch({
      type: "CampaignCommentAllData_Fetch_Success",
      payload: data.result.campaign_comments,
    })
  } catch (error) {
    dispatch({ type: "CampaignCommentAllData_Fetch_Failed", payload: error })
    notification.warning({ message: "No client found!" })
  }
}

export const CampaignStatsAllDataAction = (lData) => async (dispatch) => {
  dispatch({ type: "CampaignStatsAllData_Fetch_Request" })
  try {
    const { data } = await axios.post(`/metrics`, lData)
    dispatch({
      type: "CampaignStatsAllData_Fetch_Success",
      payload: data.stats,
    })
  } catch (error) {
    dispatch({ type: "CampaignStatsAllData_Fetch_Failed", payload: error })
    notification.warning({ message: "No client found!" })
  }
}

export const CampaignRatesAllDataAction = (lData) => async (dispatch) => {
  dispatch({ type: "CampaignRatesAllData_Fetch_Request" })
  try {
    const { data } = await axios.post(`/metrics`, lData)
    dispatch({
      type: "CampaignRatesAllData_Fetch_Success",
      payload: data.rates,
    })
  } catch (error) {
    dispatch({ type: "CampaignRatesAllData_Fetch_Failed", payload: error })
    notification.warning({ message: "No client found!" })
  }
}

export const CampaignBarAllDataAction = (lData) => async (dispatch) => {
  dispatch({ type: "CampaignBarAllData_Fetch_Request" })
  try {
    const { data } = await axios.post(`/metrics`, lData)
    dispatch({
      type: "CampaignBarAllData_Fetch_Success",
      payload: data.campaign_breakdown_bar,
    })
  } catch (error) {
    dispatch({ type: "CampaignBarAllData_Fetch_Failed", payload: error })
    notification.warning({ message: "No client found!" })
  }
}

export const CampaignHeatAllDataAction = (lData) => async (dispatch) => {
  dispatch({ type: "CampaignHeatAllData_Fetch_Request" })
  try {
    const { data } = await axios.post(`/metrics`, lData)
    dispatch({
      type: "CampaignHeatAllData_Fetch_Success",
      payload: data.campaign_comparison_heat,
    })
  } catch (error) {
    dispatch({ type: "CampaignHeatAllData_Fetch_Failed", payload: error })
    notification.warning({ message: "No client found!" })
  }
}
export const CampaignHeatBufferAllDataAction = (lData) => async (dispatch) => {
  dispatch({ type: "CampaignHeatBufferAllData_Fetch_Request" })
  try {
    const { data } = await axios.post(`/metrics`, lData)
    dispatch({
      type: "CampaignHeatBufferAllData_Fetch_Success",
      payload: data.campaign_comparison_heat,
    })
  } catch (error) {
    dispatch({ type: "CampaignHeatBufferAllData_Fetch_Failed", payload: error })
    notification.warning({ message: "No client found!" })
  }
}

export const campaignMainAction = (clientId, id) => async (dispatch) => {
  dispatch({ type: "CampaignMain_Request" })
  try {
    const { data } = await axios.get(
      `/admin/clients/${clientId}/campaigns/${id}`
    )
    dispatch({
      type: "CampaignMain_Success",
      payload: {
        selectedQuestions: data.questions,
        demos: data.demos,
        locations: data.locations,
        departments: data.departments,
      },
    })
  } catch (error) {
    dispatch({ type: "CampaignMain_Failed", payload: error })
    notification.warning({ message: "No client found!" })
  }
}

export const campaignMainByIDAction = (clientId) => async (dispatch) => {
  dispatch({ type: "CampaignMainID_Request" })
  try {
    const { data } = await axios.get(
      `/admin/clients/${clientId}/campaigns/init`
    )
    dispatch({
      type: "CampaignMainID_Success",
      payload: {
        selectedQuestions: data.questions,
        demos: data.demos,
        locations: data.locations,
        departments: data.departments,
        formData: data.result,
        regions: data.regions,
      },
    })
  } catch (error) {
    dispatch({ type: "CampaignMainID_Failed", payload: error })
    notification.warning({ message: "No client found!" })
  }
}

export const getPreferencesDemographicAction =
  (clientId) => async (dispatch) => {
    dispatch({ type: "PreferencesDemographic_Request" })
    try {
      const { data } = await axios.get(
        `/admin/clients/${clientId}/demographics`
      )
      dispatch({
        type: "PreferencesDemographic_Success",
        payload: {
          options: data.result,
          data,
        },
      })
    } catch (error) {
      dispatch({ type: "PreferencesDemographic_Failed", payload: error })
      notification.warning({ message: "No client found!" })
    }
  }

export const sendPreferencesDemographicAction =
  (clientId, selections) => async (dispatch) => {
    dispatch({ type: "SendPreferencesDemographic_Request" })
    try {
      const { data } = await axios.post(
        `/admin/clients/${clientId}/demographics`,
        selections
      )
      dispatch({ type: "SendPreferencesDemographic_Success" })
    } catch (error) {
      dispatch({ type: "SendPreferencesDemographic_Failed", payload: error })
      notification.warning({ message: "No client found!" })
    }
  }

export const toggleEnableDepartmentAction =
  (clientId, id, enable) => async (dispatch) => {
    dispatch({ type: "ToggleEnableDepartment_Request" })
    try {
      const { data } = await axios.put(
        `/admin/clients/${clientId}/departments/${id}`,
        { enable: !enable }
      )
      dispatch({ type: "ToggleEnableDepartment_Success" })
    } catch (error) {
      dispatch({ type: "ToggleEnableDepartment_Failed", payload: error })
      notification.warning({ message: "No client found!" })
    }
  }

export const deleteAllNonUsedDepartmentsAction =
  (clientId) => async (dispatch) => {
    dispatch({ type: "DeleteAllNonUsedDepartments_Request" })
    try {
      const { data } = await axios.delete(
        `/admin/clients/${clientId}/departments/bulk`
      )
      dispatch({ type: "DeleteAllNonUsedDepartments_Success" })
    } catch (error) {
      dispatch({ type: "DeleteAllNonUsedDepartments_Failed", payload: error })
      notification.warning({ message: "No client found!" })
    }
  }

export const sendDepartmentsDepartmentsAction =
  (clientId, eData) => async (dispatch) => {
    dispatch({ type: "SendDepartments_Request" })
    try {
      const { data } = await axios.post(
        `/admin/clients/${clientId}/departments`,
        eData
      )
      dispatch({ type: "SendDepartments_Success" })
    } catch (error) {
      dispatch({ type: "SendDepartments_Failed", payload: error })
      notification.warning({ message: "No client found!" })
    }
  }

export const sendDepartmentsDepartmentsEditAction =
  (clientId, isEdit) => async (dispatch) => {
    dispatch({ type: "SendDepartmentsEdit_Request" })
    try {
      const { data } = await axios.put(
        `/admin/clients/${clientId}/departments/` + isEdit,
        [
          {
            lang_id:
              localStorage.getItem("selectedClientLang") &&
              localStorage.getItem("selectedClientLang") !== "undefined"
                ? localStorage.getItem("selectedClientLang")
                : 12,
          },
        ]
      )
      dispatch({ type: "SendDepartmentsEdit_Success" })
    } catch (error) {
      dispatch({ type: "SendDepartmentsEdit_Failed", payload: error })
      notification.warning({ message: "No client found!" })
    }
  }

export const floorListDeleteLocationAction =
  (clientId, locationId) => async (dispatch) => {
    dispatch({ type: "DeleteLocationFloor_Request" })
    try {
      const { data } = await axios.delete(
        `/admin/clients/${clientId}/locations/${locationId}/deletefloors`
      )
      dispatch({ type: "DeleteLocationFloor_Success" })
    } catch (error) {
      dispatch({ type: "DeleteLocationFloor_Failed", payload: error })
      notification.warning({ message: "No client found!" })
    }
  }

export const getLocationFloorDataAction = (clientId) => async (dispatch) => {
  dispatch({ type: "GetFloorLocationData_Request" })
  try {
    const { data } = await axios.get(
      `/admin/clients/${clientId}/locations/floors`
    )
    dispatch({
      type: "GetFloorLocationData_Success",
      payload: {
        floorData: data.result,
      },
    })
  } catch (error) {
    dispatch({ type: "GetFloorLocationData_Failed", payload: error })
    notification.warning({ message: "No client found!" })
  }
}

export const getFloorDataAction = (clientId) => async (dispatch) => {
  dispatch({ type: "GetFloorData_Request" })
  try {
    const { data } = await axios.get(`/admin/clients/${clientId}/locations`)
    dispatch({
      type: "GetFloorData_Success",
      payload: {
        locationData: data.result,
      },
    })
  } catch (error) {
    dispatch({ type: "GetFloorData_Failed", payload: error })
    notification.warning({ message: "No client found!" })
  }
}

export const getHelpDeskDataAction = (clientId) => async (dispatch) => {
  dispatch({ type: "HelpDeskGet_Request" })
  try {
    const { data } = await axios.get(`/admin/clients/${clientId}/helpdesk`)
    dispatch({
      type: "HelpDeskGet_Success",
      payload: {
        modalData: data.modalData,
        data: data.helpdeskData,
      },
    })
  } catch (error) {
    dispatch({ type: "HelpDeskGet_Failed", payload: error })
    notification.warning({ message: "No client found!" })
  }
}

export const getlocationGroupListAction = (clientId) => async (dispatch) => {
  dispatch({ type: "GetlocationGroupList_Request" })
  try {
    const { data } = await axios.get(
      `/admin/clients/${clientId}/locations/location_groups`
    )
    dispatch({
      type: "GetlocationGroupList_Success",
      payload: {
        locationGroupData: data.result,
      },
    })
  } catch (error) {
    dispatch({ type: "GetlocationGroupList_Failed", payload: error })
    notification.warning({ message: "No client found!" })
  }
}

export const getLocationDataAction = (clientId) => async (dispatch) => {
  dispatch({ type: "GetLocationData_Request" })
  try {
    const { data } = await axios.get(`/admin/clients/${clientId}/locations`)
    dispatch({
      type: "GetLocationData_Success",
      payload: {
        locationData: data.result,
      },
    })
  } catch (error) {
    dispatch({ type: "GetLocationData_Failed", payload: error })
    notification.warning({ message: "No client found!" })
  }
}

export const locationListDataAction = (clientId) => async (dispatch) => {
  dispatch({ type: "LocationList_Request" })
  try {
    const { data } = await axios.get(`/admin/clients/${clientId}/locations`)
    dispatch({
      type: "LocationList_Success",
      payload: {
        populateLocation: data.result,
        data: data.regionData,
      },
    })
  } catch (error) {
    dispatch({ type: "LocationList_Failed", payload: error })
    notification.warning({ message: "No client found!" })
  }
}

export const getNotificationManagementAction =
  (clientId) => async (dispatch) => {
    dispatch({ type: "LocationList_Request" })
    try {
      const { data } = await axios.get(
        `/admin/clients/${clientId}/notifications`
      )
      dispatch({
        type: "LocationList_Success",
        payload: {
          questions: data.modalData.questions,
          locations: data.modalData.locations,
          campaigns: data.modalData.campaigns,
          notifications: data.notificationData,
          data: data.modalData.questions,
        },
      })
    } catch (error) {
      dispatch({ type: "LocationList_Failed", payload: error })
      notification.warning({ message: "No client found!" })
    }
  }

export const clientsManagementAction =
  ({ searchKey = "", pageId = 1, letterOne = "", letterTwo = "", clientId }) =>
  async (dispatch) => {
    dispatch({ type: "ClientsManagementSearch_Request" })
    try {
      const { data } = await axios.get(
        `v2admin/clients/${clientId}/clientmanagement`,
        {
          params: { searchKey, pageId, letterOne, letterTwo },
        }
      )
      dispatch({
        type: "ClientsManagementSearch_Success",
        payload: {
          clientList: data.clientList,
          totalClientsCount: data.totalClientCount,
          clientsCountWithParameter: data.clientsCountWithParameter,
          totalPageCount: data.totalPageCount,
        },
      })
    } catch (error) {
      dispatch({ type: "ClientsManagementSearch_Failed", payload: error })

      notification.warning({ message: "Internal Server Error!" })
    }
  }

export const surveysManagementAction =
  ({ surveyStatus = "live", pageNumber = 1, clientId = 1 }) =>
  async (dispatch) => {
    dispatch({ type: "SurveysManagement_Request" })
    try {
      const { data } = await axios.get(`v2admin/clients/${clientId}/surveys`, {
        params: { surveyStatus, pageNumber },
      })
      dispatch({
        type: "SurveysManagement_Success",
        payload: {
          surveysList: data.result,
          totalSurveysCount: data.pageDetails.totalCount,
          totalPageCount: data.pageDetails.totalPageCount,
        },
      })
    } catch (error) {
      dispatch({ type: "ClientsManagementSearch_Failed", payload: error })
      notification.warning({ message: "Internal Server Error!" })
    }
  }

export const getSurveySetupAction =
  ({ clientId = 0, tab = "generalSetup" }) =>
  async (dispatch) => {
    dispatch({ type: "GetSurveySetupData_Request" })
    await axios
      .get(`v2admin/clients/${clientId}/surveys/setup-data`, {
        params: { tab: tab },
      })
      .then((res) => {
        console.log("RESPONSE", res)
        dispatch({ type: "GetSurveySetupData_Success", payload: res.data })
      })
      .catch((error) => {
        dispatch({ type: "GetSurveySetupData_Failed", payload: error })
        notification.warning({ message: "Internal Server Error!" })
      })
  }
export const getOtherSurveySetupAction =
  ({ clientId = 0, tab = "demographics", surveyId = "3499" }) =>
  async (dispatch) => {
    dispatch({ type: "GetOtherSurveySetupData_Request" })
    await axios
      .get(`v2admin/clients/${clientId}/surveys/${surveyId}`, {
        params: { tab: tab },
      })
      .then((res) => {
        dispatch({ type: "GetOtherSurveySetupData_Success", payload: res.data })
      })
      .catch((error) => {
        dispatch({ type: "GetOtherSurveySetupData_Failed", payload: error })
        notification.warning({ message: "Internal Server Error!" })
      })
  }

export const dropdownDepartmentsAction = (clientId) => async (dispatch) => {
  dispatch({ type: "DropdownDepartments_Request" })
  await axios
    .get(`v2admin/clients/${clientId}/departments`)
    .then((res) => {
      dispatch({
        type: "DropdownDepartments_Success",
        payload: { departments: res.data },
      })
    })
    .catch((error) => {
      dispatch({ type: "DropdownDepartments_Failed", payload: error })
      notification.warning({ message: "Internal Server Error!" })
    })
}

export const exportClientsAction = () => async (dispatch) => {
  dispatch({ type: "ExportClients_Request" })
  try {
    const response = await axios.get(`/clientlist/exportxlsx`)
    dispatch({
      type: "ExportClients_Success",
      payload: {
        result: true,
      },
    })
  } catch (error) {
    dispatch({ type: "ExportClients_Failed", payload: error })
    notification.warning({ message: "Internal Server Error!" })
  }
}

export const saveClientsMainSettingsAction =
  ({
    name = "",
    industry = 0,
    website = "",
    language = "tr",
    clientRefNo = "",
    inviteCode = "",
    enableFeedbacks = false,
    enableQuestions = false,
    enableXp = false,
    enableInside = false,
    clientId,
  }) =>
  async (dispatch) => {
    dispatch({ type: "SaveClientsMainSettings_Request" })
    try {
      const response = await axios.post(
        `v2admin/clients/${clientId}/clientmanagement`,
        {
          name: name,
          industry: industry,
          website: website,
          language: language,
          clientRefNo: clientRefNo,
          invite_code: inviteCode,
          enable_feedbacks: enableFeedbacks,
          enable_questions: enableQuestions,
          enable_xp: enableXp,
          enable_inside: enableInside,
        }
      )
      dispatch({
        type: "SaveClientsMainSettings_Success",
        payload: {
          response: response,
        },
      })
    } catch (error) {
      dispatch({ type: "SaveClientsMainSettings_Failed", payload: error })
      notification.warning({ message: "Internal Server Error!" })
    }
  }

export const updateClientsMainSettingsAction =
  (
    clientId,
    {
      name = "",
      industry = 0,
      website = "",
      clientRefNo = "",
      enableFeedbacks = false,
      enableQuestions = false,
      enableXp = false,
      enableInside = false,
      enableHybridFuture = false,
      hybridOrganizationName = "",
    }
  ) =>
  async (dispatch) => {
    dispatch({ type: "UpdateClientsMainSettings_Request" })
    try {
      const response = await axios.put(
        `v2admin/clients/${clientId}/clientmanagement`,
        {
          name: name,
          industry: parseInt(industry),
          website: website,
          clientRefNo: clientRefNo,
          enable_feedbacks: enableFeedbacks,
          enable_questions: enableQuestions,
          enable_xp: enableXp,
          enable_inside: enableInside,
          enable_hybrid_future: enableHybridFuture,
          hybrid_organization_name: hybridOrganizationName,
        }
      )
      dispatch({
        type: "UpdateClientsMainSettings_Success",
        payload: {
          response: response,
        },
      })
      notification.success({ message: "Client data updated successfully." })
    } catch (error) {
      dispatch({ type: "UpdateClientsMainSettings_Failed", payload: error })
      notification.warning({ message: "Failed to Update Clients!" })
    }
  }

export const getSurveyLanguagesAction =
  (clientId, surveyId) => async (dispatch) => {
    dispatch({ type: "GetSurveysLanguages_Request" })
    try {
      const { data } = await axios.get(
        `v2admin/clients/${clientId}/surveys/${surveyId}`,
        { params: { tab: "languages" } }
      )
      dispatch({ type: "GetSurveysLanguages_Success", payload: data })
    } catch (error) {
      dispatch({ type: "GetSurveysLanguages_Failed", payload: error })
    }
  }

export const getAllLanguages = (id) => async (dispatch) => {
  dispatch({ type: "GetAllLanguages_Request" })
  try {
    const { data } = await axios.get(
      `v2admin/clients/${id}/surveys/setup-data`,
      { params: { tab: "languages" } }
    )
    dispatch({ type: "GetAllLanguages_Success", payload: data })
  } catch (error) {
    dispatch({ type: "GetAllLanguages_Failed", payload: error })
  }
}

export const getSurveysMetrics = () => async (dispatch) => {
  dispatch({ type: "GetSurveysMetrics_Request" })
  try {
    const { data } = await axios.get(
      `/v2admin/clients/0/surveys/survey-management/setup-data`
    )
    dispatch({ type: "GetSurveysMetrics_Success", payload: data })
  } catch (error) {
    console.log("ACTION", error)
    dispatch({ type: "GetSurveysMetrics_Failed", payload: error })
  }
}

export const getClientLocations =
  (clientId, tab, pageId) => async (dispatch) => {
    dispatch({ type: "GetClientLocations_Request" })
    try {
      const { data } = await axios.get(
        `/v2admin/clients/${clientId}/locations`,
        {
          params: { tab: tab, pageId: pageId },
        }
      )
      dispatch({ type: "GetClientLocations_Success", payload: data })
    } catch (error) {
      dispatch({ type: "GetClientLocations_Failed", payload: error })
    }
  }

export const getClientUsers = (clientId, pageId) => async (dispatch) => {
  dispatch({ type: "GetClientData_Request" })
  try {
    const { data } = await axios.get(`/v2admin/clients/${clientId}/users`, {
      params: { pageId: pageId },
    })
    dispatch({ type: "GetClientData_Success", payload: data })
  } catch (error) {
    dispatch({ type: "GetClientData_Failed", payload: error })
    notification.warning({ message: "Error Occured!" })
  }
}

export const getDomainVerificationData =
  (clientId, pageId) => async (dispatch) => {
    dispatch({ type: "GetDomainVerificationData_Request" })
    try {
      const { data } = await axios.get(`/v2admin/clients/${clientId}/domains`, {
        params: { pageId: pageId },
      })
      dispatch({ type: "GetDomainVerificationData_Success", payload: data })
    } catch (error) {
      dispatch({ type: "GetDomainVerificationData_Failed", payload: error })
      notification.warning({ message: "Error Occured!" })
    }
  }

//TODO: Because of function is not ready right now we well arrange when it's ready
export const deleteSelectedClient = (clientId) => async (dispatch) => {
  dispatch({ type: "DeleteSelectedClient_Requested" })
  try {
    const { data } = await axios.delete(`/clients/1/clientmanagement`)
    dispatch({
      type: "DeleteSelectedClient_Success",
      params: { selectedClient: clientId },
    })
    console.log(data)
    notification.success("Selected client is deleted successfully.")
  } catch (error) {
    dispatch({ type: "DeleteSelectedClient_Failed", payload: error })
    notification.error("Selected client is not deleted. Please try it again.")
  }
}

export const getClientIndustry = (clientId) => async (dispatch) => {
  dispatch({ type: "GetClientIndustry_Request" })
  try {
    const { data } = await axios.get(
      `v2admin/clients/1/clientmanagement/industries`
    )
    dispatch({ type: "GetClientIndustry_Success", payload: data })
  } catch (error) {
    dispatch({ type: "GetClientIndustry_Failed", payload: error })
    notification.error("Error occured while getting industries!")
  }
}

export const getAdditionalModules = (clientId) => async (dispatch) => {
  dispatch({ type: "GetAdditionalModules_Request" })
  try {
    const { data } = await axios.get(
      `/v2admin/clients/${clientId}/surveys/setup-data`,
      { params: { tab: "additionalModulesAndQuestions" } }
    )
    dispatch({ type: "GetAdditionalModules_Success", payload: data })
  } catch (error) {
    dispatch({ type: "GetAdditionalModules_Failed", payload: error })
  }
}

// Actions for Additional Modules and Questions in Surveys Management
export const getSelectedModules = (clientId, surveyId) => async (dispatch) => {
  dispatch({ type: "GetSelectedModules_Request" })
  try {
    const { data } = await axios.get(
      `/v2admin/clients/${clientId}/surveys/${surveyId}`,
      { params: { tab: "additionalModulesAndQuestions", section: 0 } }
    )
    dispatch({ type: "GetSelectedModules_Success", payload: data })
  } catch (error) {
    dispatch({ type: "GetSelectedModules_Failed", payload: error })
  }
}

export const getSelectedPages =
  (clientId, surveyId, surveyModuleId) => async (dispatch) => {
    dispatch({ type: "GetSelectedPages_Request" })
    try {
      const { data } = await axios.get(
        `/v2admin/clients/${clientId}/surveys/${surveyId}`,
        {
          params: {
            tab: "additionalModulesAndQuestions",
            section: 1,
            surveyModuleId,
          },
        }
      )
      dispatch({ type: "GetSelectedPages_Success", payload: data })
    } catch (error) {
      dispatch({ type: "GetSelectedPages_Failed", payload: error })
    }
  }

export const getSelectedQuestions =
  (clientId, surveyId, pageId) => async (dispatch) => {
    dispatch({ type: "GetSelectedQuestions_Request" })
    try {
      const { data } = await axios.get(
        `/v2admin/clients/${clientId}/surveys/${surveyId}`,
        {
          params: {
            tab: "additionalModulesAndQuestions",
            section: 2,
            pageId,
          },
        }
      )
      dispatch({ type: "GetSelectedQuestions_Success", payload: data })
    } catch (error) {
      dispatch({ type: "GetSelectedQuestions_Failed", payload: error })
    }
  }

export const postNewLocation = (clientId, ldata) => async (dispatch) => {
  dispatch({ type: "PostNewLocaiton_Request" })
  try {
    const { data } = await axios.post(
      `v2admin/clients/${clientId}/locations/add-location`,
      ldata,
      { params: { tab: "locations" } }
    )
    dispatch({ type: "PostNewLocation_Success", payload: data })
    notification.success({ message: "Location added successfully!" })
    setTimeout(() => {
      window.location.reload()
    }, 3000)
  } catch (error) {
    dispatch({ type: "PostNewLocation_Failed", payload: error })
    notification.warning({
      message: "Error occured while adding new location!",
    })
  }
}

import axios from "axios"
import { notification } from "antd"

export const campaignDetailsAction = (url) => async (dispatch) => {
  dispatch({ type: "Request_Data" })
  try {
    const { data } = await axios.get(url)
    dispatch({ type: "Success_Data", payload: data })
  } catch (error) {
    dispatch({ type: "Data_Failed", payload: error })
  }
}

export const campaignsGrafAction = () => async (dispatch) => {
  dispatch({ type: "Data_Request" })
  try {
    const { data } = await axios.post("/metrics", { page: "admin_campaign" })
    dispatch({ type: "Data_Success", payload: data })
  } catch (error) {
    dispatch({ type: "Data_Fail", payload: error })
  }
}

export const campaignsAction = () => async (dispatch) => {
  dispatch({ type: "Data_Request" })
  try {
    const { data } = await axios.get(`/campaigns`)
    dispatch({ type: "Data_Success", payload: data })
  } catch (error) {
    dispatch({ type: "Data_Fail", payload: error })
  }
}

export const bufferCampaignsAction = () => async (dispatch) => {
  dispatch({ type: "Data_Request" })
  try {
    const { data } = await axios.get(`/campaigns`)
    dispatch({ type: "Data_Success", payload: data })
  } catch (error) {
    dispatch({ type: "Data_Fail", payload: error })
  }
}

export const FeedbackCommentsAction = (fdata) => async (dispatch) => {
  dispatch({ type: "Data_Request" })
  try {
    const { data } = await axios.post(`/metrics`, fdata)
    dispatch({ type: "Data_Success", payload: data })
  } catch (error) {
    dispatch({ type: "Data_Fail", payload: error })
  }
}

export const feedbackJoinDataViewAction = (fdata) => async (dispatch) => {
  dispatch({ type: "Data_Request" })
  try {
    const { data } = await axios.post(`/metrics`, fdata)
    dispatch({ type: "Data_Success", payload: data.comments })
  } catch (error) {
    dispatch({ type: "Data_Fail", payload: error })
  }
}

export const feedbackClientDataViewAction = (fdata) => async (dispatch) => {
  dispatch({ type: "Data_Request" })
  try {
    const { data } = await axios.post(`/metrics`, fdata)
    dispatch({ type: "Data_Success", payload: data.joins })
  } catch (error) {
    dispatch({ type: "Data_Fail", payload: error })
  }
}

export const feedBackResultActions = (fdata) => async (dispatch) => {
  dispatch({ type: "FeedbackResult_Request" })
  try {
    const { data } = await axios.post(`/metrics`, fdata)
    dispatch({
      type: "FeedbackResult_Success",
      payload: {
        siScoreData: data.comment_scores,
        locationBreakDownData: data.location_breakdown,
        donutData: data.avg,
        commentsNumber: data.comment_count,
        highAndLows: data.highAndLows,
        dataAvailable: data.available,
      },
    })
  } catch (error) {
    dispatch({ type: "FeedbackResult_Failed", payload: error })
  }
}

export const feedBackThemeViewActions = (fdata) => async (dispatch) => {
  dispatch({ type: "feedBackThemeView_Request" })
  try {
    const { data } = await axios.post(`/metrics`, fdata)
    dispatch({ type: "feedBackThemeView_Success", payload: data })
  } catch (error) {
    dispatch({ type: "feedBackThemeView_Failed", payload: error })
  }
}

export const regionsGlobalActions = (fdata) => async (dispatch) => {
  dispatch({ type: "RegionsGlobal_Request" })
  try {
    const { data } = await axios.post(`/metrics`, fdata)
    dispatch({
      type: "RegionsGlobal_Success",
      payload: data.map((item) => {
        return {
          id: item.id,
          long: item.long,
          lat: item.lat,
          name: item.label,
          xp: item.data.xp_avg,
          comment: item.data.comment_scores,
          users: item.data.responded_count,
          engaged: item.data.active_user_count,
          themes: item.data.themes,
          campaigns: item.data.campaign_charts,
        }
      }),
    })
  } catch (error) {
    dispatch({ type: "RegionsGlobal_Failed", payload: error })
  }
}

export const campaignClosedDetailsAction = (fdata) => async (dispatch) => {
  dispatch({ type: "CampaignClosedDetails_Request" })
  try {
    const { data } = await axios.post(`/metrics`, fdata)
    dispatch({
      type: "CampaignClosedDetails_Success",
      payload: {
        date: data,
        commentData: data.campaign_comments,
        stats: data.stats,
        rates: data.rates,
        basicBarData: data.campaign_breakdown_bar,
        heatData: data.campaign_comparison_heat,
        heatBufferData: data.campaign_comparison_heat,
        bufferRates: data.res,
        campaignDetails: data.campaign_details,
        basicBufferData: data.campaign_breakdown_bar,
        bufferCommentData: data.campaign_comments,
        trends: data.trends,
        bufferTrends: data.trends,
      },
    })
  } catch (error) {
    dispatch({ type: "CampaignClosedDetails_Failed", payload: error })
  }
}

export const resultsActions = (fdata) => async (dispatch) => {
  dispatch({ type: "Results_Request" })
  try {
    const { data } = await axios.post(`/metrics`, fdata)
    dispatch({
      type: "Results_Success",
      payload: {
        avg: data.avg,
        campaignCharts: data.campaign_charts,
        usage: data.active_users,
        comments: data.comment_scores,
        donut: data.donut,
      },
    })
  } catch (error) {
    dispatch({ type: "Results_Failed", payload: error })
  }
}

export const waveEngagementAction = (fdata) => async (dispatch) => {
  dispatch({ type: "WaveEngagement_Request" })
  try {
    const { data } = await axios.post(`/metrics`, fdata)
    dispatch({
      type: "WaveEngagement_Success",
      payload: {
        activeUsersData: data.active_users,
        stats: data.stats,
        locationBreakdownData: data.location_breakdown,
        loginDaysData: data.average_logins_by_days,
      },
    })
  } catch (error) {
    dispatch({ type: "WaveEngagement_Failed", payload: error })
  }
}

export const xPScoreAction = (fdata) => async (dispatch) => {
  dispatch({ type: "XpScore_Request" })
  try {
    const { data } = await axios.post(`/metrics`, fdata)
    dispatch({
      type: "XpScore_Success",
      payload: {
        avg: data.avg,
        donut: data.donut,
        trends: data.trends,
        comparisonCross: data.comparison_cross,
        comparisonCrossData: data.comparison_cross.location,
        comparisonCrossLine: data.comparison_cross_line,
        comparisonCrossLineData: data.comparison_cross_line.location,
      },
    })
  } catch (error) {
    dispatch({ type: "XpScore_Failed", payload: error })
  }
}

export const newSurveyHomeAction = (client_id) => async (dispatch) => {
  dispatch({ type: "newSurveyHome_Request" })
  try {
    const { data } = await axios.get(`/dashboard/${client_id}`)
    const jsonResponse = await (await fetch(data.url)).json()
    dispatch({
      type: "newSurveyHome_Success",
      payload: {
        allCountries: jsonResponse.allCountries,
        countryByClientId: jsonResponse.countryByClientId,
        allWorkplaces: jsonResponse.allWorkplaces,
        workplaceByClientId: jsonResponse.workplaceByClientId,
        allEmployees: jsonResponse.allEmplooyes,
        employeeByClientId: jsonResponse.emplooyeByClientId,
        generalLMI: jsonResponse.generalLMI,
        LMIByClientId: jsonResponse.LMIByClientId,
        generalHLMI: jsonResponse.generalHLMI,
        HLMIByClientId: jsonResponse.HLMIByClientId,
      },
    })
  } catch (error) {
    dispatch({ type: "newSurveyHome_Failed", payload: error })
  }
}
// TODO
export const uploadClientLogoAction = (clientId, file) => async (dispatch) => {
  dispatch({ type: "UploadClientLogo_Request" })
  try {
    await axios
      .get(`/v2admin/clients/${clientId}}/clientmanagement/put-logo-url`)
      .then((res) => {
        const uploadPromise = fetch(res.data, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: file,
        })
        return uploadPromise
          .then((val) => {
            axios
              .get(`/v2admin/clients/${clientId}/clientmanagement/get-logo-url`)
              .then((res2) => console.log("Logo URL ", res2))
          })
          .catch((err) => {
            console.log("Faced fetching error", err)
          })
      })
  } catch (error) {
    notification.warning({ message: "Internal Server Error!" })
  }
}

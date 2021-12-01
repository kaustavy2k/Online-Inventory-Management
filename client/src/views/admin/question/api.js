import axios from "axios";
import { token } from "../token";
export const getsurveyquestions = async (survey_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/get-SurveyQuestion-by-SurveyId/${survey_id}`
  );
};

export const getsurveyquestionsOptions = async (survey_id) => {
  return await axios.get(
    `${process.env.REACT_APP_API_URL}/get-SurveyQuestion-option-by-SurveyId/${survey_id}`
  );
};

export const getsurvey = async () => {
  return await axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}/survey-list-question`,
    headers: {
      Bearer: token(),
    },
  });
};
//Get all survey
export const getAllSurvey = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/all-survey/`, {
    withCredentials: true,
    headers: {
      Bearer: token(),
    },
  });
};

//get all recommendation
export const fetchRecommendation = () => {
  return axios.get(`${process.env.REACT_APP_API_URL}/get-recommendation/`, {
    withCredentials: true,
  });
};

// Add Question
export const addQuestion = async (data) => {
  return await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/add-SurveyQuestionNew`,
    data,
  });
};
//  Question single fetch
export const singlefetchQuestion = async (id) => {
  return await axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}/fetch-surveyQuestion-by-id/${id}`,
    headers: {
      Bearer: token(),
    },
  });
};
// Edit Question
export const editQuestion = async (data) => {
  return await axios({
    method: "patch",
    url: `${process.env.REACT_APP_API_URL}/update-question`,
    data,
    headers: {
      Bearer: token(),
    },
  });
};
//first Delete Question
export const firstquestionDelete = async (id) => {
  return await axios({
    method: "delete",
    url: `${process.env.REACT_APP_API_URL}/delete-question-first/${id}`,
  });
};
//second Delete Question
export const secondquestionDelete = async (id) => {
  return await axios({
    method: "delete",
    url: `${process.env.REACT_APP_API_URL}/delete-question-second/${id}`,
  });
};
// Delete Question
export const questionDelete = async (id) => {
  return await axios({
    method: "delete",
    url: `${process.env.REACT_APP_API_URL}/delete-SurveyQuestion-by-Id/${id}`,
  });
};

export const listOrderUpdate = async (data) => {
  return await axios({
    method: "patch",
    url: `${process.env.REACT_APP_API_URL}/surveyQuestion-list-order-update`,
    data,
    headers: {
      Bearer: token(),
    },
  });
};

export const answerlistOrderUpdate = async (data) => {
  return await axios({
    method: "patch",
    url: `${process.env.REACT_APP_API_URL}/answer-list-order-update`,
    data,
    headers: {
      Bearer: token(),
    },
  });
};

export const addAnswer = async (data) => {
  return await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/add-question-answer`,
    data,
    headers: {
      Bearer: token(),
    },
  });
};

export const fetchAnswer = async (id) => {
  return await axios({
    method: "get",
    url: `${process.env.REACT_APP_API_URL}/fetch-answer-by-question-id/${id}`,
    headers: {
      Bearer: token(),
    },
  });
};

export const editaddAnswer = async (data) => {
  return await axios({
    method: "post",
    url: `${process.env.REACT_APP_API_URL}/add-edit-answer`,
    data,
    headers: {
      Bearer: token(),
    },
  });
};

export const deleteAnswer = async (id, flag) => {
  return await axios({
    method: "delete",
    url: `${process.env.REACT_APP_API_URL}/delete-answer/${id}`,
    headers: {
      Bearer: token(),
    },
  });
};

export const deleteAnswerUser = async (id, flag) => {
  return await axios({
    method: "delete",
    url: `${process.env.REACT_APP_API_URL}/delete-answer-user/${id}`,
    headers: {
      Bearer: token(),
    },
  });
};

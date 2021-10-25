import axios from 'axios';

let baseUrl = 'http://localhost:8080/';
export const ApiRequest = axios.create();

export const getRequestObject = () => Request;

// 공통
export const getAppString = (countryCode, languageCode) => ApiRequest.get(`config/lang/${countryCode}/${languageCode}.json`);

// baseUrl 셋팅
export const setBaseUrl = (api) => {
    baseUrl = api;

    ApiRequest.defaults.headers.common['Accept'] = 'application/json';
    ApiRequest.defaults.headers.common['Content-Type'] = 'application/json';
}

// 시나리오 테스트 list 조회
export const getScenarioList = () => ApiRequest.get(`${baseUrl}scenario`);
export const postScenarioCreate = (params) => ApiRequest.post(`${baseUrl}scenario`, params);
export const postTestStart = (params) => ApiRequest.post(`${baseUrl}scenario`,  params );
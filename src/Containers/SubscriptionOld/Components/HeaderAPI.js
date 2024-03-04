import React, { Component, useState, Suspense, useEffect, memo, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { constant, get } from 'lodash'




export const getHeaders = dataLogin => {


    return {
        'Authorization': get(dataLogin, 'userTokenInfo.idToken', ''),
        'X-API-Key': get(dataLogin, 'redisKey', ''),
        'Accept-Language': get(dataLogin, 'language', ''),
    }
}

export const getIdtoken = dataLogin => get(dataLogin, 'userTokenInfo.idToken', '')
export const getRediskey = dataLogin => get(dataLogin, 'redisKey', '')
export const getLanguage = dataLogin => get(dataLogin, 'language', '')
export const getUserId = dataLogin => get(dataLogin, 'userId', '')
import axios, { CreateAxiosDefaults } from 'axios'

import { SERVER_URL } from '@/api/api.config'

import {
    getAccessToken,
    removeFromStorage
} from '@/services/auth/auth-token.service'
import { authService } from '@/services/auth/auth.service'

import { errorCatch, getContentType } from './api.helper'

const options: CreateAxiosDefaults = {
    baseURL: SERVER_URL,
    headers: getContentType(),
    withCredentials: false
}

const axiosClassic = axios.create(options)

// Фрагмент кода ниже настраивает использование Axios для отправки запросов с авторизацией, а также управляет обработкой ошибок, связанных с аутентификацией.

const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
    const accessToken = getAccessToken()

    if (config?.headers && accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`

    return config
})

axiosWithAuth.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config

        if (
            (error?.response?.status === 401 ||
                errorCatch(error) === 'jwt expried' ||
                errorCatch(error) === 'jwt must be provided') &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true
            try {
                await authService.getNewTokens()
                return axiosWithAuth.request(originalRequest)
            } catch (error) {
                if (errorCatch(error) === 'jwt expired') removeFromStorage()
            }
        }

        throw error
    }
)

export { axiosClassic, axiosWithAuth }

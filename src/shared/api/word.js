import {getCookieValue} from "../utils/utils";

const apiBase = "http://127.0.0.1:8080/api"

export const deleteWord = async (id) => {
    const token = getCookieValue("token")
    const data = {
        id,
        token
    }
    const request = fetch(`${apiBase}/delete`, {
        method: "POST",
        body: JSON.stringify(data),
    })
    return await processFetch(request)
}

export const updateWord = async (data) => {
    const token = getCookieValue("token")
    const _data = {
        ...data,
        token
    }
    const request = fetch(`${apiBase}/update`, {
        method: "POST",
        body: JSON.stringify(_data),
    })
    return await processFetch(request)
}

export const getWords = async () => {
    const token = getCookieValue("token")
    const request = fetch(`${apiBase}/get-words`, {
        method: "POST",
        body: JSON.stringify({token}),
    })
    return await processFetch(request)
}

export const createWord = async (data) => {
    const token = getCookieValue("token")
    const _data = {
        ...data,
        token
    }
    const request = fetch(`${apiBase}/word`, {
        method: "POST",
        body: JSON.stringify(_data)
    });
    return await processFetch(request)
}

export const getWordsByPeriod = async (data) => {
    const token = getCookieValue("token")
    const _data = {
        ...data,
        token
    }
    const request = fetch(`${apiBase}/get-words-period`, {
        method: "POST",
        body: JSON.stringify(_data)
    });
    return await processFetch(request)
}

export const processFetch = async (request) => {
    try {
        const response = await request;
        return {
            status: response.ok ? "success": "error",
            data: await response.json()
        }
    } catch (error) {
        return {
            status: 'error',
            data: error
        }
    }
}


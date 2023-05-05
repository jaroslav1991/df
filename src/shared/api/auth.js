import {processFetch} from "./word";

const apiBase = "http://127.0.0.1:8080/api"

export const fetchSignUp = async (data) => {
    const request = fetch(`${apiBase}/sign-up`, {
        method: "POST",
        body: JSON.stringify(data)
    })
    return await processFetch(request)
};

export const fetchSignIn = async (data) => {
    const request = fetch(`${apiBase}/sign-in`, {
        method: "POST",
        body: JSON.stringify(data)
    });
    return await processFetch(request)
};
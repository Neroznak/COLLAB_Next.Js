export const SERVER_URL = process.env.SERVER_URL;
if (!SERVER_URL) {
    throw new Error("SERVER_URL is not defined!");
}

export const API_URL = {
    root: (url = '') => `${SERVER_URL}${url}`, // Конкатенируем SERVER_URL с переданным URL
    auth: (url = '') => API_URL.root(`/auth${url}`),
    users: (url = '') => API_URL.root(`/users${url}`),
    collab: (url = '') => API_URL.root(`/collab${url}`),
    referal: (url = '') => API_URL.root(`/referal${url}`),
    task: (url = '') => API_URL.root(`/task${url}`),
    quote: (url = '') => API_URL.root(`/quote${url}`),
    attempt: (url = '') => API_URL.root(`/attempt${url}`),
    messages: (url = '') => API_URL.root(`/messages${url}`),

}

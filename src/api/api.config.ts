export const SERVER_URL = process.env.SERVER_URL as string

export const API_URL = {
    root: (url = '') => `${SERVER_URL}${url}`, // Конкатенируем SERVER_URL с переданным URL

    auth: (url = '') => API_URL.root(`/auth${url}`),
    users: (url = '') => API_URL.root(`/users${url}`),
    chats: (url = '') => API_URL.root(`/chats${url}`),
    collab: (url = '') => API_URL.root(`/collab${url}`),
    referal: (url = '') => API_URL.root(`/referal${url}`),
    task: (url = '') => API_URL.root(`/task${url}`),
    quote: (url = '') => API_URL.root(`/quote${url}`),
    attempt: (url = '') => API_URL.root(`/attempt${url}`),
    // dashboard: (url = '') => API_URL.root(`/dashboard${url}`),
    messages: (url = '') => API_URL.root(`/messages${url}`),

}

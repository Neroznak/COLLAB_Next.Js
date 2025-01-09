export const SERVER_URL = process.env.SERVER_URL as string

export const API_URL = {
    root: (url = '') => `${url ? url : ''}`,

    auth: (url = '') => API_URL.root(`/auth${url}`),
    users: (url = '') => API_URL.root(`/users${url}`),
    chats: (url = '') => API_URL.root(`/chats${url}`),
    dashboard: (url = '') => API_URL.root(`/dashboard${url}`),
    messages: (url = '') => API_URL.root(`/messages${url}`),

}

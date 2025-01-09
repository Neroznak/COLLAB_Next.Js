export const APP_URL = process.env.APP_URL as string

export const PUBLIC_URL = {
    root: (url = '') => `${url ? url : ''}`,

    auth: () => PUBLIC_URL.root('/auth'),
    settings: () => PUBLIC_URL.root('/settings'),
    user: () => PUBLIC_URL.root('/profile'),
}

export const DASHBOARD_URL = {
    root: (url = '') => `/dashboard${url ? url : ''}`,

    home: () => DASHBOARD_URL.root('/'),
}


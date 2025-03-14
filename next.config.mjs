/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        APP_ENV:process.env.APP_ENV,
        APP_URL:process.env.APP_URL,
        APP_DOMAIN:process.env.APP_DOMAIN,
        SERVER_URL:process.env.SERVER_URL,
    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.yandex.net',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'img.icons8.com',
                port: '',
                pathname: '/**',
            },
        ]
    },
    async rewrites() {
        return [
            {
                source: '/uploads/:path*',
                destination: `${process.env.SERVER_URL}/uploads/:path*`,
            }
        ]
    },
    // async redirects() {
    //     return [
    //         {
    //             source: '/',
    //             destination: '/main',
    //             permanent: true, // Если true, то редирект будет 301, если false — 302
    //         },
    //     ];
    // },
};
export default nextConfig;
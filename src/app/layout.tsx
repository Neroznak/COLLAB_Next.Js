import type {Metadata} from "next";
import "./global.scss";
import {SITE_DESCRIPTION, SITE_NAME} from "@/constants/seo.constants";
import {Providers} from "./providers";
// import {Roboto} from 'next/font/google';
//
// const roboto = Roboto({
//     subsets: ['latin', 'cyrillic'], // Добавьте 'cyrillic', чтобы поддерживать русский текст
//     weight: ['400', '700'], // Укажите нужные веса шрифта
// });


export const metadata: Metadata = {
    title: {
        absolute: SITE_NAME,
        template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
};


export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="ru">
        <body >
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
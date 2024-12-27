import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.scss";
import {GeistSans} from 'geist/font/sans'
import {SITE_DESCRIPTION, SITE_NAME} from "@/constants/seo.constants";
import {Providers} from "./providers";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});
export const metadata: Metadata = {
    title: {
        absolute: SITE_NAME,
        template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
};
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (<html lang="ru">
        <body className={GeistSans.variable}><Providers>{children}</Providers>
        </body>
        </html>
    );
}
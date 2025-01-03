import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.scss";
import {SITE_DESCRIPTION, SITE_NAME} from "@/constants/seo.constants";
import {Providers} from "./providers";


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
        <body ><Providers>{children}</Providers>
        </body>
        </html>
    );
}
import type { Metadata } from "next";
import "./globals.css";
import FooterComp from "./(ui)/components/footer";
import HeaderComp from "./(ui)/components/header";
import ContentComp from "./(ui)/components/content";
import { ConfigProvider } from "antd";
import type { ThemeConfig } from "antd";
import { AuthProvider } from "@/context/authContext";


export const metadata: Metadata = {
    title: "دانشجویار",
    description: "سایت پرسش و پاسخ دانشجویان",
};

const CustomTheme: ThemeConfig = {
    token: {
        colorText: "#FFFFF0",
        colorTextHeading: "#fffff0",
        
    }
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
        return (
            <html lang="fa" dir="rtl">
                <head>
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </head>
                <body>
                    <AuthProvider>
                    <ConfigProvider
                        theme={CustomTheme}
                    >
                        <HeaderComp />
                        <ContentComp>        
                            {children}
                        </ContentComp>     
                        <FooterComp />
                    </ConfigProvider>
                    </AuthProvider>
                </body>
            </html>
        );
}

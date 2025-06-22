import type { Metadata } from "next";
import "./globals.css";
import FooterComp from "./(ui)/components/footer";
import HeaderComp from "./(ui)/components/header";
import ContentComp from "./(ui)/components/content";
import { ConfigProvider } from "antd";


export const metadata: Metadata = {
    title: "دانشجویار",
    description: "سایت پرسش و پاسخ دانشجویان",
};

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
                    <ConfigProvider
                        theme={{
                            token: {
                            },
                            components: {
                                Typography: {
                                    
                                },
                                Button: {
                                    colorPrimary: "#FFFFF0",
                                    primaryColor: "#111827",
                                    
                                    colorPrimaryHover: "#111827",
                                    colorPrimaryBgHover: "#FFFFF0"
                                }
                            }
                        }}
                    >
                        <HeaderComp />
                        <ContentComp>        
                            {children}
                        </ContentComp>     
                        <FooterComp />
                    </ConfigProvider>
                </body>
            </html>
        );
}

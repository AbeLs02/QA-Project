"use client"
import { Layout } from "antd";
const { Content } = Layout;

const contentStyle: React.CSSProperties = {
    display: "flex",
};

const ContentComp = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <Content style={contentStyle}>
            {children}
        </Content>
    )
}

export default ContentComp
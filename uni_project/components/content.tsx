"use client"
import { Layout } from "antd";
const { Content } = Layout;

const contentStyle: React.CSSProperties = {

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
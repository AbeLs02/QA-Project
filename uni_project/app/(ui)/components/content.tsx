"use client"
import { Layout } from "antd";
import { Children } from "react";
const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
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
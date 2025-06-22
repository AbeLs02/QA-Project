"use client"
import { Col, Row, Layout } from "antd"
import { AntdRegistry } from "@ant-design/nextjs-registry"
const { Footer } = Layout

const footerStyle: React.CSSProperties = {
  background: 'none',
  color: '#FFFFF0'
};


const FooterComp = () => {
    return (
        <Footer style={footerStyle}>
            <Col>
                <Row justify={"center"}>footer</Row>
                <Row justify={"center"}>© 2025 All rights reserved. Daneshjooyar</Row>
            </Col>
        </Footer>
    )
}

export default FooterComp;
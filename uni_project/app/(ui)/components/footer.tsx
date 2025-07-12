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
            <Row justify={"center"}>
                <Col span={24}>
                    <Row justify={"center"}>footer</Row>
                </Col>
                <Col>
                    © 2025 All rights reserved. Daneshjooyar
                </Col>
            </Row>
        </Footer>
    )
}

export default FooterComp;
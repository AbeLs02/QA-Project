"use client"
import { Row, Col, Form, Typography, Button, Input } from "antd";
const {Title} = Typography
const Login = () => {

    return (
        <Row justify={"center"} align={"middle"}>
            <Col span={24}>
                <Title>ورود</Title>
            </Col>
            <Col span={24}>
                <Form>
                    <Form.Item
                        label="نام کاربری"
                    >
                        <Input placeholder="نام کاربری"/>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={24}>
                <Button type="primary">ورود</Button>
            </Col>
        </Row>
    )
}

export default Login;
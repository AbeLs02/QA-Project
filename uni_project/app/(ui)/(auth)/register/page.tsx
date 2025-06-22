"use client"
import { Row, Col, Form, Typography, Button } from "antd";
const {Title} = Typography
const Register = () => {

    return (
        <Row justify={"center"} align={"middle"}>
            <Col span={24}>
                <Title>ثبت نام</Title>
            </Col>
            <Col span={24}>
                <Form>

                </Form>
            </Col>
            <Col span={24}>
                <Button>ثبت نام</Button>
            </Col>
        </Row>
    )
}

export default Register;
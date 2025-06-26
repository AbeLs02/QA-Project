"use client"
import CustomButton from "@/components/CustomButton";
import { Row, Col, Form, Typography, Button, Input } from "antd";
import Link from "next/link";
import "./login.css"
import CustomInput from "@/components/CustomInput";
const {Title, Text} = Typography
const Login = () => {

    return (
        <Row justify={"center"} align={"middle"} className="form">
            <Col className="form-container">
                <Title level={2} className="form-title">ورود</Title>
                <Form className="login-form">
                    <Form.Item
                        className="xxx"
                        label="نام کاربری"
                        name="username"
                    >
                        <CustomInput placeholder="نام کاربری خود را وارد نمایید.."/>
                    </Form.Item>
                    <Form.Item
                        label= "کلمه عبور"
                        name="password"
                    >
                        <CustomInput placeholder="کلمه عبور خود را وارد نمایید.."/>
                    </Form.Item>
                    <Form.Item>
                        <CustomButton className="login-btn">ورود</CustomButton>
                    </Form.Item>
                </Form>
                <CustomButton customVariant="linkSecondary" href="#">ورود با شماره تلفن</CustomButton>
                <CustomButton customVariant="linkSecondary" href="#">فراموشی کلمه عبور</CustomButton>
                <CustomButton customVariant="linkSecondary" href="/register">آیا تا حالا اکانت نساخته اید؟</CustomButton>
            </Col>
        </Row>
    )
}

export default Login;
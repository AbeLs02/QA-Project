"use client"
import CustomButton from "@/components/CustomButton";
import { Row, Col, Form, Typography, Button, Input } from "antd";
import "./register.css"
import CustomInput from "@/components/CustomInput";
const {Title, Text} = Typography
const Login = () => {

    return (
        <Row justify={"center"} align={"middle"} className="form">
            <Col className="form-container">
                <Title level={2} className="form-title">ثبت نام</Title>
                <Form className="login-form" labelAlign="right" labelCol={{span: 6}}>
                    <Form.Item
                        className="xxx"
                        label="نام کاربری"
                        name="username"
                    >
                        <CustomInput placeholder="نام کاربری خود را وارد نمایید.."/>
                    </Form.Item>
                    <Form.Item
                        className="xxx"
                        label="ایمیل"
                        name="email"
                    >
                        <CustomInput type="email" placeholder="ایمیل خود را وارد نمایید.."/>
                    </Form.Item>
                    <Form.Item
                        label= "کلمه عبور"
                        name="password"
                    >
                        <CustomInput type="password" placeholder="کلمه عبور خود را وارد نمایید.."/>
                    </Form.Item>
                    <Form.Item
                        label= "تکرار کلمه عبور"
                        name="password-confirmation"
                    >
                        <CustomInput type="password" placeholder="کلمه عبور خود را دوباره وارد نمایید.."/>
                    </Form.Item>
                    <Form.Item>
                        <CustomButton className="login-btn">ثبت نام</CustomButton>
                    </Form.Item>
                </Form>
                <CustomButton customVariant="linkSecondary" href="/login">آیا قبلا اکانت ساخته اید؟</CustomButton>
            </Col>
        </Row>
    )
}

export default Login;
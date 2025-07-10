"use client"
import CustomButton from "@/components/CustomButton";
import { Row, Col, Form, Typography, Button, Input } from "antd";
import "./register.css"
import CustomInput from "@/components/CustomInput";
import { useAuth } from "@/context/authContext";
const {Title, Text} = Typography
const Login = () => {
    const {register} = useAuth()

    const handlerRegister = async (values: {username:string, email:string, password:string, password_confirmation: string}) => {
        const {username, email, password} = values
        if (values.password !== values.password_confirmation) return
        console.log("register")
        await register(username, email, password)
    }
    return (
        <Row justify={"center"} align={"middle"} className="form">
            <Col className="form-container">
                <Title level={2} className="form-title">ثبت نام</Title>
                <Form className="login-form" labelAlign="right" labelCol={{span: 6}}
                    onFinish={handlerRegister}
                >
                    <Form.Item
                        label="نام کاربری"
                        name="username"
                    >
                        <CustomInput placeholder="نام کاربری خود را وارد نمایید.."/>
                    </Form.Item>
                    <Form.Item
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
                        name="password_confirmation"
                    >
                        <CustomInput type="password" placeholder="کلمه عبور خود را دوباره وارد نمایید.."/>
                    </Form.Item>
                    <Form.Item>
                        <CustomButton className="login-btn" htmlType="submit">ثبت نام</CustomButton>
                    </Form.Item>
                </Form>
                <CustomButton customVariant="linkSecondary" href="/login">آیا قبلا اکانت ساخته اید؟</CustomButton>
            </Col>
        </Row>
    )
}

export default Login;
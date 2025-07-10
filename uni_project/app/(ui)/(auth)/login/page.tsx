"use client"
import CustomButton from "@/components/CustomButton";
import { Row, Col, Form, Typography } from "antd";
import "./login.css"
import CustomInput from "@/components/CustomInput";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
const {Title, Text} = Typography
const Login = () => {
    const {isLoggedIn, login} = useAuth()
    const router = useRouter()
    console.log(isLoggedIn)
    const handlerLogin = async (values: {username:string, password:string}) => {
        await login(values.username, values.password)
        router.replace("/home")
    }
    if (isLoggedIn) {
        return (
            <Row>
                you already logged in
            </Row>
        )
    }
    return (
        <Row justify={"center"} align={"middle"} className="form">
            <Col className="login-form-container">
                <Title level={2} className="login-form-title">ورود</Title>
                <Form className="login-form"
                    onFinish={handlerLogin}
                >
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
                        <CustomButton className="login-btn" htmlType="submit">ورود</CustomButton>
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
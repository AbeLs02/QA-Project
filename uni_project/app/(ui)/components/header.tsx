"use client"
import { Col, Row, Layout, Image } from "antd";
import React from "react";
import logo from "@/public/images/logo.png"
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import CustomButton from "@/components/CustomButton";
const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  background: 'none',
  height: 'auto'
};

const HeaderComp = () => {
    const {isLoggedIn, user, logout} = useAuth()
    return (
        <Header style={headerStyle}>
            <Row align={"middle"} justify={"center"}>
                <Col>
                    <Image width={100} src={logo.src}/>
                </Col>
                <Col flex={"auto"} className="navbar">
                    <Link href="/home" className="nav-link">
                        صفحه اصلی
                    </Link>
                    <Link href="/questions" className="nav-link">
                        سوالات  
                    </Link> 
                    <Link href="#" className="nav-link">
                        کاربران فعال
                    </Link> 
                    <Link href="#" className="nav-link">
                        پشتیبانی
                    </Link> 
                    <Link href="/questions/new-question" className="new-question">
                        ثبت سوال جدید
                    </Link>
                </Col>

                <Col>
                    {
                        isLoggedIn ? 
                        <>
                            <Link href="" className="auth-btn">
                                {user?.username}
                            </Link>
                            <CustomButton customVariant="linkSecondary" onClick={()=>logout()}>
                                خروج
                            </CustomButton>
                        </>
                            :
                        <>
                            <Link href="/login" className="auth-btn">
                                ورود
                            </Link>
                            <Link href="/register" className="auth-btn">
                                ثبت نام
                            </Link>
                        </>
                    }
                    
                </Col>
            </Row>
        </Header>
    )
}

export default HeaderComp; 
"use client"
import { Col, Row, Layout, Button, Image } from "antd";
import React from "react";
import logo from "@/public/images/logo.png"
import Link from "next/link";
const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  background: 'none',
  height: 'auto'
};

const HeaderComp = () => {
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
                    <Link href="/login" className="auth-btn">
                        ورود
                    </Link>
                    <Link href="/register" className="auth-btn">
                        ثبت نام
                    </Link>
                </Col>
            </Row>
        </Header>
    )
}

export default HeaderComp; 
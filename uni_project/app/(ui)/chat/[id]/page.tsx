"use client"
import { Col, Input, Row, Typography, Image } from "antd"
import { useParams } from "next/navigation";

import "./chat.css"
import CustomInput from "@/components/CustomInput";
import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import sendIcon from "@/public/images/send_logo.png"
const {Text, Title} = Typography

const Chat = () => {
    const params = useParams();
    const [input, setInput] = useState('');

    return (
        <Row justify={"center"}>
            <Col className="chat-base-container" xs={22} lg={15}>
                <Row justify={"center"} gutter={[0, 20]}>
                    <Col span={24}>
                        <Text className="ques-mark">?</Text>
                        <Text className="chat-title">دانشجویار</Text>
                    </Col>
                    <Col span={24}>
                        <Row className="chat-container" gutter={[0, 20]}>
                            <Col className="ques-info" span={24}>
                                <Row gutter={[0, 10]}>
                                    <Col span={24}>
                                        <Title level={3} className="ques-title">عنوان سوال</Title>
                                    </Col>
                                    <Col className="ques-tags-container" span={24}>
                                        <Text className="ques-tag">یک تگ</Text>
                                    </Col>
                                    <Col>
                                        <Text>توضیحات: </Text>
                                        <Text className="ques-description">
                                            ندارد
                                        </Text>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="chat" span={24}>
                                <Row gutter={[0, 5]}>
                                    <Col span={24}>
                                        <Row align={"bottom"}>
                                            <Col className="profile"></Col>
                                            <Col className="message-own">سلام خوب هستین؟</Col>
                                        </Row>
                                    </Col>
                                    <Col span={24}>
                                        <Row align={"bottom"} className="other">
                                            <Col className="profile"></Col>
                                            <Col className="message-other">
                                            سسمیتزمسدیزخمسدیزسخیزدگخسمزئک سدخیزسیدزدسی زسیخزدسیخزدسیز سیدزخسدیزخسیز لام
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row className="message-input-container" align={"middle"}>
                                    <Col flex={"auto"}>
                                        <Input value={input} onChange={(e)=>setInput(e.target.value)} variant="borderless" className="message-input"/>
                                    </Col>
                                    <Col>
                                        <button
                                            // onClick={}
                                        >   
                                            <Image 
                                            src={sendIcon.src}
                                            width={40}
                                            preview={false}
                                            />
                                        </button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    
                </Row>
            </Col>
        </Row>
    )
}

export default Chat
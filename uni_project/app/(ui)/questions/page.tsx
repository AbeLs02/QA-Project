"use client"
import "./questions.css"
import { Row, Col, Typography, Flex } from "antd"
import CustomButton from "@/components/CustomButton"
import CustomInput from "@/components/CustomInput"
const {Title, Text, Link} = Typography

const Questions = () => {

    return (
        <Row gutter={30}>
            <Col span={6}>
                <Row className="bg">
                    <Title level={3}>فیلترها</Title>

                </Row>
            </Col>
            <Col span={18}>
                <Row className="bg">
                    <Col span={24}>
                        <Row gutter={20}>
                            <Col span={18}>
                                <CustomInput placeholder="جست و جوی سوال"/>
                            </Col>
                            <Col span={6}>
                                <CustomButton>جست و جو</CustomButton>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row>
                            <Col className="order-container" span={24}>
                                <Link className="order">جدیدترین‌ها</Link>
                                <Link className="order">بیشترین پاسخ</Link>
                                <Link className="order">بدون پاسخ‌ها</Link>
                            </Col>
                        </Row>
                        <Row className="question">
                            <Col span={18}>
                                <Row gutter={[0, 20]}>
                                    <Col span={24}>
                                    <Title level={3}>متن سوال</Title>
                                    </Col>
                                    <Col span={24}> 
                                        <Text className="chat-tag">tag1</Text>
                                        <Text className="chat-tag">tag2</Text>
                                        <Text className="chat-tag">tag3</Text>
                                        <Text className="author">توسط <Text className="author-name">saeed</Text> در <Text className="date">121</Text></Text>

                                    </Col>
                                </Row>
                                    
                            </Col>
                            <Col span={2}>
                                <Row gutter={[0, 10]}>
                                    <Col span={24}><Text className="view"><Text className="view-count">200</Text> مشاهده</Text></Col>
                                    <Col span={24}><Text className="message"><Text className="message-count">100</Text> پیام</Text></Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <CustomButton>ثبت پاسخ</CustomButton>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Questions
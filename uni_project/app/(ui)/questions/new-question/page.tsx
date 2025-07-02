"use client"
import "./new-question.css"
import { Row, Col, Typography, Form, Input } from "antd";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { CSSProperties } from "react";
const {Title, Text} = Typography
const {TextArea} = Input
const FromItemStyle: CSSProperties = {
    marginBottom: "10px"
} 

const NewQuestion = () => {

    return (
        <Row justify={"center"}>
            <Col className="form-container" span={15}>
                <Row align={"middle"}>
                    <Text className="ques-mark">?</Text>
                    <Text className="title">دانشجویار</Text>
                </Row>
                <Row className="form">
                    <Col span={24}>
                        <Title level={3}>ایجاد چت</Title>
                    </Col>
                    <Col span={24}>
                        <Form
                            
                        >
                            <Form.Item
                                name="title"
                                style={FromItemStyle}
                            >
                                <CustomInput placeholder="عنوان سوال" />
                            </Form.Item>
                            <Form.Item
                                name="tags"
                                style={FromItemStyle}

                            >
                                <CustomInput placeholder="تگ سوال" />
                            </Form.Item>
                            <Form.Item
                                name="category"
                                style={FromItemStyle}

                            >
                                <CustomInput placeholder="دسته بندی" />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                style={FromItemStyle}

                            >
                                <CustomInput customVariant="TextArea" placeholder="توضیحات" />
                            </Form.Item>  
                            <CustomButton>ثبت</CustomButton>  
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default NewQuestion;
"use client"
import "./new-question.css"
import { Row, Col, Typography, Form, Input, Select } from "antd";
import type { SelectProps } from "antd";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { CSSProperties } from "react";
const {Title, Text} = Typography
const {TextArea} = Input
const FromItemStyle: CSSProperties = {
    marginBottom: "10px"
} 

const NewQuestion = () => {
    const options: SelectProps['options'] = [
        {label:"علمی", value:"s"},
        {label:"آموزشی", value:"ss"},
        {label:"علمی", value:"sss"},
    ];
    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };
    return (
        <Row justify={"center"}>
            <Col className="question-form-container" span={15}>
                <Row align={"middle"}>
                    <Text className="ques-mark">?</Text>
                    <Text className="title">دانشجویار</Text>
                </Row>
                <Row className="question-form">
                    <Col span={24}>
                        <Title level={3} className="title">ایجاد چت</Title>
                    </Col>
                    <Col span={24}>
                        <Form
                            labelCol={{span:3}}
                              
                        >
                            <Form.Item
                                name="title"
                                style={FromItemStyle}
                                label="عنوان:"
                            >
                                <CustomInput placeholder="عنوان سوال" />
                            </Form.Item>
                            <Form.Item
                                name="tags"
                                style={FromItemStyle}
                                label="تگ"
                            >
                                <CustomInput placeholder="تگ‌های چند کلمه ای را با - بچسبانید و با فاصله تگ‌ها را از هم جدا کنید" />
                            </Form.Item>
                            <Form.Item
                                name="category"
                                style={FromItemStyle}
                                label="دسته بندی"  
                            >
                                <CustomInput
                                    customVariant="Select"
                                    placeholder="دسته بندی مورد نظر را انتخاب کنید"
                                    options={options}
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                style={FromItemStyle}
                                label="توضیحات"
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
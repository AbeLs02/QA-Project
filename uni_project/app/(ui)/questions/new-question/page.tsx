"use client"
import "./new-question.css"
import { Row, Col, Typography, Form, Input, Select } from "antd";
import type { SelectProps } from "antd";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { CSSProperties, useEffect, useState } from "react";
import { addQuestion, getCategories } from "@/lib/api";
const {Title, Text} = Typography
const {TextArea} = Input
const FromItemStyle: CSSProperties = {
    marginBottom: "10px"
} 

interface Categories {
    label: string, 
    value: string
}
interface Form {
    title: string,
    tags: string,
    category: string,
    description: string,
}
const NewQuestion = () => {
    
    const [categories, setCategories] = useState<Categories[]>([])

    useEffect(()=>{
        const fetchData = async ()=>{
            const categories_list = await getCategories()
            const formatted: Categories[] = categories_list.map((cat:{name:string, slug:string}) => ({
                label: cat.name,
                value: cat.slug,
                }));
            setCategories(formatted);
        }
        fetchData()
    }, [])

    const handlerCreateQuestion = async (values: Form) => {
        const {title, tags, category, description} = values
        const tags_list = tags.split(',').map(tag => tag.trim())
        const token = localStorage.getItem("access")
        const data = await addQuestion(token, title, category, tags_list, description)
        console.log(data.data)
    }
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
                            onFinish={handlerCreateQuestion}
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
                                <CustomInput placeholder="تگ‌ها را با comma (,) از هم جدا کنید" />
                            </Form.Item>
                            <Form.Item
                                name="category"
                                style={FromItemStyle}
                                label="دسته بندی"  
                            >
                                <CustomInput
                                    customVariant="Select"
                                    placeholder="دسته بندی مورد نظر را انتخاب کنید"
                                    options={categories}
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
                            <CustomButton htmlType="submit">ثبت</CustomButton>  
                        </Form>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default NewQuestion;
"use client"
import "./questions.css"
import { Row, Col, Typography, Flex } from "antd"
import CustomButton from "@/components/CustomButton"
import CustomInput from "@/components/CustomInput"
import { useSearchParams } from "next/navigation"
import { getAllQuestions } from "@/lib/api"
import { useEffect, useState } from "react"
const {Title, Text, Link} = Typography
interface UserType {
    id: number;
    username: string;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
    profile: string;
    career: string;
    date_joined: string
}
interface TagType {
    id: number;
    name: string;
    slug: string;
}
interface QuestionType {
    id: number;
    user: UserType;
    title: string;
    category: string;
    tags: TagType[];
    created_at: string;

}
const Questions = () => {
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const searchParams = useSearchParams()

    const order_by = searchParams.get("order-by") || "newest"

    useEffect(()=>{
        const fetchData = async ()=>{
            const questions = await getAllQuestions(order_by)
            setQuestions(questions)
        }
        fetchData()
    }, [])
    const handlerSearchQuery = () => {
        console.log(searchQuery)
    }

    return (
        <Row gutter={30}>
            <Col span={6}>
                <Row className="bg">
                    <Title level={3} className="title-secondary">فیلترها</Title>

                </Row>
            </Col>
            <Col span={18}>
                <Row className="bg">
                    <Col span={24}>
                        <Row gutter={20}>
                            <Col span={18}>
                                <CustomInput placeholder="جست و جوی سوال" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{setSearchQuery(e.target.value)}}/>
                            </Col>
                            <Col span={6}>
                                <CustomButton onClick={handlerSearchQuery}>جست و جو</CustomButton>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24}>
                        <Row>
                            <Col className="order-container" span={24}>
                                <Link href="?order-by=newest" className={`order ${order_by=="newest" ? 'active-order':''}`}>جدیدترین‌ها</Link>
                                <Link href="?order-by=most-answered" className={`order ${order_by=="most-answered" ? 'active-order':''}`}>بیشترین پاسخ</Link>
                                <Link href="?order-by=not-answered" className={`order ${order_by=="not-answered" ? 'active-order':''}`}>بدون پاسخ‌ها</Link>
                            </Col>
                        </Row>
                        {questions.map((q, index)=>{ 
                            const dateTime = new Date(q.created_at)
                            const date = dateTime.toLocaleDateString("fa-IR")
                            const time = dateTime.toLocaleTimeString("fa-IR")
                            return (
                        <Row className="question" key={q.id}>
                            <Col span={18}>
                                <Row gutter={[0, 5]}>
                                    <Col span={24}>
                                    <Title level={3} className="title-secondary">{q.title}</Title>
                                    </Col>
                                    <Col span={24} className="info-container">
                                        {
                                            q.tags.map((t)=>(
                                                <Text className="chat-tag" key={t.id}>{t.name}</Text>
                                            ))
                                        }
                                        <Text className="title-secondary author">توسط <Text className="title-secondary author-name">{q.user.username}</Text> در <Text className="title-secondary date"> {time} {date}</Text></Text>

                                    </Col>
                                </Row>
                            </Col>
                            <Col span={2}>
                                <Row gutter={[0, 10]}>
                                    <Col span={24}><Text className="view"><Text className="view-count">200</Text> مشاهده</Text></Col>
                                    <Col span={24}><Text className="message"><Text className="message-count">{}</Text> پیام</Text></Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <CustomButton href={`/chat/` + q.id}>ثبت پاسخ</CustomButton>
                            </Col>
                        </Row>
                         )})
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Questions
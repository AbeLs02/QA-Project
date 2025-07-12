"use client"
import { Button, Col, Row, Typography } from "antd";
import "./home.css"
import CustomButton from "@/components/CustomButton";
import { useEffect, useState } from "react";
import { getAllQuestions, getCategories } from "@/lib/api";

const {Text, Title, Paragraph} = Typography

interface CategoryType {
    id: number;
    name: string;
    slug: string;
}
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
    description: string;
    category: CategoryType;
    tags: TagType[];
    chat_id: number;
    message_count: number
    created_at: string;

}
export default function Home() {
    const [categories, setCategories] = useState<CategoryType[]>()
    const [hotest, setHotest] = useState<QuestionType[]>([])

    useEffect(()=>{
        const fetchData = async ()=>{
            const cats = await getCategories()
            const data = await getAllQuestions({order_by:"most-answered", count: 3})
            setCategories(cats)
            setHotest(data)
        }
        fetchData()
    }, [])
    return (
        <Row justify={"center"} gutter={[0, 30]}>
            <Col className="about-site" span={22}>
                <Row justify={"center"}>
                    <Col span={24}>
                        <Title level={3} className="text">اینجا کجاست؟</Title>
                    </Col>
                    <Col span={20}>
                        <Paragraph className="text">
                            اینجا یا به عبارتی دانشجویار یک بستر آنلاین برای پرسش و پاسخ میان برای شما دانشجویان است.
                        </Paragraph>
                        <Paragraph className="text">
                            اینجا جایی‌ست که اگر سوالی درسی، پروژه‌ای، آموزشی و اداری و یا حتی مشاوره‌ای برایت پیش آمد، می‌توانی آن را با دیگر دانشجویان و پاسخ‌دهندگان در میان بگذاری.
                        </Paragraph>
                        <Paragraph className="text">
                            با هر سوال، یک گفت‌وگوی اختصاصی (چت) ایجاد می‌شود که دیگران نیز می‌توانند به آن وارد شوند و پاسخ دهند.
                        </Paragraph>
                        <Paragraph className="text">
                            همه‌ی سوالات و پاسخ‌ها در سایت باقی می‌مانند، تا هر دانشجویی در آینده بتواند پاسخ سوال خود را سریع‌تر پیدا کند.
                        </Paragraph>
                        <Paragraph className="text">
                            دانشجویار یعنی دانشجو تنها نیست.
                        </Paragraph>
                    </Col>
                </Row>
            </Col>
            <Col className="make-question" span={24}>
                <Row justify={"center"}>
                    <Col>
                        <Paragraph className="text make-question-txt">
                            سوالی داری اما جواب نه؟
                        </Paragraph>
                        <Paragraph className="text make-question-txt">
                            میتونی همین الان 
                        </Paragraph>
                        <Paragraph className="text make-question-txt">
                            اولین سوالت رو بپرسی
                        </Paragraph>
                        <CustomButton href="/questions/new-question">ثبت سوال</CustomButton>
                    </Col>
                </Row>
            </Col>
            <Col className="topics" sm={16} xs={20}>
                <Row>
                    <Title level={2} className="title-secondary">دسته بندی ها</Title>
                </Row>
                <Row gutter={[10, 10]} justify={"center"}>
                    {
                        categories?.map((c)=>(
                            <Col sm={11} xs={23} key={c.id}>
                                <Button className="topic-btn" href={`/questions/?category=${c.slug}`}>{c.name}</Button>
                            </Col>
                        ))
                    }
                </Row>
            </Col>
            <Col className="top-chats" span={22}>
                <Row>
                    <Title level={2}>داغترین چت ها</Title>
                </Row>
                <Row>
                    <Col span={24}>{
                            hotest.map((q)=>{ 
                                const dateTime = new Date(q.created_at)
                                const date = dateTime.toLocaleDateString("fa-IR")
                                const time = dateTime.toLocaleTimeString("fa-IR")
                                return(
                        <Row className="question" key={q.id}>
                            <Col span={18}>             
                                <Row gutter={[0, 10]}> 
                                    <Col span={24}>
                                    <Title level={3} className="title-secondary">{q.title}</Title>
                                    </Col>
                                    <Col span={24} className="tags-container"> 
                                        {
                                            q?.tags.map((t)=>(
                                            <Text className="chat-tag" key={t.id}>{t.name}</Text>
                                            ))
                                        }
                                        <Text className="title-secondary author">توسط <Text className="title-secondary author-name">{q.user.username}</Text> در <Text className="title-secondary date">{time} {date}</Text></Text>

                                    </Col>
                                </Row>
                                     
                            </Col>
                            <Col span={2}>
                                <Row gutter={[0, 10]}>
                                    <Col span={24}><Text className="view title-secondary"><Text className="view-count title-secondary">200</Text> مشاهده</Text></Col>
                                    <Col span={24}><Text className="message title-secondary"><Text className="message-count title-secondary">{q.message_count}</Text> پیام</Text></Col>
                                </Row>
                            </Col>
                            <Col span={4}>
                                <CustomButton href={`/chat/` + q.chat_id}>ثبت پاسخ</CustomButton>
                            </Col>
                        </Row>
                        )})
                        }
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

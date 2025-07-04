"use client"
import { Button, Col, Row, Typography } from "antd";
import "./home.css"
import CustomButton from "@/components/CustomButton";
import Ribbon from "antd/es/badge/Ribbon";

const {Text, Title, Paragraph} = Typography
export default function Home() {
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
                        <CustomButton href="#">ثبت سوال</CustomButton>
                    </Col>
                </Row>
            </Col>
            <Col className="topics" sm={16} xs={20}>
                <Row>
                    <Title level={2}>تاپیک ها</Title>
                </Row>
                <Row gutter={[10, 10]} justify={"center"}>
                    <Col sm={11} xs={23}>
                        <Button className="topic-btn">اداری</Button>
                    </Col>
                    <Col sm={11} xs={23}>
                        <Button className="topic-btn">آموزشی</Button>
                    </Col>
                    <Col sm={11} xs={23}>
                        <Button className="topic-btn">فنی مهندسی</Button>
                    </Col>
                    <Col sm={11} xs={23}>
                        <Button className="topic-btn">علوم پایه</Button>
                    </Col>
                    <Col sm={11} xs={23}>
                        <Button className="topic-btn"></Button>
                    </Col>
                    <Col sm={11} xs={23}>
                        <Button className="topic-btn"></Button>
                    </Col>
                </Row>
            </Col>
            <Col className="top-chats" span={22}>
                <Row>
                    <Title level={2}>داغترین چت ها</Title>
                </Row>
                <Row>
                    <Col span={24}>
                        <Row className="question">
                            <Col span={18}>
                                <Row gutter={[0, 20]}>
                                    <Col span={24}>
                                    <Title level={3} className="title-secondary">متن سوال</Title>
                                    </Col>
                                    <Col span={24}> 
                                        <Text className="chat-tag">tag1</Text>
                                        <Text className="chat-tag">tag2</Text>
                                        <Text className="chat-tag">tag3</Text>
                                        <Text className="title-secondary author">توسط <Text className="title-secondary author-name">saeed</Text> در <Text className="title-secondary date">121</Text></Text>

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
    );
}

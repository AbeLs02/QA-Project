"use client"
import { Col, Row, Typography } from "antd";
import "./home.css"

const {Text, Title, Paragraph} = Typography
export default function Home() {
    return (
        <Col>
            <Row className="about-site" justify={"center"}>
                <Col span={24}>
                    <Title level={3}>اینجا کجاست؟</Title>
                </Col>
                <Col span={20}>
                    <Paragraph>
                        اینجا یا به عبارتی دانشجویار یک بستر آنلاین برای پرسش و پاسخ میان برای شما دانشجویان است.
                    </Paragraph>
                    <Paragraph>
                         اینجا جایی‌ست که اگر سوالی درسی، پروژه‌ای، آموزشی و اداری و یا حتی مشاوره‌ای برایت پیش آمد، می‌توانی آن را با دیگر دانشجویان و پاسخ‌دهندگان در میان بگذاری.
                    </Paragraph>
                         با هر سوال، یک گفت‌وگوی اختصاصی (چت) ایجاد می‌شود که دیگران نیز می‌توانند به آن وارد شوند و پاسخ دهند.
                         همه‌ی سوالات و پاسخ‌ها در سایت باقی می‌مانند، تا هر دانشجویی در آینده بتواند پاسخ سوال خود را سریع‌تر پیدا کند.
                         دانشجویار یعنی دانشجو تنها نیست.
                    
                </Col>
                
            </Row>
            <Row className="make-question"></Row>
            <Row className="topics"></Row>
            <Row className="top-chats"></Row>
        </Col>
    );
}

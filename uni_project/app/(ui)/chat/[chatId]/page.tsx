"use client"
import { Col, Input, Row, Typography, Image } from "antd"
import { useParams, useRouter } from "next/navigation";

import "./chat.css"
import CustomInput from "@/components/CustomInput";
import { useEffect, useRef, useState } from "react";
import CustomButton from "@/components/CustomButton";
import sendIcon from "@/public/images/send_logo.png"
import { getChat } from "@/lib/api";
import { useAuth } from "@/context/authContext";
const {Text, Title} = Typography
import userLogo from "@/public/images/user.png"

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

interface MessageType {
    id: number;
    sender: UserType;
    message: string;
    sent_at: string;
};

interface TagType {
    id: number;
    name: string;
    slug: string;
}
interface CategoryType {
    name: string;
    slug: string
}
interface QuestionType {
    id: number;
    user: UserType;
    title: string;
    description: string;
    category: CategoryType;
    tags: TagType[];
    chat_id: number;
    created_at: string;

}
interface ChatType {
    id: number;
    messages: MessageType;
    question: QuestionType;
};

const Chat = () => {
    const {user} = useAuth()
    const params = useParams()
    const [socket, setSocket] = useState<WebSocket>();
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [question, setQuestion] = useState<QuestionType>();
    const [input, setInput] = useState('');
    const [chat, setChat] = useState<ChatType>();
    const refrenceEnd = useRef<HTMLDivElement>(null);

    const chatId = params.chatId
    const router = useRouter();
    if (chatId == "null"){
        return (
            <Row justify={"center"}>
                <Col>
                    <Row justify={"center"}>
                        <Title level={1}>چتی یافت نشد!</Title>
                    </Row>
                    <Row justify={"center"}>
                        <CustomButton customVariant="linkSecondary" onClick={()=>router.back()}>بازگشت به صفحه قبل</CustomButton>
                    </Row>
                </Col>

            </Row>
        )
    }

    useEffect(()=>{
        const fetchData = async ()=>{
            const chat = await getChat(chatId)
            setChat(chat)
            setMessages(prev => [...prev, ...chat.messages])
            setQuestion(chat.question)
            refrenceEnd.current?.scrollIntoView({ behavior: 'smooth' });

        }
        fetchData()
    }, [])
    
    useEffect(()=>{
        const ws = new WebSocket(`ws://localhost:8000/ws/chat/${chatId}/`);
        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log(data)
            setMessages(prev => [data.message, ...prev]);
            refrenceEnd.current?.scrollIntoView({ behavior: 'smooth' });
        };

        setSocket(ws);

        return () => {
        ws.close();
        };
    }, [chatId])
    useEffect(() => {
        refrenceEnd.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    const sendMessage = () => {
        if (socket && socket.readyState === WebSocket.OPEN && input.trim()) {
            socket.send(JSON.stringify({ message: input, user_id: user?.id }));
            setInput('');
    } else {
        console.warn("ارتباط سوکت برقرار نیست نمیتوان پیام فرستاد");
    }
    };
    
    return (
        <Row justify={"center"}>
            <Col className="chat-base-container" xs={22} lg={15}>
                <Row justify={"center"} gutter={[0, 20]}>
                    <Col span={24}>
                        <Text className="ques-mark">?</Text>
                        <Text className="chat-title">دانشجویار</Text>
                    </Col>
                    <Col span={24}>
                        <Row className="chat-container" gutter={[0, 10]}>
                            <Col className="ques-info" span={24}>
                                <Row gutter={[0, 10]}>
                                    <Col span={24}>
                                        <Text className="ques-title">&lt;{question?.category?.name}&gt;</Text>
                                    </Col>
                                    <Col span={24}>
                                        <Title level={3} className="ques-title">{question?.title}</Title>
                                    </Col>
                                    <Col>
                                        <Text>توضیحات: </Text>
                                        <Text className="ques-description">
                                            {
                                            question?.description ? question?.description:
                                            "ندارد"
                                            }
                                        </Text>
                                    </Col>
                                    <Col className="ques-tags-container" span={24}>
                                        {
                                            question?.tags.map((t)=>(
                                                <Text className="ques-tag" key={t.id}>{t.name}</Text>
                                            ))
                                        }
                                    </Col>
                                </Row>
                            </Col>
                            <Col className="chat" span={24}>
                                <Row className="message-container">
                                    <Col span={24}>
                                    <Row gutter={[0, 5]} >
                                    {   messages.length === 0 ? 
                                    <Col className="no-message"><Title level={3}>پیامی وجود ندارد!</Title></Col> :
                                        messages.slice().reverse().map((message)=>{
                                            const date = new Date(message?.sent_at)
                                            const time = date.toLocaleTimeString("en-IR") + " " + date.toLocaleDateString("en-IR")
                                            return (
                                        <Col span={24} key={message.id} className={question?.user?.id == message?.sender?.id ? "" : "other"}>
                                            <Row align={"bottom"}>
                                                <Col className="profile">
                                                    <Image preview={false} src={message?.sender?.profile ? message?.sender?.profile : userLogo.src}/>
                                                </Col>
                                                <Col className={question?.user?.id == message?.sender?.id ? "message-own" : "message-other"}>
                                                    <Title level={5}>{message?.sender?.username}</Title>
                                                    {message.message}
                                                    <Text>{time}</Text>
                                                </Col>
                                            </Row>
                                        </Col>
                                        )})
                                    }
                                    <div ref={refrenceEnd} />
                                    </Row></Col>
                                </Row>
                                <Row className="message-input-container" align={"middle"}>
                                    <Col flex={"auto"}>
                                        <Input value={input} onChange={(e)=>setInput(e.target.value)} variant="borderless" className="message-input"/>
                                    </Col>
                                    <Col>
                                        <button
                                            onClick={()=>sendMessage()}
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
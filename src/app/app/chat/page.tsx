"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Chat.module.css";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Send, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { GeminiService } from "@/lib/services/gemini";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! I am your Smart JalRakshak Assistant powered by Google Gemini. Ask me about flood risks or water safety!", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userText = input;
        const newMsg: Message = { id: Date.now(), text: userText, sender: "user" };

        setMessages(prev => [...prev, newMsg]);
        setInput("");
        setIsTyping(true);

        try {
            // Call Gemini Service
            const response = await GeminiService.generateResponse(userText);

            const botMsg: Message = {
                id: Date.now() + 1,
                text: response,
                sender: "bot"
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.header}>
                <div className={styles.botIconWrapper}>
                    <Bot size={20} />
                </div>
                <div className={styles.headerTitle}>
                    <h1>JalRakshak AI</h1>
                    <p className={styles.onlineStatus}>
                        <span className={styles.statusDot}></span> Online
                    </p>
                </div>
            </div>

            <div className={styles.messageList} ref={scrollRef}>
                {messages.map((msg) => (
                    <div key={msg.id} className={cn(styles.messageRow, msg.sender === 'user' ? styles.user : styles.bot)}>
                        <div className={cn(styles.avatar, msg.sender === 'user' ? styles.user : styles.bot)}>
                            {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                        </div>
                        <div className={cn(styles.bubble, msg.sender === 'user' ? styles.user : styles.bot)}>
                            {/* Simple Markdown parsing for simulation bolding */}
                            <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }}></p>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className={styles.typingIndicator}>
                        <div className={cn(styles.avatar, styles.bot)}>
                            <Bot size={14} />
                        </div>
                        <div className={styles.typingBubble}>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSend} className={styles.inputForm}>
                <Input
                    placeholder="Ask Gemini about flood levels..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ borderRadius: '999px' }} // Quick inline override for pill shape
                />
                <Button type="submit" size="icon" className={styles.sendButton}>
                    <Send size={18} />
                </Button>
            </form>
        </div>
    );
}

"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./Chat.module.css";
import { useData } from "@/lib/contexts/DataContext";
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
    const { userRole } = useData();
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showMenu, setShowMenu] = useState(true);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const CHAT_MENUS = {
        citizen: [
            { label: "🌊 Flood Risk", query: "Is my area at flood risk today?" },
            { label: "📍 River Status", query: "Current river water level status" },
            { label: "🧪 Water Safety", query: "Is the water safe to drink?" },
            { label: "🚨 Alerts", query: "Any active alerts in my ward?" },
            { label: "📢 Help", query: "How do I raise a complaint?" },
        ],
        admin: [
            { label: "📊 Rising Levels", query: "Show wards with rising water levels" },
            { label: "🚧 Unresolved", query: "List unresolved complaints" },
            { label: "🚨 Critical Alerts", query: "Any critical alerts in the last 24 hours?" },
            { label: "🧪 Quality Trends", query: "Water quality anomalies this week" },
            { label: "⚙️ System", query: "System health status" }
        ]
    };

    const currentMenu = userRole === 'admin' ? CHAT_MENUS.admin : CHAT_MENUS.citizen;

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;

        const newMsg: Message = { id: Date.now(), text: text, sender: "user" };
        setMessages(prev => [...prev, newMsg]);
        setInput("");
        setIsTyping(true);
        setShowMenu(false); // Auto-hide menu on interaction layout if preferred, or keep it? explicit requirements say "Queries should collapse or scroll after interaction"

        // Smooth scroll to bottom
        setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }), 100);

        try {
            const response = await GeminiService.generateResponse(text);
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

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
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

            {/* Quick Actions Menu */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 overflow-x-auto whitespace-nowrap flex gap-2 scrollbar-hide">
                {currentMenu.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => sendMessage(item.query)}
                        className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-blue-100 text-blue-700 text-sm font-medium hover:bg-blue-50 hover:border-blue-200 transition-colors shadow-sm active:scale-95"
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <form onSubmit={handleSend} className={styles.inputForm}>
                <Input
                    placeholder="Ask Gemini about flood levels..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{ borderRadius: '999px' }}
                />
                <Button type="submit" size="icon" className={styles.sendButton}>
                    <Send size={18} />
                </Button>
            </form>
        </div>
    );
}

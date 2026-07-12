import { useState, useRef, useEffect } from "react";
import { FaArrowUpLong } from "react-icons/fa6";

type Chat = {
    owner: string;
    content: string;
};

const INITIAL_MESSAGES: Chat[] = [
    { owner: "assistant", content: "Hello! I'm Himanshu's virtual assistant. How can I help you today?" },
];

export const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Chat[]>(INITIAL_MESSAGES);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const send = async () => {
        const text = input.trim();
        if (!text) return;
        setInput("");
        setMessages((prev) => [...prev, { owner: "user", content: text }]);
        setLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reply`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [{ role: "user", content: text }] }),
            });
            const data = await res.json();
            const reply = data.response
            setMessages((prev) => [...prev, { owner: "assistant", content: reply }]);
        } catch {
            setMessages((prev) => [...prev, { owner: "assistant", content: "Sorry, I couldn't reach the server." }]);
        }
        setLoading(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") send();
    };
 
    return (
        <>
            {open && (
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-2xl w-[calc(100vw-2rem)] sm:w-80 md:w-96 max-w-screen max-h-[60vh] sm:max-h-[65vh] flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center gap-3 px-3 sm:px-4 py-3 border-b border-[#2a2a2a]">
                        <img
                            className="h-8 w-8 rounded-full object-cover"
                            src="/svg/bot.png"
                            alt="bot"
                        />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-white">Himanshu's Bot</span>
                            <span className="text-[10px] text-green-400">● Online</span>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 scroll-smooth overscroll-contain" data-lenis-prevent>
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.owner === "assistant" ? "justify-start" : "justify-end"}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed break-words ${
                                        msg.owner === "assistant"
                                            ? "bg-[#252525] text-gray-200"
                                            : "bg-[#F05038] text-white"
                                    }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-[#252525] text-gray-400 rounded-xl px-3 py-2 text-sm">
                                    <span className="animate-pulse">● ● ●</span>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input */}
                    <div className="border-t border-[#2a2a2a] p-2 sm:p-3">
                        <div className="flex items-center gap-2 bg-[#252525] rounded-xl px-2 sm:px-3 py-2">
                            <input
                                className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
                                placeholder="Ask me anything..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                onClick={send}
                                className="bg-[#F05038] hover:bg-[#d4442f] p-2 rounded-full text-white transition-colors"
                            >
                                <FaArrowUpLong size={12} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle button */}
            <button
                onClick={() => setOpen(!open)}
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full cursor-pointer bg-[#F05038] hover:bg-[#d4442f] flex items-center justify-center shadow-lg transition-colors"
            >
                {open ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-4 0H9v2h2V9z" clipRule="evenodd" />
                    </svg>
                )}
            </button>
        </>
    );
};

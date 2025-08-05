import { ArrowLeft, SendHorizontal, Menu, Mic, PlusCircle } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Define the type for the props, keeping the original structure.
interface ChatsPropsType {
    isChatToggle: boolean;
    setIsChatToggle: (panel: boolean) => void;
}

// Define a type for a single message object for clarity.
interface Message {
    id: number;
    sender: 'me' | 'them';
    text: string;
    timestamp: string;
}

// Mock data to populate the chat for a realistic look.
const mockMessages: Message[] = [
    { id: 1, sender: 'them', text: "Hey there! How's it going?", timestamp: '10:01 AM' },
    { id: 2, sender: 'me', text: "It's going well, thanks for asking! What have you been up to?", timestamp: '10:02 AM' },
    { id: 3, sender: 'them', text: "Just working on a new project. It's challenging but fun.", timestamp: '10:03 AM' },
    { id: 4, sender: 'them', text: "I've been playing around with a new design framework. It's a game changer.", timestamp: '10:04 AM' },
    { id: 5, sender: 'me', text: "That sounds great! I've been doing some front-end development.", timestamp: '10:05 AM' },
    { id: 6, sender: 'them', text: "The responsive layout is a lifesaver.", timestamp: '10:05 AM' },
    { id: 7, sender: 'me', text: "Totally agree. It makes everything much cleaner.", timestamp: '10:06 AM' },
    { id: 8, sender: 'them', text: "Are you free to grab a coffee tomorrow?", timestamp: '10:07 AM' },
    { id: 9, sender: 'me', text: "Yeah, that sounds perfect. Let's do it!", timestamp: '10:08 AM' },
    { id: 10, sender: 'them', text: "Awesome! I'll ping you in the morning to confirm the time.", timestamp: '10:09 AM' },
    { id: 11, sender: 'me', text: "Sounds good. Talk to you then!", timestamp: '10:10 AM' },
];

// Animation variants for the messages to create a unique entry effect.
const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// The main Chats component.
const Chats: React.FC<ChatsPropsType> = ({ isChatToggle, setIsChatToggle }) => {
    // Reference for the chat messages container to enable auto-scrolling.
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [mockMessages]);

    return (
        <div className={`flex-1 flex flex-col h-dvh bg-gray-100 max-[800px]:absolute max-[800px]:w-dvw max-[800px]:z-20 top-0 transition-all duration-300 ${isChatToggle ? "left-0" : "left-full"}`}>
            {/* Header section redesigned for a Discord-like channel feel */}
            <motion.div
                className="flex items-center justify-between px-4 py-2 bg-white backdrop-blur-lg bg-opacity-70 border-b border-gray-200 sticky top-0 z-10 shadow-md"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center space-x-4">
                    <motion.button
                        onClick={() => setIsChatToggle(false)}
                        className="text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ArrowLeft size={24} />
                    </motion.button>
                    <div className="flex flex-col">
                        <span className="font-bold text-xl text-gray-900">#general-chat</span>
                        <span className="text-sm text-gray-500">Discuss all things with the team.</span>
                    </div>
                </div>
            </motion.div>

            {/* Main message area with a Discord-like layout */}
            <motion.div
                className="flex-1 overflow-y-auto px-4 py-8 space-y-4"
                initial="hidden"
                animate="visible"
                variants={{
                    visible: {
                        transition: {
                            staggerChildren: 0.1,
                        },
                    },
                }}
            >
                {mockMessages.map((message, index) => {
                    const isGrouped = index > 0 && mockMessages[index - 1].sender === message.sender;
                    const showAvatar = !isGrouped;
                    const senderName = message.sender === 'me' ? 'You' : 'Jane Doe';

                    return (
                        <motion.div
                            key={message.id}
                            className={`flex items-start gap-3 transition-all duration-300 ${showAvatar ? 'mt-4' : 'mt-1'}`}
                            variants={messageVariants}
                        >
                            {/* Avatar and name, only shown for the first message in a group */}
                            <div className="flex-shrink-0">
                                {showAvatar ? (
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
                                        <img
                                            src={`https://placehold.co/40x40/${message.sender === 'me' ? '3b82f6' : '9ca3af'}/ffffff?text=${senderName[0]}`}
                                            alt={`${senderName} Profile`}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10" />
                                )}
                            </div>

                            {/* Message content */}
                            <div className="flex flex-col">
                                {showAvatar && (
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-900">{senderName}</span>
                                        <span className="text-xs text-gray-400">{message.timestamp}</span>
                                    </div>
                                )}
                                <div
                                    className={`p-3 rounded-lg max-w-[80%] md:max-w-[70%] transition-colors duration-200 ${
                                        message.sender === 'me'
                                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                                            : 'bg-white text-gray-800 hover:bg-gray-50'
                                    }`}
                                >
                                    <p className="text-sm md:text-base leading-snug">{message.text}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
                <div ref={messagesEndRef} />
            </motion.div>

            {/* Redesigned message input bar with a more unique, minimalist aesthetic */}
            <motion.div
                className="flex items-center p-2 mx-4 mb-4 rounded-xl bg-white shadow-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <motion.button
                    className="p-2 text-gray-500 hover:text-blue-500 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <PlusCircle size={24} />
                </motion.button>
                <motion.input
                    type="text"
                    placeholder="Send a message..."
                    className="flex-1 p-2 bg-transparent focus:outline-none text-sm md:text-base"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    whileFocus={{ scale: 1.01 }}
                />
                <motion.button
                    className="p-2 text-gray-500 hover:text-blue-500 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Mic size={24} />
                </motion.button>
                <motion.button
                    className="p-2 ml-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <SendHorizontal size={24} />
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Chats;
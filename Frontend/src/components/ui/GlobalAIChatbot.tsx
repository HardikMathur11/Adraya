import React, { useState } from 'react';
import { Sparkles, MessageSquare, X, Send, Bot, CheckCircle2 } from 'lucide-react';
import { useSessionStore } from '../../store/useSessionStore';
import { sendAssistantMessage } from '../../lib/api/assistant';

export const GlobalAIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeRole } = useSessionStore();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ sender: 'ai' | 'user'; text: string }[]>([
    {
      sender: 'ai',
      text:
        activeRole === 'customer'
          ? 'Namaste! I am your Heritage Atelier AI Guide. Ask me about silk care, GI tag authenticity, weaver stories, or styling recommendations.'
          : 'Namaste Radha! I am your Weaver Brand AI. Ask me to auto-write stories, suggest luxury pricing, or draft Instagram captions.',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    const res = await sendAssistantMessage(userText);
    setIsTyping(false);
    setMessages((prev) => [...prev, { sender: 'ai', text: res.reply }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-5 py-3 bg-[#6B1E28] text-[#E8D8A8] border-2 border-[#C9A227] rounded-full shadow-2xl hover:bg-[#3F0F17] hover:scale-105 transition-all duration-300 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-[#3F0F17] flex items-center justify-center border border-[#C9A227] group-hover:rotate-12 transition-transform">
            <Sparkles className="w-4 h-4 text-[#C9A227]" />
          </div>
          <span className="font-sans font-bold text-xs uppercase tracking-wider">
            {activeRole === 'customer' ? 'Atelier AI Guide' : 'Weaver AI Assistant'}
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-[#FBF7EF] border-2 border-[#C9A227] rounded-[6px] w-[360px] sm:w-[400px] h-[500px] shadow-2xl flex flex-col justify-between overflow-hidden text-xs">
          
          {/* Header */}
          <div className="bg-[#3F0F17] text-[#F7F1E6] p-4 border-b border-[#C9A227]/40 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#6B1E28] border border-[#C9A227] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#C9A227]" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-[#F7F1E6]">
                  {activeRole === 'customer' ? 'Heritage Atelier AI Guide' : 'Weaver AI Brand Assistant'}
                </h4>
                <span className="text-[10px] text-[#0B3D2E] font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Online • 24/7 AI Heritage Active
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 text-[#F7F1E6]/70 hover:text-[#C9A227] cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F7F1E6]">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] p-3 rounded text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#6B1E28] text-[#F7F1E6]'
                      : 'bg-[#3F0F17] text-[#F7F1E6] border border-[#C9A227]/30'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="text-[10px] font-editorial italic text-[#8A7A68]">
                AI Heritage Assistant is crafting response...
              </div>
            )}
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-[#FBF7EF] border-t border-[#C9A227]/20 flex gap-2 overflow-x-auto scrollbar-none text-[10px]">
            {activeRole === 'customer' ? (
              <>
                <button onClick={() => setInput('How do I verify GI tag authenticity?')} className="px-2.5 py-1 bg-[#F7F1E6] border border-[#C9A227]/40 rounded whitespace-nowrap hover:bg-[#6B1E28] hover:text-white cursor-pointer">
                  GI Tag Guide
                </button>
                <button onClick={() => setInput('How do I care for Mulberry silk?')} className="px-2.5 py-1 bg-[#F7F1E6] border border-[#C9A227]/40 rounded whitespace-nowrap hover:bg-[#6B1E28] hover:text-white cursor-pointer">
                  Silk Care Tips
                </button>
              </>
            ) : (
              <>
                <button onClick={() => setInput('Suggest fair luxury price for double-Ikat saree')} className="px-2.5 py-1 bg-[#F7F1E6] border border-[#C9A227]/40 rounded whitespace-nowrap hover:bg-[#6B1E28] hover:text-white cursor-pointer">
                  Suggest Fair Price
                </button>
                <button onClick={() => setInput('Write Instagram caption for my new weave')} className="px-2.5 py-1 bg-[#F7F1E6] border border-[#C9A227]/40 rounded whitespace-nowrap hover:bg-[#6B1E28] hover:text-white cursor-pointer">
                  Instagram Caption
                </button>
              </>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#3F0F17] border-t border-[#C9A227]/30 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={activeRole === 'customer' ? 'Ask AI about drapes, GI tags, silk care...' : 'Ask AI to write story, set price, captions...'}
              className="flex-1 px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded text-xs focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="px-3 py-2 bg-[#C9A227] text-[#3F0F17] rounded font-bold hover:bg-[#E8D8A8] transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};

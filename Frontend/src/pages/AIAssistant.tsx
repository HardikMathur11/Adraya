import React, { useState } from 'react';
import { Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { sendAssistantMessage } from '../lib/api/assistant';
import { Button } from '../components/ui/Button';
import { GoldLabel } from '../components/ui/GoldLabel';

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState([
    { sender: 'assistant', text: 'Hello Radha! Tell me about the piece you just finished, and I will help you write something buyers will fall in love with.' },
  ]);
  const [input, setInput] = useState('');
  const [draft, setDraft] = useState({
    title: 'Pochampally Double-Ikat Peacock Saree',
    price: 18500,
    weaverShare: '82% (₹15,170)',
    story: 'Handwoven in Pochampally over 140 hours using double-Ikat resist-dyeing passed down across generations.',
  });

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query) return;

    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setInput('');

    const res = await sendAssistantMessage(query);
    setMessages((prev) => [...prev, { sender: 'assistant', text: res.reply }]);
    if (res.draftUpdate?.generatedStory) {
      setDraft((prev) => ({ ...prev, story: res.draftUpdate.generatedStory }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-[#C9A227]/30 pb-4 flex justify-between items-center">
        <div>
          <GoldLabel>ARTISAN AI BRAND ASSISTANT</GoldLabel>
          <h1 className="font-display text-3xl font-bold text-[#3F0F17] mt-1">AI Story & Listing Assistant</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Chat Console */}
        <div className="lg:col-span-7 bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-6 shadow-fabric space-y-4 flex flex-col h-[520px]">
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#6B1E28] text-[#F7F1E6]'
                    : 'bg-[#3F0F17] text-[#F7F1E6] border border-[#C9A227]/30'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask AI about story, Instagram captions, or fair pricing..."
              className="flex-1 px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded text-xs focus:outline-none"
            />
            <Button variant="gold" size="sm" onClick={() => handleSend()}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Right Live Preview Panel */}
        <div className="lg:col-span-5 bg-[#3F0F17] text-[#F7F1E6] border-2 border-[#C9A227] rounded p-6 shadow-2xl space-y-4">
          <div className="border-b border-[#C9A227]/30 pb-3">
            <span className="text-[10px] uppercase tracking-widest text-[#E8D8A8]">Live Listing Preview</span>
            <h3 className="font-display font-bold text-lg text-[#F7F1E6]">{draft.title}</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[10px] text-[#8A7A68] uppercase block font-semibold">Generated Provenance Story</span>
              <p className="font-editorial text-sm italic text-[#F7F1E6]/90 mt-1">"{draft.story}"</p>
            </div>

            <div className="p-3 bg-[#6B1E28] rounded border border-[#C9A227]/20 flex justify-between items-center">
              <span>Fair Luxury Price</span>
              <span className="font-display font-bold text-base text-[#C9A227]">₹{draft.price.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <Button variant="gold" size="md" className="w-full">
            <CheckCircle2 className="w-4 h-4 mr-2" /> Publish to Atelier
          </Button>
        </div>

      </div>
    </div>
  );
};

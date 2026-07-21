'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Send, Globe, CheckCircle, RefreshCw, Layers, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GoldLabel } from '@/components/ui/GoldLabel';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Namaste! I am your WeaveHeritage AI Brand Assistant. Select a suggestion below or tell me about your weave to generate luxury narrative text, fair price estimates, or multilingual translations.',
    },
  ]);

  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState<'preview' | 'translations'>('preview');
  const [selectedLanguage, setSelectedLanguage] = useState<'hi' | 'as' | 'bn' | 'ta'>('hi');

  // Live Preview Panel State
  const [previewData, setPreviewData] = useState({
    title: 'Sovereign Golden Muga Jamdani Drape',
    story: 'Hand-woven over 240 pit loom hours in Sualkuchi, this golden Muga silk drape features traditional Kingfisher and Orchid motifs, naturally radiant without artificial dyes.',
    price: '185000',
    translations: {
      hi: 'सुआलकुची में 240 घंटों की नक्काशीदार बुनाई से तैयार किया गया यह प्राकृतिक सुनहरा मुगा सिल्क साड़ी समृद्ध परंपरा का प्रतीक है।',
      as: 'শুৱালকুছিৰ ৰেচম বস্ত্ৰনগৰীত ২৪০ ঘণ্টাৰ হাতেৰে বোৱা সোণালী মুগা ৰেচমৰ ক্লাছিক মেখেলা চাদৰ।',
      bn: 'সুয়ালকুচিতে ২৪০ ঘণ্টার হাতে বোনা প্রাকৃতিক সোনালী মুগা সিল্কের ঐতিহ্যবাহী শাড়ি।',
      ta: 'சுவால்குச்சியில் 240 மணிநேரம் கைத்தறியில் நெய்யப்பட்ட இயற்கை தங்க முகா பட்டு சேலை.',
    },
  });

  const chips = [
    'Generate my product story',
    'Write an Instagram caption',
    'Suggest a fair price',
    'Translate my listing',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Simulate AI Response & Live Preview Update
    setTimeout(() => {
      let botResponse = 'I have updated your live listing preview on the right panel!';
      if (query.includes('Instagram')) {
        botResponse = '✨ Instagram Caption Generated: "Threads of gold spun under the Brahmaputra sun. Discover single-origin Assamese Muga silk handwoven over 240 hours. #WeaveHeritage #QuietLuxury #HandloomIndia"';
      } else if (query.includes('price')) {
        botResponse = 'Based on 240 labor hours and raw 24K gold zari wire appreciation, the fair luxury valuation is ₹1,85,000 (with 85% going directly to Master Weaver Biren Das).';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: botResponse,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-gold)]/30 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            AI Guild Storytelling Engine
          </span>
          <h1 className="font-display text-3xl font-bold text-[var(--color-wine)] mt-1">
            Artisan Brand Assistant
          </h1>
        </div>
        <Badge variant="verified">Live Co-Pilot Mode</Badge>
      </div>

      {/* Two-Column Layout (Chat left, Live Listing Preview right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Chat Console */}
        <div className="lg:col-span-7 bg-[var(--color-cream)] border border-[var(--color-gold)]/30 rounded-[var(--radius-card)] shadow-fabric flex flex-col h-[640px]">
          
          {/* Chat Message List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'assistant' && (
                  <div className="w-9 h-9 rounded-full border border-[var(--color-gold)] bg-[var(--color-wine)] text-[var(--color-gold)] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 stroke-[1.25]" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-[var(--radius-card)] p-4 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[var(--color-oxblood)] text-[var(--color-ivory)] rounded-br-none'
                      : 'bg-[var(--color-ivory)] border border-[var(--color-gold)]/30 text-[var(--color-charcoal)] font-editorial text-sm italic rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Suggestion Chips */}
          <div className="px-6 py-2 flex items-center gap-2 overflow-x-auto border-t border-[var(--color-gold)]/10 bg-[var(--color-ivory)]/50">
            {chips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="shrink-0 px-3 py-1 text-[11px] font-semibold text-[var(--color-wine)] bg-[var(--color-gold-light)]/40 border border-[var(--color-gold)]/40 rounded-full hover:bg-[var(--color-gold-light)] transition-colors cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-[var(--color-gold)]/30 bg-[var(--color-ivory)] flex items-center gap-3">
            <input
              type="text"
              placeholder="Ask AI to describe your weave, suggest prices, or translate..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-4 py-2.5 text-xs bg-white border border-[var(--color-gold)]/40 rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
            />
            <button
              onClick={() => handleSend()}
              className="p-2.5 bg-[var(--color-wine)] text-[var(--color-gold)] rounded hover:bg-[var(--color-oxblood)] transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Right Column: Live Listing Preview Panel */}
        <div className="lg:col-span-5 bg-[var(--color-wine)] text-[var(--color-ivory)] border-2 border-[var(--color-gold)] rounded-[var(--radius-card)] shadow-2xl p-6 space-y-6">
          
          <div className="flex items-center justify-between border-b border-[var(--color-gold)]/30 pb-3">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-gold-light)] font-semibold block">
                Real-Time Render
              </span>
              <h3 className="font-display font-bold text-lg text-[var(--color-ivory)]">
                Live Listing Preview Panel
              </h3>
            </div>
            
            <div className="flex gap-1 bg-[var(--color-oxblood)] p-1 rounded border border-[var(--color-gold)]/30 text-[10px]">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-2.5 py-1 rounded font-semibold ${
                  activeTab === 'preview' ? 'bg-[var(--color-gold)] text-[var(--color-wine)]' : 'text-[var(--color-ivory)]'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setActiveTab('translations')}
                className={`px-2.5 py-1 rounded font-semibold ${
                  activeTab === 'translations' ? 'bg-[var(--color-gold)] text-[var(--color-wine)]' : 'text-[var(--color-ivory)]'
                }`}
              >
                Translations
              </button>
            </div>
          </div>

          {activeTab === 'preview' ? (
            <div className="space-y-4">
              {/* Product Image Preview */}
              <div className="relative h-48 w-full rounded overflow-hidden border border-[var(--color-gold)]/40">
                <Image
                  src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=800"
                  alt="Live listing preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 z-10">
                  <GoldLabel>AI Draft Preview</GoldLabel>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-[var(--color-gold-light)] uppercase tracking-widest block">
                  Title
                </span>
                <h4 className="font-display font-bold text-base text-[var(--color-ivory)]">
                  {previewData.title}
                </h4>
              </div>

              <div>
                <span className="text-[10px] text-[var(--color-gold-light)] uppercase tracking-widest block">
                  Heritage Story Narrative
                </span>
                <p className="font-editorial text-sm italic text-[var(--color-ivory)]/90 leading-relaxed mt-1">
                  "{previewData.story}"
                </p>
              </div>

              <div className="pt-2 border-t border-[var(--color-gold)]/20 flex justify-between items-center">
                <div>
                  <span className="text-[10px] text-[var(--color-gold-light)] uppercase tracking-widest block">
                    Calculated Luxury Price
                  </span>
                  <span className="font-display font-bold text-xl text-[var(--color-gold)]">
                    ₹{parseInt(previewData.price).toLocaleString('en-IN')}
                  </span>
                </div>
                <Badge variant="verified">85% Weaver Share</Badge>
              </div>
            </div>
          ) : (
            /* Multilingual Translations Tab */
            <div className="space-y-4">
              <div className="flex gap-2 border-b border-[var(--color-gold)]/20 pb-3">
                {(['hi', 'as', 'bn', 'ta'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1 text-xs font-bold uppercase rounded ${
                      selectedLanguage === lang
                        ? 'bg-[var(--color-gold)] text-[var(--color-wine)]'
                        : 'bg-[var(--color-oxblood)] text-[var(--color-ivory)]'
                    }`}
                  >
                    {lang === 'hi' ? 'हिंदी' : lang === 'as' ? 'অসমীয়া' : lang === 'bn' ? 'বাংলা' : 'தமிழ்'}
                  </button>
                ))}
              </div>

              <div className="p-4 bg-[var(--color-oxblood)]/80 border border-[var(--color-gold)]/30 rounded space-y-2">
                <span className="text-[10px] text-[var(--color-gold-light)] uppercase tracking-widest block">
                  Translated Description ({selectedLanguage.toUpperCase()})
                </span>
                <p className="text-sm font-sans leading-relaxed text-[var(--color-ivory)]">
                  {previewData.translations[selectedLanguage]}
                </p>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-[var(--color-gold)]/30">
            <Link href="/">
              <Button variant="gold" size="lg" className="w-full flex items-center justify-center gap-2">
                <span>Publish Listing to Live Atelier</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}

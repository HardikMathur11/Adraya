'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, Mic, Sparkles, CheckCircle, User, MapPin, Scissors, Globe, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useSessionStore, LanguageCode } from '@/store/useSessionStore';

export default function WeaverOnboardingPage() {
  const { currentLanguage, setLanguage } = useSessionStore();
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    village: '',
    region: 'Assam',
    craftType: 'Muga Silk Jamdani',
    yearsExperience: '25',
    voiceRecorded: false,
    photoUploaded: false,
    generatedTitle: 'The Celestial Muga Lotus Jamdani Drape',
    generatedStory: 'Handwoven in the quiet banks of Sualkuchi, this silk drape incorporates lotus motifs representing purity and eternal abundance.',
    suggestedPrice: '145000',
  });

  const [isRecording, setIsRecording] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'hi', label: 'हिंदी' },
    { code: 'as', label: 'অসমীয়া' },
    { code: 'bn', label: 'বাংলা' },
    { code: 'ta', label: 'தமிழ்' },
    { code: 'en', label: 'English' },
  ];

  const handleVoiceRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setFormData((prev) => ({ ...prev, voiceRecorded: true }));
    }, 2500);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, photoUploaded: true }));
    }
  };

  const generateAiStory = () => {
    setIsAiGenerating(true);
    setTimeout(() => {
      setIsAiGenerating(false);
      setStep(3);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] text-[var(--color-charcoal)] py-8 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto flex flex-col justify-between">
      
      {/* Pinned Language Toggle at Top */}
      <div className="space-y-4">
        <div className="bg-[var(--color-wine)] text-[var(--color-ivory)] p-4 rounded-[var(--radius-card)] border border-[var(--color-gold)]/30 flex flex-wrap items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[var(--color-gold-light)]">
            <Globe className="w-4 h-4 text-[var(--color-gold)]" />
            <span>Select Voice / Language:</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`min-h-[44px] px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  currentLanguage === lang.code
                    ? 'bg-[var(--color-gold)] text-[var(--color-wine)] border-2 border-white shadow'
                    : 'bg-[var(--color-oxblood)] text-[var(--color-ivory)] hover:bg-[var(--color-gold)]/40'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        {/* Header Title */}
        <div className="text-center py-4 space-y-1">
          <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[var(--color-oxblood)] font-bold">
            ARTISAN GUILD DIRECT ONBOARDING
          </span>
          <h1 className="font-display text-3xl font-bold text-[var(--color-wine)]">
            Register Your Loom & Craft
          </h1>
          <p className="font-editorial text-sm italic text-[var(--color-taupe)]">
            Join the digital atelier. Connect directly with global luxury collectors.
          </p>
        </div>
      </div>

      {/* STEP 1: TELL US ABOUT YOURSELF */}
      {step === 1 && (
        <div className="bg-[var(--color-cream)] border-2 border-[var(--color-gold)]/40 rounded-[var(--radius-card)] p-6 sm:p-8 shadow-fabric space-y-6 my-6">
          <div className="border-b border-[var(--color-gold)]/30 pb-3">
            <h2 className="font-display font-bold text-xl text-[var(--color-oxblood)] flex items-center gap-2">
              <User className="w-5 h-5 text-[var(--color-gold)]" />
              Step 1: Tell Us About Yourself
            </h2>
            <p className="text-xs text-[var(--color-taupe)]">Basic artisan credentials for your provenance ledger.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-wine)] mb-1">
                Your Full Name (आपका पूरा नाम) *
              </label>
              <input
                type="text"
                placeholder="e.g. Biren Chandra Das"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full min-h-[48px] px-4 py-3 bg-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-wine)] mb-1">
                  Village / Cluster (गांव / कलस्टर) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sualkuchi"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full min-h-[48px] px-4 py-3 bg-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-wine)] mb-1">
                  State / Region *
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full min-h-[48px] px-4 py-3 bg-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
                >
                  <option value="Assam">Assam (অসম)</option>
                  <option value="Uttar Pradesh">Uttar Pradesh (उत्तर प्रदेश)</option>
                  <option value="Tamil Nadu">Tamil Nadu (தமிழ்நாடு)</option>
                  <option value="West Bengal">West Bengal (পশ্চিমবঙ্গ)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-wine)] mb-1">
                Craft Specialty (हस्तशिल्प विशेषता) *
              </label>
              <input
                type="text"
                placeholder="e.g. Muga & Eri Silk Jamdani"
                value={formData.craftType}
                onChange={(e) => setFormData({ ...formData, craftType: e.target.value })}
                className="w-full min-h-[48px] px-4 py-3 bg-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
              />
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full min-h-[48px] flex items-center justify-center gap-2"
            onClick={() => setStep(2)}
          >
            <span>Proceed to Craft Photo & Voice Note</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* STEP 2: SHOW US YOUR CRAFT */}
      {step === 2 && (
        <div className="bg-[var(--color-cream)] border-2 border-[var(--color-gold)]/40 rounded-[var(--radius-card)] p-6 sm:p-8 shadow-fabric space-y-6 my-6">
          <div className="border-b border-[var(--color-gold)]/30 pb-3">
            <h2 className="font-display font-bold text-xl text-[var(--color-oxblood)] flex items-center gap-2">
              <Camera className="w-5 h-5 text-[var(--color-gold)]" />
              Step 2: Show Us Your Craft
            </h2>
            <p className="text-xs text-[var(--color-taupe)]">
              Upload a photo or record your voice describing the piece—no typing required!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Native Camera Capture Button */}
            <label className="flex flex-col items-center justify-center min-h-[160px] p-6 bg-[var(--color-ivory)] border-2 border-dashed border-[var(--color-gold)] rounded-[var(--radius-card)] cursor-pointer hover:bg-[var(--color-gold-light)]/20 transition-colors text-center">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <div className="w-14 h-14 rounded-full bg-[var(--color-wine)] text-[var(--color-gold)] flex items-center justify-center mb-3">
                <Camera className="w-7 h-7" />
              </div>
              <span className="font-display font-bold text-sm text-[var(--color-wine)] uppercase">
                {formData.photoUploaded ? '✓ Photo Attached' : 'Take / Upload Photo'}
              </span>
              <span className="text-[10px] text-[var(--color-taupe)] mt-1">
                Opens camera directly on mobile
              </span>
            </label>

            {/* Voice Note Recording Button */}
            <button
              onClick={handleVoiceRecord}
              disabled={isRecording}
              className={`flex flex-col items-center justify-center min-h-[160px] p-6 border-2 border-dashed rounded-[var(--radius-card)] transition-colors text-center cursor-pointer ${
                formData.voiceRecorded
                  ? 'bg-[var(--color-emerald)]/10 border-[var(--color-emerald)]'
                  : 'bg-[var(--color-ivory)] border-[var(--color-gold)] hover:bg-[var(--color-gold-light)]/20'
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-[var(--color-oxblood)] text-[var(--color-gold-light)] flex items-center justify-center mb-3">
                <Mic className={`w-7 h-7 ${isRecording ? 'animate-bounce text-red-400' : ''}`} />
              </div>
              <span className="font-display font-bold text-sm text-[var(--color-wine)] uppercase">
                {isRecording
                  ? 'Listening to your Voice...'
                  : formData.voiceRecorded
                  ? '✓ Voice Note Recorded'
                  : 'Record Voice Note (बोलकर बताएं)'}
              </span>
              <span className="text-[10px] text-[var(--color-taupe)] mt-1">
                Speak in Hindi, Assamese, Bengali, or Tamil
              </span>
            </button>

          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="secondary" size="lg" onClick={() => setStep(1)} className="min-h-[48px]">
              Back
            </Button>
            <Button
              variant="gold"
              size="lg"
              className="flex-1 min-h-[48px] flex items-center justify-center gap-2"
              onClick={generateAiStory}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isAiGenerating ? 'AI Crafting Story...' : 'Let AI Help You Shine'}</span>
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: AI STORY PREVIEW CARD */}
      {step === 3 && (
        <div className="bg-[var(--color-cream)] border-2 border-[var(--color-gold)]/40 rounded-[var(--radius-card)] p-6 sm:p-8 shadow-fabric space-y-6 my-6">
          <div className="border-b border-[var(--color-gold)]/30 pb-3 flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-xl text-[var(--color-oxblood)] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--color-gold)]" />
                Step 3: AI-Generated Atelier Preview
              </h2>
              <p className="text-xs text-[var(--color-taupe)]">
                Review your luxury listing before publishing to global collectors.
              </p>
            </div>
            <Badge variant="verified">AI Provenance Draft</Badge>
          </div>

          {/* Preview Card */}
          <div className="bg-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded-[var(--radius-card)] p-6 space-y-4 shadow-sm">
            <div>
              <span className="text-[10px] uppercase font-semibold text-[var(--color-taupe)] tracking-widest block">
                Suggested Listing Title
              </span>
              <input
                type="text"
                value={formData.generatedTitle}
                onChange={(e) => setFormData({ ...formData, generatedTitle: e.target.value })}
                className="w-full font-display font-bold text-lg text-[var(--color-wine)] bg-transparent border-b border-[var(--color-gold)]/30 focus:outline-none py-1"
              />
            </div>

            <div>
              <span className="text-[10px] uppercase font-semibold text-[var(--color-taupe)] tracking-widest block">
                Generated Heritage Story
              </span>
              <textarea
                rows={3}
                value={formData.generatedStory}
                onChange={(e) => setFormData({ ...formData, generatedStory: e.target.value })}
                className="w-full font-editorial text-sm italic text-[var(--color-charcoal)] bg-transparent border border-[var(--color-gold)]/30 rounded p-2 focus:outline-none mt-1"
              />
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-[var(--color-gold)]/20">
              <div>
                <span className="text-[10px] uppercase font-semibold text-[var(--color-taupe)] tracking-widest block">
                  Suggested Fair Price (80%+ Direct Payout)
                </span>
                <span className="font-display font-bold text-xl text-[var(--color-oxblood)]">
                  ₹{parseInt(formData.suggestedPrice).toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-xs text-[var(--color-emerald)] font-semibold flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Artisan Payout Verified
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" size="lg" onClick={() => setStep(2)} className="min-h-[48px]">
              Edit Photo / Voice
            </Button>
            <Link href="/" className="flex-1">
              <Button variant="gold" size="lg" className="w-full min-h-[48px]">
                Approve & Publish to Atelier
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Gold 3-Dot Progress Indicator at Bottom */}
      <div className="flex items-center justify-center gap-3 py-4">
        {[1, 2, 3].map((idx) => (
          <div
            key={idx}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
              step >= idx
                ? 'bg-[var(--color-gold)] border-2 border-[var(--color-wine)] scale-110'
                : 'bg-[var(--color-taupe)]/40'
            }`}
          />
        ))}
      </div>

    </div>
  );
}

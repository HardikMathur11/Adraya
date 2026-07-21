import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Mic, Sparkles, CheckCircle2, Globe } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GoldLabel } from '../components/ui/GoldLabel';

export const Onboard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [village, setVillage] = useState('');
  const [craftType, setCraftType] = useState('Double-Ikat Silk Weave');
  const [isRecording, setIsRecording] = useState(false);
  const navigate = useNavigate();

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/weaver-dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <GoldLabel>ARTISAN ONBOARDING WIZARD</GoldLabel>
        <h1 className="font-display text-3xl font-bold text-[#3F0F17]">
          Join WeaveHeritage Lux Atelier
        </h1>
        <p className="font-editorial text-sm italic text-[#8A7A68]">
          Sell direct to luxury buyers worldwide with fair-share pricing and AI story support.
        </p>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-center items-center gap-3">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-3 h-3 rounded-full border border-[#C9A227] transition-all ${
              step === s ? 'bg-[#6B1E28] scale-125' : step > s ? 'bg-[#C9A227]' : 'bg-transparent'
            }`}
          />
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-6 shadow-fabric space-y-4 text-xs">
          <h3 className="font-display font-bold text-lg text-[#3F0F17]">Step 1 — Tell us about yourself</h3>
          
          <div>
            <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Your Full Name *</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Radha Devi" className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded focus:outline-none" />
          </div>

          <div>
            <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Village & Region *</label>
            <input type="text" required value={village} onChange={(e) => setVillage(e.target.value)} placeholder="e.g. Pochampally, Telangana" className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded focus:outline-none" />
          </div>

          <div>
            <label className="block uppercase font-semibold text-[#3F0F17] mb-1">Weaving Craft Specialty *</label>
            <select value={craftType} onChange={(e) => setCraftType(e.target.value)} className="w-full px-3 py-2 bg-[#F7F1E6] border border-[#C9A227]/40 rounded focus:outline-none">
              <option value="Double-Ikat Silk Weave">Double-Ikat Silk Weave</option>
              <option value="Kanjeevaram Temple Border">Kanjeevaram Temple Border</option>
              <option value="Assam Muga Silk Jacquard">Assam Muga Silk Jacquard</option>
              <option value="Kashmir Kani Needle Pashmina">Kashmir Kani Needle Pashmina</option>
            </select>
          </div>

          <Button variant="gold" size="md" type="submit" className="w-full">
            Next: Show Us Your Craft →
          </Button>
        </form>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-6 shadow-fabric space-y-6 text-xs text-center">
          <h3 className="font-display font-bold text-lg text-[#3F0F17]">Step 2 — Show us your craft</h3>
          <p className="font-editorial text-xs italic text-[#8A7A68]">
            Take a photo of your pit loom or record a voice note in your native language.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="p-6 bg-[#F7F1E6] border-2 border-dashed border-[#C9A227] rounded flex flex-col items-center gap-2 hover:bg-[#6B1E28]/10 cursor-pointer">
              <Camera className="w-8 h-8 text-[#6B1E28]" />
              <span className="font-bold text-[#3F0F17]">Upload Loom Photo</span>
            </button>

            <button
              type="button"
              onClick={() => setIsRecording(!isRecording)}
              className={`p-6 border-2 border-dashed rounded flex flex-col items-center gap-2 cursor-pointer ${
                isRecording ? 'bg-red-100 border-red-500 animate-pulse' : 'bg-[#F7F1E6] border-[#C9A227] hover:bg-[#6B1E28]/10'
              }`}
            >
              <Mic className="w-8 h-8 text-[#6B1E28]" />
              <span className="font-bold text-[#3F0F17]">{isRecording ? 'Recording Voice Note...' : 'Record Voice Note'}</span>
            </button>
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="secondary" size="sm" onClick={() => setStep(1)}>← Back</Button>
            <Button variant="gold" size="sm" onClick={() => setStep(3)}>Next: Generate Story with AI →</Button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="bg-[#3F0F17] text-[#F7F1E6] border-2 border-[#C9A227] rounded p-6 shadow-2xl space-y-6 text-xs">
          <div className="border-b border-[#C9A227]/30 pb-3">
            <GoldLabel>AI-GENERATED ARTISAN STORY</GoldLabel>
            <h3 className="font-display font-bold text-xl text-[#F7F1E6] mt-1">Step 3 — Let AI Help You Shine</h3>
          </div>

          <div className="p-4 bg-[#6B1E28] rounded border border-[#C9A227]/30 space-y-2">
            <span className="text-[10px] text-[#E8D8A8] uppercase font-mono">Draft Story Card</span>
            <p className="font-editorial text-sm italic text-[#F7F1E6]/90">
              "{name || 'Radha Devi'} has spent eighteen years mastering the sacred art of {craftType} in {village || 'Pochampally'}. Every drape is handwoven using traditional wooden pit looms."
            </p>
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="outline" size="sm" onClick={() => setStep(2)}>← Edit Inputs</Button>
            <Button variant="gold" size="md" onClick={handleFinish}>
              Approve & Launch My Atelier →
            </Button>
          </div>
        </div>
      )}

    </div>
  );
};

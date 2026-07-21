import React, { useEffect, useState } from 'react';
import { getCourses, markLessonComplete } from '../lib/api/courses';
import { Course } from '../lib/api/types';
import { Button } from '../components/ui/Button';
import { GoldLabel } from '../components/ui/GoldLabel';
import { CheckCircle2, BookOpen, Clock } from 'lucide-react';

export const Learn: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  const handleComplete = async (id: string) => {
    await markLessonComplete(id);
    loadCourses();
  };

  const completedCount = courses.filter((c) => c.completed).length;
  const progressPct = Math.round((completedCount / (courses.length || 1)) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      
      {/* Header & Loom Progress Tracker */}
      <div className="bg-[#3F0F17] text-[#F7F1E6] p-8 rounded border-2 border-[#C9A227] shadow-2xl space-y-6">
        <div>
          <GoldLabel>CRAFT EDUCATION HUB</GoldLabel>
          <h1 className="font-display text-3xl font-bold text-[#F7F1E6] mt-1">
            Selling & Presentation Masterclass
          </h1>
          <p className="font-editorial text-sm italic text-[#E8D8A8] mt-1">
            Empowering rural weavers to present their craft to global luxury markets.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-[#E8D8A8]">
            <span>Loom Thread Progress: {completedCount} of {courses.length} Courses Completed</span>
            <span>{progressPct}% Woven</span>
          </div>

          <div className="w-full h-3 bg-[#6B1E28] rounded-full overflow-hidden border border-[#C9A227]/40">
            <div
              className="h-full bg-gradient-to-r from-[#C9A227] to-[#E8D8A8] transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((c) => (
          <div key={c.id} className="bg-[#FBF7EF] border border-[#C9A227]/30 rounded p-6 shadow-fabric space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] uppercase font-semibold text-[#8A7A68]">
                <span>{c.category}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#C9A227]" /> {c.estimatedTime}</span>
              </div>
              <h3 className="font-display font-bold text-lg text-[#3F0F17]">{c.title}</h3>
              <p className="font-editorial text-xs italic text-[#8A7A68]">{c.description}</p>
              <div className="text-[10px] text-[#8A7A68]">Available in: {c.languages.join(', ')}</div>
            </div>

            <div className="pt-3 border-t border-[#C9A227]/20 flex justify-between items-center">
              {c.completed ? (
                <span className="text-xs font-bold text-[#0B3D2E] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#0B3D2E]" /> Completed
                </span>
              ) : (
                <Button variant="gold" size="sm" onClick={() => handleComplete(c.id)}>
                  Start Course
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

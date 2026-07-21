'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle, Clock, Globe, Award, Sparkles } from 'lucide-react';
import { COURSES, Course } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { GoldLabel } from '@/components/ui/GoldLabel';

export default function EducationHubPage() {
  const [coursesList, setCoursesList] = useState<Course[]>(COURSES);

  const completedCount = coursesList.filter((c) => c.completed).length;
  const progressPct = Math.round((completedCount / coursesList.length) * 100);

  const toggleCourseCompletion = (id: string) => {
    setCoursesList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-[var(--color-wine)] text-[var(--color-ivory)] p-8 sm:p-12 rounded-[var(--radius-card)] border-2 border-[var(--color-gold)] shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold-light)] bg-[var(--color-oxblood)] px-3 py-1 rounded border border-[var(--color-gold)]/30">
            Artisan Capacity Building & Mastery
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold text-[var(--color-ivory)]">
            Craft Education & Guild Hub
          </h1>
          <p className="font-editorial text-base italic text-[var(--color-ivory)]/80">
            Free masterclasses designed specifically for rural Indian weavers—covering global pricing economics, product photography, export packaging, and direct buyer terms.
          </p>
        </div>

        <Badge variant="verified">100% Free Guild Access</Badge>
      </div>

      {/* Loom Icon Animated Progress Tracker Bar */}
      <div className="bg-[var(--color-cream)] border-2 border-[var(--color-gold)]/40 rounded-[var(--radius-card)] p-6 shadow-fabric space-y-4">
        <div className="flex justify-between items-center text-xs font-semibold">
          <div className="flex items-center gap-2 text-[var(--color-wine)]">
            <BookOpen className="w-5 h-5 text-[var(--color-gold)]" />
            <span className="font-display font-bold text-sm uppercase tracking-wider">
              Your Guild Learning Loom Progress
            </span>
          </div>

          <span className="font-display font-bold text-base text-[var(--color-oxblood)]">
            {completedCount} / {coursesList.length} Modules Completed ({progressPct}%)
          </span>
        </div>

        {/* Loom Progress Bar with SVG Thread Path */}
        <div className="relative w-full h-4 bg-[var(--color-ivory)] border border-[var(--color-gold)]/40 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-woven-pattern bg-gradient-to-r from-[var(--color-gold-light)] via-[var(--color-gold)] to-[var(--color-gold-light)] rounded-full transition-all duration-700 shadow-md"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {coursesList.map((course) => (
          <div
            key={course.id}
            className={`bg-[var(--color-cream)] border-2 rounded-[var(--radius-card)] overflow-hidden shadow-fabric p-6 flex flex-col justify-between space-y-4 transition-all ${
              course.completed ? 'border-[var(--color-gold)] bg-[var(--color-gold-light)]/10' : 'border-[var(--color-gold)]/30'
            }`}
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <GoldLabel>{course.category}</GoldLabel>
                <button
                  onClick={() => toggleCourseCompletion(course.id)}
                  className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 p-1 rounded transition-colors ${
                    course.completed
                      ? 'text-[var(--color-emerald)] font-bold'
                      : 'text-[var(--color-taupe)] hover:text-[var(--color-wine)]'
                  }`}
                >
                  <CheckCircle className={`w-4 h-4 ${course.completed ? 'fill-current' : ''}`} />
                  <span>{course.completed ? 'Completed' : 'Mark Completed'}</span>
                </button>
              </div>

              <h3 className="font-display font-bold text-xl text-[var(--color-wine)] pt-1">
                {course.title}
              </h3>

              <p className="font-editorial text-sm italic text-[var(--color-charcoal)] leading-relaxed">
                "{course.description}"
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--color-gold)]/20 space-y-3">
              <div className="flex items-center justify-between text-xs text-[var(--color-taupe)]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                  Duration: {course.estimatedTime}
                </span>

                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                  {course.languages.join(', ')}
                </span>
              </div>

              <Button
                variant={course.completed ? 'secondary' : 'gold'}
                size="md"
                onClick={() => toggleCourseCompletion(course.id)}
                className="w-full"
              >
                {course.completed ? 'Review Module Lessons' : 'Start Free Guild Lesson'}
              </Button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

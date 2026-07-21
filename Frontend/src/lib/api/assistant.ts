export async function sendAssistantMessage(message: string): Promise<{ reply: string; draftUpdate?: any }> {
  await new Promise((res) => setTimeout(res, 400));

  const lower = message.toLowerCase();
  if (lower.includes('price') || lower.includes('cost')) {
    return {
      reply: 'Based on 140 loom hours and pure Mulberry silk raw materials, a fair luxury price is ₹18,500. This ensures ₹15,170 (82%) goes directly to you.',
      draftUpdate: { suggestedPrice: 18500, weaverSharePct: 82 },
    };
  }

  if (lower.includes('caption') || lower.includes('instagram')) {
    return {
      reply: 'Here is your Instagram caption: "Every thread tells a story woven over 140 hours in Pochampally. Handcrafted double-Ikat Mulberry silk with pure botanical dyes. Direct from loom to connoisseur. #WeaveHeritage #PochampallyIkat #HandloomLux"',
    };
  }

  return {
    reply: 'Radha, your double-Ikat peacock pattern is breathtaking! I have drafted a provenance story highlighting your 18 years of weaving mastery and organic indigo dyes.',
    draftUpdate: {
      generatedStory: 'Handwoven in Pochampally over 140 hours by Radha Devi. Using double-Ikat resist-dyeing passed down across generations.',
    },
  };
}

// Helper functions for the hospital management system

export const getSatisfactionEmoji = (score: number) => {
  if (score >= 95) return '🌟';
  if (score >= 90) return '👍';
  if (score >= 80) return '👌';
  return '⚠️';
};

export default {
  getSatisfactionEmoji
};
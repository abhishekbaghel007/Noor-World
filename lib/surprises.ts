// ─── Surprise Engine ───

export type SurpriseType =
  | 'butterfly'
  | 'flower'
  | 'note'
  | 'secret'
  | 'hiddenButton'
  | 'compliment';

// Default cooldowns in hours (how often each surprise can appear)
const SURPRISE_COOLDOWNS: Record<SurpriseType, number> = {
  butterfly: 1, // Every hour
  flower: 2,    // Every 2 hours
  note: 4,      // Every 4 hours
  secret: 6,    // Every 6 hours
  hiddenButton: 8, // Every 8 hours
  compliment: 3,  // Every 3 hours
};

/**
 * Check if a surprise can be shown based on cooldown
 * @param type The surprise type
 * @returns true if the surprise can be shown
 */
export function canShowSurprise(type: SurpriseType): boolean {
  const lastShown = localStorage.getItem('surprise_' + type);
  if (!lastShown) return true;
  
  const lastShownTime = parseInt(lastShown, 10);
  if (isNaN(lastShownTime)) return true;
  
  const cooldownMs = SURPRISE_COOLDOWNS[type] * 60 * 60 * 1000;
  return Date.now() - lastShownTime > cooldownMs;
}

/**
 * Mark a surprise as shown (update cooldown)
 * @param type The surprise type
 */
export function markSurpriseShown(type: SurpriseType): void {
  localStorage.setItem('surprise_' + type, Date.now().toString());
}

/**
 * Get a random surprise that is off cooldown
 * @returns The surprise type or null if all are on cooldown
 */
export function getAvailableSurprise(): SurpriseType | null {
  const surpriseTypes: SurpriseType[] = [
    'butterfly',
    'flower',
    'note',
    'secret',
    'hiddenButton',
    'compliment'
  ];
  
  const available = surpriseTypes.filter(canShowSurprise);
  if (available.length === 0) return null;
  
  // In a real implementation, we'd use a proper random function
  // For now, we'll just return the first available
  return available[0];
}

/**
 * Trigger a surprise (mark as shown and return the type)
 * @returns The surprise type that was triggered, or null if none available
 */
export function triggerSurprise(): SurpriseType | null {
  const surprise = getAvailableSurprise();
  if (surprise) {
    markSurpriseShown(surprise);
  }
  return surprise;
}

/**
 * Reset all surprise cooldowns (for special events)
 */
export function resetSurpriseCooldowns(): void {
  const surpriseTypes: SurpriseType[] = [
    'butterfly',
    'flower',
    'note',
    'secret',
    'hiddenButton',
    'compliment'
  ];
  surpriseTypes.forEach(type => {
    localStorage.removeItem('surprise_' + type);
  });
}

/**
 * Get all surprise cooldowns (for debugging)
 * @returns Object with surprise types and their last shown timestamps
 */
export function getSurpriseCooldowns(): Record<SurpriseType, string | null> {
  const result: Record<SurpriseType, string | null> = {} as any;
  const surpriseTypes: SurpriseType[] = [
    'butterfly',
    'flower',
    'note',
    'secret',
    'hiddenButton',
    'compliment'
  ];
  surpriseTypes.forEach(type => {
    result[type] = localStorage.getItem('surprise_' + type);
  });
  return result;
}

// Re-export from utils for convenience
export { pickRandom, shuffle } from './utils';


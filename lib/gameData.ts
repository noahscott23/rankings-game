export interface State {
  id: string;
  name: string;
  abbreviation: string;
  rankings: {
    population: number;
    medianIncome: number;
    protectedLand: number;
    commuteTime: number;
    sunshine: number;
    // Add 3 more categories
    crimeRate: number;
    education: number;
    costOfLiving: number;
  };
}

export interface Category {
  id: keyof State['rankings'];
  name: string;
  icon: string;
  description: string;
  lowerIsBetter: boolean; // true for commute time, crime rate, etc.
}

export const categories: Category[] = [
  { id: 'population', name: 'Population', icon: '🌇', description: 'Total population', lowerIsBetter: false },
  { id: 'medianIncome', name: 'Median Income', icon: '💵', description: 'Household median income', lowerIsBetter: false },
  { id: 'protectedLand', name: 'Protected Land', icon: '🌲', description: 'Protected land area %', lowerIsBetter: false },
  { id: 'commuteTime', name: 'Commute Time', icon: '🚗', description: 'Average commute minutes', lowerIsBetter: true },
  { id: 'sunshine', name: 'Sunshine', icon: '☀️', description: 'Average sunny days', lowerIsBetter: false },
  { id: 'crimeRate', name: 'Crime Rate', icon: '🚨', description: 'Crime rate per 100k', lowerIsBetter: true },
  { id: 'education', name: 'Education', icon: '🎓', description: 'College graduation rate', lowerIsBetter: false },
  { id: 'costOfLiving', name: 'Cost of Living', icon: '🏠', description: 'Cost of living index', lowerIsBetter: true },
];

// Sample states data (you'll need to populate with real rankings)
export const states: State[] = [
  {
    id: 'california',
    name: 'California',
    abbreviation: 'CA',
    rankings: {
      population: 1,
      medianIncome: 8,
      protectedLand: 15,
      commuteTime: 45,
      sunshine: 25,
      crimeRate: 35,
      education: 12,
      costOfLiving: 48,
    }
  },
  // Add all 50 states...
];
export interface State {
  id: string;
  name: string;
  abbreviation: string;
  rankings: {
    population: number;
    smallSize: number;
    medianIncome: number;
    protectedLand: number;
    commuteTime: number;
    sunshine: number;
    crimeRate: number;
    education: number;
    costOfLiving: number;
    publicHealth: number;
  };
}

export interface Category {
  id: keyof State['rankings'];
  name: string;
  icon: string;
  description: string;
  lowerIsBetter: boolean;
}

export const categories: Category[] = [
  { id: 'population', name: 'Population', icon: '🌇', description: 'Total population', lowerIsBetter: false },
  { id: 'smallSize', name: 'Small Size', icon: '📏', description: 'Smallest land area', lowerIsBetter: true },
  { id: 'medianIncome', name: 'Median Income', icon: '💵', description: 'Household median income', lowerIsBetter: false },
  { id: 'protectedLand', name: 'Protected Land', icon: '🌲', description: 'Protected land area %', lowerIsBetter: false },
  { id: 'commuteTime', name: 'Commute Time', icon: '🚗', description: 'Average commute minutes', lowerIsBetter: true },
  { id: 'sunshine', name: 'Temperature', icon: '🌡️', description: 'Average temperature (°F)', lowerIsBetter: false },
  { id: 'crimeRate', name: 'Crime Rate', icon: '🚨', description: 'Crime rate per 100k', lowerIsBetter: true },
  { id: 'education', name: 'Education', icon: '🎓', description: 'College graduation rate', lowerIsBetter: false },
  { id: 'costOfLiving', name: 'Cost of Living', icon: '🏠', description: 'Cost of living index', lowerIsBetter: true },
  { id: 'publicHealth', name: 'Public Health', icon: '🏥', description: 'Public health ranking', lowerIsBetter: false },
];

export const states: State[] = [
  { id: 'california', name: 'California', abbreviation: 'CA', rankings: { population: 1, smallSize: 48, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 14, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 4 } },
  { id: 'texas', name: 'Texas', abbreviation: 'TX', rankings: { population: 2, smallSize: 49, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 3, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 22 } },
  { id: 'florida', name: 'Florida', abbreviation: 'FL', rankings: { population: 3, smallSize: 25, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 1, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 14 } },
  { id: 'new-york', name: 'New York', abbreviation: 'NY', rankings: { population: 4, smallSize: 21, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 37, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 2 } },
  { id: 'pennsylvania', name: 'Pennsylvania', abbreviation: 'PA', rankings: { population: 5, smallSize: 19, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 31, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 24 } },
  { id: 'illinois', name: 'Illinois', abbreviation: 'IL', rankings: { population: 6, smallSize: 26, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 23, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 15 } },
  { id: 'ohio', name: 'Ohio', abbreviation: 'OH', rankings: { population: 7, smallSize: 16, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 26, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 40 } },
  { id: 'georgia', name: 'Georgia', abbreviation: 'GA', rankings: { population: 8, smallSize: 30, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 6, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 29 } },
  { id: 'north-carolina', name: 'North Carolina', abbreviation: 'NC', rankings: { population: 9, smallSize: 22, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 12, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 27 } },
  { id: 'michigan', name: 'Michigan', abbreviation: 'MI', rankings: { population: 10, smallSize: 29, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 37, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 34 } },
  { id: 'new-jersey', name: 'New Jersey', abbreviation: 'NJ', rankings: { population: 11, smallSize: 5, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 22, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 1 } },
  { id: 'virginia', name: 'Virginia', abbreviation: 'VA', rankings: { population: 12, smallSize: 14, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 16, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 20 } },
  { id: 'washington', name: 'Washington', abbreviation: 'WA', rankings: { population: 13, smallSize: 31, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 38, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 11 } },
  { id: 'arizona', name: 'Arizona', abbreviation: 'AZ', rankings: { population: 14, smallSize: 45, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 11, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 19 } },
  { id: 'tennessee', name: 'Tennessee', abbreviation: 'TN', rankings: { population: 15, smallSize: 17, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 13, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 47 } },
  { id: 'massachusetts', name: 'Massachusetts', abbreviation: 'MA', rankings: { population: 16, smallSize: 6, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 33, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 3 } },
  { id: 'indiana', name: 'Indiana', abbreviation: 'IN', rankings: { population: 17, smallSize: 13, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 24, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 42 } },
  { id: 'missouri', name: 'Missouri', abbreviation: 'MO', rankings: { population: 18, smallSize: 33, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 16, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 39 } },
  { id: 'maryland', name: 'Maryland', abbreviation: 'MD', rankings: { population: 19, smallSize: 9, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 18, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 8 } },
  { id: 'wisconsin', name: 'Wisconsin', abbreviation: 'WI', rankings: { population: 20, smallSize: 26, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 41, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 23 } },
  { id: 'colorado', name: 'Colorado', abbreviation: 'CO', rankings: { population: 21, smallSize: 42, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 40, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 9 } },
  { id: 'minnesota', name: 'Minnesota', abbreviation: 'MN', rankings: { population: 22, smallSize: 37, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 45, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 10 } },
  { id: 'south-carolina', name: 'South Carolina', abbreviation: 'SC', rankings: { population: 23, smallSize: 11, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 8, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 35 } },
  { id: 'alabama', name: 'Alabama', abbreviation: 'AL', rankings: { population: 24, smallSize: 23, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 7, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 43 } },
  { id: 'louisiana', name: 'Louisiana', abbreviation: 'LA', rankings: { population: 25, smallSize: 18, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 2, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 45 } },
  { id: 'kentucky', name: 'Kentucky', abbreviation: 'KY', rankings: { population: 26, smallSize: 15, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 15, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 44 } },
  { id: 'oregon', name: 'Oregon', abbreviation: 'OR', rankings: { population: 27, smallSize: 41, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 36, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 25 } },
  { id: 'oklahoma', name: 'Oklahoma', abbreviation: 'OK', rankings: { population: 28, smallSize: 32, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 10, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 46 } },
  { id: 'connecticut', name: 'Connecticut', abbreviation: 'CT', rankings: { population: 29, smallSize: 3, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 30, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 5 } },
  { id: 'utah', name: 'Utah', abbreviation: 'UT', rankings: { population: 30, smallSize: 39, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 34, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 13 } },
  { id: 'iowa', name: 'Iowa', abbreviation: 'IA', rankings: { population: 31, smallSize: 28, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 35, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 28 } },
  { id: 'nevada', name: 'Nevada', abbreviation: 'NV', rankings: { population: 32, smallSize: 44, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 27, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 31 } },
  { id: 'arkansas', name: 'Arkansas', abbreviation: 'AR', rankings: { population: 33, smallSize: 24, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 9, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 49 } },
  { id: 'kansas', name: 'Kansas', abbreviation: 'KS', rankings: { population: 34, smallSize: 38, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 17, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 33 } },
  { id: 'mississippi', name: 'Mississippi', abbreviation: 'MS', rankings: { population: 35, smallSize: 20, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 5, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 48 } },
  { id: 'new-mexico', name: 'New Mexico', abbreviation: 'NM', rankings: { population: 36, smallSize: 46, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 21, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 36 } },
  { id: 'nebraska', name: 'Nebraska', abbreviation: 'NE', rankings: { population: 37, smallSize: 36, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 32, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 21 } },
  { id: 'idaho', name: 'Idaho', abbreviation: 'ID', rankings: { population: 38, smallSize: 40, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 44, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 18 } },
  { id: 'west-virginia', name: 'West Virginia', abbreviation: 'WV', rankings: { population: 39, smallSize: 10, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 25, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 50 } },
  { id: 'hawaii', name: 'Hawaii', abbreviation: 'HI', rankings: { population: 40, smallSize: 4, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 4, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 6 } },
  { id: 'new-hampshire', name: 'New Hampshire', abbreviation: 'NH', rankings: { population: 41, smallSize: 7, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 42, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 12 } },
  { id: 'maine', name: 'Maine', abbreviation: 'ME', rankings: { population: 42, smallSize: 12, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 46, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 38 } },
  { id: 'montana', name: 'Montana', abbreviation: 'MT', rankings: { population: 43, smallSize: 47, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 47, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 32 } },
  { id: 'rhode-island', name: 'Rhode Island', abbreviation: 'RI', rankings: { population: 44, smallSize: 1, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 28, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 7 } },
  { id: 'delaware', name: 'Delaware', abbreviation: 'DE', rankings: { population: 45, smallSize: 2, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 19, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 26 } },
  { id: 'south-dakota', name: 'South Dakota', abbreviation: 'SD', rankings: { population: 46, smallSize: 35, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 39, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 37 } },
  { id: 'north-dakota', name: 'North Dakota', abbreviation: 'ND', rankings: { population: 47, smallSize: 34, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 49, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 16 } },
  { id: 'alaska', name: 'Alaska', abbreviation: 'AK', rankings: { population: 48, smallSize: 50, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 50, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 41 } },
  { id: 'vermont', name: 'Vermont', abbreviation: 'VT', rankings: { population: 49, smallSize: 8, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 43, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 17 } },
  { id: 'wyoming', name: 'Wyoming', abbreviation: 'WY', rankings: { population: 50, smallSize: 43, medianIncome: 50, protectedLand: 50, commuteTime: 50, sunshine: 48, crimeRate: 50, education: 50, costOfLiving: 50, publicHealth: 30 } },
];



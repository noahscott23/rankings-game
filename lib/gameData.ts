export interface State {
  id: string;
  name: string;
  abbreviation: string;
  rankings: {
    population: number;
    smallSize: number;
    protectedLand: number;
    sunshine: number;
    crimeRate: number;
    costOfLiving: number;
    publicHealth: number;
    religiosity: number;
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
  { id: 'protectedLand', name: 'Protected Land', icon: '🌲', description: 'Protected land area %', lowerIsBetter: false },
  { id: 'sunshine', name: 'Temperature', icon: '🌡️', description: 'Average temperature (°F)', lowerIsBetter: false },
  { id: 'crimeRate', name: 'Crime', icon: '👮', description: 'Crime incidents per capita', lowerIsBetter: true },
  { id: 'costOfLiving', name: 'Cost of Living', icon: '💰', description: 'Overall cost of living', lowerIsBetter: true },
  { id: 'publicHealth', name: 'Public Health', icon: '🏥', description: 'Public health outcomes', lowerIsBetter: true },
  { id: 'religiosity', name: 'Religion', icon: '⛪', description: 'Religious adherence rate', lowerIsBetter: false },
];

export const states: State[] = [
  { id: 'pennsylvania', name: 'Pennsylvania', abbreviation: 'PA', rankings: { population: 5, smallSize: 19, protectedLand: 24, sunshine: 31, crimeRate: 37, costOfLiving: 24, publicHealth: 24, religiosity: 8 } },
  { id: 'california', name: 'California', abbreviation: 'CA', rankings: { population: 1, smallSize: 48, protectedLand: 3, sunshine: 14, crimeRate: 9, costOfLiving: 48, publicHealth: 4, religiosity: 12 } },
  { id: 'texas', name: 'Texas', abbreviation: 'TX', rankings: { population: 2, smallSize: 49, protectedLand: 28, sunshine: 3, crimeRate: 11, costOfLiving: 16, publicHealth: 22, religiosity: 3 } },
  { id: 'florida', name: 'Florida', abbreviation: 'FL', rankings: { population: 3, smallSize: 25, protectedLand: 6, sunshine: 1, crimeRate: 38, costOfLiving: 34, publicHealth: 14, religiosity: 19 } },
  { id: 'new-york', name: 'New York', abbreviation: 'NY', rankings: { population: 4, smallSize: 21, protectedLand: 23, sunshine: 37, crimeRate: 23, costOfLiving: 46, publicHealth: 2, religiosity: 10 } },
  { id: 'illinois', name: 'Illinois', abbreviation: 'IL', rankings: { population: 6, smallSize: 26, protectedLand: 19, sunshine: 23, crimeRate: 26, costOfLiving: 21, publicHealth: 15, religiosity: 15 } },
  { id: 'ohio', name: 'Ohio', abbreviation: 'OH', rankings: { population: 7, smallSize: 16, protectedLand: 34, sunshine: 26, crimeRate: 29, costOfLiving: 20, publicHealth: 40, religiosity: 18 } },
  { id: 'georgia', name: 'Georgia', abbreviation: 'GA', rankings: { population: 8, smallSize: 30, protectedLand: 39, sunshine: 6, crimeRate: 24, costOfLiving: 12, publicHealth: 29, religiosity: 9 } },
  { id: 'north-carolina', name: 'North Carolina', abbreviation: 'NC', rankings: { population: 9, smallSize: 22, protectedLand: 18, sunshine: 12, crimeRate: 17, costOfLiving: 28, publicHealth: 27, religiosity: 5 } },
  { id: 'michigan', name: 'Michigan', abbreviation: 'MI', rankings: { population: 10, smallSize: 29, protectedLand: 11, sunshine: 37, crimeRate: 28, costOfLiving: 9, publicHealth: 34, religiosity: 22 } },
  { id: 'new-jersey', name: 'New Jersey', abbreviation: 'NJ', rankings: { population: 11, smallSize: 5, protectedLand: 5, sunshine: 22, crimeRate: 41, costOfLiving: 44, publicHealth: 1, religiosity: 30 } },
  { id: 'virginia', name: 'Virginia', abbreviation: 'VA', rankings: { population: 12, smallSize: 14, protectedLand: 26, sunshine: 16, crimeRate: 32, costOfLiving: 29, publicHealth: 20, religiosity: 2 } },
  { id: 'washington', name: 'Washington', abbreviation: 'WA', rankings: { population: 13, smallSize: 31, protectedLand: 9, sunshine: 38, crimeRate: 3, costOfLiving: 42, publicHealth: 11, religiosity: 35 } },
  { id: 'arizona', name: 'Arizona', abbreviation: 'AZ', rankings: { population: 14, smallSize: 45, protectedLand: 12, sunshine: 11, crimeRate: 22, costOfLiving: 36, publicHealth: 19, religiosity: 39 } },
  { id: 'tennessee', name: 'Tennessee', abbreviation: 'TN', rankings: { population: 15, smallSize: 17, protectedLand: 17, sunshine: 13, crimeRate: 5, costOfLiving: 11, publicHealth: 46, religiosity: 4 } },
  { id: 'massachusetts', name: 'Massachusetts', abbreviation: 'MA', rankings: { population: 16, smallSize: 6, protectedLand: 7, sunshine: 33, crimeRate: 47, costOfLiving: 49, publicHealth: 3, religiosity: 45 } },
  { id: 'indiana', name: 'Indiana', abbreviation: 'IN', rankings: { population: 17, smallSize: 13, protectedLand: 32, sunshine: 24, crimeRate: 33, costOfLiving: 10, publicHealth: 42, religiosity: 7 } },
  { id: 'missouri', name: 'Missouri', abbreviation: 'MO', rankings: { population: 18, smallSize: 33, protectedLand: 37, sunshine: 16, crimeRate: 14, costOfLiving: 7, publicHealth: 39, religiosity: 11 } },
  { id: 'maryland', name: 'Maryland', abbreviation: 'MD', rankings: { population: 19, smallSize: 9, protectedLand: 21, sunshine: 18, crimeRate: 16, costOfLiving: 45, publicHealth: 8, religiosity: 26 } },
  { id: 'wisconsin', name: 'Wisconsin', abbreviation: 'WI', rankings: { population: 20, smallSize: 26, protectedLand: 13, sunshine: 41, crimeRate: 46, costOfLiving: 27, publicHealth: 23, religiosity: 28 } },
  { id: 'colorado', name: 'Colorado', abbreviation: 'CO', rankings: { population: 21, smallSize: 42, protectedLand: 25, sunshine: 40, crimeRate: 2, costOfLiving: 32, publicHealth: 9, religiosity: 33 } },
  { id: 'minnesota', name: 'Minnesota', abbreviation: 'MN', rankings: { population: 22, smallSize: 37, protectedLand: 29, sunshine: 45, crimeRate: 31, costOfLiving: 23, publicHealth: 10, religiosity: 14 } },
  { id: 'south-carolina', name: 'South Carolina', abbreviation: 'SC', rankings: { population: 23, smallSize: 11, protectedLand: 35, sunshine: 8, crimeRate: 10, costOfLiving: 26, publicHealth: 35, religiosity: 6 } },
  { id: 'alabama', name: 'Alabama', abbreviation: 'AL', rankings: { population: 24, smallSize: 23, protectedLand: 45, sunshine: 7, crimeRate: 25, costOfLiving: 5, publicHealth: 43, religiosity: 1 } },
  { id: 'louisiana', name: 'Louisiana', abbreviation: 'LA', rankings: { population: 25, smallSize: 18, protectedLand: 47, sunshine: 2, crimeRate: 4, costOfLiving: 14, publicHealth: 44, religiosity: 21 } },
  { id: 'kentucky', name: 'Kentucky', abbreviation: 'KY', rankings: { population: 26, smallSize: 15, protectedLand: 15, sunshine: 15, crimeRate: 40, costOfLiving: 17, publicHealth: 43, religiosity: 20 } },
  { id: 'oregon', name: 'Oregon', abbreviation: 'OR', rankings: { population: 27, smallSize: 41, protectedLand: 36, sunshine: 36, crimeRate: 7, costOfLiving: 37, publicHealth: 25, religiosity: 34 } },
  { id: 'oklahoma', name: 'Oklahoma', abbreviation: 'OK', rankings: { population: 28, smallSize: 32, protectedLand: 46, sunshine: 10, crimeRate: 13, costOfLiving: 2, publicHealth: 45, religiosity: 16 } },
  { id: 'connecticut', name: 'Connecticut', abbreviation: 'CT', rankings: { population: 29, smallSize: 3, protectedLand: 4, sunshine: 30, crimeRate: 43, costOfLiving: 40, publicHealth: 5, religiosity: 41 } },
  { id: 'utah', name: 'Utah', abbreviation: 'UT', rankings: { population: 30, smallSize: 39, protectedLand: 14, sunshine: 34, crimeRate: 34, costOfLiving: 35, publicHealth: 13, religiosity: 27 } },
  { id: 'iowa', name: 'Iowa', abbreviation: 'IA', rankings: { population: 31, smallSize: 28, protectedLand: 41, sunshine: 35, crimeRate: 42, costOfLiving: 8, publicHealth: 28, religiosity: 24 } },
  { id: 'nevada', name: 'Nevada', abbreviation: 'NV', rankings: { population: 32, smallSize: 44, protectedLand: 38, sunshine: 27, crimeRate: 6, costOfLiving: 31, publicHealth: 31, religiosity: 48 } },
  { id: 'arkansas', name: 'Arkansas', abbreviation: 'AR', rankings: { population: 33, smallSize: 24, protectedLand: 43, sunshine: 9, crimeRate: 8, costOfLiving: 6, publicHealth: 48, religiosity: 13 } },
  { id: 'kansas', name: 'Kansas', abbreviation: 'KS', rankings: { population: 34, smallSize: 38, protectedLand: 49, sunshine: 17, crimeRate: 15, costOfLiving: 3, publicHealth: 33, religiosity: 29 } },
  { id: 'mississippi', name: 'Mississippi', abbreviation: 'MS', rankings: { population: 35, smallSize: 20, protectedLand: 48, sunshine: 5, crimeRate: 39, costOfLiving: 4, publicHealth: 47, religiosity: 17 } },
  { id: 'new-mexico', name: 'New Mexico', abbreviation: 'NM', rankings: { population: 36, smallSize: 46, protectedLand: 42, sunshine: 21, crimeRate: 1, costOfLiving: 19, publicHealth: 36, religiosity: 38 } },
  { id: 'nebraska', name: 'Nebraska', abbreviation: 'NE', rankings: { population: 37, smallSize: 36, protectedLand: 50, sunshine: 32, crimeRate: 21, costOfLiving: 18, publicHealth: 21, religiosity: 25 } },
  { id: 'idaho', name: 'Idaho', abbreviation: 'ID', rankings: { population: 38, smallSize: 40, protectedLand: 44, sunshine: 44, crimeRate: 49, costOfLiving: 33, publicHealth: 18, religiosity: 32 } },
  { id: 'west-virginia', name: 'West Virginia', abbreviation: 'WV', rankings: { population: 39, smallSize: 10, protectedLand: 27, sunshine: 25, crimeRate: 45, costOfLiving: 1, publicHealth: 49, religiosity: 31 } },
  { id: 'hawaii', name: 'Hawaii', abbreviation: 'HI', rankings: { population: 40, smallSize: 4, protectedLand: 1, sunshine: 4, crimeRate: 35, costOfLiving: 50, publicHealth: 6, religiosity: 40 } },
  { id: 'new-hampshire', name: 'New Hampshire', abbreviation: 'NH', rankings: { population: 41, smallSize: 7, protectedLand: 20, sunshine: 42, crimeRate: 50, costOfLiving: 41, publicHealth: 12, religiosity: 49 } },
  { id: 'maine', name: 'Maine', abbreviation: 'ME', rankings: { population: 42, smallSize: 12, protectedLand: 10, sunshine: 46, crimeRate: 48, costOfLiving: 38, publicHealth: 38, religiosity: 50 } },
  { id: 'montana', name: 'Montana', abbreviation: 'MT', rankings: { population: 43, smallSize: 47, protectedLand: 22, sunshine: 47, crimeRate: 18, costOfLiving: 22, publicHealth: 32, religiosity: 36 } },
  { id: 'rhode-island', name: 'Rhode Island', abbreviation: 'RI', rankings: { population: 44, smallSize: 1, protectedLand: 31, sunshine: 28, crimeRate: 47, costOfLiving: 39, publicHealth: 7, religiosity: 43 } },
  { id: 'delaware', name: 'Delaware', abbreviation: 'DE', rankings: { population: 45, smallSize: 2, protectedLand: 16, sunshine: 19, crimeRate: 19, costOfLiving: 30, publicHealth: 26, religiosity: 44 } },
  { id: 'south-dakota', name: 'South Dakota', abbreviation: 'SD', rankings: { population: 46, smallSize: 35, protectedLand: 33, sunshine: 39, crimeRate: 30, costOfLiving: 15, publicHealth: 37, religiosity: 23 } },
  { id: 'north-dakota', name: 'North Dakota', abbreviation: 'ND', rankings: { population: 47, smallSize: 34, protectedLand: 40, sunshine: 49, crimeRate: 20, costOfLiving: 13, publicHealth: 16, religiosity: 37 } },
  { id: 'alaska', name: 'Alaska', abbreviation: 'AK', rankings: { population: 48, smallSize: 50, protectedLand: 2, sunshine: 50, crimeRate: 12, costOfLiving: 47, publicHealth: 41, religiosity: 46 } },
  { id: 'vermont', name: 'Vermont', abbreviation: 'VT', rankings: { population: 49, smallSize: 8, protectedLand: 30, sunshine: 43, crimeRate: 27, costOfLiving: 43, publicHealth: 17, religiosity: 47 } },
  { id: 'wyoming', name: 'Wyoming', abbreviation: 'WY', rankings: { population: 50, smallSize: 43, protectedLand: 8, sunshine: 48, crimeRate: 44, costOfLiving: 25, publicHealth: 30, religiosity: 42 } },
];

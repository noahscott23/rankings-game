'use client';

import { useState, useEffect } from 'react';
import { State, Category, categories, states } from '@/lib/gameData';

interface GameState {
  gameStarted: boolean;
  currentState: State | null;
  availableCategories: Category[];
  placements: Record<string, { categoryId: string; rank: number; stateName: string }>;
  score: number;
  gameComplete: boolean;
  isSpinning: boolean;
  bestScore: number | null;
  averageScore: number | null;
  gamesPlayed: number;
  showOptimalChoice: { show: boolean; optimal: string; optimalRank: number; chosen: string; chosenRank: number } | null;
  showInfo: boolean;
}

const getScoreColor = (score: number | null) => {
  if (score === null) return 'text-gray-600';
  if (score <= 125) return 'text-green-600';
  if (score <= 175) return 'text-yellow-600';
  if (score <= 225) return 'text-orange-600';
  return 'text-red-600';
};

export default function GameBoard() {
  const getRandomState = () => states[Math.floor(Math.random() * states.length)];
  
  const [gameState, setGameState] = useState<GameState>({
    gameStarted: false,
    currentState: null,
    availableCategories: [...categories],
    placements: {},
    score: 0,
    gameComplete: false,
    isSpinning: false,
    bestScore: null,
    averageScore: null,
    gamesPlayed: 0,
    showOptimalChoice: null,
    showInfo: false,
  });

  // Load best score and average from localStorage on component mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('stateGameBestScore');
    const savedAverageScore = localStorage.getItem('stateGameAverageScore');
    const savedGamesPlayed = localStorage.getItem('stateGameGamesPlayed');
    
    if (savedBestScore) {
      setGameState(prev => ({
        ...prev,
        bestScore: parseInt(savedBestScore, 10),
        averageScore: savedAverageScore ? parseFloat(savedAverageScore) : null,
        gamesPlayed: savedGamesPlayed ? parseInt(savedGamesPlayed, 10) : 0
      }));
    }
  }, []);

  // Auto-dismiss notification after 3 seconds
  useEffect(() => {
    if (gameState.showOptimalChoice?.show) {
      const timer = setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          showOptimalChoice: null
        }));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [gameState.showOptimalChoice?.show]);

  const startGame = () => {
    setGameState({
      ...gameState,
      gameStarted: true,
      currentState: getRandomState(),
    });
  };

  const handlePlacement = (categoryId: string) => {
    if (!gameState.currentState || gameState.isSpinning) return;

    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const rank = gameState.currentState.rankings[categoryId as keyof State['rankings']];
    
    // Find the optimal choice among available categories
    let optimalCategory = categoryId;
    let optimalRank = rank;
    
    gameState.availableCategories.forEach(availableCategory => {
      const availableRank = gameState.currentState!.rankings[availableCategory.id as keyof State['rankings']];
      if (availableRank < optimalRank) {
        optimalCategory = availableCategory.id;
        optimalRank = availableRank;
      }
    });

    const newPlacements = {
      ...gameState.placements,
      [categoryId]: { 
        categoryId, 
        rank, 
        stateName: gameState.currentState.name 
      },
    };

    const newAvailableCategories = gameState.availableCategories.filter(c => c.id !== categoryId);

    let totalScore = 0;
    Object.values(newPlacements).forEach(placement => {
      totalScore += placement.rank;
    });

    // Show optimal choice popup if player didn't choose optimally
    const showOptimal = optimalCategory !== categoryId ? {
      show: true,
      optimal: categories.find(c => c.id === optimalCategory)?.name || '',
      optimalRank,
      chosen: category.name,
      chosenRank: rank
    } : null;

    // Start spinning if there are more categories
    if (newAvailableCategories.length > 0) {
      setGameState({
        ...gameState,
        placements: newPlacements,
        availableCategories: newAvailableCategories,
        score: totalScore,
        isSpinning: true,
        showOptimalChoice: showOptimal,
      });
    } else {
      // Game complete
      const isNewBest = gameState.bestScore === null || totalScore < gameState.bestScore;
      const newBestScore = isNewBest ? totalScore : gameState.bestScore;
      
      // Calculate new average
      const newGamesPlayed = gameState.gamesPlayed + 1;
      const currentTotal = (gameState.averageScore || 0) * gameState.gamesPlayed;
      const newAverageScore = (currentTotal + totalScore) / newGamesPlayed;
      
      if (isNewBest) {
        localStorage.setItem('stateGameBestScore', totalScore.toString());
      }
      localStorage.setItem('stateGameAverageScore', newAverageScore.toString());
      localStorage.setItem('stateGameGamesPlayed', newGamesPlayed.toString());
      
      setGameState({
        ...gameState,
        placements: newPlacements,
        availableCategories: newAvailableCategories,
        score: totalScore,
        gameComplete: true,
        bestScore: newBestScore,
        averageScore: newAverageScore,
        gamesPlayed: newGamesPlayed,
        showOptimalChoice: showOptimal,
      });
    }
  };

  // Spinning effect - don't auto-dismiss notification
  useEffect(() => {
    if (gameState.isSpinning) {
      let spinCount = 0;
      const maxSpins = 15;
      
      const spinInterval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          currentState: getRandomState(),
        }));
        
        spinCount++;
        if (spinCount >= maxSpins) {
          clearInterval(spinInterval);
          setGameState(prev => ({
            ...prev,
            isSpinning: false,
            currentState: getRandomState(),
          }));
        }
      }, 50);

      return () => clearInterval(spinInterval);
    }
  }, [gameState.isSpinning]);

  if (gameState.gameComplete) {
  const isNewBest = gameState.bestScore === gameState.score;

  // --- Robust Hungarian Algorithm ---
  const hungarianAlgorithm = (
    costMatrix: number[][],
    maximize = false
  ): { assignments: number[]; totalCost: number } => {
    const rows = costMatrix.length;
    const cols = costMatrix[0]?.length || 0;
    if (rows === 0 || cols === 0) return { assignments: [], totalCost: 0 };

    // Convert to minimization if maximizing
    let maxVal = -Infinity;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (costMatrix[i][j] > maxVal) maxVal = costMatrix[i][j];
      }
    }
    if (maxVal === -Infinity) maxVal = 0;

    const n = Math.max(rows, cols); // square size
    const INF = 1e12;
    const a: number[][] = Array.from({ length: n + 1 }, () => Array(n + 1).fill(INF));

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        if (i <= rows && j <= cols) {
          a[i][j] = maximize ? maxVal - costMatrix[i - 1][j - 1] : costMatrix[i - 1][j - 1];
        } else {
          a[i][j] = INF;
        }
      }
    }

    const u = new Array(n + 1).fill(0);
    const v = new Array(n + 1).fill(0);
    const p = new Array(n + 1).fill(0);
    const way = new Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
      p[0] = i;
      let j0 = 0;
      const minv = new Array(n + 1).fill(INF);
      const used = new Array(n + 1).fill(false);

      do {
        used[j0] = true;
        const i0 = p[j0];
        let delta = INF;
        let j1 = 0;
        for (let j = 1; j <= n; j++) {
          if (used[j]) continue;
          const cur = a[i0][j] - u[i0] - v[j];
          if (cur < minv[j]) {
            minv[j] = cur;
            way[j] = j0;
          }
          if (minv[j] < delta) {
            delta = minv[j];
            j1 = j;
          }
        }
        for (let j = 0; j <= n; j++) {
          if (used[j]) {
            u[p[j]] += delta;
            v[j] -= delta;
          } else {
            minv[j] -= delta;
          }
        }
        j0 = j1;
      } while (p[j0] !== 0);

      do {
        const j1 = way[j0];
        p[j0] = p[j1];
        j0 = j1;
      } while (j0 !== 0);
    }

    const assignment = new Array(rows).fill(-1);
    for (let j = 1; j <= n; j++) {
      const i = p[j];
      if (i > 0 && i <= rows && j <= cols) {
        assignment[i - 1] = j - 1;
      }
    }

    let totalCost = 0;
    for (let i = 0; i < rows; i++) {
      const j = assignment[i];
      if (j >= 0 && j < cols) totalCost += costMatrix[i][j];
    }

    return { assignments: assignment, totalCost };
  };

  // --- Build cost matrix from game state ---
  const categoryIds = categories.map(c => c.id);
  const stateEntries = Object.entries(gameState.placements);
  const stateNames = stateEntries.map(([, placement]) => placement.stateName);

  const costMatrix = stateNames.map(stateName => {
    const state = states.find(s => s.name === stateName);
    return categoryIds.map(catId => (state ? (state.rankings[catId as keyof State['rankings']] ?? 999) : 999));
  });

  const { assignments, totalCost } = hungarianAlgorithm(costMatrix, false);

  // --- Map optimal assignments back to display data ---
  const optimalPlacements = assignments.map((categoryIndex, stateIndex) => {
    const stateName = stateNames[stateIndex];
    const categoryId = categoryIndex >= 0 ? categoryIds[categoryIndex] : null;
    const optimalCategory = categories.find(c => c.id === categoryId);
    const actualPlacementEntry = stateEntries.find(([, p]) => p.stateName === stateName);
    const actualCategory = categories.find(c => c.id === actualPlacementEntry?.[0]);
    const optimalRank = categoryIndex >= 0 ? costMatrix[stateIndex][categoryIndex] : null;
    return {
      stateName,
      actualCategory: actualCategory?.name || '',
      actualRank: actualPlacementEntry?.[1].rank || 0,
      optimalCategory: optimalCategory?.name || '',
      optimalRank,
      difference: optimalRank !== null ? (actualPlacementEntry?.[1].rank || 0) - optimalRank : null
    };
  });

  // --- UI ---
  return (
    <div className="min-h-screen p-4" style={{
      background: 'linear-gradient(135deg, #3b82f6, #1e40af)'
    }}>
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 text-white">
          🎉 Game Complete!
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Your Results */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">
              Your Score: {gameState.score}
              {isNewBest && <span className="text-green-600 ml-2">🎉 New Best!</span>}
            </h2>
            {gameState.bestScore !== null && !isNewBest && (
              <p className="text-lg text-gray-500 mb-2">
                Best Score: {gameState.bestScore}
              </p>
            )}

            <div className="space-y-2 mb-6">
              <h3 className="font-semibold text-gray-700 mb-3">Your Choices:</h3>
              {Object.entries(gameState.placements)
                .sort(([, a], [, b]) => a.rank - b.rank)
                .map(([categoryId, placement]) => {
                  const category = categories.find(c => c.id === categoryId);
                  let textColor = '';
                  if (placement.rank <= 10) textColor = 'text-green-600';
                  else if (placement.rank <= 25) textColor = 'text-yellow-600';
                  else if (placement.rank <= 40) textColor = 'text-orange-600';
                  else textColor = 'text-red-600';

                  return (
                    <div key={categoryId} className={`text-sm font-medium ${textColor}`}>
                      {category?.name}: {placement.stateName} - #{placement.rank}
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Optimal Strategy */}
          <div className="bg-green-50 p-8 rounded-xl shadow-lg border-2 border-green-200">
            <h2 className="text-3xl font-semibold mb-4 text-green-800">
              Optimal Score: {totalCost}
            </h2>
            <p className="text-lg text-green-600 mb-4">
              You could have saved {gameState.score - totalCost} points!
            </p>

            <div className="space-y-2 mb-6">
              <h3 className="font-semibold text-green-700 mb-3">Optimal Choices:</h3>
              {optimalPlacements
                .sort((a, b) => (a.optimalRank ?? Infinity) - (b.optimalRank ?? Infinity))
                .map((placement, index) => {
                  let textColor = '';
                  if ((placement.optimalRank ?? Infinity) <= 10) textColor = 'text-green-600';
                  else if ((placement.optimalRank ?? Infinity) <= 25) textColor = 'text-yellow-600';
                  else if ((placement.optimalRank ?? Infinity) <= 40) textColor = 'text-orange-600';
                  else textColor = 'text-red-600';

                  return (
                    <div key={index} className="text-sm">
                      <div className={`font-medium ${textColor}`}>
                        {placement.optimalCategory}: {placement.stateName} - #{placement.optimalRank}
                      </div>
                      {placement.difference !== null && placement.difference > 0 && (
                        <div className="text-xs text-gray-500 ml-2">
                          (You chose {placement.actualCategory} - #{placement.actualRank}, +{placement.difference} points)
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-50 border-2 border-blue-600 mt-8 font-semibold"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen p-4" style={{
      background: 'linear-gradient(135deg, #3b82f6, #1e40af)'
    }}>
      {/* Optimal Choice Notification - Side Panel */}
      {gameState.showOptimalChoice?.show && (
        <div className="fixed top-20 right-4 bg-white p-4 rounded-lg shadow-lg w-64 border-l-4 border-orange-500 z-50 animate-in slide-in-from-right duration-300">
          <h3 className="text-sm font-bold mb-2 text-gray-800">Better Option Available!</h3>
          <p className="text-xs mb-1">
            You chose: <span className="font-semibold text-red-600">{gameState.showOptimalChoice.chosen}</span> (#{gameState.showOptimalChoice.chosenRank})
          </p>
          <p className="text-xs">
            Best pick: <span className="font-semibold text-green-600">{gameState.showOptimalChoice.optimal}</span> (#{gameState.showOptimalChoice.optimalRank})
          </p>
        </div>
      )}

      {/* Info Modal */}
      {gameState.showInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Game Info</h2>
                <button
                  onClick={() => setGameState(prev => ({ ...prev, showInfo: false }))}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">How to Play</h3>
                  <p className="text-gray-600 mb-2">
                    For each state that appears, choose the category where that state ranks BEST (lowest number = best ranking).
                  </p>
                  <p className="text-gray-600">
                    Your goal is to get the lowest total score possible across all 8 categories.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Categories Explained</h3>
                  <div className="grid gap-3">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl">🌇</span>
                      <div>
                        <h4 className="font-semibold">Population</h4>
                        <p className="text-sm text-gray-600">Rank #1 = Most populated state</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl">📏</span>
                      <div>
                        <h4 className="font-semibold">Small Size</h4>
                        <p className="text-sm text-gray-600">Rank #1 = Smallest land area</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl">🌲</span>
                      <div>
                        <h4 className="font-semibold">Protected Land</h4>
                        <p className="text-sm text-gray-600">Rank #1 = Highest % of protected land</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl">🌡️</span>
                      <div>
                        <h4 className="font-semibold">Temperature</h4>
                        <p className="text-sm text-gray-600">Rank #1 = Highest average temperature</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl">👮</span>
                      <div>
                        <h4 className="font-semibold">Crime</h4>
                        <p className="text-sm text-gray-600">Rank #1 = Highest crime rate (most dangerous)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl">💰</span>
                      <div>
                        <h4 className="font-semibold">Lowest Cost of Living</h4>
                        <p className="text-sm text-gray-600">Rank #1 = Lowest cost of living (cheapest)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl">🏥</span>
                      <div>
                        <h4 className="font-semibold">Public Health</h4>
                        <p className="text-sm text-gray-600">Rank #1 = Best public health outcomes</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <span className="text-2xl">⛪</span>
                      <div>
                        <h4 className="font-semibold">Religion</h4>
                        <p className="text-sm text-gray-600">Rank #1 = Highest religious adherence rate</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Strategy Tip</h4>
                  <p className="text-blue-700 text-sm">
                    Look for categories where the current state has a very low rank number (like #1, #2, #3) - these will give you the best score!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="relative">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-white">
            State Ranking Challenge
          </h1>
          
          {/* Info and Reset buttons */}
          <div className="absolute top-0 right-0 flex flex-col gap-2 mt-8">
            <button
              onClick={() => setGameState(prev => ({ ...prev, showInfo: true }))}
              className="bg-white p-1 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all w-8 h-8 sm:w-16 sm:h-16 flex items-center justify-center"
              title="Game Info"
            >
              <span className="text-base sm:text-2xl">ℹ️</span>
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="bg-white sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all w-8 h-8 sm:w-16 sm:h-16 flex items-center justify-center"
              title="Reset Game"
            >
              <span className="text-lg sm:text-2xl">🔄</span>
            </button>
          </div>
        </div>
        
        {!gameState.gameStarted ? (
          <div className="text-center mb-8">
            <button 
              onClick={startGame}
              className="bg-white text-blue-600 px-12 py-4 rounded-lg hover:bg-gray-50 text-xl font-semibold shadow-lg mb-4"
            >
              Start Game
            </button>
            <p className="text-lg text-white">
              Choose the category where each state ranks best (lowest number).
            </p>
            {gameState.bestScore !== null && (
              <div className="text-sm text-blue-100 mt-2 space-y-1">
                <p>Best Score: <span className={getScoreColor(gameState.bestScore)}>{gameState.bestScore}</span></p>
                <p>Average Score: <span className={getScoreColor(gameState.averageScore)}>{gameState.averageScore !== null ? Math.round(gameState.averageScore * 10) / 10 : '--'}</span></p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center mb-8 -mt-4 sm:mt-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 max-w-[18rem] sm:max-w-md mx-auto mb-4">
              <h2 className={`text-2xl sm:text-3xl font-bold sm:mb-3 transition-all text-gray-800 ${gameState.isSpinning ? 'animate-pulse' : ''}`}>
                {gameState.currentState?.flag.startsWith('/') ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={gameState.currentState.flag} 
                      alt={`${gameState.currentState.name} flag`}
                      className="w-12 h-8 sm:w-16.8 sm:h-10 mb-1 sm:mb-2 object-cover"
                    />
                    {gameState.currentState?.name}
                  </div>
                ) : (
                  <>
                    <span className="mr-2">{gameState.currentState?.flag}</span>
                    {gameState.currentState?.name}
                  </>
                )}
              </h2>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Categories Remaining:</span>
                  <span className="font-semibold text-blue-600">{gameState.availableCategories.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Score:</span>
                  <span className={`font-semibold ${getScoreColor(gameState.score)}`}>{gameState.score}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Best Score:</span>
                  <span className={`font-semibold ${getScoreColor(gameState.bestScore)}`}>
                    {gameState.bestScore !== null ? gameState.bestScore : '--'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Score:</span>
                  <span className={`font-semibold ${getScoreColor(gameState.averageScore)}`}>
                    {gameState.averageScore !== null ? Math.round(gameState.averageScore * 10) / 10 : '--'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {categories.map((category) => {
            const isUsed = gameState.placements[category.id];
            const isAvailable = gameState.availableCategories.some(c => c.id === category.id);
            
            let buttonStyle = '';
            let textStyle = '';
            
            if (isUsed) {
              const rank = isUsed.rank;
              if (rank <= 10) {
                buttonStyle = 'bg-green-200 border-green-600';
                textStyle = 'text-green-800';
              } else if (rank <= 25) {
                buttonStyle = 'bg-yellow-200 border-yellow-600';
                textStyle = 'text-yellow-800';
              } else if (rank <= 40) {
                buttonStyle = 'bg-orange-200 border-orange-600';
                textStyle = 'text-orange-800';
              } else {
                buttonStyle = 'bg-red-200 border-red-600';
                textStyle = 'text-red-800';
              }
            } else if (isAvailable && gameState.gameStarted) {
              buttonStyle = 'bg-white hover:shadow-xl hover:border-blue-300 border-transparent';
            } else {
              buttonStyle = 'bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed';
            }
            
            return (
              <button
                key={category.id}
                onClick={() => isAvailable && !gameState.isSpinning && gameState.gameStarted ? handlePlacement(category.id) : undefined}
                disabled={!gameState.currentState || !isAvailable || gameState.isSpinning || !gameState.gameStarted}
                className={`p-1 sm:p-6 rounded-lg sm:rounded-xl shadow-lg transition-all border-2 ${buttonStyle} ${
                  isUsed ? 'cursor-default' : ''
                } ${gameState.isSpinning ? 'opacity-75' : ''}`}
              >
               {/* mobile: icon + category name left, optional flag/state right */}
                <div className="flex justify-between items-center sm:hidden mt-1 font-medium w-full">
                  {/* Left group: icon + category name */}
                  <div className="flex items-center gap-1">
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-semibold text-gray-800 text-xs">{category.name}</span>
                  </div>

                  {/* Right group: flag + state name */}
                  {isUsed && (
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <img
                        src={`/${isUsed.stateName.toLowerCase().replace(' ', '-')}.png`}
                        alt={`${isUsed.stateName} flag`}
                        className="w-4 h-3 object-cover"
                      />
                      <span className="text-xs">
                        {isUsed.stateName}: #{isUsed.rank}
                      </span>
                    </div>
                  )}
                </div>


                {/* pc: emoji above name */}
                <div className="hidden sm:flex sm:flex-col sm:items-center">
                  <span className="text-4xl mb-2">{category.icon}</span>
                  <h3 className="font-semibold text-gray-800 text-base">
                    {category.name}
                  </h3>
                </div>

                {/* pc: state info or description */}
                {isUsed ? (
                  <p className={`hidden sm:block text-sm mt-1 font-medium ${textStyle}`}>
                    <img
                      src={`/${isUsed.stateName.toLowerCase().replace(' ', '-')}.png`}
                      alt={`${isUsed.stateName} flag`}
                      className="inline w-10 h-8 mr-1 object-cover"
                    />
                    {isUsed.stateName}: #{isUsed.rank}
                  </p>
                ) : (
                  <p className="hidden sm:block text-sm text-gray-600 mt-1">
                    {category.description}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}










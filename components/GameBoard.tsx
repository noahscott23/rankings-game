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
}

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
  });

  // Load best score from localStorage on component mount
  useEffect(() => {
    const savedBestScore = localStorage.getItem('stateGameBestScore');
    console.log('Loading best score from localStorage:', savedBestScore); // Debug log
    if (savedBestScore) {
      setGameState(prev => ({
        ...prev,
        bestScore: parseInt(savedBestScore, 10)
      }));
    }
  }, []);

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

    // Start spinning if there are more categories
    if (newAvailableCategories.length > 0) {
      setGameState({
        ...gameState,
        placements: newPlacements,
        availableCategories: newAvailableCategories,
        score: totalScore,
        isSpinning: true,
      });
    } else {
      // Game complete - check and save best score
      const isNewBest = gameState.bestScore === null || totalScore < gameState.bestScore;
      const newBestScore = isNewBest ? totalScore : gameState.bestScore;
      
      if (isNewBest) {
        localStorage.setItem('stateGameBestScore', totalScore.toString());
        console.log('Saving new best score:', totalScore); // Debug log
      }
      
      setGameState({
        ...gameState,
        placements: newPlacements,
        availableCategories: newAvailableCategories,
        score: totalScore,
        gameComplete: true,
        bestScore: newBestScore,
      });
    }
  };

  // Spinning effect
  useEffect(() => {
    if (gameState.isSpinning) {
      let spinCount = 0;
      const maxSpins = 5; // More spins for faster cycling
      
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
      }, 50); // Faster cycling - every 50ms

      return () => clearInterval(spinInterval);
    }
  }, [gameState.isSpinning]);

  if (gameState.gameComplete) {
    const isNewBest = gameState.bestScore === gameState.score;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">
            🇺🇸 Game Complete!
          </h1>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-3xl font-semibold mb-4">
              Final Score: {gameState.score}
              {isNewBest && <span className="text-green-600 ml-2">🎉 New Best!</span>}
            </h2>
            {gameState.bestScore !== null && !isNewBest && (
              <p className="text-lg text-gray-500 mb-2">
                Best Score: {gameState.bestScore}
              </p>
            )}
            <p className="text-lg text-gray-600 mb-6">
              Lower scores are better!
            </p>
            
            <div className="space-y-2 mb-6">
              {Object.entries(gameState.placements).map(([categoryId, placement]) => {
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
            
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🇺🇸 State Ranking Challenge
        </h1>
        
        {!gameState.gameStarted ? (
          <div className="text-center mb-8">
            <button 
              onClick={startGame}
              className="bg-blue-600 text-white px-12 py-4 rounded-lg hover:bg-blue-700 text-xl font-semibold shadow-lg mb-4"
            >
              Start Game
            </button>
            <p className="text-lg text-gray-600">
              Choose the category where each state ranks best (lowest number).
            </p>
            {gameState.bestScore !== null && (
              <p className="text-sm text-gray-500 mt-2">
                Best Score: {gameState.bestScore}
              </p>
            )}
          </div>
        ) : (
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold mb-4 transition-all ${gameState.isSpinning ? 'animate-pulse' : ''}`}>
              <span className="text-blue-600">{gameState.currentState?.name}</span>
            </h2>
            <p className="text-sm text-gray-500">
              Categories remaining: {gameState.availableCategories.length} | Current Score: {gameState.score}
              {gameState.bestScore !== null ? ` | Best Score: ${gameState.bestScore}` : ' | Best Score: --'}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const isUsed = gameState.placements[category.id];
            const isAvailable = gameState.availableCategories.some(c => c.id === category.id);
            
            let buttonStyle = '';
            let textStyle = '';
            
            if (isUsed) {
              const rank = isUsed.rank;
              if (rank <= 10) {
                buttonStyle = 'bg-green-100 border-green-500';
                textStyle = 'text-green-700';
              } else if (rank <= 25) {
                buttonStyle = 'bg-yellow-100 border-yellow-500';
                textStyle = 'text-yellow-700';
              } else if (rank <= 40) {
                buttonStyle = 'bg-orange-100 border-orange-500';
                textStyle = 'text-orange-700';
              } else {
                buttonStyle = 'bg-red-100 border-red-500';
                textStyle = 'text-red-700';
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
                className={`p-6 rounded-xl shadow-lg transition-all border-2 ${buttonStyle} ${
                  isUsed ? 'cursor-default' : ''
                } ${gameState.isSpinning ? 'opacity-75' : ''}`}
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
                {isUsed ? (
                  <p className={`text-sm mt-1 font-medium ${textStyle}`}>
                    {isUsed.stateName}: #{isUsed.rank}
                  </p>
                ) : (
                  <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}














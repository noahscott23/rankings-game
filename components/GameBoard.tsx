'use client';

import { useState } from 'react';
import { State, Category, categories, states } from '@/lib/gameData';

interface GameState {
  currentState: State | null;
  placements: Record<string, string>; // stateId -> categoryId
  score: number;
  gameComplete: boolean; 
}

export default function GameBoard() {
  const [gameState, setGameState] = useState<GameState>({
    currentState: states[0],
    placements: {},
    score: 0,
    gameComplete: false,
  });

  const handlePlacement = (categoryId: string) => {
    if (!gameState.currentState) return;

    const newPlacements = {
      ...gameState.placements,
      [gameState.currentState.id]: categoryId,
    };

    const nextStateIndex = states.findIndex(s => s.id === gameState.currentState!.id) + 1;
    const nextState = nextStateIndex < states.length ? states[nextStateIndex] : null;

    setGameState({
      ...gameState,
      placements: newPlacements,
      currentState: nextState,
      gameComplete: nextState === null,
    });
  };

  const calculateScore = () => {
    // Calculate score based on how close rankings are to optimal
    // Lower score is better
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🇺🇸 State Ranking Challenge
        </h1>
        
        {gameState.currentState ? (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Where does <span className="text-blue-600">{gameState.currentState.name}</span> rank best?
            </h2>
            <p className="text-gray-600">Choose the category where this state ranks highest (lowest number)</p>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Game Complete!</h2>
            <button 
              onClick={calculateScore}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Calculate Final Score
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handlePlacement(category.id)}
              disabled={!gameState.currentState}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent hover:border-blue-300 disabled:opacity-50"
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <h3 className="font-semibold text-gray-800">{category.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{category.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
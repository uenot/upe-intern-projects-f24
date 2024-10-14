import React, { createContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import './App.css';

// Create a MoodContext to hold the songs and update function
export const MoodContext = createContext();

const App = () => {
  const [songs, setSongs] = useState([]);
  const [currentMood, setCurrentMood] = useState('');

  const queryClient = new QueryClient(); // Create a QueryClient instance

  return (
    <QueryClientProvider client={queryClient}> {/* Wrap with QueryClientProvider */}
      <MoodContext.Provider value={{ songs, setSongs, currentMood, setCurrentMood }}> {/* Provide context */}
        <div className="App">
          <Navbar />
          <Home />
        </div>
      </MoodContext.Provider>
    </QueryClientProvider>
  );
};

export default App;

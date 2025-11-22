import React, { useState, useEffect } from 'react';
import { PlanetData } from '../types';
import { generatePlanetFact, askPlanetQuestion } from '../services/geminiService';
import { X, MessageSquare, Sparkles, Loader2, Send, Activity, Clock, Globe } from 'lucide-react';

interface InfoPanelProps {
  planet: PlanetData | null;
  onClose: () => void;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ planet, onClose }) => {
  const [fact, setFact] = useState<string>('');
  const [loadingFact, setLoadingFact] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatResponse, setChatResponse] = useState<string | null>(null);

  useEffect(() => {
    if (planet) {
      setFact('');
      setChatResponse(null);
      setChatInput('');
      
      // Auto generate a fact when opened
      handleGenerateFact(planet.name);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planet]);

  const handleGenerateFact = async (name: string) => {
    setLoadingFact(true);
    const result = await generatePlanetFact(name);
    setFact(result);
    setLoadingFact(false);
  };

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !planet) return;

    setChatLoading(true);
    const answer = await askPlanetQuestion(planet.name, chatInput);
    setChatResponse(answer);
    setChatLoading(false);
  };

  if (!planet) return null;

  return (
    <div className="absolute top-4 right-4 bottom-4 w-full md:w-[400px] bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-white overflow-y-auto shadow-[0_0_50px_rgba(0,0,0,0.5)] z-20 transition-all duration-300 flex flex-col scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
      <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            {planet.name}
          </h2>
          <p className="text-gray-400 text-sm mt-1 font-light leading-relaxed">{planet.description}</p>
        </div>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6 flex-grow">
        {/* Detailed Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
           <div className="bg-black/40 p-3 rounded-lg border border-white/5">
            <div className="flex items-center gap-2 mb-1">
              <Globe size={14} className="text-blue-400" />
              <div className="text-xs text-gray-500 uppercase tracking-wider">Diameter</div>
            </div>
            <div className="text-sm font-mono text-white">{planet.diameter}</div>
          </div>

          <div className="bg-black/40 p-3 rounded-lg border border-white/5">
             <div className="flex items-center gap-2 mb-1">
              <Activity size={14} className="text-green-400" />
              <div className="text-xs text-gray-500 uppercase tracking-wider">Distance</div>
            </div>
            <div className="text-sm font-mono text-white">{planet.distance} AU</div>
          </div>

           <div className="bg-black/40 p-3 rounded-lg border border-white/5">
             <div className="flex items-center gap-2 mb-1">
              <Clock size={14} className="text-orange-400" />
              <div className="text-xs text-gray-500 uppercase tracking-wider">Day Length</div>
            </div>
            <div className="text-sm font-mono text-white">{planet.rotationPeriod}</div>
          </div>

           <div className="bg-black/40 p-3 rounded-lg border border-white/5">
             <div className="flex items-center gap-2 mb-1">
              <Clock size={14} className="text-purple-400" />
              <div className="text-xs text-gray-500 uppercase tracking-wider">Year Length</div>
            </div>
            <div className="text-sm font-mono text-white">{planet.orbitalPeriod}</div>
          </div>
        </div>

        {/* AI Fact Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3 text-indigo-300">
            <Sparkles size={16} />
            <h3 className="font-semibold text-sm uppercase tracking-wide">Cosmic Insight</h3>
          </div>
          
          {loadingFact ? (
            <div className="flex items-center gap-2 text-sm text-gray-400 animate-pulse py-2">
              <Loader2 size={14} className="animate-spin" />
              <span className="font-mono text-xs">Deciphering signals...</span>
            </div>
          ) : (
            <p className="text-sm text-gray-200 leading-relaxed italic font-light">
              "{fact}"
            </p>
          )}
        </div>

        {/* Chat Section */}
        <div className="border-t border-white/10 pt-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-white">
            <MessageSquare size={18} className="text-blue-400" />
            Ask AI Expert
          </h3>
          
          <form onSubmit={handleAsk} className="relative mb-4">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={`Ex: Why is ${planet.name} unique?`}
              className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-4 pr-12 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-all"
            />
            <button 
              type="submit"
              disabled={chatLoading || !chatInput.trim()}
              className="absolute right-2 top-2 p-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 rounded-md transition-colors text-white"
            >
              {chatLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </form>

          {chatResponse && (
            <div className="bg-gray-800/40 rounded-lg p-4 text-sm text-gray-300 leading-relaxed border-l-2 border-blue-500 animate-in fade-in slide-in-from-bottom-2">
              <p>{chatResponse}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Plus, Users, BookOpen } from 'lucide-react';
import { AgentModal } from './components/AgentModal';
import { TrainingDataModal } from './components/TrainingDataModal';
import { Agent, TrainingData } from './types';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrainingModalOpen, setIsTrainingModalOpen] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [trainingData, setTrainingData] = useState<TrainingData[]>([]);

  const handleAddAgent = (agentData: Omit<Agent, 'id'>) => {
    const newAgent: Agent = {
      ...agentData,
      id: Date.now().toString()
    };
    setAgents([...agents, newAgent]);
  };

  const handleAddTrainingData = (data: Omit<TrainingData, 'id'>) => {
    const newTrainingData: TrainingData = {
      ...data,
      id: Date.now().toString()
    };
    setTrainingData([...trainingData, newTrainingData]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Agent Manager</h1>
                <p className="text-gray-600 mt-1">Manage your AI agents and their configurations</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsTrainingModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <BookOpen className="w-5 h-5" />
                Add Training Data
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Plus className="w-5 h-5" />
                Add Agent
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Agents Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Agents</h2>
            {agents.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No agents yet</h3>
                <p className="text-gray-600 mb-4 max-w-sm mx-auto text-sm">
                  Get started by adding your first AI agent.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Agent
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {agents.map((agent) => (
                  <div key={agent.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center gap-4 mb-4">
                      {agent.avatar ? (
                        <img 
                          src={agent.avatar} 
                          alt={`${agent.name}'s avatar`}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <Users className="w-6 h-6 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                        <p className="text-gray-600 text-sm">{agent.companyTitle}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Company:</span>
                        <span className="text-gray-900 font-medium">{agent.company}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tone:</span>
                        <span className="text-gray-900 font-medium">{agent.tone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Training Data Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Training Data</h2>
            {trainingData.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No training data yet</h3>
                <p className="text-gray-600 mb-4 max-w-sm mx-auto text-sm">
                  Add training data to help your agents learn.
                </p>
                <button
                  onClick={() => setIsTrainingModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium"
                >
                  <BookOpen className="w-4 h-4" />
                  Add Training Data
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {trainingData.map((data) => (
                  <div key={data.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                    <h3 className="font-semibold text-gray-900 mb-3">{data.title}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Data types:</span>
                        <div className="flex gap-2">
                          {data.dataOptions.url && <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">URL</span>}
                          {data.dataOptions.attachments && <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Files</span>}
                          {data.dataOptions.text && <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">Text</span>}
                        </div>
                      </div>
                      {data.mainDomains.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Domains:</span>
                          <span className="text-gray-900 font-medium">{data.mainDomains.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <AgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddAgent={handleAddAgent}
      />
      
      <TrainingDataModal
        isOpen={isTrainingModalOpen}
        onClose={() => setIsTrainingModalOpen(false)}
        onAddTrainingData={handleAddTrainingData}
      />
    </div>
  );
}

export default App;
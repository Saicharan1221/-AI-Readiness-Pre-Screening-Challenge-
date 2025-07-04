import React, { useState } from 'react';
import { Brain, Sparkles } from 'lucide-react';
import LeadForm from './components/LeadForm';
import LeadTable from './components/LeadTable';
import StatsCard from './components/StatsCard';
import { Lead, LeadFormData } from './types/lead';
import { isValidEmail, classifyIndustry, calculateConfidenceScore, exportToCSV } from './utils/validation';

function App() {
  const [leads, setLeads] = useState<Lead[]>([]);

  const handleAddLead = (leadData: LeadFormData) => {
    const newLead: Omit<Lead, 'confidenceScore'> = {
      id: Date.now().toString(),
      company: leadData.company,
      domain: leadData.domain,
      email: leadData.email,
      isEmailValid: isValidEmail(leadData.email),
      industry: classifyIndustry(leadData.domain),
      createdAt: new Date()
    };

    const leadWithScore: Lead = {
      ...newLead,
      confidenceScore: calculateConfidenceScore(newLead)
    };

    setLeads(prev => [...prev, leadWithScore]);
  };

  const handleDeleteLead = (id: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== id));
  };

  const handleExportCSV = () => {
    exportToCSV(leads);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AI Lead Scoring
            </h1>
            <Sparkles className="h-6 w-6 text-indigo-500" />
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Intelligent lead validation, industry classification, and confidence scoring powered by AI
          </p>
        </div>

        {/* Stats Cards */}
        <StatsCard leads={leads} />

        {/* Lead Form */}
        <LeadForm onAddLead={handleAddLead} />

        {/* Lead Table */}
        <LeadTable 
          leads={leads} 
          onDeleteLead={handleDeleteLead} 
          onExportCSV={handleExportCSV} 
        />
      </div>
    </div>
  );
}

export default App;
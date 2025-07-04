import React from 'react';
import { Trash2, Download, Mail, Globe, Building } from 'lucide-react';
import { Lead } from '../types/lead';

interface LeadTableProps {
  leads: Lead[];
  onDeleteLead: (id: string) => void;
  onExportCSV: () => void;
}

const LeadTable: React.FC<LeadTableProps> = ({ leads, onDeleteLead, onExportCSV }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    if (score >= 40) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  const getIndustryColor = (industry: string) => {
    const colors = {
      "AI & Technology": "bg-purple-100 text-purple-800",
      "Private Equity": "bg-blue-100 text-blue-800",
      "Lead Generation": "bg-green-100 text-green-800",
      "Healthcare": "bg-red-100 text-red-800",
      "Finance": "bg-yellow-100 text-yellow-800",
      "E-commerce": "bg-indigo-100 text-indigo-800",
      "Education": "bg-pink-100 text-pink-800",
      "Real Estate": "bg-gray-100 text-gray-800",
      "Unknown": "bg-gray-100 text-gray-600"
    };
    return colors[industry as keyof typeof colors] || "bg-gray-100 text-gray-600";
  };

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-12 text-center">
        <Building className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">No leads yet</h3>
        <p className="text-gray-500">Add your first lead to get started with AI-powered scoring</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Lead Analysis Results</h2>
          <button
            onClick={onExportCSV}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
        <p className="text-gray-600 mt-2">
          {leads.length} lead{leads.length !== 1 ? 's' : ''} analyzed with AI-powered scoring
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Industry
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Confidence Score
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{lead.company}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {lead.domain}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{lead.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getIndustryColor(lead.industry)}`}>
                    {lead.industry}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    lead.isEmailValid 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {lead.isEmailValid ? 'Valid' : 'Invalid'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${lead.confidenceScore}%` }}
                      ></div>
                    </div>
                    <span className={`text-sm font-semibold px-2 py-1 rounded ${getScoreColor(lead.confidenceScore)}`}>
                      {lead.confidenceScore}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onDeleteLead(lead.id)}
                    className="text-red-600 hover:text-red-900 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;
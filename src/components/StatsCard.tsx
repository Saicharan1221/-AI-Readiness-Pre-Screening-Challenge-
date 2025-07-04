import React from 'react';
import { TrendingUp, Users, CheckCircle, AlertTriangle } from 'lucide-react';
import { Lead } from '../types/lead';

interface StatsCardProps {
  leads: Lead[];
}

const StatsCard: React.FC<StatsCardProps> = ({ leads }) => {
  const totalLeads = leads.length;
  const validEmails = leads.filter(lead => lead.isEmailValid).length;
  const averageScore = totalLeads > 0 ? Math.round(leads.reduce((sum, lead) => sum + lead.confidenceScore, 0) / totalLeads) : 0;
  const highQualityLeads = leads.filter(lead => lead.confidenceScore >= 70).length;

  const stats = [
    {
      title: 'Total Leads',
      value: totalLeads,
      icon: Users,
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Valid Emails',
      value: validEmails,
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'Average Score',
      value: `${averageScore}%`,
      icon: TrendingUp,
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'High Quality',
      value: highQualityLeads,
      icon: AlertTriangle,
      color: 'orange',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`${stat.bgColor} p-3 rounded-full`}>
              <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
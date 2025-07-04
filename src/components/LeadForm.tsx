import React, { useState } from 'react';
import { Plus, AlertCircle, CheckCircle } from 'lucide-react';
import { LeadFormData } from '../types/lead';
import { isValidEmail, extractDomain } from '../utils/validation';

interface LeadFormProps {
  onAddLead: (leadData: LeadFormData) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onAddLead }) => {
  const [formData, setFormData] = useState<LeadFormData>({
    company: '',
    domain: '',
    email: ''
  });
  const [errors, setErrors] = useState<Partial<LeadFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<LeadFormData> = {};
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    
    if (!formData.domain.trim()) {
      newErrors.domain = 'Domain is required';
    } else if (!formData.domain.includes('.')) {
      newErrors.domain = 'Please enter a valid domain';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddLead(formData);
      setFormData({ company: '', domain: '', email: '' });
      setErrors({});
    }
  };

  const handleEmailChange = (email: string) => {
    setFormData(prev => ({ ...prev, email }));
    if (email && !formData.domain) {
      const extractedDomain = extractDomain(email);
      if (extractedDomain) {
        setFormData(prev => ({ ...prev, domain: extractedDomain }));
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Plus className="h-6 w-6 text-blue-600" />
        Add New Lead
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                errors.company 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-200 focus:border-blue-500'
              } focus:outline-none`}
              placeholder="Enter company name"
            />
            {errors.company && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.company}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Domain
            </label>
            <input
              type="text"
              value={formData.domain}
              onChange={(e) => setFormData(prev => ({ ...prev, domain: e.target.value }))}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                errors.domain 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-200 focus:border-blue-500'
              } focus:outline-none`}
              placeholder="company.com"
            />
            {errors.domain && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.domain}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-colors ${
                errors.email 
                  ? 'border-red-300 focus:border-red-500' 
                  : formData.email && isValidEmail(formData.email)
                    ? 'border-green-300 focus:border-green-500'
                    : 'border-gray-200 focus:border-blue-500'
              } focus:outline-none`}
              placeholder="contact@company.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.email}
              </p>
            )}
            {formData.email && !errors.email && isValidEmail(formData.email) && (
              <p className="mt-1 text-sm text-green-600 flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Valid email address
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Add Lead & Analyze
        </button>
      </form>
    </div>
  );
};

export default LeadForm;
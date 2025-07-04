// Email validation utility
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Domain extraction utility
export const extractDomain = (email: string): string => {
  const match = email.match(/@([^.]+\.[^.]+)$/);
  return match ? match[1] : '';
};

// Industry classification based on keywords
const industryKeywords = {
  "AI & Technology": ["openai", "gpt", "ml", "ai", "neural", "tech", "software", "data", "cloud", "saas"],
  "Private Equity": ["capital", "fund", "invest", "m&a", "equity", "venture", "partners"],
  "Lead Generation": ["leads", "crm", "outreach", "sales", "marketing", "growth", "conversion"],
  "Healthcare": ["health", "medical", "pharma", "clinic", "hospital", "care"],
  "Finance": ["bank", "finance", "payment", "fintech", "crypto", "trading"],
  "E-commerce": ["shop", "store", "ecommerce", "retail", "marketplace"],
  "Education": ["edu", "school", "university", "learn", "academy", "training"],
  "Real Estate": ["property", "real", "estate", "realty", "homes"],
};

export const classifyIndustry = (domain: string): string => {
  const domainLower = domain.toLowerCase();
  
  for (const [industry, keywords] of Object.entries(industryKeywords)) {
    for (const keyword of keywords) {
      if (domainLower.includes(keyword)) {
        return industry;
      }
    }
  }
  
  return "Unknown";
};

// Lead scoring algorithm
export const calculateConfidenceScore = (lead: Omit<Lead, 'confidenceScore'>): number => {
  let score = 0;
  
  // Email validation score (40 points)
  if (lead.isEmailValid) {
    score += 40;
  }
  
  // Industry classification score (30 points)
  if (lead.industry !== "Unknown") {
    score += 30;
  }
  
  // Email specificity score (20 points)
  const genericEmails = ['info', 'hello', 'contact', 'admin', 'support'];
  const emailPrefix = lead.email.split('@')[0].toLowerCase();
  if (!genericEmails.some(generic => emailPrefix.includes(generic))) {
    score += 20;
  }
  
  // Domain quality score (10 points)
  const topDomains = ['.com', '.org', '.net', '.io'];
  if (topDomains.some(tld => lead.domain.endsWith(tld))) {
    score += 10;
  }
  
  return Math.min(score, 100);
};

// CSV export utility
export const exportToCSV = (leads: Lead[]): void => {
  const headers = ['Company', 'Domain', 'Email', 'Valid Email', 'Industry', 'Confidence Score', 'Created At'];
  const csvContent = [
    headers.join(','),
    ...leads.map(lead => [
      lead.company,
      lead.domain,
      lead.email,
      lead.isEmailValid ? 'Yes' : 'No',
      lead.industry,
      lead.confidenceScore,
      lead.createdAt.toISOString().split('T')[0]
    ].join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'enhanced_leads_output.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
export interface Lead {
  id: string;
  company: string;
  domain: string;
  email: string;
  isEmailValid: boolean;
  industry: string;
  confidenceScore: number;
  createdAt: Date;
}

export interface LeadFormData {
  company: string;
  domain: string;
  email: string;
}
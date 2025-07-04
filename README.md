# AI-Driven Lead Scoring and Enrichment Tool

A sophisticated React-based application that leverages AI-powered algorithms to validate, classify, and score leads based on email and domain data. This tool enhances lead generation capabilities by providing intelligent insights into lead quality and industry classification.

## 🚀 Features

### Core Functionality
- **Email Validation**: Real-time email format validation with visual feedback
- **Domain Auto-extraction**: Automatically extracts domain from email addresses
- **Industry Classification**: AI-powered industry categorization based on domain keywords
- **Confidence Scoring**: Intelligent scoring algorithm that evaluates lead quality
- **Data Export**: Export analyzed leads to CSV format
- **Real-time Analytics**: Live statistics dashboard showing key metrics

### User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with gradient backgrounds and smooth animations
- **Interactive Elements**: Hover states, transitions, and micro-interactions
- **Visual Feedback**: Color-coded status indicators and progress bars
- **Form Validation**: Real-time validation with helpful error messages

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building
- **Code Quality**: ESLint with TypeScript support

## 📊 AI Scoring Algorithm

The confidence scoring system evaluates leads based on multiple factors:

### Scoring Criteria (100 points total)
1. **Email Validation (40 points)**: Valid email format and structure
2. **Industry Classification (30 points)**: Successfully categorized industry
3. **Email Specificity (20 points)**: Non-generic email addresses (excludes info@, hello@, etc.)
4. **Domain Quality (10 points)**: Premium TLD domains (.com, .org, .net, .io)

### Industry Classification
The system recognizes the following industries based on domain keywords:
- **AI & Technology**: openai, gpt, ml, ai, neural, tech, software, data, cloud, saas
- **Private Equity**: capital, fund, invest, m&a, equity, venture, partners
- **Lead Generation**: leads, crm, outreach, sales, marketing, growth, conversion
- **Healthcare**: health, medical, pharma, clinic, hospital, care
- **Finance**: bank, finance, payment, fintech, crypto, trading
- **E-commerce**: shop, store, ecommerce, retail, marketplace
- **Education**: edu, school, university, learn, academy, training
- **Real Estate**: property, real, estate, realty, homes

## 🏗️ Project Structure

```
src/
├── components/
│   ├── LeadForm.tsx          # Lead input form with validation
│   ├── LeadTable.tsx         # Data table with sorting and actions
│   └── StatsCard.tsx         # Analytics dashboard cards
├── types/
│   └── lead.ts               # TypeScript interfaces
├── utils/
│   └── validation.ts         # Core validation and scoring logic
├── App.tsx                   # Main application component
├── main.tsx                  # Application entry point
└── index.css                 # Global styles
```

## 🚦 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-lead-scoring-tool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📝 Usage Guide

### Adding Leads
1. Fill in the **Company Name**, **Domain**, and **Email Address** fields
2. The system will automatically validate the email format in real-time
3. If you enter an email first, the domain will be auto-extracted
4. Click "Add Lead & Analyze" to process the lead

### Understanding Scores
- **80-100%**: High-quality leads with valid emails and clear industry classification
- **60-79%**: Good leads with minor issues (generic emails or unknown industry)
- **40-59%**: Medium-quality leads requiring review
- **0-39%**: Low-quality leads with validation issues

### Exporting Data
Click the "Export CSV" button to download all analyzed leads with their scores and classifications.

## 🎨 Design Philosophy

The application follows modern design principles:
- **Clean Aesthetics**: Minimalist design with purposeful use of color and space
- **Visual Hierarchy**: Clear information architecture with proper typography scaling
- **Responsive Layout**: Fluid design that works across all device sizes
- **Accessibility**: High contrast ratios and keyboard navigation support
- **Performance**: Optimized components and efficient state management

## 🔧 Configuration

### Customizing Industry Keywords
Edit the `industryKeywords` object in `src/utils/validation.ts` to add or modify industry classifications:

```typescript
const industryKeywords = {
  "Your Industry": ["keyword1", "keyword2", "keyword3"],
  // ... other industries
};
```

### Adjusting Scoring Algorithm
Modify the `calculateConfidenceScore` function in `src/utils/validation.ts` to change scoring weights:

```typescript
// Example: Increase email validation weight
if (lead.isEmailValid) {
  score += 50; // Changed from 40
}
```

## 📈 Analytics Dashboard

The stats cards provide real-time insights:
- **Total Leads**: Count of all processed leads
- **Valid Emails**: Number of leads with valid email addresses
- **Average Score**: Mean confidence score across all leads
- **High Quality**: Count of leads with 70%+ confidence scores

## 🔍 Data Validation

### Email Validation
- Format validation using regex pattern
- Real-time feedback with visual indicators
- Prevents submission of invalid emails

### Domain Validation
- Ensures domain contains at least one dot
- Validates domain structure
- Auto-extraction from email addresses

## 🚀 Future Enhancements

Potential improvements for the application:
- Integration with external APIs for enhanced data enrichment
- Machine learning model for more sophisticated industry classification
- Lead deduplication and merge functionality
- Advanced filtering and search capabilities
- Integration with CRM systems
- Bulk import from CSV files
- Email deliverability checking
- Social media profile enrichment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with React and TypeScript for type safety and developer experience
- Styled with Tailwind CSS for rapid UI development
- Icons provided by Lucide React
- Inspired by modern lead generation and CRM tools

---

**Note**: This tool is designed for demonstration purposes and should be enhanced with additional validation and security measures for production use.
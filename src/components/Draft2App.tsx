import { useState, useEffect, FormEvent } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Mail, 
  FileText, 
  History, 
  FileCheck,
  Building, 
  GraduationCap, 
  ChevronRight, 
  Globe, 
  User, 
  Sliders, 
  Download,
  AlertTriangle,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  TrendingUp,
  Fingerprint,
  Briefcase,
  Layers,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { personalInfo, experiences, certifications, skills, education, premiumDetails } from '../data';
import { motion, AnimatePresence } from 'motion/react';

// Hardcoded GRC Compliance Controls mock-database for Interactive Audit widget
const iso27001Controls = [
  {
    code: 'A.5.15',
    name: 'Access Control Guideline',
    risk: 'Unauthorized database breach & credential leakage',
    solution: 'Designed zero-trust access strategies, implemented multi-factor identity integrations (Silverfort), and enforced strict Active Directory group policies.',
    status: 'COMPLIANT'
  },
  {
    code: 'A.8.8',
    name: 'Management of Technical Vulnerabilities',
    risk: 'Zero-day exploits & unpatched network assets',
    solution: 'Led continuous vulnerability scanning protocols with Tenable One, orchestrated system prioritization matrices, and automated patch management workflows.',
    status: 'COMPLIANT'
  },
  {
    code: 'A.8.20',
    name: 'Network Security controls',
    risk: 'Malicious packets & untrusted zone ingress',
    solution: 'Configured robust Fortinet FortiGate enterprise firewalls, partitioned logical network segments via secure VLAN topologies, and monitored live server telemetry.',
    status: 'COMPLIANT'
  },
  {
    code: 'A.5.36',
    name: 'Compliance with Policies for InfoSec',
    risk: 'Regulatory non-compliance, GDPR & NIS2 violations',
    solution: 'Conducted rigorous gap analyses, established internal cyber auditing regimes, and authored GRC policies mapping to TÜV Austria Lead Auditor benchmarks.',
    status: 'COMPLIANT'
  },
  {
    code: 'A.5.1',
    name: 'Policies for Information Security',
    risk: 'Lack of executive alignment & training voids',
    solution: 'Authored formal corporate Information Security Management Systems (ISMS), aligning standard human procedures with rigorous technical safety standards.',
    status: 'COMPLIANT'
  }
];

// Interactive FAQ Chat Bot topics
const chatbotTopics = [
  {
    id: 'iso',
    question: 'Tell me about the ISO 27001 Lead Auditor certification.',
    answer: 'I am certified by the TÜV Austria Group as an ISO/IEC 27001:2022 Lead Auditor (granted 2026). This proves my capacity to professionally build, initiate, maintain, and audit an enterprise-grade Information Security Management System (ISMS) to safeguard corporate asset trust margins.'
  },
  {
    id: 'military',
    question: 'What is your HAF military security clearance?',
    answer: 'I served at the Hellenic Air Force Computerisation Centre (KMH/GEA) as a Sergeant NCO, where we managed core defense servers and classified networks. Due to this role, I received specialized military security clearance and operated securely under high-pressure state security frameworks.'
  },
  {
    id: 'nis2',
    question: 'How do you approach GRC advisory (GDPR / NIS2)?',
    answer: 'My approach bridges regulatory obligations with practical engineering solutions. Under GDPR and NIS2 directives, I conduct gap analyses, define enterprise threat vectors, model quantitative risk, and design technical policies that minimize legal and security exposure.'
  },
  {
    id: 'msc',
    question: 'Tell me about your MSc in Cybersecurity and Data Science.',
    answer: 'My MSc at the University of Piraeus (expected graduation 2026) combines advanced cybersecurity protocols with big data intelligence. coursework covers network defenses, threat containment algorithms, and applying AI to predict and prevent security threats.'
  }
];

export default function Draft2App() {
  const [activeTab, setActiveTab] = useState<'grc' | 'timeline' | 'skills' | 'creds' | 'contact'>('grc');
  const [copied, setCopied] = useState(false);
  const [selectedControl, setSelectedControl] = useState<string>('A.5.15');
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'bot'; text: string }[]>([
    { sender: 'bot', text: 'Executive briefing console initialized. Select an audit inquiry topic to evaluate my corporate defense profiles:' }
  ]);
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    showToast('Verified email coordinates copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChatInquiry = (topicId: string, qText: string, aText: string) => {
    if (activeQuestionId === topicId) return;
    setActiveQuestionId(topicId);
    
    // Add user question first
    setChatLog(prev => [...prev, { sender: 'user', text: qText }]);
    
    // Delay slightly to mimic human/system processing
    setTimeout(() => {
      setChatLog(prev => [...prev, { sender: 'bot', text: aText }]);
      showToast(' briefing details loaded.');
    }, 600);
  };

  const handleCallbackSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;
    
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      showToast('Auditor contact packet delivered.');
      setContactName('');
      setContactEmail('');
      setContactMsg('');
    }, 1200);
  };

  // Find currently selected ISO Control details
  const activeControlData = iso27001Controls.find(c => c.code === selectedControl) || iso27001Controls[0];

  return (
    <div className="min-h-screen bg-[#070d19] text-slate-200 font-sans relative overflow-hidden flex flex-col justify-between selection:bg-amber-500/20 selection:text-amber-400">
      
      {/* Premium Luxury Background Accents (Executive Glassmorphism Style) */}
      <div className="absolute top-0 left-0 w-full h-[550px] bg-gradient-to-b from-[#0e1a30]/60 via-[#070d19]/20 to-transparent pointer-events-none" />
      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-150px] right-[5%] w-[350px] h-[350px] bg-sky-500/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Decorative Blueprint Hairlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.006)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      {/* Toast Alert popups */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#0e1627] border border-amber-500/30 text-amber-400 font-mono text-[11px] py-2.5 px-4 rounded-md shadow-xl shadow-black/60 flex items-center space-x-2 border-l-4 border-l-amber-500"
          >
            <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12 z-10 flex-grow flex flex-col space-y-6 md:space-y-8">
        
        {/* PREMIUM EXECUTIVE HEADER */}
        <header className="bg-[#0b1222]/90 border border-slate-800/80 rounded-xl p-5 md:p-6 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-stretch justify-between gap-6 backdrop-blur-md">
          
          {/* Subtle gold brand ribbon */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-500/40 via-amber-500 to-sky-500" />
          
          {/* Main profile brand info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:gap-5">
            <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-amber-500/25 to-[#0b1222] border border-amber-500/40 flex items-center justify-center font-serif text-2xl font-semibold text-amber-400 shrink-0 shadow-lg shadow-black/40">
              N
              <span className="text-sky-400 font-sans text-sm absolute bottom-0.5 right-1.5 font-normal">K</span>
              <Fingerprint size={12} className="absolute top-1 left-1 text-amber-500/30" />
            </div>

            <div className="space-y-1 md:space-y-1.5">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <h1 className="text-xl md:text-2xl font-serif font-semibold text-white tracking-wide">{personalInfo.name}</h1>
                <span className="bg-amber-500/10 border border-amber-500/20 text-amber-500 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold">
                  certified lead auditor
                </span>
              </div>
              <p className="text-xs md:text-sm text-slate-300 font-medium flex items-center justify-center sm:justify-start gap-1.5">
                <ShieldCheck size={14} className="text-amber-500" />
                <span>{personalInfo.title}</span>
              </p>
              
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active Tenure Underway
                </span>
                <span className="text-slate-600">|</span>
                <span>MSc Cyber & Data Science</span>
              </div>
            </div>
          </div>

          {/* Quick executive brief widgets */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center border-t border-slate-800/60 md:border-t-0 pt-4 md:pt-0 gap-3">
            
            {/* Quick contact */}
            <div className="flex items-center gap-1.5">
              <button 
                onClick={copyEmail}
                className="px-3.5 py-1.8 bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono text-xs rounded transition-all flex items-center gap-1.5 cursor-pointer"
                title="Copy primary auditor email"
              >
                <Mail size={12} />
                <span>{personalInfo.email}</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="p-1 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600 text-xs rounded transition-all flex items-center gap-1.5 cursor-pointer"
                title="Print and download CV as layout-perfect PDF document"
              >
                <Download size={12} className="text-sky-400" />
                <span className="hidden sm:inline">Executive PDF</span>
              </button>

              <a 
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 hover:text-sky-300 border border-slate-700 rounded transition-all flex items-center justify-center cursor-pointer"
                title="LinkedIn Profile"
              >
                <ArrowUpRight size={14} />
              </a>
            </div>

          </div>

        </header>

        {/* DOUBLE COLUMN BRIEFING AREA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT PANELS: NAVIGATION & BRIEFING HIGHLIGHTS */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            
            {/* AUDITOR VIEWPORT CONTROLS */}
            <div className="bg-[#0b1222]/95 border border-slate-800/80 rounded-xl p-4 shadow-xl space-y-2">
              <h3 className="text-slate-400 text-[10px] font-mono uppercase tracking-widest pl-1 border-b border-slate-800 pb-2">
                [ viewport modules ]
              </h3>
              
              <nav className="flex flex-col space-y-1 pt-1.5">
                {[
                  { id: 'grc', label: 'Compliance & Risks', icon: ShieldCheck },
                  { id: 'timeline', label: 'Tenure & Milestones', icon: History },
                  { id: 'skills', label: 'Matrix of Competencies', icon: Sliders },
                  { id: 'creds', label: 'Academic Credentials', icon: Award },
                  { id: 'contact', label: 'Auditor Callback Gate', icon: Mail }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full text-left p-2.5 rounded-lg text-xs font-mono transition-all flex items-center space-x-2.5 cursor-pointer ${
                        isActive 
                          ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold shadow-inner' 
                          : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Icon size={14} className={isActive ? 'text-amber-500' : 'text-slate-500'} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* LIVE KPI COUNTERS */}
            <div className="bg-[#0b1222]/95 border border-slate-800/80 rounded-xl p-4 shadow-xl space-y-4">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Governance Rating</span>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-3xl font-serif font-bold text-emerald-400">98%</span>
                  <span className="text-[10px] font-mono text-slate-400 flex items-center"><TrendingUp size={10} className="mr-0.5 text-emerald-400" /> compliant</span>
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-800/60">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Audit Credentials</span>
                <div className="text-sm font-sans font-semibold text-white">ISO/IEC 27001</div>
                <span className="text-[10px] font-mono text-amber-500">TÜV Austria Registered</span>
              </div>

              <div className="space-y-1 pt-2 border-t border-slate-800/60">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Active Clearance</span>
                <span className="inline-flex items-center text-[11px] font-mono text-emerald-400 bg-emerald-500/5 px-2 py-0.5 border border-emerald-500/20 rounded">
                  MILITARY CL. SECURE
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT PANELS: INTERACTIVE CONTENT ZONE */}
          <main className="lg:col-span-9 bg-[#0b1222]/95 border border-slate-800/80 rounded-xl p-5 md:p-6 shadow-xl min-h-[460px] flex flex-col justify-between">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* -------------------- 1. COMPLIANCE & RISKS MODULE -------------------- */}
                {activeTab === 'grc' && (
                  <div className="space-y-5">
                    
                    {/* Module Title Description */}
                    <div className="space-y-1 border-b border-slate-800/80 pb-3">
                      <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                        <FileCheck className="text-amber-500" size={18} />
                        ISMS Risk & Compliance Control Blueprint
                      </h2>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Nikolaos acts as an organizational catalyst for enterprise compliance. Interact below to view his custom security auditing treatments responding to critical operational risk vectors:
                      </p>
                    </div>

                    {/* INTERACTIVE CONTROLS WIDGET */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-1.5">
                      
                      {/* Control list column */}
                      <div className="md:col-span-5 flex flex-col space-y-1.5">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest pl-1">ISO 27001 Controls</span>
                        <div className="flex flex-col space-y-1 bg-slate-900/50 p-1.5 rounded-lg border border-slate-800">
                          {iso27001Controls.map((c) => (
                            <button
                              key={c.code}
                              onClick={() => setSelectedControl(c.code)}
                              className={`w-full text-left p-2 rounded text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                                selectedControl === c.code 
                                  ? 'bg-[#18233a] text-amber-400 border border-amber-500/20' 
                                  : 'hover:bg-slate-800/60 text-slate-300'
                              }`}
                            >
                              <span className="font-semibold">{c.code}</span>
                              <span className="text-[10px] select-none text-slate-400 truncate max-w-[130px]">{c.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Control Treatment screen */}
                      <div className="md:col-span-7 bg-[#050912] border border-slate-800 rounded-lg p-4 font-mono text-xs space-y-4 shadow-inner relative overflow-hidden">
                        
                        {/* Status absolute label */}
                        <div className="absolute top-3 right-3 flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded py-0.5 px-2 text-[8px] text-emerald-400 font-semibold uppercase tracking-wider">
                          <CheckCircle2 size={10} />
                          <span>{activeControlData.status}</span>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-[9px] text-amber-500 font-bold uppercase tracking-wider">[ CONTROL CODE: {activeControlData.code} ]</span>
                          <h4 className="text-sm font-sans font-bold text-white tracking-tight">{activeControlData.name}</h4>
                        </div>

                        <div className="space-y-1.5 border-t border-slate-800/80 pt-2.5">
                          <span className="text-[9px] text-red-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <AlertTriangle size={10} /> Associated Threat/Risk Vectors
                          </span>
                          <p className="text-[11px] text-slate-300 italic">{activeControlData.risk}</p>
                        </div>

                        <div className="space-y-1.5 border-t border-slate-800/80 pt-2.5">
                          <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">[ N. KOUKOPOULOS COMPLIANCE SOLUTION ]</span>
                          <p className="text-[11px] text-slate-300 font-sans leading-relaxed pt-0.5">{activeControlData.solution}</p>
                        </div>

                      </div>

                    </div>

                    {/* INTRODUCTORY SUMMARY OVERVIEW */}
                    <div className="bg-[#0f1a30]/40 border border-slate-800/60 rounded-lg p-3.5 flex flex-col md:flex-row items-center justify-between gap-3 pt-3">
                      <div className="space-y-1 max-w-[420px]">
                        <h4 className="text-xs font-serif font-semibold text-white tracking-wide">Professional GRC Focus Frame</h4>
                        <p className="text-[11px] text-slate-300 font-sans leading-relaxed">
                          With an MSc background in Data Science and certified TÜV Austria proficiency, my service models secure corporate continuity through active risk analysis and strict NIS2 adherence strategy.
                        </p>
                      </div>
                      <div className="flex md:flex-col items-end shrink-0 gap-2 font-mono text-[9px] text-slate-400">
                        <span>Framework: ISO 27001:2022</span>
                        <span>Directives: NIS2, GDPR, SOC2</span>
                      </div>
                    </div>

                  </div>
                )}

                {/* -------------------- 2. TENURE & MILESTONES TIMELINE -------------------- */}
                {activeTab === 'timeline' && (
                  <div className="space-y-4">
                    
                    <div className="space-y-1 border-b border-slate-800/80 pb-3">
                      <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                        <Briefcase className="text-amber-500" size={17} />
                        Professional Tenure & Enterprise Milestones
                      </h2>
                      <p className="text-xs text-slate-400">
                        An executive log of security architecture, military defense support, and system evaluation tenures:
                      </p>
                    </div>

                    <div className="space-y-4 pt-1.5 max-h-[310px] overflow-y-auto pr-1">
                      {experiences.map((exp) => (
                        <div 
                          key={exp.id} 
                          className="bg-slate-900/40 hover:bg-slate-900/80 border border-slate-800/80 hover:border-slate-700/60 p-4 rounded-xl transition-all relative group flex flex-col sm:flex-row items-start justify-between gap-3"
                        >
                          {/* Dot accent indicator */}
                          <div className="absolute top-5 -left-[1px] w-[3px] h-[30px] rounded-r bg-amber-500 group-hover:scale-y-110 transition-transform" />

                          <div className="space-y-2 max-w-[530px]">
                            <div className="flex flex-wrap items-center gap-2">
                              <Building size={13} className="text-slate-500" />
                              <h4 className="text-sm font-sans font-bold text-white">{exp.company}</h4>
                              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/5 px-2 border border-emerald-500/10 rounded">{exp.period}</span>
                            </div>

                            <p className="text-xs font-mono font-semibold text-amber-400">{exp.role}</p>

                            <ul className="space-y-1.5 pl-1">
                              {exp.highlights.map((point, index) => (
                                <li key={index} className="text-[11px] text-slate-300 font-sans leading-relaxed flex items-start">
                                  <ChevronRight size={13} className="text-slate-500 shrink-0 mt-0.5 mr-0.5" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Company icon badge placeholder */}
                          <span className="font-mono text-[9px] text-slate-600 border border-slate-800 p-1 px-2 rounded bg-slate-900 flex items-center select-none shrink-0 uppercase">
                            {exp.id}
                          </span>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* -------------------- 3. MATRIX OF COMPETENCIES -------------------- */}
                {activeTab === 'skills' && (
                  <div className="space-y-4">
                    
                    <div className="space-y-1 border-b border-slate-800/80 pb-3">
                      <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                        <Layers className="text-amber-500" size={17} />
                        Professional Competency Matrix
                      </h2>
                      <p className="text-xs text-slate-400">
                        Operational proficiency across GRC frameworks, cybersecurity infrastructures, and premium system tools:
                      </p>
                    </div>

                    {/* Skill Categorization Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1.5">
                      
                      {/* Category: GRC / Compliance (1) */}
                      <div className="bg-[#050912]/80 border border-slate-800 p-3.5 rounded-lg space-y-3">
                        <div className="flex items-center space-x-1.5 border-b border-slate-800 pb-2">
                          <ShieldCheck size={13} className="text-amber-500" />
                          <h4 className="text-xs font-mono font-bold text-slate-300">GRC & GOVERNANCE</h4>
                        </div>
                        <div className="space-y-2.5">
                          {skills.filter(s => s.category === 'grc').slice(0, 4).map(s => (
                            <div key={s.name} className="space-y-1 text-xs">
                              <div className="flex justify-between items-center text-[11.5px]">
                                <span className="font-sans text-slate-300 truncate font-medium">{s.name}</span>
                                <span className="font-mono text-[10px] text-amber-400 font-semibold">{s.percentage}%</span>
                              </div>
                              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500" style={{ width: `${s.percentage}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Category: Cyber Defense / Network (2) */}
                      <div className="bg-[#050912]/80 border border-slate-800 p-3.5 rounded-lg space-y-3">
                        <div className="flex items-center space-x-1.5 border-b border-slate-800 pb-2">
                          <Sliders size={13} className="text-emerald-500" />
                          <h4 className="text-xs font-mono font-bold text-slate-300">CYBER SECURITY</h4>
                        </div>
                        <div className="space-y-2.5">
                          {skills.filter(s => s.category === 'tech').slice(0, 4).map(s => (
                            <div key={s.name} className="space-y-1 text-xs">
                              <div className="flex justify-between items-center text-[11.5px]">
                                <span className="font-sans text-slate-300 truncate font-medium">{s.name}</span>
                                <span className="font-mono text-[10px] text-emerald-400 font-semibold">{s.percentage}%</span>
                              </div>
                              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500" style={{ width: `${s.percentage}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Category: Security Tools (3) */}
                      <div className="bg-[#050912]/80 border border-slate-800 p-3.5 rounded-lg space-y-3">
                        <div className="flex items-center space-x-1.5 border-b border-slate-800 pb-2">
                          <Award size={13} className="text-sky-400" />
                          <h4 className="text-xs font-mono font-bold text-slate-300">SECURITY INFRA STACK</h4>
                        </div>
                        <div className="space-y-2.5">
                          {skills.filter(s => s.category === 'tools').slice(0, 4).map(s => (
                            <div key={s.name} className="space-y-1 text-xs">
                              <div className="flex justify-between items-center text-[11.5px]">
                                <span className="font-sans text-slate-300 truncate font-medium">{s.name}</span>
                                <span className="font-mono text-[10px] text-sky-400 font-semibold">{s.percentage}%</span>
                              </div>
                              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-sky-400" style={{ width: `${s.percentage}%` }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Interactive security tool badge bar */}
                    <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs pt-3">
                      <span className="font-mono text-slate-500 text-[10px] uppercase">Corporate Stack Expertise:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {personalInfo.tools.map((t) => (
                          <span key={t} className="bg-slate-850 text-slate-300 border border-slate-700/60 p-1 px-2.5 rounded text-[10.5px]/none font-mono hover:text-white hover:border-amber-500/20 transition-all select-all">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* -------------------- 4. ACADEMIC CREDENTIALS & FAQ BRIEFING -------------------- */}
                {activeTab === 'creds' && (
                  <div className="space-y-5">
                    
                    <div className="space-y-1 border-b border-slate-800/80 pb-3">
                      <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                        <Award className="text-amber-500" size={17} />
                        Academic Degrees & Lead Auditor Credentials
                      </h2>
                      <p className="text-xs text-slate-400">
                        Validated compliance certifications, academic masteries, and tactical military postings:
                      </p>
                    </div>

                    {/* Academic block + Certified block split */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                      
                      {/* Academics & Certificates */}
                      <div className="space-y-3.5">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest pl-1 block">Validated Qualifications</span>
                        
                        <div className="space-y-3">
                          {/* ISO certification */}
                          {certifications.map(cert => (
                            <div key={cert.id} className="p-3.5 bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-xl relative group">
                              <span className="absolute top-3.5 right-3.5 font-mono text-[9px] text-amber-500 bg-amber-500/10 border border-amber-500/20 p-0.5 px-1.5 rounded uppercase">{cert.year}</span>
                              <div className="space-y-1">
                                <span className="text-[10px] font-mono text-slate-400 block">{cert.issuer}</span>
                                <h4 className="text-xs font-sans font-bold text-white">{cert.name}</h4>
                                <p className="text-[10.5px] text-slate-300 leading-relaxed font-sans pt-1">{cert.description}</p>
                              </div>
                            </div>
                          ))}

                          {/* Degrees catalog */}
                          {education.map(edu => (
                            <div key={edu.degree} className="p-3.5 bg-slate-900/40 border border-slate-850 hover:border-slate-700 rounded-xl">
                              <span className="font-mono text-[9px] text-emerald-400 block mb-0.5">{edu.period}</span>
                              <h4 className="text-xs font-sans font-bold text-white">{edu.degree}</h4>
                              <p className="text-[10.5px] font-mono text-slate-400">{edu.institution}</p>
                              <p className="text-[10.5px] text-slate-300 leading-relaxed font-sans pt-1.5 border-t border-slate-800/45 mt-1.5">{edu.details}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Interactive FAQ Chat Bot */}
                      <div className="space-y-3">
                        <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest pl-1 block">Interactive Briefing Queries</span>
                        
                        <div className="border border-slate-800 bg-[#050912]/80 rounded-xl p-3.5 flex flex-col justify-between h-[360px] md:h-[318px] relative">
                          
                          {/* Chat Messages viewport */}
                          <div id="briefing-chat-vp" className="space-y-2.5 overflow-y-auto max-h-[190px] pr-1 flex-grow pb-2 scroll-smooth">
                            {chatLog.map((chat, idx) => (
                              <div 
                                key={idx} 
                                className={`flex flex-col max-w-[85%] ${chat.sender === 'user' ? 'self-end ml-auto items-end' : 'self-start mr-auto items-start'}`}
                              >
                                <span className="text-[8px] font-mono text-slate-500 uppercase pb-0.5">
                                  {chat.sender === 'user' ? 'GUEST RECRUITER INQUIRY' : 'AUDITOR AUTOMATED BRIEFING'}
                                </span>
                                <p className={`p-2.5 rounded-lg text-xs leading-relaxed ${
                                  chat.sender === 'user' 
                                    ? 'bg-[#1e293b] text-white rounded-br-none border border-slate-700/50' 
                                    : 'bg-[#111c33]/80 text-amber-100 rounded-bl-none border border-amber-500/10'
                                }`}>
                                  {chat.text}
                                </p>
                              </div>
                            ))}
                          </div>

                          {/* Quick selection topics trigger */}
                          <div className="border-t border-slate-800/80 pt-2.5 space-y-1.5 w-full bg-[#050912]/80 shrink-0">
                            <span className="text-[8.5px] font-mono text-slate-500 uppercase tracking-wider block">Inquiry Topics (Click to ask):</span>
                            <div className="flex flex-col gap-1 text-[10px]">
                              {chatbotTopics.map((topic) => (
                                <button
                                  key={topic.id}
                                  onClick={() => handleChatInquiry(topic.id, topic.question, topic.answer)}
                                  className="w-full text-left p-1.5 rounded bg-slate-900 hover:bg-[#18233a] border border-slate-800 hover:border-amber-500/20 text-slate-300 hover:text-amber-400 font-sans truncate transition-colors flex items-center justify-between cursor-pointer"
                                  title={topic.question}
                                >
                                  <span className="truncate flex items-center gap-1">
                                    <Sparkles size={10} className="text-amber-500 shrink-0" />
                                    <span>{topic.question}</span>
                                  </span>
                                  <ArrowUpRight size={10} className="text-slate-600 shrink-0" />
                                </button>
                              ))}
                            </div>
                          </div>

                        </div>
                      </div>

                    </div>

                  </div>
                )}

                {/* -------------------- 5. CONTACT / CALLBACK MODULE -------------------- */}
                {activeTab === 'contact' && (
                  <div className="space-y-4">
                    
                    <div className="space-y-1 border-b border-slate-800/80 pb-3">
                      <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                        <Mail className="text-amber-500" size={17} />
                        Corporate Callback & Audit Dispatch Gate
                      </h2>
                      <p className="text-xs text-slate-400">
                        Leave a direct secure message requesting GRC advisory, cybersecurity engineering, or general employment callbacks:
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-1.5">
                      
                      {/* Left Info side */}
                      <div className="md:col-span-5 bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 space-y-4 font-mono text-xs">
                        <div className="space-y-1">
                          <span className="text-[9px] text-slate-500 uppercase block">Enterprise Endpoint</span>
                          <span className="text-white select-all text-xs border border-slate-800 p-2 rounded bg-slate-900/60 block truncate select-all">{personalInfo.email}</span>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[9px] text-slate-500 uppercase block">Dual Nationality / Scope</span>
                          <span className="text-slate-300 text-[11px] font-sans leading-relaxed block">
                            2+ years functioning securely for high-profile clients in Northern Ireland, UK. Adaptive under UK, EU, and Greek cyber regulatory policies.
                          </span>
                        </div>

                        <div className="space-y-1 pt-1.5 border-t border-slate-800/60">
                          <span className="text-[9px] text-slate-500 uppercase block">ISO Audit Status</span>
                          <span className="text-emerald-400 font-semibold text-[11px] block flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            AVAILABLE FOR GLOBAL ASSIGNMENTS
                          </span>
                        </div>
                      </div>

                      {/* Callback Form */}
                      <div className="md:col-span-7 bg-[#050912]/80 border border-slate-800 p-4 rounded-xl shadow-inner relative">
                        {isSent ? (
                          <div className="absolute inset-0 bg-[#050912]/95 rounded-xl z-20 flex flex-col items-center justify-center text-center p-5 space-y-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                              <CheckCircle2 size={20} />
                            </div>
                            <h4 className="font-serif font-bold text-white text-sm">Auditor Dispatch Success</h4>
                            <p className="text-[11px] text-slate-400 max-w-[280px] leading-relaxed">
                              Your callback coordination packet was logged. Nikolaos Koukopoulos will acknowledge and reply shortly via <span className="text-amber-400 font-mono select-all">koukopoulos@outlook.com</span>.
                            </p>
                            <button 
                              onClick={() => setIsSent(false)} 
                              className="text-[10px] font-mono text-amber-500 hover:underline cursor-pointer"
                            >
                              DISPATCH ANOTHER PACKET
                            </button>
                          </div>
                        ) : null}

                        <form onSubmit={handleCallbackSubmit} className="space-y-3.5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-slate-500 uppercase block">Name / Organization</label>
                              <input 
                                type="text"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                placeholder="Enter organization name"
                                required
                                className="w-full bg-[#0d1323] border border-slate-800 focus:border-amber-500/40 rounded px-2.5 py-1.8 text-xs text-white focus:outline-hidden"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono text-slate-500 uppercase block">Callback Email</label>
                              <input 
                                type="email"
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                                placeholder="auditor@organization.com"
                                required
                                className="w-full bg-[#0d1323] border border-slate-800 focus:border-amber-500/40 rounded px-2.5 py-1.8 text-xs text-white focus:outline-hidden"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-mono text-slate-500 uppercase block">Inquiry / Operational Requirements</label>
                            <textarea 
                              value={contactMsg}
                              onChange={(e) => setContactMsg(e.target.value)}
                              placeholder="Describe compliance assessment requirements, scheduling timelines, or details of the assignment..."
                              required
                              rows={3.5}
                              className="w-full bg-[#0d1323] border border-slate-800 focus:border-amber-500/40 rounded p-2.5 text-xs text-white focus:outline-hidden resize-none leading-relaxed"
                            />
                          </div>

                          <button
                            type="submit"
                            disabled={isSending}
                            className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-mono font-bold tracking-wider rounded transition-all flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
                          >
                            <span>{isSending ? 'DISPATCHING PACKET...' : 'DISPATCH SECURE TRANSMISSION'}</span>
                          </button>
                        </form>
                      </div>

                    </div>

                  </div>
                )}

              </motion.div>
            </AnimatePresence>

            {/* LOWER STATS BAR */}
            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-[9px] text-slate-500 select-none">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> ISO/IEC 27001 Auditor</span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> MILITARY SERG. CLEARANCE</span>
            </div>

          </main>

        </div>

      </div>

      {/* FOOTER BAR */}
      <footer className="w-full border-t border-slate-800/50 bg-[#050912] py-6 z-10 font-mono text-[10px] text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} Nikolaos Koukopoulos &bull; Executive GRC Audit Ledger
          </div>
          <div className="flex items-center space-x-1.5 justify-center">
            <span>Corporate Identity Portal Ref:</span>
            <span className="text-amber-400 font-semibold select-all">NK-SEC-ISMS</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

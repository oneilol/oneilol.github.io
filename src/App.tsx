import { useState, useEffect, FormEvent } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Mail, 
  Lock, 
  CheckCircle,
  FolderDot,
  ChevronRight,
  Database,
  Building,
  GraduationCap,
  ClipboardCopy,
  Send,
  ArrowUpRight,
  Wifi,
  Linkedin,
  Globe,
  Languages,
  Printer
} from 'lucide-react';
import { personalInfo, experiences, certifications, skills, education, premiumDetails } from './data';
import { motion, AnimatePresence } from 'motion/react';
import SiemMonitor from './components/SiemMonitor';
import PrintableCv from './components/PrintableCv';

// Specialized Cyber Decrypt Animation Component
function DecryptText({ text, isHovered }: { text: string; isHovered: boolean }) {
  const [displayText, setDisplayText] = useState('');
  const [hasDecrypted, setHasDecrypted] = useState(false);
  const chars = '01XYZ/{}[]<>?#@&$%!^-+_*';

  useEffect(() => {
    if (hasDecrypted) {
      setDisplayText(text);
      return;
    }

    let intervalId: any;
    
    if (isHovered) {
      let step = 0;
      const totalLength = text.length;
      
      intervalId = setInterval(() => {
        setDisplayText(() => {
          return text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < step) {
                return char;
              }
              // Dynamically cycle through cryptic characters
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        });
        
        step += Math.ceil(totalLength / 25) || 1;
        if (step >= totalLength) {
          setDisplayText(text);
          setHasDecrypted(true);
          clearInterval(intervalId);
        }
      }, 20);
    } else {
      // Return fully scrambled characters mimicking real length to prevent UI jitter
      setDisplayText(() => {
        return text
          .split('')
          .map(char => {
            if (char === ' ') return ' ';
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
      });
    }

    return () => clearInterval(intervalId);
  }, [isHovered, text, hasDecrypted]);

  return <span className="font-mono">{displayText}</span>;
}

export default function App() {
  const [copied, setCopied] = useState(false);
  const [systemAlert, setSystemAlert] = useState<string | null>(null);
  const [allDecrypted, setAllDecrypted] = useState(false);

  // Hover states to trigger individual card decryption
  const [isBioHovered, setIsBioHovered] = useState(false);
  const [hoveredExperienceId, setHoveredExperienceId] = useState<string | null>(null);
  const [hoveredSkillName, setHoveredSkillName] = useState<string | null>(null);
  const [hoveredCertId, setHoveredCertId] = useState<string | null>(null);
  const [hoveredEduDegree, setHoveredEduDegree] = useState<string | null>(null);
  const [isClearanceHovered, setIsClearanceHovered] = useState(false);
  const [isInternationalHovered, setIsInternationalHovered] = useState(false);
  const [hoveredLangName, setHoveredLangName] = useState<string | null>(null);

  // Skill category filter state
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<'all' | 'grc' | 'tech' | 'tools'>('all');
  const [showAllSkills, setShowAllSkills] = useState(false);

  // Contact payload state
  const [visitorName, setVisitorName] = useState('');
  const [visitorMail, setVisitorMail] = useState('');
  const [visitorMsg, setVisitorMsg] = useState('');
  const [submitState, setSubmitState] = useState<'idle' | 'generating_hash' | 'dispatched'>('idle');
  const [hashValue, setHashValue] = useState('');

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    triggerAlert('Contact endpoint copied to clipboard.');
    setTimeout(() => setCopied(false), 2000);
  };

  const triggerAlert = (msg: string) => {
    setSystemAlert(msg);
    setTimeout(() => setSystemAlert(null), 3000);
  };

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!visitorName || !visitorMail || !visitorMsg) return;

    setSubmitState('generating_hash');
    
    setTimeout(() => {
      const simulatedHash = Array.from({length: 32}, () => Math.floor(Math.random()*16).toString(16)).join('');
      setHashValue(`0x${simulatedHash.toUpperCase()}`);
      setSubmitState('dispatched');
      triggerAlert('Secure inquiry packet transmitted successfully.');
    }, 1500);
  };

  return (
    <>
      <div className="print:hidden min-h-screen bg-[#07090e] text-[#b0b9c6] font-sans selection:bg-[#00f3ff]/20 selection:text-[#00f3ff] relative overflow-hidden flex flex-col justify-between">
      
      {/* Absolute Cyber Ambient Accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f3ff]/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00ff66]/15 to-transparent"></div>
      
      {/* Decorative cyber grid background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Interactive SIEM Telemetry & Packet Visualizer background */}
      <SiemMonitor />

      {/* Dynamic Slideout System Alert Banner */}
      <AnimatePresence>
        {systemAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0d1527] border border-[#00f3ff]/40 text-[#00f3ff] font-mono text-[11px] py-2 px-4 rounded-md shadow-lg shadow-black/80 flex items-center space-x-2"
          >
            <span className="w-1.5 h-1.5 bg-[#00ff66] rounded-full animate-pulse"></span>
            <span>{systemAlert}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 z-10 space-y-8">
        
        {/* HEADER BRANDING BANNER */}
        <header className="border border-[#141b2d] bg-[#090d16]/95 p-5 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 backdrop-blur-md relative overflow-hidden">
          
          <div className="absolute top-2 right-2 flex items-center space-x-1.5 bg-[#0e1627] border border-[#1a233a] rounded py-0.5 px-2 font-mono text-[9px] text-[#00f3ff]">
            <span className="w-1.5 h-1.5 bg-[#00f3ff] rounded-full animate-pulse"></span>
            <span>SECURE SYSTEM INTERFACE</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative w-14 h-14 bg-gradient-to-br from-[#00f3ff]/20 to-[#00ff66]/10 border border-[#00f3ff]/40 rounded-lg flex items-center justify-center text-[#00f3ff] font-mono text-xl font-bold tracking-tighter shrink-0 select-none">
              NK
              {/* Corner indicators */}
              <div className="absolute -top-[2px] -left-[2px] w-2 h-2 border-t-2 border-l-2 border-[#00f3ff]"></div>
              <div className="absolute -bottom-[2px] -right-[2px] w-2 h-2 border-b-2 border-r-2 border-[#00f3ff]"></div>
            </div>
            
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2.5 space-y-1 sm:space-y-0">
                <h1 className="text-lg font-mono font-bold text-white tracking-tight">{personalInfo.name}</h1>
                <span className="inline-flex self-start sm:self-auto text-[9.5px]/none font-mono bg-[#00f3ff]/10 border border-[#00f3ff]/30 text-[#00f3ff] px-2 py-1 rounded select-all font-semibold tracking-wide">
                  niksec.me
                </span>
              </div>
              <p className="text-xs font-mono text-[#828fbd] mt-1.5 flex items-center gap-1">
                <ShieldCheck size={12} className="text-[#00f3ff]" />
                {personalInfo.title}
              </p>
            </div>
          </div>

          {/* Social Coordinates channels */}
          <div className="flex items-center space-x-2 self-stretch md:self-auto pt-2 md:pt-0 border-t border-[#141b2d] md:border-0 shrink-0 flex-wrap sm:flex-nowrap gap-1.5">
            <button 
              onClick={() => {
                triggerAlert('LOADING PRINT SUBSYSTEM: Select "Save as PDF" to download the high-fidelity CV');
                setTimeout(() => {
                  window.print();
                }, 800);
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3.5 py-1.5 bg-[#1b1c0c]/85 hover:bg-[#312b15] text-xs font-mono border border-[#443c1e] rounded text-yellow-500 hover:text-yellow-400 font-semibold transition-colors cursor-pointer"
              title="Export, download, or print this premium CV layout"
            >
              <Printer size={12} />
              <span>Export PDF / Print</span>
            </button>
            <a 
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-1 px-3.5 py-1.5 bg-[#0d1324] hover:bg-[#121c32] text-xs font-mono border border-[#1a2a47] rounded text-white transition-colors"
            >
              <Linkedin size={12} className="text-[#00f3ff]" />
              <span>LinkedIn</span>
              <ArrowUpRight size={10} className="opacity-50" />
            </a>
            <a 
              href={`mailto:${personalInfo.email}`}
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-3.5 py-1.5 bg-[#0e1d1d]/95 hover:bg-[#15312f] text-xs font-mono border border-[#1e4643] rounded text-[#00ff66] transition-colors"
            >
              <Mail size={12} />
              <span>Email</span>
            </a>
          </div>

        </header>

        {/* HERO DOSSIER BIOGRAPHY & DISPATCH COORDINATES */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Executive Overview dossier */}
          <div 
            onMouseEnter={() => {
              setIsBioHovered(true);
              if (!allDecrypted) {
                setAllDecrypted(true);
                triggerAlert('SYSTEM DECRYPTION LOCK DISENGAGED: UNRESTRICTED DOSSIER ACCESS GRANTED');
              }
            }}
            onMouseLeave={() => setIsBioHovered(false)}
            className="md:col-span-8 border border-[#141b2d] bg-[#080b11]/80 rounded-lg p-5 flex flex-col justify-between backdrop-blur-xs group transition-all hover:border-[#00f3ff]/30 cursor-help"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-[10px] text-[#55658e] tracking-wider uppercase border-b border-[#141b2d] pb-2">
                <span>[ dossier segment #01 — summary ]</span>
                <span className="text-[#00f3ff] animate-pulse group-hover:text-[#00ff66]">
                  {(isBioHovered || allDecrypted) ? '● DECRYPTED' : '⛑ HOVER TO DECRYPT'}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-300 font-sans min-h-[60px]">
                <DecryptText text={personalInfo.bio} isHovered={isBioHovered || allDecrypted} />
              </p>
            </div>
          </div>

          {/* Quick contact / coordinates widget */}
          <div className="md:col-span-4 border border-[#141b2d] bg-[#080b11]/80 rounded-lg p-5 flex flex-col justify-between backdrop-blur-xs font-mono text-xs">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] text-[#55658e] tracking-wider uppercase border-b border-[#141b2d] pb-2">
                <span>[ secure endpoints ]</span>
                <Wifi size={12} className="text-[#00ff66]" />
              </div>

              <div className="space-y-2 pt-1.5">
                <div className="flex items-center justify-between p-2 rounded bg-[#0d1324] border border-[#142137]">
                  <div className="flex items-center space-x-1.5 overflow-hidden">
                    <Mail size={12} className="text-[#00f3ff] shrink-0" />
                    <span className="text-[11px] truncate select-all font-mono text-[#c5cbd6]">{personalInfo.email}</span>
                  </div>
                  <button 
                    onClick={copyEmailToClipboard}
                    className="p-1 hover:bg-[#1a2a47] rounded text-[#828fbd] hover:text-[#00f3ff] transition-colors"
                    title="Copy primary email address"
                  >
                    <ClipboardCopy size={11} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#141b2d] space-y-1 text-center select-none">
              <div className="text-[10px] text-zinc-500 uppercase">VERIFIED SECURE RECORD</div>
              <div className="text-[11px] text-[#00ff66]">ISO/IEC 27001 AUDITING</div>
            </div>

          </div>

        </section>

        {/* COMBINED EXPLOIT SKILLSET & PROFESSIONAL EXPERIENCE METRIC */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* PROFESSIONAL TIMELINE/EXPERIENCE */}
          <div className="md:col-span-12 border border-[#141b2d] bg-[#080b11]/80 rounded-lg p-5 space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#141b2d] pb-2 font-mono">
              <div className="flex items-center space-x-2">
                <FolderDot size={14} className="text-[#00f3ff]" />
                <h3 className="text-xs uppercase font-bold text-white tracking-widest">[ EXPERT TENURE TIMELINE ]</h3>
              </div>
              <span className="text-[9px] text-zinc-500">Decrypt highlights by hovering single items</span>
            </div>

            <div className="relative border-l border-[#1b253b] ml-2 pl-4 space-y-7 pt-1">
              {experiences.map((exp) => {
                const isHovered = hoveredExperienceId === exp.id;
                return (
                  <div 
                    key={exp.id} 
                    onMouseEnter={() => {
                      setHoveredExperienceId(exp.id);
                      if (!allDecrypted) {
                        setAllDecrypted(true);
                        triggerAlert('SYSTEM DECRYPTION LOCK DISENGAGED: UNRESTRICTED DOSSIER ACCESS GRANTED');
                      }
                    }}
                    onMouseLeave={() => setHoveredExperienceId(null)}
                    className="relative group space-y-2 cursor-help"
                  >
                    {/* Decorative cyber timeline locator nodes */}
                    <div className="absolute -left-[22px] top-1 w-2.5 h-2.5 rounded-full border bg-[#07090e] border-[#00f3ff] group-hover:scale-125 transition-all">
                      <div className="absolute inset-0.5 rounded-full bg-[#00ff66] animate-ping opacity-65"></div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <div className="flex items-center space-x-2">
                        <Building size={12} className="text-[#828fbd]" />
                        <h4 className="text-sm font-sans font-bold text-white group-hover:text-[#00f3ff] transition-all">
                          {exp.company}
                        </h4>
                      </div>
                      <span className="font-mono text-[10px] text-[#828fbd] bg-[#0e1628] border border-[#162544] px-2 py-0.5 rounded self-start sm:self-auto select-none">
                        {exp.period}
                      </span>
                    </div>

                    <div className="font-mono text-[11px] text-[#00ff66] flex items-center space-x-1.5 pl-0.5">
                      <span className="w-1 h-3 bg-[#00ff66]/30 rounded"></span>
                      <span>{exp.role}</span>
                    </div>

                    <ul className="space-y-2 pl-1 pt-1">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start text-xs text-zinc-400 font-mono leading-relaxed transition-colors group-hover:text-zinc-200">
                          <ChevronRight size={13} className="text-zinc-600 shrink-0 mt-0.5" />
                          <DecryptText text={h} isHovered={isHovered || allDecrypted} />
                        </li>
                      ))}
                    </ul>

                  </div>
                );
              })}
            </div>

          </div>

        </section>

        {/* CYBER SKILLS MATRIX */}
        <section className="border border-[#141b2d] bg-[#080b11]/80 rounded-lg p-5 flex flex-col justify-between space-y-4">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-[#141b2d] pb-2 font-mono">
              <div className="flex items-center space-x-2">
                <Database size={14} className="text-[#00ff66]" />
                <h3 className="text-xs uppercase font-bold text-white tracking-widest">[ SECURITY SKILLS MATRIX ]</h3>
              </div>
              
              {/* Skill switches */}
              <select 
                value={selectedSkillCategory}
                onChange={(e) => setSelectedSkillCategory(e.target.value as any)}
                className="bg-[#0b101c] text-zinc-300 font-mono text-[9px] border border-[#162744] hover:border-[#00f3ff]/30 rounded px-1.5 py-0.5 focus:ring-0 cursor-pointer"
              >
                <option value="all">ALL SKILLS</option>
                <option value="grc">GRC ONLY</option>
                <option value="tech">NETWORK / SCRIPTING</option>
                <option value="tools">SECURITY TOOLS</option>
              </select>
            </div>

            {/* Professional competency capsules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {(() => {
                const filteredCats = skills.filter(sk => selectedSkillCategory === 'all' || sk.category === selectedSkillCategory);
                const sortedByRating = [...filteredCats].sort((a, b) => b.percentage - a.percentage);
                const displayed = showAllSkills ? sortedByRating : sortedByRating.slice(0, 6);
                
                return displayed.map((sk) => {
                  const isHovered = hoveredSkillName === sk.name;
                  let proficiency = "Specialist Core";
                  let statusColor = "text-[#00f3ff]";
                  let bgAccent = "bg-[#00f3ff]/5";
                  
                  if (sk.percentage >= 90) {
                    proficiency = "Expert Auditor";
                    statusColor = "text-[#00ff66]";
                    bgAccent = "bg-[#00ff66]/5";
                  } else if (sk.percentage >= 80) {
                    proficiency = "Advanced Specialist";
                    statusColor = "text-[#00f3ff]";
                    bgAccent = "bg-[#00f3ff]/5";
                  } else {
                    proficiency = "Proficient Operator";
                    statusColor = "text-amber-400";
                    bgAccent = "bg-amber-400/5";
                  }

                  const subIdx = sk.name.slice(0, 3).toUpperCase().replace(' ', '-');

                  return (
                    <div 
                      key={sk.name}
                      onMouseEnter={() => {
                        setHoveredSkillName(sk.name);
                        if (!allDecrypted) {
                          setAllDecrypted(true);
                          triggerAlert('SYSTEM DECRYPTION LOCK DISENGAGED: UNRESTRICTED DOSSIER ACCESS GRANTED');
                        }
                      }}
                      onMouseLeave={() => setHoveredSkillName(null)}
                      className="p-2.5 bg-[#05070a] border border-[#141b2d] hover:border-[#00f3ff]/40 rounded-md transition-all hover:bg-[#080d16]/80 group/skill relative overflow-hidden cursor-help"
                    >
                      <div className="absolute top-1.5 right-1.5 font-mono text-[7px] text-zinc-700 select-none group-hover/skill:text-zinc-500 transition-colors">
                        SEC-{subIdx}
                      </div>

                      <div className="space-y-1">
                        <div className="font-sans text-xs font-semibold text-white tracking-tight group-hover/skill:text-[#00f3ff] transition-colors truncate">
                          {sk.name}
                        </div>
                        
                        <div className="flex items-center justify-between font-mono text-[9px] pt-1">
                          <span className="text-zinc-500 capitalize flex items-center gap-1">
                            <span className={`w-1 h-1 rounded-full ${sk.category === 'grc' ? 'bg-[#00f3ff]' : (sk.category === 'tech' ? 'bg-[#00ff66]' : 'bg-amber-400')}`} />
                            {sk.category === 'grc' ? 'GRC / Governance' : sk.category === 'tech' ? 'Network' : 'Security Tool'}
                          </span>
                          
                          <span className={`font-semibold ${statusColor} px-1.5 py-0.5 rounded ${bgAccent} uppercase tracking-wider`}>
                            <DecryptText text={proficiency} isHovered={isHovered || allDecrypted} />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Expander control interface */}
            {(() => {
              const count = skills.filter(sk => selectedSkillCategory === 'all' || sk.category === selectedSkillCategory).length;
              if (count <= 6) return null;
              return (
                <div className="flex flex-col sm:flex-row justify-between items-center pt-2 gap-2">
                  <span className="font-mono text-[8px] text-[#55658e] uppercase tracking-wide">
                    {showAllSkills 
                      ? `[ STATUS: DECRYPTED ALL ${count} SKILLS ]` 
                      : `[ STATUS: SHOWING TOP 6 OF ${count} CORE SKILLS ]`
                    }
                  </span>
                  <button
                    onClick={() => {
                      setShowAllSkills(!showAllSkills);
                      triggerAlert(showAllSkills ? 'Skills database viewport consolidated.' : 'Full skills database decrypted and loaded.');
                    }}
                    className="w-full sm:w-auto px-4 py-1.5 bg-[#0a0f1d] hover:bg-[#111930] text-zinc-300 hover:text-[#00f3ff] text-[9px] font-mono border border-[#162744] hover:border-[#1e345e] rounded transition-all duration-200 cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${showAllSkills ? 'bg-[#00ff66]' : 'bg-[#00f3ff] animate-pulse'}`} />
                    <span>
                      {showAllSkills ? 'CONSOLIDATE VIEW' : `DECRYPT ALL ${count} CORES`}
                    </span>
                  </button>
                </div>
              );
            })()}
          </div>

          <div className="pt-3 border-t border-[#141b2d] flex justify-between font-mono text-[9px] text-zinc-500">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#00f3ff]" /> GRC Frameworks</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" /> Network/Code Solutions</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Administrative Tech</span>
          </div>

        </section>

        {/* VERIFIED KEY CERTIFICATIONS & ACADEMIC DOSSIER */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* SPECIALIST CERTIFICATIONS */}
          <div className="md:col-span-6 border border-[#141b2d] bg-[#080b11]/80 rounded-lg p-5 space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#141b2d] pb-2 font-mono">
              <div className="flex items-center space-x-2">
                <Award size={14} className="text-amber-400" />
                <h3 className="text-xs uppercase font-bold text-white tracking-widest">[ VERIFIED CERTIFICATIONS ]</h3>
              </div>
              <span className="text-[9px] text-[#00f3ff]">Hover to decrypt credentials</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1.5">
              {certifications.map((cert) => {
                const isHovered = hoveredCertId === cert.id;
                return (
                  <div 
                    key={cert.id}
                    onMouseEnter={() => {
                      setHoveredCertId(cert.id);
                      if (!allDecrypted) {
                        setAllDecrypted(true);
                        triggerAlert('SYSTEM DECRYPTION LOCK DISENGAGED: UNRESTRICTED DOSSIER ACCESS GRANTED');
                      }
                    }}
                    onMouseLeave={() => setHoveredCertId(null)}
                    className="bg-[#05070a] border border-[#141b2d]/60 hover:border-[#00f3ff]/40 p-3.5 rounded flex flex-col justify-between hover:scale-[1.01] transition-transform duration-200 group relative cursor-help"
                  >
                    <div className="absolute top-1.5 right-1.5 opacity-20 group-hover:opacity-75 transition-opacity">
                      <Lock size={10} className="text-[#00ff66]" />
                    </div>

                    <div className="space-y-2">
                      <span className="inline-block font-mono text-[9px] text-[#00f3ff] bg-[#00f3ff]/5 border border-[#00f3ff]/15 px-1.5 py-0.5 uppercase rounded tracking-wider">
                        {cert.issuer}
                      </span>
                      <h4 className="text-xs font-sans font-bold text-white tracking-tight leading-snug group-hover:text-[#00f3ff] transition-all">
                        {cert.name}
                      </h4>
                      <p className="text-[10px] text-zinc-500 leading-relaxed min-h-[44px]">
                        {cert.description && <DecryptText text={cert.description} isHovered={isHovered || allDecrypted} />}
                      </p>
                    </div>

                    <div className="mt-3.5 pt-2 border-t border-[#141b2d] flex justify-between items-center font-mono text-[9px]">
                      <span className="text-zinc-600">STATE: SECURE</span>
                      <span className="text-[#00ff66] font-bold">{cert.year}</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* ACADEMICS */}
          <div className="md:col-span-6 border border-[#141b2d] bg-[#080b11]/80 rounded-lg p-5 space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#141b2d] pb-2 font-mono">
              <div className="flex items-center space-x-2">
                <GraduationCap size={15} className="text-[#00f3ff]" />
                <h3 className="text-xs uppercase font-bold text-white tracking-widest">[ ACADEMIC LEDGER ]</h3>
              </div>
            </div>

            <div className="space-y-3.5 pt-1.5">
              {education.map((edu) => {
                const isHovered = hoveredEduDegree === edu.degree;
                return (
                  <div 
                    key={edu.degree} 
                    onMouseEnter={() => {
                      setHoveredEduDegree(edu.degree);
                      if (!allDecrypted) {
                        setAllDecrypted(true);
                        triggerAlert('SYSTEM DECRYPTION LOCK DISENGAGED: UNRESTRICTED DOSSIER ACCESS GRANTED');
                      }
                    }}
                    onMouseLeave={() => setHoveredEduDegree(null)}
                    className="p-3 bg-[#05070a] border border-[#141b2d]/50 hover:border-[#00f3ff]/30 rounded transition-colors relative group cursor-help"
                  >
                    <span className="font-mono text-[9px] text-[#828fbd] block mb-0.5">{edu.period}</span>
                    <h4 className="text-xs font-sans font-bold text-white leading-tight group-hover:text-[#00f3ff] transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="text-[10px] font-mono text-[#00ff66] mt-0.5">{edu.institution}</p>
                    <div className="text-[10px] text-zinc-500 mt-2 font-mono min-h-[30px] leading-relaxed">
                      {edu.details && <DecryptText text={edu.details} isHovered={isHovered || allDecrypted} />}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </section>

        {/* ADDITIONAL VERIFIED DOSSIERS & LANGUAGE ASSETS */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* GRC & SECURITY DETAILS */}
          <div className="md:col-span-8 border border-[#141b2d] bg-[#080b11]/80 rounded-lg p-5 space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#141b2d] pb-2 font-mono">
              <div className="flex items-center space-x-2">
                <ShieldCheck size={14} className="text-[#00ff66]" />
                <h3 className="text-xs uppercase font-bold text-white tracking-widest">[ SECURITY CLEARANCE & INTERNATIONAL POTENTIAL ]</h3>
              </div>
              <span className="text-[9px] text-[#00f3ff]">Hover to decrypt telemetry</span>
            </div>

            <div className="space-y-4 pt-1">
              <div 
                onMouseEnter={() => {
                  setIsClearanceHovered(true);
                  if (!allDecrypted) {
                    setAllDecrypted(true);
                    triggerAlert('SYSTEM DECRYPTION LOCK DISENGAGED: UNRESTRICTED DOSSIER ACCESS GRANTED');
                  }
                }}
                onMouseLeave={() => setIsClearanceHovered(false)}
                className="p-3.5 bg-[#05070a] border border-[#141b2d]/50 hover:border-[#00ff66]/30 rounded transition-colors relative group cursor-help"
              >
                <div className="text-[10px] font-mono text-[#00ff66] mb-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#00ff66] rounded-full animate-pulse"></span>
                  MILITARY SERVICE & ACTIVE DEPLOYMENT SECURITY POSTURE
                </div>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                  <DecryptText text={premiumDetails.clearance} isHovered={isClearanceHovered || allDecrypted} />
                </p>
              </div>

              <div 
                onMouseEnter={() => {
                  setIsInternationalHovered(true);
                  if (!allDecrypted) {
                    setAllDecrypted(true);
                    triggerAlert('SYSTEM DECRYPTION LOCK DISENGAGED: UNRESTRICTED DOSSIER ACCESS GRANTED');
                  }
                }}
                onMouseLeave={() => setIsInternationalHovered(false)}
                className="p-3.5 bg-[#05070a] border border-[#141b2d]/50 hover:border-[#00f3ff]/30 rounded transition-colors relative group cursor-help"
              >
                <div className="text-[10px] font-mono text-[#00f3ff] mb-1 flex items-center gap-1">
                  <Globe size={11} className="text-[#00f3ff]" />
                  INTERNATIONAL MULTICULTURAL ADAPTABILITY
                </div>
                <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                  <DecryptText text={premiumDetails.international} isHovered={isInternationalHovered || allDecrypted} />
                </p>
              </div>
            </div>

          </div>

          {/* LANGUAGE SKILLS LEDGER */}
          <div className="md:col-span-4 border border-[#141b2d] bg-[#080b11]/80 rounded-lg p-5 space-y-4">
            
            <div className="flex items-center justify-between border-b border-[#141b2d] pb-2 font-mono">
              <div className="flex items-center space-x-2">
                <Languages size={14} className="text-[#00f3ff]" />
                <h3 className="text-xs uppercase font-bold text-white tracking-widest">[ LANGUAGES ]</h3>
              </div>
            </div>

            <div className="space-y-3 pt-1.5">
              {personalInfo.languages.map((lang) => {
                const isHovered = hoveredLangName === lang.name;
                return (
                  <div 
                    key={lang.name} 
                    onMouseEnter={() => {
                      setHoveredLangName(lang.name);
                      if (!allDecrypted) {
                        setAllDecrypted(true);
                        triggerAlert('SYSTEM DECRYPTION LOCK DISENGAGED: UNRESTRICTED DOSSIER ACCESS GRANTED');
                      }
                    }}
                    onMouseLeave={() => setHoveredLangName(null)}
                    className="p-3 bg-[#05070a] border border-[#141b2d]/50 hover:border-[#00f3ff]/30 rounded transition-colors relative group cursor-help"
                  >
                    <h4 className="text-xs font-mono font-bold text-white leading-tight group-hover:text-[#00f3ff] transition-colors">
                      {lang.name}
                    </h4>
                    <p className="text-[10px] text-zinc-400 mt-1.5 font-sans leading-relaxed">
                      <DecryptText text={lang.level} isHovered={isHovered || allDecrypted} />
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </section>



      </div>

      {/* FOOTER METRICS */}
      <footer className="w-full border-t border-[#141b2d] bg-[#05070a] py-6 relative z-10 font-mono text-[10px] text-[#55658e]">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} niksec.me &bull; ISO/IEC 27001 ISMS Compliance Information
          </div>
          <div className="flex items-center space-x-1.5 justify-center">
            <span>Powered by</span>
            <span className="text-[#00f3ff]">React</span>
            <span>&</span>
            <span className="text-[#00ff66]">Tailwind v4</span>
          </div>
        </div>
      </footer>

    </div>

    {/* Printable high-fidelity plain CV */}
    <div className="hidden print:block bg-white text-slate-900 w-full min-h-screen p-0 m-0">
      <PrintableCv />
    </div>
  </>
  );
}

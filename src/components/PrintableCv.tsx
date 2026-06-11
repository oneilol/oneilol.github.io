import { Mail, Phone, MapPin, Globe, Award, Shield, Calendar } from 'lucide-react';
import { personalInfo, experiences, certifications, skills, education, premiumDetails } from '../data';

export default function PrintableCv() {
  return (
    <div className="bg-white text-slate-900 font-sans p-8 sm:p-12 max-w-[210mm] mx-auto min-h-[297mm] shadow-none select-text print:p-0">
      
      {/* HEADER SECTION */}
      <header className="border-b-2 border-slate-800 pb-5 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">{personalInfo.name}</h1>
            <p className="text-sm font-semibold tracking-wide text-slate-600 uppercase mt-1">
              {personalInfo.title}
            </p>
          </div>
          
          {/* Quick Stats/MetaData for Recruiter */}
          <div className="text-right font-mono text-[10px] text-slate-500 hidden md:block">
            <p>PORTFOLIO: https://niksec.me</p>
            <p>EXPORTED: {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* PERSONAL DETAILS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-5 pt-4 border-t border-slate-100 text-xs text-slate-700">
          <div className="flex items-center space-x-2">
            <Mail size={13} className="text-slate-500 shrink-0" />
            <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
          </div>
          <div className="flex items-center space-x-2">
            <Phone size={13} className="text-slate-500 shrink-0" />
            <span>+30 6940565224</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={13} className="text-slate-500 shrink-0" />
            <span>17is Noemvriou, Holargos, 15562, Athens</span>
          </div>
          <div className="flex items-center space-x-2">
            <Globe size={13} className="text-slate-500 shrink-0" />
            <a href="https://niksec.me" target="_blank" rel="noreferrer" className="hover:underline">https://niksec.me</a>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar size={13} className="text-slate-500 shrink-0" />
            <span>Birth: 10/06/1998 | Nationality: Greek</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield size={13} className="text-slate-500 shrink-0" />
            <span>ID: AO 329097 | Work Permit: Greece</span>
          </div>
        </div>
      </header>

      {/* TWO-COLUMN RESUME BODY */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: GRC & Technical Competencies */}
        <div className="md:col-span-4 space-y-6">
          
          {/* LANGAUGE SKILLS */}
          <section className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Language Skills
            </h3>
            <div className="text-xs space-y-1 text-slate-700">
              <p className="font-bold">Greek: <span className="font-normal text-slate-600">Mother Tongue</span></p>
              <div className="font-bold">
                <p>English: <span className="font-normal text-slate-600">C1 level (Professional)</span></p>
                <div className="text-[10px] text-slate-500 font-normal pl-2 mt-0.5 grid grid-cols-2 gap-x-1">
                  <span>• Listening: C1</span>
                  <span>• Reading: C1</span>
                  <span>• Speaking: C1</span>
                  <span>• Writing: C1</span>
                </div>
              </div>
            </div>
          </section>

          {/* GRC & COMPLIANCE */}
          <section className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Governance & GRC
            </h3>
            <ul className="text-xs space-y-1 text-slate-700 list-disc list-inside">
              {skills
                .filter(s => s.category === 'grc')
                .map(s => (
                  <li key={s.name} className="leading-snug">
                    {s.name}
                  </li>
                ))}
            </ul>
          </section>

          {/* SECURITY & CYBER DEFENSE */}
          <section className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Cyber Defense & Infra
            </h3>
            <ul className="text-xs space-y-1 text-slate-700 list-disc list-inside">
              {skills
                .filter(s => s.category === 'tech' && s.name !== 'Java & C Programming' && s.name !== 'SQL Database Management')
                .map(s => (
                  <li key={s.name} className="leading-snug">
                    {s.name}
                  </li>
                ))}
            </ul>
          </section>

          {/* PLATFORMS, TOOLS & PROGRAMMING */}
          <section className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Security Platforms & Dev
            </h3>
            <ul className="text-xs space-y-1 text-slate-700 list-disc list-inside">
              {skills
                .filter(s => s.category === 'tools')
                .map(s => (
                  <li key={s.name} className="leading-snug font-medium">
                    {s.name}
                  </li>
                ))}
              <li className="leading-snug text-slate-500 font-normal italic list-none pt-1">
                OS: Linux (Kali, Ubuntu), Windows (Client/Server)
              </li>
              <li className="leading-snug text-slate-500 font-normal italic list-none">
                Languages: Python, PowerShell, Java, C, SQL
              </li>
            </ul>
          </section>

        </div>

        {/* RIGHT COLUMN: PROFESSIONAL EXPERIENCE & ACADEMIC LEDGER */}
        <div className="md:col-span-8 space-y-6">
          
          {/* PROFESSIONAL SUMAMRY */}
          <section className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Professional Summary
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              {personalInfo.bio}
            </p>
          </section>

          {/* WORK EXPERIENCE */}
          <section className="space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Professional Experience
            </h3>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  
                  {/* Employer Header */}
                  <div className="flex justify-between items-start text-xs">
                    <div>
                      <span className="font-bold text-slate-900">{exp.role}</span>
                      <span className="text-slate-500 mx-1.5">|</span>
                      <span className="font-semibold text-slate-700">{exp.company}</span>
                    </div>
                    <span className="text-slate-500 font-mono text-[10px] whitespace-nowrap">{exp.period}</span>
                  </div>
                  
                  {/* Highlights Bullet List */}
                  <ul className="list-disc pl-4 text-slate-700 text-[11px] space-y-0.5 leading-relaxed text-justify">
                    {exp.highlights.map((hlt, idx) => (
                      <li key={idx}>
                        {hlt}
                      </li>
                    ))}
                  </ul>

                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION & TRAINING */}
          <section className="space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Education & Training
            </h3>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.degree} className="text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-slate-900">{edu.degree}</span>
                      <span className="text-slate-500 mx-1.5">|</span>
                      <span className="font-semibold text-slate-700">{edu.institution}</span>
                    </div>
                    <span className="text-slate-500 font-mono text-[10px] whitespace-nowrap">{edu.period}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 text-justify">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CERTIFICATIONS */}
          <section className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Professional Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {certifications.map((cert) => (
                <div key={cert.id} className="border border-slate-200 p-2.5 rounded bg-slate-50/50">
                  <span className="font-mono text-[9px] text-slate-500 block uppercase tracking-wider">
                    {cert.issuer}
                  </span>
                  <span className="font-bold text-slate-900 text-[11px] leading-tight block mt-0.5">
                    {cert.name}
                  </span>
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 pt-1 border-t border-slate-200/60">
                    <span>Active Credential</span>
                    <span className="font-semibold">{cert.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* MILITARY & ACCREDITATIONS SUMMARY */}
          <section className="space-y-2">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
              Additional Service & Clearances
            </h3>
            <div className="text-[11px] text-slate-700 space-y-1.5 leading-relaxed text-justify">
              <p>
                <strong className="text-slate-900 font-semibold">[International Clearance]</strong> {premiumDetails.international}
              </p>
              <p>
                <strong className="text-slate-900 font-semibold">[Military Posture]</strong> {premiumDetails.clearance}
              </p>
            </div>
          </section>

        </div>

      </div>

      {/* FOOTER METRIC ON PRINT */}
      <footer className="border-t border-slate-300 mt-10 pt-4 text-center font-mono text-[9px] text-slate-400">
        <p>Nikolaos Koukopoulos Resume &bull; Powered by React, Tailwind CSS, & Chromium Native Layouts</p>
      </footer>

    </div>
  );
}

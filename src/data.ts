import { Experience, Certification, Skill, Education } from './types';

export const personalInfo = {
  name: 'Nikolaos Koukopoulos',
  handle: '@nksec',
  title: 'IS GRC Consultant & Cyber Security Engineer',
  email: 'koukopoulos@outlook.com', // Primary email from official CV
  emailAlt: 'nikos10skate@gmail.com', // Backup/metadata email
  linkedinUrl: 'https://www.linkedin.com/in/nikolaos-koukopoulos-775378205/', // Verified official LinkedIn URL
  githubUrl: 'https://github.com/nksec',
  status: 'available',
  taglines: [],
  bio: 'Information Security GRC Consultant and Cyber Security Engineer with an MSc in Cybersecurity and Data Science. Experienced in enterprise risk management, implementing ISO/IEC 27001 ISMS frameworks, vulnerability management, and secure network architectures.',
  tools: [
    'Tenable One',
    'FortiGate',
    'Netwrix Auditor',
    'HCL AppScan',
    'SilverFort',
    'ManageEngine'
  ],
  languages: [
    { name: 'Greek', level: 'Mother tongue' },
    { name: 'English', level: 'Professional C1 (Listening, Reading, Speaking, Writing)' }
  ]
};

export const experiences: Experience[] = [
  {
    id: 'syntax',
    company: 'SYNTAX IT Group',
    role: 'IS GRC Consultant & Cyber Security Engineer',
    period: '15/08/2025 – Present',
    borderColor: '#3fb950', // green
    highlights: [
      'Implementing cybersecurity engineering practices, technical risk mitigation, and security patching across enterprise IT networks.',
      'Designing, auditing, and maintaining Information Security Management Systems (ISMS) in alignment with ISO/IEC 27001 controls.',
      'Performing vulnerability assessment reporting, patching workflows, and network remediation coordinates.',
      'Conducting gap analyses, compliance advisory, and risk governance reviews under NIS2 and GDPR directives.'
    ]
  },
  {
    id: 'haf',
    company: 'Hellenic Air Force (HAF)',
    role: 'NCO Sergeant',
    period: '15/05/2024 – 15/05/2025',
    borderColor: '#58a6ff', // blue
    highlights: [
      'Manage and maintain critical military data systems and servers.',
      'Monitor live servers and networks to ensure operational readiness.',
      'Perform system administration duties for secure military networks.',
      'Provide hardware service and maintenance for mission-critical equipment.',
      'Install and maintain network switches and rack infrastructure.',
      'Configure and troubleshoot network components ensuring secure communications.',
      'Deliver technical support for printing systems and peripherals.',
      'Apply cybersecurity protocols to protect sensitive military information.'
    ]
  },
  {
    id: 'euro_dynamics',
    company: 'EUROPEAN DYNAMICS',
    role: 'IT Tester / Support Officer',
    period: '01/04/2022 – 01/05/2024',
    borderColor: '#8250df', // purple
    highlights: [
      'Led software testing initiatives utilizing both manual and automated methodologies.',
      'Provided comprehensive user support through multiple communication channels.',
      'Coordinated with development teams to report and resolve technical issues.',
      'Developed detailed test reports and documentation for stakeholders.',
      'Delivered training sessions to optimize end-user system proficiency.',
      'Contributed to business analysis and requirements documentation.'
    ]
  },
  {
    id: 'plaisio',
    company: 'Plaisio',
    role: 'Sales Advisor',
    period: '01/02/2021 – 01/01/2022',
    borderColor: '#e14f6b', // orange-red
    highlights: [
      'Applied technical knowledge to match customer requirements with appropriate technology solutions.',
      'Advised customers on technology products and solutions.'
    ]
  }
];

export const certifications: Certification[] = [
  {
    id: 'iso27001_tuv',
    name: 'ISO/IEC 27001:2022 Lead Auditor',
    issuer: 'TÜV Austria Group',
    year: '25/05/2026',
    description: 'Expert certification demonstrating competence in auditing, implementation, and management of ISO 27001:2022 Information Security Management Systems.'
  },
  {
    id: 'bls_aed',
    name: 'Basic Life Support (BLS/AED)',
    issuer: 'GEP Academy / ERC',
    year: '30/04/2026',
    description: 'First response life-support and automated external defibrillator operation certification.'
  }
];

export const skills: Skill[] = [
  // GRC & Compliance
  { name: 'ISO/IEC 27001 ISMS', percentage: 95, category: 'grc' },
  { name: 'GDPR Compliance & vDPO', percentage: 90, category: 'grc' },
  { name: 'Risk Assessment & Management', percentage: 92, category: 'grc' },
  { name: 'Internal & Third-Party Audit', percentage: 88, category: 'grc' },
  { name: 'SOC2 Trust Principles', percentage: 85, category: 'grc' },
  { name: 'SIEM Core Concepts', percentage: 84, category: 'grc' },

  // Network / Code / Cyber Defense (tech)
  { name: 'Network Security Architecture', percentage: 91, category: 'tech' },
  { name: 'Threat Analysis & Threat Hunting', percentage: 87, category: 'tech' },
  { name: 'Vulnerability Management & Patching', percentage: 93, category: 'tech' },
  { name: 'Incident Response & Mitigation', percentage: 86, category: 'tech' },
  { name: 'Security Accreditation Frameworks', percentage: 89, category: 'tech' },
  { name: 'Firewalls, VPN, VLAN, TCP/IP', percentage: 92, category: 'tech' },
  { name: 'Windows & Linux (Kali, Ubuntu)', percentage: 88, category: 'tech' },
  { name: 'Active Directory & Windows Server', percentage: 85, category: 'tech' },
  { name: 'SQL Database Management', percentage: 82, category: 'tech' },
  { name: 'PowerShell / Python Scripting', percentage: 84, category: 'tech' },
  { name: 'Java & C Programming', percentage: 76, category: 'tech' },

  // Tools & Platforms
  { name: 'Tenable One Exposure Management', percentage: 94, category: 'tools' },
  { name: 'Fortinet FortiGate NGFW', percentage: 92, category: 'tools' },
  { name: 'Netwrix Auditor Integrity Monitoring', percentage: 87, category: 'tools' },
  { name: 'HCL AppScan Security Profiler', percentage: 85, category: 'tools' },
  { name: 'SilverFort Unified Identity Protection', percentage: 88, category: 'tools' },
  { name: 'ManageEngine SysAdmin & MDM', percentage: 89, category: 'tools' }
];

export const education: Education[] = [
  {
    degree: 'MSc in Cybersecurity and Data Science',
    institution: 'University of Piraeus',
    period: '01/10/2024 – Current',
    details: 'Expected graduation: 2026. EQF Level: 7. Completed all mandatory coursework. Finalising Master\'s thesis. Website: https://cybersecdatasci.cs.unipi.gr/'
  },
  {
    degree: 'BSc in Computer Science and Telecommunications',
    institution: 'University of Thessaly',
    period: '01/09/2016 – 01/04/2022',
    details: 'EQF Level: 6. Comprehensive curriculum covering computer networks, operating systems, software testing and databases. Website: https://dit.uth.gr/'
  }
];

export const premiumDetails = {
  international: '2+ years working for clients and environments in Northern Ireland, UK. Highly experienced with operating comfortably in diverse, multicultural, international professional environments.',
  clearance: 'Completed NCO service at the Hellenic Air Force Computerisation Centre (KMH/GEA), holding military security clearance for access to highly classified defense IT infrastructure. Received standard military weapons handling training. Operated securely within military defense environments protecting critical network communication systems and data assets.'
};


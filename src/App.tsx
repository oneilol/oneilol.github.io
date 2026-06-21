import { useState } from 'react';
import Draft1App from './components/Draft1App';
import PrintableCv from './components/PrintableCv';

export default function App() {
  return (
    <>
      {/* RENDER CHOSEN PORTFOLIO PROFILE */}
      <div className="print:hidden">
        <Draft1App />
      </div>

      {/* ALWAYS ACTIVE PRINT STYLESHEET EXCLUSIVELY FOR CV PACKET DOWNLOAD */}
      <div className="hidden print:block bg-white text-slate-900 w-full min-h-screen p-0 m-0">
        <PrintableCv />
      </div>
    </>
  );
}


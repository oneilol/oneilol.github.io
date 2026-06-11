import { useState, useEffect } from 'react';

interface NetworkNode {
  id: string;
  name: string;
  x: number; // percent left
  y: number; // percent top
  color: string;
  labelAlign: 'top' | 'bottom' | 'left' | 'right';
}

interface MovingPacket {
  id: string;
  path: 'horizontal' | 'diagonal' | 'mesh';
  x: number; // current x %
  y: number; // current y %
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number; // 0 to 100
  speed: number;
  protocol: 'TCP' | 'UDP' | 'TLS/SSL' | 'HTTPS' | 'SSH' | 'IPsec';
  status: 'allowed' | 'inspecting' | 'verified' | 'mitigated' | 'grc_check';
  size: number;
}

interface InspectionLog {
  id: string;
  text: string;
  x: number;
  y: number;
  opacity: number;
  color: string;
}

export default function SiemMonitor() {
  const [packets, setPackets] = useState<MovingPacket[]>([]);
  const [logs, setLogs] = useState<InspectionLog[]>([]);

  // 1. Static Cyber Node Network Infrastructure Map
  const nodes: NetworkNode[] = [
    { id: 'gate', name: 'FortiGate NGFW Gateway', x: 15, y: 35, color: '#00f3ff', labelAlign: 'top' },
    { id: 'mfa', name: 'SilverFort Identity Enclave', x: 45, y: 20, color: '#38bdf8', labelAlign: 'left' },
    { id: 'vuln', name: 'Tenable One Exposure Hub', x: 80, y: 25, color: '#10b981', labelAlign: 'bottom' },
    { id: 'active_dir', name: 'Active Directory Domain', x: 25, y: 75, color: '#f59e0b', labelAlign: 'bottom' },
    { id: 'siem_proc', name: 'SYNTAX Compliance SIEM', x: 55, y: 65, color: '#00ff66', labelAlign: 'top' },
    { id: 'haf_crypto', name: 'HAF Classified Cryptography Cluster', x: 85, y: 70, color: '#a855f7', labelAlign: 'top' },
  ];

  // 2. Predefined high-speed network connections
  const trunkLines = [
    { from: 'gate', to: 'mfa' },
    { from: 'mfa', to: 'vuln' },
    { from: 'gate', to: 'active_dir' },
    { from: 'active_dir', to: 'siem_proc' },
    { from: 'siem_proc', to: 'vuln' },
    { from: 'siem_proc', to: 'haf_crypto' },
    { from: 'vuln', to: 'haf_crypto' },
  ];

  // Create random inspection log at coordinate point
  const triggerVisualLog = (text: string, x: number, y: number, color: string = '#00f3ff') => {
    const newLog: InspectionLog = {
      id: Math.random().toString(),
      text,
      x: x + (Math.random() * 4 - 2),
      y: y - 3,
      opacity: 1,
      color
    };
    setLogs((prev) => [...prev, newLog].slice(-8)); // Keep maximum 8 floating logs for performance
  };

  // 3. Spawns unique cybersecurity events and packets
  useEffect(() => {
    // Continuous packet spawner
    const spawner = setInterval(() => {
      const runType = Math.random();
      let newPacket: MovingPacket;

      const protocols: MovingPacket['protocol'][] = ['TCP', 'UDP', 'TLS/SSL', 'HTTPS', 'SSH', 'IPsec'];
      const currentProto = protocols[Math.floor(Math.random() * protocols.length)];

      if (runType < 0.35) {
        // A. Horizontal trans-segment packets (cross-screen)
        const startY = 10 + Math.random() * 80;
        newPacket = {
          id: Math.random().toString(),
          path: 'horizontal',
          x: 0,
          y: startY,
          startX: 0,
          startY,
          endX: 100,
          endY: startY,
          progress: 0,
          speed: 0.6 + Math.random() * 0.9,
          protocol: currentProto,
          status: 'allowed',
          size: 3 + Math.random() * 3
        };
      } else if (runType < 0.7) {
        // B. Mesh Segment Hopping (Node to Node travel)
        const line = trunkLines[Math.floor(Math.random() * trunkLines.length)];
        const fromNode = nodes.find(n => n.id === line.from)!;
        const toNode = nodes.find(n => n.id === line.to)!;

        // Randomize direction
        const swap = Math.random() > 0.5;
        const start = swap ? fromNode : toNode;
        const end = swap ? toNode : fromNode;

        newPacket = {
          id: Math.random().toString(),
          path: 'mesh',
          x: start.x,
          y: start.y,
          startX: start.x,
          startY: start.y,
          endX: end.x,
          endY: end.y,
          progress: 0,
          speed: 1.2 + Math.random() * 1.5,
          protocol: currentProto,
          status: 'grc_check',
          size: 3.5 + Math.random() * 2.5
        };
      } else {
        // C. Diagonal perimeter scan packet
        const onLeft = Math.random() > 0.5;
        newPacket = {
          id: Math.random().toString(),
          path: 'diagonal',
          x: onLeft ? 0 : 100,
          y: Math.random() * 40,
          startX: onLeft ? 0 : 100,
          startY: Math.random() * 40,
          endX: onLeft ? 100 : 0,
          endY: 60 + Math.random() * 40,
          progress: 0,
          speed: 0.8 + Math.random() * 1.2,
          protocol: currentProto,
          status: 'inspecting',
          size: 4
        };
      }

      setPackets((prev) => [...prev, newPacket].slice(-45)); // limit total active packet elements
    }, 900);

    return () => clearInterval(spawner);
  }, []);

  // 4. Handles background packet mechanics, boundary collision, and security triggers
  useEffect(() => {
    const animationLoop = setInterval(() => {
      setPackets((prev) => {
        return prev
          .map((pkt) => {
            const nextProgress = pkt.progress + pkt.speed;
            
            // Calculate current interpolated position
            const rad = nextProgress / 100;
            const currentX = pkt.startX + (pkt.endX - pkt.startX) * rad;
            const currentY = pkt.startY + (pkt.endY - pkt.startY) * rad;

            // Trigger visual checkpoints alerts as packets intercept firewall barriers
            // Inspection center gate: boundary at roughly X=60%
            const wasJustInspected = pkt.progress < 57 && nextProgress >= 57;
            if (wasJustInspected) {
              const auditVerdicts = [
                `[FORTIGATE_NGFW: ALLOWED_${pkt.protocol}_PACKET]`,
                `[SIEM: CORRELATED_EVENT]`,
                `[TENABLE: RISK_SCORE_A+]`,
                `[SILVERFORT: MFA_PASS]`,
                `[NIS2 Compliance: OK]`,
                `[ISO27001_A.12: APPROVED]`
              ];
              const verdict = auditVerdicts[Math.floor(Math.random() * auditVerdicts.length)];
              const color = pkt.protocol === 'SSH' ? '#f59e0b' : '#00ff66';
              triggerVisualLog(verdict, currentX, currentY, color);
              pkt.status = 'verified';
            }

            // Boundary alert on suspicious protocol headers
            if (pkt.protocol === 'SSH' && pkt.progress < 25 && nextProgress >= 25) {
              triggerVisualLog(`[IDS ALERT: DECRYPTING SSH SESSION]`, currentX, currentY, '#00f3ff');
              pkt.status = 'inspecting';
            }

            return {
              ...pkt,
              progress: nextProgress,
              x: currentX,
              y: currentY
            };
          })
          .filter((pkt) => pkt.progress <= 100);
      });

      // Gradually fade out floating inspection telemetry overlays
      setLogs((prev) => {
        return prev
          .map((l) => ({ ...l, y: l.y - 0.08, opacity: l.opacity - 0.015 }))
          .filter((l) => l.opacity > 0);
      });

    }, 35);

    return () => clearInterval(animationLoop);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#03060a]/20 select-none">
      
      {/* Dynamic scan line sweep */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#00ff66]/10 animate-pulse" style={{
        animation: 'scan-vertical 8s linear infinite',
      }}></div>

      {/* Full scale vector grid connections SVG */}
      <svg className="w-full h-full opacity-60">
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cyberTrunk" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#141b2d" />
            <stop offset="50%" stopColor="#00f3ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#141b2d" />
          </linearGradient>
        </defs>

        {/* Draw Subnet Trunks */}
        {trunkLines.map((line, idx) => {
          const fromNode = nodes.find(n => n.id === line.from)!;
          const toNode = nodes.find(n => n.id === line.to)!;
          return (
            <g key={`trunk-${idx}`}>
              <line
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke="url(#cyberTrunk)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
              <circle
                cx={`${(fromNode.x + toNode.x) / 2}%`}
                cy={`${(fromNode.y + toNode.y) / 2}%`}
                r="1.5"
                fill="#00ff66"
                opacity="0.3"
              />
            </g>
          );
        })}

        {/* Draw Central Inspection Wall */}
        <line
          x1="60%"
          y1="0%"
          x2="60%"
          y2="100%"
          stroke="#00ff66"
          strokeWidth="1.5"
          strokeOpacity="0.15"
          strokeDasharray="8 4"
        />

        {/* Draw Active Security Node Interfaces */}
        {nodes.map((node) => {
          const isLighthouse = node.id === 'siem_proc' || node.id === 'gate';
          return (
            <g key={node.id}>
              {/* Node glow range */}
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={isLighthouse ? "22" : "15"}
                fill="url(#nodeGlow)"
              />
              
              {/* Active hardware circle point */}
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="4.5"
                fill={node.color}
                className={isLighthouse ? "animate-pulse" : ""}
              />
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r="8"
                fill="none"
                stroke={node.color}
                strokeWidth="0.8"
                strokeOpacity="0.5"
                className="animate-[ping_3s_infinite]"
              />

              {/* Secure Label Code metrics overlay */}
              <text
                x={`${node.x}%`}
                y={`${node.y + (node.labelAlign === 'top' ? -3 : 4)}%`}
                fill="#828fbd"
                fontSize="7"
                fontFamily="monospace"
                opacity="0.45"
                textAnchor="middle"
              >
                {node.name}
              </text>
            </g>
          );
        })}

        {/* Render Moving Packets */}
        {packets.map((pkt) => {
          // Compute color scheme based on protocol integrity and speed
          let mainColor = '#00f3ff';
          if (pkt.protocol === 'SSH') mainColor = '#f59e0b'; // Amber warn warning
          if (pkt.protocol === 'IPsec') mainColor = '#a855f7'; // Purple Cryptographic Secure
          if (pkt.protocol === 'HTTPS') mainColor = '#00ff66'; // Emerald verify

          return (
            <g key={pkt.id}>
              {/* Backglow trail */}
              <circle
                cx={`${pkt.x}%`}
                cy={`${pkt.y}%`}
                r={pkt.size + 4}
                fill={mainColor}
                opacity={0.06}
              />

              {/* Main signal node packet */}
              <circle
                cx={`${pkt.x}%`}
                cy={`${pkt.y}%`}
                r={pkt.size}
                fill={mainColor}
                opacity={0.9}
              />

              {/* Custom dynamic connection line */}
              <line
                x1={`${pkt.x - (pkt.startX < pkt.endX ? 1.5 : -1.5)}%`}
                y1={`${pkt.y}%`}
                x2={`${pkt.x}%`}
                y2={`${pkt.y}%`}
                stroke={mainColor}
                strokeWidth="1.5"
                opacity="0.4"
              />

              {/* Tiny protocol decoder tag */}
              {pkt.progress > 8 && pkt.progress < 92 && (
                <text
                  x={`${pkt.x}%`}
                  y={`${pkt.y - 1.8}%`}
                  fill={mainColor}
                  fontSize="7.5"
                  fontFamily="monospace"
                  opacity="0.6"
                  textAnchor="middle"
                >
                  {pkt.protocol}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Floating Checkpoint Telemetry Overlays inside HTML Space for Crisp Render */}
      <div className="absolute inset-0 z-10 select-none pointer-events-none">
        {logs.map((log) => (
          <div
            key={log.id}
            className="absolute font-mono text-[8px] px-2 py-0.5 rounded border border-white/5 bg-black/85 backdrop-blur-sm transition-opacity duration-150"
            style={{
              left: `${log.x}%`,
              top: `${log.y}%`,
              color: log.color,
              opacity: log.opacity,
              borderColor: `${log.color}1e`,
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 2px 8px -3px ${log.color}25`
            }}
          >
            {log.text}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scan-vertical {
          0% { transform: translateY(0); opacity: 0.1; }
          45% { opacity: 0.25; }
          50% { transform: translateY(100vh); opacity: 0.05; }
          50.1% { transform: translateY(0); opacity: 0.01; }
          100% { transform: translateY(0); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}

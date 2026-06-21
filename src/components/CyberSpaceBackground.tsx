import { useEffect, useRef } from 'react';

interface RainColumn {
  x: number;
  y: number;
  speed: number;
  fontSize: number;
  chars: string[];
  opacity: number;
  glow: boolean;
}

export default function CyberSpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // A collection of pristine digital terminal characters:
    // Binary, hex values, cmd brackets, and cyber glyphs
    const charPool = '0123456789ABCDEF[{}]/\\_+-*=>$%#@!&▲▼'.split('');

    // Dense grid column spacing depending on font sizes (typically 12px to 20px)
    let columns: RainColumn[] = [];
    const minFontSize = 11;
    const maxFontSize = 18;

    const initColumns = () => {
      columns = [];
      const colWidth = 16; // column step size
      const colCount = Math.ceil(width / colWidth) + 2;

      for (let i = 0; i < colCount; i++) {
        const fontSize = Math.floor(Math.random() * (maxFontSize - minFontSize + 1)) + minFontSize;
        const speed = (Math.random() * 2.5 + 1.2) * (fontSize / maxFontSize); // larger text falls faster for 3D depth

        // Fill column string buffer with pre-randomized characters to save memory allocation
        const chars: string[] = [];
        const length = Math.floor(Math.random() * 25) + 12;
        for (let j = 0; j < length; j++) {
          chars.push(charPool[Math.floor(Math.random() * charPool.length)]);
        }

        columns.push({
          x: i * colWidth,
          y: Math.random() * -height - 100, // staggered start offsets
          speed,
          fontSize,
          chars,
          opacity: Math.random() * 0.55 + 0.35,
          glow: Math.random() > 0.65
        });
      }
    };

    initColumns();

    // Responsive window resizing with proper debounce/re-init
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width || window.innerWidth;
        height = canvas.height = entry.contentRect.height || window.innerHeight;
        initColumns();
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    let frameId: number;
    let tick = 0;

    const drawMatrixRain = () => {
      tick++;

      // Pure pitch-black command line background
      ctx.fillStyle = 'rgba(2, 2, 4, 1)';
      ctx.fillRect(0, 0, width, height);

      // Render column indicators and digital codes
      columns.forEach((col) => {
        const length = col.chars.length;

        for (let i = 0; i < length; i++) {
          const charY = col.y - i * col.fontSize;

          // Skip drawing if the slice is completely off-screen
          if (charY < -30 || charY > height + 30) continue;

          // Slowly mutate characters randomly to evoke real-time active computer decoding
          if (tick % 6 === 0 && Math.random() > 0.88) {
            col.chars[i] = charPool[Math.floor(Math.random() * charPool.length)];
          }

          // Compute gradients: head of the stream is ultra-bright glowing white/purple
          // and fades away towards the tail of the ribbon.
          const fraction = (length - i) / length; // 1 at lead, near 0 at tail
          let alpha = fraction * col.opacity;

          // Draw the absolute head / leading character of the falling stream in neon highlight
          if (i === 0) {
            ctx.fillStyle = '#ffffff'; // blazing phosphor core leader
            ctx.shadowBlur = col.glow ? 12 : 0;
            ctx.shadowColor = 'rgba(168, 85, 247, 0.8)';
          } else {
            // trailing decay states
            ctx.shadowBlur = 0;
            // Bi-chromatic matrix theme: vibrant violet fading into deep digital neon indigo
            const r = Math.floor(139 - (139 - 88) * (1 - fraction));
            const g = Math.floor(92 - (92 - 28) * (1 - fraction));
            const b = Math.floor(246 - (246 - 135) * (1 - fraction));
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          }

          ctx.font = `bold ${col.fontSize}px "JetBrains Mono", "Fira Code", monospace`;
          ctx.fillText(col.chars[i], col.x, charY);
        }

        // Apply constant velocity vertical flow
        col.y += col.speed;

        // Reset column to the top once its entire ribbon is past the fold
        if (col.y - length * col.fontSize > height) {
          col.y = -Math.random() * 250;
          col.speed = (Math.random() * 2.5 + 1.2) * (col.fontSize / maxFontSize);
          col.opacity = Math.random() * 0.55 + 0.35;
        }
      });

      // Clear shadows configuration to preserve performance of other rendering elements
      ctx.shadowBlur = 0;

      // Draw faint, authentic retro scanline scan pattern overlays
      ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1.5);
      }

      // Draw extremely subtle digital terminal guidelines overlay
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      // vertical grid line markers
      for (let x = 0; x < width; x += 150) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      ctx.stroke();

      frameId = requestAnimationFrame(drawMatrixRain);
    };

    drawMatrixRain();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#020204]"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full block opacity-85 transition-opacity duration-1000" 
      />
      {/* Soft dark corner vignette filter to emulate retro CRT terminals */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_50%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />
    </div>
  );
}

import React from 'react';

export const BackgroundPatterns = {
  dots: "bg-[radial-gradient(circle,_#00000012_1px,_transparent_1px)] bg-[length:24px_24px]",
  grid: "bg-[linear-gradient(to_right,_#80808012_1px,_transparent_1px),_linear-gradient(to_bottom,_#80808012_1px,_transparent_1px)] bg-[length:24px_24px]",
  diagonal: "bg-[repeating-linear-gradient(45deg,_transparent,_transparent_10px,_#00000005_10px,_#00000005_20px)]",
  waves: "bg-[radial-gradient(ellipse_at_top,_#00000008,_transparent_50%)]",
  mesh: "bg-[radial-gradient(at_40%_20%,_hsla(28,100%,74%,0.1)_0px,_transparent_50%),_radial-gradient(at_80%_0%,_hsla(189,100%,56%,0.1)_0px,_transparent_50%),_radial-gradient(at_0%_50%,_hsla(355,100%,93%,0.1)_0px,_transparent_50%)]",
} as const;

interface PatternBackgroundProps {
  pattern: keyof typeof BackgroundPatterns;
  className?: string;
  children: React.ReactNode;
}

export const PatternBackground: React.FC<PatternBackgroundProps> = ({ 
  pattern, 
  className = '', 
  children 
}) => {
  return (
    <div className={`${BackgroundPatterns[pattern]} ${className}`}>
      {children}
    </div>
  );
};

// Individual pattern components for easier use
export const DotsPattern: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => (
  <PatternBackground pattern="dots" className={className}>
    {children}
  </PatternBackground>
);

export const GridPattern: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => (
  <PatternBackground pattern="grid" className={className}>
    {children}
  </PatternBackground>
);

export const DiagonalPattern: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => (
  <PatternBackground pattern="diagonal" className={className}>
    {children}
  </PatternBackground>
);

export const WavesPattern: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => (
  <PatternBackground pattern="waves" className={className}>
    {children}
  </PatternBackground>
);

export const MeshPattern: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => (
  <PatternBackground pattern="mesh" className={className}>
    {children}
  </PatternBackground>
);

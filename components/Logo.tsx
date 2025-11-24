import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-lg font-semibold tracking-wide">回声思维</span>
      <span className="text-xs text-muted tracking-wider">EchoMind</span>
    </div>
  );
}

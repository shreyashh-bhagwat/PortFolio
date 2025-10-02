import { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [stage, setStage] = useState<'launch' | 'explode' | 'zoom' | 'complete'>('launch');

  useEffect(() => {
    // Prevent body scroll while loading
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';

    // Launch stage - firework shoots up (1s)
    const launchTimer = setTimeout(() => {
      setStage('explode');
    }, 1000);

    // Explode stage - black and white explosion (1s)
    const explodeTimer = setTimeout(() => {
      setStage('zoom');
    }, 2000);

    // Zoom stage - instant smooth transition (0.5s)
    const zoomTimer = setTimeout(() => {
      setStage('complete');
    }, 2500);

    // Complete - trigger callback with smooth fade
    const completeTimer = setTimeout(() => {
      onLoadComplete();
      // Re-enable body scroll after loading
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }, 2250);

    return () => {
      clearTimeout(launchTimer);
      clearTimeout(explodeTimer);
      clearTimeout(zoomTimer);
      clearTimeout(completeTimer);
      // Cleanup: Re-enable body scroll if component unmounts
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [onLoadComplete]);

  return (
    <div className={`loading-screen ${stage === 'zoom' ? 'zooming' : ''} ${stage === 'complete' ? 'fade-out' : ''}`}>
      {/* Firework */}
      <div className={`firework-container ${stage === 'launch' ? 'launching' : ''} ${stage === 'explode' ? 'exploded' : ''}`}>
        {/* Firework trail */}
        {stage === 'launch' && (
          <div className="firework-trail">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="trail-particle"
                style={{
                  animationDelay: `${i * 0.04}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Firework core - only show during launch */}
        {stage === 'launch' && <div className="firework-core"></div>}

        {/* Explosion particles */}
        {stage === 'explode' && (
          <>
            {/* Main burst particles - OPTIMIZED FOR PERFORMANCE */}
            {[...Array(100)].map((_, i) => {
              const angle = (i / 100) * 360;
              const speed = 1.6 + Math.random() * 0.9;
              // Bright white and silver colors for maximum brightness
              const colors = ['#ffffff', '#f8f8f8', '#f0f0f0', '#e8e8e8', '#e0e0e0', '#d8d8d8'];
              const color = colors[i % colors.length];
              
              return (
                <div
                  key={i}
                  className="explosion-particle"
                  style={{
                    '--angle': `${angle}deg`,
                    '--speed': speed,
                    '--color': color,
                    animationDelay: `${Math.random() * 0.03}s`,
                  } as React.CSSProperties}
                />
              );
            })}

            {/* Secondary sparkles - OPTIMIZED FOR PERFORMANCE */}
            {[...Array(80)].map((_, i) => {
              const angle = (i / 80) * 360 + 9;
              // Bright white sparkles for maximum brilliance
              const colors = ['#ffffff', '#fafafa', '#f5f5f5', '#f0f0f0'];
              const color = colors[i % colors.length];
              
              return (
                <div
                  key={`sparkle-${i}`}
                  className="sparkle-particle"
                  style={{
                    '--angle': `${angle}deg`,
                    '--color': color,
                    animationDelay: `${0.02 + Math.random() * 0.06}s`,
                  } as React.CSSProperties}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;

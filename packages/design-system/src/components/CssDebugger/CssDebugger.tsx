import React from 'react';

const CssDebugger = () => {
  React.useEffect(() => {
    window.addEventListener('load', handleRefresh);

    return () => {
      window.removeEventListener('load', handleRefresh);
    };
  }, []);

  const handleRefresh = () => {
    if (process.env.NODE_ENV !== 'production') {
      document.documentElement.style.setProperty('--debugger', 'true');
    }
  };

  return null;
};

export default CssDebugger;

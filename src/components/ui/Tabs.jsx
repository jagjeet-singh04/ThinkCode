import React from 'react';

export function Tabs({ value, onValueChange, className = '', children }) {
  return (
    <div className={`tabs-root ${className}`}>{
      React.Children.map(children, child => {
        if (!child) return null;
        // Inject value and onValueChange to TabsList
        if (child.type && child.type.displayName === 'TabsList') {
          return React.cloneElement(child, { value, onValueChange });
        }
        return child;
      })
    }</div>
  );
}

export function TabsList({ value, onValueChange, children, className = '' }) {
  return (
    <div className={`tabs-list ${className}`}>{
      React.Children.map(children, child => {
        if (!child) return null;
        // Inject value and onValueChange to TabsTrigger
        if (child.type && child.type.displayName === 'TabsTrigger') {
          return React.cloneElement(child, { activeValue: value, onValueChange });
        }
        return child;
      })
    }</div>
  );
}
TabsList.displayName = 'TabsList';

export function TabsTrigger({ value, activeValue, onValueChange, children, className = '' }) {
  const isActive = value === activeValue;
  return (
    <button
      className={`tabs-trigger ${isActive ? 'active' : ''} ${className}`}
      onClick={() => onValueChange && onValueChange(value)}
      type="button"
    >
      {children}
    </button>
  );
}
TabsTrigger.displayName = 'TabsTrigger';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Code, Target, Shuffle, Clock, ChevronRight } from 'lucide-react';

const Sidebar = ({ onModeSelect, currentMode }) => {
  const modes = [
    {
      id: 'topic-difficulty',
      name: 'Practice Mode',
      icon: <Target className="w-4 h-4" />,
      description: 'Choose topic & difficulty'
    },
    {
      id: 'random-topic',
      name: 'Random Practice',
      icon: <Shuffle className="w-4 h-4" />,
      description: 'Random questions'
    },
    {
      id: 'test',
      name: 'Test Mode',
      icon: <Clock className="w-4 h-4" />,
      description: 'Timed challenges'
    }
  ];

  return (
    <div className="w-80 bg-background border-r border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Code className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">ThinkCode</h2>
            <p className="text-xs text-muted-foreground">Practice Platform</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        {/* Modes Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Practice Modes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {modes.map((mode) => (
              <motion.div key={mode.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={currentMode === mode.id ? "default" : "ghost"}
                  className={`w-full justify-start h-auto p-3 ${
                    currentMode === mode.id ? 'shadow-sm' : ''
                  }`}
                  onClick={() => onModeSelect(mode.id)}
                >
                  <div className="flex items-center space-x-3">
                    {mode.icon}
                    <div className="text-left">
                      <div className="font-medium text-sm">{mode.name}</div>
                      <div className="text-xs text-muted-foreground">{mode.description}</div>
                    </div>
                  </div>
                  {currentMode === mode.id && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </Button>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sidebar;
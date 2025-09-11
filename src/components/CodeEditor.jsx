import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Editor from '@monaco-editor/react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Card, CardContent, CardHeader } from './ui/Card';
import { Code, Settings, Play } from 'lucide-react';

const LANGUAGE_OPTIONS = [
  { label: 'JavaScript', value: 'javascript', icon: '🟨' },
  { label: 'Python', value: 'python', icon: '🐍' },
  { label: 'C++', value: 'cpp', icon: '⚡' },
  { label: 'Java', value: 'java', icon: '☕' },
];

export const DEFAULT_TEMPLATES = {
  javascript: `function solve(input) {
    // Your solution here
    
    return result;
}

// Example usage:
// console.log(solve("your input"));`,
  
  python: `def solve(input):
    """
    Your solution here
    """
    
    return result

# Example usage:
# print(solve("your input"))`,
  
  cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

string solve(string input) {
    // Your solution here
    
    return result;
}

int main() {
    // Example usage:
    // cout << solve("your input") << endl;
    return 0;
}`,
  
  java: `import java.util.*;

public class Solution {
    public static String solve(String input) {
        // Your solution here
        
        return result;
    }
    
    public static void main(String[] args) {
        // Example usage:
        // System.out.println(solve("your input"));
    }
}`
};

const CodeEditor = ({ code, onCodeChange, language = 'javascript', setLanguage }) => {
  // Prop validation
  if (typeof setLanguage !== 'function') {
    console.error('setLanguage must be a function');
    return <div className="p-4 text-red-500">Error: setLanguage prop must be a function</div>;
  }

  if (typeof onCodeChange !== 'function') {
    console.error('onCodeChange must be a function');
    return <div className="p-4 text-red-500">Error: onCodeChange prop must be a function</div>;
  }

  const [theme, setTheme] = useState('vs-light');

  const handleEditorChange = (value) => {
    try {
      onCodeChange(value || '');
    } catch (error) {
      console.error('Error updating code:', error);
    }
  };

  const handleLanguageChange = (newLang) => {
    try {
      if (typeof setLanguage === 'function') {
        setLanguage(newLang);
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  const resetCode = () => {
    try {
      const defaultCode = DEFAULT_TEMPLATES[language] || DEFAULT_TEMPLATES.javascript;
      onCodeChange(defaultCode);
    } catch (error) {
      console.error('Error resetting code:', error);
    }
  };

  const selectedLang = LANGUAGE_OPTIONS.find(opt => opt.value === language);
  const currentCode = code || DEFAULT_TEMPLATES[language] || DEFAULT_TEMPLATES.javascript;

  return (
    <div className="h-full flex flex-col bg-background w-full max-w-full min-h-[300px]">
      <Card className="rounded-none border-b border-t-0 border-l-0 border-r-0 bg-white shadow-sm w-full max-w-full">
        <CardHeader className="px-2 py-2 sm:px-4 sm:py-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 w-full">
            <div className="flex flex-col xs:flex-row xs:items-center xs:space-x-2 gap-2 w-full">
              <div className="flex items-center space-x-2 min-w-max">
                <Code className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs sm:text-sm font-medium">Code Editor</span>
              </div>
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide w-full max-w-full pb-1">
                {LANGUAGE_OPTIONS.map((option) => (
                  <motion.div key={option.value} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={language === option.value ? "default" : "outline"}
                      size="sm"
                      className={`h-8 px-2 sm:px-3 whitespace-nowrap rounded-full transition-all text-xs sm:text-sm ${
                        language === option.value
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-white text-gray-700 border hover:bg-gray-100"
                      }`}
                      onClick={() => handleLanguageChange(option.value)}
                    >
                      <span className="mr-1">{option.icon}</span>
                      {option.label}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 mt-2 md:mt-0">
              <Badge variant="outline" className="text-xs">
                {selectedLang?.label || 'JavaScript'}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'vs-light' ? 'vs-dark' : 'vs-light')}
                className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetCode}
                className="h-8 rounded-full"
              >
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="flex-1 relative min-h-[180px] w-full max-w-full">
        <Editor
          height="100%"
          width="100%"
          language={language}
          value={currentCode}
          onChange={handleEditorChange}
          theme={theme}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: window.innerWidth < 640 ? 12 : 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
            wordWrap: 'on',
            automaticLayout: true,
            padding: { top: window.innerWidth < 640 ? 8 : 16, bottom: window.innerWidth < 640 ? 8 : 16 },
            lineNumbers: window.innerWidth < 640 ? 'off' : 'on',
            renderLineHighlight: 'all',
            selectOnLineNumbers: true,
            scrollbar: {
              vertical: 'visible',
              horizontal: 'visible',
              useShadows: false,
              verticalHasArrows: false,
              horizontalHasArrows: false
            },
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            renderWhitespace: 'selection',
            bracketPairColorization: { enabled: true },
            fixedOverflowWidgets: true,
          }}
        />
      </div>

      <div className="border-t bg-white px-2 py-2 sm:px-4 sm:py-2 shadow-sm w-full max-w-full">
        <div className="flex flex-col xs:flex-row items-center justify-between text-xs text-muted-foreground gap-2 w-full">
          <div className="flex items-center space-x-2 sm:space-x-4 w-full">
            <span className="truncate">Ready to code</span>
            <Badge variant="outline" className="text-xs">
              {theme === 'vs-light' ? 'Light' : 'Dark'} Theme
            </Badge>
          </div>
          <div className="flex items-center space-x-2 mt-1 xs:mt-0">
            <Play className="w-3 h-3" />
            <span className="truncate">{window.innerWidth < 640 ? 'Tap to run' : 'Press Ctrl+Enter to run'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;

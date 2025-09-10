import React, { useState } from 'react';
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

const DEFAULT_TEMPLATES = {
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

const CodeEditor = ({ code, onCodeChange, language: initialLanguage = 'javascript' }) => {
  const [language, setLanguage] = useState(initialLanguage);
  const [theme, setTheme] = useState('vs-light');
  const [codeByLang, setCodeByLang] = useState({
    javascript: code || DEFAULT_TEMPLATES.javascript,
    python: DEFAULT_TEMPLATES.python,
    cpp: DEFAULT_TEMPLATES.cpp,
    java: DEFAULT_TEMPLATES.java,
  });

  const handleEditorChange = (value) => {
    setCodeByLang(prev => ({ ...prev, [language]: value }));
    onCodeChange(value);
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    const newCode = codeByLang[newLang] || DEFAULT_TEMPLATES[newLang];
    onCodeChange(newCode);
  };

  const resetCode = () => {
    const defaultCode = DEFAULT_TEMPLATES[language];
    setCodeByLang(prev => ({ ...prev, [language]: defaultCode }));
    onCodeChange(defaultCode);
  };

  const selectedLang = LANGUAGE_OPTIONS.find(opt => opt.value === language);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Editor Header */}
      <Card className="rounded-none border-b border-t-0 border-l-0 border-r-0">
        <CardHeader className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Code Editor</span>
              </div>
              
              <div className="flex items-center space-x-2">
                {LANGUAGE_OPTIONS.map((option) => (
                  <motion.div key={option.value} whileScale={{ scale: 0.95 }}>
                    <Button
                      variant={language === option.value ? "default" : "ghost"}
                      size="sm"
                      className="h-8 px-3"
                      onClick={() => handleLanguageChange(option.value)}
                    >
                      <span className="mr-1">{option.icon}</span>
                      {option.label}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {selectedLang?.label}
              </Badge>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'vs-light' ? 'vs-dark' : 'vs-light')}
                className="h-8 w-8 p-0"
              >
                <Settings className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={resetCode}
                className="h-8"
              >
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Monaco Editor */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={language}
          value={codeByLang[language]}
          onChange={handleEditorChange}
          theme={theme}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
            wordWrap: 'on',
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            lineNumbers: 'on',
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
            bracketPairColorization: { enabled: true }
          }}
        />
      </div>

      {/* Editor Footer */}
      <div className="border-t bg-muted/20 px-4 py-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <span>Ready to code</span>
            <Badge variant="outline" className="text-xs">
              {theme === 'vs-light' ? 'Light' : 'Dark'} Theme
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Play className="w-3 h-3" />
            <span>Press Ctrl+Enter to run</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;

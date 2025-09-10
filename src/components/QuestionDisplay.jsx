import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { FileText, List, Lightbulb } from 'lucide-react';

const QuestionDisplay = ({ question }) => {
  if (!question) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground">No Question Selected</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Choose your practice mode and generate a question to begin
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getDifficultyVariant = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'easy';
      case 'Medium': return 'medium';
      case 'Hard': return 'hard';
      default: return 'default';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-full overflow-y-auto custom-scrollbar bg-background"
    >
      <div className="p-6 space-y-6">
        {/* Question Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {question.title}
              </h1>
              <div className="flex items-center space-x-3">
                <Badge variant={getDifficultyVariant(question.difficulty)}>
                  {question.difficulty}
                </Badge>
                <Badge variant="outline">
                  {question.topic}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Description */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <FileText className="w-5 h-5" />
              <span>Problem Description</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">
              {question.description}
            </p>
          </CardContent>
        </Card>

        {/* Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Lightbulb className="w-5 h-5" />
              <span>Examples</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {question.examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-muted/50 rounded-lg p-4 space-y-3"
              >
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Example {index + 1}
                </h4>
                
                <div className="space-y-2">
                  <div className="bg-background rounded p-3 border">
                    <span className="text-xs font-medium text-muted-foreground">INPUT:</span>
                    <pre className="text-sm font-mono text-foreground mt-1">
                      {example.input}
                    </pre>
                  </div>
                  
                  <div className="bg-background rounded p-3 border">
                    <span className="text-xs font-medium text-muted-foreground">OUTPUT:</span>
                    <pre className="text-sm font-mono text-foreground mt-1">
                      {example.output}
                    </pre>
                  </div>
                  
                  {example.explanation && (
                    <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/60 dark:to-blue-950/40 rounded-lg p-4 border border-blue-300 dark:border-blue-700 shadow-sm">
                      <span className="text-xs font-bold text-blue-800 dark:text-blue-200 tracking-wide uppercase">Explanation:</span>
                      <p className="text-base font-medium text-blue-900 dark:text-blue-100 mt-1 leading-relaxed">
                        {example.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Constraints */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg">
              <List className="w-5 h-5" />
              <span>Constraints</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {question.constraints.map((constraint, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-start space-x-2"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-sm text-muted-foreground font-mono">
                    {constraint}
                  </span>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default QuestionDisplay;

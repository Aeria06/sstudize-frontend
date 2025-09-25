import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Clock, Book, Brain, Target, Users } from 'lucide-react';

interface Question {
  id: number;
  section: string;
  type: 'mcq' | 'short' | 'scale';
  question: string;
  options?: string[];
  correct?: string;
  explanation?: string;
  scaleRange?: { min: number; max: number; minLabel?: string; maxLabel?: string };
}

const questions: Question[] = [
  // Physics
  {
    id: 1,
    section: "Physics",
    type: "mcq",
    question: "A car of mass 1000 kg is moving at a velocity of 36 km/h. The brakes are applied to bring it to rest in 10 seconds. The average retarding force applied is:",
    options: ["500 N", "1000 N", "2000 N", "3600 N"],
    correct: "1000 N",
    explanation: "Velocity = 36 km/h = 10 m/s. Retardation a = (0-10)/10 = -1 m/s². Force = ma = 1000 × 1 = 1000 N."
  },
  {
    id: 2,
    section: "Physics",
    type: "mcq",
    question: "The time period T of a simple pendulum of length L is proportional to:",
    options: ["√L", "L", "1/√L", "Independent of L"],
    correct: "√L",
    explanation: "T = 2π√(L/g). Clearly T ∝ √L."
  },
  {
    id: 3,
    section: "Physics",
    type: "mcq",
    question: "Which of the following best illustrates conservation of linear momentum?",
    options: ["A ball falling freely under gravity", "A rocket launching into space", "A pendulum bob oscillating", "A car moving at constant speed on a straight road"],
    correct: "A rocket launching into space",
    explanation: "In a rocket launch, hot gases are expelled downwards, and the rocket gains upward momentum → total momentum is conserved."
  },
  {
    id: 4,
    section: "Physics",
    type: "mcq",
    question: "A block of mass m rests on a smooth horizontal surface and is connected to a hanging mass M over a pulley. If released, the acceleration of the system is:",
    options: ["Mg/(M+m)", "mg/(M+m)", "g/(M+m)", "Zero"],
    correct: "Mg/(M+m)",
    explanation: "Net force on system = Mg. Total mass = M+m. Acceleration = Mg/(M+m)."
  },
  // Chemistry
  {
    id: 5,
    section: "Chemistry",
    type: "mcq",
    question: "The pH of a 0.001 M HCl solution is:",
    options: ["1", "2", "3", "4"],
    correct: "3",
    explanation: "pH = –log[H⁺] = –log(0.001) = 3."
  },
  {
    id: 6,
    section: "Chemistry",
    type: "mcq",
    question: "The hybridization of carbon in methane (CH₄) is:",
    options: ["sp", "sp²", "sp³", "sp³d"],
    correct: "sp³",
    explanation: "In CH₄, carbon bonds with 4 hydrogens → tetrahedral → sp³ hybridization."
  },
  {
    id: 7,
    section: "Chemistry",
    type: "mcq",
    question: "0.5 g of NaOH is dissolved in 100 mL of water. The molarity of the solution is approximately:",
    options: ["0.125 M", "0.25 M", "0.5 M", "1 M"],
    correct: "0.125 M",
    explanation: "Moles = 0.5/40 = 0.0125. Volume = 0.1 L. M = 0.0125/0.1 = 0.125."
  },
  {
    id: 8,
    section: "Chemistry",
    type: "mcq",
    question: "A radioactive isotope has a half-life of 10 minutes. After 30 minutes, the fraction of the original sample remaining is:",
    options: ["1/2", "1/3", "1/4", "1/8"],
    correct: "1/8",
    explanation: "30 minutes = 3 half-lives. Fraction left = (1/2)³ = 1/8."
  },
  // Mathematics
  {
    id: 9,
    section: "Mathematics",
    type: "mcq",
    question: "The roots of 2x² - 5x + 3 = 0 are:",
    options: ["1 and 3/2", "2 and 3/2", "1 and 2", "-1 and -3/2"],
    correct: "1 and 3/2",
    explanation: "Discriminant = (-5)² - 4(2)(3) = 25 - 24 = 1. Roots = (5 ± 1)/4 = 1, 3/2."
  },
  {
    id: 10,
    section: "Mathematics",
    type: "mcq",
    question: "If y = sin(x²), then dy/dx is:",
    options: ["cos(x²)", "2x cos(x²)", "2 sin(x)", "cos(x)"],
    correct: "2x cos(x²)",
    explanation: "Using chain rule: dy/dx = cos(x²) · (2x)."
  },
  {
    id: 11,
    section: "Mathematics",
    type: "mcq",
    question: "The equation of the straight line passing through (1, 2) and parallel to 3x - 4y + 5 = 0 is:",
    options: ["3x - 4y + 5 = 0", "3x - 4y - 5 = 0", "3x - 4y - 11 = 0", "3x - 4y = 0"],
    correct: "3x - 4y + 5 = 0",
    explanation: "Parallel line → same slope. Substitute (1,2): 3(1) - 4(2) + c = 0 → c = 5. Final line: 3x - 4y + 5 = 0."
  },
  {
    id: 12,
    section: "Mathematics",
    type: "mcq",
    question: "∫(1/(x² + 1))dx =",
    options: ["ln(x² + 1) + C", "arctan(x) + C", "1/x + C", "-1/x + C"],
    correct: "arctan(x) + C",
    explanation: "Standard formula: ∫(1/(x² + 1))dx = arctan(x) + C."
  },
  // Time Management Skills
  {
    id: 13,
    section: "Time Management Skills",
    type: "short",
    question: "How did you prepare for this quiz?"
  },
  {
    id: 14,
    section: "Time Management Skills",
    type: "scale",
    question: "How effectively did you stick to your study schedule?",
    scaleRange: { min: 1, max: 5, minLabel: "Never", maxLabel: "Always" }
  },
  // Problem-Solving Approaches
  {
    id: 15,
    section: "Problem-Solving Approaches",
    type: "mcq",
    question: "When solving these problems, your first instinct is to:",
    options: ["Recall a similar solved example", "Break the problem into smaller steps", "Try different formulas randomly", "Skip and come back later"]
  },
  {
    id: 16,
    section: "Problem-Solving Approaches",
    type: "short",
    question: "What was your strategy while solving the quiz?"
  },
  // Stress Management
  {
    id: 17,
    section: "Stress Management and Mental Well-being",
    type: "scale",
    question: "How often do you feel exam stress affects your performance?",
    scaleRange: { min: 1, max: 10, minLabel: "Never", maxLabel: "Very Frequently" }
  },
  {
    id: 18,
    section: "Stress Management and Mental Well-being",
    type: "short",
    question: "What is your go-to method to relax during intense study phases?"
  },
  // Study Techniques
  {
    id: 19,
    section: "Study Techniques and Resources Used",
    type: "mcq",
    question: "Which of these resources do you rely on the most?",
    options: ["NCERT textbooks", "Coaching institute material", "Online lectures", "Test series/mock papers"]
  },
  {
    id: 20,
    section: "Study Techniques and Resources Used",
    type: "scale",
    question: "How effective do you find group study sessions?",
    scaleRange: { min: 1, max: 5, minLabel: "Not useful", maxLabel: "Very useful" }
  },
  {
    id: 21,
    section: "Study Techniques and Resources Used",
    type: "short",
    question: "Share one study technique (e.g., flashcards, spaced repetition, mock tests) that you find most effective."
  }
];

const sectionIcons: { [key: string]: React.ReactNode } = {
  "Physics": <Target className="w-5 h-5" />,
  "Chemistry": <Book className="w-5 h-5" />,
  "Mathematics": <Brain className="w-5 h-5" />,
  "Time Management Skills": <Clock className="w-5 h-5" />,
  "Problem-Solving Approaches": <CheckCircle className="w-5 h-5" />,
  "Stress Management and Mental Well-being": <Target className="w-5 h-5" />,
  "Study Techniques and Resources Used": <Users className="w-5 h-5" />
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [question.id]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const renderQuestion = () => {
    switch (question.type) {
      case 'mcq':
        return (
          <div className="space-y-4">
            {question.options?.map((option, index) => (
              <label
                key={index}
                className="flex items-center p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-purple-300 cursor-pointer transition-all duration-200 hover:shadow-md"
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => handleAnswer(option)}
                  className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                />
                <span className="ml-3 text-gray-800 text-lg">{option}</span>
              </label>
            ))}
          </div>
        );
      case 'short':
        return (
          <div className="space-y-4">
            <textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="w-full p-4 bg-white rounded-lg border-2 border-gray-200 focus:border-purple-300 focus:ring-purple-500 focus:outline-none transition-all duration-200 resize-none h-32 text-lg"
            />
          </div>
        );
      case 'scale':
        if (!question.scaleRange) return null;
        return (
          <div className="space-y-6">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{question.scaleRange.minLabel}</span>
              <span>{question.scaleRange.maxLabel}</span>
            </div>
            <div className="flex justify-between items-center space-x-2">
              {Array.from({ length: question.scaleRange.max - question.scaleRange.min + 1 }, (_, i) => {
                const value = question.scaleRange!.min + i;
                return (
                  <label key={value} className="flex flex-col items-center cursor-pointer group">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={value}
                      checked={answers[question.id] === value.toString()}
                      onChange={() => handleAnswer(value.toString())}
                      className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
                    />
                    <span className="mt-2 text-lg font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                      {value}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (showResults) {
    const correctAnswers = questions.filter(q => 
      q.type === 'mcq' && q.correct && answers[q.id] === q.correct
    ).length;
    const mcqQuestions = questions.filter(q => q.type === 'mcq').length;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
              <p className="text-xl text-gray-600">Thank you for completing the Sstudize JEE Quiz</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Results Summary</h2>
                <p className="text-lg text-gray-600">
                  You scored {correctAnswers} out of {mcqQuestions} on the MCQ questions
                </p>
                <div className="mt-4 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  {Math.round((correctAnswers / mcqQuestions) * 100)}%
                </div>
              </div>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <Book className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Sstudize</h1>
          </div>
          
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            Submit Quiz
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-1">
          <div 
            className="h-1 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Badge */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md w-fit">
              {sectionIcons[question.section]}
              <span className="text-sm font-medium text-gray-700">{question.section}</span>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500 font-medium">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm text-purple-600 font-medium">
                  {question.type.toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 leading-relaxed">
                {question.question}
              </h2>
            </div>

            {renderQuestion()}

            {/* Explanation for MCQs */}
            {question.type === 'mcq' && question.explanation && answers[question.id] && (
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <h3 className="font-semibold text-blue-800 mb-2">Explanation:</h3>
                <p className="text-blue-700">{question.explanation}</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <div className="flex space-x-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-10 h-10 rounded-full font-medium transition-all duration-200 ${
                    index === currentQuestion
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : answers[questions[index].id]
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                currentQuestion === questions.length - 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-lg'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
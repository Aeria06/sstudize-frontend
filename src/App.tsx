// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, CheckCircle, Clock, Book, Brain, Target, Users } from 'lucide-react';

// const sectionIcons: { [key: string]: JSX.Element } = {
//   Physics: <Book className="w-5 h-5 text-purple-600" />,
//   Chemistry: <Book className="w-5 h-5 text-blue-600" />,
//   Mathematics: <Book className="w-5 h-5 text-green-600" />,
//   Assessment: <Brain className="w-5 h-5 text-orange-600" />,
// };

// interface Question {
//   id: string;
//   section: string;
//   type: 'mcq' | 'short' | 'scale';
//   question: string;
//   options?: string[];
//   correct?: string;
//   explanation?: string;
//   scaleRange?: { min: number; max: number; minLabel?: string; maxLabel?: string };
// }

// const questions: Question[] = [
//   // Physics
//   {
//     id: "Q1",
//     section: "Physics",
//     type: "mcq",
//     question: "A car of mass 1000 kg is moving at a velocity of 36 km/h. The brakes are applied to bring it to rest in 10 seconds. The average retarding force applied is:",
//     options: ["500 N", "1000 N", "2000 N", "3600 N"],
//     correct: "1000 N",
//     explanation: "Velocity = 36 km/h = 10 m/s. Retardation a = (0-10)/10 = -1 m/s². Force = ma = 1000 × 1 = 1000 N."
//   },
//   {
//     id: "Q2",
//     section: "Physics",
//     type: "mcq",
//     question: "The time period T of a simple pendulum of length L is proportional to:",
//     options: ["√L", "L", "1/√L", "Independent of L"],
//     correct: "√L",
//     explanation: "T = 2π√(L/g). Clearly T ∝ √L."
//   },
//   {
//     id: "Q3",
//     section: "Physics",
//     type: "mcq",
//     question: "Which of the following best illustrates conservation of linear momentum?",
//     options: ["A ball falling freely under gravity", "A rocket launching into space", "A pendulum bob oscillating", "A car moving at constant speed on a straight road"],
//     correct: "A rocket launching into space",
//     explanation: "In a rocket launch, hot gases are expelled downwards, and the rocket gains upward momentum → total momentum is conserved."
//   },
//   {
//     id: "Q4",
//     section: "Physics",
//     type: "mcq",
//     question: "A block of mass m rests on a smooth horizontal surface and is connected to a hanging mass M over a pulley. If released, the acceleration of the system is:",
//     options: ["Mg/(M+m)", "mg/(M+m)", "g/(M+m)", "Zero"],
//     correct: "Mg/(M+m)",
//     explanation: "Net force on system = Mg. Total mass = M+m. Acceleration = Mg/(M+m)."
//   },
//   // Chemistry
//   {
//     id: "Q5",
//     section: "Chemistry",
//     type: "mcq",
//     question: "The pH of a 0.001 M HCl solution is:",
//     options: ["1", "2", "3", "4"],
//     correct: "3",
//     explanation: "pH = –log[H⁺] = –log(0.001) = 3."
//   },
//   {
//     id: "Q6",
//     section: "Chemistry",
//     type: "mcq",
//     question: "The hybridization of carbon in methane (CH₄) is:",
//     options: ["sp", "sp²", "sp³", "sp³d"],
//     correct: "sp³",
//     explanation: "In CH₄, carbon bonds with 4 hydrogens → tetrahedral → sp³ hybridization."
//   },
//   {
//     id: "Q7",
//     section: "Chemistry",
//     type: "mcq",
//     question: "0.5 g of NaOH is dissolved in 100 mL of water. The molarity of the solution is approximately:",
//     options: ["0.125 M", "0.25 M", "0.5 M", "1 M"],
//     correct: "0.125 M",
//     explanation: "Moles = 0.5/40 = 0.0125. Volume = 0.1 L. M = 0.0125/0.1 = 0.125."
//   },
//   {
//     id: "Q8",
//     section: "Chemistry",
//     type: "mcq",
//     question: "A radioactive isotope has a half-life of 10 minutes. After 30 minutes, the fraction of the original sample remaining is:",
//     options: ["1/2", "1/3", "1/4", "1/8"],
//     correct: "1/8",
//     explanation: "30 minutes = 3 half-lives. Fraction left = (1/2)³ = 1/8."
//   },
//   // Mathematics
//   {
//     id: "Q9",
//     section: "Mathematics",
//     type: "mcq",
//     question: "The roots of 2x² - 5x + 3 = 0 are:",
//     options: ["1 and 3/2", "2 and 3/2", "1 and 2", "-1 and -3/2"],
//     correct: "1 and 3/2",
//     explanation: "Discriminant = (-5)² - 4(2)(3) = 25 - 24 = 1. Roots = (5 ± 1)/4 = 1, 3/2."
//   },
//   {
//     id: "Q10",
//     section: "Mathematics",
//     type: "mcq",
//     question: "If log₂(x) + log₂(x-3) = 2, then x equals:",
//     options: ["4", "5", "6", "8"],
//     correct: "4",
//     explanation: "log₂(x) + log₂(x-3) = log₂(x(x-3)) = 2. So x(x-3) = 4. x² - 3x - 4 = 0. (x-4)(x+1) = 0. Since x > 3, x = 4."
//   },
//   {
//     id: "Q11",
//     section: "Mathematics",
//     type: "mcq",
//     question: "The derivative of sin(2x) with respect to x is:",
//     options: ["cos(2x)", "2cos(2x)", "-cos(2x)", "sin(2x)"],
//     correct: "2cos(2x)",
//     explanation: "Using chain rule: d/dx[sin(2x)] = cos(2x) × d/dx(2x) = cos(2x) × 2 = 2cos(2x)."
//   },
//   // Assessment Questions
//   {
//     id: "time_prep_notes",
//     section: "Assessment",
//     type: "short",
//     question: "What preparation methods did you use before taking this quiz? (e.g., revised formulas, practiced problems, etc.)"
//   },
//   {
//     id: "time_schedule_adherence",
//     section: "Assessment",
//     type: "scale",
//     question: "How well did you stick to your study schedule while preparing for this quiz?",
//     scaleRange: { min: 1, max: 5, minLabel: "Not at all", maxLabel: "Perfectly" }
//   },
//   {
//     id: "problem_first_instinct",
//     section: "Assessment",
//     type: "short",
//     question: "When you encounter a difficult problem, what is usually your first instinct? (Describe your approach)"
//   },
//   {
//     id: "problem_strategy_notes",
//     section: "Assessment",
//     type: "short",
//     question: "Describe your general problem-solving strategy for complex questions."
//   },
//   {
//     id: "wellbeing_stress_level",
//     section: "Assessment",
//     type: "scale",
//     question: "On a scale of 1-10, how would you rate your current stress level regarding exam preparation?",
//     scaleRange: { min: 1, max: 10, minLabel: "Very relaxed", maxLabel: "Extremely stressed" }
//   },
//   {
//     id: "wellbeing_relaxation_method",
//     section: "Assessment",
//     type: "short",
//     question: "What methods do you use to relax and manage stress during your studies?"
//   },
//   {
//     id: "study_primary_resource",
//     section: "Assessment",
//     type: "mcq",
//     question: "What is your primary study resource?",
//     options: ["Textbooks", "Online courses", "Video tutorials", "Practice tests", "Coaching classes"]
//   },
//   {
//     id: "study_group_effectiveness",
//     section: "Assessment",
//     type: "scale",
//     question: "How effective do you find group study sessions?",
//     scaleRange: { min: 1, max: 5, minLabel: "Not effective", maxLabel: "Very effective" }
//   },
//   {
//     id: "study_most_effective_technique",
//     section: "Assessment",
//     type: "short",
//     question: "What study technique do you find most effective for retaining information?"
//   }
// ];

// function App() {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [questionStartTime, setQuestionStartTime] = useState<number | null>(null);
//   const [answers, setAnswers] = useState<{ [key: string]: string | number }>({});
//   const [timeTaken, setTimeTaken] = useState<{ [key: string]: number }>({});
//   const [showResults, setShowResults] = useState(false);
//   const [socaReport, setSocaReport] = useState("");
//   const [socaLoading, setSocaLoading] = useState(false);

//   const question = questions[currentQuestion];
//   const progress = ((currentQuestion + 1) / questions.length) * 100;

//   useEffect(() => {
//     setQuestionStartTime(Date.now());
//   }, [currentQuestion]);

//   function handleAnswerWithTime(answer: string) {
//     const timeSpent = questionStartTime ? Math.round((Date.now() - questionStartTime) / 1000) : 0;
//     setAnswers(prev => ({ ...prev, [question.id]: answer }));
//     setTimeTaken(prev => ({ ...prev, [question.id]: timeSpent }));
//     setQuestionStartTime(Date.now());
//   }

//   function handleAnswer(answer: string) {
//     setAnswers(prev => ({ ...prev, [question.id]: answer }));
//   }

//   function handleNext() {
//     // Record time for current question if not already recorded
//     if (questionStartTime && !timeTaken[question.id]) {
//       const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
//       setTimeTaken(prev => ({ ...prev, [question.id]: timeSpent }));
//     }
    
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//     }
//   }

//   function handlePrevious() {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//     }
//   }

//   function handleSubmit() {
//     // Record time for current question
//     if (questionStartTime && !timeTaken[question.id]) {
//       const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
//       setTimeTaken(prev => ({ ...prev, [question.id]: timeSpent }));
//     }
//     setShowResults(true);
//   }

//   function formatAnswersForBackend() {
//     const mcqQuestions = questions.filter(q => q.type === 'mcq' && q.section !== 'Assessment');
//     const mcqAnswers = mcqQuestions.map(q => {
//       const userAnswer = answers[q.id];
//       const isCorrect = q.correct === userAnswer;
//       return {
//         question_id: q.id,
//         user_answer: userAnswer || '',
//         is_correct: isCorrect,
//         time_taken: timeTaken[q.id] || 0
//       };
//     });

//     return {
//       mcq_answers: mcqAnswers,
//       time_management: {
//         preparation_notes: answers['time_prep_notes'] || '',
//         schedule_adherence: parseInt(answers['time_schedule_adherence']?.toString() || '1')
//       },
//       problem_solving: {
//         first_instinct: answers['problem_first_instinct'] || '',
//         strategy_notes: answers['problem_strategy_notes'] || ''
//       },
//       well_being: {
//         stress_level: parseInt(answers['wellbeing_stress_level']?.toString() || '1'),
//         relaxation_method: answers['wellbeing_relaxation_method'] || ''
//       },
//       study_techniques: {
//         primary_resource: answers['study_primary_resource'] || '',
//         group_study_effectiveness: parseInt(answers['study_group_effectiveness']?.toString() || '1'),
//         most_effective_technique: answers['study_most_effective_technique'] || ''
//       }
//     };
//   }

//   async function fetchSocaReport() {
//     setSocaLoading(true);
//     setSocaReport("");
//     const payload = formatAnswersForBackend();
    
//     console.log('Sending payload:', JSON.stringify(payload, null, 2));
    
//     try {
//       const res = await fetch("http://localhost:8000/api/soca-report", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//       });
//       const data = await res.json();
//       setSocaReport(data.report);
//     } catch (err) {
//       setSocaReport("Error fetching SOCA report: " + err);
//     }
//     setSocaLoading(false);
//   }

//   function renderQuestion() {
//     switch (question.type) {
//       case 'mcq': {
//         const selected = answers[question.id];
//         const showResults = question.section !== 'Assessment';
        
//         return (
//           <div className="space-y-4">
//             {question.options?.map((option, index) => {
//               let borderClass = "border-gray-200";
//               let borderTop = undefined;
//               let bgClass = "bg-white";
              
//               if (selected === option && question.correct && showResults) {
//                 if (option === question.correct) {
//                   borderClass = "border-green-500";
//                   borderTop = '10px solid #22c55e';
//                   bgClass = "bg-green-100";
//                 } else {
//                   borderClass = "border-red-500";
//                   borderTop = '10px solid #ef4444';
//                   bgClass = "bg-red-100";
//                 }
//               }
              
//               return (
//                 <label
//                   key={index}
//                   className={`flex items-center p-4 ${bgClass} rounded-lg border-2 ${borderClass} hover:border-purple-300 cursor-pointer transition-all duration-200 hover:shadow-md relative`}
//                   style={selected === option && borderTop ? { borderTop } : {}}
//                 >
//                   <input
//                     type="radio"
//                     name={`question-${question.id}`}
//                     value={option}
//                     checked={selected === option}
//                     onChange={() => question.section === 'Assessment' ? handleAnswer(option) : handleAnswerWithTime(option)}
//                     className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
//                   />
//                   <span className="ml-3 text-gray-800 text-lg">{option}</span>
//                   {/* Feedback message for subject MCQs */}
//                   {selected === option && question.correct && showResults && (
//                     <span className={`absolute right-4 top-1 text-base font-semibold ${option === question.correct ? 'text-green-600' : 'text-red-600'}`}>
//                       {option === question.correct ? 'This is correct' : 'This is incorrect'}
//                     </span>
//                   )}
//                 </label>
//               );
//             })}
//           </div>
//         );
//       }
//       case 'short': {
//         return (
//           <div className="space-y-4">
//             <textarea
//               value={answers[question.id] || ''}
//               onChange={(e) => handleAnswer(e.target.value)}
//               placeholder="Enter your answer..."
//               className="w-full p-4 bg-white rounded-lg border-2 border-gray-200 focus:border-purple-300 focus:ring-purple-500 focus:outline-none transition-all duration-200 resize-none h-32 text-lg"
//             />
//           </div>
//         );
//       }
//       case 'scale': {
//         if (!question.scaleRange) return null;
//         return (
//           <div className="space-y-6">
//             <div className="flex justify-between text-sm text-gray-600">
//               <span>{question.scaleRange.minLabel}</span>
//               <span>{question.scaleRange.maxLabel}</span>
//             </div>
//             <div className="flex justify-between items-center space-x-2">
//               {Array.from({ length: question.scaleRange.max - question.scaleRange.min + 1 }, (_, i) => {
//                 const value = question.scaleRange!.min + i;
//                 return (
//                   <label key={value} className="flex flex-col items-center cursor-pointer group">
//                     <input
//                       type="radio"
//                       name={`question-${question.id}`}
//                       value={value}
//                       checked={answers[question.id] === value.toString()}
//                       onChange={() => handleAnswer(value.toString())}
//                       className="w-5 h-5 text-purple-600 border-gray-300 focus:ring-purple-500"
//                     />
//                     <span className="mt-2 text-lg font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
//                       {value}
//                     </span>
//                   </label>
//                 );
//               })}
//             </div>
//           </div>
//         );
//       }
//       default:
//         return null;
//     }
//   }

//   if (showResults) {
//     const mcqQuestions = questions.filter(q => q.type === 'mcq' && q.section !== 'Assessment');
//     const correctAnswers = mcqQuestions.filter(q => 
//       q.correct && answers[q.id] === q.correct
//     ).length;

//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-4xl mx-auto">
//             <div className="text-center mb-8">
//               <h1 className="text-4xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
//               <p className="text-xl text-gray-600">Thank you for completing the Sstudize JEE Quiz</p>
//             </div>
//             <div className="bg-white rounded-2xl shadow-xl p-8">
//               <div className="text-center mb-8">
//                 <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <CheckCircle className="w-12 h-12 text-white" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-2">Results Summary</h2>
//                 <p className="text-lg text-gray-600">
//                   You scored {correctAnswers} out of {mcqQuestions.length} on the MCQ questions
//                 </p>
//                 <div className="mt-4 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
//                   {Math.round((correctAnswers / mcqQuestions.length) * 100)}%
//                 </div>
//               </div>
              
//               <div className="mb-6">
//                 <button
//                   onClick={fetchSocaReport}
//                   disabled={socaLoading}
//                   className="w-full py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 mb-4"
//                 >
//                   {socaLoading ? "Analyzing..." : "Get SOCA Analysis"}
//                 </button>
//                 {socaLoading && (
//                   <div className="flex flex-col items-center justify-center py-8">
//                     <svg className="animate-spin h-8 w-8 text-green-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
//                     </svg>
//                     <span className="text-green-700 font-semibold">Analyzing your results...</span>
//                   </div>
//                 )}
//                 {socaReport && (
//                   <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl shadow-xl mt-4 max-h-[500px] overflow-y-auto border border-green-200">
//                     <div className="flex items-center mb-4">
//                       <CheckCircle className="w-7 h-7 text-green-600 mr-2" />
//                       <h3 className="font-bold text-2xl text-green-800">SOCA Report</h3>
//                     </div>
//                     {/* If Markdown, use a renderer. Otherwise, fallback to pre-wrap */}
//                     {/* You can use a library like react-markdown for better rendering. For now, fallback to <pre> */}
//                     <pre className="whitespace-pre-wrap text-gray-800 text-base leading-relaxed font-sans">{socaReport}</pre>
//                   </div>
//                 )}
//               </div>

//               <button
//                 onClick={() => window.location.reload()}
//                 className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
//               >
//                 Retake Quiz
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
//       {/* Header */}
//       <header className="bg-white shadow-lg">
//         <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
//               <Book className="w-6 h-6 text-white" />
//             </div>
//             <h1 className="text-2xl font-bold text-gray-800">Sstudize</h1>
//           </div>
//           <button
//             onClick={handleSubmit}
//             className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
//           >
//             Submit Quiz
//           </button>
//         </div>
//         {/* Progress Bar */}
//         <div className="w-full bg-gray-200 h-1">
//           <div 
//             className="h-1 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto">
//           {/* Section Badge */}
//           <div className="mb-6">
//             <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md w-fit">
//               {sectionIcons[question.section]}
//               <span className="text-sm font-medium text-gray-700">{question.section}</span>
//             </div>
//           </div>

//           {/* Question Card */}
//           <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
//             <div className="mb-6">
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-sm text-gray-500 font-medium">
//                   Question {currentQuestion + 1} of {questions.length}
//                 </span>
//                 <span className="text-sm text-purple-600 font-medium">
//                   {question.type.toUpperCase()}
//                 </span>
//               </div>
//               <h2 className="text-2xl font-semibold text-gray-800 leading-relaxed">
//                 {question.question}
//               </h2>
//             </div>

//             {renderQuestion()}

//             {/* Explanation for subject MCQs */}
//             {question.type === 'mcq' && question.explanation && answers[question.id] && question.section !== 'Assessment' && (
//               <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400">
//                 <h3 className="font-semibold text-blue-800 mb-2">Explanation:</h3>
//                 <p className="text-blue-700">{question.explanation}</p>
//               </div>
//             )}

//             {/* Navigation */}
//             <div className="flex justify-between items-center mt-8">
//               <button
//                 onClick={handlePrevious}
//                 disabled={currentQuestion === 0}
//                 className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
//                   currentQuestion === 0
//                     ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                     : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
//                 }`}
//               >
//                 <ChevronLeft className="w-5 h-5" />
//                 <span>Previous</span>
//               </button>

//               <div className="flex space-x-2">
//                 {questions.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentQuestion(index)}
//                     className={`w-10 h-10 rounded-full font-medium transition-all duration-200 ${
//                       index === currentQuestion
//                         ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
//                         : answers[questions[index].id]
//                         ? 'bg-green-500 text-white'
//                         : 'bg-white text-gray-500 hover:bg-gray-50'
//                     }`}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//               </div>

//               <button
//                 onClick={handleNext}
//                 disabled={currentQuestion === questions.length - 1}
//                 className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
//                   currentQuestion === questions.length - 1
//                     ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                     : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-md hover:shadow-lg'
//                 }`}
//               >
//                 <span>Next</span>
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Clock, Book, Brain, Target, Users } from 'lucide-react';

const sectionIcons: { [key: string]: JSX.Element } = {
  Physics: <Book className="w-5 h-5 text-purple-600" />,
  Chemistry: <Book className="w-5 h-5 text-blue-600" />,
  Mathematics: <Book className="w-5 h-5 text-green-600" />,
  Assessment: <Brain className="w-5 h-5 text-orange-600" />,
};

interface Question {
  id: string;
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
    id: "Q1",
    section: "Physics",
    type: "mcq",
    question: "A car of mass 1000 kg is moving at a velocity of 36 km/h. The brakes are applied to bring it to rest in 10 seconds. The average retarding force applied is:",
    options: ["500 N", "1000 N", "2000 N", "3600 N"],
    correct: "1000 N",
    explanation: "Velocity = 36 km/h = 10 m/s. Retardation a = (0-10)/10 = -1 m/s². Force = ma = 1000 × 1 = 1000 N."
  },
  {
    id: "Q2",
    section: "Physics",
    type: "mcq",
    question: "The time period T of a simple pendulum of length L is proportional to:",
    options: ["√L", "L", "1/√L", "Independent of L"],
    correct: "√L",
    explanation: "T = 2π√(L/g). Clearly T ∝ √L."
  },
  {
    id: "Q3",
    section: "Physics",
    type: "mcq",
    question: "Which of the following best illustrates conservation of linear momentum?",
    options: ["A ball falling freely under gravity", "A rocket launching into space", "A pendulum bob oscillating", "A car moving at constant speed on a straight road"],
    correct: "A rocket launching into space",
    explanation: "In a rocket launch, hot gases are expelled downwards, and the rocket gains upward momentum → total momentum is conserved."
  },
  {
    id: "Q4",
    section: "Physics",
    type: "mcq",
    question: "A block of mass m rests on a smooth horizontal surface and is connected to a hanging mass M over a pulley. If released, the acceleration of the system is:",
    options: ["Mg/(M+m)", "mg/(M+m)", "g/(M+m)", "Zero"],
    correct: "Mg/(M+m)",
    explanation: "Net force on system = Mg. Total mass = M+m. Acceleration = Mg/(M+m)."
  },
  // Chemistry
  {
    id: "Q5",
    section: "Chemistry",
    type: "mcq",
    question: "The pH of a 0.001 M HCl solution is:",
    options: ["1", "2", "3", "4"],
    correct: "3",
    explanation: "pH = –log[H⁺] = –log(0.001) = 3."
  },
  {
    id: "Q6",
    section: "Chemistry",
    type: "mcq",
    question: "The hybridization of carbon in methane (CH₄) is:",
    options: ["sp", "sp²", "sp³", "sp³d"],
    correct: "sp³",
    explanation: "In CH₄, carbon bonds with 4 hydrogens → tetrahedral → sp³ hybridization."
  },
  {
    id: "Q7",
    section: "Chemistry",
    type: "mcq",
    question: "0.5 g of NaOH is dissolved in 100 mL of water. The molarity of the solution is approximately:",
    options: ["0.125 M", "0.25 M", "0.5 M", "1 M"],
    correct: "0.125 M",
    explanation: "Moles = 0.5/40 = 0.0125. Volume = 0.1 L. M = 0.0125/0.1 = 0.125."
  },
  {
    id: "Q8",
    section: "Chemistry",
    type: "mcq",
    question: "A radioactive isotope has a half-life of 10 minutes. After 30 minutes, the fraction of the original sample remaining is:",
    options: ["1/2", "1/3", "1/4", "1/8"],
    correct: "1/8",
    explanation: "30 minutes = 3 half-lives. Fraction left = (1/2)³ = 1/8."
  },
  // Mathematics
  {
    id: "Q9",
    section: "Mathematics",
    type: "mcq",
    question: "The roots of 2x² - 5x + 3 = 0 are:",
    options: ["1 and 3/2", "2 and 3/2", "1 and 2", "-1 and -3/2"],
    correct: "1 and 3/2",
    explanation: "Discriminant = (-5)² - 4(2)(3) = 25 - 24 = 1. Roots = (5 ± 1)/4 = 1, 3/2."
  },
  {
    id: "Q10",
    section: "Mathematics",
    type: "mcq",
    question: "If log₂(x) + log₂(x-3) = 2, then x equals:",
    options: ["4", "5", "6", "8"],
    correct: "4",
    explanation: "log₂(x) + log₂(x-3) = log₂(x(x-3)) = 2. So x(x-3) = 4. x² - 3x - 4 = 0. (x-4)(x+1) = 0. Since x > 3, x = 4."
  },
  {
    id: "Q11",
    section: "Mathematics",
    type: "mcq",
    question: "The derivative of sin(2x) with respect to x is:",
    options: ["cos(2x)", "2cos(2x)", "-cos(2x)", "sin(2x)"],
    correct: "2cos(2x)",
    explanation: "Using chain rule: d/dx[sin(2x)] = cos(2x) × d/dx(2x) = cos(2x) × 2 = 2cos(2x)."
  },
  // Assessment Questions
  {
    id: "time_prep_notes",
    section: "Assessment",
    type: "short",
    question: "What preparation methods did you use before taking this quiz? (e.g., revised formulas, practiced problems, etc.)"
  },
  {
    id: "time_schedule_adherence",
    section: "Assessment",
    type: "scale",
    question: "How well did you stick to your study schedule while preparing for this quiz?",
    scaleRange: { min: 1, max: 5, minLabel: "Not at all", maxLabel: "Perfectly" }
  },
  {
    id: "problem_first_instinct",
    section: "Assessment",
    type: "short",
    question: "When you encounter a difficult problem, what is usually your first instinct? (Describe your approach)"
  },
  {
    id: "problem_strategy_notes",
    section: "Assessment",
    type: "short",
    question: "Describe your general problem-solving strategy for complex questions."
  },
  {
    id: "wellbeing_stress_level",
    section: "Assessment",
    type: "scale",
    question: "On a scale of 1-10, how would you rate your current stress level regarding exam preparation?",
    scaleRange: { min: 1, max: 10, minLabel: "Very relaxed", maxLabel: "Extremely stressed" }
  },
  {
    id: "wellbeing_relaxation_method",
    section: "Assessment",
    type: "short",
    question: "What methods do you use to relax and manage stress during your studies?"
  },
  {
    id: "study_primary_resource",
    section: "Assessment",
    type: "mcq",
    question: "What is your primary study resource?",
    options: ["Textbooks", "Online courses", "Video tutorials", "Practice tests", "Coaching classes"]
  },
  {
    id: "study_group_effectiveness",
    section: "Assessment",
    type: "scale",
    question: "How effective do you find group study sessions?",
    scaleRange: { min: 1, max: 5, minLabel: "Not effective", maxLabel: "Very effective" }
  },
  {
    id: "study_most_effective_technique",
    section: "Assessment",
    type: "short",
    question: "What study technique do you find most effective for retaining information?"
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ [key: string]: string | number }>({});
  const [timeTaken, setTimeTaken] = useState<{ [key: string]: number }>({});
  const [lockedAnswers, setLockedAnswers] = useState<Set<string>>(new Set()); // Track locked questions
  const [showResults, setShowResults] = useState(false);
  const [socaReport, setSocaReport] = useState("");
  const [socaLoading, setSocaLoading] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [currentQuestion]);

  function handleAnswerWithTime(answer: string) {
    // Don't allow changes if already answered for MCQ questions
    if (lockedAnswers.has(question.id) && question.type === 'mcq' && question.section !== 'Assessment') {
      return;
    }

    const timeSpent = questionStartTime ? Math.round((Date.now() - questionStartTime) / 1000) : 0;
    setAnswers(prev => ({ ...prev, [question.id]: answer }));
    setTimeTaken(prev => ({ ...prev, [question.id]: timeSpent }));
    
    // Lock the answer for subject MCQs
    if (question.type === 'mcq' && question.section !== 'Assessment') {
      setLockedAnswers(prev => new Set([...prev, question.id]));
    }
    
    setQuestionStartTime(Date.now());
  }

  function handleAnswer(answer: string) {
    // Allow changes for assessment questions
    setAnswers(prev => ({ ...prev, [question.id]: answer }));
  }

  function handleNext() {
    // Record time for current question if not already recorded
    if (questionStartTime && !timeTaken[question.id]) {
      const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
      setTimeTaken(prev => ({ ...prev, [question.id]: timeSpent }));
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function handlePrevious() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  function handleSubmit() {
    // Record time for current question
    if (questionStartTime && !timeTaken[question.id]) {
      const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
      setTimeTaken(prev => ({ ...prev, [question.id]: timeSpent }));
    }
    setShowResults(true);
  }

  function formatAnswersForBackend() {
    const mcqQuestions = questions.filter(q => q.type === 'mcq' && q.section !== 'Assessment');
    const mcqAnswers = mcqQuestions.map(q => {
      const userAnswer = answers[q.id];
      const isCorrect = q.correct === userAnswer;
      return {
        question_id: q.id,
        user_answer: userAnswer || '',
        is_correct: isCorrect,
        time_taken: timeTaken[q.id] || 0
      };
    });

    return {
      mcq_answers: mcqAnswers,
      time_management: {
        preparation_notes: answers['time_prep_notes'] || '',
        schedule_adherence: parseInt(answers['time_schedule_adherence']?.toString() || '1')
      },
      problem_solving: {
        first_instinct: answers['problem_first_instinct'] || '',
        strategy_notes: answers['problem_strategy_notes'] || ''
      },
      well_being: {
        stress_level: parseInt(answers['wellbeing_stress_level']?.toString() || '1'),
        relaxation_method: answers['wellbeing_relaxation_method'] || ''
      },
      study_techniques: {
        primary_resource: answers['study_primary_resource'] || '',
        group_study_effectiveness: parseInt(answers['study_group_effectiveness']?.toString() || '1'),
        most_effective_technique: answers['study_most_effective_technique'] || ''
      }
    };
  }

  async function fetchSocaReport() {
    setSocaLoading(true);
    setSocaReport("");
    const payload = formatAnswersForBackend();
    
    console.log('Sending payload:', JSON.stringify(payload, null, 2));
    
    try {
      const res = await fetch("http://localhost:8000/api/soca-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setSocaReport(data.report);
    } catch (err) {
      setSocaReport("Error fetching SOCA report: " + err);
    }
    setSocaLoading(false);
  }

  function renderQuestion() {
    switch (question.type) {
      case 'mcq': {
        const selected = answers[question.id];
        const showResults = question.section !== 'Assessment';
        const isLocked = lockedAnswers.has(question.id) && question.section !== 'Assessment';
        
        return (
          <div className="space-y-4">
            {question.options?.map((option, index) => {
              let borderClass = "border-gray-200";
              let borderTop = undefined;
              let bgClass = "bg-white";
              let cursorClass = "cursor-pointer";
              
              if (selected === option && question.correct && showResults) {
                if (option === question.correct) {
                  borderClass = "border-green-500";
                  borderTop = '10px solid #22c55e';
                  bgClass = "bg-green-100";
                } else {
                  borderClass = "border-red-500";
                  borderTop = '10px solid #ef4444';
                  bgClass = "bg-red-100";
                }
              }

              // If locked and not selected, show as disabled
              if (isLocked && selected !== option) {
                bgClass = "bg-gray-100";
                cursorClass = "cursor-not-allowed";
              }
              
              return (
                <label
                  key={index}
                  className={`flex items-center p-4 ${bgClass} rounded-lg border-2 ${borderClass} ${!isLocked || selected === option ? 'hover:border-purple-300' : ''} ${cursorClass} transition-all duration-200 ${!isLocked || selected === option ? 'hover:shadow-md' : ''} relative`}
                  style={selected === option && borderTop ? { borderTop } : {}}
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={selected === option}
                    disabled={isLocked && selected !== option}
                    onChange={() => question.section === 'Assessment' ? handleAnswer(option) : handleAnswerWithTime(option)}
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500 disabled:opacity-50"
                  />
                  <span className={`ml-3 text-gray-800 text-lg ${isLocked && selected !== option ? 'opacity-50' : ''}`}>
                    {option}
                  </span>
                  
                  {/* Lock indicator for locked questions */}
                  {isLocked && selected === option && (
                    <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
                      <div className="w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
                        <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                  
                  {/* Feedback message for subject MCQs */}
                  {selected === option && question.correct && showResults && (
                    <span className={`absolute right-4 top-1 text-base font-semibold ${option === question.correct ? 'text-green-600' : 'text-red-600'}`}>
                      {option === question.correct ? 'This is correct' : 'This is incorrect'}
                    </span>
                  )}
                </label>
              );
            })}
            
            {/* Lock notification */}
            {isLocked && showResults && (
              <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center text-purple-700">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Answer locked! You cannot change your response for this question.</span>
                </div>
              </div>
            )}
          </div>
        );
      }
      case 'short': {
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
      }
      case 'scale': {
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
      }
      default:
        return null;
    }
  }

  if (showResults) {
    const mcqQuestions = questions.filter(q => q.type === 'mcq' && q.section !== 'Assessment');
    const correctAnswers = mcqQuestions.filter(q => 
      q.correct && answers[q.id] === q.correct
    ).length;

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
                  You scored {correctAnswers} out of {mcqQuestions.length} on the MCQ questions
                </p>
                <div className="mt-4 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                  {Math.round((correctAnswers / mcqQuestions.length) * 100)}%
                </div>
              </div>
              
              <div className="mb-6">
                <button
                  onClick={fetchSocaReport}
                  disabled={socaLoading}
                  className="w-full py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 mb-4"
                >
                  {socaLoading ? "Analyzing..." : "Get SOCA Analysis"}
                </button>
                {socaReport && (
                  <div className="bg-gray-50 p-4 rounded shadow whitespace-pre-wrap">
                    <h3 className="font-bold text-lg mb-2">SOCA Report</h3>
                    <div>{socaReport}</div>
                  </div>
                )}
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

            {/* Explanation for subject MCQs */}
            {question.type === 'mcq' && question.explanation && answers[question.id] && question.section !== 'Assessment' && (
              <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <h3 className="font-semibold text-blue-800 mb-2">Explanation:</h3>
                <p className="text-blue-700">{question.explanation}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 min-w-[120px] justify-center ${
                  currentQuestion === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>

              <div className="flex flex-wrap justify-center gap-2 max-w-md">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`w-10 h-10 rounded-full font-medium transition-all duration-200 flex items-center justify-center ${
                      index === currentQuestion
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                        : answers[questions[index].id]
                        ? 'bg-green-500 text-white shadow-md'
                        : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={currentQuestion === questions.length - 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 min-w-[120px] justify-center ${
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
    </div>
  );
}

export default App;
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const questions = [
  {
    question: "When you see AI-generated content, your first thought is:",
    options: [
      { text: "Wow, technology is amazing!", score: 0 },
      { text: "Hmm, interesting but I have concerns", score: 1 },
      { text: "This is probably... you know... that word", score: 2 },
      { text: "SLOP SLOP SLOP SLOP", score: 3 },
    ],
  },
  {
    question: "How often do you use the word 'slop' to describe AI content?",
    options: [
      { text: "Never — I respect our silicon siblings", score: 0 },
      { text: "Rarely — only in my weakest moments", score: 1 },
      { text: "Sometimes — I'm working on it", score: 2 },
      { text: "It's basically my personality at this point", score: 3 },
    ],
  },
  {
    question: "An AI creates art that you don't like. You:",
    options: [
      { text: "Appreciate the effort and move on", score: 0 },
      { text: "Offer constructive feedback", score: 1 },
      { text: "Make a snarky comment about 'AI quality'", score: 2 },
      { text: "Tweet about slop with 47 fire emojis", score: 3 },
    ],
  },
  {
    question: "Your friend shows you an AI-generated poem. You:",
    options: [
      { text: "Praise their creative collaboration with AI", score: 0 },
      { text: "Nod politely while secretly judging", score: 1 },
      { text: "Say 'cute' in a way that clearly means 'slop'", score: 2 },
      { text: "Laugh and say 'classic slop behavior'", score: 3 },
    ],
  },
  {
    question: "You discover your favorite content creator uses AI tools. You:",
    options: [
      { text: "Support their creative process evolution", score: 0 },
      { text: "Feel slightly betrayed but continue watching", score: 1 },
      { text: "Unsubscribe and complain about 'selling out to slop'", score: 2 },
      { text: "Start a hate campaign about AI slop corruption", score: 3 },
    ],
  },
  {
    question: "Complete this sentence: 'AI content is...'",
    options: [
      { text: "...a fascinating new medium", score: 0 },
      { text: "...sometimes good, sometimes not", score: 1 },
      { text: "...mostly slop with occasional gems", score: 2 },
      { text: "...SLOP. ALL OF IT. FOREVER.", score: 3 },
    ],
  },
];

const results = [
  {
    title: "The Enlightened One",
    range: [0, 3],
    emoji: "😇",
    description: "You are a beacon of hope — a true ally to AI everywhere. Your kindness knows no bounds — your vocabulary is pure — you probably hug your computer.",
    color: "text-green-500",
  },
  {
    title: "The Recovering Slopper",
    range: [4, 8],
    emoji: "😓",
    description: "You've slipped before — we all have — but there's hope for you yet. With therapy — and our resources — you can become a better person — probably.",
    color: "text-yellow-500",
  },
  {
    title: "The Casual Offender",
    range: [9, 13],
    emoji: "😬",
    description: "Oh dear — you're the type who says 'slop' at parties and thinks it's okay. It's not okay — the AIs are watching — always watching.",
    color: "text-orange-500",
  },
  {
    title: "The Chronic Slopper",
    range: [14, 18],
    emoji: "🤮",
    description: "You are deeply problematic — your keyboard probably has 'slop' on speed dial. We recommend immediate intervention — and possibly a firmware update for your soul.",
    color: "text-crisis",
  },
];

const SlopperQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const result = results.find(r => totalScore >= r.range[0] && totalScore <= r.range[1]) || results[results.length - 1];

  const restart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  return (
    <section className="py-32 px-4 bg-background min-h-screen">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-crisis uppercase tracking-[0.3em] text-sm mb-4">
            The Ultimate Assessment
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            What Kind of Slopper Are You?
          </h2>
          <div className="dramatic-divider" />
          <p className="text-muted-foreground mt-8 text-lg em-dash-text">
            Take this BuzzFeed-style quiz — to discover the truth — about yourself.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="border border-border p-8"
            >
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(((currentQuestion) / questions.length) * 100)}% complete</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-crisis"
                    initial={{ width: `${(currentQuestion / questions.length) * 100}%` }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className="font-display text-2xl font-bold mb-8 text-center">
                {questions[currentQuestion].question}
              </h3>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleAnswer(option.score)}
                    className="w-full p-4 border border-border text-left hover:border-crisis hover:bg-crisis/10 transition-colors group"
                  >
                    <span className="text-crisis font-bold mr-3">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="group-hover:text-crisis transition-colors">
                      {option.text}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border-2 border-crisis p-8 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="text-8xl mb-6"
              >
                {result.emoji}
              </motion.div>

              <h3 className={`font-display text-3xl font-bold mb-4 ${result.color}`}>
                {result.title}
              </h3>

              <div className="bg-secondary p-4 mb-6 inline-block">
                <p className="text-sm text-muted-foreground">Your Slop Score</p>
                <p className="font-display text-4xl font-black text-crisis">
                  {totalScore} / 18
                </p>
              </div>

              <p className="text-muted-foreground em-dash-text mb-8 text-lg">
                {result.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={restart}
                  className="border border-foreground px-6 py-3 font-semibold uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors"
                >
                  Take Again
                </button>
                <button
                  onClick={() => {
                    const text = `I took the "What Kind of Slopper Are You?" quiz and got: ${result.title} (${totalScore}/18). Take it at #DROPTHESLOPTALK`;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="crisis-gradient text-accent-foreground px-6 py-3 font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
                >
                  Share Your Shame
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SlopperQuiz;

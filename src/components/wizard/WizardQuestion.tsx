"use client";

interface WizardQuestionProps {
  question: string;
  helpText?: string;
  children: React.ReactNode;
  stepNumber: number;
  totalSteps: number;
}

export default function WizardQuestion({
  question,
  helpText,
  children,
  stepNumber,
  totalSteps,
}: WizardQuestionProps) {
  return (
    <div className="animate-fadeIn">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-navy-400 uppercase tracking-wide">
            Question {stepNumber} of {totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-red h-2 rounded-full transition-all duration-500"
            style={{ width: `${(stepNumber / totalSteps) * 100}%` }}
          />
        </div>
      </div>
      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">{question}</h2>
      {helpText && <p className="text-navy-400 mb-6 text-sm">{helpText}</p>}
      <div className="mt-8">{children}</div>
    </div>
  );
}

"use client";

interface WizardOptionProps {
  label: string;
  description?: string;
  onClick: () => void;
  variant?: "default" | "highlighted";
}

export default function WizardOption({
  label,
  description,
  onClick,
  variant = "default",
}: WizardOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200
        hover:shadow-md active:scale-[0.99]
        ${
          variant === "highlighted"
            ? "border-red-200 bg-red-50/30 hover:border-red"
            : "border-gray-200 bg-white hover:border-navy-300"
        }`}
    >
      <span className="font-medium text-lg">{label}</span>
      {description && (
        <span className="block text-sm text-navy-400 mt-1">{description}</span>
      )}
    </button>
  );
}

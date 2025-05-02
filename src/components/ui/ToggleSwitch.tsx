import React from "react";

interface ToggleSwitchProps {
  options: string[];
  value: string;
  onChange: (option: string) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  options,
  value,
  onChange,
}) => {
  const handleToggle = (option: string) => {
    onChange(option);
  };

  return (
    <div className="flex gap-3">
      {options.map((option) => (
        <button
          key={option}
          className={`cursor-pointer rounded-lg px-5 py-3 font-medium shadow-sm transition-all duration-500 ease-in-out sm:text-2xl ${
            value === option
              ? "bg-dark text-light"
              : "text-dark hover:bg-dark/5 bg-white"
          }`}
          onClick={() => handleToggle(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ToggleSwitch;

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
          className={`cursor-pointer rounded-[20px] px-5 py-3 shadow-sm transition-all duration-500 ease-in-out sm:text-2xl ${
            value === option
              ? "bg-dark text-light"
              : "text-dark bg-white hover:bg-dark/5"
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

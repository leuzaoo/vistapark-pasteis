import { MinusIcon, PlusIcon } from "lucide-react";
import React from "react";

interface Props {
  increase: () => void;
  decrease: () => void;
  disabled: boolean;
  quantity: number;
  isZero: boolean;
}

const AddRemoveButton = ({
  decrease,
  increase,
  disabled,
  quantity,
  isZero,
}: Props) => {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={decrease}
        disabled={disabled}
        className={`bg-dark/15 cursor-pointer rounded-l-sm p-1 transition-all duration-500 ease-in-out ${isZero ? "opacity-30" : "hover:bg-dark/30"}`}
      >
        <MinusIcon size={20} />
      </button>
      <span className="px-2">{quantity}</span>
      <button
        onClick={increase}
        className="bg-dark/15 hover:bg-dark/30 cursor-pointer rounded-r-sm p-1 transition-all duration-500 ease-in-out"
      >
        <PlusIcon size={20} />
      </button>
    </div>
  );
};

export default AddRemoveButton;

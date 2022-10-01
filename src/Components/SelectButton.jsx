import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#00052e] text-[#a1abff] border-2 border-[#a1abff] rounded-md px-[40px] py-[15px] hover:bg-[#a1abff] hover:text-[#00052e]"
    >
      {children}
    </button>
  );
};

export default SelectButton;

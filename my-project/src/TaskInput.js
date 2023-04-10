import React from "react";

const TaskInput = ({ inputValue, handleInputChange, handleAddTodo }) => {
  return (
    <div className="flex">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="w-full font-sans font-semibold rounded-md border-0 py-3 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6"
        placeholder="Enter Task"
      />
      <button
        className="ml-4 i font-semibold text-white h-12 w-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded shadow-2xl cursor-pointer overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out rounded"
        onClick={handleAddTodo}
      >
        Add
      </button>
    </div>
  );
};

export default TaskInput;

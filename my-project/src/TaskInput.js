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
        className="ml-4 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddTodo}
      >
        Add
      </button>
    </div>
  );
};

export default TaskInput;

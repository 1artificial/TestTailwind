import React from "react";

function TaskInput({
  inputValue,
  handleInputChange,
  handleAddTodo,
  inputPriority,
  handlePriorityChange,
}) {
  return (
    <div className="flex">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="lg:w-full font-sans font-semibold rounded-md border-0 py-3 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6"
        placeholder="Enter Task"
      />
      <select
        value={inputPriority}
        onChange={handlePriorityChange}
        className="lg:w-24 font-sans font-semibold border text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block ml-2 p-2 dark:bg-white dark:border-neutral-300 dark:placeholder-neutral-900 dark:text-neutral-900 dark:focus:ring-orange-500 dark:focus:border-orange-500"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        className="ml-2 i font-semibold text-white h-12 w-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg   shadow-2xl cursor-pointer overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out rounded"
        onClick={handleAddTodo}
      >
        Add
      </button>
    </div>
  );
}

export default TaskInput;

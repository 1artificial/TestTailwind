import React from "react";

function TodoList({
  todos,
  handleEditTodoText,
  handleRemoveTodo,
  handleAddSubNote,
  handleEditSubNoteText,
  handleRemoveSubNoteText,
}) {
  const getTaskColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-yellow-600";
      case "low":
      default:
        return "text-green-600";
    }
  };

  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <div key={index}>
          <div className="due-date text-sm text-gray-500">
            Due: {todo.dueDate}
          </div>
          <input
            type="text"
            placeholder="Click to edit task"
            className={`mt-3 w-5/6 h-10 font-sans font-semibold rounded-md border-0 py-3 pl-3 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6 ${getTaskColor(
              todo.priority
            )}`}
            value={todo.text}
            onChange={(event) => handleEditTodoText(index, event.target.value)}
          />
          <button
            className=" h-10 mt-2 ml-2 add-note-btn text-orange-700 border border-orange-700 hover:bg-orange-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-orange-500 dark:text-orange-500 dark:hover:text-white dark:focus:ring-orange-800 dark:hover:bg-orange-500"
            onClick={() => handleRemoveTodo(index)}
          >
            Remove
          </button>
          <button
            type="button"
            className="h-10 block mt-2 text-orange-700 border border-orange-700 hover:bg-orange-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-orange-500 dark:text-orange-500 dark:hover:text-white dark:focus:ring-orange-800 dark:hover:bg-orange-500"
            onClick={() => handleAddSubNote(index)}
          >
            +
          </button>
          <ul>
            {todo.subNotes.map((subNote, subNoteIndex) => (
              <li key={`${todo.text}-${subNoteIndex}`}>
                <input
                  placeholder="Click to add a note"
                  className="h-10 mt-2 w-4/5 font-sans font-semibold rounded-md h-11 border-0 py-3 pl-3 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6 break-words"
                  type="text"
                  value={subNote}
                  onChange={(event) =>
                    handleEditSubNoteText(
                      index,
                      subNoteIndex,
                      event.target.value
                    )
                  }
                />
                <button
                  className="h-10 ml-2 text-orange-700 border border-orange-700 hover:bg-orange-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-orange-500 dark:text-orange-500 dark:hover:text-white dark:focus:ring-orange-800 dark:hover:bg-orange-500"
                  onClick={() => handleRemoveSubNoteText(index, subNoteIndex)}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default TodoList;

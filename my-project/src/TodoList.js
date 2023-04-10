import React from "react";

const TodoList = ({
  todos,
  handleEditTodoText,
  handleRemoveTodo,
  handleAddSubNote,
  handleEditSubNoteText,
  handleRemoveSubNoteText,
}) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index} className="mb-4">
          <input
            type="text"
            placeholder="Click to edit task"
            className="mt-2 w-full font-sans font-semibold rounded-md h-11 border-0 py-3 pl-3 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6 break-words"
            value={todo.text}
            onChange={(event) => handleEditTodoText(index, event.target.value)}
          />
          <button
            className="block mt-2 add-note-btn text-orange-700 border border-orange-700 hover:bg-orange-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-orange-500 dark:text-orange-500 dark:hover:text-white dark:focus:ring-orange-800 dark:hover:bg-orange-500"
            onClick={() => handleRemoveTodo(index)}
          >
            Remove
          </button>
          <button
            type="button"
            className="block mt-2 text-orange-700 border border-orange-700 hover:bg-orange-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-orange-500 dark:text-orange-500 dark:hover:text-white dark:focus:ring-orange-800 dark:hover:bg-orange-500"
            onClick={() => handleAddSubNote(index)}
          >
            +
          </button>
          <ul>
            {todo.subNotes.map((subNote, subNoteIndex) => (
              <li key={subNoteIndex} className="note-container">
                <input
                  placeholder="Click to add a note"
                  className="mt-2 w-4/5 font-sans font-semibold rounded-md h-11 border-0 py-3 pl-3 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6 break-words"
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
                  className="ml-2 text-orange-700 border border-orange-700 hover:bg-orange-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-orange-500 dark:text-orange-500 dark:hover:text-white dark:focus:ring-orange-800 dark:hover:bg-orange-500"
                  onClick={() => handleRemoveSubNoteText(index, subNoteIndex)}
                >
                  x
                </button>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

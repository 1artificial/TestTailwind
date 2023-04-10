// main.js
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { db } from "./firebase";
import TaskCalendar from "./TaskCalendar";

function Main() {
  const { user, isAuthenticated } = useAuth0();
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);

  async function saveTodosToFirestore(userId, todos, date) {
    try {
      await db
        .collection("users")
        .doc(userId)
        .collection("dates")
        .doc(date)
        .set({
          todos: todos,
        });
      console.log("Todos saved to Firestore");
    } catch (error) {
      console.error("Error saving todos to Firestore:", error);
    }
  }

  async function loadTodosFromFirestore(userId, date) {
    try {
      const docRef = db
        .collection("users")
        .doc(userId)
        .collection("dates")
        .doc(date);
      const doc = await docRef.get();
      if (doc.exists) {
        setTodos(doc.data().todos);
      } else {
        console.log("No todos found for this user on the selected date");
        setTodos([]);
      }
    } catch (error) {
      console.error("Error loading todos from Firestore:", error);
    }
  }

  useEffect(() => {
    if (isAuthenticated && selectedDates.length > 0) {
      loadTodosFromFirestore(
        user.sub,
        selectedDates[0].toISOString().split("T")[0]
      );
    }
  }, [isAuthenticated, user, selectedDates]);

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  async function handleAddTodo() {
    if (inputValue === "") {
      return;
    }

    const newTodo = { text: inputValue, completed: false, subNotes: [] };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setInputValue("");
    await saveTodosToFirestore(
      user.sub,
      newTodos,
      selectedDates[0].toISOString().split("T")[0]
    );
  }

  async function handleRemoveTodo(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    await saveTodosToFirestore(
      user.sub,
      newTodos,
      selectedDates[0].toISOString().split("T")[0]
    );
  }

  async function handleEditTodoText(index, newText) {
    const newTodos = [...todos];
    newTodos[index].text = newText;
    setTodos(newTodos);
    await saveTodosToFirestore(
      user.sub,
      newTodos,
      selectedDates[0].toISOString().split("T")[0]
    );
  }

  async function handleAddSubNote(index) {
    const newTodos = [...todos];
    newTodos[index].subNotes.push("");
    setTodos(newTodos);
    await saveTodosToFirestore(
      user.sub,
      newTodos,
      selectedDates[0].toISOString().split("T")[0]
    );
  }

  async function handleEditSubNoteText(todoIndex, subNoteIndex, newText) {
    const newTodos = [...todos];
    newTodos[todoIndex].subNotes[subNoteIndex] = newText;
    setTodos(newTodos);
    await saveTodosToFirestore(
      user.sub,
      newTodos,
      selectedDates[0].toISOString().split("T")[0]
    );
  }

  async function handleRemoveSubNoteText(todoIndex, subNoteIndex) {
    const newTodos = [...todos];
    newTodos[todoIndex].subNotes.splice(subNoteIndex, 1);
    setTodos(newTodos);
    await saveTodosToFirestore(
      user.sub,
      newTodos,
      selectedDates[0].toISOString().split("T")[0]
    );
  }

  function handleSelectedDatesChange(dates) {
    setSelectedDates(dates);
  }

  return (
    isAuthenticated && (
      <div className="main-container">
        <TaskCalendar onDateSelect={(dates) => setSelectedDates(dates)} />

        <div className="inline-block ml-24 mr-0 pr-0 ">
          <div className="flex pr-0 mr-0">
            <div className="relative mt-auto rounded-md shadow-sm inline-flex pr-0 mr-0">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pr-0 mr-2">
                <span className="text-gray-500 base:text-base mr-2">🐱</span>
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                name="price"
                id="price"
                className="w-80 font-sans font-semibold rounded-md border-0 py-3 pl-10 mr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6"
                placeholder="Enter Task"
              />
            </div>
            <button
              className="mt-32 ml-0 bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded self-end"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
          <div className="block ml-8 mr-0 mt-2">
            <div className="flex">
              <div className="relative mt-auto rounded-md shadow-sm flex-1 mr-2">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
                <ul>
                  {todos.map((todo, index) => (
                    <li key={index} className="mb-10 mr-4">
                      <input
                        type="text"
                        placeholder="Click to edit task"
                        className="w-80 font-sans font-semibold rounded-md h-11 border-0 py-3 pl-3 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-200 sm:text-sm sm:leading-6 break-words"
                        value={todo.text}
                        onChange={(event) =>
                          handleEditTodoText(index, event.target.value)
                        }
                      />
                      <button
                        className=" ml-2 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                        onClick={() => handleRemoveTodo(index)}
                      >
                        <span class=" font-bold text-gray-900 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                          Remove
                        </span>
                      </button>
                      <button
                        type="button"
                        className="add-note-btn text-orange-700 border border-orange-700 hover:bg-orange-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-orange-500 dark:text-orange-500 dark:hover:text-white dark:focus:ring-orange-800 dark:hover:bg-orange-500"
                        onClick={() => handleAddSubNote(index)}
                      >
                        +
                      </button>
                      <div className="div1">
                        <div className="flex">
                          <div className="relative mt-auto rounded-md shadow-sm flex-1 mr-2">
                            <div className="absolute inset-y-0 left-0 top-3 flex items-center pl-3">
                              <ul>
                                {todo.subNotes.map((subNote, subNoteIndex) => (
                                  <li
                                    key={subNoteIndex}
                                    className="note-container"
                                  >
                                    <input
                                      className="inputs"
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
                                      className="buttonIcons"
                                      onClick={() =>
                                        handleRemoveSubNoteText(
                                          index,
                                          subNoteIndex
                                        )
                                      }
                                    >
                                      x
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Main;

// main.js
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { db } from "./firebase";
import TaskCalendar from "./TaskCalendar";
import TaskInput from "./TaskInput";
import TodoList from "./TodoList";

function Main() {
  const { user, isAuthenticated } = useAuth0();
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedDates, setSelectedDates] = useState([]);
  const [inputPriority, setInputPriority] = useState("low");

  function handlePriorityChange(event) {
    setInputPriority(event.target.value);
  }

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

  function sortTasksByPriority(todos) {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return todos
      .slice()
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  async function handleAddTodo() {
    if (inputValue === "") {
      return;
    }

    const newTodo = {
      text: inputValue,
      completed: false,
      subNotes: [],
      priority: inputPriority,
    };
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

  // function handleSelectedDatesChange(dates) {
  //   setSelectedDates(dates);
  // }

  //<TaskCalendar onDateSelect={(dates) => setSelectedDates(dates)} />

  return (
    isAuthenticated && (
      <div className="main-container mt-12">
        <div className="flex justify-between w-full 64-7xl mx-auto ">
          <div className="lg:ml-36 w-4/5 lg:p-4 p-2 pt-4">
            <TaskInput
              inputValue={inputValue}
              handleInputChange={handleInputChange}
              handleAddTodo={handleAddTodo}
              inputPriority={inputPriority}
              handlePriorityChange={handlePriorityChange}
            />
            <TodoList
              todos={sortTasksByPriority(todos)}
              handleEditTodoText={handleEditTodoText}
              handleRemoveTodo={handleRemoveTodo}
              handleAddSubNote={handleAddSubNote}
              handleEditSubNoteText={handleEditSubNoteText}
              handleRemoveSubNoteText={handleRemoveSubNoteText}
            />
          </div>
          <div className="lg:w-2/5 lg:p-4 invisible lg:visible">
            <TaskCalendar onDateSelect={(dates) => setSelectedDates(dates)} />
          </div>
        </div>
      </div>
    )
  );
}

export default Main;

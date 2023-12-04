"use client";

import todoss from "./todos.module.css";
import React, { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
}

const Main = () => {
  
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>(
    typeof window !== "undefined" ? localStorage.getItem("inputValue") || "" : ""
  );
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedTodos = JSON.parse(
      localStorage.getItem("todos") || "[]"
    ) as Todo[];
    setTodos(storedTodos);
  }, [mounted]);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("inputValue", inputValue);
  }, [inputValue]);

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateTodo = (id: number, newText: string) => {
    const trimmedText = newText.trim();
    if (trimmedText !== "" || newText === "") {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, text: trimmedText } : todo
      );
      setTodos(updatedTodos);
    } else {
      console.warn("Попередження: не можна зберігати порожній текст.");
    }
  };
  
  

  return (
    <div className={todoss.todo}>
      <h1 className={todoss.logo}>Todo List</h1>
      <div className={todoss.input}>
        <input
          required
          placeholder="Add a task"
          className={todoss.inputs}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
     
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div className={todoss.delete}>
              <input
                placeholder="Leave a task here"
                className={todoss.inputs}
                type="text"
                required
                value={todo.text}
                onChange={(e) => updateTodo(todo.id, e.target.value)}
              />
              <button
                className={todoss.button}
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;

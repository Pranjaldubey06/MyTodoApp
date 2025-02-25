import React, { useState, useEffect } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { FiSun, FiMoon } from "react-icons/fi"; 

const TodoForm = () => {
  const [initial, setInitial] = useState("");
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedText, setSelectedText] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("todos")) || [];
    setData(savedData);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(data));
  }, [data]);


  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const getInput = (e) => {
    setInitial(e.target.value);
  };

  const openModal = (text) => {
    setSelectedText(text);
  };

  const handleTask = () => {
    if (initial.trim() === "") return;

    if (editIndex !== null) {
      const updatedData = data.map((item, index) =>
        index === editIndex ? { ...item, text: initial } : item
      );
      setData(updatedData);
      setEditIndex(null);
    } else {
      setData([...data, { text: initial, completed: false }]);
    }
    setInitial("");
  };

  const deleteTask = (index) => {
    const filteredData = data.filter((_, id) => id !== index);
    setData(filteredData);
  };

  const editTask = (index) => {
    setInitial(data[index].text);
    setEditIndex(index);
  };

  const clearAllTasks = () => {
    setData([]);
    localStorage.removeItem("todos");
  };

  const handleCheckboxChange = (index) => {
    const updatedData = data.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setData(updatedData);
  };

  return (
    <div className={`flex flex-col justify-center items-center min-h-screen transition-all duration-300 ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-yellow-50 text-black"
    }`}>
      
    
      <button
        className="absolute top-4 right-4 p-2 bg-gray-700 text-white rounded-full shadow-md hover:bg-gray-600 transition"
        onClick={toggleTheme}
      >
        {theme === "light" ? <FiMoon size={24} /> : <FiSun size={24} />}
      </button>

      <div className={`shadow-2xl rounded-lg p-6 w-full max-w-md transition-all duration-300 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}>
        
        {selectedText && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
            <div className={`p-6 rounded-lg max-w-md w-full max-h-[80vh] overflow-auto ${
              theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}>
              <p className="break-words whitespace-pre-wrap">{selectedText}</p>
              <button
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => setSelectedText(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-semibold text-center mb-4">Todo List</h2>

        <div className="flex space-x-3">
          <input
            type="text"
            onChange={getInput}
            className={`flex-1 px-4 py-2 bg-gray-100 rounded-md transition  ${
              theme === "dark" ? "bg-gray-700 text-white border-gray-500" : "text-black"
            }`}
            placeholder="Enter Your Task"
            value={initial}
          />
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            onClick={handleTask}
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        <div className="mt-4 space-y-2">
          {data.map((curVal, index) => (
            <div
              key={index}
              className={`flex justify-between items-center px-4 py-2 rounded-lg shadow-sm transition ${
                curVal.completed ? "bg-green-200 dark:bg-green-700" : theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 "
              }`}
            >
              <input
                type="checkbox"
                checked={curVal.completed}
                onChange={() => handleCheckboxChange(index)}
                className="cursor-pointer"
              />
              <p
                className={`flex-1 truncate overflow-hidden break-words cursor-pointer ${
                  curVal.completed ? "line-through text-gray-500" : "light:text-black dark:text-white"
                }`}
                onClick={() => openModal(curVal.text)}
              >
                {curVal.text}
              </p>

              <div className="flex space-x-3">
                <MdEdit
                  className="cursor-pointer text-blue-600"
                  size={24}
                  onClick={() => editTask(index)}
                />
                <RiDeleteBin6Line
                  className="cursor-pointer text-red-500 hover:text-red-400"
                  size={24}
                  onClick={() => deleteTask(index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg w-auto"
        onClick={clearAllTasks}
      >
        Clear All
      </button>
    </div>
  );
};

export default TodoForm;

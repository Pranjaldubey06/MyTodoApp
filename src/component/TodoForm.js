import React, { useState,useEffect } from "react";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const TodoForm = () => {
  const [initial, setInitial] = useState(""); 
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null); 

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("todos")) || [];
    setData(savedData);
  }, []);

  // Update localStorage whenever the data changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(data));
  }, [data]);
  
  const getInput = (e) => {
    setInitial(e.target.value);
  };

  
  const handleTask = () => {
    if (editIndex !== null) {
      
      const updatedData = data.map((item, index) =>
        index === editIndex ? initial : item
      );
      setData(updatedData);
      setEditIndex(null); 
    } else {
      
      setData([...data, initial]);
    }
    setInitial(""); 
  };


  const deleteTask = (index) => {
    const filteredData = data.filter((_, id) => id !== index);
    setData(filteredData);
  };


  const editTask = (index) => {
    setInitial(data[index]); 
    setEditIndex(index); 
  };

  return (
    <>
      <div className="bg-gray-950 mt-12 h-72 w-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold border rounded-lg border-transparent">
        <input
          type="text"
          onChange={getInput}
          className="mt-3 ml-3 h-10 w-72 border-rounded-xl font-normal border-r-white bg-white text-black border rounded-xl"
          placeholder="Enter Your ToDo"
          value={initial}
        />
        <button
          type="button"
          className="ml-2 h-10 w-18 text-xl bg-gradient-to-r from-blue-700 to-purple-800 border rounded-xl"
          onClick={handleTask}
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
        <div>
          {data.map((curVal, index) => (
            <div
              key={index}
              className="text-white text-xl ml-3 mr-3 justify-between flex font-normal bg-gradient-to-r from-blue-700 to-purple-800 mt-4 border rounded-l m-4 h-8"
            >
              <p className="ml-2">{curVal}</p>
              <MdEditSquare
                className="text-white cursor-pointer"
                size={28}
                onClick={() => editTask(index)}
              />
              <MdDelete
                className="text-white cursor-pointer "
                size={28}
                onClick={() => deleteTask(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoForm;

import { useState } from "react";
import Main from "./component/Main";
import TodoForm from "./component/TodoForm";
const App = () => {

//   const[todos ,setTodos]=useState([]);
 

    return (
     
      <div className= "App">
       
       <Main/>
       <TodoForm/>
      </div>
    );  };
  
  export default App;
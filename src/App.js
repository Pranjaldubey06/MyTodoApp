// import { useState } from "react";
import Main from "./component/Main";
import TodoForm from "./component/TodoForm";
// import GetApi from "./component/GetApi";
const App = () => {

  // const[todos ,setTodos]=useState([]);
 

    return (
     
      <div className= "App">
       
        <Main/>
     <TodoForm/> 

{/* <GetApi/> */}

      </div>
    );  };
  
  export default App;
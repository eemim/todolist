import React, { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TodoList from "./TodoList"

function TabApp() {

    const [value, setValue] = useState('home');
    const handleChange = (event, value) => {
        setValue(value);
    };

  return(
    
    <div>
        <Tabs value={value} onChange={handleChange} centered>
           <Tab value="home" label="HOME" />
           <Tab value="todos" label="TODOS" />  
        </Tabs>
        {value === 'home' && <div class = "homepage">
          <h1>Welcome to Todolist app!</h1>
          <h2>Click the Todo tab to write down your important todos</h2>
        </div>}
        {value === 'todos' && <div><TodoList /></div>}
  </div>
);}
export default TabApp;

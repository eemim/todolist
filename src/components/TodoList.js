import React, { useRef, useState } from "react";
// import TodoTable from './TodoTable';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import fi from "date-fns/locale/fi";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, parseISO } from "date-fns";


function Todolist() {
  const [date, setDate] =  useState(new Date().toISOString());
  const [todo, setTodo] = useState({ desc: ``, date: ``, priority: `` });
  const [todos, setTodos] = useState([]);
 

  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };
  
  // const removeTodo = (index) => {
  //  const newTodos = todos.filter((_,i) => i !== index)
  //   setTodos(newTodos);
  // }

  const addTodo = (event) => {
    event.preventDefault();
    setTodos([...todos, { ...todo, date: format(parseISO(date), 'dd.MM.yyyy') }]);
    
  };

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (_, index) =>
            index !== gridRef.current.getSelectedNodes()[0].childIndex
        )
      );
    } else {
      alert("Select row first");
    }
  };

  const columns = [
    { headerName: "Date", field: "date", sortable: true, filter: true },
    { headerName: "Description", field: "desc", sortable: true, filter: true },
    {
      headerName: "Priority",
      field: "priority",
      sortable: true,
      filter: true,
      cellStyle: (params) => {
        if (params.value === "High") {
          return { color: "red" };
        } else if (params.value === "Medium") {
          return { color: "orange" };
        }
        return null;
      },
    },
  ];
  
  return (

    <div className="App">
      <header className="App-header">
        <h1>Todolist</h1>
      </header>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">

      <DatePicker
            minDate={new Date()}
            value={parseISO(date)}
            onChange={(newDate) => setDate(newDate.toISOString())}
          />
    
        <TextField
          label="Description"
          variant="standard"
          name="desc"
          value={todo.desc}
          onChange={inputChanged}
        />
        <TextField
          label="Priority"
          variant="standard"
          name="priority"
          value={todo.priority}
          onChange={inputChanged}
        />
        <Button onClick={addTodo} variant="contained" color ="success">Add</Button>
        <Button onClick={deleteTodo} variant="contained" color="error">Delete</Button>
      </Stack>
      {/* <TodoTable todos={todos}/> */}
      <div
        className="ag-theme-material"
        style={{
          height: "700px",
          width: "80%",
          margin: "auto",
        }}
      >
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowSelection="single"
          columnDefs={columns}
          rowData={todos}
          animateRows={true}
        ></AgGridReact>
      </div>
      </LocalizationProvider>
    </div>
  );
}
export default Todolist;

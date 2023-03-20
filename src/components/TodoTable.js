import React from "react";

export default function Todotable(props) {
  return (
    <div>
      <table>
        <tbody>
          {props.todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.date}</td>
              <td>{todo.desc}</td>
              <td>{todo.priority}</td>
              <td>
                <button onClick={() => props.removeTodo(index)}> Delete </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

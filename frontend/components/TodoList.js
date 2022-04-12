import React from 'react';
import Todo from './Todo';

export default class TodoList extends React.Component {
  render() {
    // console.log(todo.id)
    return (
      <ul>
        {this.props.todos.map(todo => {
          return <Todo clickCompleted={this.props.clickCompleted} key={todo.id} todoMod={todo} />
        })}
      </ul>
    )
  }
}

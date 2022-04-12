import React from 'react'

export default class Todo extends React.Component {
  render() {
    // console.log(this.props.todoMod.id)
    return (
      <li onClick={() => this.props.clickCompleted(this.props.todoMod.id)}>{this.props.todoMod.name} {this.props.todoMod.completed ? " ✔️" : ""}</li>
    )
  }
}

import React from 'react';
import Form from './Form';
import TodoList from './TodoList';
import Todo from './Todo';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    }
  }

  getData = (e) => {
    axios.get(URL)
    .then(res => {
      this.setState({
        ...this.state,
        data: res.data.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  componentDidMount() {
    return this.getData()
  }

  render() {
    console.log(this.state.data)
    return (
      <div className='App'>
        <h1>Todos:</h1>
        <TodoList todos={this.state.data} />
      </div>
    )
  }
}

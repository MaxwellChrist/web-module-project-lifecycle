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
      initialName: "",
      initialCompleted: false,
      initialError: "no error :)",
    }
  }

  handleChange = event => {
    const goal = event.target.value
    this.setState({
      ...this.state,
      initialName: goal,
    })
    // console.log(this.state.initialName)
  }
  

  addItem = (e) => {
    e.preventDefault()
    axios.post(URL, {
      name: this.state.initialName
    })
    .then(res => {
      console.log("post request:", res)
      this.setState({
        ...this.state,
        data: [...this.state.data, res.data.data],
        initialName: "",
      })
    })
    .catch(err => {
      console.log(err)
    })
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
      console.log(err.message)
      this.setState({
        ...this.state,
        initialError: err.message,
      })
    })
  }

  clickCompleted = (id) => {
    axios.patch(`${URL}/${id}`)
    .then(res => {  
      console.log(res.data.data);
      this.setState({
        ...this.state,
        data: this.state.data.map(item => {
          if (id === item.id) {
            return res.data.data
          } else {
            return item
          }
        })
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  hide = () => {
    console.log(this.state.data)
    this.setState({
      ...this.state,
      data: this.state.data.filter(item => {
        return (
          item.completed ? "" : item
        )
      })
    })
  }

  componentDidMount() {
    return this.getData()
  }

  render() {
    // console.log(this.state.data)
    return (
      <div className='App'>
        <h4 className="displayError">Error {this.state.initialError}</h4>
        <h1>Todos:</h1>
        <TodoList clickCompleted={this.clickCompleted} todos={this.state.data} />
        <Form addItem={this.addItem} 
          handleChange={this.handleChange} 
          initialName={this.state.initialName}
        />
        <button onClick={this.hide}>Hide Completed</button>
      </div>
    )
  }
}

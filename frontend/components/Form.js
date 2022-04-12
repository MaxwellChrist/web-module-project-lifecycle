import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
    <form onSubmit={this.props.addItem}>
      <input
        type="text"
        name="data"
        value={this.props.initialName}
        onChange={this.props.handleChange}
      />
      <button>Submit</button>
    </form>
    )
  }
}

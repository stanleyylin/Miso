import React from 'react'

class DemoContainer extends React.Component {
  state = {
    todos: [
      {
        id: 1,
        title: "Setup development environment",
        completed: true
      },
      {
        id: 2,
        title: "Develop website and add content",
        completed: false
      },
      {
        id: 3,
        title: "Deploy to live server",
        completed: false
      }
    ]
   };
   
  render() {
    return (
      <div>
        <h1>Hello</h1>
        <p>from Container</p>
      </div>
    )

  }

}

export default DemoContainer

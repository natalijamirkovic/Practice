import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      instructors: [
        {
          name: "Tim",
          hobbies: ["sailing", "react"]
        }, {
          name: "Matt",
          hobbies: ["math", "d3"]
        }, {
          name: "Colt",
          hobbies: ["css", "hiking"]
        }, {
          name: "Elie",
          hobbies: ["music", "running"]
        }
      ]
    };
    this.renderInstructors = this.renderInstructors.bind(this);

    setTimeout(() => {
      const randomInst = Math.floor(Math.random() * this.state.instructors.length);
      const hobbyIndex = Math.floor(Math.random() * this.state.instructors[randomInst].length
    );

      const instructors = this.state.instructors.map((inst, i) => {
        if (i === randomInst) {
          const hobbies = [...inst.hobbies];
          hobbies.splice(hobbyIndex, 1);
          return {
            ...inst,
            hobbies
          };
        }
        
        return inst;
      });
      this.setState({instructors});
    }, 2000);
  }


  renderInstructors() {
    return this.state.instructors.map((instructor, index) => {
      return <li key={index}>
        <h3>{instructor.name}</h3>
        <h4>Hobbies:{instructor.hobbies.join(", ")}</h4>
      </li>
    });
  }


  render() {
    // const instructors = this.state.instructors.map((instructor, index) => {
    //   <li key={index}>
    //     <h3>{instructor.name}</h3>
    //     <h4>Hobbies:{instructor.hobbies.join(", ")}</h4>
    //   </li>
    // });
    return (
      <div className="App">
        <ul>
          {/* {instructors} */}
          {this.renderInstructors()}
        </ul>
      </div>
    );
  }
}

export default App;

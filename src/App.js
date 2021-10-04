import React, { Component } from 'react';
import Gettext from './Gettext';
import TypingField from './TypingField';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minute: 60,
      topic: '',
    };
}

handleChangeMint = (event) => {
  this.setState({minute: event.target.value});
}
handleChangeTop = (event) => {
   this.setState({topic: event.target.value});
}

handleSubmit = (e) => {
   e.preventDefault();
   document.getElementById('typingSpeed').style.display = 'block';
   document.getElementById('typing0').style.display = 'none'; 
 }

  render() {
    return (
    <div>
             <div className = 'typing-front-page'  id = 'typing0'>
               <div className = 'container pt-5 pb-5' >
                   <div className = 'front-page-body text-center'> 
                        <div className = 'front-page-heading '> 
                            <h1>Check your typing skills in 60 seconds</h1>
                            <p>Type away to join 150+ million test takers!</p>
                        </div>
                        <div className = 'typing-time-selection mt-5 mb-5'>
                        <form onSubmit={this.handleSubmit}>
                            <div className = 'typing-in-minutes'>
                                <img className = 'clockimage' src={('./image/clock.png')}  width = '70px'/>
                                <select name="minutes" onChange={this.handleChangeMint} className = 'typing-select'>
                                    <option  value="60">1 Minute Test</option>
                                    <option value="120">2 Minutes Test</option>
                                    <option value="300">5 Minutes Test</option>
                                </select>
                            </div>
                            <div className = 'typing-in-type'>
                                <img className = 'fileimage' src={('./image/file.png')}  width = '70px'/>
                                <select name="type"  className = 'typing-select' onChange={this.handleChangeTop}>
                                    <option value="cat">Text about Cat</option>
                                    <option value="dog">Text about Dog</option>
                                    <option value="elephant">Text about Elephant</option>
                                    <option value="ants">Text about Ants</option>
                                    <option value="stars">Text about Stars</option>
                                    <option value="apple">Text about Apple</option>
                                    <option value="sky">Text about Sky</option>
                                    <option value="people">Text about People</option>
                                    <option value="country">Text about Countries</option>
                                    <option value="education">Text about Education</option>
                                </select>
                            </div>
                           <input type="submit" value = 'START TEST' className="btn-button mt-5" />
                      </form>
                        </div>
                   </div>
               </div>
            </div>
            <div id = 'typingSpeed'>
                   <TypingField minute = {this.state.minute}  topic = {this.state.topic} />
            </div>   
                  <div style = {{display:'none'}}> <Gettext topic = {this.state.topic}/>   </div> 
   </div>
    );
  }
}

export default App;
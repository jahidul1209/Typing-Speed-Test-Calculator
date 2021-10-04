import React from 'react';
const onCloseBtn = () =>{
    window.location.reload()
  }
const TestScore = (props) => {

    return (
        <div className = 'text-score'>
            <div className = 'container mt-5 mb-5'> 
             <div className = 'score-field-all text-center'>
                      <h1> Your Test Score </h1>
                  <div className = 'score-field mt-5'>
                     <div className = 'typing-score'>
                        <div className = 'typing-score-wpm'>
                         <span className = 'tying-value'>{props.wpm}</span>  <h2>WPM </h2>
                        </div>
                        <label>Typing Speed</label>
                     </div> 
                     <span className="close-score" >&#x2573; </span>
                     <div className = 'typing-score'>
                        <div className = 'typing-score-accuracy'>
                           <span className = 'tying-value'> { isNaN(props.accuracy)  ? '0' : props.accuracy} %</span> 
                           <h2>{props.typos } typos </h2>
                        </div>
                        <label>Accuracy</label>
                     </div> 
                     <span className="close-score" >&#61;</span>
                     <div className = 'typing-score'>
                        <div className = 'typing-score-result'>
                           <span className = 'tying-value'>{props.wpm * (props.accuracy/100)} </span> <h2> WPM  </h2>
                        </div>
                        <label>Net Speed</label>
                     </div> 
                </div>
                <button className="btn btn-info mt-5"  onClick={onCloseBtn}>Choose a new topic</button>
            </div>
        </div>
        </div>
    );
};

export default TestScore;
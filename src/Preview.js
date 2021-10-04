import React from 'react';

export default (props) => {
     const text = props.text.split('');
     return (
      <div className="borders rounded p-3 mb-4" id = 'priview'>
        {
          text.map((s,i) => {
            let color;
            if (i < props.userInput.length) {
              color = s === props.userInput[i] ? '#1eff95'  : '#ff5454';
            }
            return <span className = 'typingWord' key={i} style={{color: color }}>{s}</span>
  
          })
        }
      </div>
    )
}
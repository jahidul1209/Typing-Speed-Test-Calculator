import React, { Component } from 'react';
import Preview from './Preview';
import  Gettext from './Gettext';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import TestScore from './TestScore';


var audio = new Audio('./sound.wav');
const initialState = {
  text : Gettext(),
  userInput: '',
  symbols: 0,
  symbolsNormal: 0,
  error: 0,
  sec: 0,
  secPro: 0,
  WPM: 0,
  CPM: 0,
  round: 0,
  topic: 0,
  incorrect: 0,
  correct: 0,
  character: 0,
  count: 0,
  count1: 0,
  timeRemaining: 0,
  started: false,
  finished: false,
  tabHide: false,
  pixal: 25,
}

class TypingField extends Component {

  constructor(props) {
    super(props)
    this.state = initialState
  }
  componentDidMount(){
      this.onUserInputNormal()
      document.querySelector('.calculated').disabled = true 
      document.querySelector('.calculated2').disabled = true 
  }

  onRestart = () => {
    this.setState(initialState)
    this.setState({round: this.state.round + 1})
  }

  onUserInputNormal =() =>{
    const typingDiv = document.getElementById('typingDiv')
    const pixal = this.state.pixal;
    this.setState({ pixal:  pixal });

     const text =  this.state.text
      const character = text.split('').map((char) =>{
          const span = document.createElement('span');
          span.setAttribute('class' , 'typingWord');
          if(typingDiv){
              span.innerText = char;
              typingDiv.appendChild(span)
          }
          return span
      });

      let cursorIndex = 0;
      let  index = 0;
      let cursorChars = character[cursorIndex];
      cursorChars.classList.add('cursor');

      document.addEventListener('keydown' , ({ key})=>{
        this.setState({tabHide: true})
        if(!this.state.finished){
          if(key === cursorChars.innerText){
              cursorChars.classList.remove('cursor');
              cursorChars.classList.add('done');
              cursorChars = character[++cursorIndex]
              cursorChars.classList.add('cursor');
              index = index + 1 ;
              this.setState({symbolsNormal: index})
              this.setState({ correct : (this.state.correct + 1)})
              if(this.state.pixal >=  28){
                const textLengt = Math.round((this.state.text.length) / 1.5)
                const textsubstrac = this.state.text.length -  index
                if ( index <= textLengt){
                  if(textsubstrac <=  textLengt){
                    typingDiv.scrollTop = typingDiv.scrollHeight / 4;         
                  }
                }else if(index >= (textLengt/1.5)){
                  if(textsubstrac <=  (textLengt/1.5)){
                    typingDiv.scrollTop = typingDiv.scrollHeight;    
                  }
                }
              }else{
                const textLengt = Math.round((this.state.text.length) / 2)
                const textsubstrac = this.state.text.length -  index
                if(textsubstrac <=  textLengt){
                  typingDiv.scrollTop = typingDiv.scrollHeight;          
                }
                }
             }else{
              this.setState({incorrect : this.state.incorrect})
              audio.play()
            }
      }
          this.setTimerPro()
          setInterval(() => {
            if (this.state.symbolsNormal !== 0 && this.state.secPro !== 0) {
              let wpm = (this.state.symbolsNormal/5) / (this.state.secPro/60);
              let cpm  = (this.state.symbolsNormal) / (this.state.secPro/60);
              this.setState({WPM : Math.round(wpm)})
              this.setState({CPM : Math.round(cpm)})
            } 
            return null;
          }, 1000)
     
    }
      )

  }

  onUserInputChangePro = (e) => {
    const v = e.target.value;
    this.setTimer();
    this.scrollTestBar();
    this.setState({tabHide: true})
    this.typingTestData();
    this.setState({
      userInput: v,
      symbols: this.countCorrectSymbols(v)
    })
  }

  typingTestData = ()=>{
    const mistakes = this.state.userInput.split('').reduce((acc, typedChar, index) => {
      return typedChar !== this.state.text[index] ? acc + 1 : acc
  }, 0)
     if(mistakes){
      audio.play()
    }
    const text = this.state.text.split('');
    text.map((s,i) => {
      if (i <= this.state.userInput.length) {
        if( s !== this.state.userInput[i]){
          this.setState({ error : mistakes })
          this.setState({incorrect : (mistakes)})
        }else{
          this.setState({ error : (this.state.error) })
          this.setState({ correct : (this.state.correct + 1)})
        }  
      } 
    })


  setInterval(() => {
    if (this.state.symbols !== 0 && this.state.sec !== 0) {
      let wpm = (this.state.symbols/5) / (this.state.sec/60);
      let cpm  = (this.state.symbols) / (this.state.sec/60);
      this.setState({WPM : Math.round(wpm)})
      this.setState({CPM : Math.round(cpm)})
    } 
    return null;
  }, 1000)
}

  countCorrectSymbols(userInput) {
    const text = this.state.text.replace(' ', '');
    const remText = userInput.replace(/ /g, "");
    this.setState({ character : remText.length });
    return userInput.replace(' ', '').split('').filter((s,i) => s === text[i]).length;
  }

  setTimer() {
    if (!this.state.started) {
      let items = ['Amazing!', 'Astonishing!', ' Wonderful!' , 'Charming!', 'Fascinating!',];
      let item = items[Math.floor(Math.random() * items.length)];
      this.setState({timeRemaining : this.props.minute})
      this.setState({topic : this.props.topic})
      this.setState({started : true});
      let interval = setInterval(() => {
        this.setState(prevProps => {
          return {sec: prevProps.sec + 1}
        })
        if (this.state.timeRemaining > 0) {
          this.setState({ timeRemaining: ( this.state.timeRemaining  - 1) })
          if(this.state.timeRemaining   == 0){
            this.setState({ finished: true })
            audio.play()
            this.setState ({round : this.state.round + 1})
            document.getElementById('amazingText').style.display = 'block';
            document.getElementById('finingtext').innerHTML = item;
             document.getElementById('amazingTextpro').style.display = 'block';
            document.getElementById('finingtextpro').innerHTML = item;
             document.querySelector('.calculated').disabled = false 
                document.querySelector('.calculated2').disabled = false 
          }else{
             document.querySelector('.calculated').disabled = true 
             document.querySelector('.calculated2').disabled = true 
          }
        } else {
          clearInterval(interval)
        }
      }, 1000)
    }
  }
 setTimerPro() {
    if (!this.state.started) {
      let items = ['Amazing!', 'Astonishing!', ' Wonderful!' , 'Charming!', 'Fascinating!',];
      let item = items[Math.floor(Math.random() * items.length)];
      this.setState({timeRemaining : this.props.minute})
      this.setState({topic : this.props.topic})
      this.setState({started : true});
      let interval = setInterval(() => {
        this.setState(prevProps => {
          return {secPro: prevProps.secPro + 1}
        })
        if (this.state.timeRemaining > 0) {
          this.setState({ timeRemaining: ( this.state.timeRemaining  - 1) })
          if(this.state.timeRemaining   == 0){
            this.setState({ finished: true })
            audio.play()
            this.setState ({round : this.state.round + 1})
            document.getElementById('amazingText').style.display = 'block';
            document.getElementById('finingtext').innerHTML = item;
             document.getElementById('amazingTextpro').style.display = 'block';
            document.getElementById('finingtextpro').innerHTML = item;
             document.querySelector('.calculated').disabled = false 
                document.querySelector('.calculated2').disabled = false 
          }else{
             document.querySelector('.calculated').disabled = true 
             document.querySelector('.calculated2').disabled = true 
          }
        } else {
          clearInterval(interval)
        }
      }, 1000)
    }
  }
  onCloseBtn = () =>{
    window.location.reload()
  }
  scrollTestBar = ()=>{
        var doc = window.document; 
        const context = doc.getElementById("priview");

        if(this.state.pixal >=  28){
          const textLength = Math.round((this.state.text.length) / 1.5)
          const textLength2 = Math.round((this.state.text.length) / 2.5)
          console.log('textLength ' + textLength)
          console.log('character ' + this.state.character )
          const textsubstrac = this.state.text.length - this.state.character 
          console.log('textsubstrac ' + textsubstrac )
          if (  this.state.character  <= textLength){
            if(textsubstrac <=  textLength){
              context.scrollTop = context.scrollHeight / 4;         
            }
          }else if( this.state.character >= (textLength2)){
            console.log(textLength2)
            if(textsubstrac <=  (textLength2 )){
              context.scrollTop = context.scrollHeight;    
            }
          }
        }else{
          const textLength = Math.round((this.state.text.length) / 2)
          const textsubstrac = this.state.text.length - this.state.character 
          if(textsubstrac <=  textLength){
            context.scrollTop = context.scrollHeight;          
          }
          }
  }

  onIncrement = () =>{
    this.setState({ count1 : 0 });

    var el = document.querySelectorAll('.typingWord');
          for (var i = 0; i < el.length; i++) {
              var currentEl = el[i];
              const count = this.state.count;
              this.setState({ count: 1 + count });
              for( count = 0; count <= 10; count++ ){
                if(this.state.pixal < 35){
                  currentEl.style.fontSize  = `${((this.state.pixal) + 1)}px` ;
                  this.setState({pixal: this.state.pixal + 1 })
                }
              }
          }
  }

  onDecrement = () =>{
    this.setState({ count : 0 });
    var el = document.querySelectorAll('.typingWord');

    for (var i = 0; i < el.length; i++) {
      var currentEl = el[i];
      const count1 = this.state.count1;
      this.setState({ count1: 1 + count1 });
      for( count1 = 0; count1 <= 10; count1++ ){
        if(this.state.pixal > 20){
          currentEl.style.fontSize  = `${((this.state.pixal) - 1)}px` ;
          this.setState({pixal: this.state.pixal - 1 })
        }

      }
  }  
  }

  onCalculate = () =>{
      document.getElementById('TestScore').style.display = 'block';
      document.querySelector('.typing-fields').style.display = 'none'; 
    }
    // background color
  onBackgroudBlue = () =>{
    document.querySelector('.typing-fields').style.backgroundColor = '#0353c9'
  }
  onBackgroudRedis = () =>{
    document.querySelector('.typing-fields').style.backgroundColor = '#e14d21'
  }
  onBackgroudBroun = () =>{
    document.querySelector('.typing-fields').style.backgroundColor = '#8b209f'
  }
  onBackgroudSky = () =>{
    document.querySelector('.typing-fields').style.backgroundColor = '#20889f'
  }
   onBackgroudBlack = () =>{
    document.querySelector('.typing-fields').style.backgroundColor = '#000000'
  }
  onBackgroudYellos = () =>{
    document.querySelector('.typing-fields').style.backgroundColor = 'rgb(5 151 82)'
  }
  onSlider = () =>{ 
    document.querySelector('.slider-option').style.display = 'block'
    document.addEventListener('mouseup', function(e) {
      var container = document.querySelector('.slider-option');
      if (!container.contains(e.target)) {
          container.style.display = 'none';
      }
  });
  }
  onSliderOK =() =>{
    document.querySelector('.slider-option').style.display = 'none'
  }

render() {
 const accuracy =  Math.round((this.state.correct / (this.state.correct + this.state.incorrect)) * 100);
 return (
<div>
  <div className="container mt-5 mb-5 typing-fields">
      <button className="close" onClick = {this.onCloseBtn}>&#x2573; </button>
      <div className = 'incri-dicri'> 
          <button className="dicim" onClick = {this.onDecrement}> &minus; </button> 
          <button className="incim" onClick = {this.onIncrement}> &#43; </button>
      </div>
      <div className = 'background-color-left'>
          <button onClick = {this.onBackgroudBlue} className = 'background-blue'> </button>
           <button onClick = {this.onBackgroudRedis} className = 'background-redis'> </button>
            <button onClick = {this.onBackgroudBroun} className = 'background-broun'> </button>
      </div>
      <div className = 'background-color-right'>
          <button onClick = {this.onBackgroudSky} className = 'background-sky'> </button>
           <button onClick = {this.onBackgroudBlack} className = 'background-black'> </button>
            <button onClick = {this.onBackgroudYellos} className = 'background-yellos'> </button>
      </div>
    <Tabs
      defaultActiveKey="normal"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
     
      // {this.state.tabHide}
    >
      {/* For Normal Mode */}
    <Tab eventKey="normal" title="Normal"  disabled= {this.state.tabHide}>
      <div className ='mt-5 container'>         
          <label className = 'startLabel'> Start typing to get text context</label>
          <div  id = 'typingDiv'> </div> 
          <div className = 'typing-card-head text-center mb-5'>
           <div className = 'typing-amazing' id = 'amazingText'><h1 id = 'finingtext'></h1></div>
           <div className = 'typing-aim-speed'><h4>AIM FOR SPEED </h4><span className = 'tying-value'>{ (this.state.WPM < 20 ) ? '20' : this.state.WPM + 5 }</span></div> 
           {/* <div className = 'typing-round'><h6>ROUND</h6> <span className = 'tying-value'>{this.state.round}</span></div> */}
           <div className = 'typing-wpm'><h6>WPM </h6><span className = 'tying-value'>{this.state.WPM}</span></div> 
           <div className = 'typing-cpm'><h6>CPM </h6><span className = 'tying-value'>{this.state.CPM}</span></div>
           {/* <div className = 'typing-error'><h6>ERROR</h6><span className = 'tying-value'>{this.state.error}</span></div>  */}
           <div className = 'typing-accuracy'><h6> %ACCURACY  </h6><span className = 'tying-value'> { isNaN(accuracy)  ? '0' : accuracy}</span></div>
           <div className = 'typing-time'><h6>TIME </h6><span className = 'tying-value'>{this.state.timeRemaining == 0 ? this.props.minute : `${this.state.timeRemaining }`}s</span></div>
       </div>
        <div className="text-right px-3 pt-5">
          <button className="btn btn-button"  onClick={this.onRestart}>Restart</button>
          <button  className="btn btn-info calculated" onClick={this.onCalculate}>Calculate my test score</button>
          <button className="btn btn-danger"  onClick={this.onCloseBtn}>Choose a new topic</button>
          <button className="slider-button"  onClick={this.onSlider}>?</button>
        </div>
        </div>
    </Tab>
    <Tab eventKey="pro" title="Pro" disabled= {this.state.tabHide}>
         <div className = 'typing-speed-section'>

            <Preview text={this.state.text} userInput={this.state.userInput}/>

           <div className = 'typing-typephrase px-5 mb-5'>
            <div className = 'row'>
              <div className = 'col-md-2'>
                <div className = 'phrase-txt'>
                  <h3>Type this Phrase:</h3>
                </div>
              </div>
             <div className = 'col-md-10'>
             <div className = 'phrase-pragaph'>
               <textarea
                    value={this.state.userInput}
                    onChange={this.onUserInputChangePro}
                    className="form-control mb-3"
                    placeholder="Start typing..."
                    readOnly={this.state.finished}
                ></textarea>
             </div>
         </div>
           </div>
        </div>
       <div className = 'typing-card-head text-center mb-5'>
            <div className = 'typing-amazing'  id = 'amazingTextpro'><h1 id = 'finingtextpro'></h1></div>
            <div className = 'typing-aim-speed'><h4>AIM FOR SPEED </h4><span className = 'tying-value'>{ (this.state.WPM < 20 ) ? '20' : this.state.WPM + 5 }</span></div> 
            {/* <div className = 'typing-round'><h6>ROUND</h6> <span className = 'tying-value'>{this.state.round}</span></div> */}
            <div className = 'typing-wpm'><h6>WPM </h6><span className = 'tying-value'>{this.state.WPM}</span></div> 
            <div className = 'typing-cpm'><h6>CPM </h6><span className = 'tying-value'>{this.state.CPM}</span></div>
            <div className = 'typing-error'><h6>TYPOS</h6><span className = 'tying-value'>{this.state.error}</span></div> 
            <div className = 'typing-accuracy'><h6> %ACCURACY  </h6><span className = 'tying-value'> { isNaN(accuracy)  ? '0' : accuracy}</span></div>
            <div className = 'typing-time'><h6>TIME </h6><span className = 'tying-value'>{this.state.timeRemaining == 0 ? this.props.minute : `${this.state.timeRemaining}`}s</span></div>
        </div>
        <div className="text-right px-3 pt-5">
            <button className="btn btn-button"  onClick={this.onRestart}>Restart</button>
            <button  className="btn btn-info calculated2" onClick={this.onCalculate}>Calculate my test score</button>
            <button className="btn btn-danger"  onClick={this.onCloseBtn}>Choose a new topic</button>
            <button className="slider-button"  onClick={this.onSlider}>?</button>
          </div>
    </div>
    </Tab>
   </Tabs>
  </div>
   <div id = 'TestScore'><TestScore  wpm = {this.state.WPM}  accuracy = {accuracy} typos = {this.state.error}/> </div>

   {/* slider option */}
   <div className = 'container mt-5 slider-option'>
   <div id="carouselExampleCaptions" className="carousel   slide" data-bs-ride="carousel">
   <button className="slider-ok-button"  onClick={this.onSliderOK}>oK</button>
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img  className = 'carousel-image' src = 'https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg' alt = ''/>
            <div className="carousel-caption d-none d-md-block">
              <p>Some representative placeholder content for the first slide. 
              You can create a carousel instance with the carousel constructor, for example,
               to initialize with additional options and start cycling through items
               You can create a carousel instance with the carousel constructor, for example, 
               to initialize with additional options and start cycling through items
               You can create a carousel instance with the carousel constructor, for example, 
               to initialize with additional options and start cycling through items
              </p>
            </div>
          </div>
          <div className="carousel-item">
          <img  className = 'carousel-image' src = 'https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg' alt = ''/>
            <div className="carousel-caption d-none d-md-block">
              <p>Some representative placeholder content for the first slide. 
              You can create a carousel instance with the carousel constructor, for example,
               to initialize with additional options and start cycling through items
               You can create a carousel instance with the carousel constructor, for example, 
               to initialize with additional options and start cycling through items
               You can create a carousel instance with the carousel constructor, for example, 
               to initialize with additional options and start cycling through items</p>
            </div>
          </div>
          <div className="carousel-item">
          <img className = 'carousel-image' src = 'https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg' alt = ''/>
            <div className="carousel-caption d-none d-md-block">
              <p>Some representative placeholder content for the first slide. 
              You can create a carousel instance with the carousel constructor, for example,
               to initialize with additional options and start cycling through items
               You can create a carousel instance with the carousel constructor, for example, 
               to initialize with additional options and start cycling through items
               You can create a carousel instance with the carousel constructor, for example, 
               to initialize with additional options and start cycling through items</p>
            </div>
          </div>
        </div>
      </div>
      </div>
</div>
    );
  }
}

export default TypingField;

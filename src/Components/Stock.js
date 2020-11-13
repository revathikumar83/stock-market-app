import React from 'react';
import './stock.css';
import Plot from 'react-plotly.js';

let stocksymbol = "MSFT";

class Stock extends React.Component {
constructor(props){
    super(props);
    this.state={
      xvalue:[],
      yvalue:[],
      stocksym: stocksymbol,
      values:''
      
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
}

handleChange(event){
  this.setState({values:event.target.value});
}
handleSubmit(event){
event.preventDefault();
const cat=document.getElementById('demo').innerHTML=this.state.values;
stocksymbol=cat
this.setState.values= cat;
this.fetchStock();
}
 
componentDidMount(){
    this.fetchStock();
}


fetchStock(){
  const pointerToThis = this;
  
  console.log(pointerToThis);
    const API_KEY = '7RDAKK2TVFLKZ68H';
    //let Stocksymbol = 'FB';
    const API_call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stocksymbol}&outputsize=compact&apikey=${API_KEY}`;
    let xvaluesfunction=[];
    let yvaluesfunction=[];
    
    fetch(API_call)
        .then( (res) =>
             res.json() )
        .then( function(data) {
           console.log(data) 

     for(var key in data['Time Series (Daily)']){
      xvaluesfunction.push(key);
      yvaluesfunction.push(data['Time Series (Daily)'][key]['1. open']);
      
      
      pointerToThis.setState({
        xvalue:xvaluesfunction,
        yvalue:yvaluesfunction,
        
        
      })

      if(!stocksymbol){
        document.getElementById('demo').innerHTML= 'nothing';
      }
      
     }
    })
    
}

render(){
  return (
    <div className="stock">
      <div className="stock__search">
        <form onSubmit={this.handleSubmit}>
        <input className="stock__input" type='input' value={this.state.values}  placeholder='search' onChange={this.handleChange}></input>
        <button className="stock__button" type="submit">submit</button>
        <h4>stock symbol:<span id='demo'>MSFT</span></h4>
        </form>
      </div>
     
     <Plot
        data={[
          {
            x: this.state.xvalue,
            y: this.state.yvalue,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          
        ]}
        layout={ {width: 820, height: 540, title: 'A Fancy Plot'} }
      />
      
    </div>
  );
}
}

export default Stock;
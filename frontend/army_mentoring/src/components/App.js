
import React, {Component} from "react"
import './App.css';

//header
import Header from './Header/Header';

//footer
import Footer from './Footer/Footer';

class App extends Component {
  render(){
    return (
    
    <div className="App">
      <Header/>
      <Footer/>
    </div>
    
  );
  }
}

export default App;

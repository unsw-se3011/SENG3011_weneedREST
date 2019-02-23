import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '',
        };
    }

    handleClick(elem) {
        elem.classList.add('active');
        this.state.active.classList.remove('active');
        this.setState({active: {elem}});
    }

    componentDidMount() {
        let oldActive = document.getElementById('home');
        oldActive.classList.add('active');
        this.setState({active: oldActive})
    }

    render() {
      return (
        <div className="nav">
            <ul>
                <li id="home" onClick={()=>this.handleClick(document.getElementById('home'))}>
                    <Link to='/'>Home</Link>
                </li>
                <li id="about" onClick={()=>this.handleClick(document.getElementById('about'))}>
                    <Link to='/about'>About</Link>
                </li>
                <li id="contact" onClick={()=>this.handleClick(document.getElementById('contact'))}>
                    <Link to='/contact'>Contact</Link>
                </li>
            </ul>
        </div>
      );
    }
  }
  
export default Header;
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'

class Header extends Component {
    constructor(props) {
        super(props);
    }

    handleClick(elem) {
        let oldActive = document.getElementsByClassName("active")[0];
        oldActive.classList.remove("active");
        elem.classList.add("active");
    }

    render() {
      return (
        <div className="nav">
            <ul>
                <li className="active" id="home" onClick={()=>this.handleClick(document.getElementById('home'))}>
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
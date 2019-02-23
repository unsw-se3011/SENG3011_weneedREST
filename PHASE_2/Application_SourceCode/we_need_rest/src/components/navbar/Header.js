import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'

class Header extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        let url = window.location.href;
        
        console.log(url);
        if (url.search("about") != -1) {
            this.activate(document.getElementById('about'));
        } else if (url.search("contact") != -1) {
            this.activate(document.getElementById('contact'));
        } else {
            this.activate(document.getElementById('home'));
        }
    }

    handleClick(elem) {
        this.deactivate( document.getElementsByClassName("active")[0] );
        this.activate(elem);
    }

    activate(elem) {
        elem.classList.add("active");
    }

    deactivate(elem) {
        elem.classList.remove("active");
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
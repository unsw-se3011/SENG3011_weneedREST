import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'

class Header extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        let url = window.location.href;
        
        if (url.search("about") !== -1) {
            this.activate(document.getElementById('about'));
        } else if (url.search("contact") !== -1) {
            this.activate(document.getElementById('contact'));
        } else if (url.search("view") !== -1) {
            this.activate(document.getElementById('view'));
        } else if (url.search("create") !== -1) {
            this.activate(document.getElementById('create'));
        } else if (url.search("find") !== -1){
            this.activate(document.getElementById('find'));
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
                <Link to='/'>
                    <li className="nav-item" id="home" onClick={()=>this.handleClick(document.getElementById('home'))}>
                        Home
                    </li>
                </Link>
                <Link to='/about'>
                    <li className="nav-item" id="about" onClick={()=>this.handleClick(document.getElementById('about'))}>
                        About
                    </li>
                </Link>
                <Link to='/contact'>
                    <li className="nav-item" id="contact" onClick={()=>this.handleClick(document.getElementById('contact'))}>
                        Contact
                    </li>
                </Link>
                <Link to='/view'>
                    <li className="nav-item" id="view" onClick={()=>this.handleClick(document.getElementById('view'))}>
                        View
                    </li>
                </Link>
                <Link to='/create'>
                    <li className="nav-item" id="create" onClick={()=>this.handleClick(document.getElementById('create'))}>
                        Create
                    </li>
                </Link>
                <Link to='/find'>
                    <li className="nav-item" id="find" onClick={()=>this.handleClick(document.getElementById('find'))}>
                        Find
                    </li>
                </Link>
            </ul>
        </div>
      );
    }
  }
  
export default Header;
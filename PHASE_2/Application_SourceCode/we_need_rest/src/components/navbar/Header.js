import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Header.css'

class Header extends Component {
    componentDidMount() {
        let url = window.location.href;
        
        if (url.search("about") !== -1) {
            this.activate(document.getElementById('about'));
        } else if (url.search("create") !== -1) {
            this.activate(document.getElementById('create'));
        } else if (url.search("predict") !== -1){
            this.activate(document.getElementById('predict'));
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
                    <li className="brand" onClick={()=>this.handleClick(document.getElementById('home'))}>
                        Sleepy API
                    </li>
                </Link>
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
                <Link to='/create'>
                    <li className="nav-item" id="create" onClick={()=>this.handleClick(document.getElementById('create'))}>
                        Create
                    </li>
                </Link>
                <Link to='/predict'>
                    <li className="nav-item" id="predict" onClick={()=>this.handleClick(document.getElementById('predict'))}>
                        Predict
                    </li>
                </Link>
            </ul>
        </div>
      );
    }
  }
  
export default Header;
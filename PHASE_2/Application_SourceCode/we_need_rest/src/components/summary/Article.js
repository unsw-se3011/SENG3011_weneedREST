import React, {Component} from 'react';
import './summary.css';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const MENU_TYPE = "report-menu";

class Article extends Component {
  constructor(props) {
    super(props)

    this.state = {
      article: props.article,
      analysis: undefined,
      collapse: false
    }

    this.removeArticle = props.removeArticle;
    this.toggle = this.toggle.bind(this);
    this.onEntering = this.onEntering.bind(this);
    //this.textRazor = this.textRazor.bind(this);
    this.handleClick = this.handleClick.bind(this);
}

  onEntering() {
    if (this.state.analysis === undefined ) {
      this.textRazor();
    }
  }

  toggle() {
    this.setState( state => ({ collapse: !state.collapse }) );
    const elem = document.getElementById("art"+this.state.article.id);
    elem.innerHTML = this.state.collapse ? 'Analyse' : 'Hide';
  }

  handleClick(e, data) {
    console.log(data.search);
    this.props.expandSearch(data.search, this.state.article.id);
  }

  render() {
    const handleDelete = (id) => {
      const elem = document.querySelector("#item"+id);
      elem.className = 'editing';
      this.removeArticle(id);
    }    

    const article = this.state.article;

    return (
      <div>
        <ContextMenuTrigger id={MENU_TYPE+article.id} holdToDisplay={1000}>
          <div className="card text-white bg-dark mb-3">
            <div className="card-header">
              {article.headline}
              <button onClick={ () => {handleDelete(article.id)} } className="destroy"></button>
            </div>
            <div className="card-body">
              <h5 className="card-title">{article.id}</h5>
              <p className="card-text">{article.main_text}</p>
              <p className="card-text">{new Date(article.date_of_publication).toDateString()}</p>
            </div>
          </div>
        </ContextMenuTrigger>

        <ContextMenu id={MENU_TYPE+article.id}>
          <MenuItem  data={{ search: 'entity' }} onClick={this.handleClick}>Expand search by entity</MenuItem>
          <MenuItem  data={{ search: 'disease' }} onClick={this.handleClick}>Expand search by disease</MenuItem>
          {/* <MenuItem divider />
          <MenuItem  data={{ item: 'item 3' }}>Menu Item 3</MenuItem> */}
        </ContextMenu>
      </div>
    )
  }
}

export default Article;
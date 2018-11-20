import React, { Component } from 'react';
import logo from './logo.svg';
import {SortableContainer, SortableElement,arrayMove} from 'react-sortable-hoc';
import './App.css';

class Header extends React.Component{
  render(){
      return <header className="bg-primary">
                  <div className="container">
                      <div className="row">
                          <div className="col-md-12">
                              <h1 className="text-light">TestPage</h1>
                          </div>
                      </div>
                  </div>
              </header>;
  }
}

/*class AddButton extends React.Component{
  render(){
      return <button type="button" data-name={this.props.dataname} className="btn btn-default">{this.props.text}</button>;
  }
}*/

const Card = SortableElement(({title,bgcolor,i,deleteCard})  =>
<div className="card mb-1">
  <div className="card-header">
      <h3>{title}</h3>
      <button type="button" id="remove-btn" className="btn btn-danger" onClick={() => deleteCard(i)}>REMOVE</button>
  </div>
  <div className={"card-body " + bgcolor}>
      <h5 className="card-title">Special title treatment</h5>
      <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
      <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>
);

const Cards = SortableContainer(({items, deleteCard}) => {
  return (
    <div>
      {items.map((value, index) => (
        <Card key={`item-${index}`} index={index} i={index} title={value.title} bgcolor={value.bgcolor} deleteCard={deleteCard}/>
      ))}
    </div>
  );
});

class Main extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          cards: []
      };
      this.deleteCard = this.deleteCard.bind(this)
  };
  deleteCard(index){
      //console.log("deleteCard called");
      console.log(index);
      this.state.cards.splice(index, 1);
    // 保存
    this.setState({
      cards : this.state.cards
    });
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      cards: arrayMove(this.state.cards, oldIndex, newIndex),
    });
  };
  render(){
      return (<main>
                  <div className="container">
                      <div className="row">
                          <div className="col-md-12">
                              <div className="btn-toolbar m-1">
                                  <div id="add-btn" className="btn-group">
                                      <button type="button" ref="addBtn" data-name="card-a" className="btn btn-default" onClick={e => this.setState({cards: [ ...this.state.cards, {title : "card-a",bgcolor:""}]})}>ADD CARD-A</button>
                                      <button type="button" ref="addBtn" data-name="card-b" className="btn btn-default" onClick={e => this.setState({cards: [ ...this.state.cards, {title : "card-b",bgcolor:"bg-info"}]})}>ADD CARD-B</button>
                                  </div>
                              </div>
                              <Cards items={this.state.cards} onSortEnd={this.onSortEnd} deleteCard={this.deleteCard}/>
                          </div>
                      </div>
                  </div>
              </main>
      );
  }
}

class Footer extends React.Component{
  render(){
      return <footer className="bg-light">
                  <div className="container">
                      <div className="row">
                          <div className="col-md-12">
                              <p className="text-right">© 2018 dand-or</p>
                          </div>
                      </div>
                  </div>
              </footer>;
  }
}

class App extends Component {
  render() {
    return <div id="layout"><Header /><Main /><Footer /></div>;
  }
}

export default App;

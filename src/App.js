
import React, { Component } from 'react'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            list: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.addList = this.addList.bind(this);
        this.onCompleted = this.onCompleted.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    addList() {
        this.setState(({ list }) => {
            return {
                value: "",
                list: [...list, { title: this.state.value, completed: false }]
            }
        })
    }

    onCompleted(index) {
        let list = [...this.state.list];
        list[index].completed = !list[index].completed;
        this.setState({ list: list });
    }

    onDelete(index) {
        let list = [...this.state.list];
        list.splice(index, 1);
        this.setState({ list: list });
    }

    render() {
        return (
            <div className="container">
                <div className="title">
                    <h1>Todo list</h1>
                </div>
                <div className="list">
                    {
                        this.state.list.map(({ title, completed }, index) => {
                            return <div key={index} className={`item ${completed ? "completed" : ""}`} onClick={() => {
                                this.onCompleted(index);
                            }}>
                                <div className="item-check">V</div>
                                <div className="item-title">{title}</div>
                                <div className="item-del" onClick={(e) => {
                                    e.stopPropagation();
                                    this.onDelete(index)
                                }}>X</div>
                            </div>
                        })
                    }
                </div>
                <div className="input">
                    <input type="text" value={this.state.value} placeholder="add a new todo..." onChange={this.handleChange} />
                    <button onClick={this.addList}>Add</button>
                </div>
            </div>
        )
    }
}

export default App;
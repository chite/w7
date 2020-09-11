import React, { Component } from 'react'
import title from '../assets/title.png'
import { Link } from 'react-router-dom'

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: '',
            pt: '',
        }
    }
    naming(value) {
        this.setState({ name: value })
    }
    componentDidMount() {
        this.setState({
            id: Math.ceil(Math.random() * 2 ** 20),
            pt: Math.ceil(Math.random() * 5)
        })
    }
    render() {
        return (
            <section className="login">
                <div className="login__box">
                    <img className="obj login__title" src={title} alt="title" />
                    <input
                        className="login__input"
                        placeholder="暱稱"
                        defaultValue={this.state.name}
                        onChange={e => this.naming(e.target.value)}
                    />
                    <Link to={`/choose/${this.state.name}/${this.state.id}/${this.state.pt}`}>
                        <button className="login__btn" disabled={!this.state.name}>進入</button>
                    </Link>
                </div>
            </section>
        )
    }
}

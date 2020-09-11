import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import camp from '../assets/camp.svg'
import fire from '../assets/fire.svg'
import road from '../assets/road.svg'
import telescope from '../assets/telescope.svg'

export default class Gate extends Component {
    constructor(props) {
        super(props)
        this.state = { id: '', name: '', pt: '' }
    }
    componentDidMount() {
        const params = this.props.params;
        this.setState({ id: params.id, name: params.name, pt: params.pt });
    }
    render() {
        return (
            <section>
                <nav className="nav">
                    <span className="nav__item">
                        <Link to="/">
                            <strong className="nav__icon">
                                <FontAwesomeIcon icon="angle-left" />
                            </strong>
                            &nbsp;&nbsp;更改匿稱
                        </Link>
                    </span>
                    <span className="nav__item text-center">聊聊模式</span>
                    <span className="nav__item"> </span>
                </nav>
                <div className="titleSpc titleSty">
                    <h3 className="titleSty__text">HI，{this.state.name} </h3>
                    <h3 className="titleSty__text">請選擇模式...</h3>
                </div>
                <ul className="cards">
                    <li className="cards__item">
                        <Link to={`/room/${this.state.name}/${this.state.id}/${this.state.pt}`}>
                            <img alt="chatroom picture obj" src={camp} />
                            <p>聊聊大廳</p>
                        </Link>
                    </li>
                    <li className="cards__item" disabled>
                        <a>
                            <img alt="chatroom picture obj" src={fire} />
                            <p>1對1聊</p>
                        </a>
                    </li>
                    <li className="cards__item" disabled>
                        <a>
                            <img alt="chatroom picture obj" src={road} />
                            <p>隨機帳篷</p>
                        </a>
                    </li>
                    <li className="cards__item" disabled>
                        <a>
                            <img alt="chatroom picture obj" src={telescope} />
                            <p>自搭帳篷</p>
                        </a>
                    </li>
                </ul>
                <div className="titleSpc titleSty">
                    <h3 className="titleSty__text">進入後會自動產生大頭照</h3>
                    <h3 className="titleSty__text">想聊什麼就聊什麼!</h3>
                </div>
            </section>
        )
    }
}

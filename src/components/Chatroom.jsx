import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import io from 'socket.io-client'

class Chatroom extends Component {
    constructor(props) {
        super(props)
        this.msgDom = null;
        this.state = {
            defaultMessage: [
                {
                    id: 234243,
                    name: '匿名小豬',
                    pt: '1',
                    msg: '早安~'
                },
                {
                    id: 323243,
                    name: '匿名伊兒',
                    pt: '2',
                    msg: '早!'
                },
                {
                    id: 2342,
                    name: '匿名花栗鼠',
                    pt: '3',
                    msg: '喔哈唷~'
                },
                {
                    id: 34232,
                    name: '匿名牛魔王',
                    pt: '4',
                    msg: '不早了吧，都下午了...'
                },
                {
                    id: 23424,
                    name: '匿名牛魔王',
                    pt: '4',
                    msg: '剛看紙房子到第二季了'
                },
                {
                    id: 5434,
                    name: '匿名小馬哥',
                    pt: '5',
                    msg: '那是什?'
                },
                {
                    id: 122123,
                    name: '匿名小豬',
                    pt: '1',
                    msg: '影集'
                }
            ],
            msg: '',
            remind: '',
            user: {
                id: '',
                name: '',
                pt: ''
            },
            ws: null
        }
    }
    setMsg(val) {
        this.setState({ msg: val })
    }
    sendMsg() {
        if (!this.state.msg) return;
        this.state.ws.emit('getMessage',  {
            ...this.state.user,
            msg: this.state.msg
        });
        this.setState({ msg: '' })
    }
    initWebSocket() {
        this.state.ws.on('enterChat', name => {
            this.popRemind(name, '進入');
        })
        this.state.ws.on('getMessage', message => {
            this.setState({defaultMessage: [...this.state.defaultMessage, message]});
            this.msgDom.scrollTop = this.msgDom.scrollHeight;
        })
        this.state.ws.on('disConnection', name => {
            this.popRemind(name, '離開');
        })
    }
    popRemind(name, action) {
        this.setState({ remind: `---- ${name} ${action}聊聊大廳 ----` });
        setTimeout(() => {
            this.setState({ remind: '' });
        }, 6000);
    }
    componentDidUpdate(preProps, preState) {
        if (preState.ws !== this.state.ws) {
            console.log('connected')
            this.state.ws.emit('enterChat', this.state.user.name);
        }
    }
    componentDidMount() {
        const params = this.props.params;
        this.msgDom.scrollTop = this.msgDom.scrollHeight;
        this.setState({ user: params });
        this.setState({ws: io()}, ()=>{
            this.initWebSocket();
        })
        // });
    }
    componentWillUnmount(){
        this.state.ws.emit('disConnection', this.state.user.name);
    }
    render() {
        return (
            <section>
                <nav className="nav">
                    <span className="nav__item">
                        <Link to={`/choose/${this.state.user.name}/${this.state.user.id}/${this.state.user.pt}`}>
                            <strong className="nav__icon">
                                <FontAwesomeIcon icon="angle-left" />
                            </strong>
                            &nbsp;&nbsp;聊聊模式
                        </Link>
                    </span>
                    <span className="nav__item text-center">聊聊大廳</span>
                    <span className="nav__item"> </span>
                </nav>
                <div className="remind">
                    <h3 className="remind__text">{this.state.remind}</h3>
                </div>
                <div className="message" ref={el=>this.msgDom = el}>
                    {
                        this.state.defaultMessage.map((item, index) => {
                            if (item.id == this.state.user.id) {
                                return (
                                    <div className="message__row" key={index}>
                                        <div className="message__box message__box--right">
                                            <p className="message__text message__text--right">{item.msg}</p>
                                        </div>
                                    </div>
                                )
                            } else {
                                return (
                                    <div className="message__row" key={index}>
                                        <div className="message__box message__box--left">
                                            <img title={item.name} className="message__img obj" src={`https://w7-chatroom.herokuapp.com/assets/user${item.pt}.png`} />
                                            <p className="message__text message__text--left">{item.msg}</p>
                                        </div>
                                    </div>
                                )
                            }

                        })
                    }
                </div>
                <div className="toolbox">
                    <FontAwesomeIcon icon="camera" />
                    <FontAwesomeIcon icon="file-alt" />
                    <span className="toolbox__group">
                        <input
                            className="toolbox__input"
                            placeholder="聊聊什麼…"
                            value={this.state.msg}
                            onChange={e => this.setMsg(e.target.value)}
                        />
                        <span onClick={this.sendMsg.bind(this)}>
                            <FontAwesomeIcon icon="paper-plane" />
                        </span>
                    </span>
                </div>
            </section>
        )
    }
}


export default Chatroom
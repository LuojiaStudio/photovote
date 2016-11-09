/**
 * Created by Jsceoz on 2016/11/7.
 */
import React, { Component } from 'react'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Footer from '../public/footer'
import AppBar from 'material-ui/AppBar';
import './login.css';
import $ from 'jquery';


class LoginBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            sid:'',
            password:'',
            check: false,
            message: '验证成功'
        };
    }

    handleClick = () => {
        window.location.replace("/#/vote/none");
        this.setState({
            open: true,
        });
    };

    handleActionTouchTap = () => {
        this.setState({
            open: false,
        });
    };

    handleSidOnchange = (e) => {
        this.setState({
            sid:e.target.value
        })
    };

    handlePasswordChange = (e) => {
        this.setState({
            password:e.target.value
        })
    };

    handleCheckClick = () => {
        let sid = this.state.sid;
        //TODO:提交数据，验证返回值
        $.ajax({
            method: "POST",
            url: "http://127.0.0.1:8000/gettoken/",
            data: {
                sid: this.state.sid,
                password: this.state.password,
            }
        }).done(function (data) {
            console.log(data)
            window.location.replace("/#/vote/"+data.token+"/"+sid);
        })
    };





    render() {
        return (
            <div className="login-box-component">
                <AppBar
                    title="身份验证"
                    showMenuIconButton={false}
                />

                  <div className="text-wrapper">
                    <TextField
                        value={this.state.sid}
                        hintText="学号"
                        className="login-input"
                        onChange={this.handleSidOnchange}
                    />
                    <TextField
                        value={this.state.password}
                        className="login-input"
                        hintText="信息门户密码(默认身份证后6位)"
                        onChange={this.handlePasswordChange}
                    />
                    <RaisedButton
                        label="开始验证"
                        className="login-raised-btn"
                        primary={true}
                        onClick={this.handleCheckClick}

                    />
                    <FlatButton
                        label="我就看看，不投票"
                        className="login-flat-btn"
                        primary={true}
                        onClick={this.handleClick}
                    />
                  </div>
                <Footer/>
                <Snackbar
                    open={this.state.open}
                    message={this.state.message}
                    action="哦"
                    onClick={this.handleActionTouchTap}
                />
            </div>
        )
    }
}

export default LoginBox

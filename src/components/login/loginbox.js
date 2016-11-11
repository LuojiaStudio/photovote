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
        window.location.replace("./#/vote/none/none");
        // this.setState({
        //     open: true,
        //     message: '投票尚未开始'
        // });
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
        let self = this;
        $.ajax({
           method: "POST",
           url: "http://api.whusu.com.cn/gettoken/",
           data: {
               sid: this.state.sid,
               password: this.state.password,
           },
           beforeSend:function(xhr){
               self.setState({
                   open: true,
                   message: '验证中...'
               })
           },
        }).done(function (data) {
            console.log(data);
            if(data.info === 0){
                self.setState({
                    open: true,
                    message: '验证失败'
                })
            }
            else if(data.info === 1){
                self.setState({
                    open: true,
                    message: '您今天已经投过票了'
                })
            }
            else if(data.token) {
                self.setState({
                    open: true,
                    message: '验证成功，正在跳转'
                });
                let redirect = "window.location.replace('./#/vote/"+data.token+"/"+sid+"')";
                setTimeout(redirect, 1000);
            }
            else {
                self.setState({
                    open: true,
                    message: '网络异常'
                })
            }
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

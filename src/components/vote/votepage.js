/**
 * Created by Jsceoz on 2016/11/8.
 */
import React from 'react'
import VoteItem from './voteitem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DoneAction from 'material-ui/svg-icons/action/done';
import AutoRenew from 'material-ui/svg-icons/action/autorenew';
import GroupHeader from './groupheader';
import FlatButton from 'material-ui/FlatButton';
import './vote.css'
import $ from 'jquery';
import Snackbar from 'material-ui/Snackbar';

class VotePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            voteItemList: [
                // {
                //     id: 1,
                //     group: '专业摄影组',
                //     photo:['path1', 'path2', 'path3']
                // },
                // {
                //     id: 2,
                //     group: '专业摄影组',
                //     photo:['path1', 'path2', 'path3']
                // }
            ],
            selectedList: [],
            currentGroup: 1,
            nextGroup: 2,
            nextPage: '',
            stkOpen: false,
            disable: false,
            errorMsg: '',
            gOne: 0,
            gTwo: 0,
            gThree: 0,
        };
    }

    componentDidMount() {
        if(this.props.params.token === 'none') {
            this.setState({
                disable:true,
            })
        }
        this.getPhoto();
        this.setState({
            stkOpen: true,
            errorMsg: '点击右边按钮切换分组和确认投票'
        })
    }

    getPhoto() {
        let self = this;
        let url = "http://api.whusu.com.cn/p_w_i/?group=" + this.state.currentGroup;
        $.ajax({
            method:"GET",
            url: url,
            beforeSend:function (xhr) {
                self.setState({
                    stkOpen:true,
                    errorMsg: '努力加载中...'
                })
            }
        }).done(function (data) {
            console.log(data);
            self.setState({
                voteItemList:data.results,
                nextPage: data.next,
                stkOpen:false,
            });
        });
    }

    addItem(id,group) {
        let list = this.state.selectedList;
        list = [...list, id];
        this.setState({
            selectedList:list
        });
        switch (group) {
            case 1:
                let newG1 = this.state.gOne + 1;
                this.setState({
                    gOne:newG1
                });
                break;
            case 2:
                let newG2 = this.state.gTwo + 1;
                this.setState({
                    gTwo:newG2
                });
                break;
            case 3:
                let newG3 = this.state.gThree + 1;
                this.setState({
                    gThree:newG3
                });
                break;
            default:
                break;
        }
    }

    delItem(id, group) {
        let list = this.state.selectedList;
        let num = list.indexOf(id);
        list.splice(num, 1);
        this.setState({
            selectedList: list
        });
        switch (group) {
            case 1:
                let newG1 = this.state.gOne - 1;
                this.setState({
                    gOne: newG1
                });
                break;
            case 2:
                let newG2 = this.state.gTwo - 1;
                this.setState({
                    gTwo: newG2
                });
                break;
            case 3:
                let newG3 = this.state.gThree - 1;
                this.setState({
                    gThree: newG3
                });
                break;
            default:
                break;
        }
    }


    getMore() {
        if (this.state.nextPage === 'null') {
            this.openNoMore();
            return;
        }
        let self = this;
        let url = this.state.nextPage;
        let showList = this.state.voteItemList;
        let allList;
        this.serverRequest = $.ajax({
            method: "GET",
            url: url,
            beforeSend:function (xhr) {
                self.setState({
                    stkOpen: true,
                    errorMsg: '努力加载中...'
                })
            },
        }).done(function (data) {
            allList = showList.concat(data.results);
            self.setState({
                voteItemList:allList,
                nextPage: data.next,
                stkOpen:false,
            });
            if (data.next == null) {
                self.setState({
                    nextPage: 'null'
                })
            }
        });
    }


    openNoMore() {
        this.setState({
            stkOpen:true,
            errorMsg: '没有更多了'
        })
    }

    vote() {
        if(this.state.gOne > 10){
            this.errorOpen(4)
        }
        else if(this.state.gTwo > 10){
            this.errorOpen(5)
        }
        else if(this.state.gThree > 10){
            this.errorOpen(6)
        }
        else if(this.state.gOne < 5){
            this.errorOpen(7)
        }
        else if(this.state.gTwo < 5){
            this.errorOpen(8)
        }
        else if(this.state.gThree < 5){
            this.errorOpen(9)
        }
        else {
            //console.log(this.state.selectedList)dasddssdsadsa
            let token = this.props.params.token;
            let url = 'http://api.whusu.com.cn/tt/';
            let list = this.state.selectedList;
            let self = this;
            for (let i = 0; i < list.length; i++) {
                $.ajax({
                    method: "POST",
                    url: url,
                    data: {
                        school_id: this.props.params.sid,
                        photographic_work_item: list[i],
                        create_time: "0"
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Token " + token);
                    },
                }).done(function (data) {
                    console.log(data);
                    if (data.info === 1) {
                        self.errorOpen(1);
                    }
                    else if (data.info === 2) {
                        self.errorOpen(2);
                    }

                })
            }
            this.errorOpen(3);
        }
    }


    errorOpen(id) {
        switch (id) {
            case 2:
                this.setState({
                    errorMsg: '不能重复投票',
                    stkOpen: true,
                });
                break;
            case 1:
                this.setState({
                    errorMsg: '投票已达上限',
                    stkOpen: true,
                });
                break;
            case 3:
                this.setState({
                    errorMsg: '投票成功',
                    stkOpen: true,
                });
                break;
            case 4:
                this.setState({
                    errorMsg: '专业团体不能超过10个选项',
                    stkOpen: true,
                });
                break;
            case 5:
                this.setState({
                    errorMsg: '专业个人不能超过10个选项',
                    stkOpen: true,
                });
                break;
            case 6:
                this.setState({
                    errorMsg: '手机组不能超过10个选项',
                    stkOpen: true,
                });
                break;
            case 7:
                this.setState({
                    errorMsg: '专业团体不能少于5个选项',
                    stkOpen: true,
                });
                break;
            case 8:
                this.setState({
                    errorMsg: '专业个人不能少于5个选项',
                    stkOpen: true,
                });
                break;
            case 9:
                this.setState({
                    errorMsg: '手机组不能少于5个选项',
                    stkOpen: true,
                });
                break;
            default:
                return
        }
    }

    checkCheck(id) {
        let num = this.state.selectedList.indexOf(id);
        if(num === -1) {
            return false
        }
        else {
            return true
        }
    }


    handleActionTouchTap = () => {
        this.setState({
            stkOpen: false,
        });
    };

    changeGroup() {
        let id = this.state.currentGroup;
        let self = this;
        id = id % 3 + 1;
        let next_id = (id + 3) % 3 + 1;
        this.setState({
            currentGroup:id,
            nextGroup: next_id
        });
        let url = "http://api.whusu.com.cn/p_w_i/?group=" + this.state.nextGroup;
        $.ajax({
            method:"GET",
            url: url,
            beforeSend:function (xhr) {
                self.setState({
                    stkOpen:true,
                    errorMsg: '努力加载中...'
                })
            }
        }).done(function (data) {
            console.log(data);
            self.setState({
                voteItemList:data.results,
                nextPage: data.next,
                stkOpen:false,
            });
        });
    }


    errorTooLess() {
        this.setState({
            stkOpen:true,
            errorMsg: "至少要选择5组作品.."
        })
    }


    render() {
        let groupName;
        switch (this.state.currentGroup) {
            case 1:
                groupName = '专业团体';
                break;
            case 2:
                groupName = '专业个人';
                break;
            case 3:
                groupName = '手机组';
                break;
            default:
                groupName = '';
        }
        let showList = this.state.voteItemList;
        return (
            <div className="vote-page-component">
                <GroupHeader title={groupName} onChange={this.changeGroup.bind(this)} group={this.state.currentGroup}/>
                <div className="vote-item-list">
                    {
                        showList.map((item) => {
                            return (
                                <VoteItem
                                    item={item}
                                    disable={this.state.disable}
                                    onCheck={this.addItem.bind(this)}
                                    onCancel={this.delItem.bind(this)}
                                    isCheck={this.checkCheck(item.id)}
                                />
                            )
                        })
                    }
                </div>
                <div className="more-btn-wrapper">
                    <FlatButton
                        className="vote-page-more-btn"
                        primary={true}
                        label="点击加载更多"
                        onClick={this.getMore.bind(this)}
                    />
                </div>
                <FloatingActionButton
                    className="vote-float-btn"
                    onClick={this.vote.bind(this)}
                >
                    <DoneAction/>
                </FloatingActionButton>
                <FloatingActionButton
                    className="vote-float-btn-change"
                    onClick={this.changeGroup.bind(this)}
                >
                    <AutoRenew/>
                </FloatingActionButton>
                <Snackbar
                    open={this.state.stkOpen}
                    message={this.state.errorMsg}
                    action="哦"
                    onClick={this.handleActionTouchTap}
                />
            </div>
        )
    }
}

export default VotePage;
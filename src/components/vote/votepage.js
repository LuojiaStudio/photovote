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
            nextPage: '',
            isNoMoreOpen: false,
            disable: false,
        };
    }

    componentDidMount() {
        //TODO 获取数据
        if(this.props.params.token == 'none') {
            this.setState({
                disable:true,
            })
        }
        this.getPhoto();
    }

    getPhoto() {
        let url = "http://127.0.0.1:8000/p_w_i/?group=" + this.state.currentGroup;
        this.serverRequest = $.get(url, function (data) {
            console.log(data);
            this.setState({
                voteItemList:data.results,
                nextPage: data.next
            });
        }.bind(this));
    }

    addItem(id) {
        let list = this.state.selectedList;
        list = [...list, id];
        this.setState({
            selectedList:list
        });
    }

    delItem(id) {
        let list = this.state.selectedList;
        let num = list.indexOf(id);
        list.splice(num, 1);
        this.setState({
            selectedList:list
        });
    }


    getMore() {
        if (this.state.nextPage == 'null') {
            this.openNoMore();
            return;
        }
        let url = this.state.nextPage;
        let showList = this.state.voteItemList;
        let allList;
        let nextUrl;
        this.serverRequest = $.get(url, function (data) {
            console.log(data);
            console.log(showList);
            allList = showList.concat(data.results);
            console.log(showList);
            this.setState({
                voteItemList:allList,
                nextPage: data.next
            });
            if (data.next == null) {
                this.setState({
                    nextPage: 'null'
                })
            }

        }.bind(this));
    }


    openNoMore() {
        this.setState({
            isNoMoreOpen:true,
        })
    }

    vote() {
        //console.log(this.state.selectedList)dasd
        let token = this.props.params.token;
        let url = 'http://127.0.0.1:8000/tt/';
        let list = this.state.selectedList;
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
                console.log(data)
            })
        }
    }


    handleActionTouchTap = () => {
        this.setState({
            isNoMoreOpen: false,
        });
    };

    changeGroup() {
        let id = this.state.currentGroup;
        id = id % 3 + 1;
        this.setState({
            currentGroup:id
        });
        this.getPhoto();
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
                    open={this.state.isNoMoreOpen}
                    message="已经没有了"
                    action="哦"
                    onClick={this.handleActionTouchTap}
                />
            </div>
        )
    }
}

export default VotePage;
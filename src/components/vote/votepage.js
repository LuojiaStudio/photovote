/**
 * Created by Jsceoz on 2016/11/8.
 */
import React from 'react'
import VoteItem from './voteitem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DoneAction from 'material-ui/svg-icons/action/done';
import GroupHeader from './groupheader';
import FlatButton from 'material-ui/FlatButton';
import './vote.css'

class VotePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vote_item_list: [
                {
                    name:'作品1',
                    group: '专业摄影组',
                    photo:['path1', 'path2', 'path3']
                }
            ]
        };
    }

    componentDidMount() {
        //TODO 获取voteitem数据
    }

    render() {
        return (
            <div className="vote-page-component">
                <GroupHeader/>
                <div className="vote-item-list">
                    {
                        this.state.vote_item_list.map((item) => {
                            return (
                                <VoteItem data={item} />
                            )
                        })
                    }
                </div>
                <div className="more-btn-wrapper">
                    <FlatButton
                        className="vote-page-more-btn"
                        primary={true}
                        label="点击加载更多"
                    />
                </div>
                <FloatingActionButton className="vote-float-btn">
                    <DoneAction/>
                </FloatingActionButton>
            </div>
        )
    }
}

export default VotePage;
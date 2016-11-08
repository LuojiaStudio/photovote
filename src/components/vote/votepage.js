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
    render() {
        return (
            <div className="vote-page-component">
                <GroupHeader/>
                <div className="vote-item-list">
                    <VoteItem/>
                    <VoteItem/>
                    <VoteItem/>
                    <VoteItem/>
                    <VoteItem/>
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
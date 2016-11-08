/**
 * Created by Jsceoz on 2016/11/8.
 */
import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import SvgIcon from 'material-ui/SvgIcon';
import Clear from 'material-ui/svg-icons/content/clear';

import './selected.css'


class SelectedPage extends React.Component {
    render() {
        return (
            <div className="selected-page">
                <AppBar
                    title="确认选择"
                    showMenuIconButton={false}
                />
                <Paper className="selected-page-paper" zDepth={1}>
                <List>
                    <ListItem primaryText="All mail" rightIcon={<Clear/>} />
                    <ListItem primaryText="Trash" rightIcon={<Clear/>} />
                    <ListItem primaryText="Spam" rightIcon={<Clear/>} />
                    <ListItem primaryText="Follow up" rightIcon={<Clear/>} />
                </List>
                </Paper>
                <div className="selected-page-btn-wrapper">
                <RaisedButton className="selected-page-btn" label="确定" primary={true} fullWidth={true}/>
                </div>
            </div>
        )
    }
}

export default SelectedPage;
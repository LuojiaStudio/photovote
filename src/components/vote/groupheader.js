/**
 * Created by Jsceoz on 2016/11/8.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';

var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

class GroupHeader extends React.Component {
    render() {
        return (
            <div className="group-header">
                <AppBar
                    title={this.props.title}
                    showMenuIconButton={false}
                />
            </div>
        )
    }
}

export default GroupHeader;
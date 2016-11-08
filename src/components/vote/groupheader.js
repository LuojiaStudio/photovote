/**
 * Created by Jsceoz on 2016/11/8.
 */
import React from 'react';
import AppBar from 'material-ui/AppBar';

class GroupHeader extends React.Component {
    render() {
        return (
            <div className="group-header">
                <AppBar
                    title="专业摄影组"
                />
            </div>
        )
    }
}

export default GroupHeader;
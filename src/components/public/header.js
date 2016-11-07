/**
 * Created by Jsceoz on 2016/11/7.
 */
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';


class Header extends Component {
    render() {
        return (
            <div>
             <AppBar
                title="身份验证"
                showMenuIconButton={false}
             />
            </div>
        )
    }
}

export default Header

/**
 * Created by Jsceoz on 2016/11/8.
 */
import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import img from './1.jpg';
import './vote.css'



class VoteItem extends Component {
    render() {
        return (
            <div className="vote-item-component">
                <Card className="vote-card">
                    <CardHeader
                      title={this.props.data.name}
                      subtitle={this.props.data.group}
                      avatar={
                          <div className="checkbox-wrapper">
                           <Checkbox className="card-header-checkbox"/>
                          </div>
                      }
                    />
                    <CardMedia>
                        {
                            this.props.data.photo.map((path) => {
                                return (
                                    <img src={path} alt={path}/>
                                )
                            })
                        }
                    </CardMedia>
                </Card>

            </div>
        )
    }
}

export default VoteItem;
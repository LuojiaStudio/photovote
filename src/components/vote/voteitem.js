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
                      title="标题"
                      subtitle="专业摄影组"
                      avatar={
                          <div className="checkbox-wrapper">
                           <Checkbox className="card-header-checkbox"/>
                          </div>
                      }
                    />
                    <CardMedia>
                        <img src={img} />
                    </CardMedia>
                </Card>

            </div>
        )
    }
}

export default VoteItem;
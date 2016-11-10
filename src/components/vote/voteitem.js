/**
 * Created by Jsceoz on 2016/11/8.
 */
import React, { Component, PropTypes } from 'react';
import {Card,  CardHeader, CardMedia,  } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import { Carousel } from 'antd';
import './vote.css'


class VoteItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
    }

    handleCheck() {
        let id = this.props.item.id;
        let bool = !this.state.checked;
        switch (bool) {
            case true:
                this.props.onCheck(id);
                break;
            case false:
                this.props.onCancel(id);
                break;
            default:
                return;
        }

        this.setState({
            checked:bool
        });
        //console.log(this.state.checked)
    }


    render() {
        //console.log(this.props);
        return (
            <div className="vote-item-component">
                <Card className="vote-card">
                    <CardHeader
                      subtitle={'当前票数:'+this.props.item.vote}
                      avatar={
                          <div className="checkbox-wrapper">
                           <Checkbox
                               disabled={this.props.disable}
                               className="card-header-checkbox"
                               onCheck={this.handleCheck.bind(this)}
                           />
                          </div>
                      }
                    />
                    <CardMedia>
                        <div className="carousel-wrapper">
                        <Carousel dots={false}>
                        {
                            this.props.item.photos.map((photo, index) => {
                                return (
                                    <img src={'http://whusu.oss-cn-qingdao.aliyuncs.com/photovote/'+this.props.item.group+'/'+this.props.item.name+'/'+ (index+1) +'.jpg?x-oss-process=style/votestyle'} alt={photo}/>
                                )
                            })
                        }
                        </Carousel>
                        </div>
                    </CardMedia>
                </Card>

            </div>
        )
    }
}

VoteItem.propTypes = {
    disable: PropTypes.bool,
    item: PropTypes.object,
    onCheck: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default VoteItem;
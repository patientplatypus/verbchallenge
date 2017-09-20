
import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';

const styles = {
  background: {
    backgroundColor: 'rgb(49,51,72)'
  }
}


class ListMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  handleClick(){
    this.props.openMessage(this.props.message);
  }

  render() {
    return (
      <div>
        <ListItem primaryText=  {this.props.message.title} rightIcon={<ActionInfo />} onClick={()=>{this.handleClick()}}/>
      </div>
    );
  }
};

export default ListMessage

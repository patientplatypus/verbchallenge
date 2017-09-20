
import React, { Component } from 'react';

import { connect } from 'react-redux'
import { messageCREATE } from '../../Redux/actions'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import muiThemeable from 'material-ui/styles/muiThemeable';

import renderIf from 'render-if'
import TextField from 'material-ui/TextField';
import styled from 'styled-components';
import Dialog from 'material-ui/Dialog';

const PositionRelative = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

const TitleBar = styled.div`
  position: absolute;
  top: 5%;
  width: 80%;
  left: 10%;
  text-align: center;
`

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const Flex1 = styled.div`
  flex: 1;
`
const Flex2 = styled.div`
  flex: 2;
`

const MessageHolder = styled.div`
  position: absolute;
  top: 20%;
  width: 80%;
  height: 80%;
  left: 10%;
  text-align: center;
`



class Page1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter:0,
      showMessageMaker: false,
      message: '',
      title: '',
      secret: '',
      openWarning: false,
      warningLabel: 'Ok, I Understand',
      warningTitle: 'Achtung!',
      warningMessage: 'All Fields Must Be Filled Out!'
    };
  }

  handleOpen = () => {
    this.setState({openWarning: true});
  };

  handleClose = () => {
    this.setState({openWarning: false});
  };

  showfunction(){
    console.log('inside the showfunction');
    console.log('value of this.showMessageMaker', this.showMessageMaker);
  }

  sendmessagefunction(){
    console.log('inside the sendmessagefunction');
    console.log('value of the message ', this.state.message);
    if(this.state.message===''||this.state.title===''||this.state.secret===''){
      this.setState({
        warningLabel: 'Ok, I Understand',
        warningTitle: 'Achtung!',
        warningMessage: 'All Fields Must Be Filled Out!',
        openWarning: true
      })
    }else{
      var message = this.state.message;
      var secret = this.state.secret;
      var title = this.state.title;
      this.setState({
        warningLabel: 'Sick!',
        warningTitle: 'Message Sent!',
        warningMessage: 'Yay!',
        message: '',
        title:'',
        secret: '',
        openWarning: true
      })
      this.props.store.dispatch(messageCREATE({title, message, secret}))
    }
  }

  render() {
    const actions = [
      <FlatButton
        label={this.state.warningLabel}
        secondary={true}
        onClick={this.handleClose}
      />
    ];

    return (
        <PositionRelative>
          <Dialog
            title={this.state.warningTitle}
            actions={actions}
            modal={true}
            primary={true}
            open={this.state.openWarning}
            onRequestClose={this.handleClose}
          >
            {this.state.warningMessage}
          </Dialog>
          <TitleBar>
            <h1>
              Welcome to Page 1
            </h1>
          </TitleBar>
          <MessageHolder>
            {renderIf(this.state.showMessageMaker===false)(
              <PositionRelative>
                <FlexColumn>
                  <Flex1/>
                  <Flex2>
                    <RaisedButton label="Make A Message!" primary={true}   onClick={()=>{this.setState({showMessageMaker: true})}}/>
                  </Flex2>
                </FlexColumn>
              </PositionRelative>
            )}
            {renderIf(this.state.showMessageMaker===true)(
              <PositionRelative>
                <FlexColumn>
                  <Flex1/>
                  <Flex1>
                    <RaisedButton label="Hide the Message Maker!" primary={true} onClick={()=>{this.setState({showMessageMaker: false})}}/>
                  </Flex1>
                  <Flex1/>
                  <Flex1>
                    <TextField
                      hintText="Message Title"
                      value={this.state.title}
                      onChange={(e)=>this.setState({title: e.target.value})}
                    />
                  </Flex1>
                  <Flex1>
                    <TextField
                      hintText="Make Sure to Remember It!"
                      floatingLabelText="Secret Pass Code!"
                      type="password"
                      value={this.state.secret}
                      onChange={(e)=>this.setState({secret: e.target.value})}
                    />
                  </Flex1>
                  <Flex2>
                    <TextField
                      hintText="Write Your Message Here!"
                      multiLine={true}
                      rows={2}
                      rowsMax={4}
                      value={this.state.message}
                      onChange={(e)=>this.setState({message: e.target.value})}
                    />
                  </Flex2>
                  <Flex2>
                    <RaisedButton label="Submit Message!" primary={true}   onClick={()=>{this.sendmessagefunction()}}/>
                  </Flex2>
                </FlexColumn>
              </PositionRelative>
            )}
          </MessageHolder>
        </PositionRelative>
    );
  }
};

Page1 = connect()(Page1)
export default muiThemeable()(Page1);

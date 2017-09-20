
import React, { Component } from 'react';

import { connect } from 'react-redux'
import { messageGET, messageUPDATE } from '../../Redux/actions'

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {List, ListItem} from 'material-ui/List';
import ListMessage from './ListMessage';
import glamorous from 'glamorous';

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

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
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


const MessageHolder = glamorous.div(
  {
    position: "absolute",
    top: '70%',
    width: '100%',
    height: '30%',
    left: '0%',
    textAlign: 'center',
    overflow: 'hidden',
    overflowY: 'scroll',
    background: 'transparent'
  },
  ({backgroundColor})=>({
    backgroundColor: backgroundColor
  })
)

const ButtonHolder = styled.div`
  position: absolute;
  top: 20%;
  width: 80%;
  height: 15%;
  left: 10%;
  text-align: center;
  overflow: hidden;
  overflow-y: scroll;
`

const SingleMessage = styled.div`
  position: absolute;
  top: 30%;
  height: 30%;
  width: 80%;
  left: 10%;
  text-align: center;
`




class Page2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter:0,
      retrieveMessageList: false,
      message: '',
      title: '',
      secret: '',
      openWarning: false,
      warningLabel: 'Ok, I Understand',
      warningTitle: 'Achtung!',
      warningMessage: 'All Fields Must Be Filled Out!',
      messageList: [],
      messageBackground: 'transparent',
      showmessage: false,
      editmessage: false,
      showeditbutton: false,
      showdeletebutton: false,
      singlemessage: [],
      editreturn: [],
    };

   this.props.store.subscribe(() => {
     if(this.props.store.getState().backendhook.length>0){
       this.setState({
         messageList: this.props.store.getState().backendhook
       }, ()=>{
         console.log('updated messageList: ', this.state.messageList);
       })
     }
     this.setState({
       editreturn: this.props.store.getState().backendhookedit
     }, ()=>{
        console.log('updated editreturn: ', this.state.editreturn);
        if(this.state.editreturn.data!=undefined){
          if(this.state.editreturn.data.status==='passwordsdontmatch'){
            this.setState({
              openWarning: true,
              warningLabel: 'BUMMER',
              warningTitle: 'WRONG PASSWORD',
              warningMessage: 'Get out of here with those shenanigans!'
            })
          }
          if(this.state.editreturn.data.status==='passwordsmatch'){
            this.setState({
              openWarning: true,
              warningLabel: 'RIGHTEOUS',
              warningTitle: 'DATERBASE UPDATED',
              warningMessage: 'The database has been altered, pray I do not alter it further.'
            })
          }
        }
     });
   });
  }

  handleOpen = () => {
    this.setState({openWarning: true});
  };

  handleClose = () => {
    this.setState({openWarning: false});
  };

  openMessage(message){
    console.log('inside openMessage');
    console.log('and message is ', message);
    this.setState({
      showmessage: true,
      editmessage: false,
      showeditbutton: true,
      showdeletebutton: true,
      singlemessage: message
    })
  }

  editMessage(){
    console.log('value of this.state.singlemessage', this.state.singlemessage);
    if(this.state.secret.length === 0){
      this.setState({
        openWarning: true,
        warningLabel: 'BUMMER',
        warningTitle: 'NO U',
        warningMessage: 'No blank passwords you jabroni!'
      })
    }else{
      this.props.store.dispatch(messageUPDATE(this.state.singlemessage, this.state.secret))
    }
  }


  editTitleHandler(value){
    var localmessage = this.state.singlemessage
    localmessage['title'] = value;
    this.setState({
      singlemessage: localmessage
    })
  }

  editMessageHandler(value){
    var localmessage = this.state.singlemessage
    localmessage['message'] = value;
    this.setState({
      singlemessage: localmessage
    })
  }

  retrieveMessagesfunction(){
    console.log('inside retrieveMessagesfunction');
    this.props.store.dispatch(messageGET())
    this.setState({
      messageBackground: 'rgb(49,51,72)'
    })
  }

  render() {
    let listMessages;

      if(this.state.messageList.length!=0){
            listMessages = this.state.messageList.map((message,i) => {
              return (
                <ListMessage key={i} message={message} openMessage={this.openMessage.bind(this)}/>
              );
            });
      }

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
              Welcome to Page 2
            </h1>
          </TitleBar>
          <ButtonHolder>
            <PositionRelative>
              <RaisedButton label="Retrieve All Messages!" primary={true}   onClick={()=>this.retrieveMessagesfunction()}/>
            </PositionRelative>
          </ButtonHolder>
          <MessageHolder backgroundColor={this.state.messageBackground}>
            <PositionRelative>
              <List>
                {listMessages}
              </List>
            </PositionRelative>
          </MessageHolder>
          {renderIf(this.state.showmessage===true)(
            <SingleMessage>
              <PositionRelative>
                <FlexColumn>
                  <Flex1>
                    <TextField
                      hintText="Message Title"
                      value={this.state.singlemessage.title}
                      onChange={(e)=>this.editTitleHandler(e.target.value)}
                    />
                  </Flex1>
                  <Flex2>
                    <TextField
                      hintText="Message Here!"
                      multiLine={true}
                      rows={2}
                      rowsMax={4}
                      value={this.state.singlemessage.message}
                      onChange={(e)=>this.editMessageHandler(e.target.value)}
                    />
                  </Flex2>
                  <Flex1>
                    <TextField
                      hintText="Hope You Remember!"
                      floatingLabelText="Enter Password to Edit!"
                      type="password"
                      value={this.state.secret}
                      onChange={(e)=>this.setState({secret: e.target.value})}
                    />
                  </Flex1>
                  <Flex1>
                    <FlexRow>
                      <Flex1>
                        <RaisedButton label="EDIT" primary={true}   onClick={()=>this.editMessage()}/>
                      </Flex1>
                      <Flex1/>
                      <Flex1>
                        <RaisedButton label="DELETE" primary={true}   onClick={()=>this.retrieveMessagesfunction()}/>
                      </Flex1>
                    </FlexRow>
                  </Flex1>
                </FlexColumn>
              </PositionRelative>
            </SingleMessage>
          )}
        </PositionRelative>
    );
  }
};

Page2 = connect()(Page2)
export default muiThemeable()(Page2);

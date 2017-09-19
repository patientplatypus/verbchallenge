import React, { Component } from 'react';

import { Route,  BrowserRouter as Router, Link } from 'react-router-dom'
import { Redirect } from 'react-router'

import renderIf from 'render-if';
import styled from 'styled-components';
import glamorous from 'glamorous';
import { css } from 'glamor';

import Page1 from './components/Page1/index'
import Page2 from './components/Page2/index'
import Page3 from './components/Page3/index'

import './App.css';

const GridBigContainer = styled.div`
  display: grid;
  grid-template-columns: 15vw 85vw;
  grid-template-rows: 10vh 90vh;
  grid-gap: 0vw;
  overflow: hidden;
  background-color: grey;
`

const SideBar = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  position: relative;
  background-color: tomato;
`

const TopBar = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 2;
  position: relative;
  background-color: skyblue;
`

const ContentBox = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  position: relative;
  background: purple;
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const Flex1 = styled.div`
  flex: 1;
  text-align: center;
`

const styles = {
  linkstyle: {
    textDecoration: "none"
  }
}

class App extends Component {
  render() {
    return (
      <div>
          <Router>
            <GridBigContainer>
              <SideBar>
              </SideBar>
              <TopBar>
                <FlexRow>
                  <Flex1>
                    <Link style = {styles.linkstyle} to="/">Page1</Link>
                  </Flex1>
                  <Flex1>
                    <Link style = {styles.linkstyle} to="/page2">Page2</Link>
                  </Flex1>
                  <Flex1>
                    <Link style = {styles.linkstyle} to="/page3">Page3</Link>
                  </Flex1>
                </FlexRow>
              </TopBar>
              <ContentBox>
                <Route exact path="/" component={Page1}/>
                <Route path="/page2" component={Page2}/>
                <Route path="/page3" component={Page3}/>
              </ContentBox>
            </GridBigContainer>
          </Router>
      </div>
    );
  }
}

export default App;

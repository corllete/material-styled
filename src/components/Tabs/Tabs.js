import React, { PureComponent, Children, isValidElement, cloneElement } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InkBar from './InkBar';

const TabsContainer = styled.nav`
  position: relative;
  margin: 0 auto;
  text-transform: uppercase;
  width: 100%;
  color: ${props => props.theme.textColors.primary};
`;

const Content = styled.div`
  font-family: lato, sans-serif;
  text-transform: none;
`;

const TabNavigationContainer = styled.div`
  background-color: transparent;
`;

class TabsComponent extends PureComponent {
  static propTypes = {
    width: PropTypes.number,
    showInkbar: PropTypes.bool,
    activeBackgroundColor: PropTypes.string,
    passiveBackgroundColor: PropTypes.string,
    activeFontColor: PropTypes.string,
    passiveFontColor: PropTypes.string,
    inkbarColor: PropTypes.string,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    width: undefined,
    showInkbar: true,
    activeBackgroundColor: '',
    passiveBackgroundColor: '',
    activeFontColor: '',
    inkbarColor: '',
    passiveFontColor: '',
  }

  constructor(props) {
    super(props);
    const tabs = [];
    Children.forEach(props.children, (tab) => {
      if (isValidElement(tab)) {
        tabs.push(tab);
      }
    });
    const numTabs = tabs.length;
    this.state = {
      selectedIndex: 0,
      tabs,
      numTabs,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.setTabWidth);
    this.setTabWidth();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setTabWidth);
  }

  setTabWidth = () => {
    const tabWidth =
      this.props.width ||
      parseInt(this.tabs.getBoundingClientRect().width / this.state.numTabs, 10);
    this.setState({ tabWidth }); // eslint-disable-line 
  }

  getSelected = index => this.state.selectedIndex === index;

  updateSelectedIndex = selectedIndex => this.setState({ selectedIndex });

  render() {
    const tabContent = [];
    const tabNavigation = this.state.tabs.map((tab, i) => {
      const selected = this.getSelected(i);
      tabContent.push(tab.props.children ? <Content>{tab.props.children}</Content> : undefined);
      return cloneElement(tab, {
        key: i,
        index: i,
        selected,
        tabWidth: this.state.tabWidth,
        numTabs: this.state.numTabs,
        onClick: this.updateSelectedIndex,
        activeBackgroundColor: this.props.activeBackgroundColor,
        passiveBackgroundColor: this.props.passiveBackgroundColor,
        activeFontColor: this.props.activeFontColor,
        passiveFontColor: this.props.passiveFontColor,
      });
    });

    return (
      // eslint-disable-next-line
      <TabsContainer innerRef={node => this.tabs = node} className='smc-tab-bar'>
        <TabNavigationContainer className="smc-tab-navigation-container">
          {tabNavigation}
        </TabNavigationContainer>
        {this.props.showInkbar ?
          <InkBar
            numTabs={this.state.numTabs}
            selectedIndex={this.state.selectedIndex}
            tabWidth={this.state.tabWidth}
            inkbarColor={this.props.inkbarColor} /> :
          null
        }
        {tabContent[this.state.selectedIndex]}
      </TabsContainer>
    );
  }
}

const Tabs = styled(TabsComponent)``;

export default Tabs;

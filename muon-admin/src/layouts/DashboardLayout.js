import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Button, Badge, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Header, SidebarNav, Footer, PageContent, Avatar, Chat, PageAlert, Page } from '../vibe';
import jwt_decode from 'jwt-decode';
import Logo from '../assets/images/vibe-logo.svg';
import avatar1 from '../assets/images/avatar1.png';
import nav from '../_nav';
import routes from '../views';
import ContextProviders from '../vibe/components/utilities/ContextProviders';
import handleKeyAccessibility, { handleClickAccessibility } from '../vibe/helpers/handleTabAccessibility';
import '../muon-styles.css';

import { connect } from 'react-redux';
import { logOut } from '../store/actions/authActions';
import { isSuperAdmin } from '../utils/roles';

const MOBILE_SIZE = 992;

// This Component handles the Sidebar, and top Navigation bar

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapsed: false,
      isMobile: window.innerWidth <= MOBILE_SIZE,
      showChat1: true,
      initials: this.props.user.fullName
        ? `${this.props.user.fullName[0].toUpperCase()}.${this.props.user.fullName[1].toUpperCase()}`
        : 'M.O',
    };
  }

  handleResize = () => {
    if (window.innerWidth <= MOBILE_SIZE) {
      this.setState({ sidebarCollapsed: false, isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  };

  componentDidUpdate(prev) {
    if (this.state.isMobile && prev.location.pathname !== this.props.location.pathname) {
      this.toggleSideCollapse();
    }
  }

  async componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('keydown', handleKeyAccessibility);
    document.addEventListener('click', handleClickAccessibility);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  toggleSideCollapse = () => {
    this.setState(prevState => ({ sidebarCollapsed: !prevState.sidebarCollapsed }));
  };

  closeChat = () => {
    this.setState({ showChat1: false });
  };

  render() {
    const { sidebarCollapsed, initials } = this.state;
    const { email, fullName } = this.props.user;

    const sidebarCollapsedClass = sidebarCollapsed ? 'side-menu-collapsed' : '';
    return (
      <ContextProviders>
        <div className={`app ${sidebarCollapsedClass}`}>
          <PageAlert />
          <div className="app-body">
            <SidebarNav
              nav={nav}
              logo={Logo}
              logoText="MUON Admin"
              isSidebarCollapsed={sidebarCollapsed}
              toggleSidebar={this.toggleSideCollapse}
              {...this.props}
            />
            <Page>
              <Header
                toggleSidebar={this.toggleSideCollapse}
                isSidebarCollapsed={sidebarCollapsed}
                routes={routes}
                {...this.props}
              >
                <HeaderNav email={email} fullName={fullName} initials={initials} props={this.props} />
              </Header>
              <PageContent>
                <Switch>
                  {routes.map((page, key) => (
                    <Route path={page.path} component={page.component} exact={page.exact} key={key} />
                  ))}
                  <Redirect from="/" to="/auth/login" />
                </Switch>
              </PageContent>
            </Page>
          </div>
          <Footer>
            <span>Copyright © 2021 Muon. All rights reserved.</span>
          </Footer>
        </div>
      </ContextProviders>
    );
  }
}

function HeaderNav({ email, fullName, initials, props }) {
  return (
    <React.Fragment>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          <i className="fa fa-user-circle fa-lg" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem className="text-center" disabled>
            <div
              style={{
                height: 70,
                width: 70,
                backgroundColor: '#bbb',
                borderRadius: '50%',
                display: 'inline-block',
              }}
            >
              <p style={{ color: '#fff', marginTop: '33%', fontWeight: 'bold' }}>{initials}</p>
            </div>
          </DropdownItem>
          <DropdownItem className="h5 text-center primary-color-text mb-0" disabled>
            {fullName}
          </DropdownItem>
          <DropdownItem className="h6 mb-0" disabled>
            {email}
          </DropdownItem>
          <DropdownItem className="h6 text-center primary-color-text mb-2" disabled>
            {isSuperAdmin() ? 'Super Admin' : 'Admin'}
          </DropdownItem>
          <DropdownItem className="h6" divider style={{ marginBottom: 0 }} />
          <DropdownItem
            className="primary-color-text mb-0"
            onClick={() => {
              props.history.push('/auth/login');
              props.logOut();
            }}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <UncontrolledDropdown nav inNavbar>
        <DropdownMenu right>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Reset</DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { logOut })(DashboardLayout);

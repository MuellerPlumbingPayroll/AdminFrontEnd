/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classNames from 'classnames';
import SidebarContent from './partials/SideBarContent';
import '../stylesheets/vars.scss';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// eslint-disable-next-line no-undef

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutMode: 'static',
      layoutColorMode: 'dark',
      mobileMenuActive: false,
    };
  }

  isDesktop = () => {
    return window.innerWidth > 1024;
  }

  componentDidUpdate = ()=> {
    if (this.state.mobileMenuActive) { this.addClass(document.body, 'body-overflow-hidden'); } else { this.removeClass(document.body, 'body-overflow-hidden'); }
  }

  render() {
    const listOf = [
      { label: 'Manage Employees', icon: 'pi pi-fw pi-users' },
      { label: 'Manage Jobs', icon: 'pi pi-fw pi-home' },
      { label: 'Manage Job Codes', icon: 'pi pi-fw pi-key' },
      { label: 'Download Time Sheets', icon: 'pi pi-fw pi-calendar' },
    ];
  
    const wrapperClass = classNames('layout-wrapper', {
      'layout-static': this.state.layoutMode === 'static',
      'layout-mobile-sidebar-active': this.state.mobileMenuActive,
    });
    const sidebarClassName = classNames('layout-sidebar', { 'layout-sidebar-dark': this.state.layoutColorMode === 'dark' });
    return (
      <div className={wrapperClass}>
        <div className={sidebarClassName}>
          <SidebarContent model={listOf}/>
        </div>
      </div>
    );
  }
}

export default App;

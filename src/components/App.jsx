/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classNames from 'classnames';
import { Menu } from 'primereact/menu';
import TimeSheets from './TimeSheets';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import '../stylesheets/vars.scss';
import CostCodes from './CostCodes';
import Employees from './Employees';
import Welcome from './Welcome';
import Jobs from './Jobs';

// eslint-disable-next-line no-undef

class App extends React.Component {
  constructor(props) {
    super(props);
    this.renderPage = this.renderPage.bind(this);
    this.state = {
      layoutMode: 'static',
      // layoutColorMode: 'dark',
      mobileMenuActive: false,
      mode: 'welcome',
<<<<<<< HEAD
      listOf:[
        { label: 'Manage Employees', icon: 'pi pi-fw pi-users', command:(e)=>{this.setState({mode: 'emps'})}},
        { label: 'Manage Jobs', icon: 'pi pi-fw pi-home' , command:(e)=>{this.setState({mode: 'jobs'})}},
        { label: 'Manage Cost Codes', icon: 'pi pi-fw pi-key', command:(e)=>{this.setState({mode: 'costcodes'})}},
        { label: 'Download Time Sheets', icon: 'pi pi-fw pi-calendar', command:(e)=>{this.setState({mode: 'timesheets'})}}
      ],
    };
  }

    renderPage() {
    if(this.state.mode === 'welcome'){
      return <Welcome/>;
    } else if(this.state.mode === 'timesheets'){
      return <TimeSheets/>;
    } else if(this.state.mode === 'costcodes'){
      return <CostCodes/>;
    } else if(this.state.mode === 'jobs'){
      return <Jobs/>;
    } else if(this.state.mode === 'emps'){
      return <Employees/>;
    } else {
      return <div>Couldn't find page</div>
=======
    };
  }

  renderPage() {
    if (this.state.mode === 'welcome') {
      return <Welcome />;
    } if (this.state.mode === 'timesheets') {
      return <TimeSheets />;
    } if (this.state.mode === 'jobcodes') {
      return <CostCodes />;
    } if (this.state.mode === 'jobs') {
      return <Jobs />;
    } if (this.state.mode === 'emps') {
      return <Employees />;
>>>>>>> 1620c15c436abdbfb9fa0df93fe72bfbfbdfb38a
    }
    return <div>Couldn't find page</div>;
  }

  /*
  isDesktop = () => {
    return window.innerWidth > 1024;
  }
  componentDidUpdate = ()=> {
    if (this.state.mobileMenuActive) { this.addClass(document.body, 'body-overflow-hidden'); } else { this.removeClass(document.body, 'body-overflow-hidden'); }
  }
*/
  render() {
<<<<<<< HEAD
=======
    const listOf = [
      { label: 'Manage Employees', icon: 'pi pi-fw pi-users', command: (e) => { this.setState({ mode: 'emps' }); } },
      { label: 'Manage Jobs', icon: 'pi pi-fw pi-home', command: (e) => { this.setState({ mode: 'jobs' }); } },
      { label: 'Manage Cost Codes', icon: 'pi pi-fw pi-key', command: (e) => { this.setState({ mode: 'jobcodes' }); } },
      { label: 'Download Time Sheets', icon: 'pi pi-fw pi-calendar', command: (e) => { this.setState({ mode: 'timesheets' }); } },
    ];

>>>>>>> 1620c15c436abdbfb9fa0df93fe72bfbfbdfb38a
    const wrapperClass = classNames('layout-wrapper', {
      'layout-static': this.state.layoutMode === 'static',
      'layout-mobile-sidebar-active': this.state.mobileMenuActive,
    });
    const sidebarClassName = classNames('layout-sidebar', { 'layout-sidebar-dark': this.state.layoutColorMode === 'dark' });
    const topBar = classNames('layout-topbar');
    return (
      <div className={wrapperClass}>
        <div className={topBar} style={{ fontFamily: 'bakersville', fontStyle: 'bold', fontSize: '50px' }}>
          Muller Plumbing
        </div>
        <div className={sidebarClassName}>
<<<<<<< HEAD
          <Menu model={this.state.listOf}/>
        </div>
          {this.renderPage()}
        <div>
=======
          <Menu model={listOf} />
>>>>>>> 1620c15c436abdbfb9fa0df93fe72bfbfbdfb38a
        </div>
        {this.renderPage()}
        <div />
      </div>
    );
  }
}

export default App;

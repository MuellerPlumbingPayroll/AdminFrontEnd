/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import '../stylesheets/vars.scss';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// eslint-disable-next-line no-undef

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutMode: 'static',
      // layoutColorMode: 'dark',
      mobileMenuActive: false,
    };
  }

  render() {
    const wrapperClass = classNames('layout-wrapper', {
      'layout-static': this.state.layoutMode === 'static',
      'layout-mobile-sidebar-active': this.state.mobileMenuActive,
    });
    const sidebarClassName = classNames('layout-sidebar', { 'layout-sidebar-dark': this.state.layoutColorMode === 'dark' });
    const mainPart = classNames('layout-main');
    const maDate = new Date();
    const miDate = new Date(maDate.getFullYear() - 1, 0, 1);
    const testInfo = ['Brian', 'test@gmail.com', '', ''];
    return (
      <div className={wrapperClass}>
        <div className={mainPart}>
          <div className="p-g p-fluid dashboard">
            <h2>Manage Jobs</h2>
            <h4 />
            <div className="p-g-12 p-md-9">
              <div className="dataTable">
                <DataTable value={testInfo} scrollable="true" scrollHeight="200px">
                  <Column field="client" header="Client" filter filterMatchMode="contains" filterType="inputtext" />
                  <Column field="address" header="Address" filter filterMatchMode="contains" filterType="inputtext" />
                  <Column field="del" header="Delete " selectionMode="multiple" style={{ textAlign: 'center' }} />
                </DataTable>
              </div>
            </div>
            <div className="p-g-12 p-md-3">
              <div className="deleteCodes">
                <Button label="Delete Selected" className="p-button-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Jobs;

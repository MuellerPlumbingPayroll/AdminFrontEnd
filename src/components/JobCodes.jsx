/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'
import '../stylesheets/vars.scss';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// eslint-disable-next-line no-undef

class JobCodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutMode: 'static',
      //layoutColorMode: 'dark',
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
    const miDate = new Date(maDate.getFullYear()-1, 0, 1);
    let testInfo = ["Brian","test@gmail.com","","" ]
    return (
      <div className={wrapperClass}>
        <div className={mainPart}>
            <div class="p-g p-fluid dashboard">
                <h2>Manage Job Codes</h2>
                <h4></h4>
                <div class="p-g-12 p-md-9">
                  <div class="dataTable">
                    <DataTable value={testInfo}scrollable="true"scrollHeight="200px">
                        <Column field="code" header="Code" filter={true} filterMatchMode={"contains"} filterType={"inputtext"}/>
                        <Column field="desc" header="Description" filter={true} filterMatchMode={"contains"} filterType={"inputtext"}/>
                        <Column field="del" header="Delete " selectionMode="multiple" style={{textAlign:'center'}}/>
                    </DataTable>
                  </div>  
                </div>
                <div class="p-g-12 p-md-3">
                  <div class="deleteCodes">
                    <Button label="Delete Selected" className="p-button-primary" />
                  </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default JobCodes;

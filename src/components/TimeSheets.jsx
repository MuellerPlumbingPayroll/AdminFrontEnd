/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import '../stylesheets/vars.scss';

// eslint-disable-next-line no-undef


class TimeSheets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutMode: 'static',
      selected: [],
      todayDay: new Date(),
      startDate: null,
      endDate: null,
      errorEmps: false,
      errorDate: false,
      sales: [
        {name: 'Jane Doe', email: 'jdoemuller@gmail.com'},
        {name: 'Jim Deer', email: 'jdeermuller@gmail.com'},
        {name: 'John Adams', email: 'jadamsmuller@gmail.com'},
        {name: 'Ryan Baker', email: 'rbakermuller@gmail.com'},
        {name: 'Will Patel', email: 'wpatelmuller@gmail.com'},
        {name: 'Garrett Quinn', email: 'gquinnmuller@gmail.com'},
        {name: 'Todd White', email: 'twhitemuller@gmail.com'},
        {name: 'Colin Clark', email: 'cclarckmuller@gmail.com'},
        {name: 'Greg Evans', email: 'gevansmuller@gmail.com'},
        {name: 'Phillip Frank', email: 'pfrankmuller@gmail.com'},
        {name: 'Connor Jones', email: 'cjonesmuller@gmail.com'},
        {name: 'Jack Mason', email: 'jmasonmuller@gmail.com'},
        {name: 'Ian Klein', email: 'ikleinmuller@gmail.com'},
        {name: 'Martin Smith', email: 'msmithmuller@gmail.com'},
        {name: 'Rob Davis', email: 'rdavismuller@gmail.com'},
        {name: 'Josh Anderson', email: 'jandersonmuller@gmail.com'},
        {name: 'Aaron Lopez', email: 'alopezmuller@gmail.com'},
 
      ],
    };
    // event handlers
    this.allClicked = this.allClicked.bind(this);
    this.restrictDate = this.restrictDate.bind(this);
    this.lastPayPeriod = this.lastPayPeriod.bind(this);
    this.goBackAYear = this.goBackAYear.bind(this);
    this.checkDownload = this.checkDownload.bind(this);
  }
  
  allClicked(){
    if(this.state.selected.length === 0){
      this.setState({selected: this.state.sales});
    } else {
      this.setState({ selected: [] });
    }
  }

  restrictDate() {
    if (this.state.startDate != null) {
      return this.state.startDate;
    }
    return new Date((new Date()).getFullYear() - 1, 0, 1);
  }

  goBackAYear(date, past) {
    if ((date.getDate() <= past) && (date.getMonth() === 0)) {
      return new Date(date.getFullYear() - 1, 11, (31 - (past - date.getDate())));
    } if (date.getDay() < past) {
      const temp = new Date(date.getFullYear(), date.getMonth(), 0);
      return new Date(date.getFullYear(), temp.getMonth(), temp.getDate() - (past - date.getDate()));
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - past);
  }


  lastPayPeriod(){
    let today = this.state.todayDay;
    let sd = new Date();
    let ed = new Date();
    const day = today.getDay();
    if (day === 1) {
      sd = this.goBackAYear(today, 12);
      ed = this.goBackAYear(today,6);
    } else if(day===2){
      sd = this.goBackAYear(today,13);
      ed = this.goBackAYear(today,7);
    }else if(day===3){
      sd = this.goBackAYear(today,7);
      ed = this.goBackAYear(today,1);
    }else if(day===4){
      sd = this.goBackAYear(today,8);
      ed = this.goBackAYear(today,2);
    }else if(day===5){
      sd = this.goBackAYear(today,9);
      ed = this.goBackAYear(today,3);
    }else if(day===6){
      sd = this.goBackAYear(today,10);
      ed = this.goBackAYear(today,4);
    }else if(day===0){
      sd = this.goBackAYear(today,11);
      ed = this.goBackAYear(today,5);
    }
    this.setState({startDate: sd, endDate: ed});
  }

  checkDownload(){
    if(this.state.selected.length === 0){
      this.setState({errorEmps: true});
    } if((this.state.startDate === null) || (this.state.endDate === null)){
      this.setState({errorDate: true});
    }
  }

  render() {
    const wrapperClass = classNames('layout-wrapper', {
      'layout-static': this.state.layoutMode === 'static',
      'layout-mobile-sidebar-active': this.state.mobileMenuActive,
    });
    const mainPart = classNames('layout-main');
    // const buttonPart = classNames('layout-main-button');
    const maDate = new Date();
    const miDate = new Date(maDate.getFullYear() - 1, 0, 1);
    return (
      <div className={wrapperClass}>
        <div className={mainPart}>
          <div>
            <div>
                <div>
                  <div style={{textAlign: 'center', fontSize: '25px'}}>Download Time Sheets</div>
                  <h2>Select Employees</h2>
                  <div>
                    <DataTable value={this.state.sales} scrollable={true}scrollHeight="150px"selection={this.state.selected} onSelectionChange={e => this.setState({selected: e.value})}>
                        <Column field="name" header="Name" filter={true} filterMatchMode={"contains"} filterType={"inputtext"}/>
                        <Column field="email" header="Email" />
                        <Column selectionMode="multiple" field="del" header="Select " style={{textAlign:'center'}} />
                    </DataTable>
                  </div>  
                </div>
                <div style={{paddingBottom: '5px', paddingTop: '5px'}}>
                  <div>Or:</div>
                  <Button id="allEmps" label="All Employees" className="p-button-primary" width="20px" onClick={this.allClicked}/>
                </div>
                <h2>Select Date Range</h2>
                  <div style={{marginLeft: '10px'}}>
                    <div style={{paddingBottom: '5px', paddingTop: '5px', paddingLeft: '5px'}}>
                      From:
                      <Calendar minDate={miDate} maxDate={maDate} readOnlyInput value={this.state.startDate} onSelect={e => this.setState({ startDate: e.value })} showIcon />
                    </div>
                    <div style={{ paddingBottom: '5px', paddingTop: '5px', paddingLeft: '5px' }}>
                      To:
                      <Calendar minDate={this.restrictDate()} maxDate={maDate} readOnlyInput={true} value={this.state.endDate} onSelect={(f) => this.setState({endDate: f.value})} showIcon={true}></Calendar>
                    </div>
                  </div>
                <div style={{paddingBottom: '5px'}}>   
                  <div>Or:</div>
                  <Button id="lastFin" label="Last Finished Pay Period" className="p-button-primary" onClick={this.lastPayPeriod}/>
                </div>
                <div style={{paddingBottom: '5px', paddingTop: '5px'}}>
                  <Button id="download" label="Download Time Sheets" className="p-button-success" onClick={this.checkDownload}/>
                  <Dialog header="You have not selected any Employees" visible={this.state.errorEmps} style={{width: '50vw'}} modal={true} onHide={(e) => this.setState({errorEmps: false})}>
                    Please either select employees individually or click the button "All employees"
                  </Dialog>
                  <Dialog header="You have not selected a Date Range" visible={this.state.errorDate} style={{ width: '50vw' }} modal onHide={e => this.setState({ errorDate: false })}>
                        Please either select dates individually or click the button "Last Pay Period"
                  </Dialog>`
                </div>
              </div>
            </div>  
        </div>
      </div>
    );
  }
}

export default TimeSheets;

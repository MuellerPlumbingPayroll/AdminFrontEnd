/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import '../stylesheets/vars.scss';
import axios from 'axios';

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
      users: null,
    };
  }

  componentDidMount = async () =>{
    try{
      const newUsers = await axios('https://api-dot-muller-plumbing-salary.appspot.com/users');
      this.setState({users: newUsers.data});
    } catch (e){
      console.error(e);
      this.setState({users: []});
    }
  }
  
  allClicked = () => {
    if(this.state.selected.length !== this.state.users.length){
      this.setState({selected: this.state.users});
    } else {
      this.setState({ selected: [] });
    }
  }

  restrictDate = () => {
    if (this.state.startDate != null) {
      return this.state.startDate;
    }
    return new Date((new Date()).getFullYear() - 1, 0, 1);
  }

  isActive = (rowData) => {
    return rowData.isActive;
  }

  goBackAYear = (date, past) => {
    if ((date.getDate() <= past) && (date.getMonth() === 0)) {
      return new Date(date.getFullYear() - 1, 11, (31 - (past - date.getDate())));
    } if (date.getDay() < past) {
      const temp = new Date(date.getFullYear(), date.getMonth(), 0);
      return new Date(date.getFullYear(), temp.getMonth(), temp.getDate() - (past - date.getDate()));
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - past);
  }


  lastPayPeriod = () => {
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

  checkDownload = () => {
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
            <div className="container">
                <div>
                  <div style={{textAlign: 'center', fontSize: '25px'}}>Download Time Sheets</div>
                  <h2>Select Employees</h2>
                  <div>
                    <DataTable value={this.state.users} scrollable={true}scrollHeight="150px"selection={this.state.selected} onSelectionChange={e => this.setState({selected: e.value})}>
                        <Column field="email" header="Email" filter={true} filterMatchMode={"contains"} filterType={"inputtext"}/>
                        <Column field="isActive" header="Active " style={{textAlign:'center'}} body={ (rowData, column) => (
                            <Checkbox checked={this.isActive(rowData)} />) }/>
                        <Column selectionMode="multiple" field="select" header="Select " style={{textAlign:'center'}} />
                    </DataTable>
                  </div>  
                </div>
                <div style={{paddingBottom: '5px', paddingTop: '5px'}}>
                  <div>Or:</div>
                  <Button id="allEmps" label="All Employees" className="p-button-primary" width="20px" onClick={this.allClicked}/>
                </div>
                <h2>Select Date Range</h2>
                  <div style={{marginLeft: '10px'}}>
                    <div className = "col-6"style={{paddingBottom: '5px', paddingTop: '5px', paddingLeft: '5px'}}>
                      From:
                      <Calendar minDate={miDate} maxDate={maDate} readOnlyInput value={this.state.startDate} onSelect={e => this.setState({ startDate: e.value })} showIcon />
                    </div>
                    <div className = "col-6" style={{ paddingBottom: '5px', paddingTop: '5px', paddingLeft: '5px' }}>
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

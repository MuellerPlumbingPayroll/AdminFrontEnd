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

<<<<<<< HEAD
=======
const sales = [
  { name: 'Apple', email: '51%', test: '40%' },
  { name: 'Samsung', email: '83%', test: '96%' },
  { name: 'Microsoft', email: '38%', test: '5%' },
  { name: 'A', email: '51%', test: '40%' },
  { name: 'B', email: '83%', test: '96%' },
  { name: 'C', email: '38%', test: '5%' },
  { name: 'D', email: '51%', test: '40%' },
  { name: 'e', email: '83%', test: '96%' },
  { name: 'f', email: '38%', test: '5%' },
  { name: 'g', email: '51%', test: '40%' },
  { name: 'h', email: '83%', test: '96%' },
  { name: 'i', email: '38%', test: '5%' },
  { name: 'j', email: '51%', test: '40%' },
  { name: 'k', email: '83%', test: '96%' },
  { name: 'l', email: '38%', test: '5%' },
  { name: 'm', email: '51%', test: '40%' },
  { name: 'n', email: '83%', test: '96%' },
  { name: 'o', email: '38%', test: '5%' },
  { name: 'p', email: '51%', test: '40%' },
  { name: 'q', email: '83%', test: '96%' },
  { name: 'r', email: '38%', test: '5%' },
];
>>>>>>> 1620c15c436abdbfb9fa0df93fe72bfbfbdfb38a

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
        {name: 'Apple', email: '51%', test: '40%'},
        {name: 'Samsung', email: '83%', test: '96%'},
        {name: 'Microsoft', email: '38%', test: '5%'},
        {name: 'A', email: '51%', test: '40%'},
        {name: 'B', email: '83%', test: '96%'},
        {name: 'C', email: '38%', test: '5%'},
        {name: 'D', email: '51%', test: '40%'},
        {name: 'e', email: '83%', test: '96%'},
        {name: 'f', email: '38%', test: '5%'},
        {name: 'g', email: '51%', test: '40%'},
        {name: 'h', email: '83%', test: '96%'},
        {name: 'i', email: '38%', test: '5%'},
        {name: 'j', email: '51%', test: '40%'},
        {name: 'k', email: '83%', test: '96%'},
        {name: 'l', email: '38%', test: '5%'},
        {name: 'm', email: '51%', test: '40%'},
        {name: 'n', email: '83%', test: '96%'},
        {name: 'o', email: '38%', test: '5%'},
        {name: 'p', email: '51%', test: '40%'},
        {name: 'q', email: '83%', test: '96%'},
        {name: 'r', email: '38%', test: '5%'}
      ],
    };
    // event handlers
    this.allClicked = this.allClicked.bind(this);
    this.restrictDate = this.restrictDate.bind(this);
    this.lastPayPeriod = this.lastPayPeriod.bind(this);
    this.goBackAYear = this.goBackAYear.bind(this);
    this.checkDownload = this.checkDownload.bind(this);
  }
<<<<<<< HEAD
  
  allClicked(){
    if(this.state.selected.length === 0){
      this.setState({selected: this.state.sales});
=======

  allClicked() {
    if (this.state.selected.length === 0) {
      this.setState({ selected: sales });
>>>>>>> 1620c15c436abdbfb9fa0df93fe72bfbfbdfb38a
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


<<<<<<< HEAD
  lastPayPeriod(){
    let today = this.state.todayDay;
=======
  lastPayPeriod() {
    const today = new Date();
    // let today = new Date(today1.getFullYear(), 6, 5);
>>>>>>> 1620c15c436abdbfb9fa0df93fe72bfbfbdfb38a
    let sd = new Date();
    let ed = new Date();
    const day = today.getDay();
    if (day === 1) {
      sd = this.goBackAYear(today, 12);
<<<<<<< HEAD
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
=======
      ed = this.goBackAYear(today, 6);
      this.setState({ startDate: sd, endDate: ed });
    } else if (day === 2) {
      sd = this.goBackAYear(today, 13);
      ed = this.goBackAYear(today, 7);
      this.setState({ startDate: sd, endDate: ed });
    } else if (day === 3) {
      sd = this.goBackAYear(today, 7);
      ed = this.goBackAYear(today, 1);
      this.setState({ startDate: sd, endDate: ed });
    } else if (day === 4) {
      sd = this.goBackAYear(today, 8);
      ed = this.goBackAYear(today, 2);
      this.setState({ startDate: sd, endDate: ed });
    } else if (day === 5) {
      sd = this.goBackAYear(today, 9);
      ed = this.goBackAYear(today, 3);
      this.setState({ startDate: sd, endDate: ed });
    } else if (day === 6) {
      sd = this.goBackAYear(today, 10);
      ed = this.goBackAYear(today, 4);
      this.setState({ startDate: sd, endDate: ed });
    } else if (day === 0) {
      sd = this.goBackAYear(today, 11);
      ed = this.goBackAYear(today, 5);
      this.setState({ startDate: sd, endDate: ed });
>>>>>>> 1620c15c436abdbfb9fa0df93fe72bfbfbdfb38a
    }
    this.setState({startDate: sd, endDate: ed});
  }

<<<<<<< HEAD
  checkDownload(){
    if(this.state.selected.length === 0){
      this.setState({errorEmps: true});
    } if((this.state.startDate === null) || (this.state.endDate === null)){
      this.setState({errorDate: true});
=======
  checkDownload() {
    if (this.state.selected.length === 0) {
      this.setState({ errorEmps: true });
    } if ((this.state.startDate === null) || (this.state.endDate === null)) {
      console.log(this.state.selected);
      this.setState({ errorDate: true });
>>>>>>> 1620c15c436abdbfb9fa0df93fe72bfbfbdfb38a
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
<<<<<<< HEAD
                <div>
                  <div style={{textAlign: 'center', fontSize: '25px'}}>Download Time Sheets</div>
                  <h2>Select Employees</h2>
                  <div>
                    <DataTable value={this.state.sales} scrollable={true}scrollHeight="150px"selection={this.state.selected} onSelectionChange={e => this.setState({selected: e.value})}>
                        <Column field="name" header="Name" filter={true} filterMatchMode={"contains"} filterType={"inputtext"}/>
                        <Column field="email" header="Email" />
                        <Column field="test" header="Test" />
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
=======
              <div style={{ textAlign: 'center', fontSize: '25px' }}>Download Time Sheets</div>
              <h2>Select Employees</h2>
              <div>
                <DataTable value={sales} scrollable scrollHeight="150px" selection={this.state.selected} onSelectionChange={e => this.setState({ selected: e.value })}>
                  <Column field="name" header="Name" filter filterMatchMode="contains" filterType="inputtext" />
                  <Column field="email" header="Email" />
                  <Column field="test" header="Test" />
                  <Column selectionMode="multiple" field="del" header="Select " style={{ textAlign: 'center' }} />
                </DataTable>
              </div>
            </div>
            <div style={{ paddingBottom: '5px', paddingTop: '5px' }}>
              <div>Or:</div>
              <Button label="All Employees" className="p-button-primary" width="20px" onClick={this.allClicked} />
            </div>
            <h2>Select Date Range</h2>
            <div style={{ marginLeft: '10px' }}>
              <div style={{ paddingBottom: '5px', paddingTop: '5px', paddingLeft: '5px' }}>
>>>>>>> 1620c15c436abdbfb9fa0df93fe72bfbfbdfb38a
                      From:
                <Calendar minDate={miDate} maxDate={maDate} readOnlyInput value={this.state.startDate} onSelect={e => this.setState({ startDate: e.value })} showIcon />
              </div>
              <div style={{ paddingBottom: '5px', paddingTop: '5px', paddingLeft: '5px' }}>
                      To:
<<<<<<< HEAD
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
=======
                <Calendar minDate={this.restrictDate()} maxDate={maDate} readOnlyInput value={this.state.endDate} onSelect={f => this.setState({ endDate: f.value })} showIcon />
              </div>
            </div>
            <div style={{ paddingBottom: '5px' }}>
              <div>Or:</div>
              <Button label="Last Finished Pay Period" className="p-button-primary" onClick={this.lastPayPeriod} />
            </div>
            <div style={{ paddingBottom: '5px', paddingTop: '5px' }}>
              <Button label="Download Time Sheets" className="p-button-success" onClick={this.checkDownload} />
              <Dialog header="You have not selected any Employees" visible={this.state.errorEmps} style={{ width: '50vw' }} modal onHide={e => this.setState({ errorEmps: false })}>
>>>>>>> 1620c15c436abdbfb9fa0df93fe72bfbfbdfb38a
                    Please either select employees individually or click the button "All employees"
              </Dialog>
              <Dialog header="You have not selected a Date Range" visible={this.state.errorDate} style={{ width: '50vw' }} modal onHide={e => this.setState({ errorDate: false })}>
                    Please either select dates individually or click the button "Last Pay Period"
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimeSheets;

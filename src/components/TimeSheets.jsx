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
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
      let notAdmin = [];
      for(let i = 0; i < newUsers.data.length; i++){
        if(!newUsers.data[i]['isAdmin']){
          notAdmin.push(newUsers.data[i]);
        }
      }
      this.setState({users: newUsers.data});
    } catch (e){
      console.error(e);
      this.setState({users: []});
    }
  }
  
  allClicked = () => {
    let allU = this.state.users;
    let actives = [];
    for(let i = 0; i < allU.length; i++){
      if(allU[i]['isActive']){
        actives.push(allU[i]);
      }
    }
    this.setState({selected: actives});
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

  findPayPeriods = (starting, ending) => {
    if(starting.getDay() !== 3 || ending.getDay() !== 2){
      console.log("Wrong dates");
    } else {
      let dates = [];
      let currentDate = this.goForwardAYear(starting, 6);
      currentDate.setHours(11,59,59);
      let newDates = [starting, currentDate];
      dates.push(newDates);
      ending.setHours(11,59,59);
      let counter = 0;
      while(currentDate.getTime() !== ending.getTime() && counter < 5){
        let newStart = this.goForwardAYear(currentDate,1);
        currentDate = this.goForwardAYear(newStart, 6);
        currentDate.setHours(11,59,59);
        let range = [newStart,currentDate];
        dates.push(range);
        counter++;
      }
      return dates;
    }
    return null;
  } 

  goForwardAYear = (date, forward) => {
    if(((date.getDate()+forward) > 31) && (date.getMonth()===12)){
      return new Date(date.getFullYear()+1, 0, forward-(31-date.getDate()),0,0,0);
    } 
    let temper = new Date(date.getFullYear(), date.getMonth()+1, 0); 
    if((date.getDay()+forward) > (temper.getDate())){
;     return new Date(date.getFullYear(), date.getMonth()+1, forward-(date.getDate()-date.getDate()),0,0,0);
    } else {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate()+forward,0,0,0);
    }
  }

  goBackAYear = (date, past) => {
    if ((date.getDate() <= past) && (date.getMonth() === 0)) {
      return new Date(date.getFullYear() - 1, 11, (31 - (past - date.getDate())),0,0,0);
    } if (date.getDay() < past) {
      const temp = new Date(date.getFullYear(), date.getMonth(), 0);
      return new Date(date.getFullYear(), temp.getMonth(), temp.getDate() - (past - date.getDate()),0,0,0);
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - past,0,0,0);
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
    } else if((this.state.startDate === null) || (this.state.endDate === null)){
      this.setState({errorDate: true});
    } else {
      let ids = []
      for(let i = 0; i < this.state.selected.length; i++){
        ids.push(this.state.selected[i]['id']);
      }
      let ranges = this.findPayPeriods(this.state.startDate, this.state.endDate);
      if(ranges !== null){
        let doc = new jsPDF({orientation: 'landscape'});
        let testThing = [
          {client: "Test1", job: "FunStuff", type: "PLUMBING", wed: 7, thrus: 0, frid: 0, sat: 0, sun: 0, mon: 0, tues: 0},
          {client: "Test2", job: "FunStuff", type: "PLUMBING", wed: 1, thrus: 0, frid: 0, sat: 0, sun: 0, mon: 0, tues: 0},
          {client: "Test1", job: "FunStuff", type: "PLUMBING", wed: 0, thrus: 4, frid: 0, sat: 0, sun: 0, mon: 0, tues: 0},
          {client: "Test2", job: "FunStuff", type: "PLUMBING", wed: 0, thrus: 4, frid: 0, sat: 0, sun: 0, mon: 0, tues: 0},
          {client: "Test1", job: "FunStuff", type: "PLUMBING", wed: 0, thrus: 0, frid: 8, sat: 0, sun: 0, mon: 0, tues: 0},
          {client: "Test2", job: "FunStuff", type: "PLUMBING", wed: 0, thrus: 0, frid: 0, sat: 3, sun: 0, mon: 0, tues: 0},
          {client: "Test1", job: "FunStuff", type: "PLUMBING", wed: 0, thrus: 0, frid: 0, sat: 1, sun: 0, mon: 0, tues: 0},
          {client: "Test2", job: "FunStuff", type: "PLUMBING", wed: 0, thrus: 0, frid: 0, sat: 4, sun: 0, mon: 0, tues: 0},
          {client: "Test1", job: "FunStuff", type: "PLUMBING", wed: 0, thrus: 0, frid: 0, sat: 0, sun: 0, mon: 2, tues: 0},
          {client: "Test2", job: "FunStuff", type: "PLUMBING", wed: 0, thrus: 0, frid: 0, sat: 0, sun: 0, mon: 6, tues: 0},
          {client: "Test1", job: "FunStuff", type: "PLUMBING", wed: 0, thrus: 0, frid: 0, sat: 0, sun: 0, mon: 0, tues: 8},
          {client: "Test2", job: "FunStuff", type: "PLUMBING", wed: 0, thrus: 0, frid: 0, sat: 0, sun: 0, mon: 0, tues: 0}
        ];
        let arr = [];
        let hours = [0,0,0,0,0,0,0];
        for(let i = 0; i < testThing.length; i++){
          hours[0] += testThing[i]['wed'];
          hours[1] += testThing[i]['thrus'];
          hours[2] += testThing[i]['frid'];
          hours[3] += testThing[i]['sat'];
          hours[4] += testThing[i]['sun'];
          hours[5] += testThing[i]['mon'];
          hours[6] += testThing[i]['tues'];
          
          let inner = [];
          inner.push(testThing[i]['client']);
          inner.push(testThing[i]['job']);
          inner.push(testThing[i]['type']);
          inner.push(testThing[i]['wed']);
          inner.push(testThing[i]['thrus']);
          inner.push(testThing[i]['frid']);
          inner.push(testThing[i]['sat']);
          inner.push(testThing[i]['sun']);
          inner.push(testThing[i]['mon']);
          inner.push(testThing[i]['tues']);
          arr.push(inner);
        }  
        
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const wid = {
          0: {cellWidth: 40},
          1: {cellWidth: 60},
          2: {cellWidth: 30},
          3: {cellWidth: 7},
          4: {cellWidth: 7},
          5: {cellWidth: 7},
          6: {cellWidth: 7},
          7: {cellWidth: 7},
          8: {cellWidth: 7},
          9: {cellWidth: 7}
          // etc
        };
        let inj = "Yes";
        let names = ["Peter Parker", "Harry Potter"];

        for(let j = 0; j < ranges.length; j++){
          for(let i = 0; i < names.length; i++){
            if(i !== 0){
              doc.addPage();
            }
            let st = ranges[j][0];
            let dateW = st.getDate() + "-" + monthNames[st.getMonth()];
            let dateTh = this.goForwardAYear(st,1).getDate() + "-" + monthNames[st.getMonth()];
            let dateF = this.goForwardAYear(st,2).getDate() + "-" + monthNames[this.goForwardAYear(st,2).getMonth()];
            let dateSa = this.goForwardAYear(st,3).getDate() + "-" + monthNames[this.goForwardAYear(st,3).getMonth()];
            let dateSu = this.goForwardAYear(st,4).getDate() + "-" + monthNames[this.goForwardAYear(st,4).getMonth()];
            let dateM = this.goForwardAYear(st,5).getDate() + "-" + monthNames[this.goForwardAYear(st,5).getMonth()];
            let dateTu = this.goForwardAYear(st,6).getDate() + "-" + monthNames[this.goForwardAYear(st,6).getMonth()];
            
            doc.text(`${names[i]} ${dateW}-${dateTu}`, 14, 13);
            doc.autoTable({
              head:[['Client','Job / Description', 'Cost Code Description', `Wed ${dateW}`, `Thurs ${dateTh}`,
              `Fri ${dateF}`, `Sat ${dateSa}`, `Sun ${dateSu}`, `Mon ${dateM}`, `Tues ${dateTu}`]],
              body:arr,
              columnStyles: wid,
              pageBreak: 'avoid',
              headStyles: {fillColor: [139, 0, 0]}
            }); 
            doc.autoTable({
              body:[[`Work injury: ${inj}`, "Totals:", hours[0], hours[1], hours[2], hours[3], hours[4], hours[5], hours[6]]],
              columnStyles: {
                0: {fontSize: 12, fontStyle: 'bold', cellWidth: 70, halign: 'center'},
                1: {fontSize: 12, fontStyle: 'bold', cellWidth: 30, halign: 'right'},
                2: {fontSize: 12, fontStyle: 'bold', cellWidth: 15},
                3: {fontSize: 12, fontStyle: 'bold', cellWidth: 15},
                4: {fontSize: 12, fontStyle: 'bold', cellWidth: 15},
                5: {fontSize: 12, fontStyle: 'bold', cellWidth: 15},
                6: {fontSize: 12, fontStyle: 'bold', cellWidth: 15},
                7: {fontSize: 12, fontStyle: 'bold', cellWidth: 15},
                8: {fontSize: 12, fontStyle: 'bold', cellWidth: 15}
              }
            });
          } 
          if(j+1 !== ranges.length){
            doc.addPage();  
          }
        }
        let start = (this.state.startDate.getMonth()+1) + "-" + this.state.startDate.getDate() + "-" + this.state.startDate.getFullYear();
        let end = (this.state.endDate.getMonth()+1) + "-" + this.state.endDate.getDate() + "-" + this.state.endDate.getFullYear();
        doc.save(`TimeSheets${start}-${end}.pdf`); 
      }
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
                    <DataTable value={this.state.users} scrollable={true}scrollHeight="9vw"selection={this.state.selected} onSelectionChange={e => this.setState({selected: e.value})}>
                        <Column field="email" header="Email" filter={true} filterMatchMode={"contains"} filterType={"inputtext"}/>
                        <Column field="isActive" header="Active " style={{textAlign:'center'}} body={ (rowData, column) => (
                            <Checkbox checked={this.isActive(rowData)} />) }/>
                        <Column selectionMode="multiple" field="select" header="Select " style={{textAlign:'center'}} />
                    </DataTable>
                  </div>  
                </div>
                <div style={{paddingBottom: '5px', paddingTop: '5px'}}>
                  <div>Or:</div>
                  <Button id="allEmps" label="All Active Employees" className="p-button-primary" width="20px" onClick={this.allClicked}/>
                </div>
                <h2>Select Date Range</h2>
                  <div style={{marginLeft: '10px'}}>
                    <div className = "col-6"style={{paddingBottom: '5px', paddingTop: '5px', paddingLeft: '5px'}}>
                      From:
                      <Calendar minDate={miDate} maxDate={maDate} disabledDays={[0,1,2,4,5,6]} readOnlyInput value={this.state.startDate} onSelect={e => this.setState({ startDate: e.value })} showIcon />
                    </div>
                    <div className = "col-6" style={{ paddingBottom: '5px', paddingTop: '5px', paddingLeft: '5px' }}>
                      To:
                      <Calendar minDate={this.restrictDate()} maxDate={maDate} disabledDays={[0,1,3,4,5,6]} readOnlyInput={true} value={this.state.endDate} onSelect={(f) => this.setState({endDate: f.value})} showIcon={true}></Calendar>
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

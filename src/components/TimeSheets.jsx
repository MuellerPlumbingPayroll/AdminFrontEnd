/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataTable } from 'primereact/datatable';
import { Checkbox } from 'primereact/checkbox';
import { Column } from 'primereact/column'
import '../stylesheets/vars.scss';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


// eslint-disable-next-line no-undef

const sales = [
  {name: 'Apple', email: '51%', test: '40%'},
  {name: 'Samsung', email: '83%', test: '96%'},
  {name: 'Microsoft', email: '38%', test: '5%'},
  {name: 'Apple', email: '51%', test: '40%'},
  {name: 'Samsung', email: '83%', test: '96%'},
  {name: 'Microsoft', email: '38%', test: '5%'},
  {name: 'Apple', email: '51%', test: '40%'},
  {name: 'Samsung', email: '83%', test: '96%'},
  {name: 'Microsoft', email: '38%', test: '5%'},
  {name: 'Apple', email: '51%', test: '40%'},
  {name: 'Samsung', email: '83%', test: '96%'},
  {name: 'Microsoft', email: '38%', test: '5%'},
  {name: 'Apple', email: '51%', test: '40%'},
  {name: 'Samsung', email: '83%', test: '96%'},
  {name: 'Microsoft', email: '38%', test: '5%'},
  {name: 'Apple', email: '51%', test: '40%'},
  {name: 'Samsung', email: '83%', test: '96%'},
  {name: 'Microsoft', email: '38%', test: '5%'},
  {name: 'Apple', email: '51%', test: '40%'},
  {name: 'Samsung', email: '83%', test: '96%'},
  {name: 'Microsoft', email: '38%', test: '5%'}
]

class TimeSheets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutMode: 'static',
      selection: []
    };
    // event handlers
    this.rowClassName = this.rowClassName.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  selectable(item) {
    return true;
  }

  allSelectableItems() {
    return sales.filter(x => this.selectable(x));
  }

  isSelected(item) {
    return (this.state.selection.includes(item));
  }

  rowClassName(item) {
    // todo: add cursor hand
    return { 'ui-state-highlight' : this.isSelected(item) };
  }

  onRowClick(e) {
    const item = e.data;
    if (this.selectable(item)) {
      this.toggleSelection(item);
    }
  }

  toggleSelection(item) {
    let selection;
    if (this.isSelected(item)) {
      selection = this.state.selection.filter(x => x !== item);
    } else {
      selection = [...this.state.selection, item];
    }
    const allSelected = selection.length === this.allSelectableItems().length;
    this.setState({ allSelected, selection });
  }

  toggleAll(allSelected) {
    const selection = allSelected ? this.allSelectableItems() : [];
    this.setState({ allSelected, selection });
  }

  displaySelection(data) {
    if(!data || data.length === 0) {
        return <div style={{textAlign: 'left'}}>No Selection</div>;
    }
    else {
        if(data instanceof Array)
            return <ul style={{textAlign: 'left', margin: 0}}>{data.map((car,i) => <li key={car.vin}>{car.vin + ' - ' + car.year + ' - ' + car.brand + ' - ' + car.color}</li>)}</ul>;
        else
            return <div style={{textAlign: 'left'}}>Selected Car: {data.vin + ' - ' + data.year + ' - ' + data.brand + ' - ' + data.color}</div>
    }
  }

  render() {
  
    const wrapperClass = classNames('layout-wrapper', {
      'layout-static': this.state.layoutMode === 'static',
      'layout-mobile-sidebar-active': this.state.mobileMenuActive,
    });
    const mainPart = classNames('layout-main');
    const maDate = new Date();
    const miDate = new Date(maDate.getFullYear()-1, 0, 1);
    return (
      <div className={wrapperClass}>
        <div className={mainPart}>
            <div class="p-g p-fluid dashboard">
                <div class="p-g-12 p-md-9">
                  <h2>Download Time Sheets</h2>
                  <h4>Select Employees</h4>
                  <div class="dataTable">
                    <DataTable value={sales} scrollable="true"scrollHeight="200px">
                        <Column field="name" header="Name" filter={true} filterMatchMode={"contains"} filterType={"inputtext"}selection={this.state.selectedCars} onSelectionChange={e => this.setState({selectedCars: e.value})}/>
                        <Column field="email" header="Email" />
                        <Column field="test" header="Test" />
                        <Column field="del" header="Select " style={{textAlign:'center'}}body={ (rowData, column) => (this.selectable(rowData) ?<Checkbox onChange={() => {}} checked={this.isSelected(rowData)} />: '') }/>
                    </DataTable>
                  </div>  
                </div>
                <div class="p-g-12 p-md-3">
                  <div class="allEmp">
                    <h4>Or:</h4>
                    <Button label="All Employees" className="p-button-primary" width="20px" />
                  </div>
                </div>
                <div class="p-g-12 p-md-4">
                  <h2>Select Date Range</h2>
                  <h4>From:</h4>
                  <Calendar minDate={miDate} maxDate={maDate} readOnlyInput={true} value={this.state.date} onSelect={(e) => this.setState({date: e.value})} showIcon={true}></Calendar>
                </div>
                <div class="p-g-12 p-md-4">                  
                  <h4>To:</h4>
                  <Calendar minDate={miDate} maxDate={maDate} readOnlyInput={true} value={this.state.date} onSelect={(e) => this.setState({date: e.value})} showIcon={true}></Calendar>
                </div>
                <div class="p-g-12 p-md-4">  
                  <h4>Or:</h4>
                  <Button label="Last Finished Pay Period" className="p-button-primary" />
                </div>
                <div class="p-g-12 p-md-4">
                  <Button label="Download Time Sheets" className="p-button-success" />
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default TimeSheets;

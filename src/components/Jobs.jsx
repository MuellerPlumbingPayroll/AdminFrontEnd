/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import '../stylesheets/vars.scss';

// eslint-disable-next-line no-undef

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutMode: 'static',
      //layoutColorMode: 'dark',
      mobileMenuActive: false,
      sales: [
          {clientName: 'Apple', address: '51%', isActive: true},
          {clientName: 'Samsung', address: '83%', isActive: false},
          {clientName: 'Microsoft', address: '38%', isActive: true},
          {clientName: 'A', address: '51%', isActive: false},
          {clientName: 'B', address: '83%', isActive: true},
          {clientName: 'C', address: '38%', isActive: true},
          {clientName: 'D', address: '51%', isActive: false},
          {clientName: 'e', address: '83%', isActive: true},
          {clientName: 'f', address: '38%', isActive: false},
          {clientName: 'g', address: '51%', isActive: true},
          {clientName: 'h', address: '83%', isActive: false},
          {clientName: 'i', address: '38%', isActive: false},
          {clientName: 'j', address: '51%', isActive: true},
          {clientName: 'k', address: '83%', isActive: false},
          {clientName: 'l', address: '38%', isActive: true},
          {clientName: 'm', address: '51%', isActive: false},
          {clientName: 'n', address: '83%', isActive: true},
          {clientName: 'o', address: '38%', isActive: false},
          {clientName: 'p', address: '51%', isActive: true},
          {clientName: 'q', address: '83%', isActive: false},
          {clientName: 'r', address: '38%', isActive: false}
        ],
        visible: false,
        client: null,
        address: null,
        activity: false,
    };
    this.isActive = this.isActive.bind(this);
    this.changeActive = this.changeActive.bind(this);
    this.clientEditor = this.clientEditor.bind(this);
    this.addressEditor = this.addressEditor.bind(this);
    this.onHideYes = this.onHideYes.bind(this);
    this.onHide = this.onHide.bind(this);
    this.onChanges = this.onChanges.bind(this);
    this.delete = this.delete.bind(this);
  }
  
  isActive(rowData){
    return rowData.isActive;
  }

  changeActive(rowData, e){
    let upsales = [...this.state.sales];
    let ind = this.state.sales.indexOf(rowData);
    if(ind != -1){
      if(e.checked){
        upsales[ind].isActive = true;
      } else {
        upsales[ind].isActive = false;
      }
      this.setState({sales: upsales});
    }
  }

  onEditorValueChange(props, value) {
    let updatedSales = [...this.state.sales];
    updatedSales[props.rowIndex][props.field] = value;
    this.setState({sales: updatedSales});
  }
  onHideYes(){
      if(this.state.client != null && this.state.address != null){
        //Add here
        this.setState({activity: false});
      } else {
        //Warn here 
      }  
  } 
  onHide(){
    this.setState({visible: false});
  }  

  clientEditor(props) {
      return <InputText type="text" value={this.state.sales[props.rowIndex]['clientName']} onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
  }

  addressEditor(props) {
    return <InputText type="text" value={this.state.sales[props.rowIndex]['address']} onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
  }


  delete(){
    //Delete
  }

  onChanges(e){
    if(e.checked){
      this.setState({activity: true});
    } else {
      this.setState({activity: false});
    }
  }


  render() {

    const footer = (
      <div>
          <Button label="Yes" icon="pi pi-check" onClick={this.onHideYes} />
          <Button label="No" icon="pi pi-times" onClick={this.onHide} />
      </div>
    );
    const wrapperClass = classNames('layout-wrapper', {
      'layout-static': this.state.layoutMode === 'static',
      'layout-mobile-sidebar-active': this.state.mobileMenuActive,
    });
    const mainPart = classNames('layout-main');
    return (
      <div className={wrapperClass}>
        <div className={mainPart}>
            <div>
              <div style={{textAlign: 'center', fontSize: '30px'}}>Manage Jobs</div>
              <div>
                  <Dialog header="Add Job" footer={footer} visible={this.state.visible} style={{width: '50vw'}} modal={true} onHide={this.onHide}>
                    <span style={{paddingTop:'25px', display: 'block'}}>
                        <label style={{padding: '10px'}}>Client</label>
                        <InputText id="in" value={this.state.client} onChange={(e) => this.setState({client: e.target.value})} />
                    </span> 
                    <span style={{paddingTop:'25px', display: 'block'}}>
                        <label style={{padding: '10px'}}>Address</label>
                        <InputText id="in" value={this.state.address} onChange={(e) => this.setState({address: e.target.value})} />
                    </span>
                    <span style={{paddingTop:'25px', display: 'block'}}>
                        <label style={{padding: '10px'}}>Client</label>
                        <Checkbox id="in" checked={this.state.activity} onChange={this.onChanges} />
                    </span>  
                  </Dialog>
                  <div style={{paddingBottom: '5px'}}>
                    <Button label="Add Job" className="p-button-danger" width="20px" onClick={(e) => this.setState({visible: true})}/>
                  </div>
                <div>
                  <DataTable value={this.state.sales} scrollable={true}scrollHeight="300px" selection={this.state.selected} onSelectionChange={e => this.setState({selected: e.value})}>
                          <Column field="clientName" header="Client" filter={true} filterMatchMode={"contains"} filterType={"inputtext"} editor={this.clientEditor}/>
                          <Column field="address" header="Address" editor={this.addressEditor}/>
                          <Column field="active" header="Active " style={{textAlign:'center'}} body={ (rowData, column) => (
                              <Checkbox onChange={(e) => {this.changeActive(rowData, e)}} checked={this.isActive(rowData)} />) }/>
                          <Column selectionMode="multiple" field="del" header="Delete " style={{textAlign:'center'}} />
                      </DataTable>
                </div>  
              </div>
              <div>
                <div className="deleteCodes" style={{paddingBottom: '5px', paddingTop: '5px'}}>
                  <Button label="Delete Selected" className="p-button-primary" onClick={this.delete}/>
                </div>
                <div className="saveChanges" style={{paddingBottom: '5px'}}>
                  <Button label="Save Changes" className="p-button-success" style={{padding: '5px'}}/>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Jobs;

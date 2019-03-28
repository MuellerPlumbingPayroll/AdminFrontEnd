/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Growl } from 'primereact/growl';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import '../stylesheets/vars.scss';
import axios from 'axios';

// eslint-disable-next-line no-undef


class Employees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutMode: 'static',
      mobileMenuActive: false,
      selected:[],
      visible: false,
      email: "",
      activity: false,
      users: null,
      updatedRows: [],
      showWarning: false,
      emptyFields: false,
      goActive: false,
      goInactive: false,
      checkedRow: null,
      event: null,
      firstName: "",
      lastName: "",
      warningShown: false,
    };
  }

    
  isActive = (rowData) => {
    return rowData.isActive;
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

  changeActive = (rowData, e) =>{
    this.setState({checkedRow: rowData, event: e});
    if(e.checked){
      this.setState({goInactive: true});
    } else {
      this.setState({goActive: true});
    }
  }

  actionActive = () => {
    let upusers = [...this.state.users];
    let ind = this.state.users.indexOf(this.state.checkedRow);
    if(ind !== -1){
      if(this.state.event.checked){
        upusers[ind].isActive = true;
        upusers[ind]['dateToRemove'] = null;
      } else {
        upusers[ind].isActive = false;
        const date = new Date();
        upusers[ind]['dateToRemove'] = new Date(date.getFullYear()+2, 0, 1);
      }
      this.setState({users: upusers});
      let newUpRows = [...this.state.updatedRows];
      newUpRows.push(this.state.checkedRow);
      this.setState({updatedRows: newUpRows});
    }
    this.onHideActive();
    if(this.state.warningShown === false){
      this.growl.show({severity: 'warn', summary: 'You have unsaved changes', detail:'Please click the "Save Changes" button to save these changes before leaving the page.', closable: false, sticky: true});
      this.setState({warningShown: true});
    }
  }

  onEditorValueChange = (props, value) => {
    let updatedusers = [...this.state.users];
    updatedusers[props.rowIndex][props.field] = value;
    let notAdded = true;
    for(let i = 0; i < this.state.updatedRows.length; i++){
      if(this.state.updatedRows[i]['id'] === updatedusers[props.rowIndex]['id']){
        notAdded = false;
      }
    }
    if(notAdded){
      let newUpRows = [...this.state.updatedRows];
      newUpRows.push(updatedusers[props.rowIndex]);
      this.setState({updatedRows: newUpRows});
      if(this.state.warningShown === false){
        this.growl.show({severity: 'warn', summary: 'You have unsaved changes', detail:'Please click the "Save Changes" button to save these changes before leaving the page.', closable: false, sticky: true});
        this.setState({warningShown: true});
      }
    }
    this.setState({users: updatedusers})
  }

  firstEditor = (props) => {
    return <InputText type="text" value={this.state.users[props.rowIndex]['firstName']} onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
  }

  lastEditor = (props) => {
    return <InputText type="text" value={this.state.users[props.rowIndex]['lastName']} onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
  }

  onHide= () =>{
    this.setState({visible: false});
    this.setState({email: "", firstName: "", lastName: ""});
  }
  
  onHideActive = () => {
    this.setState({goActive: false, goInactive: false});
  }

  onHideWarning = () => {
    this.setState({showWarning: false});
  }

  onHideYes = async () => {
    if(this.state.email !== "" && this.state.firstName !== "" && this.state.lastName !== ""){
      try{
        let url = 'https://api-dot-muller-plumbing-salary.appspot.com/users';
        let data = {email: `${this.state.email}@gmail.com`, isActive: true, firstName: this.state.firstName, lastName: this.state.lastName};
        await axios.post(url, data);
      } catch (e){
        console.error(e);
      }
      try{
        const newUsers = await axios('https://api-dot-muller-plumbing-salary.appspot.com/users');
        this.setState({users: newUsers.data});
      } catch (e){
        console.error(e);
        this.setState({users: []});
      }
      this.setState({email: "", firstName: "", lastName: ""});
      this.setState({visible: false})
    } else {
      this.setState({emptyFields: true});
    }  
  }

  saveChanges = async () => {
    if(this.state.updatedRows !== []){
      for(let i = 0; i < this.state.updatedRows.length; i++){
        try{
          let url = `https://api-dot-muller-plumbing-salary.appspot.com/users/${this.state.updatedRows[i].id}`;
          let temp = this.state.updatedRows[i];
          if( temp['dateToRemove'] === null){
            delete temp['dateToRemove'];
          } else {
            let time = temp['dateToRemove']['_seconds'];
            let newDate = new Date();
            newDate.setUTCSeconds(time);
            temp['dateToRemove'] = newDate;
          }
          delete temp['id'];
          await axios.post(url, temp);
        } catch (e){
          console.error(e);
        }
      }
      try{
        const newUsers = await axios('https://api-dot-muller-plumbing-salary.appspot.com/users');
        this.setState({users: newUsers.data});
      } catch (e){
        console.error(e);
        this.setState({users: []});
      }
      this.setState({updatedRows: []});
      this.growl.clear();
      this.setState({showWarning: false});
    }
  }


  render() {
    const dateRem = new Date();
    const ourDate = new Date(dateRem.getFullYear()+2, 0, 1);
    const wrapperClass = classNames('layout-wrapper', {
      'layout-static': this.state.layoutMode === 'static',
      'layout-mobile-sidebar-active': this.state.mobileMenuActive,
    });
    const footer = (
        <div>
            <Button label="Yes" icon="pi pi-check" onClick={this.onHideYes} />
            <Button label="No" icon="pi pi-times" onClick={this.onHide} />
        </div>
    );
    const footerVerification = (
      <div>
          <Button label="Yes" icon="pi pi-check" onClick={this.actionActive} />
          <Button label="No" icon="pi pi-times" onClick={this.onHideActive} />
      </div>
    );
    const mainPart = classNames('layout-main');
    return (
      <div className={wrapperClass}>
        <div className={mainPart}>
            <div>
                <div style={{textAlign: 'center', fontSize: '30px'}}>Manage Employees</div>
                <div>
                    <Dialog header="Make user active" visible={this.state.goInactive} style={{width: '50vw'}} modal={true} onHide={(e) => this.setState({goInactive: false})} footer={footerVerification}>
                      Activating this user will mean it will not expire. Confirm.
                    </Dialog>
                    <Dialog header="Make user inactive" visible={this.state.goActive} style={{width: '50vw'}} modal={true} onHide={(e) => this.setState({goActive: false})} footer={footerVerification}>
                      Deactivating this user means that all the data on this user will be removed on {ourDate.toDateString()}. Confirm.
                    </Dialog>
                    <Dialog header="Empty Fields" visible={this.state.emptyFields} style={{width: '50vw'}} modal={true} onHide={(e) => this.setState({emptyFields: false})}>
                      Please enter all values when adding an Employee
                    </Dialog>
                    <Dialog header="Add Employee" footer={footer} visible={this.state.visible} style={{width: '50vw'}} modal={true} onHide={this.onHide}>
                        <span style={{paddingTop:'25px', display: 'block'}}>
                            <label style={{padding: '10px'}}>First Name</label>
                            <InputText id="in" value={this.state.firstName} onChange={(e) => this.setState({firstName: e.target.value})} />
                        </span> 
                        <span style={{paddingTop:'25px', display: 'block'}}>
                            <label style={{padding: '10px'}}>Last Name</label>
                            <InputText id="in" value={this.state.lastName} onChange={(e) => this.setState({lastName: e.target.value})} />
                        </span> 
                        <span style={{paddingTop:'25px', display: 'block'}}>
                            <label style={{padding: '10px'}}>Email</label>
                            <InputText id="in" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
                            <label style={{padding: '10px'}}>@gmail.com</label>
                        </span>  
                    </Dialog>
                    <Dialog header="You have unsaved Changes" footer={footer} visible={this.state.showWarning} style={{width: '50vw'}} modal={true} onHide={this.onHideWarning}>
                      <span style={{paddingTop:'25px', display: 'block'}}>
                          <label style={{padding: '10px'}}>The changes you made have not been saved</label>
                      </span>  
                    </Dialog>
                  <div style={{paddingBottom: '5px'}}>
                    <Button id="addB" label="Add Employee" className="p-button-danger" width="20px" onClick={(e) => this.setState({visible: true})}/>
                  </div>
                  <div>
                    <DataTable value={this.state.users} scrollable={true}scrollHeight="20vw">
                      <Column field="firstName" header="First Name" filter={true} filterMatchMode={"contains"} filterType={"inputtext"} editor={this.firstEditor}/>
                      <Column field="lastName" header="Last Name" filter={true} filterMatchMode={"contains"} filterType={"inputtext"} editor={this.lastEditor}/>
                      <Column field="email" header="Email" filter={true} filterMatchMode={"contains"} filterType={"inputtext"}/>
                      <Column field="isActive" header="Active " style={{textAlign:'center'}} body={ (rowData, column) => (
                        <Checkbox onChange={(e) => {this.changeActive(rowData, e)}} checked={this.isActive(rowData)} />) }/>
                    </DataTable>
                  </div>  
                  <div className="saveChanges" style={{paddingBottom: '5px'}}>
                    <Button id="saveB" label="Save Changes" className="p-button-success" style={{padding: '5px'}} onClick={this.saveChanges}/>
                  </div>
                </div>
                <Growl ref={(el) => { this.growl = el; }}></Growl>
            </div>
        </div>
      </div>
    );
  }
}

export default Employees;

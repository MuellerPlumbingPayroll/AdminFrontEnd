/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import '../stylesheets/vars.scss';

// eslint-disable-next-line no-undef


class Employees extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutMode: 'static',
      mobileMenuActive: false,
      selected:[],
      mode: 'table',
      visible: false,
      name: "",
      email: "",
      activity: false,
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
 
      ]
    };
  }

  onHide= () =>{
      this.setState({visible: false});
  }

  onHideYes= () =>{
    if(this.state.name !== "" && this.state.email !== ""){
      //Add here
      this.setState({activity: true});
    } else {
      //Warn here 
      this.setState({activity: false});
    } 
  }
  onEditorValueChange = (props, value) => {
      let updatedSales = [...this.state.sales];
      updatedSales[props.rowIndex][props.field] = value;
      this.setState({sales: updatedSales});
  }

  delete= () =>{
      //Delete Stuff
  }

  nameEditor = (props) => {
      return <InputText type="text" value={this.state.sales[props.rowIndex]['name']} onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
  }

  emailEditor = (props) => {
    return <InputText type="text" value={this.state.sales[props.rowIndex]['email']} onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
  }

  render() {
  
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
    const mainPart = classNames('layout-main');
    return (
      <div className={wrapperClass}>
        <div className={mainPart}>
            <div>
                <div style={{textAlign: 'center', fontSize: '30px'}}>Manage Employees</div>
                <div>
                    <Dialog header="Add Employee" footer={footer} visible={this.state.visible} style={{width: '50vw'}} modal={true} onHide={this.onHide}>
                        <span style={{paddingTop:'25px', display: 'block'}}>
                            <label style={{padding: '10px'}}>Name</label>
                            <InputText id="in" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
                        </span> 
                        <span style={{paddingTop:'25px', display: 'block'}}>
                            <label style={{padding: '10px'}}>Email</label>
                            <InputText id="in" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
                        </span>  
                    </Dialog>
                  <div style={{paddingBottom: '5px'}}>
                    <Button id="addB" label="Add Employee" className="p-button-danger" width="20px" onClick={(e) => this.setState({visible: true})}/>
                  </div>
                  <div>
                    <DataTable value={this.state.sales} scrollable={true}scrollHeight="300px"selection={this.state.selected} onSelectionChange={e => this.setState({selected: e.value})}>
                            <Column field="name" header="Name" filter={true} filterMatchMode={"contains"} filterType={"inputtext"} editor={this.nameEditor}/>
                            <Column field="email" header="Email" editor={this.emailEditor}/>
                            <Column selectionMode="multiple" field="del" header="Delete " style={{textAlign:'center'}} />
                    </DataTable>
                  </div>  
                </div>
                <div>
                  <div style={{paddingBottom: '5px', paddingTop: '5px'}}>
                    <Button id="deleteB" label="Delete Selected" className="p-button-primary" onClick={this.delete}/>
                  </div>
                  <div style={{paddingBottom: '5px'}}>
                    <Button id="saveB" label="Save Changes" className="p-button-success" style={{padding: '5px'}}/>
                </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Employees;

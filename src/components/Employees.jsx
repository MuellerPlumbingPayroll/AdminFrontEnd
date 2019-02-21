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
      name: null,
      email: null,
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
      ]
    };

    this.onHide = this.onHide.bind(this);
    this.onHideYes = this.onHideYes.bind(this);
    this.delete = this.delete.bind(this);
    this.nameEditor = this.nameEditor.bind(this);
    this.emailEditor = this.emailEditor.bind(this);
    this.onEditorValueChange = this.onEditorValueChange.bind(this);
  }

  onHide(){
      this.setState({visible: false});
  }

  onHideYes(){
    if(this.state.name != null && this.state.email != null){
      //Add here
    } else {
      //Warn here 
    }  
    }
    onEditorValueChange(props, value) {
        let updatedSales = [...this.state.sales];
        updatedSales[props.rowIndex][props.field] = value;
        this.setState({sales: updatedSales});
    }

    delete(){
        //Delete Stuff
    }

    nameEditor(props) {
        return <InputText type="text" value={this.state.sales[props.rowIndex]['name']} onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
    }
  
    emailEditor(props) {
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
                    <Dialog header="Header Text" footer={footer} visible={this.state.visible} style={{width: '50vw'}} modal={true} onHide={this.onHide}>
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
                    <Button label="Add Employee" className="p-button-danger" width="20px" onClick={(e) => this.setState({visible: true})}/>
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
                  <div className="deleteEmps" style={{paddingBottom: '5px', paddingTop: '5px'}}>
                    <Button label="Delete Selected" className="p-button-primary" onClick={this.delete}/>
                  </div>
                  <div className="deleteCodes" style={{paddingBottom: '5px'}}>
                    <Button label="Save Changes" className="p-button-success" style={{padding: '5px'}}/>
                </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Employees;

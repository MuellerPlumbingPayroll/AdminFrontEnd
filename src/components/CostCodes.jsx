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
import axios from 'axios';

// eslint-disable-next-line no-undef


class CostCodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutMode: 'static',
      //layoutColorMode: 'dark',
      mobileMenuActive: false,
      code: "",
      desc: "",
      visible: false,
      codes: this.getCodes(),
      activity: false
    };
  }

  getCodes = async () =>{
    try{
      const newCodes = await axios('https://muller-plumbing-salary.appspot.com/cost-code/');
      console.log(newCodes.data);
      return newCodes.data;
    } catch (e){
      console.log("HIII IM HERE");
      console.error(e);
      console.log("HIII IM HERE");
      return [];
    }
  }

  onHide = () => {
    this.setState({visible: false});
  }

  onHideYes = () => {
    if(this.state.code !== "" && this.state.desc !== ""){
      //Add here
      this.setState({activity: true});
    } else {
      //Warn here 
      this.setState({activity: false});
    }  
  }
  
  delete = () => {
    //Delete Stuff
  }

  onEditorValueChange = (props, value) => {
    let updatedcodes = [...this.state.codes];
    updatedcodes[props.rowIndex][props.field] = value;
    this.setState({codes: updatedcodes})
  }


  descEditor = (props) => {
    return <InputText type="text" value={this.state.codes[props.rowIndex]['desc']} onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
  }

  groupEditor = (props) => {
    return <InputText type="text" value={this.state.codes[props.rowIndex]['codeGroup']} onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
  }


  render() {
  
    const wrapperClass = classNames('layout-wrapper', {
      'layout-static': this.state.layoutMode === 'static',
      'layout-mobile-sidebar-active': this.state.mobileMenuActive,
    });
    const mainPart = classNames('layout-main');

    const footer = (
      <div>
          <Button label="Yes" icon="pi pi-check" onClick={this.onHideYes} />
          <Button label="No" icon="pi pi-times" onClick={this.onHide} />
      </div>
    );
    return (
      <div className={wrapperClass}>
        <div className={mainPart}>
            <div>
                <div style={{textAlign: 'center', fontSize: '30px'}}>Manage Cost Codes</div>
                <div>
                  <Dialog header="Add Cost Code" footer={footer} visible={this.state.visible} style={{width: '50vw'}} modal={true} onHide={this.onHide}>
                    <span style={{paddingTop:'25px', display: 'block'}}>
                        <label style={{padding: '10px'}}>Cost Code</label>
                        <InputText id="in" value={this.state.code} onChange={(e) => this.setState({code: e.target.value})} />
                    </span> 
                    <span style={{paddingTop:'25px', display: 'block'}}>
                        <label style={{padding: '10px'}}>Description</label>
                        <InputText id="in" value={this.state.desc} onChange={(e) => this.setState({desc: e.target.value})} />
                    </span>  
                  </Dialog>
                  <div style={{paddingBottom: '5px'}}>
                    <Button id="addB" label="Add Cost Code" className="p-button-danger" width="20px" onClick={(e) => this.setState({visible: true})}/>
                  </div>
                  <div>
                    <DataTable value={this.state.codes} scrollable={true}scrollHeight="300px"selection={this.state.selected} onSelectionChange={e => this.setState({selected: e.value})}>
                            <Column field="code" header="Code" filter={true} filterMatchMode={"contains"} filterType={"inputtext"} />
                            <Column field="description" header="Description" editor={this.descEditor}/>
                            <Column field="codeGroup" header="Code Group" editor={this.groupEditor}/>
                            <Column selectionMode="multiple" field="del" header="Select " style={{textAlign:'center'}} />
                        </DataTable>
                  </div>  
                </div>
                <div>
                  <div className="deleteCodes" style={{paddingBottom: '5px', paddingTop: '5px'}}>
                    <Button id="deleteB" label="Delete Selected" className="p-button-primary" onClick={this.Delete}/>
                  </div>
                  <div className="saveCodes" style={{paddingBottom: '5px'}}>
                    <Button id="saveB" label="Save Changes" className="p-button-success" style={{padding: '5px'}}/>
                </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default CostCodes;

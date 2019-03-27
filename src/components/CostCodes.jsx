/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Growl } from 'primereact/growl';
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
      codeGroup: "",
      selected: [],
      visible: false,
      codes: null,
      updatedRows: [],
      showWarning: false,
      emptyFields: false,
      warningShown: false,
    };
  }

  componentDidMount = async () =>{
    try{
      const newCodes = await axios('https://api-dot-muller-plumbing-salary.appspot.com/cost-code');
      this.setState({codes: newCodes.data});
    } catch (e){
      console.error(e);
      this.setState({codes: []});
    }
  }

  onHide = () => {
    this.setState({visible: false});
    this.setState({code: ""});
    this.setState({desc: ""});
    this.setState({codeGroup: ""});
  }

  onHideWarning = () => {
    this.setState({showWarning: false});
  }

  onHideYes = async () => {
    if(this.state.code !== "" && this.state.desc !== "" && this.state.codeGroup !== ""){
      //Add here
      try{
        let url = 'https://api-dot-muller-plumbing-salary.appspot.com/cost-code';
        let data = {code: this.state.code, codeGroup: this.state.codeGroup, description: this.state.desc};
        await axios.post(url, data);
      } catch (e){
        console.error(e);
      }
      try{
        const newCodes = await axios('https://api-dot-muller-plumbing-salary.appspot.com/cost-code');
        this.setState({codes: newCodes.data});
      } catch (e){
        console.error(e);
        this.setState({codes: []});
      }
      this.setState({code: ""});
      this.setState({desc: ""});
      this.setState({codeGroup: ""});
      this.setState({visible: false});
    } else {
      this.setState({emptyFields: true});
    }  
  }
  
  delete = async() => {
    if(this.state.selected.length > 0){
      for(let i = 0; i < this.state.selected.length; i++){
        let tempId = this.state.selected[i]['id'];
        let url = `https://api-dot-muller-plumbing-salary.appspot.com/cost-code/${tempId}`;
        try{
          await axios.delete(url);
          const newArray = this.state.updatedRows.filter(function(val, ind, arr){
            return val['id'] !== tempId;
          });
          this.setState({updatedRows: newArray});
        } catch (e){
          console.error(e);
        }
      }
      try{
        const newCodes = await axios('https://api-dot-muller-plumbing-salary.appspot.com/cost-code');
        this.setState({codes: newCodes.data});
      } catch (e){
        console.error(e);
        this.setState({codes: []});
      }
      this.setState({selected: []});
      console.log(this.state.updatedRows);
      if(this.state.updatedRows.length === 0){
        this.growl.clear();
        this.setState({warningShown: false});
      }
    }
  }

  saveChanges = async () => {
    if(this.state.updatedRows !== []){
      for(let i = 0; i < this.state.updatedRows.length; i++){
        try{
          let url = 'https://api-dot-muller-plumbing-salary.appspot.com/cost-code';
          let temp = this.state.updatedRows[i];
          delete temp['id'];
          await axios.post(url, temp);
        } catch (e){
          console.error(e);
        }
      }
      try{
        const newCodes = await axios('https://api-dot-muller-plumbing-salary.appspot.com/cost-code');
        this.setState({codes: newCodes.data});
      } catch (e){
        console.error(e);
        this.setState({codes: []});
      }
      this.setState({updatedRows: []});
      this.growl.clear();
      this.setState({warningShown: false});
    }
  }

  onEditorValueChange = (props, value) => {
    let updatedcodes = [...this.state.codes];
    updatedcodes[props.rowIndex][props.field] = value;
    let notAdded = true;
    for(let i = 0; i < this.state.updatedRows.length; i++){
      if(this.state.updatedRows[i]['id'] === updatedcodes[props.rowIndex]['id']){
        notAdded = false;
      }
    }
    if(notAdded){
      let newUpRows = [...this.state.updatedRows];
      newUpRows.push(updatedcodes[props.rowIndex]);
      this.setState({updatedRows: newUpRows});
      if(this.state.warningShown === false){
        this.growl.show({severity: 'warn', summary: 'You have unsaved changes', detail:'Please click the "Save Changes" button to save these changes before leaving the page.', closable: false, sticky: true});
        this.setState({warningShown: true});
      }
    }
    this.setState({codes: updatedcodes})
  }


  descEditor = (props) => {
    return <InputText type="text" value={this.state.codes[props.rowIndex]['description']} onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
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
                  <Dialog header="Empty Fields" visible={this.state.emptyFields} style={{width: '50vw'}} modal={true} onHide={(e) => this.setState({emptyFields: false})}>
                    Please enter all values when adding an Employee
                  </Dialog>
                  <Dialog header="Add Cost Code" footer={footer} visible={this.state.visible} style={{width: '50vw'}} modal={true} onHide={this.onHide}>
                    <span style={{paddingTop:'25px', display: 'block'}}>
                        <label style={{padding: '10px'}}>Cost Code</label>
                        <InputText id="in" value={this.state.code} onChange={(e) => this.setState({code: e.target.value})} />
                    </span> 
                    <span style={{paddingTop:'25px', display: 'block'}}>
                        <label style={{padding: '10px'}}>Description</label>
                        <InputText id="in" value={this.state.desc} onChange={(e) => this.setState({desc: e.target.value})} />
                    </span>  
                    <span style={{paddingTop:'25px', display: 'block'}}>
                        <label style={{padding: '10px'}}>Code Group</label>
                        <InputText id="in" value={this.state.codeGroup} onChange={(e) => this.setState({codeGroup: e.target.value})} />
                    </span>
                  </Dialog>
                  <div style={{paddingBottom: '5px'}}>
                    <Button id="addB" label="Add Cost Code" className="p-button-danger" width="20px" onClick={(e) => this.setState({visible: true})}/>
                  </div>
                  <div>
                    <DataTable value={this.state.codes} scrollable={true}scrollHeight="20vw"selection={this.state.selected} onSelectionChange={e => this.setState({selected: e.value})}>
                            <Column field="code" header="Code" filter={true} filterMatchMode={"contains"} filterType={"inputtext"} />
                            <Column field="description" header="Description" editor={this.descEditor}/>
                            <Column field="codeGroup" header="Code Group" editor={this.groupEditor}/>
                            <Column selectionMode="multiple" field="del" header="Delete " style={{textAlign:'center'}} />
                        </DataTable>
                  </div>  
                </div>
                <div>
                  <div className="deleteCodes" style={{paddingBottom: '5px', paddingTop: '5px'}}>
                    <Button id="deleteB" label="Delete Selected" className="p-button-primary" onClick={this.delete}/>
                  </div>
                  <div className="saveCodes" style={{paddingBottom: '5px'}}>
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

export default CostCodes;

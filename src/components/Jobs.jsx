/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classNames from 'classnames';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Growl } from 'primereact/growl';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import '../stylesheets/vars.scss';
import axios from 'axios';
import Papa from 'papaparse';

// eslint-disable-next-line no-undef

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutMode: 'static',
      mobileMenuActive: false,
      jobs: null,
      visible: false,
      client: "",
      address: "",
      activity: false,
      selected: [],
      updatedRows: [],
      emptyFields: false,
      file: null,
      showFileWarning: false,
      showFileSuccess: false,
      results: null,
      resultsJSON: null,
      jobNumber: "",
      warningShown: false
    };
  }


  //This function is run when this component is loaded
  //This function uses a GET request to load all the job information
  componentDidMount = async () =>{
    try{
      const newJobs = await axios('https://api-dot-muller-plumbing-salary.appspot.com/jobs');
      this.setState({jobs: newJobs.data});
    } catch (e){
      console.error(e);
      this.setState({jobs: []});
    }
  }
  
  //Returns whether the job is active
  isActive = (rowData) => {
    return rowData.isActive;
  }

  //This function changes the activity of the job in question
  changeActive = (rowData, e) =>{
    let upjobs = [...this.state.jobs];
    let ind = this.state.jobs.indexOf(rowData);
    if(ind !== -1){
      if(e.checked){
        upjobs[ind].isActive = true;
      } else {
        upjobs[ind].isActive = false;
      }
      this.setState({jobs: upjobs});
      let newUpRows = [...this.state.updatedRows];
      newUpRows.push(rowData);
      this.setState({updatedRows: newUpRows});
      if(this.state.warningShown === false){
        this.growl.show({severity: 'warn', summary: 'You have unsaved changes', detail:'Please click the "Save Changes" button to save these changes before leaving the page.', closable: false, sticky: true});
        this.setState({warningShown: true});
      }
    }
  }

  //This function is called every time there is a change to data through user edits
  onEditorValueChange = (props, value) =>{
    let updatedjobs = [...this.state.jobs];
    updatedjobs[props.rowIndex][props.field] = value;
    let notAdded = true;
    //Only adds rows that were updated if they haven't already been added to the list of rows that are updated
    for(let i = 0; i < this.state.updatedRows.length; i++){
      if(this.state.updatedRows[i]['id'] === updatedjobs[props.rowIndex]['id']){
        notAdded = false;
      }
    }
    if(notAdded){
      let newUpRows = [...this.state.updatedRows];
      newUpRows.push(updatedjobs[props.rowIndex]);
      this.setState({updatedRows: newUpRows});
      //Warns user that there are unsaved changes
      if(this.state.warningShown === false){
        this.growl.show({severity: 'warn', summary: 'You have unsaved changes', detail:'Please click the "Save Changes" button to save these changes before leaving the page.', closable: false, sticky: true});
        this.setState({warningShown: true});
      }
    }
    this.setState({jobs: updatedjobs});
  }

  //Adds a job to the database
  onHideYes = async () => {
    if(this.state.jobNumber !== "" && this.state.client !== "" && this.state.address !== "" && this.state.activity !== null){
      try{
        let url = 'https://api-dot-muller-plumbing-salary.appspot.com/jobs';
        let toAdd = []
        toAdd.push( {id: null, jobNumber: this.state.jobNumber, clientName: this.state.client, address: this.state.address, isActive: this.state.activity});
        await axios.post(url, toAdd);
      } catch (e){
        console.error(e);
      }
      try{
        const newJobs = await axios('https://api-dot-muller-plumbing-salary.appspot.com/jobs');
        this.setState({jobs: newJobs.data});
      } catch (e){
        console.error(e);
        this.setState({jobs: []});
      }
      //Rests values
      this.setState({client: ""});
      this.setState({jobNumber: ""});
      this.setState({address: ""});
      this.setState({activity: false});
      this.setState({visible: false});
    } else {
      //Show alert that there are empty fields
      this.setState({emptyFields: true});
    }  
  }

  //Does not add job to database and resets values
  onHide = () => {
    this.setState({visible: false});
    this.setState({client: "", jobNumber: ""});
    this.setState({address: ""});
    this.setState({activity: false});
  }  

  //Tells user that there has been an error uploading a file
  onHideFileWarning = () => {
    this.setState({showFileWarning: false});
  }

  //Tells user that the file has successfully uploaded
  onHideFileSuccess = () => {
    this.setState({showFileSuccess: false});
  }

  //Editor for client field
  clientEditor = (props) => {
      return <InputText type="text" value={this.state.jobs[props.rowIndex]['clientName']} onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
  }

  //Editor for address field
  addressEditor = (props) => {
    return <InputText type="text" value={this.state.jobs[props.rowIndex]['address']} onChange={(e) => this.onEditorValueChange(props, e.target.value)} />;
  }

  //Deletes a job
  delete = async() => {
    if(this.state.selected.length > 0){
      for(let i = 0; i < this.state.selected.length; i++){
        let tempId = this.state.selected[i]['id'];
        //DELETE request from API
        let url = `https://api-dot-muller-plumbing-salary.appspot.com/jobs/${tempId}`;
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
      //Refreshing the jobs values
      try{
        const newJobs = await axios('https://api-dot-muller-plumbing-salary.appspot.com/jobs');
        this.setState({jobs: newJobs.data});
      } catch (e){
        console.error(e);
        this.setState({jobs: []});
      }
      this.setState({selected: []});
      if(this.state.updatedRows.length === 0){
        this.growl.clear();
        this.setState({warningShown: false});
      }
    }
  }

  //Changes activity
  onChanges = (e) => {
    if(e.checked){
      this.setState({activity: true});
    } else {
      this.setState({activity: false});
    }
  }

  //Updating the file
  handleselectedFile = event => {
    this.setState({file: event.target.files[0]});
  }

  //Parsing the data in the csv file
  saveCSV = () => {
    let data = [...this.state.results];
    data[0] = ["jobNumber", "clientName", "ig1", "ig2", "ig3", "address", "ig4", "ig5", "isActive", "id"];
    for(let i = 0; i < data.length; i++){
      //removing unwanted columns
      data[i].splice(2,3);
      data[i].splice(3,2);
      //adding activity and id
      if(i !== 0){
        data[i].push(true);
        data[i].push(null);
      }
    }
    let allData = []
    allData[0] = data[0];
    //Checking that the job number isn't already in use
    for(let i = 1; i < data.length; i++){
      let found = false;
      for(let j = 0; j < this.state.jobs.length; j++){
        if(this.state.jobs[j]["jobNumber"] === data[i][0]){
          found = true;
        }
      }
      if(found === false){
        allData.push(data[i]);
      }
    }
    console.log(allData);
    this.setState({results: allData});
    let resJSON = [];
    for(let i = 1; i < allData.length; i++){
      let hash = {};
      for(let j = 0; j < allData[0].length; j++){
        hash[allData[0][j]] = allData[i][j];
      }
      resJSON.push(hash);
    }
    this.setState({resultsJSON: resJSON});
    this.saveToAPI();
  }

  //Adding all data to database
  saveToAPI = async() => {
    let success = true;
    try{
      let url = 'https://api-dot-muller-plumbing-salary.appspot.com/jobs';
      await axios.post(url, this.state.resultsJSON);
    } catch (e){
      success = false;
      this.setState({showFileWarning: true});
      console.error(e);
    }
    if(success){
      try{
        const newJobs = await axios('https://api-dot-muller-plumbing-salary.appspot.com/jobs');
        this.setState({jobs: newJobs.data});
        this.setState({showFileSuccess: true});
      } catch (e){
        this.setState({showFileWarning: true});
        console.error(e);
        this.setState({jobs: []});
      }
    }
  }

  //Something with the file
  saveResults = (re) => {
    if(re.errors.length === 0){
      this.setState({results: re.data});
      this.saveCSV();
      this.setState({file: null});
    } else {
      this.setState({showFileWarning: true});
    }
  }

  //Calls to upload the file
  callUpload = () => {
    this.handleUpload(this.saveResults);
  }

  //Parsing from csv to json
  handleUpload = (saveResults) => {
    if(this.state.file !== null){
      Papa.parse(this.state.file, {complete: function(results){
        saveResults(results);
      }});
    }
  }

  saveChanges = async () => {
    if(this.state.updatedRows !== []){
      try{
        let url = 'https://api-dot-muller-plumbing-salary.appspot.com/jobs';
        await axios.post(url, this.state.updatedRows);
      } catch (e){
        console.error(e);
      }
      try{
        const newJobs = await axios('https://api-dot-muller-plumbing-salary.appspot.com/jobs');
        this.setState({jobs: newJobs.data});
      } catch (e){
        console.error(e);
        this.setState({jobs: []});
      }
      this.setState({updatedRows: []});
      this.growl.clear();
      this.setState({warningShown: false});
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
                  <Dialog header="There was an error uploading the file" visible={this.state.showFileWarning} style={{width: '50vw'}} modal={true} onHide={this.onHideFileWarning}>
                    <span style={{paddingTop:'25px', display: 'block'}}>
                        <label style={{padding: '10px'}}>The file that you tried to upload failed. Please ensure that the format is correct and there aren't any empty lines</label>
                    </span>
                  </Dialog> 
                  <Dialog header="File Upload Successful" visible={this.state.showFileSuccess} style={{width: '50vw'}} modal={true} onHide={this.onHideFileSuccess}>
                    <span style={{paddingTop:'25px', display: 'block'}}>
                        <label style={{padding: '10px'}}>The file has been uploaded.</label>
                    </span>
                  </Dialog>  
                  <Dialog header="Add Job" footer={footer} visible={this.state.visible} style={{width: '50vw'}} modal={true} onHide={this.onHide}>
                    <span style={{paddingTop:'25px', display: 'block'}}>
                        <label style={{padding: '10px'}}>Job Number</label>
                        <InputText id="in" value={this.state.jobNumber} onChange={(e) => this.setState({jobNumber: e.target.value})} />
                    </span> 
                    <span style={{paddingTop:'25px', display: 'block'}}>
                        <label style={{padding: '10px'}}>Client</label>
                        <InputText id="in" value={this.state.client} onChange={(e) => this.setState({client: e.target.value})} />
                    </span> 
                    <span style={{paddingTop:'25px', display: 'block'}}>
                        <label style={{padding: '10px'}}>Address</label>
                        <InputText id="in" value={this.state.address} onChange={(e) => this.setState({address: e.target.value})} />
                    </span>
                    <span style={{paddingTop:'25px', display: 'block'}}>
                        <label style={{padding: '10px'}}>Active</label>
                        <Checkbox id="in" checked={this.state.activity} onChange={this.onChanges} />
                    </span>  
                  </Dialog>
                  <div style={{paddingBottom: '5px', paddingTop: '5px', width: '15%'}}>
                    <Button id="addB" label="Add Job" className="p-button-danger" width="20px" onClick={(e) => this.setState({visible: true})}/>
                    <Dialog header="Empty Fields" visible={this.state.emptyFields} style={{width: '50vw'}} modal={true} onHide={(e) => this.setState({emptyFields: false})}>
                      Please enter all values when adding a Job
                    </Dialog>
                  </div>
                <div>
                  <DataTable value={this.state.jobs} scrollable={true} scrollHeight="14vw" selection={this.state.selected} onSelectionChange={e => this.setState({selected: e.value})}>
                      <Column field="jobNumber" header="Job Number" filter={true} filterMatchMode={"contains"} filterType={"inputtext"}/>
                      <Column field="clientName" header="Client" filter={true} filterMatchMode={"contains"} filterType={"inputtext"} editor={this.clientEditor}/>
                      <Column field="address" header="Address" editor={this.addressEditor}/>
                      <Column field="isActive" header="Active " style={{textAlign:'center'}} body={ (rowData, column) => (
                          <Checkbox onChange={(e) => {this.changeActive(rowData, e)}} checked={this.isActive(rowData)} />) }/>
                      <Column selectionMode="multiple" field="del" header="Delete " style={{textAlign:'center'}} />
                  </DataTable>
                </div>  
              </div>
              <div>
                <div className="deleteCodes" style={{paddingBottom: '5px', paddingTop: '5px'}}>
                  <Button id="deleteB" label="Delete Selected" className="p-button-primary" onClick={this.delete}/>
                </div>
                <div className="saveChanges" style={{paddingBottom: '5px', width: '20%'}}>
                  <Button id="saveB" label="Save Changes" className="p-button-success" style={{padding: '5px'}} onClick={this.saveChanges}/>
                </div>
                <div style={{paddingBottom: '5px', fontSize: '15px'}}>
                  <h4>Upload file</h4>
                  <input id="input-file" type="file" onChange={this.handleselectedFile} style={{paddingBottom: '5px', fontSize: '17px'}} accept=".csv"/>
                  <Button label="Upload" icon="pi pi-upload" onClick={this.callUpload}/>
                </div>
              </div>
              <Growl ref={(el) => { this.growl = el; }}></Growl>
            </div>
        </div>
      </div>
    );
  }
}

export default Jobs;

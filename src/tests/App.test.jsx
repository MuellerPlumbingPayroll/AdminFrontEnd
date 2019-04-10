/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import Employees from '../components/Employees';
import CostCodes from '../components/CostCodes';
import Jobs from '../components/Jobs';
import Welcome from '../components/Welcome';
import TimeSheets from '../components/TimeSheets';
import InputText from 'primereact/inputtext';
import { mount, shallow } from 'enzyme';
//import axios from 'axios';

//jest.mock('axios');

/*
describe('Employees', ()=> {
  it('should render correctly in "debug" mode', () => {
    const comp = shallow(<Employees debug />);
    expect(comp).toMatchSnapshot();
  });
  /*
  it('should click buttons', () => {
    const comp = mount(<Employees />);

    comp.find('#addB').at(1).simulate('click');
    comp.find('#saveB').at(1).simulate('click');

    expect(comp).toMatchSnapshot();
    comp.unmount();
  });
  
  let comp;
  beforeEach(() => {
    comp = shallow(<Employees />);
    comp.setState({users: [{email: "test000@gmail.com", isActive: true},{email: "test001@gmail.com", isActive: true},{email: "test002@gmail.com", isActive: false, dateToRemove: {
      "_seconds": 1609480800,
      "_nanoseconds": 0
    }}]});
  });
  it('should call changeActive', ()=> {
    const inst = comp.instance();
    inst.changeActive([{email: "test", isActive: false}], {checked: true});
    expect(comp.state('goInactive')).toEqual(true);
    inst.changeActive([{email: "test", isActive: true}], {checked: false});
    expect(comp.state('goActive')).toEqual(true);
  });
  /*it('should call action Active', () =>{
    const inst = comp.instance();
    comp.setState({checkedRow: comp.state('users')[0], event: {checked: false}});
    inst.actionActive();
    expect(comp.state('users')).not.toEqual(null);

    comp.setState({checkedRow: comp.state('users')[2], event: {checked: true}});
    inst.actionActive();
    expect(comp.state('users')).not.toEqual(null);
  })
  
  it('should call onHide', () => {
    const inst = comp.instance();
    comp.setState({visible: true});
    inst.onHide();
    expect(comp.state('visible')).toEqual(false);
  });
  it('should call onHideActive', () => {
    const inst = comp.instance();
    comp.setState({goActive: true, goInactive: true});
    inst.onHideActive();
    expect(comp.state('goActive')).toEqual(false);
    expect(comp.state('goInactive')).toEqual(false);
  });
  it('should call onHide', () => {
    const inst = comp.instance();
    comp.setState({visible: true});
    inst.onHide();
    expect(comp.state('visible')).toEqual(false);
  });
  it('should call onHideWarning', () => {
    const inst = comp.instance();
    comp.setState({showWarning: true});
    inst.onHideWarning();
    expect(comp.state('showWarning')).toEqual(false);
  });
});
*/

describe('CostCodes', ()=> {
  it('should render correctly in "debug" mode', () => {
    const comp = shallow(<CostCodes debug />);
    expect(comp).toMatchSnapshot();
  });
  /*
  it('should click buttons', () => {
    const comp = mount(<CostCodes />);

    comp.find('#addB').at(1).simulate('click');
    comp.find('#deleteB').at(1).simulate('click');
    comp.find('#saveB').at(1).simulate('click');

    expect(comp).toMatchSnapshot();
    comp.unmount();
  });
  */
  let comp;
  beforeEach(() => {
    comp = shallow(<CostCodes />);
    comp.setState({codes: [
      {
        id: "11-222",
        codeGroup: "SERVICE",
        description: "Test12",
        code: "11-222"
      },
      {
        id: "22-000",
        codeGroup: "PLUMBING",
        description: "Testing",
        code: "22-000"
      }]});
 });
  /*
  it('should call onHideYes', () => {
    const comp = shallow(<CostCodes />);
    const inst = comp.instance();
    comp.setState({activity: true, code: "", desc: ""});
    inst.onHideYes();
    expect(comp.state('activity')).toEqual(false);
    comp.setState({code: "Test", desc: "Test"});
    inst.onHideYes();
    expect(comp.state('activity')).toEqual(true);
  });
  */
  it('should call onHide', () => {
    const inst = comp.instance();
    comp.setState({visible: true});
    inst.onHide();
    expect(comp.state('visible')).toEqual(false);
  });
  it('should call onHideWarning', () => {
    const inst = comp.instance();
    comp.setState({showWarning: true});
    inst.onHideWarning();
    expect(comp.state('showWarning')).toEqual(false);
  });
  /*
  it('should call onEditorValueChange', () => {
    const inst = comp.instance();
    inst.onEditorValueChange({rowIndex: 0,field: 'code'}, 'Test');
    expect(comp.state('codes')[0].code).toEqual("Test");
  });
  */
  it('should call descEditor', () => {
    const inst = comp.instance();
    const props = {rowIndex: 0};
    expect(inst.descEditor(props)).toBeDefined();
  });
});

describe('Jobs', ()=> {
  it('should render correctly in "debug" mode', () => {
    const comp = shallow(<Jobs debug />);
    expect(comp).toMatchSnapshot();
  });
  /*
  it('should click buttons', () => {
    const comp = mount(<Jobs />);

    comp.find('#addB').at(1).simulate('click');
    comp.find('#deleteB').at(1).simulate('click');
    comp.find('#saveB').at(1).simulate('click');

    expect(comp).toMatchSnapshot();
    comp.unmount();
  });
  */
  let comp;
 beforeEach(() => {
  comp = shallow(<Jobs />);
  comp.setState({jobs: [
    {
      "id": "4UiP83DKFy7tywNDY54B",
      "address": "1 Galaxy Far Far Away",
      "isActive": false,
      "clientName": "The Deathstar"
    },
    {
      "id": "AkjvCvjnsWASwGbBzg5o",
      "address": "7396 Ramblewood Street Montgomery, AL 12345",
      "isActive": true,
      "clientName": "Hooker Furniture"
    }]});
});
it('should call action Active', () =>{
  const inst = comp.instance();
  inst.changeActive(comp.state('jobs')[0], {checked: true});
  expect(comp.state('jobs')).not.toEqual(null);

  inst.changeActive(comp.state('jobs')[1], {checked: false});
  expect(comp.state('jobs')).not.toEqual(null);

});
it('should call onHideWarning', () => {
  const inst = comp.instance();
  comp.setState({showWarning: true});
  inst.onHideWarning();
  expect(comp.state('showWarning')).toEqual(false);
});
  it('should call onHide', () => {
    const inst = comp.instance();
    comp.setState({visible: true});
    inst.onHide();
    expect(comp.state('visible')).toEqual(false);
  });
  it('should call onChanges', () => {
    const inst = comp.instance();
    comp.setState({activity: false});
    inst.onChanges({checked: true});
    expect(comp.state('activity')).toEqual(true);

    comp.setState({activity: true});
    inst.onChanges({checked: false});
    expect(comp.state('activity')).toEqual(false);
  });
  /*
  it('should call onEditorValueChange', () => {
    const inst = comp.instance();
    inst.onEditorValueChange({rowIndex: 0,field: 'clientName'}, 'Test123');
    expect(comp.state('jobs')[0].clientName).toEqual("Test123");
  });
  */
  it('should call clientEditor', () => {
    const inst = comp.instance();
    const props = {rowIndex: 0};
    expect(inst.clientEditor(props)).toBeDefined();
  });
  it('should call addressEditor', () => {
    const inst = comp.instance();
    const props = {rowIndex: 0};
    expect(inst.addressEditor(props)).toBeDefined();
  });

});

describe('TimeSheets', ()=> {
  /*
  it('should render correctly in "debug" mode', () => {
    const comp = shallow(<TimeSheets debug />);
    expect(comp).toMatchSnapshot();
  });
  /*
  it('should click buttons', () => {
    const comp = mount(<TimeSheets />);

    comp.find('#download').at(1).simulate('click');
    comp.find('#lastFin').at(1).simulate('click');
    comp.find('#allEmps').at(1).simulate('click');

    expect(comp).toMatchSnapshot();
    comp.unmount();
  });
  */
  it('should call lastPayPeriod', () => {
    
    const comp = shallow(<TimeSheets />);
    const inst = comp.instance();
    expect(comp.state('startDate')).toBe(null);
    expect(comp.state('endDate')).toBe(null);

    comp.setState({todayDay: new Date(2019, 0, 3)});
    inst.lastPayPeriod();
    expect(comp.state('startDate')).toEqual(new Date(2018, 11, 26));
    expect(comp.state('endDate')).toEqual(new Date(2019, 0, 1));

    comp.setState({todayDay: new Date(2019, 1, 21)});
    inst.lastPayPeriod();
    expect(comp.state('startDate')).toEqual(new Date(2019, 1, 13));
    expect(comp.state('endDate')).toEqual(new Date(2019, 1, 19));

    comp.setState({todayDay: new Date(2019, 1, 20)});
    inst.lastPayPeriod();
    expect(comp.state('startDate')).toEqual(new Date(2019, 1, 13));
    expect(comp.state('endDate')).toEqual(new Date(2019, 1, 19));
    
    comp.setState({todayDay: new Date(2019, 1, 19)});
    inst.lastPayPeriod();
    expect(comp.state('startDate')).toEqual(new Date(2019, 1, 6));
    expect(comp.state('endDate')).toEqual(new Date(2019, 1, 12));

    comp.setState({todayDay: new Date(2019, 1, 18)});
    inst.lastPayPeriod();
    expect(comp.state('startDate')).toEqual(new Date(2019, 1, 6));
    expect(comp.state('endDate')).toEqual(new Date(2019, 1, 12));

    comp.setState({todayDay: new Date(2019, 1, 17)});
    inst.lastPayPeriod();
    expect(comp.state('startDate')).toEqual(new Date(2019, 1, 6));
    expect(comp.state('endDate')).toEqual(new Date(2019, 1, 12));

    comp.setState({todayDay: new Date(2019, 1, 16)});
    inst.lastPayPeriod();
    expect(comp.state('startDate')).toEqual(new Date(2019, 1, 6));
    expect(comp.state('endDate')).toEqual(new Date(2019, 1, 12));

    comp.setState({todayDay: new Date(2019, 1, 15)});
    inst.lastPayPeriod();
    expect(comp.state('startDate')).toEqual(new Date(2019, 1, 6));
    expect(comp.state('endDate')).toEqual(new Date(2019, 1, 12));

  });
  /*
  it('should call allClicked', () => {
    const comp = shallow(<TimeSheets />);
    const inst = comp.instance();
    expect(comp.state('selected')).toEqual([]);
    inst.allClicked();
    expect(comp.state('selected')).not.toBe(null);
  });
  */
  it('should call restrictDate', () => {
    const comp = shallow(<TimeSheets />);
    const inst = comp.instance();
    const date = inst.restrictDate();
    expect(date).toEqual(new Date((new Date()).getFullYear()-1, 0, 1));
  });
  /*
  it('should call checkDownload', () => {
    const comp = shallow(<TimeSheets />);
    const inst = comp.instance();
    inst.checkDownload();
    expect(comp.state('errorEmps')).toEqual(true);
    expect(comp.state('errorDate')).toEqual(true);
  });
  */

});

describe('Welcome', ()=> {
  it('should render correctly in "debug" mode', () => {
    const comp = shallow(<Welcome debug />);
    expect(comp).toMatchSnapshot();
  });
  it('should call payPeriod', () => {
    const comp = shallow(<Welcome />);
    const inst = comp.instance();
    const start = inst.lastPayPeriodStart();
    const end = inst.lastPayPeriodEnd();
    expect(start).not.toBe(null);
    expect(end).not.toBe(null);

    expect(comp).toMatchSnapshot();
  });
  it('should call each date payPeriod', () => {
    const comp = shallow(<Welcome />);
    const inst = comp.instance();

    const day0 = new Date(2019, 1, 17);
    const start = inst.lastPayPeriodStart(day0);
    const end = inst.lastPayPeriodEnd(day0);
    expect(start).toEqual(new Date(2019, 1, 13));
    expect(end).toEqual(new Date(2019, 1, 19));

    const day1 = new Date(2019, 1, 18);
    const start1 = inst.lastPayPeriodStart(day1);
    const end1 = inst.lastPayPeriodEnd(day1);
    expect(start1).toEqual(new Date(2019, 1, 13));
    expect(end1).toEqual(new Date(2019, 1, 19));

    const day2 = new Date(2019, 1, 19);
    const start2 = inst.lastPayPeriodStart(day2);
    const end2 = inst.lastPayPeriodEnd(day2);
    expect(start2).toEqual(new Date(2019, 1, 13));
    expect(end2).toEqual(new Date(2019, 1, 19));

    const day3 = new Date(2019, 1, 20);
    const start3 = inst.lastPayPeriodStart(day3);
    const end3 = inst.lastPayPeriodEnd(day3);
    expect(start3).toEqual(new Date(2019, 1, 20));
    expect(end3).toEqual(new Date(2019, 1, 26));

    const day4 = new Date(2019, 1, 21);
    const start4 = inst.lastPayPeriodStart(day4);
    const end4 = inst.lastPayPeriodEnd(day4);
    expect(start4).toEqual(new Date(2019, 1, 20));
    expect(end4).toEqual(new Date(2019, 1, 26));

    const day5 = new Date(2019, 1, 22);
    const start5 = inst.lastPayPeriodStart(day5);
    const end5 = inst.lastPayPeriodEnd(day5);
    expect(start5).toEqual(new Date(2019, 1, 20));
    expect(end5).toEqual(new Date(2019, 1, 26));

    const day6 = new Date(2019, 1, 23);
    const start6 = inst.lastPayPeriodStart(day6);
    const end6 = inst.lastPayPeriodEnd(day6);
    expect(start6).toEqual(new Date(2019, 1, 20));
    expect(end6).toEqual(new Date(2019, 1, 26));


  });



});

describe('App', ()=> {
  it('should render correctly in "debug" mode', () => {
    const comp = shallow(<App debug />);
    expect(comp).toMatchSnapshot();
  });
  it('should render all views', () => {
    const comp = shallow(<App />);
    const inst = comp.instance();

    comp.setState({mode: 'jobs'});
    const mode = inst.renderPage();
    expect(mode).toEqual(<Jobs/>);

    comp.setState({mode: 'costcodes'});
    const modeCC = inst.renderPage();
    expect(modeCC).toEqual(<CostCodes/>);

    comp.setState({mode: 'emps'});
    const modeE = inst.renderPage();
    expect(modeE).toEqual(<Employees/>);

    comp.setState({mode: 'timesheets'});
    const modeTS = inst.renderPage();
    expect(modeTS).toEqual(<TimeSheets/>);

    comp.setState({mode: 'wrong'});
    const modeW = inst.renderPage();
    expect(modeW).toEqual(<div>Couldn't find page</div>);

  });
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

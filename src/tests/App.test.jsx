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

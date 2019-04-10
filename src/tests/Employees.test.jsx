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
  */
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
  */
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
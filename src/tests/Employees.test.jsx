/* eslint-disable no-undef */
import React from 'react';
import Employees from '../components/Employees';
import { mount, shallow } from 'enzyme';
//import axios from 'axios';

//jest.mock('axios');


describe('Employees', ()=> {
  it('should render correctly in "debug" mode', () => {
    const comp = shallow(<Employees debug />);
    expect(comp).toMatchSnapshot();
  });
  let comp;
  beforeEach(() => {
    comp = shallow(<Employees />);
    comp.setState({users: [{id: 1, firstName: "Test", lastName: "test", isAdmin: false, email: "test000@gmail.com", isActive: true},
      {id: 2, firstName: "Test", lastName: "test", isAdmin: false, email: "test001@gmail.com", isActive: true},
      {id: 3,firstName: "Test", lastName: "test", isAdmin: false, email: "test002@gmail.com", isActive: false, dateToRemove: {
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
  it('should call action Active', () =>{
    const inst = comp.instance();
    comp.setState({checkedRow: comp.state('users')[0], event: {checked: false}, warningShown: true});
    inst.actionActive();
    expect(comp.state('users')).not.toEqual(null);

    comp.setState({checkedRow: comp.state('users')[2], event: {checked: true}, warningShown: true});
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
  it('should call onChanges', () => {
    const inst = comp.instance();
    comp.setState({showWarning: true, admin: true});
    inst.onChanges({checked: false});
    expect(comp.state('admin')).toEqual(false);

    comp.setState({showWarning: true, admin: false});
    inst.onChanges({checked: true});
    expect(comp.state('admin')).toEqual(true);
  });
  it('should call onEditorValueChange', () => {
    const inst = comp.instance();
    comp.setState({warningShown: true, updatedRows: [{id: 1, firstName: "Test", lastName: "test", isAdmin: false, email: "test000@gmail.com", isActive: true}]});
    inst.onEditorValueChange({rowIndex: 0, field: 'lastName'}, "newTest");
    expect(comp.state('users')).not.toEqual(null);
  });
  it('should call changeActive', ()=> {
    const inst = comp.instance();
    inst.changeActive([{id: 1, firstName: "Test", lastName: "test", isAdmin: false, email: "test000@gmail.com", isActive: false}], {checked: true});
    expect(comp.state('users')).not.toEqual(null);
  });
  

});
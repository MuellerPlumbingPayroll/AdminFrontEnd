/* eslint-disable no-undef */
import React from 'react';
import Jobs from '../components/Jobs';
import { shallow } from 'enzyme';
//import axios from 'axios';




describe('Jobs', ()=> {
    it('should render correctly in "debug" mode', () => {
      const comp = shallow(<Jobs debug />);
      expect(comp).toMatchSnapshot();
    });
    let comp;
   beforeEach(() => {
    comp = shallow(<Jobs />);
    comp.setState({jobs: [
      {
        id: "4UiP83DKFy7tywNDY54B",
        jobNumber: "11-111",
        address: "1 Galaxy Far Far Away",
        isActive: false,
        clientName: "The Deathstar"
      },
      {
        id: "AkjvCvjnsWASwGbBzg5o",
        jobNumber: "22-222",
        address: "7396 Ramblewood Street Montgomery, AL 12345",
        isActive: true,
        clientName: "Hooker Furniture"
      }]});
  });
  it('should call action Active', () =>{
    const inst = comp.instance();
    comp.setState({warningShown: true});
    inst.changeActive(comp.state('jobs')[0], {checked: true});
    expect(comp.state('jobs')).not.toEqual(null);
  
    inst.changeActive(comp.state('jobs')[1], {checked: false});
    expect(comp.state('jobs')).not.toEqual(null);
  
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
    it('should call onEditorValueChange', () => {
      const inst = comp.instance();
      comp.setState({warningShown: true});
      inst.onEditorValueChange({rowIndex: 0,field: 'clientName'}, 'Test123');
      expect(comp.state('users')).not.toEqual(null);
    });
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
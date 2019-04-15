/* eslint-disable no-undef */
import React from 'react';
import CostCodes from '../components/CostCodes';
import { mount, shallow } from 'enzyme';
//import axios from 'axios';

//jest.mock('axios');


describe('CostCodes', ()=> {
  it('should render correctly in "debug" mode', () => {
    const comp = shallow(<CostCodes debug />);
    expect(comp).toMatchSnapshot();
  });
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
  it('should call onEditorValueChange', () => {
    const inst = comp.instance();
    comp.setState({warningShown: true});
    inst.onEditorValueChange({rowIndex: 0,field: 'code'}, 'Test');
    expect(comp.state('codes')).not.toEqual(null);
  });
  it('should call descEditor', () => {
    const inst = comp.instance();
    const props = {rowIndex: 0};
    expect(inst.descEditor(props)).toBeDefined();
  });
});
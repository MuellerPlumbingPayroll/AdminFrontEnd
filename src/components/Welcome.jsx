/* eslint-disable react/destructuring-assignment */
import React from 'react';
import classNames from 'classnames';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import '../stylesheets/vars.scss';

// eslint-disable-next-line no-undef


class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layoutMode: 'static',
    };
    // event handlers
    this.lastPayPeriodStart = this.lastPayPeriodStart.bind(this);
    this.lastPayPeriodEnd = this.lastPayPeriodEnd.bind(this);
    this.goForwardAYear = this.goForwardAYear.bind(this);
    this.convertToString = this.convertToString.bind(this);
    
  }

  goForwardAYear(date, forward){
    if(((date.getDate()+forward) > 31) && (date.getMonth()===12)){
      return new Date(date.getFullYear()+1, 0, forward-(31-date.getDate()));
    } 
    let temper = new Date(date.getFullYear(), date.getMonth()+1, 0); 
    if((date.getDay()+forward) > (temper.getDate())){
;     return new Date(date.getFullYear(), date.getMonth()+1, forward-(date.getDate()-date.getDate()));
    } else {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate()+forward);
    }
  }


  lastPayPeriodStart(today = new Date()){
    let sd = new Date();
    let day = today.getDay();
    if(day===0){
      sd = this.goForwardAYear(today, (-4));
    } else if(day===1){
      sd = this.goForwardAYear(today,(-5));
    }else if(day===2){
      sd = this.goForwardAYear(today,(-6));
    }else if(day===3){
      sd = this.goForwardAYear(today,(0));
    }else if(day===4){
      sd = this.goForwardAYear(today,(-1));
    }else if(day===5){
      sd = this.goForwardAYear(today,(-2));
    }else if(day===6){
      sd = this.goForwardAYear(today,(-3));
    }
    return sd;
  }

  lastPayPeriodEnd(today = new Date()) {
    let ed = new Date();
    let day = today.getDay();
    if(day===0){
      ed = this.goForwardAYear(today, 2);
    } else if(day===1){
      ed = this.goForwardAYear(today,1);
    }else if(day===2){
      ed = this.goForwardAYear(today,0);
    }else if(day===3){
      ed = this.goForwardAYear(today, 6);
    }else if(day===4){
      ed = this.goForwardAYear(today,5);
    }else if(day===5){
      ed = this.goForwardAYear(today,4);
    }else if(day===6){
      ed = this.goForwardAYear(today,3);
    }
    return ed;
  }

  convertToString(date){
      return (date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear());
  }

  render() {
  
    const wrapperClass = classNames('layout-wrapper', {
      'layout-static': this.state.layoutMode === 'static',
      'layout-mobile-sidebar-active': this.state.mobileMenuActive,
    });
    const mainPart = classNames('layout-main');
    return (
      <div className={wrapperClass}>
        <div className={mainPart} style={{justifyContent: 'center', alignItems: 'center', borderBottom: '5px'}}>
            <div style={{paddingBottom: '20px', fontSize: '30px', textAlign: 'center'}}>Welcome, Tanner!</div>
            <div>
                <h2 style={{textAlign: 'center'}}> Current Pay Period</h2>
                <div style={{fontSize: '30px', textAlign: 'center'}}>
                    {this.convertToString(this.lastPayPeriodStart())} - {this.convertToString(this.lastPayPeriodEnd())}
                </div>
            </div>  
        </div>
      </div>
    );
  }
}

export default Welcome;

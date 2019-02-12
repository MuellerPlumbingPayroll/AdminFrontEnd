/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import '../stylesheets/App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// eslint-disable-next-line no-undef

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }


  render() {
    return (
      <div>
        <Sidebar
          position="left"
          visible={this.state.visible}
          onHide={e => this.setState({ visible: false })}
        >
          Test
        </Sidebar>
        <Button
          icon="pi pi-arrow-right"
          onClick={e => this.setState({ visible: true })}
        />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';

class DonutNavbar extends Component {
  render() {
    return (   
      <Navbar color="dark" dark className="clearfix" >  
        <NavbarBrand href="/">
          <h1 className="display-4">Lantrek2020</h1>
          <h1 className="lead">Munkkilaskuri</h1>
        </NavbarBrand>
      </Navbar>
    )
  }
}

export default DonutNavbar;
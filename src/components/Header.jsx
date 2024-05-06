import React from 'react';

const Header = () => (
  <header className="alm">
    <nav className="gx lx ua yz zf aqu dde" aria-label="Global">
      <div className="lx cxn">
        <a href="#" className="fr aqm">
          <span className="t">Your Company</span>
          <img className="og tm" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&amp;shade=600" alt="" />
        </a>
      </div>
      <div className="lx cuz">
        <button type="button" className="ft ly yz ze adu aqq axs">
          <span className="t">Open main menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
               aria-hidden="true" className="oc se">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
          </svg>
        </button>
      </div>
      <div className="md cuv czq">
        {/* Other elements */}
      </div>
      <div hidden={true} style={{position: 'fixed', top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: 'hidden',
        clip: 'rect(0px, 0px, 0px, 0px)', whiteSpace: 'nowrap', borderWidth: 0, display: 'none'}}>
      </div>
      <div className="md cuv cxn czg">
        <a href="#" className="avz awf awo axu">Log in <span aria-hidden={true}>→</span></a>
      </div>
    </nav>
    <div hidden={true} style={{position: 'fixed', top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: 'hidden',
      clip: 'rect(0px, 0px, 0px, 0px)', whiteSpace: 'nowrap', borderWidth: 0, display: 'none'}}>
    </div>
  </header>
);

export default Header;

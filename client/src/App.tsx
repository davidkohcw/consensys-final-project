
import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';
import Web3Provider from 'web3/provider';
import LayoutView from 'views/layout';
import ThemeProvider from 'components/theme-provider';
import Web3ContractsProvider from 'web3/contracts';
import TheGraphProvider from 'contexts/TheGraph';


function App() {
  return (
    <ThemeProvider>

      <Web3Provider>
        <Web3ContractsProvider>
          <TheGraphProvider>

            <Router>
              <LayoutView />
            </Router>

          </TheGraphProvider>

        </Web3ContractsProvider>

      </Web3Provider>
    </ ThemeProvider>


    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import flairBanner from './assets/Flair (2).png';
import Head from './components/head';
import Nav from './components/Nav';
import Banner from './components/banner';

export default function App() {
  return (
    <div className="flair-banner">
      <img src={flairBanner} alt="Flair banner" />
      <div className="flair-overlay">
        <Head />
        <Nav />
      </div>
      <Banner />
    </div>
  );
}

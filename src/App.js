import React from 'react';
import Layout from './components/Layout/Layout';
import Header from './components/core/Header/Header';
import Footer from './components/core/Footer/Footer';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Layout></Layout>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;

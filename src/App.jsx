import React from 'react';

import './App.scss';

import { FormProgress } from './components/FormProgress';
import { Form } from './components/Form';

function App() {
  return (
    <main className="App">
      <h1 className="App__Title">Your first project</h1>
      <FormProgress total={3} current={3} />
      <Form />
    </main>
  );
}

export default App;

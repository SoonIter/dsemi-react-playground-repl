import React from 'react';
import './i18n';
import Preview from './components/Preview/Preview';
import Editor from './components/Editor/Editor';

function App() {
  useTitle('Playground');

  return (
    <div className="App">
      <Editor></Editor>
      <Preview></Preview>
    </div>
  );
}

export default App;

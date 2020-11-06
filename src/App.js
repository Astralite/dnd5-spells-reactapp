import './App.scss';

import toggleFullScreen from './modules/fullscreen.js';

function App() {
  return (
    <div className="App">
      <div className='toggle-fs' onClick={toggleFullScreen} />
      <h1 className='menu-item title'>DnD Spells App</h1>
      <div className='menu-item classes-dropdown'>Classes</div>
      <div className='menu-item info-box'>Info Box</div>
      <div className='menu-item level-selector'>
        <div>1-2</div>
        <div>3-4</div>
        <div>5-6</div>
      </div>
      <div className='menu-item class-spells-container'>
        <div>Spell1</div>
        <div>Spell2</div>
        <div>Spell3</div>
      </div>
      <div className='menu-item subclass-spells-container'>
        <div>Spell1</div>
        <div>Spell2</div>
        <div>Spell3</div>
      </div>
    </div>
  );
}

export default App;

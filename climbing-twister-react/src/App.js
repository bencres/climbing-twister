import logo from './logo.svg';
import './App.css';
import Twister from './components/twister';

function App() {
  const colors = [
    { name: 'Red', color: '#FF0000' },
    { name: 'Blue', color: '#0000FF' },
    { name: 'Green', color: '#00FF00' },
    { name: 'Yellow', color: '#FFFF00' },
    { name: 'Orange', color: '#FFA000'},
    { name: 'Pink', color: '#FF00FB'},
    { name: 'Purple', color: '#9100ff'},
    { name: 'White', color: '#FFFFFF'},
    { name: 'Black', color: '#000000'}
  ];

  const holds = [
    { name: 'Jug' },
    { name: 'Pinch' },
    { name: 'Crimp' },
    { name: 'Sloper' },
    { name: 'Pocket' },
    { name: 'Undercling' },
    { name: 'Sidepull' },
  ];

  const moves = [
    { name: 'Dyno' },
    { name: 'Match' },
    { name: 'Rose' },
    { name: 'Gaston' },
    { name: 'Lock Off' },
    { name: 'Flag' },
    { name: 'Back Flag' },
    { name: 'Foot Match' },
  ];

  return (
    <div className="App">
      <Twister colors={colors} group1={holds} group2={moves} />
    </div>
  );
}

export default App;

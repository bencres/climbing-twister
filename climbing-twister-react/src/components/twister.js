import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Twister = ({ colors = [], group1 = [], group2 = [] }) => {
  const [selectedColors, setSelectedColors] = useState(
    colors.map((color) => ({ ...color, checked: true }))
  );
  const [selectedGroup1, setSelectedGroup1] = useState(
    group1.map((item) => ({ ...item, checked: true }))
  );
  const [selectedGroup2, setSelectedGroup2] = useState(
    group2.map((item) => ({ ...item, checked: true }))
  );

  // State for displaying random selection and animation
  const [randomSelection, setRandomSelection] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  // Helper function to handle checkbox changes for any group
  const handleCheckboxChange = (index, setGroup, group) => {
    const updatedGroup = [...group];
    updatedGroup[index].checked = !updatedGroup[index].checked;
    setGroup(updatedGroup);
  };

  // Generate chart data based on selected colors
  const chartData = selectedColors
    .filter((color) => color.checked)
    .map((color) => ({
      name: color.name,
      value: 100 / selectedColors.filter((c) => c.checked).length, // Equal value for each selected color
      color: color.color,
    }));

  // Function to generate a random selection
  const getRandomSelection = (group) => {
    const checkedItems = group.filter((item) => item.checked);
    return checkedItems.length > 0
      ? checkedItems[Math.floor(Math.random() * checkedItems.length)].name
      : "None selected";
  };

  // Function to handle the random selection button click
  const handleRandomSelection = () => {
    const randomColor = getRandomSelection(selectedColors);
    const randomGroup1 = getRandomSelection(selectedGroup1);
    const randomGroup2 = getRandomSelection(selectedGroup2);

    setRandomSelection(
      `${randomColor} ${randomGroup1} ${randomGroup2}`
    );

    // Trigger spinning animation
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 1000); // Reset spinning state after animation ends
  };

  return (
    <div>
      <h1>Climbing Twister</h1>
      <div style={{ margin: '5px' }}>
        This is Twister, played on a climbing wall. 
        Win by being the last person on the wall. <br />
        <a href="https://github.com/bencres/climbing-twister/tree/main" target="_blank">Artist Statement</a>
        <br />
      </div>
      <h2>Rules:</h2>
      <div style={{ margin: '5px'}}>
        This game requires one coach and at least one player. 
        Select the holds and colors you have available, and choose moves you'd like to practice 
        (or ignore the moves--move specification is optional). In typical Twister, which limb 
        to move is also chosen, but in this version, which limb to move is entirely up to
        the coach.
        <br />
        <br />
        If you are playing with more than one person, you should prioritize moving towards another player.
        You should find yourself in awkward, tangled positions consistently. 
        <br />
        <br />
        If a move is impossible, the coach should create a possible version by (in order of priority): 
        changing the color; changing the hold; changing the move; or, if none are possible, re-spinning 
        for a new combination, or creating a new combination that makes sense to the coach. 
      </div>
      {/* Render checkboxes for each group */}
      <div style={{ marginBottom: '5px' }}>
        <h3>Colors</h3>
        {colors.map((color, index) => (
          <label key={color.name} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={selectedColors[index].checked}
              onChange={() => handleCheckboxChange(index, setSelectedColors, selectedColors)}
            />
            {color.name}
          </label>
        ))}
      </div>

      <div style={{ marginBottom: '5px' }}>
        <h3>Holds</h3>
        {group1.map((item, index) => (
          <label key={item.name} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={selectedGroup1[index].checked}
              onChange={() => handleCheckboxChange(index, setSelectedGroup1, selectedGroup1)}
            />
            {item.name}
          </label>
        ))}
      </div>

      <div style={{ marginBottom: '5px' }}>
        <h3>Moves</h3>
        {group2.map((item, index) => (
          <label key={item.name} style={{ marginRight: '10px' }}>
            <input
              type="checkbox"
              checked={selectedGroup2[index].checked}
              onChange={() => handleCheckboxChange(index, setSelectedGroup2, selectedGroup2)}
            />
            {item.name}
          </label>
        ))}
      </div>

      {/* Render the Pie Chart with animation */}
      <div
        style={{
          display: 'inline-block',
          animation: isSpinning ? 'spin 1s ease-in-out' : 'none',
        }}
      >
        <PieChart width={300} height={300}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
        </PieChart>
      </div>
        <div>
            {/* Random selection button */}
            <button onClick={handleRandomSelection} style={{ marginTop: '5px' }}>
                Get Random Selection
            </button>
        </div>
      {/* Display the random selection */}
      {randomSelection && (
        <p style={{ marginTop: '20px', marginBottom: '20px', fontWeight: 'bold', color: '#333' }}>
          {randomSelection}
        </p>
      )}

      {/* CSS for spinning animation */}
      <style>
        {`
            @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(720deg);
            }
            }

            .spin {
            animation: spin 1s ease-in-out;
            }
        `}
        </style>
    </div>
  );
};

export default Twister;

import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@material-ui/core';

const NestedMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [nestedAnchorEl, setNestedAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNestedMenuClick = (event) => {
    setNestedAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNestedMenuClose = () => {
    setNestedAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleMenuClick}>Open Menu</Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleNestedMenuClick}>Nested Menu</MenuItem>
      </Menu>
      <Menu
        anchorEl={nestedAnchorEl}
        open={Boolean(nestedAnchorEl)}
        onClose={handleNestedMenuClose}
      >
        <MenuItem onClick={handleNestedMenuClose}>Nested Item 1</MenuItem>
        <MenuItem onClick={handleNestedMenuClose}>Nested Item 2</MenuItem>
        <MenuItem onClick={handleNestedMenuClose}>Nested Item 3</MenuItem>
      </Menu>
    </div>
  );
};

export default NestedMenu;

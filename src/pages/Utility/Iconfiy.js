import React from 'react';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Icon } from '@iconify/react';

const Iconfiy = forwardRef(({ icon, width = 20, color, angle, ...other }, ref) => (
  <Icon icon={icon} style={{ width: width, height: width, color: color, transform: `rotate(${angle}deg)`}} {...other}/>
));

Iconfiy.displayName = 'Iconfiy'; // Add this line to set the display name

Iconfiy.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  angle: PropTypes.string,
};

export default Iconfiy;

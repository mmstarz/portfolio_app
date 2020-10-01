import React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';

const CustomSvg = (props) => {
  return (
    <SvgIcon {...props}>
      <path d={props.svg} />
    </SvgIcon>
  );
}

CustomSvg.propTypes = {
  svg: PropTypes.string.isRequired
}

export default CustomSvg;
import PropTypes from 'prop-types';
import { useContext, useMemo } from 'react';
import { themeDetails } from '../Hooks/ContextProvider';
import { DarkMode, LiteMode } from '../theme/themeColors';

export const ControlBtns = (props) => {
    let { theme } = useContext(themeDetails)
    let { text : textColor } = useMemo(() => theme ? DarkMode : LiteMode, [theme]);
  
    let {text} = props
    return (
      <button className='ControlBtns' style={{color:textColor}}>{text}</button>
    )
  }
  ControlBtns.propTypes = {
    text : PropTypes.string.isRequired
  }
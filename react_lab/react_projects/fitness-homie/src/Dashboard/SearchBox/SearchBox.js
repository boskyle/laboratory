import './searchbox.css';


export const searchBoxStyle = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'black' : 'black',
      padding: 5,

    }),
    control: styles => ({ ...styles, backgroundColor: '#9088D4', width: '100%', textDecoration: 'none'}),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 1 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    },
    menu: (provided, state) => ({
        ...provided,
        width: "100%",
        borderBottom: '1px dotted pink',
        color: state.selectProps.menuColor,
        padding: 0,
      }),
      placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: '#ffffff',
        }
    }
  }

  export const searchBoxStyle2 = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'black' : 'black',
      padding: 5,
    }),
    control: styles => ({ ...styles, 
      backgroundColor: '#9088D4', 
      width: '95%', 
      textDecoration: 'none',
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 1 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    },
    menu: (provided, state) => ({
        ...provided,
        width: "95%",
        borderBottom: '1px dotted pink',
        color: state.selectProps.menuColor,
        padding: 0,
      }),
      placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: '#ffffff',
        }
    }
  }


import React from 'react';

const ThemeContext = React.createContext();

export const ThemeContextProvider = ThemeContext.Provider;
export const ThemeContextConsumer = ThemeContext.Consumer;

export default ThemeContext;

// export const ThemeContext = createContext();

// class ThemeContextProvider extends Component {

//     state = {
//         isLightTheme: true,
//         light: { syntax: '#555', ui: '#ddd', bg: '#eee' },
//         dark: { syntax: '#ddd', ui: '#333', bg: '#555' }
//     }

//     render() {
//         return (
//             <ThemeContext.Provider value={{...this.state}}>
//                 {this.props.children}
//             </ThemeContext.Provider>
//         )
//     }
// }

// export default ThemeContextProvider;

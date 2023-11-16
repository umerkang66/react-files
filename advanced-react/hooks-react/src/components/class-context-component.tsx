import { Component, ReactNode } from 'react';
import { ThemeContext } from '../contexts/theme-context';

class ClassContextComponent extends Component {
  static contextType = ThemeContext;

  private themeStyle(isDark: boolean) {
    return {
      backgroundColor: isDark ? '#333' : '#ccc',
      color: isDark ? '#ccc' : '#333',
      padding: '2rem',
      margin: '2rem',
    };
  }

  render(): ReactNode {
    return (
      <div>
        <ThemeContext.Consumer>
          {darkThemeCtx => {
            return (
              <div style={this.themeStyle(darkThemeCtx.value)}>
                Class Component Consumer
              </div>
            );
          }}
        </ThemeContext.Consumer>

        {/* @ts-ignore */}
        <div style={this.themeStyle(this.context.value)}>
          Class Component Static Context
        </div>
      </div>
    );
  }
}

export default ClassContextComponent;

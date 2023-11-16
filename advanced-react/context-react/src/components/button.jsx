import { useContext } from 'react';
import LanguageContext from '../context/language-context';
import ColorContext from '../context/color-context';

const Button = () => {
  const languageContext = useContext(LanguageContext);
  const afterText =
    languageContext.language === 'english' ? ' in english' : ' urdu me';

  const renderSubmit = language => {
    return language === 'english' ? 'Submit' : 'Submit Karein';
  };

  const renderButton = color => {
    return (
      <button className={`ui button ${color}`}>
        <LanguageContext.Consumer>
          {({ language }) => renderSubmit(language)}
        </LanguageContext.Consumer>{' '}
        {afterText}
      </button>
    );
  };

  return (
    <ColorContext.Consumer>
      {btnColor => renderButton(btnColor)}
    </ColorContext.Consumer>
  );
};

export default Button;

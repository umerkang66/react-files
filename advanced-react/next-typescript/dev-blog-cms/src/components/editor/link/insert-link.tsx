import { FC, useState } from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import { ToolBarButton } from '../toolbar/toolbar-button';
import { LinkForm, LinkOption } from './link-form';

type Props = { onSubmit: (link: LinkOption) => void };

const InsertLink: FC<Props> = ({ onSubmit }) => {
  const [showLinkForm, setShowLinkForm] = useState(false);

  const onClickHandler = () => {
    setShowLinkForm(prev => !prev);
  };

  const handleSubmit = (link: LinkOption) => {
    onSubmit(link);
    setShowLinkForm(false);
  };

  return (
    <div
      onKeyDown={({ key }) => key === 'Escape' && setShowLinkForm(false)}
      className="relative"
    >
      <ToolBarButton onClick={onClickHandler}>
        <BsLink45Deg />
      </ToolBarButton>

      <div className="absolute right-0 top-full z-10 mt-4">
        <LinkForm
          visible={showLinkForm}
          onSubmit={link => handleSubmit(link)}
        />
      </div>
    </div>
  );
};

export { InsertLink };

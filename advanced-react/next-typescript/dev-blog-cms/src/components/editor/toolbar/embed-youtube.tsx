import { FC, useState } from 'react';
import { BsYoutube } from 'react-icons/bs';
import { ToolBarButton } from '../toolbar/toolbar-button';

type Props = { onSubmit: (url: string) => void };

const EmbedYoutube: FC<Props> = ({ onSubmit }) => {
  const [url, setUrl] = useState('');
  const [showYoutubeForm, setShowYoutubeForm] = useState(false);

  const onClickHandler = () => {
    setShowYoutubeForm(prev => !prev);
  };

  const handleSubmit = () => {
    if (!url.trim()) return;

    onSubmit(url);
    setUrl('');
    setShowYoutubeForm(false);
  };

  return (
    <div
      onKeyDown={({ key }) => key === 'Escape' && setShowYoutubeForm(false)}
      className="relative"
    >
      <ToolBarButton onClick={onClickHandler}>
        <BsYoutube />
      </ToolBarButton>

      {showYoutubeForm && (
        <div className="absolute right-0 top-full z-10 mt-4">
          <div className="flex space-x-2">
            <input
              autoFocus
              type="text"
              value={url}
              onChange={({ target: { value } }) => setUrl(value)}
              placeholder="https://youtube.com"
              className="border-secondary-dark text-primary-dark focus:border-primary-dark dark:text-primary dark:focus:border-primary rounded border-2 bg-transparent p-2 transition"
            />
            <button
              onClick={handleSubmit}
              className="bg-action text-primary-dark rounded p-2 text-sm"
            >
              Embed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { EmbedYoutube };

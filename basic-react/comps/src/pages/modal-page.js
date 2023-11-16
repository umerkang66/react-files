import { useState } from 'react';
import Modal from '../components/modal';
import Button from '../components/button';

export default function ModalPage() {
  const [modalShown, setModalShown] = useState(false);

  const handleAccept = () => {
    setModalShown(false);
  };

  const modal = (
    <Modal
      actionBar={
        <div>
          <Button onClick={handleAccept} primary>
            I accept
          </Button>
        </div>
      }
      onClose={() => setModalShown(false)}
    >
      <p>Here is agreement for you to accept</p>
    </Modal>
  );

  return (
    <div>
      <Button primary onClick={() => setModalShown(true)}>
        Open Modal
      </Button>
      {modalShown && modal}
    </div>
  );
}

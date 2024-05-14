import { FC, useState } from 'react';
import { UpdateDialogProps } from '../app/types';

const UpdateDialog: FC<UpdateDialogProps> = function SWUpdateDialog(props: UpdateDialogProps) {
  const { registration } = props;
  const [show, setShow] = useState<boolean>(!!registration.waiting);
  const handleUpdate = (): void => {
    registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
    setShow(false);
  };

  return (
    <>
      {show ? (
        <div className="permission">
          <div className="permission_container">
            <h2>新しいバージョンがリリースされました。</h2>
            <div className="button">
              <button onClick={handleUpdate}>アップデート</button>
            </div>
          </div>
          <div className="overlay"></div>
        </div>
      ) : null}
    </>
  );
};

export default UpdateDialog;

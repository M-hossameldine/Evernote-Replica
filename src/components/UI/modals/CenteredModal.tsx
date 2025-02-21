import 'tw-elements';
import { IoMdClose, VideoModalImg } from 'assets';

interface MODAL_INTERFACE {
  modalContent: React.ReactNode;
}

const CenteredModal = (props: MODAL_INTERFACE): React.ReactElement => {
  return (
    <div className="">
      {/* Triggering part */}
      <button
        type="button"
        className="inline-block text-xs font-medium uppercase leading-tight text-white transition duration-150 ease-in-out focus:outline-none focus:ring-0 active:shadow-lg"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalCenter"
      >
        <img
          className="block"
          src={VideoModalImg}
          alt="Clickable video to explain Evernote capabilites"
        />
      </button>

      {/* Modal */}
      <div
        className="modal fade fixed left-0 top-0 hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="exampleModalCenter"
        tabIndex={-1}
        aria-labelledby="exampleModalCenterTitle"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered pointer-events-none relative h-[90vh] w-auto max-w-[854px]">
          <div className="modal-content pointer-events-auto relative flex h-screen max-h-[536px] w-full flex-col rounded-md border-none bg-clip-padding text-current shadow-lg outline-none">
            <div className="modal-header flex flex-shrink-0 items-center justify-between rounded-t-md border-none px-1 py-5">
              <button
                type="button"
                className="btn-close box-content h-4 w-4 rounded-none border-none !bg-none p-1 text-white opacity-100 hover:no-underline focus:opacity-100 focus:shadow-none focus:outline-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <IoMdClose className="text-2xl text-white" />
              </button>
            </div>
            <div className="modal-body relative">{props.modalContent}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenteredModal;

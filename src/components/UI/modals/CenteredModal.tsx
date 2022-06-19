import 'tw-elements';
import { IoMdClose } from '../../../assets';

interface MODAL_INTERFACE {
  modalContent: React.ReactNode;
}

const CenteredModal: React.FC<MODAL_INTERFACE> = (props) => {
  return (
    <div className=''>
      {/* Triggering part */}
      <button
        type='button'
        className='inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
        data-bs-toggle='modal'
        data-bs-target='#exampleModalCenter'
      >
        Vertically centered modal
      </button>

      {/* Modal */}
      <div
        className='modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto'
        id='exampleModalCenter'
        tabIndex={-1}
        aria-labelledby='exampleModalCenterTitle'
        aria-modal='true'
        role='dialog'
      >
        <div className='modal-dialog max-w-[854px] modal-dialog-centered relative w-auto pointer-events-none h-[90vh]'>
          <div className='modal-content border-none shadow-lg relative flex flex-col w-full h-screen pointer-events-auto bg-clip-padding rounded-md outline-none text-current max-h-[536px]'>
            <div className='modal-header flex flex-shrink-0 items-center justify-between px-1 py-5 border-none rounded-t-md'>
              <button
                type='button'
                className='btn-close box-content w-4 h-4 p-1 text-white border-none rounded-none opacity-100 focus:shadow-none focus:outline-none focus:opacity-100 hover:no-underline !bg-none'
                data-bs-dismiss='modal'
                aria-label='Close'
              >
                <IoMdClose className='text-2xl text-white' />
              </button>
            </div>
            <div className='modal-body relative'>{props.modalContent}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenteredModal;

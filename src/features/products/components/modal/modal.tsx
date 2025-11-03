import type { ModalProps } from "./models"

export const Modal = ({children, isOpen, confirmHandler, cancelHandler}:ModalProps) => {

    return isOpen && <div onClick={cancelHandler} className="fixed top-0 left-0 size-full z-9999 transition-opacity duration-300 flex justify-center items-center bg-black/30 backdrop-blur-sm">
          <div onClick={(e) => e.stopPropagation()} className="rounded-2xl shadow-2xl bg-[var(--dark-bg)] text-center p-8">
            { children }
            <div className="flex justify-between">
              <button onClick={cancelHandler} className='border border-gray-200 px-2 py-1 cursor-pointer text-xs md:px-4 md:py-2 rounded-full transition-all font-semibold text-gray-200 hover:border-amber-500 hover:text-amber-500 transition active:scale-95'>Close</button>
              <button onClick={confirmHandler} className='bg-gray-200 px-2 py-1 cursor-pointer text-xs md:px-4 md:py-2 rounded-full transition-all font-semibold text-gray-900 text-gray-200 hover:bg-amber-500 hover:text-gray-200 transition active:scale-95'>Delete</button>
            </div>
          </div>
        </div>
        
    
}

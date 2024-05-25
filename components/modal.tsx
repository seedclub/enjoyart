'use client';
import React from 'react';

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);

  // only show the modal if the user hasn't seen it before, keep track of this in local storage
  React.useEffect(() => {
    const hasSeenModal = localStorage.getItem('hasSeenModal');
    if (hasSeenModal === 'true') {
      setShowModal(false);
    } else {
      setShowModal(true);
      localStorage.setItem('hasSeenModal', 'true');
    }
  }, []);

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-xl">
              <div className="border-0 relative flex flex-col w-full bg-white outline-none focus:outline-none shadow-light rounded-3xl gap-11 p-9">
                <div className="text-accent text-center max-w-2xl mx-auto text-xl tracking-96 w-full">
                  Welcome to enjoy.tech
                </div>
                <div className="text-accent text-center max-w-2xl mx-auto text-xl tracking-96 w-full">
                  $Enjoy is not owned, managed or controlled by Zora Labs or any
                  of their respective principals or affiliates. $enjoy tokens
                  are intended as collectible items for individual enjoyment
                  only, not for investment purposes.
                </div>
                <div className="grid grid-cols-2 gap-1 lg:gap-6">
                  <button
                    className="flex bg-accent text-white text-xl justify-center items-center gap-2 py-4 rounded-full shadow-light px-3 lg:px-5 txt-m hover:scale-105 transition-transform duration-300 ease-in-out w-full"
                    onClick={() => setShowModal(false)}
                  >
                    I enjoy the disclaimer
                  </button>
                  <button
                    className="flex bg-accent text-white text-xl justify-center items-center gap-2 py-4 rounded-full shadow-light px-3 lg:px-5 txt-m hover:scale-105 transition-transform duration-300 ease-in-out"
                    onClick={() => setShowModal(false)}
                  >
                    I understand
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

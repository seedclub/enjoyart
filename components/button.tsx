'use client';

export default function Button({ children, onClick, disabled }: any) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex text-accent bg-[#E6F9FF] text-xl tracking-4 justify-center items-center py-4 px-9 rounded-2xl gap-2 h-14 shadow-inner2 hover:bg-[#B1EEFF] disabled:text-[#D8D8D8] disabled:bg-[#F6F6F6] transition-all duration-300 ease-in-out w-full`}
    >
      {children}
    </button>
  );
}

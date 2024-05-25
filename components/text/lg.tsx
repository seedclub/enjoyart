export default function LG({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="text-3xl not-italic font-normal tracking-112 text-grey500 leading-7">
      {children}
    </div>
  );
}

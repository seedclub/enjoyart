export default function S({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="text-xl not-italic font-normal tracking-4 text-grey500">
      {children}
    </div>
  );
}

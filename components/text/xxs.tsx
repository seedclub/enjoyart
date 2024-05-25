export default function XXS({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="text-sm not-italic font-normal tracking-28 text-grey500">
      {children}
    </div>
  );
}

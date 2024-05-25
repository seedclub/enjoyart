export default function XS({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="text-base not-italic font-normal tracking-32 text-grey500">
      {children}
    </div>
  );
}

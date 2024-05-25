export default function XL({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="text-[32px] not-italic font-normal tracking-128 text-grey500">
      {children}
    </div>
  );
}

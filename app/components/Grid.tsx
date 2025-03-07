type GridProps = {
  children: React.ReactNode;
};

export default function Grid({ children }: GridProps) {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg-gap-8">
      {children}
    </div>
  );
}

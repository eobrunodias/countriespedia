interface ErrorProps {
  text: string;
}

export default function Error({ text }: ErrorProps) {
  return (
    <>
      <p>{text}</p>
    </>
  );
}

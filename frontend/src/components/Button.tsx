type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
}

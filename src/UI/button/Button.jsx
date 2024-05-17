import "./Button.scss";

const Button = ({ onClick, text }) => {
  return (
    <button className="buttonNext" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;

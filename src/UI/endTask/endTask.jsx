import Button from "../button/Button";

const endTask = ({ correct, nameLocal }) => {
  const refreshTest = () => {
    localStorage.removeItem(nameLocal);
    location.reload();
  };
  return (
    <div>
      <h2>Correct answers: {correct}</h2>
      <Button onClick={() => refreshTest()} text={`start over`} />
    </div>
  );
};

export default endTask;

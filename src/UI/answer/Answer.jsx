import { useEffect } from "react";
import "./Answer.scss";

const Answer = ({ text, isCorrect, index }) => {
  const buttonNext = document.querySelector(`.buttonNext`);
  buttonNext.disabled = true;

  const arr = JSON.parse(localStorage.getItem(`arr`)) || [];
  localStorage.setItem(`arr`, JSON.stringify(arr));

  const circle = document.querySelectorAll(`.circle`);

  const clickAnswer = (isCorrect) => {
    const selector = document.querySelectorAll(`.answer`);
    selector[index].classList.add(`_${isCorrect}`);

    buttonNext.disabled = false;
    arr.push(isCorrect);

    localStorage.setItem(`arr`, JSON.stringify(arr));

    for (let i = 0; i < selector.length; i++) {
      selector[i].disabled = true;

      if (arr[i] !== undefined) {
        circle[i].classList.add(arr[i]);
      }

      const trueAnsw = arr.filter((item) => item !== false);
      localStorage.setItem(`true`, JSON.stringify(trueAnsw.length));
    }
  };

  useEffect(() => {
    if (arr.length >= 3) {
      localStorage.removeItem(`arr`);
      localStorage.removeItem(`true`);
    }
  }, [arr]);

  window.addEventListener("beforeunload", function () {
    localStorage.removeItem(`arr`);
    localStorage.removeItem(`true`);
  });

  return (
    <button className="answer" onClick={() => clickAnswer(isCorrect)}>
      {text}
    </button>
  );
};

export default Answer;

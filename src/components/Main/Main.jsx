import { useState, useEffect } from "react";

import Answer from "../../UI/answer/Answer";
import TitleQuestions from "../../UI/title/TitleQuestions";
import style from "./Main.module.scss";
import Button from "./../../UI/button/Button";
import Circle from "./../../UI/circle/Circle";
import EndTask from "../../UI/endTask/endTask";

const Main = () => {
  const [data, setData] = useState([]);
  const arr = JSON.parse(localStorage.getItem(`arr`)) || [];

  const [details, setDetails] = useState({
    count: 1,
    maxValue: 0,
  });

  const [correct, setCorrect] = useState(0);

  const counter = () => {
    setDetails((prev) => ({ ...prev, count: details.count + 1 }));

    if (arr[details.count - 1] === true) {
      setCorrect((prev) => (prev += 1));
    }
  };

  useEffect(() => {
    const renderAnswer = async () => {
      const fetchData = await fetch("/questions.json");
      const json = await fetchData.json();

      setData(json);
      setDetails((prev) => ({ ...prev, maxValue: json.length }));

      if (details.count >= json.length) {
        setDetails((prev) => ({ ...prev, count: json.length }));
      }
    };

    renderAnswer();
  }, []);

  return (
    <div className={style.main}>
      {arr.length >= 3 ? (
        <EndTask nameLocal={`arr`} correct={localStorage.getItem(`true`)} />
      ) : (
        <div>
          <div>
            <p className={style.questionNum}>
              Question {details.count} of {details.maxValue}
            </p>
            <hr />

            <div className={style.container}>
              {data[details.count - 1] ? (
                <TitleQuestions text={data[details.count - 1].question} />
              ) : (
                "loading..."
              )}

              <div className={style.containerAnswer}>
                {data[details.count - 1]
                  ? data[details.count - 1].answers.map((item, index) => (
                      <Answer
                        text={item.text}
                        key={item.text}
                        isCorrect={item.isCorrect}
                        index={index}
                      />
                    ))
                  : "loading..."}
              </div>
            </div>
          </div>
          <div>
            <Button onClick={counter} text={`Next`} />
            <div className={style.containerCircle}>
              {data.map((item, index) => (
                <Circle key={index} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;

import style from "./TitleQuestions.module.scss";

const TitleQuestions = ({ text }) => {
  return <p className={style.title}>{text}</p>;
};

export default TitleQuestions;

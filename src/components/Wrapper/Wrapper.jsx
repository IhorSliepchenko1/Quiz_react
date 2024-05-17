import style from "./Wrapper.module.scss";

const Wrapper = ({ children }) => {
  return <section className={style.wrapper}>{children}</section>;
};

export default Wrapper;

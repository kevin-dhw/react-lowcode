import { CommonComponentProps } from "../../interface";
// import { useMaterailDrop } from "../../hooks/useMaterailDrop";

const Container = ({ children, styles }: CommonComponentProps) => {
  // 不用id  不用border 不用drop
  return (
    <div style={styles} className={` p-[20px`}>
      {children}
    </div>
  );
};

export default Container;

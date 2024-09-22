import { Button as AntdButton } from "antd";
import { CommonComponentProps } from "../../interface";

// 不用带id
const Button = ({ type, text, styles }: CommonComponentProps) => {
  return (
    <AntdButton style={styles} type={type}>
      {text}
    </AntdButton>
  );
};

export default Button;

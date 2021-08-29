import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as S from "./style";

const CheckBox = ({ isChecked, onChange, label, value, name }) => {
  // const [checked, setChecked] = React.useState(true);

  const handleChange = (e) => {
    onChange && onChange(value);
    setChecked(e.target.checked);
    console.log(e.target.checked);
    console.log(isChecked);
  };
  return (
    <S.CheckBox>
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            // onChange={handleChange}
            color="primary"
            value={value}
            name={name}
          />
        }
        label={label}
      />
      {/* <FormControlLabel
        control={<Checkbox checked={isChecked} color="primary" />}
        label={label}
      /> */}
    </S.CheckBox>
  );
};

export default CheckBox;

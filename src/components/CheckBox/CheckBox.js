import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as S from "./style";

const CheckBox = ({ isChecked, onChange, label, value, name }) => {
  return (
    <S.CheckBox>
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={onChange}
            color="primary"
            value={value}
            name={name}
          />
        }
        label={label}
      />
    </S.CheckBox>
  );
};

export default CheckBox;

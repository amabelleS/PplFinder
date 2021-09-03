import React, { useContext, useState } from "react";
import Context from "../../context/favorites/context";
import Text from "components/Text";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import * as S from "./style";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const User = ({ user, index, isLast, lastUserlementRef, isOnFavoritesPage }) => {
  const {
    favoritesState,
    handleMouseEnter,
    handleMouseLeave,
    isUserInFavorites,
    switchFavorites,
    editFavorite,
  } = useContext(Context);
  const { hoveredUserId } = favoritesState;

  const [open, setOpen] = useState(false);
  const [freeTextValue, setFreeTextValue] = useState(user.freeTextInput);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // edit user
  const handleEdit = () => {
    setOpen(false);
    editFavorite(user, freeTextValue);
  };

  const handelInputChange = (e) => {
    setFreeTextValue(e.target.value);
  };

  return (
    <>
      <S.User
        ref={isLast ? lastUserlementRef : null}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
      >
        <S.UserPicture src={user?.picture.large} alt="" />
        <S.UserInfo>
          <Text size="22px" bold>
            {user?.name.title} {user?.name.first} {user?.name.last}
          </Text>
          <Text size="14px">{user?.email}</Text>
          <Text size="14px">
            {user?.location.street.number} {user?.location.street.name}
          </Text>
          <Text size="14px">
            {user?.location.city} {user?.location.country}
          </Text>
        </S.UserInfo>
        {isOnFavoritesPage ? (
          <S.IconButtonWrapper
            isVisible={index === hoveredUserId || isUserInFavorites(user.login.uuid)}
            onClick={handleClickOpen}
          >
            <IconButton>
              <EditIcon color="primary" />
            </IconButton>
          </S.IconButtonWrapper>
        ) : null}
        <S.IconButtonWrapper
          isVisible={index === hoveredUserId || isUserInFavorites(user.login.uuid)}
          onClick={() => switchFavorites(user, index)}
        >
          <IconButton>
            <FavoriteIcon color="error" />
          </IconButton>
        </S.IconButtonWrapper>
      </S.User>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth="md"
        maxWidth="md"
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle id="form-dialog-title">Add Your Inputs</DialogTitle>
        <DialogContent>
          <DialogContentText>{user.freeTextInput}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Save to Favorite"
            type="text"
            fullWidth
            multiline
            maxRows={4}
            value={freeTextValue}
            onChange={handelInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="primary">
            Save Text
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default User;

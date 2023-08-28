import { Box, IconButton, makeStyles } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { arrayMoveImmutable } from "array-move";
import React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  ContainerBox: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    overflowY: "hidden",
    gridAutoRows: "182px 182px",
    height: "100%",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      gridAutoRows: "200px 200px",

      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },
  input: {
    display: "none",
  },
  card: {
    minheight: "30vw",
  },
  boxForm: {
    display: "flex",
    justifyContent: "center",
  },
  DragItem: {
    padding: 3,
    width: 200,
    height: 200,
  },
  AddButton: {
    "& svg": {
      fontSize: "2.3em",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.5em",
      },
    },
  },
  RemoveButton: {
    position: "absolute",
    right: 0,
    top: 0,
    "&:hover": {
      background: "transparent",
    },
    "& svg": {
      fontSize: "1.2em",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1em",
      },
    },
  },
}));

const GridItem = SortableElement(({ idx, onRemove, value, items, edit }) => {
  
  const classes = useStyles();
  return (
    <Box width={"100%"} height={"100%"} position="relative">
      <Box width={"100%"} height={"100%"} padding={"1.5%"} overflow="hidden">
        <img
          width={"100%"}
          alt={value}
          height={"100%"}
          src={value}
          key={value}
          style={{ objectFit: "cover", borderRadius: 5, border: 1 }}
        />

        <IconButton
          className={classes.RemoveButton}
          onClick={() => onRemove(idx)}
        >
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </Box>
    </Box>
  );
});

const Grid = SortableContainer(
  ({ items, onRemove, open, getInputProps, edit }) => {
    const classes = useStyles();

    return (
      <Box className={classes.ContainerBox}>
        {items.map((value, index) => {
          return (
            <GridItem
              onRemove={onRemove}
              key={`item-${index}`}
              idx={index}
              index={index}
              value={value}
              edit={edit}
            />
          );
        })}
        {items.length !== 10 ? (
          <Box
            width={"100%"}
            height={"100%"}
            alignItems="center"
            justifyContent="center"
            display="flex"
          >
            <Box>
              <input {...getInputProps()} />
              <IconButton
                className={classes.AddButton}
                onClick={open}
                color="primary"
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        ) : null}
      </Box>
    );
  }
);

const ImageBox = ({
  getInputProps,
  open,
  field,
  form,
  setPicture,
  picture,
  edit,
}) => {
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down("sm"),{noSsr:true});

  const pressDelay = () => {
    if (!mobile) {
      return 0.6;
    } else{
      return 200;
    }
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setPicture(arrayMoveImmutable(picture, oldIndex, newIndex));
    form.setFieldValue(
      "image",
      arrayMoveImmutable(field.value, oldIndex, newIndex)
    );
  };

  const handleRemove = (i) => {
    setPicture(picture.filter((item, index) => index !== i));
    form.setFieldValue(
      "image",
      field.value.filter((item, index) => index !== i)
    );
  };

  return (
    <Box
      style={{
        overflowX: "hidden",
        height: "100%",
        width: "100%",
      }}
    >
      <Grid
        items={field.value}
        edit={edit}
        pressDelay={mobile ? 100 : 1}
        disableAutoscroll
        open={open}
        getInputProps={getInputProps}
        onRemove={(index) => {
          handleRemove(index);
        }}
        onSortEnd={onSortEnd}
        axis="xy"
      />
    </Box>
  );
};

export default ImageBox;

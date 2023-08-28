const initialValues = {
  loading: true,
  typeOfError: {},
  loaded: false,
};
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialValues, action) => {
  const { payload } = action;

  switch (action.type) {
    default:
      return state;
  }
};

const useValidation = () => {
  let mediumPasswordRegex = new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
  );
  let emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  const isEmailValid = (value) => emailRegex.test(value);
  const isPasswordValid = (value) => mediumPasswordRegex.test(value);
  const isFirstNameValid = (value) => value.trim() !== "" && value.length < 15;
  const isLastNameValid = (value) => value.trim() !== "" && value.length < 15;
  const isUsernameValid = (value) => value.trim() !== "" && value.length < 15;
  const isEqual = (value1, value2) => value1 === value2;

  return {
    isEmailValid,
    isPasswordValid,
    isFirstNameValid,
    isLastNameValid,
    isUsernameValid,
    isEqual,
  };
};

export default useValidation;

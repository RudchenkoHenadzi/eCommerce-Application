function checkValue(value: string, regex: RegExp): boolean {
  return regex.test(value);
}
function hasUpperCaseLetters(value: string): boolean {
  return checkValue(value, /[A-Z]/);
}
function hasLowerCaseLetters(value: string): boolean {
  return checkValue(value, /[a-z]/);
}
function hasDigit(value: string): boolean {
  return checkValue(value, /\d/);
}
function hasSpecialSymbol(value: string): boolean {
  return checkValue(value, /[!@#$%^&*]/);
}

export { checkValue, hasUpperCaseLetters, hasLowerCaseLetters, hasDigit, hasSpecialSymbol };

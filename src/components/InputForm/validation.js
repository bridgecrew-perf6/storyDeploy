import { hasSpace, isLengthBelow, isLengthOver, isNotNumber } from '../../utils/validations';

export const checkFormCompletion = ({ cardNumber, expirationDate, securityCode, password }) => {
  if (Object.keys(cardNumber).some(key => isLengthBelow(cardNumber[key], 4))) {
    throw new Error('카드 번호를 완벽히 입력해주세요');
  }

  if (Object.keys(expirationDate).some(key => isLengthBelow(expirationDate[key], 2))) {
    throw new Error('만료일을 완벽히 입력해주세요');
  }

  if (isLengthBelow(securityCode, 3)) {
    throw new Error('CVC/CVV를 완벽히 입력해주세요');
  }

  if (Object.keys(password).some(key => isLengthBelow(password[key], 1))) {
    throw new Error('비밀번호를 완벽히 입력해주세요');
  }

  return true;
};

export const isNumberInRange = (value, maxLength) => {
  if (hasSpace(value)) {
    return false;
  }

  if (isNotNumber(value)) {
    return false;
  }

  if (isLengthOver(value, maxLength)) {
    return false;
  }

  return true;
};

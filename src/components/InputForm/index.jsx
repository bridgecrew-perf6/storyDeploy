import React, { useEffect, useState, useRef } from 'react';
import Input from '../Input';
import PropTypes from 'prop-types';
import { isAlphabetOrSpace } from '../../utils/validations';
import { objectToString } from '../../utils/util';
import { uid } from 'react-uid';
import { checkFormCompletion, checkFormValidation, isNumberInRange } from './validation';
import { CARD_NUMBER_TYPE, EXPIRATION_DATE_TYPE, PASSWORD_TYPE } from '../types';
import { DISPATCH_TYPE } from '../../constants';

const inputCounts = [0, 4, 6, 7, 8];
function InputForm({
  cardInput: { cardNumber, expirationDate, ownerName, securityCode, password },
  cardInputDispatch,
}) {
  const [isComplete, setIsComplete] = useState(false);
  const inputElementsRef = useRef([]);

  const onChangeCardNumber = (key, e, index) => {
    const {
      target: { value: cardNumber, maxLength },
    } = e;

    if (isNumberInRange(cardNumber, maxLength)) {
      cardInputDispatch({ type: DISPATCH_TYPE.CHANGE_CARD_NUMBER, payload: { cardNumber, key } });
    }

    if (cardNumber.length === maxLength) {
      inputElementsRef.current[index + 1]?.focus();
    }
  };

  const onChangeExpirationDate = (key, e, index) => {
    const {
      target: { value: date, maxLength },
    } = e;

    if (isNumberInRange(date, maxLength)) {
      cardInputDispatch({ type: DISPATCH_TYPE.CHANGE_EXPIRATION_DATE, payload: { date, key } });
    }

    if (date.length === maxLength) {
      inputElementsRef.current[index + 1]?.focus();
    }
  };

  const onChangeOwnerName = (e, index) => {
    const {
      target: { value: ownerName, maxLength },
    } = e;

    if (isAlphabetOrSpace(ownerName)) {
      cardInputDispatch({
        type: DISPATCH_TYPE.CHANGE_OWNER_NAME,
        payload: { ownerName: ownerName.toUpperCase() },
      });
    }

    if (ownerName.length === maxLength) {
      inputElementsRef.current[index + 1]?.focus();
    }
  };

  const onChangeSecurityCode = (e, index) => {
    const {
      target: { value: securityCode, maxLength },
    } = e;

    if (isNumberInRange(securityCode, maxLength)) {
      cardInputDispatch({
        type: DISPATCH_TYPE.CHANGE_SECURITY_CODE,
        payload: { securityCode },
      });
    }

    if (securityCode.length === maxLength) {
      inputElementsRef.current[index + 1]?.focus();
    }
  };

  const onChangePassword = (key, e, index) => {
    const {
      target: { value: password, maxLength },
    } = e;

    if (isNumberInRange(password, maxLength)) {
      cardInputDispatch({
        type: DISPATCH_TYPE.CHANGE_PASSWORD,
        payload: { password, key },
      });
    }

    if (password.length === maxLength) {
      inputElementsRef.current[index + 1]?.focus();
    }
  };

  const onClickNextButton = e => {
    e.preventDefault();

    try {
      if (checkFormValidation({ cardNumber, expirationDate, securityCode, password })) {
        alert(`카드 번호는 ${objectToString(cardNumber)} 입니다 \n
        만료일 ${objectToString(expirationDate, '/')} 입니다 \n
        카드 소유자 이름 ${ownerName} 입니다 \n
        보안코드 ${securityCode} 입니다 \n
        비밀번호 ${objectToString(password)} \n`);
      }
    } catch ({ message }) {
      alert(message);
    }
  };

  useEffect(() => {
    try {
      if (checkFormCompletion({ cardNumber, expirationDate, securityCode, password })) {
        setIsComplete(true);
      }
    } catch (e) {
      setIsComplete(false);
    }
  }, [cardNumber, expirationDate, ownerName, securityCode, password]);

  return (
    <form onSubmit={onClickNextButton}>
      <Input labelTitle="카드번호">
        {Object.keys(cardNumber).map((stateKey, index) => (
          <input
            key={uid(stateKey)}
            className="input-basic"
            type={stateKey === 'first' || stateKey === 'second' ? 'text' : 'password'}
            value={cardNumber[stateKey]}
            onChange={e => onChangeCardNumber(stateKey, e, inputCounts[0] + index)}
            maxLength={4}
            required
            ref={element => (inputElementsRef.current[inputCounts[0] + index] = element)}
          />
        ))}
      </Input>
      <Input labelTitle="만료일" inputSize="w-50">
        {Object.keys(expirationDate).map((stateKey, index) => (
          <input
            key={uid(stateKey)}
            className="input-basic"
            type="text"
            placeholder={stateKey === 'month' ? 'MM' : 'YY'}
            value={expirationDate[stateKey]}
            onChange={e => onChangeExpirationDate(stateKey, e, inputCounts[1] + index)}
            maxLength={2}
            required
            ref={element => (inputElementsRef.current[inputCounts[1] + index] = element)}
          />
        ))}
      </Input>
      <Input labelTitle="카드 소유자 이름(선택)">
        <input
          type="text"
          className="input-basic"
          placeholder="카드에 표시된 이름과 동일하게 입력하세요."
          value={ownerName}
          onChange={e => onChangeOwnerName(e, inputCounts[2])}
          maxLength={30}
          ref={element => (inputElementsRef.current[inputCounts[2]] = element)}
        />
      </Input>
      <Input
        labelTitle="보안코드(CVC/CVV)"
        inputSize="w-25"
        helpText="카드 뒷면 서명란 또는 신용카드 번호 오른쪽 상단에 기재된 3자리 숫자"
      >
        <input
          className="input-basic"
          type="password"
          value={securityCode}
          onChange={e => onChangeSecurityCode(e, inputCounts[3])}
          maxLength={3}
          required
          ref={element => (inputElementsRef.current[inputCounts[3]] = element)}
        />
      </Input>
      <Input labelTitle="카드 비밀번호" inputSize="w-50">
        {Object.keys(password).map((stateKey, index) => (
          <input
            key={uid(stateKey)}
            className="input-basic"
            type="text"
            value={password[stateKey]}
            onChange={e => onChangePassword(stateKey, e, inputCounts[4] + index)}
            maxLength={1}
            required
            ref={element => (inputElementsRef.current[inputCounts[4] + index] = element)}
          />
        ))}
        <div className="inputted-password">*</div>
        <div className="inputted-password">*</div>
      </Input>
      {isComplete && (
        <button className="button-box">
          <span className="button-text">다음</span>
        </button>
      )}
    </form>
  );
}

InputForm.propTypes = {
  cardInput: PropTypes.shape({
    cardNumber: CARD_NUMBER_TYPE,
    expirationDate: EXPIRATION_DATE_TYPE,
    ownerName: PropTypes.string,
    securityCode: PropTypes.string,
    password: PASSWORD_TYPE,
  }),
  cardInputDispatch: PropTypes.func,
};
export default InputForm;

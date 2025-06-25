'use client';

import { useState, useMemo } from 'react';
import { styled } from 'styled-components';
import { type InputHTMLAttributes } from 'react';

import FormLabel from './FormLabel';
import FormError from './FormError';
import FormSelect, { type Option } from './FormSelect/FormSelect';
import FormInput from './FormInput';
import countryPhoneCodes from '../../constants/country-phone-codes';

const PhoneContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const CountryCodeContainer = styled.div`
  flex: 0 0 200px;
`;

const PhoneNumberContainer = styled.div`
  flex: 1;
`;

export type OnPhoneChangeValue = {
  countryCode: string;
  phoneNumber: string;
} | null;

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  error?: string;
  countryCodeValue?: string;
  value?: string;
  onPhoneChange?: (value: OnPhoneChangeValue) => void;
}

type CountryOption = (typeof countryPhoneCodes)[number] & Option;

const CountryPhoneOptions = countryPhoneCodes.map((country) => ({
  value: country.dial_code,
  label: `${country.name} (${country.dial_code})`,
  code: country.code,
  name: country.name,
  dial_code: country.dial_code,
}));

export default function FormInputPhone({
  label,
  error = '',
  countryCodeValue = '+1',
  value,
  onPhoneChange,
  ...props
}: Props) {
  const [_countryCode, setCountryCode] = useState<string>(countryCodeValue ?? '');
  const [_phoneNumber, setPhoneNumber] = useState<string>(value ?? '');
  const countryPhoneOptionValue = useMemo(() => {
    return CountryPhoneOptions.find((option) => option.value === countryCodeValue);
  }, [countryCodeValue]);

  const handleCountryCodeChange = (option: CountryOption | null) => {
    const newCountryCode = option?.value ?? '';
    setCountryCode(newCountryCode);

    if (!newCountryCode) {
      onPhoneChange?.(null);
    } else {
      onPhoneChange?.({ countryCode: newCountryCode, phoneNumber: _phoneNumber });
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;
    const sanitizedPhoneNumber = newPhoneNumber.replace(/[^0-9\s-]/g, '');

    setPhoneNumber(sanitizedPhoneNumber);

    if (!sanitizedPhoneNumber) {
      onPhoneChange?.(null);
    } else {
      onPhoneChange?.({ countryCode: _countryCode, phoneNumber: sanitizedPhoneNumber });
    }
  };

  return (
    <div>
      {label && <FormLabel>{label}</FormLabel>}

      <PhoneContainer>
        <CountryCodeContainer>
          <FormSelect<CountryOption>
            id={`${props.id}-country`}
            label=""
            options={CountryPhoneOptions}
            value={countryPhoneOptionValue}
            onChange={handleCountryCodeChange}
            getKey={(option) => option.code}
          />
        </CountryCodeContainer>

        <PhoneNumberContainer>
          <FormInput
            {...props}
            value={_phoneNumber}
            onChange={handlePhoneNumberChange}
            type="tel"
          />
        </PhoneNumberContainer>
      </PhoneContainer>

      {error && <FormError>{error}</FormError>}
    </div>
  );
}

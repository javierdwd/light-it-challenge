'use client';

import { useMemo } from 'react';
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
  dialCode: string;
  countryCode: string;
  phoneNumber: string;
} | null;

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label: string;
  error?: string;
  dialCodeValue?: string;
  phoneNumberValue?: string;
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
  dialCodeValue = CountryPhoneOptions[0].dial_code,
  phoneNumberValue = '',
  onPhoneChange,
  ...props
}: Props) {
  const countryPhoneOptionValue = useMemo(() => {
    return CountryPhoneOptions.find((option) => option.value === dialCodeValue);
  }, [dialCodeValue]);

  const handleCountryCodeChange = (option: CountryOption | null) => {
    const newDialCode = option?.value ?? '';

    if (!option || !newDialCode) {
      onPhoneChange?.(null);
    } else {
      onPhoneChange?.({
        dialCode: newDialCode,
        countryCode: option.code,
        phoneNumber: phoneNumberValue,
      });
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value;
    const sanitizedPhoneNumber = newPhoneNumber.replace(/[^0-9\s-]/g, '');
    const option = CountryPhoneOptions.find((option) => option.value === dialCodeValue);

    if (!option || !sanitizedPhoneNumber) {
      const countryCode = option?.code ?? CountryPhoneOptions[0].code;
      const dialCode = option?.value ?? CountryPhoneOptions[0].value;
      onPhoneChange?.({
        phoneNumber: '',
        countryCode,
        dialCode,
      });
    } else {
      onPhoneChange?.({
        countryCode: option.code,
        dialCode: dialCodeValue,
        phoneNumber: sanitizedPhoneNumber,
      });
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
            value={phoneNumberValue}
            onChange={handlePhoneNumberChange}
            type="tel"
          />
        </PhoneNumberContainer>
      </PhoneContainer>

      {error && <FormError>{error}</FormError>}
    </div>
  );
}

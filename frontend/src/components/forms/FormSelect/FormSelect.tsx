'use client';

import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useDeferredValue,
  type InputHTMLAttributes,
} from 'react';

import FormLabel from '../FormLabel';
import FormError from '../FormError';

import {
  SelectContainer,
  Input,
  Arrow,
  OptionsContainer,
  OptionItem,
  NoOptionsMessage,
} from './styles';

export interface Option {
  value: string;
  label: string;
}

interface Props<OptionType = Option>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  label: string;
  error?: string;
  options: OptionType[];
  value?: OptionType;
  onChange?: (option: OptionType | null) => void;
  placeholder?: string;
  getKey?: (option: OptionType) => string;
}

const defaultGetKey = (option: Option) => option.value;

export default function FormSelect<OptionType extends Option>({
  label,
  error = '',
  options = [],
  value,
  onChange,
  placeholder = 'Select an option...',
  getKey = defaultGetKey,
  ...props
}: Props<OptionType>) {
  const [isOpen, setIsOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState(value?.label ?? '');
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search term
  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(deferredSearchTerm.toLowerCase()),
    );
  }, [deferredSearchTerm, options]);

  // Handlers
  const handleInputFocus = () => {
    setIsOpen(true);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.select();
      }
    }, 10); // Next tick
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setIsOpen(true);
  };

  const handleOptionClick = (option: OptionType) => {
    setSearchTerm(option.label);
    setIsOpen(false);
    onChange?.(option);

    // Focus back to input
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen && !deferredSearchTerm) {
      onChange?.(null);
    }
  }, [isOpen, deferredSearchTerm, onChange]);

  return (
    <SelectContainer ref={containerRef}>
      {label && <FormLabel htmlFor={props.id}>{label}</FormLabel>}

      <Input
        ref={inputRef}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        readOnly={false}
        {...props}
      />

      <Arrow size={22} $isOpen={isOpen} />

      {isOpen && (
        <OptionsContainer>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <OptionItem
                key={getKey(option)}
                aria-selected={value?.value === option.value}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </OptionItem>
            ))
          ) : (
            <NoOptionsMessage>No options found</NoOptionsMessage>
          )}
        </OptionsContainer>
      )}

      {error && <FormError>{error}</FormError>}
    </SelectContainer>
  );
}

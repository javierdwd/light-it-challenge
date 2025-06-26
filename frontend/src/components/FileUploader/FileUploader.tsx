'use client';

import { useState, useRef, useEffect, useCallback, type DragEvent, type ChangeEvent } from 'react';
import FormError from '@/components/forms/FormError';
import {
  UploadContainer,
  UploadArea,
  UploadText,
  UploadIcon,
  PreviewContainer,
  PreviewImage,
  RemoveButton,
  LoadingSpinner,
} from './styles';

export interface FileUploaderProps {
  name: string;
  onChange: (file: File | null) => void;
  acceptedTypes: string[];
  maxSize?: number;
  value?: File | null;
  error?: string;
  disabled?: boolean;
}

interface FileUploaderState {
  isDragOver: boolean;
  isLoading: boolean;
  previewUrl: string | null;
  validationError: string | null;
}

const FileUploader = ({
  name,
  onChange,
  acceptedTypes,
  maxSize = 5 * 1024 * 1024, // 5MB default
  value,
  error,
  disabled = false,
}: FileUploaderProps) => {
  const [state, setState] = useState<FileUploaderState>({
    isDragOver: false,
    isLoading: false,
    previewUrl: null,
    validationError: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);
  const objectUrlRef = useRef<string | null>(null);

  // Generate dynamic accepted types text
  const acceptedTypesText = acceptedTypes
    .map((type) => type.split('/')[1]?.toUpperCase())
    .join(', ');

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!acceptedTypes.includes(file.type)) {
        return `Please select a valid image file (${acceptedTypesText})`;
      }

      if (file.size > maxSize) {
        const maxSizeMB = maxSize / (1024 * 1024);
        return `File size must be less than ${maxSizeMB}MB`;
      }

      return null;
    },
    [acceptedTypes, acceptedTypesText, maxSize],
  );

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  // Handle external value changes
  useEffect(() => {
    if (value && !state.previewUrl) {
      // Clean up previous object URL
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }

      // Create new object URL
      const objectUrl = URL.createObjectURL(value);
      objectUrlRef.current = objectUrl;
      setState((prev) => ({ ...prev, previewUrl: objectUrl, validationError: null }));
    } else if (!value && state.previewUrl) {
      // Clean up when value is cleared externally
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      setState((prev) => ({ ...prev, previewUrl: null, validationError: null }));
    }
  }, [value, state.previewUrl]);

  const processFile = useCallback(
    (file: File) => {
      const validationError = validateFile(file);
      if (validationError) {
        setState((prev) => ({ ...prev, validationError }));
        onChange(null);
        return;
      }

      setState((prev) => ({ ...prev, isLoading: true, validationError: null }));

      const reader = new FileReader();
      reader.onload = (e) => {
        // Clean up previous object URL
        if (objectUrlRef.current) {
          URL.revokeObjectURL(objectUrlRef.current);
          objectUrlRef.current = null;
        }

        setState((prev) => ({
          ...prev,
          isLoading: false,
          previewUrl: e.target?.result as string,
        }));
        onChange(file);
      };
      reader.onerror = () => {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          validationError: 'Failed to process file',
        }));
        onChange(null);
      };
      reader.readAsDataURL(file);
    },
    [validateFile, onChange],
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragEnter = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (disabled) return;

    dragCounterRef.current++;
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setState((prev) => ({ ...prev, isDragOver: true }));
    }
  };

  const handleDragLeave = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (disabled) return;

    dragCounterRef.current--;
    if (dragCounterRef.current === 0) {
      setState((prev) => ({ ...prev, isDragOver: false }));
    }
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (disabled) return;

    dragCounterRef.current = 0;
    setState((prev) => ({ ...prev, isDragOver: false }));

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]); // Use first file only
    }
  };

  const handleRemove = useCallback(() => {
    if (disabled) return;

    // Clean up object URL
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    setState((prev) => ({ ...prev, previewUrl: null, validationError: null }));
    onChange(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [disabled, onChange]);

  const handleClick = useCallback(() => {
    if (disabled) return;
    fileInputRef.current?.click();
  }, [disabled]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick();
      }
    },
    [handleClick],
  );

  const hasFile = value || state.previewUrl;
  const displayError = error || state.validationError;

  return (
    <UploadContainer>
      <input
        ref={fileInputRef}
        type="file"
        name={name}
        accept={acceptedTypes.join(',')}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        disabled={disabled}
        aria-describedby={displayError ? `${name}-error` : undefined}
      />

      {!hasFile ? (
        <UploadArea
          onClick={handleClick}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onKeyDown={handleKeyDown}
          $isDragOver={state.isDragOver}
          $hasError={!!displayError}
          $disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          role="button"
          aria-label="Upload image file"
          aria-describedby={displayError ? `${name}-error` : `${name}-instructions`}
        >
          {state.isLoading ? (
            <LoadingSpinner aria-label="Processing file..." />
          ) : (
            <>
              <UploadIcon />
              <UploadText $disabled={disabled}>
                <strong>Click to upload</strong> or drag and drop
                <br />
                <small>PNG, JPG, GIF up to {maxSize / (1024 * 1024)}MB</small>
              </UploadText>
            </>
          )}
        </UploadArea>
      ) : (
        <PreviewContainer>
          <PreviewImage src={state.previewUrl || ''} alt="Preview" />
          <RemoveButton
            onClick={handleRemove}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleRemove();
              }
            }}
            disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            aria-label="Remove uploaded image"
          >
            ×
          </RemoveButton>
        </PreviewContainer>
      )}

      {displayError && (
        <div id={`${name}-error`} role="alert">
          <FormError>{displayError}</FormError>
        </div>
      )}

      <div id={`${name}-instructions`} style={{ display: 'none' }}>
        Upload an image file by clicking or dragging and dropping. Accepted formats:{' '}
        {acceptedTypes.join(', ')}. Maximum size: {maxSize / (1024 * 1024)}MB.
      </div>
    </UploadContainer>
  );
};

export default FileUploader;

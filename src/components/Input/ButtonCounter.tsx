import React, { memo, forwardRef, useState, useCallback } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';

type IButtonCounterProps = ReturnType<UseFormRegister<any>> & {
  defaultValue?: number
};

const ButtonCounter = forwardRef<HTMLInputElement, IButtonCounterProps>(
  function Input({
    defaultValue,
    name,
    onChange
  }, ref) {
    const [count, setCount] = useState(defaultValue || 0);

    const handleChange = useCallback((type: string) => {
      const v = type === 'increase' ? count + 1 : (count === 0 ? count : count - 1);
      setCount(v);
      onChange({
        target: {
          name,
          value: v,
        },
      } as any);
    }, [count]);

    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 1,
          gap: 1
        }}
      >
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: '#C80001',
            borderRadius: '50%',
            width: 40,
            height: 40,
            minWidth: 40,
          }}
          onClick={() => handleChange('decrease')}
        >-</Button>
        <Typography
          variant="h6"
          sx={{ minWidth: 40, textAlign: 'center' }}
        >
          {count}
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: '#C80001',
            borderRadius: '50%',
            width: 40,
            height: 40,
            minWidth: 40,
          }}
          onClick={() => handleChange('increase')}
        >+</Button>
        <input type='hidden' name={name} ref={ref} />
      </Box>
    );
  }
);

export default memo(ButtonCounter);
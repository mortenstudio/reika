import React from 'react'
import { Box } from '@sanity/ui'
import { StringInputProps } from 'sanity'

export const SuffixInput = (props: StringInputProps) => {
  const suffix = (props.schemaType.options as any)?.suffix || ''

  return (
    <Box style={{ position: 'relative' }}>
      {props.renderDefault(props)}
      {suffix && (
        <span
          style={{
            position: 'absolute',
            right: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        >
          {suffix}
        </span>
      )}
    </Box>
  );
};
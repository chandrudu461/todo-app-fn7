import React from 'react';
import { JsonForms } from '@jsonforms/react';

const PriorityRenderer = ({ data }) => {
  return (
    <span className={`priority ${data}`}>
      {data}
    </span>
  );
};

export default PriorityRenderer;

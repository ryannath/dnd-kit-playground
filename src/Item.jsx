import React, { forwardRef } from 'react';

// Forward ref to make the item draggable
export const Item = forwardRef(({ id, ...props }, ref) => {
  return (
    <div {...props} ref={ref}>
      {props.children} {/* Renders the id value */}
    </div>
  );
});

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Item } from './Item';

export function SortableItem(props) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Item ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.id} {/* This renders the value as the id */}
    </Item>
  );
}

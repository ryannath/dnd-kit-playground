import React, { useState } from 'react';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { SortableItem } from './SortableItem';
import { Item } from './Item';

function App() {
  // Which item is currently being dragged
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState(['1', '2', '3']); // IDs for the items

  // Inputs that DndContext needs to work
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const dropAnimationConfig = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.4',
        },
      },
    }),
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={items}
        // strategy={verticalListSortingStrategy}
      >
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </SortableContext>
      <DragOverlay dropAnimation={dropAnimationConfig}>
        {activeId ? <Item>{activeId}</Item> : null}
      </DragOverlay>
    </DndContext>
  );

  function handleDragStart(event) {
    const { active } = event;
    setActiveId(active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    // If the active item is not the same as the item on the drop zone
    // then move the active item to the new position
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    // Otherwise don't make any changes, just reset the
    // active item to null
    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }
}

export default App;

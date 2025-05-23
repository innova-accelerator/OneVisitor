
import { useState } from "react";

export interface DraggableItem {
  id: string;
  [key: string]: any;
}

export function useDraggableList<T extends DraggableItem>(
  initialItems: T[],
  onReorder: (items: T[]) => void
) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Update items when initialItems change
  if (JSON.stringify(items) !== JSON.stringify(initialItems)) {
    setItems(initialItems);
  }

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    
    // Remove the dragged item
    newItems.splice(draggedIndex, 1);
    // Insert it at the new position
    newItems.splice(index, 0, draggedItem);
    
    setItems(newItems);
    onReorder(newItems);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  return {
    items,
    draggedIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd
  };
}

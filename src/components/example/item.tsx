import * as React from 'react';
import { FC, memo, useCallback } from 'react';
import { ItemModel, useItem, UseListItemsStore } from '../../stores/list-items-store.hooks';

export interface ItemProps {
  useStore: UseListItemsStore;
  id: number;
  onDelete: (id: number) => void;
}

export const Item: FC<ItemProps> = memo(({ useStore, id, onDelete }) => {
  const item: ItemModel = useItem(useStore, id);

  const handleDeleteClick = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  return (
    <div>
      <span>Item: {item.id}</span>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
});

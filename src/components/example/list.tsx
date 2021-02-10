import * as React from 'react';
import { FC, memo, useCallback } from 'react';
import {
  useAddItem,
  useDeleteItem,
  useList,
  UseListItemsStore,
} from '../../stores/list-items-store.hooks';
import { Item } from './item';

export interface ListProps {
  useStore: UseListItemsStore;
}

export const List: FC<ListProps> = memo(({ useStore }) => {
  const list: number[] = useList(useStore);

  const addItem = useAddItem(useStore);
  const deleteItem = useDeleteItem(useStore);

  const handleDelete = useCallback((id: number) => {
    setTimeout(() => {
      deleteItem(id);
    }, 0); // this simulates some async functionality
  }, [deleteItem]);

  return (
    <div>
      <div>Count: {list.length}</div>
      {list.map((id: number) => (
        <Item useStore={useStore} id={id} key={id} onDelete={handleDelete} />
      ))}
      <div>
        <button onClick={addItem}>Add item</button>
      </div>
    </div>
  );
});

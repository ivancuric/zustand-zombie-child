import create, { SetState, UseStore } from 'zustand';
import { useCallback } from 'react';

export interface ItemModel {
  id: number;
}

export type ListItemsStoreData = {
  list: number[];
  items: Record<number, ItemModel>;
}

export type ListItemsStoreState = ListItemsStoreData & {
  addItem: () => void;
  deleteItem: (id: number) => void;
};

export type UseListItemsStore = UseStore<ListItemsStoreState>;

export function useAddItem(useStore: UseListItemsStore): () => void {
  return useStore(useCallback((state: ListItemsStoreState) => state.addItem, []));
}

export function useDeleteItem(useStore: UseListItemsStore): (id: number) => void {
  return useStore(useCallback((state: ListItemsStoreState) => state.deleteItem, []));
}

export function useList(useStore: UseListItemsStore) {
  return useStore(useCallback((state: ListItemsStoreState): number[] => state.list, []));
}

export function useItem(useStore: UseListItemsStore, id: number) {
  return useStore(useCallback((state: ListItemsStoreState): ItemModel => state.items[id], [id]));
}

export function createListItemsStore(data: ListItemsStoreData) {
  let idIndex = Math.max(0, ...data.list);

  return create<ListItemsStoreState>((set: SetState<ListItemsStoreState>): ListItemsStoreState => ({
    ...data,
    addItem: (): void => {
      const item: ItemModel = {
        id: ++idIndex,
      };

      set((state: ListItemsStoreState): ListItemsStoreState => ({
        ...state,
        list: [...state.list, item.id],
        items: {
          ...state.items,
          [item.id]: item,
        },
      }));
    },
    deleteItem(id: number) {
      set((state: ListItemsStoreState): ListItemsStoreState => {
        const { [id]: _, ...newItems } = state.items;

        return {
          ...state,
          list: state.list.filter((item: number) => item !== id),
          items: newItems,
        };
      });
    },
  }));
}

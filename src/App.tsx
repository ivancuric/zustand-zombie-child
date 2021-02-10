import React from 'react';
import { List } from './components/example/list';
import { createListItemsStore, ListItemsStoreData } from './stores/list-items-store.hooks';

const data: ListItemsStoreData = {
  list: [1],
  items: {
    1: {
      id: 1,
    },
  },
};

const listItemsStore = createListItemsStore(data);

function App() {
  return (
    <div className="App">
      <List useStore={listItemsStore} />
    </div>
  );
}

export default App;

# Zustand zombie child example

This project exists to showcase the zombie-child issue when using zustand with predefined data and async actions


## Steps to reproduce

1) Clone and start the project
2) Delete the first item

This will make the application crash, as the child component (`Item`) will re-render before the parent (`List`)

## Technical details

In order to reproduce this, the store needs to have an initial state, and the action needs to be called after asynchronously (ex. setTimeout, Promise, etc)\

In this application. The predefined state is located inside `App.tsx` and the async action call is inside `List.tsx`.

Also, this only works with the item from the initial state, any new items added and deleted will not reproduce the issue.


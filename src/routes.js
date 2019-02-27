import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import InventoryList from './components/InventoryList/InventoryList';
import InventoryDetail from './components/InventoryDetail/InventoryDetail';
import AddInventory from './components/AddInventory/AddInventory';

export default (
    <Switch>
        <Route path="/inventory" exact component={InventoryList} />
        <Route path="/inventory/:id" component={InventoryDetail} />
        <Route path="/add-inventory" component={AddInventory} />
        {/* <Route path="/inventory/new" component={AddInventory} /> */}
        <Redirect to="/inventory" />
    </Switch>
);

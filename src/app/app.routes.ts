import { Routes } from '@angular/router';
import { WarehouseDetailComponent } from './components/warehouse/warehouse-detail/warehouse-detail.component';
import { WarehouseListComponent } from './components/warehouse/warehouse-list/warehouse-list.component';

export const routes: Routes = [
  { path: '', component: WarehouseListComponent },
  { path: 'detail/:id', component: WarehouseDetailComponent }
];

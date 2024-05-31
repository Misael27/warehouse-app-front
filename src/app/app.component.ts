import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WarehouseDetailComponent } from './components/warehouse/warehouse-detail/warehouse-detail.component';
import { WarehouseListComponent } from './components/warehouse/warehouse-list/warehouse-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WarehouseListComponent, WarehouseDetailComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'warehouse-app';
}

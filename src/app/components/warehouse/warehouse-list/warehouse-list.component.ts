import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Warehouse, WarehouseService } from '../../../services/warehouse/warehouse.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { WarehouseFormModalComponent } from '../warehouse-form-modal/warehouse-form-modal.component';

@Component({
  selector: 'app-warehouse-list',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatButtonModule, MatIconModule, WarehouseFormModalComponent, ConfirmDialogComponent, CommonModule],
  templateUrl: './warehouse-list.component.html',
  styleUrl: './warehouse-list.component.scss',
})
export class WarehouseListComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['client', 'id', 'family', 'size', 'actions'];
  dataSource = new MatTableDataSource<Warehouse>([]);

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private warehouseService: WarehouseService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar");
  }

  getData() {
    this.warehouseService.getWarehouses()
    .pipe(
      catchError(err => {
        this.openSnackBar("Ha ocurrido un error, intente nuevamente");
        return of([]);
      })
    )
    .subscribe(data => {
      this.dataSource.data = data;
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  detailWarehouse(element: Warehouse) {
    const url = `detail/${element.id}`;
    this.router.navigateByUrl(url);
  }

  editWarehouse(element: Warehouse) {
    let url = `detail/${element.id}`;
    url += `?isEdit=1`;
    this.router.navigateByUrl(url);
  }

  deleteWarehouse(element: Warehouse) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmDeleteWarehouse(element);
      }
    });
  }

  showModalFormWarehouse() {
    const dialogRef = this.dialog.open(WarehouseFormModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
    });
  }

  confirmDeleteWarehouse(element: Warehouse) {
    this.warehouseService.deleteWarehouses(element)
    .pipe(
      catchError(err => {
        this.openSnackBar("Ha ocurrido un error, intente nuevamente");
        return of([]);
      })
    )
    .subscribe(() => {
      this.openSnackBar("¡Se ha eliminado warehouse con éxito!");
      this.getData();
    });
  }

}

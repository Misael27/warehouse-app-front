import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { catchError, of } from 'rxjs';
import { Rack, RackService } from '../../../services/rack/rack.service';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { RackFormModalComponent } from '../rack-form-modal/rack-form-modal.component';

@Component({
  selector: 'app-rack-list',
  standalone: true,
  imports: [MatTableModule, MatSortModule, MatButtonModule, MatIconModule, ConfirmDialogComponent, RackFormModalComponent, CommonModule],
  templateUrl: './rack-list.component.html',
  styleUrl: './rack-list.component.scss'
})
export class RackListComponent implements AfterViewInit, OnInit, OnChanges {

  displayedColumns: string[] = ['id', 'type', 'actions'];
  dataSource = new MatTableDataSource<Rack>([]);
  @Input() warehouseId: Number = 0;
  @Input() racks: Rack[] = [];
  @Output() onNewRack = new EventEmitter();

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private rackService: RackService
  ) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.getData();
  }

  ngOnChanges() {
    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getData() {
    this.dataSource.data = this.racks;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar");
  }

  deleteRack(element: Rack) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.confirmDeleteRack(element);
      }
    });
  }

  showModalFormRack() {
    const dialogRef = this.dialog.open(RackFormModalComponent, {
      data: {warehouseId: this.warehouseId},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.valid) {
        this.openSnackBar("Se ha añadido rack con éxito");
        this.onNewRack.emit();
      }
      else {
        let messageError = "Ha ocurrido un error, intente nuevamente";
        if (result.message === "INVALID_WAREHOUSE_SIZE") {
          messageError = "¡ERROR!, tamaño maximo de warehouse alcanzado, no es posible añadir nuevos racks"
        }
        if (result.message === "INVALID_WAREHOUSE_TYPE") {
          messageError = "¡ERROR!, invalida combinacion de racks y tipo de warehouse"
        }
        this.openSnackBar(messageError);
      }
    });
  }

  confirmDeleteRack(element: Rack) {
    this.rackService.deleteRack(element)
    .pipe(
      catchError(err => {
        this.openSnackBar("Ha ocurrido un error, intente nuevamente");
        return of([]);
      })
    )
    .subscribe(() => {
      this.openSnackBar("¡Se ha eliminado rack con éxito!");
      this.onNewRack.emit();
    });
  }

}

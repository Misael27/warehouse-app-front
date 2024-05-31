import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { catchError, of } from 'rxjs';
import { Warehouse, WarehouseService } from '../../../services/warehouse/warehouse.service';
import { RackListComponent } from '../../rack/rack-list/rack-list.component';

@Component({
  selector: 'app-warehouse-detail',
  standalone: true,
  imports: [MatGridListModule, MatDialogModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, RackListComponent],
  templateUrl: './warehouse-detail.component.html',
  styleUrl: './warehouse-detail.component.scss'
})
export class WarehouseDetailComponent {

  currentId = 0;
  isEdit = false;
  warehouse: Warehouse;
  warehouseForm: FormGroup;
  permutations: string[] = [];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private warehouseService: WarehouseService,
    private _snackBar: MatSnackBar
  ) {
    this.warehouse = {
      client: '',
      family: '',
      id: -1,
      size: 0,
      uuid: '',
      rackList: []
    }
    this.warehouseForm = this.fb.group({
      id: ['', Validators.required],
      client: ['', Validators.required],
      family: ['', Validators.required],
      size: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.currentId = this.activatedRoute.snapshot.params['id'];
    this.isEdit = this.activatedRoute.snapshot.queryParams['isEdit'] ? true : false;
    this.getData();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar");
  }

  getData() {
    this.warehouseService.getWarehouseById(this.currentId)
    .pipe(
      catchError(err => {
        this.openSnackBar("Ha ocurrido un error, intente nuevamente");
        return of([]);
      })
    )
    .subscribe(data => {
      this.warehouse = data as Warehouse;
      this.warehouseForm.patchValue(this.warehouse);
    });
    this.warehouseService.getPermutations(this.currentId).pipe(
      catchError(err => {
        return of([]);
      })
    )
    .subscribe(data => {
      this.permutations = data as string[];
    });
  }

  onSubmit() {
    if (this.warehouseForm.valid) {
      this.warehouseService.putWarehouses(this.warehouseForm.value)
      .pipe(
        catchError(err => {
          debugger;
          console.error('Error actualizando warehouses:', err);
          return of({valid:false, message:err.error?.message});
        })
      )
      .subscribe((data:any) => {
        if (data.valid) {
          this.openSnackBar("¡Se ha actualizado con éxito!");
          this.getData();
        }
        else {
          let messageError = "Ha ocurrido un error, intente nuevamente";
          if (data.message === "INVALID_REQUEST") {
            messageError = "¡ERROR!, invalida combinacion de racks y tipo de warehouse"
          }
          this.openSnackBar(messageError);
          }
      });
    }
  }

}

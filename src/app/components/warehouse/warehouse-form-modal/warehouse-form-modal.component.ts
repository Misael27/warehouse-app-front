import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { WarehouseService } from '../../../services/warehouse/warehouse.service';

@Component({
  selector: 'app-warehouse-form-modal',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './warehouse-form-modal.component.html',
  styleUrl: './warehouse-form-modal.component.scss'
})
export class WarehouseFormModalComponent implements OnInit {
  warehouseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<WarehouseFormModalComponent>,
    private warehouseService: WarehouseService,
    private _snackBar: MatSnackBar
  ) {
    this.warehouseForm = this.fb.group({
      client: ['', Validators.required],
      family: ['', Validators.required],
      size: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar");
  }

  onSubmit() {
    if (this.warehouseForm.valid) {
      this.warehouseService.postWarehouses(this.warehouseForm.value)
      .pipe(
        catchError(err => {
          console.error('Error creando almacen', err);
          return of([]);
        })
      )
      .subscribe(data => {
        this.dialogRef.close();
        this.openSnackBar("¡Se ha creado con éxito!");
      });
    }
  }

}

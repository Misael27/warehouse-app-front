import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { catchError, of } from 'rxjs';
import { RackService } from '../../../services/rack/rack.service';

export interface DialogData {
  warehouseId: number;
}

@Component({
  selector: 'app-rack-form-modal',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './rack-form-modal.component.html',
  styleUrl: './rack-form-modal.component.scss'
})
export class RackFormModalComponent {

  rackForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RackFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private rackService: RackService,
  ) {
    this.rackForm = this.fb.group({
      warehouseId: [data.warehouseId, Validators.required],
      type: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.rackForm.valid) {
      this.rackService.postRack(this.rackForm.value)
      .pipe(
        catchError(err => {
          console.error('Error creando racks:', err);
          return of({valid:false, message:err.error?.message});
        })
      )
      .subscribe(data => {
        this.dialogRef.close(data);
      });
    }
  }

}

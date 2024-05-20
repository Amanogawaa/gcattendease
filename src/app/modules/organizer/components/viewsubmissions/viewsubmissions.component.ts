import { Component, OnInit, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthserviceService } from '../../../../core/service/authservice.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ViewattendanceimageComponent } from '../viewattendanceimage/viewattendanceimage.component';

@Component({
  selector: 'app-viewsubmissions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewsubmissions.component.html',
  styleUrl: './viewsubmissions.component.css'
})
export class ViewsubmissionsComponent {

  datalist: any;

  constructor(private service: AuthserviceService, @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<ViewsubmissionsComponent>, private dialog2: MatDialog) {
  }

  ngOnInit(): void {
    console.log(`User: ${this.data.selectedUser}`);
    console.log(`Event: ${this.data.selectedEvent}`);
    this.loadData();
  }

  loadData() {
    this.service.getAttendanceByUser(this.data.selectedUser, this.data.selectedEvent).subscribe((res: any) => {
      this.datalist = res.payload;
      console.log(this.datalist)
    })
  }

  viewAttendance(attendance_id: number) {
    console.log(attendance_id);
    this.dialog2.open(ViewattendanceimageComponent, {
      width: '80%',
      data: {
        selectedAttendance: attendance_id,
      }
    });
  }


  approveAttendance(attendance_id: number, currentValue: boolean) {
    const newValue = currentValue ? 0 : 1; // Flip the current value
    const requestData = {
      attendance_id: attendance_id,
      newRemark: newValue
    };
    this.service.toggleAttendanceRemark(requestData).subscribe(
      (response: any) => {
        console.log('Submission remark toggled successfully:', response);

        const submissionIndex = this.datalist.findIndex((data: any) => data.attendance_id === attendance_id);
        if (submissionIndex !== -1) {
          this.datalist[submissionIndex].remarks = newValue;
        }
      },
      (error) => console.error('Error toggling Submission remark:', error)
    );
  }


}

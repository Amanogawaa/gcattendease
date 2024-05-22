import { Component, OnInit, Inject } from '@angular/core';
import { AuthserviceService } from '../../../../core/service/authservice.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

interface Image {
  image: SafeResourceUrl | undefined;
}

@Component({
  selector: 'app-viewattendanceimage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewattendanceimage.component.html',
  styleUrls: ['./viewattendanceimage.component.css'], // Corrected from styleUrl to styleUrls
})
export class ViewattendanceimageComponent implements OnInit {
  attendeeImage: Image | undefined = undefined;

  constructor(
    private service: AuthserviceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialogRef<ViewattendanceimageComponent>,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    console.log(`Attendance: ${this.data.selectedAttendance}`);
    this.loadImage();
  }

  loadImage() {
    this.service.getAttendanceImage(this.data.selectedAttendance).subscribe(
      (imageResult: Blob) => {
        if (imageResult.size > 0) {
          const url = URL.createObjectURL(imageResult);
          this.attendeeImage = {
            image: this.sanitizer.bypassSecurityTrustResourceUrl(url),
          };
          console.log('Generated URL:', url); // Log the generated URL
        } else {
          console.log('Image result is empty');
        }
      },
      (error) => {
        console.error('Failed to load image:', error);
      }
    );
  }
}

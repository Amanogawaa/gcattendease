import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { EventService } from '../../../../core/service/event.service';
import { DeleteEventComponent } from '../../components/delete-event/delete-event.component';
import { CommonModule } from '@angular/common';
import { MarkattendanceeComponent } from '../../components/markattendancee/markattendancee.component';

interface Event {
  event_id: number;
  event_name: string;
  event_description: string;
  event_location: string;
  event_start_date: Date;
  event_end_date: Date;
  event_registration_start: Date;
  event_registration_end: Date;
  session: string;
  event_image: SafeResourceUrl | undefined;
}

@Component({
  selector: 'app-attendance',
  standalone: true,
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css',
  imports: [DeleteEventComponent, CommonModule],
})
export class AttendanceComponent implements OnInit {
  eventData: any;
  selectedEventId: any;
  eventList: Event[] = [];
  maxChar = 100;

  constructor(
    private service: EventService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) { }

  loadEvent() {
    this.service.getAllEvents().subscribe((result) => {
      
      this.eventList = result.payload.map((data: any): Event => {
        const eventId = data.event_id;
        const eventObject: Event = {
          event_id: data.event_id,
          event_name: data.event_name,
          event_description: data.event_description,
          event_location: data.event_location,
          event_start_date: data.event_start_date,
          event_end_date: data.event_end_date,
          event_registration_start: data.event_registration_start,
          event_registration_end: data.event_registration_end,
          session: data.session,
          event_image: undefined,
        };

        this.service.getEventImage(eventId).subscribe((imageResult) => {
          if (imageResult.size > 0) {
            const url = URL.createObjectURL(imageResult);
            eventObject.event_image =
              this.sanitizer.bypassSecurityTrustResourceUrl(url);
          }
        });
        return eventObject;
      });
      console.log(this.eventList);
    });
  }

  ngOnInit(): void {
    this.loadEvent();
  }

  viewEvent(eventId: any) {
    console.log(eventId);
    this.dialog.open(MarkattendanceeComponent, {
      width: '75%',
      data: { 
        selectedEvent: eventId 
      }
    });
  }

  truncateDescription(text: string, maxLength: number): string {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + ' ...';
    } else {
      return text;
    }
  }
}

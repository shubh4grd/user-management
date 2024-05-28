import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
})
export class CameraComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef;
  video!: HTMLVideoElement;
  capturedImage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.video = this.videoElement?.nativeElement;
    this.startCamera();
  }

  ngOnDestroy() {
    this.stopCamera();
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.video.srcObject = stream;
      }).catch(error => {
        console.error("Error accessing camera", error);
      });
  }

  captureImage() {
    const canvas = document.createElement('canvas');
    canvas.width = this.video?.videoWidth;
    canvas.height = this.video?.videoHeight;
    const ctx:any = canvas.getContext('2d');
    ctx.drawImage(this.video, 0, 0);
    this.capturedImage = canvas.toDataURL('image/png');
  }

  saveImage() {
    if (!this.capturedImage) {
      alert('No image to save');
      return;
    }
    const a = document.createElement('a');
    a.href = this.capturedImage;
    a.download = 'captured-image.png'; // You can set the default filename for the download here
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  stopCamera() {
    if (this.video?.srcObject) {
      (this.video?.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
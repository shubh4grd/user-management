// src/app/camera/camera.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css'],
})
export class CameraComponent {
  capturedImage!: string;

  constructor(private authService: AuthService, private router: Router) {}
  
  captureImage() {
    // Code to capture image using camera
    this.capturedImage = 'image_data_here'; // Placeholder for captured image data
  }

  saveImage() {
    // Code to save captured image
    console.log('Image saved:', this.capturedImage);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

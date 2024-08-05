import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  ViewChild,
  type OnInit,
} from '@angular/core';

import QRCode from 'qrcode';

import { MaterialModule } from 'src/app/modules/material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-group-qr',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './GroupQR.component.html',
  styleUrl: './GroupQR.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupQRComponent implements OnInit {
  @ViewChild('QRcanvas') qrCanvas!: ElementRef<HTMLCanvasElement>;

  qrSizes = [512, 1024, 2048, 4096];

  constructor(
    public dialogRef: MatDialogRef<GroupQRComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      groupName: string;
      qrCode: string;
    }
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.qrCanvas) {
      QRCode.toCanvas(
        this.qrCanvas.nativeElement,
        `checkin:${this.data.qrCode}`,
        {
          errorCorrectionLevel: 'H',
          width: 200,
        }
      );
    }
  }

  downloadQR(size: number): void {
    QRCode.toDataURL(
      this.data.qrCode,
      {
        errorCorrectionLevel: 'H',
        width: size,
      },
      (_, url) => {
        const a = document.createElement('a');

        a.href = url;
        a.download = `${this.data.groupName}_QR_${size}.png`;
        a.click();
      }
    );
  }

  onOkClick(): void {
    this.dialogRef.close();
  }
}

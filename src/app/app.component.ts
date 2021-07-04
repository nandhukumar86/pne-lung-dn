import { Component } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { rendererTypeName } from '@angular/compiler';

import * as cornerstone from "cornerstone-core";
import * as dicomParser from "dicom-parser";
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'
import { toBase64String } from '@angular/compiler/src/output/source_map';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pne-lung-dn';
  modelUrl = 'https://raw.githubusercontent.com/nandhukumar86/pne-lung-dn/master/DenseNetModel/model.json';
  url: string | ArrayBuffer;
  binarystring: (blob: Blob) => void;
  patientId: string;
  bodyPart: string;
  gender: string;
  age: string;

  ngOnInit(): void {
  }

  ImageSelected(e) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);

    reader.onload = (event) => {
      var arrayImage = new Uint8Array(<ArrayBuffer>event.target.result);
      var dataset = dicomParser.parseDicom(arrayImage);

      this.patientId = dataset.string('x00100020');
      this.bodyPart = dataset.string('x00180015');
      this.gender = dataset.string('x00100040');
      this.age = dataset.string('x00101010')

    }

  }
}

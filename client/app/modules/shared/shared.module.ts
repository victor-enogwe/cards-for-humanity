import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainContainerComponent } from 'client/app/components/shared/main-container/main-container.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [MainContainerComponent],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, MainContainerComponent, MaterialModule, ScrollingModule],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, ScrollingModule],
})
export class SharedModule {}

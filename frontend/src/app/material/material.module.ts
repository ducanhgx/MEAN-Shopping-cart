import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatBadgeModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatMenuModule,
  MatToolbarModule,
  MatSidenavModule,
  MatCardModule,
  MatListModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule
} from "@angular/material";
const MaterialComponents = [
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatBadgeModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule,
  MatExpansionModule,
  MatMenuModule,
  MatToolbarModule,
  MatSidenavModule,
  MatCardModule,
  MatListModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule
];
@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule {}

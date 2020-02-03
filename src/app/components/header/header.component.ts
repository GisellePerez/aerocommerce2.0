import { Component, OnInit, Input } from '@angular/core';
import { UserData, updatedPointsResponse } from 'src/app/interfaces/user.interface';
import { ApiHandlerService } from 'src/app/api-handler.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  public userData: UserData = null;

  public displayUserDropdown = false;

  constructor(private apiHandler: ApiHandlerService) { }

  ngOnInit() {
  }

  public onGetMorePoints(): void {
    this.apiHandler.addPoints().subscribe((_newPoints: updatedPointsResponse) => {
      this.apiHandler.userPointsUpdated.emit(true);
    });
  }

  public toggleDisplayUserDropdown(): void {
    this.displayUserDropdown = !this.displayUserDropdown;
  }

}

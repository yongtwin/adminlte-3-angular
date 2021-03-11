import { NotificationDto } from './NotificationDto';

export interface UserRegisterDto {
  Notification: NotificationDto[];
  Result: UserRegisterResult;
}

export interface UserRegisterResult {
  Status: string;
  Message: string;
}

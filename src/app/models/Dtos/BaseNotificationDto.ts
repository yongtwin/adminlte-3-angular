import { NotificationDto } from './NotificationDto';
import { UserLoginDto } from './UserLoginDto';

export interface BaseNotificationDto {
  Notification: Notification[];
  Result: UserLoginDto;
}

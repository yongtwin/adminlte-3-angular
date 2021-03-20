import { NotificationDto } from './NotificationDto';
import { UserLoginDto } from './UserLoginDto';

export interface BaseNotificationDto {
  notification: Notification[];
  result: UserLoginDto;
}

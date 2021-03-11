import { NotificationDto } from './NotificationDto';

export interface UserLoginDto {
  Notification: NotificationDto[];
  Result: UserLoginDto;
}

export interface UserLoginResult {
  JwtToken: string;
  UserRole: string;
  status: boolean;
  message: string;
}

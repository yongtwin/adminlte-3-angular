import { NotificationDto } from './NotificationDto';

export interface UserLoginDto {
  notification: NotificationDto[];
  result: UserLoginResult;
}

export interface UserLoginResult {
  jwtToken: string;
  userRole: string;
  status: boolean;
  message: string;
}

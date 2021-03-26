import { NotificationDto } from './NotificationDto';

export interface UserResetPasswordDto {
  notification: NotificationDto[];
  result: UserResetPasswordResult;
}

export interface UserResetPasswordResult {
  newPassword: string;
  jwtToken: string;
  status: boolean;
  message: string;
}

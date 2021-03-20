import { NotificationDto } from './NotificationDto';

export interface UserRegisterDto {
  notification: NotificationDto[];
  result: UserRegisterResult;
}

export interface UserRegisterResult {
  status: string;
  message: string;
}

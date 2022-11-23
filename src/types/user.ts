import { BoardBaseDTO } from './board';

export interface UserLoginDTO {
  id: string;
  email: string;
  type: string;
  boards: BoardBaseDTO[];
  token: string;
}

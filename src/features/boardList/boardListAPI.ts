import { BoardBaseDTO } from './../../types/board';
import { AxiosResponse } from 'axios';
import { boardAPI } from '../../utils/axios';

export async function addNewBoardAPI(): Promise<BoardBaseDTO> {
  const res: AxiosResponse<BoardBaseDTO> = await boardAPI().post('/');

  return res.data;
}

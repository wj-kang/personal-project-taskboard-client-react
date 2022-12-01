import { BoardBaseDTO } from './../../types/board';
import { AxiosResponse } from 'axios';
import { boardAPI } from '../../utils/axios';

export async function addNewBoardAPI(): Promise<BoardBaseDTO> {
  const res: AxiosResponse<BoardBaseDTO> = await boardAPI().post('/');

  return res.data;
}

export async function updateBoardOrderAPI(src: number, dest: number): Promise<void> {
  await boardAPI().put('/board-drag', { src, dest });
}

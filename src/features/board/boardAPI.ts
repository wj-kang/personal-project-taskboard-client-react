import { BoardDetailDTO } from './../../types/board';
import { AxiosResponse } from 'axios';
import { boardAPI } from '../../utils/axios';

export async function fetchBoardById(boardId: string): Promise<BoardDetailDTO> {
  const res: AxiosResponse<BoardDetailDTO> = await boardAPI().get(`/${boardId}`);

  return res.data;
}
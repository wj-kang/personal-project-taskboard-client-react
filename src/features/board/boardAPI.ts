import { BoardDetailDTO } from './../../types/board';
import { AxiosResponse } from 'axios';
import { boardAPI, listAPI } from '../../utils/axios';

export async function fetchBoardById(boardId: string): Promise<BoardDetailDTO> {
  const res: AxiosResponse<BoardDetailDTO> = await boardAPI().get(`/${boardId}`);

  return res.data;
}

export async function addNewListAPI(boardId: string): Promise<BoardDetailDTO> {
  const res: AxiosResponse<BoardDetailDTO> = await listAPI().post(`/`, { boardId });

  return res.data;
}

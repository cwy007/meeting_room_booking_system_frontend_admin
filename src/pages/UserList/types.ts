export interface User {
  id: number;
  username: string;
  nickName: string;
  email: string;
  headPic: string;
  phoneNumber: string;
  isFrozen: boolean;
  createTime: string;
}

export interface UserListVo {
  list: User[];
  totalCount: number;
}

export interface UserListParams {
  page?: number;
  pageSize?: number;
  username?: string;
  email?: string;
  nickName?: string;
}

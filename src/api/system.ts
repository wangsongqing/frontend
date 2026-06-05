import { http } from "@/utils/http";

/** 用户信息类型 */
export type UserInfo = {
  id: number;
  username: string;
  nickname: string | null;
  mobile: string;
  email: string | null;
  password: string;
  city: string;
  code: string;
  createTime: number;
  updateTime: string;
  lastActiveTime: string;
  deviceToken: string;
  deviceType: string;
  ip: string;
  isAllowLogin: number;
  jpushId: string;
  openId: string;
  softChannel: number;
  userPic: string | null;
};

/** 用户列表响应类型 */
export type UserListResult = {
  code: number;
  message: string;
  data: UserInfo[];
};

/** 获取用户列表 */
export const getUserList = () => {
  return http.request<UserListResult>("get", "/user");
};

/** 获取单个用户 */
export const getUserInfo = (id: number) => {
  return http.request<{ code: number; message: string; data: UserInfo }>(
    "get",
    `/user/${id}`
  );
};

/** 创建用户 */
export const createUser = (data: Partial<UserInfo>) => {
  return http.request<{ code: number; message: string }>("post", "/user", {
    data
  });
};

/** 更新用户 */
export const updateUser = (id: number, data: Partial<UserInfo>) => {
  return http.request<{ code: number; message: string }>("put", `/user/${id}`, {
    data
  });
};

/** 删除用户 */
export const deleteUser = (id: number) => {
  return http.request<{ code: number; message: string }>("delete", `/user/${id}`);
};

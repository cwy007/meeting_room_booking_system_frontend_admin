import type { ApiResponse } from "@/common/types";
import request from "@/common/utils/request";
import type { UserListParams, UserListVo } from "./types";

export function getUserList(params: UserListParams) {
  return request.get<never, ApiResponse<UserListVo>>("/user/list", { params });
}

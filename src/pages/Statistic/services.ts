import type { ApiResponse } from "@/common/types";
import request from "@/common/utils/request";
import type { StatisticParams, UserBookingCount, RoomBookingCount } from "./types";

export function getUserBookingCount(params: StatisticParams) {
  return request.get<never, ApiResponse<UserBookingCount[]>>(
    "/statistic/booking-count-by-user",
    { params },
  );
}

export function getRoomBookingCount(params: StatisticParams) {
  return request.get<never, ApiResponse<RoomBookingCount[]>>(
    "/statistic/booking-count-by-room",
    { params },
  );
}

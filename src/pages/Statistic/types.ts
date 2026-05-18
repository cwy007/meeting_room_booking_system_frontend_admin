export interface StatisticParams {
  startTime: string;
  endTime: string;
}

export interface UserBookingCount {
  userId: number;
  username: string;
  bookingCount: number;
}

export interface RoomBookingCount {
  roomId: number;
  roomName: string;
  bookingCount: number;
}

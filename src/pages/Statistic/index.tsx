import { useState, useEffect } from "react";
import { DatePicker, Button, Space, Row, Col, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import type { RangePickerProps } from "antd/es/date-picker";
import type { UserBookingCount, RoomBookingCount } from "./types";
import { getUserBookingCount, getRoomBookingCount } from "./services";

const { RangePicker } = DatePicker;

const defaultRange: [dayjs.Dayjs, dayjs.Dayjs] = [
  dayjs().subtract(30, "day").startOf("day"),
  dayjs().endOf("day"),
];

function Statistic() {
  const [range, setRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>(defaultRange);
  const [userData, setUserData] = useState<UserBookingCount[]>([]);
  const [roomData, setRoomData] = useState<RoomBookingCount[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (start: dayjs.Dayjs, end: dayjs.Dayjs) => {
    setLoading(true);
    try {
      const params = {
        startTime: start.toISOString(),
        endTime: end.toISOString(),
      };
      const [userRes, roomRes] = await Promise.all([
        getUserBookingCount(params),
        getRoomBookingCount(params),
      ]);
      setUserData(userRes.data ?? []);
      setRoomData(roomRes.data ?? []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(defaultRange[0], defaultRange[1]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = () => {
    fetchData(range[0], range[1]);
  };

  const onRangeChange: RangePickerProps["onChange"] = (dates) => {
    if (dates && dates[0] && dates[1]) {
      setRange([dates[0] as dayjs.Dayjs, dates[1] as dayjs.Dayjs]);
    }
  };

  const pieOption = {
    title: { text: "各用户预订数量（饼图）", left: "center" },
    tooltip: { trigger: "item", formatter: "{b}: {c} 次 ({d}%)" },
    legend: { orient: "vertical", left: "left" },
    series: [
      {
        type: "pie",
        radius: "60%",
        data: userData.map((item) => ({
          name: item.username,
          value: item.bookingCount,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  const userBarOption = {
    title: { text: "各用户预订数量（柱状图）", left: "center" },
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    xAxis: {
      type: "category",
      data: userData.map((item) => item.username),
      axisLabel: { rotate: 30 },
    },
    yAxis: { type: "value", minInterval: 1, name: "预订次数" },
    series: [
      {
        type: "bar",
        data: userData.map((item) => item.bookingCount),
        itemStyle: { color: "#52c41a" },
        label: { show: true, position: "top" },
      },
    ],
  };

  const roomPieOption = {
    title: { text: "各会议室预订数量（饼图）", left: "center" },
    tooltip: { trigger: "item", formatter: "{b}: {c} 次 ({d}%)" },
    legend: { orient: "vertical", left: "left" },
    series: [
      {
        type: "pie",
        radius: "60%",
        data: roomData.map((item) => ({
          name: item.roomName,
          value: item.bookingCount,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  const barOption = {
    title: { text: "各会议室预订数量（柱状图）", left: "center" },
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    xAxis: {
      type: "category",
      data: roomData.map((item) => item.roomName),
      axisLabel: { rotate: 30 },
    },
    yAxis: {
      type: "value",
      minInterval: 1,
      name: "预订次数",
    },
    series: [
      {
        type: "bar",
        data: roomData.map((item) => item.bookingCount),
        itemStyle: { color: "#1677ff" },
        label: { show: true, position: "top" },
      },
    ],
  };

  return (
    <div>
      <Space style={{ marginBottom: 24 }}>
        <RangePicker
          value={range}
          onChange={onRangeChange}
          format="YYYY-MM-DD"
          allowClear={false}
        />
        <Button type="primary" icon={<SearchOutlined />} onClick={onSearch}>
          查询
        </Button>
      </Space>

      <Spin spinning={loading}>
        <Row gutter={[24, 32]}>
          <Col xs={24} lg={12}>
            <ReactECharts option={pieOption} style={{ height: 400 }} />
          </Col>
          <Col xs={24} lg={12}>
            <ReactECharts option={userBarOption} style={{ height: 400 }} />
          </Col>
          <Col xs={24} lg={12}>
            <ReactECharts option={roomPieOption} style={{ height: 400 }} />
          </Col>
          <Col xs={24} lg={12}>
            <ReactECharts option={barOption} style={{ height: 400 }} />
          </Col>
        </Row>
      </Spin>
    </div>
  );
}

export default Statistic;

export const statusData = [
  {
    en: "pending",
    vi: "Đang chờ",
  },
  {
    en: "confirmed",
    vi: "Đã xác nhận",
  },
  {
    en: "completed",
    vi: "Hoàn thành",
  },
];

export const statusDataHashmap = statusData.reduce((acc, cur) => {
  acc[cur.en] = cur.vi;
  return acc;
}, {});

export const getStatusFromEn = (en) => {
  return statusDataHashmap[en];
};

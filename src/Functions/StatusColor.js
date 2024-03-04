export function getStatusVehicle(status = 0) {
  const arr = [
    { code: "#ADADB2", name: "realtime_4" },
    { code: "#5DE648", name: "realtime_173" },
    { code: "#ff3b30", name: "realtime_174" },
    { code: "#FFE600", name: "" },
    { code: "#ADADB2", name: "" },
    { code: "#5856d6", name: "" },
  ];
  return arr[status];
}

export function getStatusCard(status = 0) {
  const arr = [
    { code: "#cacaca", name: "realtime_64" },
    { code: "#5de648", name: "realtime_62" },
    { code: "#f86c8b", name: "realtime_63" },
  ];
  return arr[status];
}

export function getIconStatusPath(status = 0) {
  let path = "";
  switch (status) {
    case 0:
      path = "/icons/MarkerYanmar/1-T-2.png";
      break;
    case 1:
      path = "/icons/MarkerYanmar/1-T-1.png";
      break;
    case 2:
      path = "/icons/MarkerYanmar/2-T-2.png";
      break;
    case 3:
      path = "/icons/MarkerYanmar/2-T-1.png";
      break;
    case 4:
      path = "/icons/MarkerYanmar/3-T-2.png";
      break;
    case 5:
      path = "/icons/MarkerYanmar/3-T-1.png";
      break;
    default:
      path = "";
      break;
  }
  return path;
}
export function getIconStatusPathTractor(status = 0) {
  let path = "";
  switch (status) {
    case 0:
      path = "/icons/MarkerTractor/greybg.png";
      break;
    case 1:
      path = "/icons/MarkerTractor/whitebg.png";
      break;
    default:
      path = "";
      break;
  }
  return path;
}

export function getStatusName(status = 0) {
  let name = "";
  switch (status) {
    case 0:
      name = "หยุดทำงาน";
      break;
    case 1:
      name = "กำลังทำงาน";
      break;
    case 2:
      name = "หยุดทำงาน/เกิดความผิดปกติ ภายใน 24 ชม.ที่ผ่านมา";
      break;
    case 3:
      name = "กำลังทำงาน/เกิดความผิดปกติ ภายใน 24 ชม.ที่ผ่านมา";
      break;
    case 4:
      name = "ไม่ทำงาน/เกิดความผิดปกติ ภายใน 30 นาทีที่ผ่านมา";
      break;
    case 5:
      name = "กำลังทำงาน/เกิดความผิดปกติ ภายใน 30 นาทีที่ผ่านมา";
      break;
    default:
      name = "";
      break;
  }
  return name;
}

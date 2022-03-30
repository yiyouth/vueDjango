import axios from "axios";

export const request = async function (url, params) {
  let res;
  try {
    res = await axios.post(url, params);
  } catch (e) {
    ElNotification({
      message: e,
      type: "error",
    });
    throw Error(e);
  }
  const errMsg = res.data.error;
  if (errMsg) {
    ElNotification({
      title: "请检验",
      message: errMsg,
      type: "error",
    });
    throw Error(errMsg);
  }
  return res.data;
};

import { useEffect, useState } from "react";

export default function useDevice() {
  const [device, setDevice] = useState({
    isIE: false,
    isOpera: false,
    isChrome: false,
    isFireFox: false,
    isMobile: false,
    isPC: false,
    isIos: false,
    isAndroid: false,
    isIphone: false,
    isIPad: false,
    isWeChat: false,
    isNoVideo: false,
  });

  useEffect(() => {
    const ua = window.navigator.userAgent;
    const specialBrowser = ["QQ", "wv", "Vivo", "UC", "Miui", "Oppo"];
    setDevice({
      isIE: ua.indexOf("Trident") > -1, //IE内核
      isOpera: ua.indexOf("Presto") > -1, //opera内核
      isChrome: ua.indexOf("AppleWebKit") > -1, //苹果、谷歌内核
      isFireFox: ua.indexOf("Gecko") > -1 && ua.indexOf("KHTML") == -1, //火狐内核
      isMobile: !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      isPC: !!!ua.match(/AppleWebKit.*Mobile.*/), //是否为PC终端
      isIos: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      isAndroid: ua.indexOf("Android") > -1 || ua.indexOf("Linux") > -1, //android终端或者uc浏览器
      isIphone: ua.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
      isIPad: ua.indexOf("iPad") > -1, //是否iPad
      isWeChat: ua.indexOf("MicroMessenger") > -1, //是否微信
      isNoVideo: specialBrowser.some((type) => ua.indexOf(type) >= 0),
    });
  }, []);

  return device;
}

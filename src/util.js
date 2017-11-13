import 'whatwg-fetch';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export function getQueryMap() {
  const query = window.location.search.substr(1);
  const res = {};
  query.split('&').forEach(part => {
    const kv = part.split('=');
    res[kv[0]] = decodeURIComponent(kv[1]);
  });
  return res;
}

export function getBrowserId() {
  const ua = window.navigator.userAgent.toLowerCase();
  const ver = window.navigator.appVersion.toLowerCase();

  if (ua.indexOf('chrome') >= 0) {
    return 'chrome';
  } else if (ua.indexOf('firefox') >= 0) {
    return 'firefox';
  } else if (ua.indexOf('safari') >= 0) {
    return 'safari';
  } else if (ua.indexOf('opera') >= 0) {
    return 'opera';
  } else if (ua.indexOf('trident') >= 0) {
    // 'ie11' or higher
    return `ie${ua.match(/(rv:)([\d]+)/)[2]}`;
  } else if (ua.indexOf('msie') >= 0) {
    if (ver.indexOf('msie 10.') >= 0) {
      return 'ie10';
    } else if (ver.indexOf('msie 9.') >= 0) {
      return 'ie9';
    } else if (ver.indexOf('msie 8.') >= 0) {
      return 'ie8';
    } else if (ver.indexOf('msie 7.') >= 0) {
      return 'ie7';
    } else if (ver.indexOf('msie 6.') >= 0) {
      return 'ie6';
    }
    return 'ie';  // can't determine the version
  }
  return 'unknown';
}

export function redirect(url) {
  window.location.url = url;
}

export function restart() {
  const url = window.location.url;
  redirect(url);
}

export function sendHttpRequest(method, url) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open(method, url);
    req.onload = () => {
      const status = this.status;
      if (status >= 200 && status < 300) {
        resolve(req.response);
      } else {
        reject({ status, statusText: req.statusText });
      }
    };
    req.onerror = () => {
      const status = this.status;
      reject({ status, statusText: req.statusText });
    };
    req.send();
  });
}

export function getGlobal(name, defaultValue = undefined) {
  const res = window[name];
  if (res === undefined) {
    return defaultValue;
  }
  return res;
}

export function basename(path) {
  return path.split('/').reverse()[0];
}

export function saveAsTextFile(content, filename) {
  const mimeType = { type: 'text/plain;charset=utf-8' };
  const blob = new Blob([content], mimeType);
  saveAs(blob, filename);
}

export function saveAsBlob(blob, filename) {
  saveAs(blob, filename);
}

export function packIntoZip(fileList) {
  const zip = new JSZip();
  for (let i = 0; i < fileList.length; i++) {
    const { path, value } = fileList[i];
    zip.file(path, value);
  }
  const blob = zip.generate({ type: 'blob' });
  return blob;
}

export function unpackZip(blob) {	// blob should be ArrayBuffer
  const zip = new JSZip();
  try {
    zip.load(blob);
  } catch (e) {
    return null;	// blob is not a proper zip file
  }
  const match = zip.file(/.*/);
  const res = [];
  for (let i = 0; i < match.length; i++) {
    const { name } = match[i];
    const value = match[i].asText();
    res.push({ path: name, value });
  }
  return res;
}

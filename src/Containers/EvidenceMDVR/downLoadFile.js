import { ENDPOINT_BASE } from '../../Config/app-config';

export async function downloadVideo(device_id, evidence_id, idToken) {
  console.log("downloadVideo : ", device_id)
  try {
    var response = await fetch(ENDPOINT_BASE + "gateway/mdvr/evidence/download", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'AccessToken': idToken
      },
      body: JSON.stringify({
        // "device_id": device_id,
        "device_id": "00BD0004F8",
        "evidence_id": evidence_id
      })
    });

    var data = await response.json();
    if (data.message === "ok") {
      download(data.result.path)
    }
  } catch { }
}

export async function download(url) {
  var element = document.createElement('a');
  element.setAttribute('href', url);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
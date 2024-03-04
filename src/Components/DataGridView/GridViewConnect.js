import 'devextreme/data/odata/store';
import CustomStore from 'devextreme/data/custom_store';

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== '';
}

const dataSource = (_targetPath, orderId, credentialsInfo) => {
  // console.log(_targetPath, orderId, credentialsInfo)
  const connect = new CustomStore({
    key: orderId,
    load: function (loadOptions) {
      let params = '?';
      [
        'skip',
        'take',
        'requireTotalCount',
        'requireGroupCount',
        'sort',
        'filter',
        'totalSummary',
        'group',
        'groupSummary'
      ].forEach(function (i) {
        if (i in loadOptions && isNotEmpty(loadOptions[i])) { params += `${i}=${JSON.stringify(loadOptions[i])}&`; }
      });
      params = encodeURI(params.slice(0, -1));

      // ?skip=0&take=10&requireTotalCount=true
      var parm = _targetPath.split('?').pop();
      if (parm !== _targetPath) params = params.replace('?', '&')

      //   var targetHost = 'api-center.onelink-iot.com';  //const url = 'https://api-center.onelink-iot.com';
      //   var targetPath = `/v1.0.0/test/auth/grid-view/v1${params}`; // const url = '/v1.0.0/api/hino/vehicles/grid-view';

      var targetHost = 'api-center.onelink-iot.com';
      var targetPath = _targetPath + `${params}`;
      var queryUrl = `https://${targetHost}${targetPath}`;
      // var queryUrl = `https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/Sales`;

      // Add initial values
      //debugger;
      var aws4 = require('aws4')
      var opts2 = {
        host: targetHost,
        service: 'execute-api',
        region: 'ap-southeast-1',
        path: targetPath
      }
      // aws4.sign(opts2, {
      //   secretAccessKey: credentialsInfo.accessKeyId,
      //   ccessKeyId: credentialsInfo.secretKey,
      //   sessionToken: credentialsInfo.sessionToken
      // });
      // var targetHeaders = new Headers({
      //   'Content-Type': 'application/json',
      //   'X-My-Custom-Header': 'CustomValue',
      // });
      // targetHeaders.set('Content-Type', 'application/json');
      // targetHeaders.set('Authorization', opts2.headers['Authorization']);
      // targetHeaders.set('X-Amz-Date', opts2.headers['X-Amz-Date']);
      // targetHeaders.set('X-Amz-Security-Token', opts2.headers['X-Amz-Security-Token']);


      //debugger;
      // return fetch(queryUrl, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     'Authorization': opts2.headers['Authorization'],
      //     'X-Amz-Date': opts2.headers['X-Amz-Date'],
      //     'X-Amz-Security-Token': opts2.headers['X-Amz-Security-Token']
      //   },
      // })
      return fetch(queryUrl, {
        headers: {
          'Authorization': credentialsInfo.idToken,
          'X-API-Key': credentialsInfo.redisKey,
        }
      })
        .then(response => response.json())
        .then((data) => {
          // console.log(JSON.stringify(data.data))
          //debugger;
          return {
            data: data.data,
            totalCount: data.totalCount,
            summary: data.summary,
            groupCount: data.groupCount
          };
        })
        .catch((e) => {
          // console.log(e)
          //  debugger; throw 'Data Loading Error';
        });
    }
  });

  return {
    connect
  }
}

// let's return back our create method as the default.
export default {
  dataSource
}

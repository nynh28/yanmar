const orders = [
  {
    "code": "Driver00001",
    "prefixName": "Mr",
    "name": "Driver Name Updated",
    "familyName": "Onelink",
    "aliasName": "Driver 1",
    "houseAndVillage": "Bangkok",
    "subdistrict": "Bangkok",
    "district": "Bangkok",
    "province": "Bangkok",
    "phone": "0656127345",
    "lineID": "0656127345",
    // "drivingLicenseCards": [
    //   {
    //     "drivingCardNo": "333",
    //     "drivingCardType": 1,
    //     "driverId": 7,
    //     "id": 3,
    //     "discontinued": false
    //   },
    //   {
    //     "drivingCardNo": "444",
    //     "drivingCardType": 1,
    //     "driverId": 7,
    //     "id": 4,
    //     "discontinued": false
    //   }
    // ],
    "id": 1,
    "discontinued": false
  },
  {
    "code": "Driver00002",
    "prefixName": "Mr",
    "name": "Onelink Driver 2",
    "familyName": "Onelink",
    "aliasName": "Driver 2",
    "houseAndVillage": "Bangkok",
    "subdistrict": "Bangkok",
    "district": "Bangkok",
    "province": "Bangkok",
    "phone": "0656127345",
    "lineID": "0656127345",
    // "drivingLicenseCards": [
    //   {
    //     "drivingCardNo": "555",
    //     "drivingCardType": 1,
    //     "driverId": 8,
    //     "id": 5,
    //     "discontinued": false
    //   },
    //   {
    //     "drivingCardNo": "666",
    //     "drivingCardType": 1,
    //     "driverId": 8,
    //     "id": 6,
    //     "discontinued": false
    //   }
    // ],
    "id": 2,
    "discontinued": false
  }
  // ,{
  //   "code": "Driver00002",
  //   "prefixName": "Mr",
  //   "name": "Onelink Driver 2",
  //   "familyName": "Onelink",
  //   "aliasName": "Driver 2",
  //   "houseAndVillage": "Bangkok",
  //   "subdistrict": "Bangkok",
  //   "district": "Bangkok",
  //   "province": "Bangkok",
  //   "phone": "0656127345",
  //   "lineID": "0656127345",
  //   // "drivingLicenseCards": [
  //   //   {
  //   //     "drivingCardNo": "777",
  //   //     "drivingCardType": 1,
  //   //     "driverId": 9,
  //   //     "id": 7,
  //   //     "discontinued": false
  //   //   },
  //   //   {
  //   //     "drivingCardNo": "888",
  //   //     "drivingCardType": 1,
  //   //     "driverId": 9,
  //   //     "id": 8,
  //   //     "discontinued": false
  //   //   }
  //   // ],
  //   "id": 9,
  //   "discontinued": false
  // },

];
const tasks = [{
  'ID': 1,
  'Subject': 'Prepare 2013 Financial',
  'StartDate': '2013/01/15',
  'DueDate': '2013/01/31',
  'Status': 'Completed',
  'Priority': 'High',
  'Completion': 100,
  'EmployeeID': 8
}];

export default {
  getOrders() {
    return orders;
  },
  getTasks() {
    return tasks;
  }
};


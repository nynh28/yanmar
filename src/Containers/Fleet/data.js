const orders = [
  {
    'ID': 1
    , 'FleetName': '10 ล้อ'
  },
  {
    'ID': 1
    , 'FleetName': '6 ล้อ'
  }
  
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


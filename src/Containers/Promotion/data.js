const orders = [
  {
    'ID': 1
    , 'CustomerID': 'ABC102001'
    , 'DealerCode': '111111'
    , 'InternalCustomerID': '1920001'
    , 'FullName' : 'Ngamlarp Transport Co., Ltd.'
    , 'RegisterDate': '01/06/2562'
  }
  , 
  {
    'ID': 2
    , 'CustomerID': 'DEF200931'
    , 'DealerCode': '222222'
    , 'InternalCustomerID': '1920001'
    , 'FullName' : 'Ngamlarp Transport Co., Ltd.'
    , 'RegisterDate': '12/09/2562'
  }
  , 
  {
    'ID': 3
    , 'CustomerID': 'HIF390214'
    , 'DealerCode': '33333'
    , 'InternalCustomerID': '1920001'
    , 'FullName' : 'Ngamlarp Transport Co., Ltd.'
    , 'RegisterDate': '18/10/2562'
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


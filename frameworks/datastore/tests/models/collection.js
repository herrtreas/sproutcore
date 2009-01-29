// ========================================================================
// Collection Unit Tests
// ========================================================================
/*globals module test ok isObj equals expects */

var CollectionTest, employees, anne, bob, alice, rachel, michael, barbara, richard ; // global variables

//
//  core.js stub
//
CollectionTest = SC.Object.create({
  
  FIXTURES: []
  
}) ;

//
// model classes
//
CollectionTest.Employee = SC.Record.extend({
  
}) ;


//
//  fixtures stub
//
CollectionTest.FIXTURES = CollectionTest.FIXTURES.concat([
  
  { guid: '1', 
    recordType: CollectionTest.Employee,
    name: "Anne",
    sex:  "Female"
  },
  
  { guid: '2', 
    recordType: CollectionTest.Employee,
    name: "Bob",
    sex:  "Male"
  },
  
  { guid: '3', 
    recordType: CollectionTest.Employee,
    name: "Alice",
    sex:  "Female"
  },
  
  { guid: '4', 
    recordType: CollectionTest.Employee,
    name: "Rachel",
    sex:  "Female"
  },
  
  { guid: '5', 
    recordType: CollectionTest.Employee,
    name: "Michael",
    sex:  "Male"
  },
  
  { guid: '6', 
    recordType: CollectionTest.Employee,
    name: "Barbara",
    sex:  "Female"
  },
  
  { guid: '7', 
    recordType: CollectionTest.Employee,
    name: "Richard",
    sex:  "Male"
  }
  
]);

//
// main.js stub
//
SC.Store.updateRecords(CollectionTest.FIXTURES) ;

module("Test basic functions of a collection", {
  
  setup: function() {
    employees = CollectionTest.Employee.collection() ;
    
    anne = CollectionTest.Employee.find('1') ;
    bob = CollectionTest.Employee.find('2') ;
    alice = CollectionTest.Employee.find('3') ;
    rachel = CollectionTest.Employee.find('4') ;
    michael = CollectionTest.Employee.find('5') ;
    barbara = CollectionTest.Employee.find('6') ;
    richard = CollectionTest.Employee.find('7') ;
  },
  
  teardown: function() {
    employees = undefined ;
    anne = undefined ;
    bob = undefined ;
    alice = undefined ;
    rachel = undefined ;
    michael = undefined ;
    barbara = undefined ;
    richard = undefined ;
  }
  
});

test("Collection should initially be empty", function() {
  ok(this.employees.get('records') === null) ;
});

test("Collection should have 7 records upon refresh", function() {
  this.employees.refresh() ;
  equals(this.employees.get('records').length, 7) ;
});

test("Collections should NOT contain records that have NOT been added to the store", function() {
  this.employees.refresh() ;
  var originalLength = this.employees.get('records').length ;
  var newEmployee = CollectionTest.Employee.create({name: "Joe"}) ;
  equals(this.employees.get('records').length, originalLength) ;
});

test("Collections should contain records that have been added to the store", function() {
  this.employees.refresh() ;
  var originalLength = this.employees.get('records').length ;
  var newEmployee = CollectionTest.Employee.newRecord({name: "Joe"}) ;
  equals(this.employees.get('records').length, originalLength + 1) ;
  newEmployee.destroy() ;
});

test("Collections should be properly ordered", function() {
  var employeesByName = CollectionTest.Employee.collection({orderBy: ['name']}) ;
  employeesByName.refresh() ;
  var names = employeesByName.get('records').map(function(e) { return e.get('name') });
  same(["Alice", "Anne", "Barbara", "Bob", "Michael", "Rachel", "Richard"].join(""), names.join("")) ;
  
  var employeesBySex = CollectionTest.Employee.collection({orderBy: ['sex']}) ;
  employeesBySex.refresh() ;
  var sexes = employeesBySex.get('records').map(function(e) { return e.get('sex') }) ;
  same(["Female", "Female", "Female", "Female", "Male", "Male", "Male"].join(""), sexes.join("")) ;
});

test("Collections should remain unchanged if a record is changed in a way that does not affect the order", function() {
  var employeesBySex = CollectionTest.Employee.collection({orderBy: ['sex']}) ;
  employeesBySex.refresh() ;
  var employeesOriginal = employeesBySex.get('records').map(function(e) { return e.get('guid') }).join(", ") ;
  
  this.bob.set('name', 'Robert') ;
  var employees = employeesBySex.get('records').map(function(e) { return e.get('guid') }).join(", ") ;
  
  same(employeesOriginal, employees) ;
});
var _ = require('lodash')
var Promise = require('bluebird')

var lib = require('../lib')

// getFarmers takes no argument and returns Array< Promise<Farmer> >
//   Farmers are objects including the field `name` and the field `retired`
//   if the farmer is retired.
var getFarmers = lib.getFarmers

// Pass the farmer name.
// Returns Promise< Array< Promise<Crop> > >
//   Crop has the fields `type` and `units`
var getCropsProducedByFarmer = lib.getCropsProducedByFarmer

// Pass the type of fruit.
// Return Promise<Number>
//   The number is the cost of one unit of the fruit.
var getCostOfSingleFruit = lib.getCostOfSingleFruit

//////////////////////////////////////////////////////////////////////////////////////////
// Implement the functions below this point
//////////////////////////////////////////////////////////////////////////////////////////

// Calculate the number of units of fruits owned by all farmers (whether
// retired or not) using getFarmers and getCropsProducedByFarmer.
exports.countNumberOfFruits = function() {
  // TODO: replace this with your code
  // return Promise.resolve(0)
  var total_fruits = 0;
	return new Promise(function (fulfill, reject) {
	  var farmers = lib.getFarmers();
	  
	  // console.log(farmers);
	  Promise.each(farmers, function(farmer){
    	Promise.all(lib.getCropsProducedByFarmer(farmer.name), function(item) {

		}).then(function(results) {

		    for(var i=0;i<results.length;i++){
		    	// console.log(results[i]);
		    	total_fruits = parseInt(total_fruits) + results[i].units;

		    }
		});

	  }).then(function(){
	  	// console.log('totalFruits');
	  	// console.log(total_fruits)
	  	
	  	return Promise.resolve(total_fruits);
		
	  });
	  	
	});
}

// Calculate the cost of all non-retired farmers' fruits using the functions
// getFarmers, getCropsProducedByFarmer and getCostOfSingleFruit.
// The cost of a Farmer's fruits can be calculated by summing the cost of each
// of their fruits, which is the cost of a single fruit times the number of units
// they have produced.
exports.calculateTotalFarmerFruitCost = function() {
  // TODO: replace this with your code
  // return Promise.resolve(0)
  var total_fruits = 0;
	var total_cost = 0;
	return new Promise(function (fulfill, reject) {
	  var farmers = lib.getFarmers();
	  
	  // console.log(farmers);
	  Promise.each(farmers, function(farmer){
		Promise.all(lib.getCropsProducedByFarmer(farmer.name), function(item) {

		}).then(function(results) {

	    	Promise.resolve(results).then(function(values){
	    		// console.log(values);
	    		Promise.each(values,function(value){
	    			//console.log(value);
	    			Promise.resolve(lib.getCostOfSingleFruit(value.type)).then(function(cost){
					// console.log(results[i]);
					  // console.log(value.type + ' = ' + value.units + ' * ' + cost + ' current total ' + total_cost);
					  total_cost += (value.units * cost)
					  // console.log('new total ' + total_cost);
					});
	    		})
	    	});
		  
		});

	  }).then(function(){
	  	// console.log('totalFruits');
	  	// console.log(total_fruits)
	  	// console.log('total_cost');
	  	// console.log(total_cost);
	  	// Promise.resolve(total_cost);
		return Promise.resolve(total_cost);
	  });
	});
}

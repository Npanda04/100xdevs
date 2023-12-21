/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {

  //solution 1

  
  let final = {}
  transactions.forEach((item) =>{
    let {category, price} = item

    if(final[category]){
      final[category] += price;
    }else{
      final[category] = price;

    }
  });

  const result = Object.entries(final).map(([category, price]) =>({
    category,
    "totalSpent" :price,

}))

  return result


  //solution 2

// const output = {}

// for(let i =0; i<transactions.length; i++){
//   let item = transactions[i]
//   let cat = item.category
//   if(output[cat]){
//     output[cat].totalSpent += item.price
//   }else{
//     output[cat] = {'category':cat,'totalSpent': item.price}
//   }
// }

// const result = Object.values(output)

// return result


}

module.exports = calculateTotalSpentByCategory;


//input = array of objects 
//output = array of objects with on category and price
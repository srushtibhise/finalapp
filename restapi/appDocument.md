//Page 1
> List of City
>>http://localhost:9700/location
> List of Restaurants
>>http://localhost:9700/restaurants
> List of Restaurants with respect to city
>>http://localhost:9700/restaurants?state_id=
> List of MealType
>>http://localhost:9700/mealtype

//Page 2
> List of resturantants on basis of meal
>>http://localhost:9700/restaurants?meal_id=
> Filter of basis of Cusine
>>
> Filter on basis of Cost
>>
> Sort Low to High
>>


//Page 3 
> Detail of resturants
>>http://localhost:9700/details/id
> Menu on basis of resturants
>> no

//Page 4
> Menu details of item selected
>>(POST)localhost:9700/menuItem
>>>(body) >{4,6,8}
> Place order
>>(POST)>localhost:9700/placeOrder

//Page 5
> See all order placed
>>localhost:9700/viewOrder
> Get order on basis of emailID
>>(get)localhost:9700/viewOrder?email=srushti.bhise15@gmail.com

//update order
(put) localhost:9700/updateOrder/id
(body) {
    "status":"Complete",
    "bankName":"BOB"
}
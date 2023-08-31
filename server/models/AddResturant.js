const mongoose = require('mongoose')

const restaurantTimings =new mongoose.Schema({

        MondayopeningTime:String,
        MondayclosingTime:String,
  
        TuesdayopeningTime:String,
        TuesdayclosingTime:String,
  
        WednesdayopeningTime:String,
        WednesdayclosingTime:String,
  
        ThursdayopeningTime:String,
        ThursdayclosingTime:String,
  
        FridayopeningTime:String,
        FridayclosingTime:String,
  
        SaturdayopeningTime:String,
        SaturdayclosingTime:String,
  
        SundayopeningTime:String,
        SundayclosingTime:String,
      
})

const RestaurantDetails = new mongoose.Schema({
   
    branchName: String,
    id:String,
    status:Boolean,
    addResturantOrBranch: String,
    restaurantOwner: String,
    restaurantName: String,
    contactNumber: String,
    emailId: String,
    bannerImage:String,
    address: String,
    latitude: String,
    logitude: String,
    aboutRestaurant: String,
    country: String,
    state: String,
    city: String,
    currency: String,
    foodTypes: String,
    serviceTaxType: String,
    serviceTax: String,
    serviceFeeApplicable: String,
    serviceFeeType: String,
    serviceFee: String,
    allowEventBooking: String,
    eventBookingCapacity: String,
    eventOnlineAvailability: String,
    eventBookingMinimum: String,
    printerAvailable: String,
    printerPageHeight: String,
    printerPageWidth: String,
    sameTimingsAsMonday: String,
    restaurantTimings: [restaurantTimings],
    closedNo: String,
    contractualCommission: String,
    pickUp: String,
    delivery: String,
  

});

const AddRestaurant = mongoose.model('restaurantNew', RestaurantDetails);

module.exports = AddRestaurant;
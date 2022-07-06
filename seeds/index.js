const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
mongoose.connect("mongodb://localhost:27017/yelp-camp", {});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "62ba688afa76549e6d2dc2cf",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit tempore, libero eius ipsum, esse rem vitae aperiam commodi perspiciatis numquam provident dignissimos natus beatae quas itaque ipsa doloribus nisi! Cum.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dndbbff17/image/upload/v1656798731/YelpCamp/gg5ov4og0krhusksbys0.jpg",
          filename: "YelpCamp/gg5ov4og0krhusksbys0",
        },
        {
          url: "https://res.cloudinary.com/dndbbff17/image/upload/v1656798731/YelpCamp/gb5yypx4csjivupchs70.jpg",
          filename: "YelpCamp/gb5yypx4csjivupchs70",
        },
      ],
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});

const mongoose = require('mongoose')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    userUnifiedTopology: true
})

const db = mongoose.connection

db.on("error", console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Database connected')
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '609320cb2cd3301d26b18c5d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'All the lorem ispsum and sit amet sonsectuer addipsicn and al that good stuff. Just give it time it will come. Relax',
            price,
            geometry: {
                type: "Point",
                coordinates:  [ -0.12764739999999997, 51.507321899999994 ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/emmets-first-cloud-on-cloudinary/image/upload/v1621492042/YelpCampCloudinary/qsrjvtqkpsqc05v7lgpf.jpg',
                  filename: 'YelpCampCloudinary/qsrjvtqkpsqc05v7lgpf'
                },
                {
                  url: 'https://res.cloudinary.com/emmets-first-cloud-on-cloudinary/image/upload/v1621492042/YelpCampCloudinary/yvklqnez0i7ai2niq04x.jpg',
                  filename: 'YelpCampCloudinary/yvklqnez0i7ai2niq04x'
                }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const {
  Server
} = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
    credentials: true,
    transports: ['websocket']
  }
})
// const nodemailer = require('nodemailer')
const sequelize = require('./db/db')


const config = require('config')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')

const users = []


const PORT = config.get('port') || 5000

app.use(cors())

app.use(express.json())
app.use(fileUpload({}))
 
io.on('connection', (socket) => {
  console.log('a user connected', socket.id)
  socket.on('send mess', (data) => {
    io.emit('send mess',data)
  })
  socket.on('disconnect', function (data) {
    users.splice(users.indexOf(socket), 1);
    console.log("Отключились");
  });

})   



app.use('/api', require('./routes/start.routes'))

app.use('/api/img', express.static(path.resolve(__dirname, 'static')))
app.use('/api/img_render', express.static(path.resolve(__dirname, 'images')))

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    server.listen(PORT, () => console.log('app start in port ' + PORT))
  } catch (error) {
    console.log('Server Error ', error.message)
    process.exit(1)
  }
}
start()
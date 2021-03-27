import { ConnectOptions } from 'mongoose'

const DB_USER = process.env.DB_USER
const DB_CLUSTER = process.env.DB_CLUSTER
const DB_PASSWORD = process.env.DB_PASSWORD

if (!DB_USER || !DB_PASSWORD || !DB_CLUSTER) { throw new Error("please provide database credentials"); }

const connectionUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.sxa2b.gcp.mongodb.net/nikeStore?retryWrites=true&w=majority`

const DB: { uri: string, options: ConnectOptions } = {
  uri: connectionUrl,
  options: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
}

export { DB }
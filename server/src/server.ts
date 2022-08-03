/* eslint linebreak-style: ["error", "windows"] */
import express from 'express'
import { config } from './config'
import cors from 'cors';
import Users from './routes/users'
import Accounts from './routes/accounts'
import Transactions from './routes/transactions'
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(Users)
app.use(Accounts)
app.use(Transactions)

app.listen(config.PORT, () => console.log(`Server is listening on port: ${config.PORT}`))

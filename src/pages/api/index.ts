import sql from 'mssql'
import getHandler from '@/pages/api/getHandler'

const config = {
  user: 'sa',
  password: 'Soporte23',
  server: 'ALOHABOH\\SQLEXPRESS',
  database: 'CFCStandaloneDB',
  options: {
    trustServerCertificate: true,
  },
}

const handler = getHandler()

handler.get(async (req, res) => {
  //
  res.json('d')
})

handler.post(async (req, res) => {
  try {
    const { body } = req
    const { ID, PRICE } = body
    sql.connect(config, function (err) {
      if (err) console.log(err)
      let query = `UPDATE Item
      SET DefaultPrice = '${PRICE}'
      WHERE Number = '${ID}'`

      sql.query(query, (error, results, fields) => {
        if (error) {
          res.json(error)
        }
        res.json('ok')
      })
    })
  } catch (e) {
    console.log(e)
    res.json(e)
  }
})

export default handler

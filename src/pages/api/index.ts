import sql from 'mssql'
import getHandler from '@/pages/api/getHandler'
import items from './items'

const config = {
  user: 'sa',
  password: 'Soporte23',
  server: 'ALOHABOH-PRUEBA\SQLEXPRESS',
  database: 'CFCStandaloneDB',
  options: {
    trustServerCertificate: true,
  },
}

const handler = getHandler()

handler.get(async (req, res) => {
  sql.connect(config, function (err) {
    if (err) res.json(err)
    items.forEach((item) => {
      let query = `UPDATE [CFCStandaloneDB].[dbo].[Item]
      SET LongName = '${item.LongName}', ShortName = '${item.ShortName}', ChitName = '${item.ShortName}', DefaultPrice = '${item.DefaultPrice}'
      WHERE Number = '${item.Number}';`
      sql.query(query, (error, results) => {
        if (error) {
          res.json(error)
        }
      })
    })
  })
  res.json('ok')
})

export default handler

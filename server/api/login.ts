// import { defineEventHandler, readBody } from 'h3';
import  sqlite3 from "sqlite3";



export default defineEventHandler(async (event) => {

  const db = new sqlite3.Database('./server/database/db.sqlite');
  const data = [
    {
      email: 'admin@admin.com',
      password: '1234'
    },
    {
        email: 'test@admin.com',
        password: '1234'
    }
  ];

  const body = await readBody(event)

  console.log("request body", body)

  let isAuthenticated = false

  const email = body.email
  const password = body.password
  db.all('SELECT * FROM users where Email = ? and Password = ?', [email, password], (err, rows) => {
      if (err) {
          console.error('Error retrieving data:', err.message);
      } else {
          if(rows.length > 0){
            isAuthenticated = true
          }
      }
    });

  data.forEach((item) => {
    if(item.email == body.email && item.password == body.password){
      isAuthenticated = true
    }
  })

  if(isAuthenticated){
    console.log('success')
    return { message: "success" }
  }
  else{
    
    console.log('failed')
    throw createError({
      statusCode: 400,
      statusMessage: 'login failed'
    })
  }

})
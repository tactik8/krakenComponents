
import { GlobalElementDb } from '../GlobalElementDb.js'


  // Test get set element
  let db1 = new GlobalElementDb()

  let e1 = document.createElement('div')
  e1.id = 'bob'

  db1.setElement(e1)
  let e12 = db1.getElement('bob')
  let test1 = e1 === e12
  console.log(test1)


  // Test get set object associate to element
  let db2 = new GlobalElementDb()

  let e2 = document.createElement('div')
  e2.id = 'bob'

  db2.set(e2, 'catTest2', 'object')
  let e22 = db2.getObject(e2, 'catTest2')
  let test2 = e22 == 'object'
  console.log(test2, e22)


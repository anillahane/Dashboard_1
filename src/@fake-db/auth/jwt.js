// ** JWT import
import jwt from 'jsonwebtoken'

// ** Mock Adapter
import mock from 'src/@fake-db/mock'

// ** Default AuthConfig
import defaultAuthConfig from 'src/configs/auth'

const users = [
  {
    id: 1,
    role: 'admin',
    password: 'admin',
    fullName: 'SR Joy',
    username: 'srJoy',
    email: 'srJoy@example.com',
    avatar: 'avatar1.png', // Added property
    phoneNumber: '+1234567890' // Added property,
  },
  {
    id: 2,
    role: 'client',
    password: 'client',
    fullName: 'Jane Smith',
    username: 'janesmith',
    email: 'janesmith@example.com',
    avatar: 'avatar2.png', // Added property
    phoneNumber: '+0987654321' // Added property
  },
  {
    id: 3,
    role: 'salesManager',
    password: 'salesmanager',
    fullName: 'Alice Johnson',
    username: 'alicejohnson',
    email: 'alicejohnson@example.com',
    avatar: 'avatar3.png',
    phoneNumber: '+1122334455'
  },
  {
    id: 4,
    role: 'operationsTeam',
    password: 'operations',
    fullName: 'Bob Brown',
    username: 'bobbrown',
    email: 'bobbrown@example.com',
    avatar: 'avatar4.png',
    phoneNumber: '+2233445566'
  },
  {
    id: 5,
    role: 'invoicingTeam',
    password: 'invoicing',
    fullName: 'Cathy White',
    username: 'cathywhite',
    email: 'cathywhite@example.com',
    avatar: 'avatar5.png',
    phoneNumber: '+3344556677'
  },
  {
    id: 6,
    role: 'admin',
    password: 'admin2',
    fullName: 'David Black',
    username: 'davidblack',
    email: 'davidblack@example.com',
    avatar: 'avatar6.png',
    phoneNumber: '+4455667788'
  }
]

// ! These two secrets should be in .env file and not in any other file
const jwtConfig = {
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  expirationTime: process.env.NEXT_PUBLIC_JWT_EXPIRATION,
  refreshTokenSecret: process.env.NEXT_PUBLIC_JWT_REFRESH_TOKEN_SECRET
}
mock.onPost('/jwt/login').reply(request => {
  const { email, password } = JSON.parse(request.data)

  let error = {
    email: ['Something went wrong']
  }
  const user = users.find(u => u.email === email && u.password === password)
  if (user) {
    const accessToken = jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expirationTime })

    const response = {
      accessToken,
      userData: { ...user, password: undefined }
    }

    return [200, response]
  } else {
    error = {
      email: ['email or Password is Invalid']
    }

    return [400, { error }]
  }
})
mock.onPost('/jwt/register').reply(request => {
  if (request.data.length > 0) {
    const { email, password, username } = JSON.parse(request.data)
    const isEmailAlreadyInUse = users.find(user => user.email === email)
    const isUsernameAlreadyInUse = users.find(user => user.username === username)

    const error = {
      email: isEmailAlreadyInUse ? 'This email is already in use.' : null,
      username: isUsernameAlreadyInUse ? 'This username is already in use.' : null
    }
    if (!error.username && !error.email) {
      const { length } = users
      let lastIndex = 0
      if (length) {
        lastIndex = users[length - 1].id
      }

      const userData = {
        id: lastIndex + 1,
        email,
        password,
        username,
        avatar: null,
        fullName: '',
        role: 'admin'
      }
      users.push(userData)
      const accessToken = jwt.sign({ id: userData.id }, jwtConfig.secret)
      const user = { ...userData }
      delete user.password
      const response = { accessToken }

      return [200, response]
    }

    return [200, { error }]
  } else {
    return [401, { error: 'Invalid Data' }]
  }
})
mock.onGet('/auth/me').reply(config => {
  // ** Get token from header
  // @ts-ignore
  const token = config.headers.Authorization

  // ** Default response
  let response = [200, {}]

  // ** Checks if the token is valid or expired
  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    // ** If token is expired
    if (err) {
      // ** If onTokenExpiration === 'logout' then send 401 error
      if (defaultAuthConfig.onTokenExpiration === 'logout') {
        // ** 401 response will logout user from AuthContext file
        response = [401, { error: { error: 'Invalid User' } }]
      } else {
        // ** If onTokenExpiration === 'refreshToken' then generate the new token
        const oldTokenDecoded = jwt.decode(token, { complete: true })

        // ** Get user id from old token
        // @ts-ignore
        const { id: userId } = oldTokenDecoded.payload

        // ** Get user that matches id in token
        const user = users.find(u => u.id === userId)

        // ** Sign a new token
        const accessToken = jwt.sign({ id: userId }, jwtConfig.secret, {
          expiresIn: jwtConfig.expirationTime
        })

        // ** Set new token in localStorage
        window.localStorage.setItem(defaultAuthConfig.storageTokenKeyName, accessToken)
        const obj = { userData: { ...user, password: undefined } }

        // ** return 200 with user data
        response = [200, obj]
      }
    } else {
      // ** If token is valid do nothing
      // @ts-ignore
      const userId = decoded.id

      // ** Get user that matches id in token
      const userData = JSON.parse(JSON.stringify(users.find(u => u.id === userId)))
      delete userData.password

      // ** return 200 with user data
      response = [200, { userData }]
    }
  })

  return response
})

mock.onGet('/users').reply(200, users)

mock.onPost('/users/add').reply(request => {
  const newUser = JSON.parse(request.data)
  users.push({ ...newUser, id: users.length ? users[users.length - 1].id + 1 : 1 })
  return [200, { ...newUser, id: users.length ? users[users.length - 1].id + 1 : 1 }]
})

mock.onPut('/users/update').reply(request => {
  const updatedUser = JSON.parse(request.data)
  const index = users.findIndex(u => u.id === updatedUser.id)
  if (index !== -1) {
    users[index] = updatedUser
    return [200, updatedUser]
  }
  return [404, { error: 'User not found' }]
})

mock.onDelete('/users/delete').reply(request => {
  const { id } = JSON.parse(request.data)
  const index = users.findIndex(u => u.id === id)
  if (index !== -1) {
    users.splice(index, 1)
    return [200, { message: 'User deleted successfully' }]
  }
  return [404, { error: 'User not found' }]
})

mock.onGet('/roles').reply(() => {
  return [
    200,
    [
      { value: 'admin', label: 'Admin' },
      { value: 'client', label: 'Client' },
      { value: 'salesManager', label: 'Sales Manager' },
      { value: 'operationsTeam', label: 'Operations Team' },
      { value: 'invoicingTeam', label: 'Invoicing Team' }
    ]
  ]
})

mock.onGet('/auth/me').reply(config => {
  const token = config.headers.Authorization
  const decoded = jwt.decode(token.replace('Bearer ', ''))
  const user = users.find(u => u.id === decoded.id)
  if (user) {
    return [200, { userData: { ...user, password: undefined } }]
  }
  return [401, { error: 'Invalid User' }]
})

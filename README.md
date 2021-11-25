# genieus-server
Codeworks seniors London - thesis project Nov 2021

## API Endpoints summary

IDX | Method | Endpoint | Status|
| :--- | :---:   |   :---  | :---:| 
| [Add Student](#addStudent) | POST | /student | 201 |
| [Get Student](#getStudent) | GET | /student/:id | 200 |
| [Update Student](#updateStudent) | PUT | /student/:id | 202 |
| [Extend Subscription](#extendSubscription) | PUT | /student/:id | 202 |
| [Delete Student](#deleteStudent) | DELETE | /student/:id | 204 |
| [Favourite Tutor](#favouriteTutor) | PUT | /student/:id/favourite | 202 |
| [Block Tutor](#blockTutor) | PUT | /student/:id/block | 202 |

---
## <a id="addStudent">Add Student</a>
### Method
POST
### Endpoint
/student
### Request Body
```
{
  email : string
  name : string
  id : string
  subscription_type: ('basic', 'pro', 'max')
  lastpayment_date: date
  photo_url: string
}
```

### Response
Status 201
```
{
  email : string
  name : string
  id : string
  subscription_type: ('basic', 'pro', 'max')
  lastpayment_date: date
  photo_url: string
  joined_date: date
  subscription_expiry: date
  favourite_tutors: []
  blocked_tutors: []
  bio: ''
}
```
---

## <a id="getStudent">Get Student</a>
### Method
GET
### Endpoint
/student/:id


### Response
Status 200
```
{
  email : string
  name : string
  id : string
  subscription_type: ('basic', 'pro', 'max')
  lastpayment_date: date
  joined_date: date
  photo_url: string
  subscription_expiry: date
  favourite_tutors: []
  blocked_tutors: []
  bio: ''
}
```
---
## <a id="updateStudent">Update Student</a>
### Method
PUT
### Endpoint
/student/:id
### Request Body
```
{
  name : string
  bio: string
  photo_url: string
  
}
```
### Response
Status 202
```
{
  email : string
  name : string
  id : string
  subscription_type: ('basic', 'pro', 'max')
  lastpayment_date: date
  joined_date: date
  photo_url: string
  subscription_expiry: date
  favourite_tutors: []
  blocked_tutors: []
  bio: ''
}
```
---
## <a id="extendSubscription">Extend Subscription</a>
### Method
PUT
### Endpoint
/student/:id/subscribe
### Request body
```
TBD - need to understand
```

### Response
Status 202
```
{
  email : string
  name : string
  id : string
  subscription_type: ('basic', 'pro', 'max')
  lastpayment_date: date
  joined_date: date
  photo_url: string
  subscription_expiry: date
  favourite_tutors: []
  blocked_tutors: []
  bio: ''
}
```
---
## <a id="deleteStudent">Delete Student</a>
### Method
DELETE
### Endpoint
/student/:id

### Response
Status 204

---
## <a id="favouriteTutor">Favourite Tutor</a>
### Method
PUT
### Endpoint
/student/:id/favourite
### Request body
```
{
  tutor_id: string
}
```

### Response
Status 202
```
{
  email : string
  name : string
  id : string
  subscription_type: ('basic', 'pro', 'max')
  lastpayment_date: date
  joined_date: date
  photo_url: string
  subscription_expiry: date
  favourite_tutors: []
  blocked_tutors: []
  bio: ''
}
```
---
## <a id="blockTutor">Block Tutor</a>
### Method
PUT
### Endpoint
/student/:id/block
### Request body
```
{
  tutor_id: string
}
```

### Response
Status 202
```
{
  email : string
  name : string
  id : string
  subscription_type: ('basic', 'pro', 'max')
  lastpayment_date: date
  joined_date: date
  photo_url: string
  subscription_expiry: date
  favourite_tutors: []
  blocked_tutors: []
  bio: ''
}
```
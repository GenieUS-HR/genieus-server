# genieus-server
Codeworks seniors London - thesis project Nov 2021

## API Endpoints summary

IDX | Method | Endpoint | Request-body | Response | Status|
| :--- | :---:   |   :---  |  :---:  |     :---: | ---:| 
| Add Student | POST | /student |  |  | 201 |
| Get Student | GET | /student/:id | |  | 200 |
| Update Student | PUT | /student/:id | | | 202 |
| Extend Subscription | PUT | /student/:id | | | 202 |
| Delete Student | DELETE | /student/:id | | | 204 |
| Favourite Tutor | PUT | /student/:id/favourite | | | 202 |
| Block Tutor | PUT | /student/:id/block | | | 202 |

---
## Add Student
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

## Get Student
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
## Update Student
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
## Extend Subscription
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
## Delete Student
### Method
DELETE
### Endpoint
/student/:id

### Response
Status 204

---
## Favourite Tutor
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
## Block Tutor
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
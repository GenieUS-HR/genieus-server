# genieus-server

Codeworks seniors London - thesis project Nov 2021

## API Endpoints summary

| API                                                  | Method | Endpoint                     | Status |
| :--------------------------------------------------- | :----- | :--------------------------- | -----: |
| 📝 Students                                          |
| [Add Student](#addStudent)                           | POST   | /student                     |    201 |
| [Get Student](#getStudent)                           | GET    | /student/:id                 |    200 |
| [Update Student](#updateStudent)                     | PATCH  | /student/:id                 |    202 |
| [Extend Subscription](#extendSubscription)           | PUT    | /student/:id/subscribe       |    202 |
| [Delete Student](#deleteStudent)                     | DELETE | /student/:id                 |    204 |
| [Favourite Tutor](#favouriteTutor)                   | PUT    | /student/:id/favourite       |    202 |
| [Get Favourite Tutors](#getFavouriteTutors)          | GET    | /student/:id/favourite       |    200 |
| [Block Tutor](#blockTutor)                           | PUT    | /student/:id/block           |    202 |
| 🧑‍🏫 Tutors                                         |
| [Add Tutor](#addTutor)                               | POST   | /tutor                       |    201 |
| [Get Tutor](#getTutor)                               | GET    | /tutor/:id                   |    200 |
| [Update Tutor](#updateTutor)                         | PATCH  | /tutor/:id                   |    202 |
| [Delete Tutor](#deleteTutor)                         | DELETE | /tutor/:id                   |    204 |
| 🙋‍♀️ Help Requests                                     |
| [Add Help Request](#addHelpRequest)                  | POST   | /helprequest                 |    201 |
| [Update Help Request](#updateHelpRequest)            | PATCH  | /helprequest/:id             |    202 |
| [Delete Help Request](#closeHelpRequest)             | DELETE | /helprequest/:id             |    204 |
| [Get Help Request](#getHelpRequest)                  | GET    | /helprequest/:id             |    200 |
| [Get Help Requests](#getHelpRequests)                | GET    | /helprequest?parameter=value |    200 |
| [Get Pending Help Requests](#getPendingHelpRequests) | GET    | /helprequest/:tutor_id       |    200 |

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
  photo_url: string
  spoken_language: string[]
  location?: string
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
  spoken_language: string[]
  location: string
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
  spoken_language: string[]
  location: string
  subscription_expiry: date
  favourite_tutors: []
  blocked_tutors: []
  bio: ''
}
```

---

## <a id="updateStudent">Update Student</a>

### Method

PATCH

### Endpoint

/student/:id

### Request Body

```
{
  name?: string
  bio?: string
  photo_url?: string
  spoken_language?: string[]
  location?: string

}
```

> ### 📝 Note
>
> You only need to send the fields that you want to update

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
  spoken_language: string[]
  location: string
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
  spoken_language: string[]
  location: string
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
  spoken_language: string[]
  location: string
  subscription_expiry: date
  favourite_tutors: []
  blocked_tutors: []
  bio: ''
}
```

---

## <a id="getFavouriteTutors">Get Favourite Tutors</a>

### Method

GET

### Endpoint

/student/:id/favourite

### Response

Status 200

```
tutor[]
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
  spoken_language: string[]
  location: string
  subscription_expiry: date
  favourite_tutors: []
  blocked_tutors: []
  bio: ''
}
```

---

## <a id="addTutor">Add Tutor</a>

### Method

POST

### Endpoint

/tutor

### Request Body

```
{
  email : string
  name : string
  id : string
  photo_url: string
  spoken_language: string[]
  location?: string
}
```

### Response

Status 201

```
{
  email : string
  name : string
  id : string
  photo_url: string
  spoken_language: string[]
  location: string
  joined_date: date
  bio: ''
  avg_rating: null
  completed_help_requests: 0
  tags: []
  programming_languages: []
}
```

---

## <a id="getTutor">Get Tutor</a>

### Method

GET

### Endpoint

/tutor/:id

### Response

Status 200

```
{
  email : string
  name : string
  id : string
  photo_url: string
  spoken_language: string[]
  location: string
  joined_date: date
  bio: string
  avg_rating: integer
  completed_help_requests: integer
  tags: json
  programming_languages: json
}
```

---

## <a id="updateTutor">Update Tutor</a>

### Method

PATCH

### Endpoint

/tutor/:id

### Request Body

```
{
  name?: string
  bio?: string
  photo_url?: string
  tags?: string
  programming_languages?: string
  spoken_language?: string[]
  location?: string
}
```

> ### 📝 Note
>
> Send only the fields that you want to update and send the entire content for the field you are updating  
> E.g. if you are adding a language send an array with all languages (not just the new language)

### Response

Status 202

```
{
  email : string
  name : string
  id : string
  photo_url: string
  spoken_language: string[]
  location: string
  joined_date: date
  bio: string
  avg_rating: integer
  completed_help_requests: integer
  tags: json
  programming_languages: json
}
```

---

## <a id="deleteTutor">Delete Tutor</a>

### Method

DELETE

### Endpoint

/tutor/:id

### Response

Status 204

---

## <a id="addHelpRequest">Add Help Request</a>

### Method

POST

### Endpoint

/helprequest

### Request Body

```
{
  student_id: string
  tutor_id: string | null
  status: string
  description: text
  time_opened: date
  time_accepted: date | null
  time_closed: date | null
  rating: integer | null
  feedback_comments: text | null
  tags: json
  language: string
  code: text
  zoom_url: string
  favourites_only: boolean
}
```

### Response

Status 201

```
{
  id: string
  student_id: string
  tutor_id: string | null
  status: string
  description: text
  time_opened: date
  time_accepted: date | null
  time_closed: date | null
  rating: integer | null
  feedback_comments: text | null
  tags: json
  language: string
  code: text
  zoom_url: string
  call_length: integer
  favourites_only: boolean
}
```

---

## <a id="updateHelpRequest">Update Help Request</a>

> ### 📝 Note
>
> You can use this to modify the help request after it was created and also to set the status  
> If you send a status in the request body we will update the respective dates  
> i.e. if you send status: 'assigned', we will update the assigned date
> if you send either of the closed statuses we will update the closed date  
> If request includes rating, we will update tutor average rating

### Method

PATCH

### Endpoint

/helprequest/:id

### Request Body

```
{
  tutor_id?: string | null
  status?: ('pending' | 'assigned' | 'closed-complete' | 'closed-incomplete')
  description?: text
  rating?: integer | null
  feedback_comments?: text | null
  tags?: json
  language?: string
  code?: text
  zoom_url?: string
  favourites_only?: boolean
}
```

### 🤔 Example Request Bodies

Assign the help request to a tutor:

```
{
  status: 'assigned',
  tutor_id: 'abcd123',
}
```

Submit feedback on a help request:

```
{
  rating: (0-5),
  feedback_comments?: string
}
```

### Response

Status 201

```
{
  id: string
  student_id: string
  tutor_id: string | null
  status: string
  description: text
  time_opened: date
  time_accepted: date | null
  time_closed: date | null
  rating: integer | null
  feedback_comments: text | null
  tags: json
  language: string
  code: text
  zoom_url: string
  call_length: integer
  favourites_only: boolean
}
```

---

## <a id="deleteHelpRequest">Delete Help Request</a>

### Method

DELETE

### Endpoint

/helprequest/:id

### Response

Status 204

---

## <a id="getHelpRequest">Get Help Request</a>

### Method

GET

### Endpoint

/helprequest/:id

### Response

Status 200

```
{
  id: string
  student_id: string
  tutor_id: string | null
  status: string
  description: text
  time_opened: date
  time_accepted: date | null
  time_closed: date | null
  rating: integer | null
  feedback_comments: text | null
  tags: json
  language: string
  code: text
  zoom_url: string
  call_length: integer
  favourites_only: boolean
}
```

---

## <a id="getHelpRequests">Get Help Requests</a>

### Method

GET

### Endpoint

/helprequest?parameter=value

### Query Parameters

- student_id: string
- tutor_id: string
- status: ('pending' | 'assigned' | 'closed-complete' | 'closed-incomplete')
- language: string (see list of language names)
- limit_responses: integer (will limit number requests returned)

### Response

Status 200

- response will be sorted with newest requests first

```
[
  {
    id: string
    student_id: string
    tutor_id: string | null
    status: string
    description: text
    time_opened: date
    time_accepted: date | null
    time_closed: date | null
    rating: integer | null
    feedback_comments: text | null
    tags: json
    language: string
    code: text
    zoom_url: string
    call_length: integer
    favourites_only: boolean
  }
]
```

---

## <a id="getPendingHelpRequests">Get Pending Help Requests</a>

### Method

GET

### Endpoint

/helprequest/:tutor_id

### Response

Status 200

- response will only include pending requests
- response will be sorted with _oldest_ requests first
- list will be filtered to show only requests that match the tutor's selected programming langages
- list will be filtered to exclude any requests from users that have blocked the tutor
- if help request if favourites only then reponse should only be included if favourite tutors

```
[
  {
    id: string
    student_id: string
    tutor_id: string | null
    status: string
    description: text
    time_opened: date
    time_accepted: date | null
    time_closed: date | null
    rating: integer | null
    feedback_comments: text | null
    tags: json
    language: string
    code: text
    zoom_url: string
    call_length: integer
    favourites_only: boolean
  }
]
```

---

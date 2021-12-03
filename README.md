# genieus-server

Codeworks seniors London - thesis project Nov 2021

## API Endpoi

| API                                                  | Method | Endpoint                           | Status |
| :--------------------------------------------------- | :----- | :--------------------------------- | -----: |
| 📝 Students                                          |
| [Add Student](#addStudent)                           | POST   | /student                           |    201 |
| [Get Student](#getStudent)                           | GET    | /student/:id                       |    200 |
| [Update Student](#updateStudent)                     | PATCH  | /student/:id                       |    202 |
| ~~[Extend Subscription](#extendSubscription)~~       | PUT    | /student/:id/subscribe             |    202 |
| [Delete Student](#deleteStudent)                     | DELETE | /student/:id                       |    204 |
| [Push Favourite Tutor](#pushFavouriteTutor)          | PUT    | /student/:id/favourite/push        |    202 |
| [Remove Favourite Tutor](#removeFavouriteTutor)      | PUT    | /student/:id/favourite/remove      |    202 |
| [Replace Favourite Tutors](#replaceFavouriteTutors)  | PUT    | /student/:id/favourite/replace     |    202 |
| [Get Favourite Tutors](#getFavouriteTutors)          | GET    | /student/:id/favourite             |    200 |
| [Push Blocked Tutor](#pushBlockTutor)                | PUT    | /student/:id/block/push            |    202 |
| [Remove Blocked Tutor](#removeBlockTutor)            | PUT    | /student/:id/block/remove          |    202 |
| [Replace Blocked Tutors](#replaceBlockTutor)         | PUT    | /student/:id/block/replace         |    202 |
| [Get Blocked Tutors](#getBlockedTutors)              | GET    | /student/:id/block                 |    202 |
| 🧑‍🏫 Tutors                                         |
| [Add Tutor](#addTutor)                               | POST   | /tutor                             |    201 |
| [Get Tutor](#getTutor)                               | GET    | /tutor/:id                         |    200 |
| [Update Tutor](#updateTutor)                         | PATCH  | /tutor/:id                         |    202 |
| [Delete Tutor](#deleteTutor)                         | DELETE | /tutor/:id                         |    204 |
| 🙋‍♀️ Help Requests                                     |
| [Add Help Request](#addHelpRequest)                  | POST   | /helprequest                       |    201 |
| [Update Help Request](#updateHelpRequest)            | PATCH  | /helprequest/:id                   |    202 |
| [Push Interested Tutor](#pushInterestedTutor)        | PUT    | /helprequest/:id/interested/push   |    202 |
| [Remove Interested Tutor](#removeInterestedTutor)    | PUT    | /helprequest/:id/interested/remove |    202 |
| [Delete Help Request](#closeHelpRequest)             | DELETE | /helprequest/:id                   |    204 |
| [Get Help Request](#getHelpRequest)                  | GET    | /helprequest/:id                   |    200 |
| [Get Help Requests](#getHelpRequests)                | GET    | /helprequest?parameter=value       |    200 |
| [Get Pending Help Requests](#getPendingHelpRequests) | GET    | /helprequest/pending/:tutor_id     |    200 |
| 💰 Subscriptions                                     |
| [Get Subscriptions](#getSubscriptions)               | GET    | /subscription                      |    200 |

### Help Request Workflow

- ✓ student creates help requests : <a href="#addHelpRequest">POST /helprequest</a>
  - ✓ `helpRequest.status` set to <b>pending</b>
  - ✓ `helpRequest.time_opened` updated
- ✓ tutors can decline or mark interest in solving help request : <a href="#pushInterestedTutor">PUT /helprequest/:id/interested/push</a>
  - ✓ tutors are either added to `helpRequest.interested_tutors` or `helpRequest.blocked_tutors`
- ✓ student can decline tutors : <a href="#removeInterestedTutor">PUT /helprequest/:id/interested/remove</a>
  - ✓ declined tutors are removed from `helpRequest.interested_tutors`
  - ✓ declined tutors are added to `helpRequest.blocked_tutors`
- ✓ student can accept tutor <a href="#updateHelpRequest">PATCH /helprequest/:id</a>
  - ✓ accepted tutors are assigned to `helpRequest.tutor_id` (+name/photo added in `helpRequest.tutor`)
  - ✓ `helpRequest.status` set to <b>assigned</b>
  - ✓ `helpRequest.time_accepted` is updated
- ✓ student or tutor can abandon chat in first 60 seconds <a href="#updateHelpRequest">PATCH /helprequest/:id</a>
  - ✓ `helpRequest.status` moved back to <b>pending</b> from <b>assigned</b>
  - ✓ reset `helpRequest.time_accepted`, `helpRequest.tutor_id` and `helpRequest.tutor` to null
  - ✓ no change to student.time_remaining
  - ✓ no change to tutor.time_completed or tutor.completed_help_requests
- ✓ student can mark chat as closed-complete <a href="#updateHelpRequest">PATCH /helprequest/:id</a>
  - ✓ `helpRequest.status` is set to <b>closed-complete</b>
  - ✓ `helpRequest.time_closed` and `helpRequest.call_length` are updated
  - ✓ `student.time_remaining` is decremented by call_length
  - ✓ `tutor.time_completed` is incremented by call_length
- ✓ student can mark chat as closed-incomplete <a href="#updateHelpRequest">PATCH /helprequest/:id</a>
  - ✓ `helpRequest.status` is set to <b>closed-incomplete</b>
  - ✓ `helpRequest.time_closed` and helpRequest.call_length are updated
  - ✓ `student.time_remaining` is decremented by call_length
  - ✓ `tutor.time_completed` is incremented by call_length
  - ✓ another help request with same information is created and set as `pending`
- ✓ student must rate tutor after help request <a href="#updateHelpRequest">PATCH /helprequest/:id</a>
  - ✓ `helpRequest.rating` and `helpRequest.feedback_comments` are updated based on request body
  - ✓ `tutor.completed_help_requests` is incremented by 1
  - ✓ `tutor.avg_rating` is recalculated

---

> ### 📝 Note
>
> When calling update endpoints only send the fields that you want to update  
> If the field is an array send the entire content for the array except for Favourite/Block tutor  
> For favourite and block tutor there are separate endpoints to push/remove from array

---

## <a id="addStudent">Add Student</a>

### Method

POST

### Endpoint

/student

### Request Body

```
{
  email: string
  name: string
  id: string
  subscription_type: ('basic', 'pro', 'max')
  photo_url?: string
  spoken_language?: string[]
  location?: string
}
```

### Response

Status 201

[Student](#studentType)

---

## <a id="getStudent">Get Student</a>

### Method

GET

### Endpoint

/student/:id

### Response

Status 200

[Student](#studentType)[]

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

[Student](#studentType)

---

## ~~<a id="extendSubscription">Extend Subscription</a>~~

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

TBD

---

## <a id="deleteStudent">Delete Student</a>

### Method

DELETE

### Endpoint

/student/:id

### Response

Status 204

---

## <a id="pushFavouriteTutor">Push Favourite Tutor</a>

### Method

PUT

### Endpoint

/student/:id/favourite/push

### Request body

```
{
  tutor_id: string
}
```

### Response

Status 202

[Student](#studentType)

---

## <a id="removeFavouriteTutor">Remove Favourite Tutor</a>

### Method

PUT

### Endpoint

/student/:id/favourite/remove

### Request body

```
{
  tutor_id: string
}
```

### Response

Status 202

[Student](#studentType)

---

## <a id="replaceFavouriteTutors">Replace Favourite Tutors</a>

### Method

PUT

### Endpoint

/student/:id/favourite/replace

### Request body

```
{
  tutor_id: string[]
}
```

### Response

Status 202

[Student](#studentType)

---

## <a id="getFavouriteTutors">Get Favourite Tutors</a>

### Method

GET

### Endpoint

/student/:id/favourite

### Response

Status 200

[Tutor](#tutorType)[]

---

## <a id="pushBlockTutor">Push Blocked Tutor</a>

### Method

PUT

### Endpoint

/student/:id/block/push

### Request body

```
{
  tutor_id: string
}
```

### Response

Status 202

[Student](#studentType)

---

## <a id="removeBlockTutor">Remove Blocked Tutor</a>

### Method

PUT

### Endpoint

/student/:id/block/remove

### Request body

```
{
  tutor_id: string
}
```

### Response

Status 202

[Student](#studentType)

---

## <a id="replaceBlockTutor">Replace Blocked Tutors</a>

### Method

PUT

### Endpoint

/student/:id/block/replace

### Request body

```
{
  tutor_id: string[]
}
```

### Response

Status 202

[Student](#studentType)

---

## <a id="getBlockedTutors">Get Blocked Tutors</a>

### Method

GET

### Endpoint

/student/:id/block

### Response

Status 202

[Tutor](#tutorType)[]

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
  photo_url?: string
  spoken_language?: string[]
  location?: string
}
```

### Response

Status 201

[Tutor](#tutorType)

---

## <a id="getTutor">Get Tutor</a>

### Method

GET

### Endpoint

/tutor/:id

### Response

Status 200

[Tutor](#tutorType)

---

## <a id="getAllTutors">Get All Tutors</a>

### Method

GET

### Endpoint

/tutor

### Response

Status 200

[Tutor](#tutorType)[]

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
  tags?: string[]
  programming_languages?: string
  spoken_language?: string[]
  location?: string
}
```

### Response

Status 202

[Tutor](#tutorType)

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
  description: text
  tags?: string[]
  language: string
  code: text
  favourites_only: boolean
}
```

### Response

Status 201

[HelpRequest](#helpRequestType)

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
  tags?: string[]
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

[HelpRequest](#helpRequestType)

---

## <a id="pushInterestedTutor">Push Interested Tutor</a>

### Method

PUT

### Endpoint

/helprequest/:id/interested/push

### Request body

```
{
  tutor_id: string
}
```

### Response

Status 202

[HelpRequest](#helpRequestType)

---

## <a id="removeInterestedTutor">Remove Interested Tutor</a>

### Method

PUT

### Endpoint

/helprequest/:id/interested/remove

### Request body

```
{
  tutor_id: string
}
```

### Response

Status 202

[HelpRequest](#helpRequestType)

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

[HelpRequest](#helpRequestType)

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

[HelpRequest[]](#helpRequestType)

---

## <a id="getPendingHelpRequests">Get Pending Help Requests</a>

### Method

GET

### Endpoint

/helprequest/pending/:tutor_id

### Response

Status 200

- response will only include pending requests
- response will be sorted with _oldest_ requests first
- list will be filtered to show only requests that match the tutor's selected programming langages
- list will be filtered to exclude any requests from users that have blocked the tutor
- if help request if favourites only then reponse should only be included if favourite tutors

[HelpRequest[]](#helpRequestType)

---

## <a id="getSubscriptions">Get Subscriptions</a>

### Method

GET

### Endpoint

/subscription

### Response

Status 200

```
{
  id: string
  subscription_name: string
  description: string
  minutes: integer
  active: boolean
}
```

---

## Types

### <a id="studentType">Student</a>

```
{
  email: string;
  name: string;
  id: string;
  joined_date: Date;
  photo_url?: string;
  location?: string;
  bio: string;
  spoken_language?: string[];
  subscription_type: string;
  lastpayment_date: Date;
  subscription_expiry: Date;
  favourite_tutors: string[];
  blocked_tutors: string[];
  time_remaining: number;
}
```

### <a id="tutorType">Tutor</a>

```
{
  email: string;
  name: string;
  id: string;
  joined_date: Date;
  photo_url?: string;
  location?: string;
  bio: string;
  spoken_language?: string[];
  avg_rating: number;
  completed_help_requests: number;
  tags: string[];
  programming_languages: string[];
  time_completed: number;
}
```

### <a id="helpRequestType">Help Request</a>

```
{
  id: string
  student_id: string
  tutor_id?: string
  status: string
  description: text
  time_opened: date
  time_accepted?: date
  time_closed?: date
  rating?: integer
  feedback_comments?: text
  tags: string[]
  language: string
  code: text
  zoom_url: string
  call_length: integer
  favourites_only: boolean
  tutor?: {
    id: string
    name: string
    photo_url?: string
  }
  student: {
    id: string
    name: string
    photo_url?: string
  }
}
```

---

## Change Log

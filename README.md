# Job Portal Server (JPS)

This is a job portal server that allows users to post jobs and apply for jobs. It is built using Node.js, Express, and MongoDB.

## Quick Access

- [For Authentication](#for-authentication)
- [For Candidate](#for-candidate-endpoints)
- [For Hiring Manager](#for-hiring-manager-endpoints)
- [For Admin](#for-admin-endpoints)

## Deployment URL

To run the live link

```bash
  https://job-potals-server.onrender.com
```

Main Endpoints With Slug

```bash
  https://job-potals-server.onrender.com/api/
```

## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform

## API Reference

## For Authentication

#### Sign Up/Create new User

```http
  POST /api/user/signup
```

| Fields | Type     | Description                                                         |
| :----- | :------- | :------------------------------------------------------------------ |
| `role` | `string` | must role will be `candidate, admin, hr` and example `"role": "hr"` |

```json
    Content for Sign Up
     {
        "name": "Mynul Hero",
        "email": "mynul@gmail.com",
        "password": "mynul123",
        "role": "candidate"
    }
```

#### Login User to get token

```http
  POST /api/user/login
```

| Required Fields   | Type     | Description      |
| :---------------- | :------- | :--------------- |
| `email, password` | `string` | to logged in for |

```json
    Content for Sign Up
     {
        "email": "admin@gmail.com",
        "password": "Admin123#"
    }
```

#### Get User By ID After Logged In

```http
  GET /api/user/me
```

| Required Fields | Type | Description |
| :-------------- | :--- | :---------- |
| `no`            | `no` | `no`        |

## For Candidate Endpoints

#### Get all Jobs (public)

```http
  GET /api/jobs
```

| Query                  | Type     | Description                                                                                                     |
| :--------------------- | :------- | :-------------------------------------------------------------------------------------------------------------- |
| `location`             | `string` | Put your location whatever has and like `ex- ?location=Rangpur`                                                 |
| `jobType`              | `string` | Put your jobType fixed values-`remote,on-site,hybrid` `ex- ?jobType=remote`                                     |
| `workType`             | `string` | Put your workType fixed values-`Full Time, Part Time, Internship, Contract,Volunteer` `ex- ?workType=part time` |
| `salaryTo, salaryFrom` | `number` | Put your salaryTo, salaryFrom put whatever values `ex- ?salaryFrom=100&salaryTo=500`                            |
| `sortBy`               | `string` | Put your sortBy fields like `ex- ?sortBy=salary,-workType,jobType`                                              |

#### Get Job by Id (public)

```http
  GET /api/jobs/:id
```

| Params | Type     | Description                                             |
| :----- | :------- | :------------------------------------------------------ |
| `yes`  | `string` | Put your Job Id `ex- api/jobs/634ee7053e66aa81f2de3338` |

#### Get Top 10 Highest paid Jobs (public)

```http
  GET /api/jobs/top-10-highest-paid
```

| Params | Type | Description                        |
| :----- | :--- | :--------------------------------- |
| `no`   | `no` | `no available` it's come up random |

#### Get Top 10 Most Applied Jobs (public)

```http
  GET /api/jobs/most-applied
```

| Params | Type | Description                        |
| :----- | :--- | :--------------------------------- |
| `no`   | `no` | `no available` it's come up random |

#### Apply Job

```http
  POST /api/jobs/:{job_id}/apply
```

| Required fields       | Optional fields               | Note                                                                                          |
| :-------------------- | :---------------------------- | :-------------------------------------------------------------------------------------------- |
| `resume, coverLetter` | `portfolio, linkedIn, github` | must need to use Required fields for apply to the job and once apply you could't apply again. |

```json
    Content for Apply to the Job.
     {
        "resume": "https://drive.google.com/file/d/1tGxrjK81idE2-t46wxI4ecXm5HmsvzRo/view",
        "portfolio": "https://ashikmahmud.me",
        "linkedIn": "https://linkedin.com/in/ashikmahmud187",
        "github": "https://github.com/ashik-mahmud",
        "coverLetter": "I have extensive experience with HTML, CSS, Bootstrap, Material UI, JavaScript, and React Js. Experience with Node.js, Express.js, MongoDB, Firebase, and UI/UX design. I have less than a year of experience with each of these technologies and I created some cool projects with those Technologies also you get all the projects when you visit my Github and am eager to learn more to broaden my skill set."
     }
```

#### Apply Job With Upload Resume

`Here is the Repo Link With Code` [https://github.com/Ashik-Mahmud/job-portals-server/tree/resume-upload-on-drive](https://github.com/Ashik-Mahmud/job-portals-server/tree/resume-upload-on-drive)

```http
  POST /api/jobs/:{job_id}/apply
```

| Required fields       | Optional fields               | Note                                                                                                                                                                                |
| :-------------------- | :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `resume, coverLetter` | `portfolio, linkedIn, github` | In the **Postman** must upload the resume pdf formate with `key - resume` get your full clearity check this screenshot [https://prnt.sc/ceHRUv1wZrh4](https://prnt.sc/ceHRUv1wZrh4) |

```json
    Content for Apply to the Job.
     {
        "portfolio": "https://ashikmahmud.me",
        "linkedIn": "https://linkedin.com/in/ashikmahmud187",
        "github": "https://github.com/ashik-mahmud",
        "coverLetter": "I have extensive experience with HTML, CSS, Bootstrap, Material UI, JavaScript, and React Js. Experience with Node.js, Express.js, MongoDB, Firebase, and UI/UX design. I have less than a year of experience with each of these technologies and I created some cool projects with those Technologies also you get all the projects when you visit my Github and am eager to learn more to broaden my skill set."
     }
```

**_Note_**: I don't know multer is working perfectly or not after deplying live to the live server. That's why I never put the deploy to the same link which one `BASE_URL`, to check this option [https://job-portal-lz4i.onrender.com/](https://job-portal-lz4i.onrender.com/). **Not Working on the [ https://job-potals-server.onrender.com/api/](https://job-potals-server.onrender.com/api/) Link**

## For Hiring Manager Endpoints

#### Create Job By Hiring Manager (Secured - Authentication Required)

```http
  POST /api/jobs
```

| Required Fields                                                                                            | Optional Fields | Description                                                                            |
| :--------------------------------------------------------------------------------------------------------- | :-------------- | :------------------------------------------------------------------------------------- |
| `title, position, description, location, jobType, workType, salary, employees, company, vacancy, deadLine` | `not available` | **deadLine** will be the days count like deadLine 5 means 5 days time for application. |

### Content for Posting Job

```json
{
  "title": "React Developer Intern",
  "position": "React Developer",
  "description": "This is my Testing Job posting from Team Code Samurai. A Full-Stack developer is a professional responsible for working on both front-end and back-end development processes. They design, develop, and maintain fully-fledged and functioning platforms with databases or servers. These servers do not need other third-party applications to build an entire system from scratch.",
  "location": "Dhaka/Bangladesh",
  "jobType": "remote",
  "workType": "Internship",
  "salary": 500,
  "employees": 20,
  "company": "Amazing Duck",
  "vacancy": 5,
  "deadLine": 6
}
```

#### Get All Jobs by HR (Secured - Authentication Required)

```http
  GET /api/manager/jobs
```

| Query | Type | Description    |
| :---- | :--- | :------------- |
| `no`  | `no` | `no available` |

#### Get Jobs by Id for HR (Secured - Authentication Required)

```http
  GET /api/manager/jobs/:{job_id}
```

| Params | Type     | Description                                                      |
| :----- | :------- | :--------------------------------------------------------------- |
| `yes`  | `string` | Put your Job Id `ex- /api/manager/jobs/634ee7053e66aa81f2de3338` |

#### Update Job By Id for HR (Secured - Authentication Required)

```http
  PUT /api/jobs/:{job_id}
```

| Params | Type     | Description                                              |
| :----- | :------- | :------------------------------------------------------- |
| `yes`  | `string` | Put your Job Id `ex- /api/jobs/634e9cf783d03f6782d95a09` |

### Content for Updating Job

```json
{
  "title": "React Developer Intern",
  "position": "React Developer"
}
```

## For Admin Endpoints

#### Get All the Candidates with Applied Job for admin (Secured - Authentication Required)

```http
  GET /api/admin/candidates
```

| Required Fields | Optional Fields | Description                             |
| :-------------- | :-------------- | :-------------------------------------- |
| `no`            | `not available` | get all the candidate with applied jobs |

#### Get Candidate details By ID WIth Applied Job for admin (Secured - Authentication Required)

```http
  GET /api/admin/candidates/:{candidate_id}
```

| Required Fields | Optional Fields | Description                             |
| :-------------- | :-------------- | :-------------------------------------- |
| `no`            | `not available` | get candidate details with applied jobs |

#### Get All the HRs with Posting Job for admin (Secured - Authentication Required)

```http
  GET /api/admin/hrs
```

| Required Fields | Optional Fields | Description                                  |
| :-------------- | :-------------- | :------------------------------------------- |
| `no`            | `not available` | get all the Hiring manager with applied jobs |

#### Change Role for admin (Secured - Authentication Required)

```http
  PATCH /api/admin/change-role/:{user_id}
```

| Params | Type     | Description                                              |
| :----- | :------- | :------------------------------------------------------- |
| `yes`  | `string` | Put your Job Id `ex- /api/jobs/634e9cf783d03f6782d95a09` |

## License & Certificate

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

## 🔗 Authors Social Handle

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ashikmahmud.me/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ashikmahmud187)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/AshikMa36093377)

## Support

For support, email ashikmamud187@gmail.com or join our Slack channel.

# API Endpoints Documentation

## Authentication Endpoints

### POST /api/auth/login
- **Description**: Authenticate user and return JWT token
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": boolean,
    "token": "string",
    "user": {
      "id": "int",
      "username": "string",
      "role": "string"
    }
  }
  ```

### POST /api/auth/logout
- **Description**: Logout user and invalidate session
- **Headers**: Authorization: Bearer {token}
- **Response**: `{ "success": true }`

### GET /api/auth/profile
- **Description**: Get current user profile
- **Headers**: Authorization: Bearer {token}
- **Response**: User profile data

## Admin Endpoints

### GET /api/admin/staff
- **Description**: Get all staff members
- **Headers**: Authorization: Bearer {token}
- **Query Params**: page, limit, search, department
- **Response**: Paginated staff list

### POST /api/admin/staff
- **Description**: Add new staff member
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "employee_id": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "phone": "string",
    "department_id": "int",
    "designation": "string"
  }
  ```

### PUT /api/admin/staff/{id}
- **Description**: Update staff member
- **Headers**: Authorization: Bearer {token}
- **Request Body**: Same as POST with updated fields

### DELETE /api/admin/staff/{id}
- **Description**: Delete staff member
- **Headers**: Authorization: Bearer {token}

### GET /api/admin/notices
- **Description**: Get all notices
- **Headers**: Authorization: Bearer {token}
- **Query Params**: page, limit, type, audience
- **Response**: Paginated notices list

### POST /api/admin/notices
- **Description**: Create new notice
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "title": "string",
    "content": "string",
    "notice_type": "string",
    "target_audience": "string",
    "course_id": "int",
    "priority": "string",
    "expiry_date": "date"
  }
  ```

### GET /api/admin/courses
- **Description**: Get all courses
- **Headers**: Authorization: Bearer {token}
- **Response**: Courses list

### POST /api/admin/courses
- **Description**: Add new course
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "name": "string",
    "code": "string",
    "department_id": "int",
    "duration_semesters": "int",
    "credits": "int"
  }
  ```

### GET /api/admin/reports/attendance
- **Description**: Get attendance reports
- **Headers**: Authorization: Bearer {token}
- **Query Params**: course_id, class_id, subject_id, date_range
- **Response**: Attendance report data

### GET /api/admin/reports/marks
- **Description**: Get marks reports
- **Headers**: Authorization: Bearer {token}
- **Query Params**: course_id, class_id, subject_id, exam_type
- **Response**: Marks report data

### GET /api/admin/exam-halls
- **Description**: Get all exam halls
- **Headers**: Authorization: Bearer {token}
- **Response**: Exam halls list

### POST /api/admin/exam-allocations
- **Description**: Allocate exam halls to students
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "academic_year": "year",
    "semester": "int",
    "exam_session": "string",
    "allocation_data": [
      {
        "student_id": "int",
        "hall_id": "int",
        "seat_number": "string"
      }
    ]
  }
  ```

## Staff Endpoints

### GET /api/staff/students
- **Description**: Get students assigned to staff
- **Headers**: Authorization: Bearer {token}
- **Query Params**: class_id, course_id, search
- **Response**: Students list

### POST /api/staff/students
- **Description**: Add new student
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "registration_number": "string",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "course_id": "int",
    "semester": "int",
    "section": "string"
  }
  ```

### PUT /api/staff/students/{id}
- **Description**: Update student information
- **Headers**: Authorization: Bearer {token}
- **Request Body**: Updated student data

### DELETE /api/staff/students/{id}
- **Description**: Delete student
- **Headers**: Authorization: Bearer {token}

### GET /api/staff/attendance
- **Description**: Get attendance records
- **Headers**: Authorization: Bearer {token}
- **Query Params**: student_id, subject_id, date_range, class_id
- **Response**: Attendance records

### POST /api/staff/attendance
- **Description**: Mark attendance
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "attendance_data": [
      {
        "student_id": "int",
        "subject_id": "int",
        "date": "date",
        "status": "string"
      }
    ]
  }
  ```

### GET /api/staff/marks
- **Description**: Get marks records
- **Headers**: Authorization: Bearer {token}
- **Query Params**: student_id, subject_id, exam_type, class_id
- **Response**: Marks records

### POST /api/staff/marks
- **Description**: Enter marks
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "marks_data": [
      {
        "student_id": "int",
        "subject_id": "int",
        "exam_type": "string",
        "marks_obtained": "decimal",
        "max_marks": "decimal"
      }
    ]
  }
  ```

### POST /api/staff/assignments
- **Description**: Create assignment
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "subject_id": "int",
    "class_id": "int",
    "due_date": "datetime",
    "max_marks": "decimal",
    "attachment_url": "string"
  }
  ```

### GET /api/staff/assignment-submissions
- **Description**: Get assignment submissions
- **Headers**: Authorization: Bearer {token}
- **Query Params**: assignment_id, class_id, student_id
- **Response**: Submissions list

### PUT /api/staff/assignment-submissions/{id}
- **Description**: Grade assignment submission
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "grade": "string",
    "marks_obtained": "decimal",
    "feedback": "string"
  }
  ```

### POST /api/staff/messages
- **Description**: Send message to student
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "receiver_id": "int",
    "subject": "string",
    "content": "string"
  }
  ```

### POST /api/staff/study-materials
- **Description**: Upload study material
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "subject_id": "int",
    "class_id": "int",
    "file_url": "string",
    "file_type": "string",
    "is_public": "boolean"
  }
  ```

## Student Endpoints

### GET /api/student/attendance
- **Description**: Get student's attendance
- **Headers**: Authorization: Bearer {token}
- **Query Params**: subject_id, date_range
- **Response**: Attendance records

### GET /api/student/marks
- **Description**: Get student's marks
- **Headers**: Authorization: Bearer {token}
- **Query Params**: subject_id, exam_type
- **Response**: Marks records

### GET /api/student/notices
- **Description**: Get notices for student
- **Headers**: Authorization: Bearer {token}
- **Query Params**: type, priority
- **Response**: Notices list

### GET /api/student/assignments
- **Description**: Get assignments for student
- **Headers**: Authorization: Bearer {token}
- **Query Params**: subject_id, due_date
- **Response**: Assignments list

### POST /api/student/assignment-submissions
- **Description**: Submit assignment
- **Headers**: Authorization: Bearer {token}
- **Request Body**:
  ```json
  {
    "assignment_id": "int",
    "submission_file_url": "string"
  }
  ```

### GET /api/student/messages
- **Description**: Get messages for student
- **Headers**: Authorization: Bearer {token}
- **Query Params**: sender_id, read_status
- **Response**: Messages list

### PUT /api/student/messages/{id}/read
- **Description**: Mark message as read
- **Headers**: Authorization: Bearer {token}

### GET /api/student/study-materials
- **Description**: Get study materials
- **Headers**: Authorization: Bearer {token}
- **Query Params**: subject_id, class_id
- **Response**: Study materials list

### GET /api/student/exam-hall
- **Description**: Get student's exam hall allocation
- **Headers**: Authorization: Bearer {token}
- **Query Params**: academic_year, semester, exam_session
- **Response**: Exam hall allocation data

### GET /api/student/search-exam-hall
- **Description**: Search exam hall by registration number
- **Request Body**:
  ```json
  {
    "registration_number": "string"
  }
  ```
- **Response**: Exam hall allocation data

## Common Endpoints

### GET /api/departments
- **Description**: Get all departments
- **Headers**: Authorization: Bearer {token} (optional)
- **Response**: Departments list

### GET /api/courses
- **Description**: Get all courses
- **Headers**: Authorization: Bearer {token} (optional)
- **Response**: Courses list

### GET /api/subjects
- **Description**: Get all subjects
- **Headers**: Authorization: Bearer {token} (optional)
- **Query Params**: course_id, semester
- **Response**: Subjects list

### GET /api/classes
- **Description**: Get all classes
- **Headers**: Authorization: Bearer {token} (optional)
- **Response**: Classes list
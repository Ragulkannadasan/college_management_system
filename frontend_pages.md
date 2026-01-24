# Frontend Pages Structure

## Public Pages

### Landing Page (/)
- Hero section with college introduction
- Department highlights
- Contact information
- Quick links to login/register

### About Page (/about)
- College history and mission
- Faculty information
- Infrastructure details

### Contact Page (/contact)
- Contact form
- Address and map
- Contact information

### Login Page (/login)
- Username/email and password fields
- Role selection dropdown
- Forgot password link
- Login button

## Protected Pages (Role-based access)

### Dashboard Pages

#### Admin Dashboard (/dashboard/admin)
- Summary cards (students, staff, courses)
- Recent activity feed
- Quick actions panel
- Navigation menu

#### Staff Dashboard (/dashboard/staff)
- Assigned classes summary
- Recent attendance/marks updates
- Upcoming assignments
- Quick actions panel

#### Student Dashboard (/dashboard/student)
- Personal information
- Current semester details
- Recent grades and attendance
- Upcoming assignments

### Admin Pages

#### Staff Management (/dashboard/admin/staff)
- Staff list table
- Add/edit/delete staff forms
- Search and filter options
- Export functionality

#### Student Management (/dashboard/admin/students)
- Student list table
- Add/edit/delete student forms
- Search and filter options
- Bulk operations

#### Course Management (/dashboard/admin/courses)
- Course list
- Add/edit course forms
- Subject management
- Curriculum details

#### Notice Board Management (/dashboard/admin/notices)
- Notice list
- Create/edit notice forms
- Schedule publishing
- Audience targeting

#### Report Generation (/dashboard/admin/reports)
- Attendance reports
- Marks reports
- Performance analytics
- Export options

#### Exam Hall Allocation (/dashboard/admin/exam-allocation)
- Hall management
- Student allocation
- Seat assignment
- Search functionality

### Staff Pages

#### Student Management (/dashboard/staff/students)
- Student list for assigned classes
- Add/edit student forms
- Search and filter
- Profile viewing

#### Attendance Management (/dashboard/staff/attendance)
- Class-wise attendance sheets
- Date-wise marking
- Bulk operations
- Attendance reports

#### Marks Management (/dashboard/staff/marks)
- Subject-wise marks entry
- Grade calculation
- Performance analysis
- Export marks

#### Assignment Management (/dashboard/staff/assignments)
- Assignment creation
- Submission tracking
- Grading interface
- Feedback provision

#### Communication (/dashboard/staff/messages)
- Message composition
- Sent items
- Drafts
- Contacts list

#### Study Materials (/dashboard/staff/materials)
- Upload materials
- Material management
- Sharing settings
- Access controls

### Student Pages

#### Profile Management (/dashboard/student/profile)
- Personal information
- Edit profile
- Change password
- Upload photo

#### Attendance View (/dashboard/student/attendance)
- Personal attendance
- Subject-wise view
- Monthly/yearly summaries
- Absence reasons

#### Marks View (/dashboard/student/marks)
- Personal marks
- Subject-wise performance
- Grade point average
- Comparative analysis

#### Notice Board (/dashboard/student/notices)
- All notices
- Filter by type/priority
- Read/unread status
- Search functionality

#### Assignments (/dashboard/student/assignments)
- Assigned tasks
- Submission interface
- Status tracking
- Feedback viewing

#### Communication (/dashboard/student/messages)
- Received messages
- Compose new
- Reply functionality
- Message history

#### Study Materials (/dashboard/student/materials)
- Available materials
- Download options
- Favorite materials
- Recent downloads

#### Exam Hall Search (/dashboard/student/exam-hall)
- Registration number search
- Hall allocation details
- Seat number
- Building/floor information

### Shared Components

#### Navigation Sidebar
- Role-appropriate menu items
- Collapsible sections
- Active page highlighting
- User profile dropdown

#### Header Component
- Notification bell
- User profile
- Logout option
- Search functionality

#### Footer Component
- Quick links
- Copyright information
- Social media links
- Help/support links

### Common Forms

#### User Profile Form
- Basic information
- Contact details
- Profile picture upload
- Password change

#### Search/Filter Components
- Text search
- Dropdown filters
- Date pickers
- Advanced filters

#### Data Tables
- Pagination
- Sorting
- Row selection
- Action buttons

#### Modal Dialogs
- Confirmation dialogs
- Form modals
- Detail views
- Error messages